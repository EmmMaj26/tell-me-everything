const characters = [
  {
    id: "nosey-aunty",
    name: "Nosey Aunty",
    blurb: "All up in your business. Full of advice and love, very nosy.",
  },
  {
    id: "no-mercy-uncle",
    name: "No Mercy Uncle",
    blurb: "Brutally honest. Calls out your nonsense. Wants you to do better, even when it hurts.",
  },
  {
    id: "hype-man",
    name: "Your Hype Man Brother",
    blurb: "Believes in you. Pumps you up. Finds the bright side. Turns every problem into a comeback story.",
  },
  {
    id: "crazy-little-sister",
    name: "Your Crazy Little Sister",
    blurb: "Side-eye. Questions. Pure audacity. On your side, and still unhinged.",
  },
];

const noMatchMessage =
  "Hmm, we need a little more to work with! Try telling us what happened in a different way.";

const dilemmas = [
  "I don't wanna go to work.",
  "My colleague keeps taking credit for my work.",
  "My housemate keeps leaving the dishes for me to wash.",
  "My friend won't pay me back.",
  "I'm jealous of my friend's success.",
  "My boss doesn't appreciate my work.",
  "I'm spending too much money.",
  "Someone has been gossiping about me.",
  "I like someone, but I can't tell if they're genuinely interested in me.",
];

const views = {
  welcome: document.querySelector("#welcome"),
  choose: document.querySelector("#choose"),
  response: document.querySelector("#response"),
  group: document.querySelector("#group"),
  pair: document.querySelector("#pair"),
  pairResult: document.querySelector("#pair-result"),
};

const situationInput = document.querySelector("#situation");
const situationHint = document.querySelector("#situation-hint");
const submitButton = document.querySelector("#submit-situation");
const chooseRead = document.querySelector("#choose-read");
const chooseSituation = document.querySelector("#choose-situation");
const editForm = document.querySelector("#edit-form");
const editText = document.querySelector("#edit-text");
const editHint = document.querySelector("#edit-hint");
const saveButton = document.querySelector("#save-changes");
const cardList = document.querySelector("#character-cards");
const speakButton = document.querySelector("#let-speak");
const responseArt = document.querySelector("#response-art");
const responseName = document.querySelector("#response-name");
const responseBlurb = document.querySelector("#response-blurb");
const responseText = document.querySelector("#response-text");
const responseSpeech = document.querySelector("#response-speech");
const responseRead = document.querySelector("#response-read");
const responseSituation = document.querySelector("#response-situation");
const reviewLabel = document.querySelector("#review-label");
const anotherResponseButton = document.querySelector("#ask-another-response");
const tryAgainButton = document.querySelector("#try-again");
const retryForm = document.querySelector("#retry-form");
const retryText = document.querySelector("#retry-text");
const retryHint = document.querySelector("#retry-hint");
const submitAgainButton = document.querySelector("#submit-again");
const loadError = document.querySelector("#load-error");
const surpriseButton = document.querySelector("#surprise-me");
const surprisePanel = document.querySelector("#surprise-panel");
const surpriseDilemma = document.querySelector("#surprise-dilemma");
const groupSituation = document.querySelector("#group-situation");
const groupList = document.querySelector("#group-replies");
const pairSituation = document.querySelector("#pair-situation");
const pairHint = document.querySelector("#pair-hint");
const pairList = document.querySelector("#pair-cards");
const hearButton = document.querySelector("#hear-both");
const pairResultSituation = document.querySelector("#pair-result-situation");
const pairReplies = document.querySelector("#pair-replies");
const startOverConfirm = document.querySelector("#start-over-confirm");
const startOverButtons = document.querySelectorAll("[data-start-over]");

let library = [];
let safetyData = null;
let libraryReady = false;
let situation = "";
let selectedId = "";
let shownByCharacter = {};
let displayedReply = null;
let replyBeforeEmpty = null;
let retrySnapshot = null;
let surpriseIndex = -1;
let pairIds = [];
let speechToken = 0;
let speechActive = false;
let speechKeepAlive = 0;
let speechWatch = 0;
let assignedVoices = {};

const voiceDelivery = {
  "nosey-aunty": { pitch: 1.12, rate: 0.94 },
  "no-mercy-uncle": { pitch: 0.78, rate: 0.88 },
  "hype-man": { pitch: 1.05, rate: 1.12 },
  "crazy-little-sister": { pitch: 1.32, rate: 1.08 },
};

function speechSupported() {
  return Boolean(window.speechSynthesis && window.speechSynthesis.speak && window.SpeechSynthesisUtterance);
}

function clearSpeechNotes() {
  for (const note of document.querySelectorAll("[data-speech-note]")) note.hidden = true;
}

function showSpeechNote(message) {
  for (const note of document.querySelectorAll("[data-speech-note]")) {
    const view = note.closest(".view");
    const visible = view && !view.hidden;
    note.hidden = !visible;
    if (visible) note.textContent = message;
  }
}

function updateSpeechControls() {
  for (const button of document.querySelectorAll("[data-stop-speech]")) {
    button.hidden = !speechActive;
  }
}

function clearSpeakingMark() {
  for (const node of document.querySelectorAll(".is-speaking")) {
    node.classList.remove("is-speaking");
    node.removeAttribute("aria-current");
  }
}

function markSpeaking(characterId) {
  clearSpeakingMark();
  if (!characterId) return;
  if (!views.response.hidden && views.response.dataset.character === characterId) {
    views.response.classList.add("is-speaking");
    views.response.setAttribute("aria-current", "true");
  }
  for (const article of document.querySelectorAll("article.group-turn." + characterId)) {
    const view = article.closest(".view");
    if (view && !view.hidden) {
      article.classList.add("is-speaking");
      article.setAttribute("aria-current", "true");
    }
  }
}

function endPlayback() {
  speechToken += 1;
  speechActive = false;
  clearInterval(speechKeepAlive);
  clearInterval(speechWatch);
  clearSpeakingMark();
  if (speechSupported()) {
    try {
      speechSynthesis.cancel();
    } catch (error) {
      /* The engine can already be idle. */
    }
  }
  updateSpeechControls();
}

function stopSpeaking() {
  endPlayback();
}

function speechBudget(text, rate) {
  const words = text.trim().split(/\s+/).filter(Boolean).length || 1;
  const safeRate = Math.max(0.5, Number(rate) || 1);
  const spokenMs = (words / (120 * safeRate)) * 60000;
  const pauses = (text.match(/[.!?]/g) || []).length * 450;
  const estimate = Math.round(spokenMs + pauses + 4000);
  return { estimate, hard: Math.max(estimate * 2, estimate + 8000) };
}

function englishVoices(voices) {
  const english = voices.filter((voice) => /^en([-_]|$)/i.test(voice.lang));
  return english.length ? english : voices.slice();
}

function takeVoice(pool, preferred, used) {
  const voice =
    preferred.find((item) => !used.has(item.voiceURI)) ||
    pool.find((item) => !used.has(item.voiceURI)) ||
    null;
  if (voice) used.add(voice.voiceURI);
  return voice;
}

function loadVoices() {
  if (!speechSupported()) return;
  const joke = /bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|^albert$|^fred$|^junior$|^ralph$/i;
  const english = englishVoices(speechSynthesis.getVoices());
  const plain = english.filter((voice) => !joke.test(voice.name));
  const pool = plain.length ? plain : english;
  const female = pool.filter((voice) => /female|woman|samantha|victoria|karen|moira|fiona|tessa|serena|kathy|flo|sandy|shelley|veena|nora|allison|ava|susan/i.test(voice.name));
  const male = pool.filter((voice) => /male|daniel|alex|rishi|aaron|gordon|arthur|tom|oliver|george|david|lee|nathan|eddy|reed|rocko|grandpa/i.test(voice.name) && !/female/i.test(voice.name));
  const ranked = (list, order) =>
    list.slice().sort((a, b) => {
      const aRank = order.findIndex((name) => a.name.startsWith(name));
      const bRank = order.findIndex((name) => b.name.startsWith(name));
      return (aRank < 0 ? 99 : aRank) - (bRank < 0 ? 99 : bRank);
    });
  const used = new Set();
  assignedVoices = {
    "nosey-aunty": takeVoice(pool, ranked(female, ["Samantha", "Karen", "Moira", "Tessa"]), used),
    "crazy-little-sister": takeVoice(pool, ranked(female, ["Moira", "Tessa", "Kathy", "Karen", "Samantha"]), used),
    "no-mercy-uncle": takeVoice(pool, ranked(male, ["Daniel", "Grandpa", "Reed"]), used),
    "hype-man": takeVoice(pool, ranked(male, ["Rishi", "Eddy", "Rocko", "Daniel"]), used),
  };
}

function speakText(characterId, text) {
  const spoken = text.trim();
  if (!spoken) return;
  if (!speechSupported()) {
    showSpeechNote("Speech isn't available in this browser. You can still read the reply on screen.");
    return;
  }
  loadVoices();
  const token = ++speechToken;
  const utterance = new SpeechSynthesisUtterance(spoken);
  const delivery = voiceDelivery[characterId] || { pitch: 1, rate: 1 };
  utterance.pitch = delivery.pitch;
  utterance.rate = delivery.rate;
  const voice = assignedVoices[characterId];
  if (voice) utterance.voice = voice;
  const budget = speechBudget(spoken, utterance.rate);
  let speechMarked = false;
  let speechStartedAt = 0;
  let speechProgressAt = 0;
  let speechIdleAt = 0;
  const beginSpeech = () => {
    if (token !== speechToken || speechMarked) return;
    speechMarked = true;
    speechActive = true;
    speechStartedAt = Date.now();
    speechProgressAt = speechStartedAt;
    markSpeaking(characterId);
    updateSpeechControls();
  };
  const finishIfCurrent = () => {
    if (token !== speechToken) return;
    endPlayback();
  };
  utterance.onstart = beginSpeech;
  utterance.onboundary = () => {
    if (token !== speechToken) return;
    speechProgressAt = Date.now();
  };
  utterance.onend = finishIfCurrent;
  utterance.onerror = (event) => {
    if (token !== speechToken) return;
    const interrupted = event.error === "interrupted" || event.error === "canceled" || event.error === "cancelled";
    endPlayback();
    if (!interrupted) showSpeechNote("Speech didn't start. You can still read the reply on screen.");
  };
  try {
    clearSpeechNotes();
    speechSynthesis.cancel();
    clearSpeakingMark();
    speechActive = true;
    updateSpeechControls();
    const armedAt = Date.now();
    speechSynthesis.speak(utterance);
    if (speechSynthesis.paused) speechSynthesis.resume();
    clearInterval(speechWatch);
    speechWatch = setInterval(() => {
      if (token !== speechToken) {
        clearInterval(speechWatch);
        return;
      }
      const now = Date.now();
      if (speechSynthesis.speaking || speechSynthesis.pending) beginSpeech();
      if (!speechMarked) {
        if (now - armedAt > 4000 && !speechSynthesis.speaking && !speechSynthesis.pending) finishIfCurrent();
        return;
      }
      const elapsed = now - speechStartedAt;
      const quiet = now - speechProgressAt;
      const engineIdle = !speechSynthesis.speaking && !speechSynthesis.pending && !speechSynthesis.paused;
      if (engineIdle) {
        if (!speechIdleAt) speechIdleAt = now;
        if (elapsed > 800 && now - speechIdleAt > 2500) finishIfCurrent();
      } else {
        speechIdleAt = 0;
      }
      if (elapsed > budget.hard || (elapsed > budget.estimate && quiet > 3500)) finishIfCurrent();
    }, 200);
    clearInterval(speechKeepAlive);
    speechKeepAlive = setInterval(() => {
      if (token !== speechToken || !speechActive || !speechSynthesis.speaking) {
        clearInterval(speechKeepAlive);
        return;
      }
      speechSynthesis.resume();
    }, 8000);
  } catch (error) {
    endPlayback();
    showSpeechNote("Speech isn't available in this browser. You can still read the reply on screen.");
  }
}

function show(name) {
  stopSpeaking();
  clearSpeechNotes();
  for (const [key, view] of Object.entries(views)) {
    view.hidden = key !== name;
  }
}

function hasText(value) {
  return value.trim().length > 0;
}

function updateSubmit() {
  const ready = libraryReady && hasText(situationInput.value);
  submitButton.disabled = !ready;
  situationHint.hidden = hasText(situationInput.value);
  surpriseButton.disabled = !libraryReady;
}

function pickDilemma() {
  const pool = dilemmas
    .map((text, index) => ({ text, index }))
    .filter((item) => item.index !== surpriseIndex);
  const options = pool.length ? pool : dilemmas.map((text, index) => ({ text, index }));
  const pick = options[Math.floor(Math.random() * options.length)];
  surpriseIndex = pick.index;
  return pick.text;
}

function showSurprise() {
  surpriseDilemma.textContent = pickDilemma();
  surprisePanel.hidden = false;
}

function updateEdit() {
  const ready = hasText(editText.value);
  saveButton.disabled = !ready;
  editHint.hidden = ready;
}

function updateRetry() {
  const ready = hasText(retryText.value);
  submitAgainButton.disabled = !ready;
  retryHint.hidden = ready;
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ");
}

function matchScore(entry, haystack) {
  let best = 0;
  for (const keyword of entry.keywords) {
    const needle = normalize(keyword);
    if (needle && haystack.includes(needle) && needle.length > best) best = needle.length;
  }
  return best;
}

function rankedMatches(characterId, text) {
  const haystack = normalize(text);
  const matched = library
    .map((entry, index) => ({
      entry,
      index,
      length: entry.character === characterId ? matchScore(entry, haystack) : 0,
      priority: Number.isFinite(entry.priority) ? entry.priority : 0,
    }))
    .filter((item) => item.length > 0);
  const top = matched.reduce((best, item) => Math.max(best, item.priority), 0);
  return matched
    .filter((item) => item.priority === top)
    .sort((a, b) => b.length - a.length || a.index - b.index)
    .map((item) => item.entry);
}

function selectedCharacter() {
  return characters.find((item) => item.id === selectedId);
}

function syncSpeakButton() {
  const character = selectedCharacter();
  if (!character) {
    speakButton.disabled = true;
    speakButton.textContent = "Choose a character";
    return;
  }
  speakButton.disabled = false;
  speakButton.textContent = `Let ${character.name} speak`;
}

function resetSpeakButton() {
  selectedId = "";
  syncSpeakButton();
}

function updateStartOver() {
  const available = situation.trim().length > 0;
  for (const button of startOverButtons) button.hidden = !available;
}

function closeEdit() {
  editForm.hidden = true;
  chooseRead.hidden = false;
}

function showWelcome() {
  situationInput.value = situation;
  updateSubmit();
  updateStartOver();
  show("welcome");
}

function showChoose(options = {}) {
  const keepSelection = options.keepSelection === true;
  closeEdit();
  chooseSituation.textContent = situation;
  if (keepSelection) syncSpeakButton();
  else resetSpeakButton();
  renderCards();
  updateStartOver();
  show("choose");
}

function openStartOver() {
  startOverConfirm.hidden = false;
  document.querySelector("#keep-it").focus();
}

function closeStartOver() {
  startOverConfirm.hidden = true;
}

function performStartOver() {
  situation = "";
  situationInput.value = "";
  editText.value = "";
  retryText.value = "";
  shownByCharacter = {};
  displayedReply = null;
  replyBeforeEmpty = null;
  retrySnapshot = null;
  selectedId = "";
  pairIds = [];
  resetSpeakButton();
  closeEdit();
  retryForm.hidden = true;
  responseRead.hidden = false;
  responseText.hidden = false;
  delete views.response.dataset.character;
  updateSubmit();
  updateEdit();
  updateRetry();
  closeStartOver();
  updateStartOver();
  surprisePanel.hidden = true;
  show("welcome");
}

function renderCards(options = {}) {
  const arrive = options.arrive !== false;
  cardList.replaceChildren();
  for (const character of characters) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = arrive ? `card arrive ${character.id}` : `card ${character.id}`;
    button.dataset.id = character.id;
    button.setAttribute("aria-pressed", String(character.id === selectedId));
    const name = document.createElement("strong");
    name.textContent = character.name;
    const blurb = document.createElement("small");
    blurb.textContent = character.blurb;
    const copy = document.createElement("span");
    copy.className = "card-copy";
    copy.append(name, blurb);
    button.append(characterPortrait(character.id), copy);
    button.addEventListener("click", () => {
      selectedId = character.id;
      speakButton.disabled = false;
      speakButton.textContent = `Let ${character.name} speak`;
      renderCards({ arrive: false });
    });
    cardList.append(button);
  }
}

function renderResponse(reply) {
  displayedReply = reply;
  responseSituation.textContent = situation;
  retryForm.hidden = true;
  responseRead.hidden = false;
  responseText.hidden = false;
  responseSpeech.hidden = false;
  if (!reply) {
    reviewLabel.hidden = true;
    responseText.textContent = noMatchMessage;
    tryAgainButton.hidden = false;
    anotherResponseButton.hidden = true;
  } else {
    replyBeforeEmpty = reply;
    reviewLabel.hidden = !reply.needsReview;
    responseText.textContent = reply.text;
    tryAgainButton.hidden = true;
    anotherResponseButton.hidden = false;
  }
  updateStartOver();
  show("response");
  revealResponse(Boolean(reply));
}

function revealResponse(react) {
  views.response.classList.toggle("react", react);
  for (const piece of [views.response.querySelector(".identity"), responseText]) {
    piece.classList.remove("reveal");
    void piece.offsetWidth;
    piece.classList.add("reveal");
  }
}

function showIdentity(character) {
  responseName.textContent = character.name;
  responseBlurb.textContent = character.blurb;
  responseArt.replaceChildren(characterPortrait(character.id));
  views.response.dataset.character = character.id;
}

function safetyLevel(text) {
  if (!safetyData) return null;
  const haystack = normalize(text);
  let best = null;
  const groups = [
    ["immediate", safetyData.immediate],
    ["serious", safetyData.serious],
  ];
  for (const [level, phrases] of groups) {
    for (const phrase of phrases || []) {
      const needle = normalize(phrase);
      if (!needle || !haystack.includes(needle)) continue;
      const immediateTie = best && needle.length === best.length && level === "immediate";
      if (!best || needle.length > best.length || immediateTie) best = { level, length: needle.length };
    }
  }
  return best ? best.level : null;
}

function renderSafety(level) {
  displayedReply = null;
  responseSituation.textContent = situation;
  retryForm.hidden = true;
  responseRead.hidden = false;
  responseText.hidden = false;
  reviewLabel.hidden = true;
  responseSpeech.hidden = false;
  responseText.textContent =
    level === "immediate" ? safetyData.immediateMessage : safetyData.seriousMessage;
  tryAgainButton.hidden = true;
  anotherResponseButton.hidden = true;
  show("response");
  revealResponse(false);
}

function replyArticle(character) {
  const level = safetyLevel(situation);
  const reply = level ? null : rankedMatches(character.id, situation)[0] || null;
  const article = document.createElement("article");
  article.className = level ? `group-turn arrive ${character.id}` : `group-turn arrive react ${character.id}`;
  const identity = document.createElement("div");
  identity.className = "identity";
  const words = document.createElement("div");
  const name = document.createElement("h2");
  name.textContent = character.name;
  const blurb = document.createElement("p");
  blurb.className = "blurb";
  blurb.textContent = character.blurb;
  words.append(name, blurb);
  identity.append(characterPortrait(character.id), words);
  const text = document.createElement("p");
  text.className = level ? "reply safety-reply" : "reply";
  if (level) {
    text.textContent = level === "immediate" ? safetyData.immediateMessage : safetyData.seriousMessage;
  } else {
    text.textContent = reply ? reply.text : noMatchMessage;
  }
  article.append(identity);
  if (reply && reply.needsReview) {
    const label = document.createElement("p");
    label.className = "review-label";
    label.textContent = "Sample — needs your review";
    article.append(label);
  }
  article.append(text);
  const hear = document.createElement("button");
  hear.type = "button";
  hear.className = "secondary hear-response";
  hear.textContent = `🔊 Hear ${character.name}`;
  hear.addEventListener("click", () => speakText(character.id, text.textContent));
  article.append(hear);
  return article;
}

function showGroup() {
  groupSituation.textContent = situation;
  groupList.replaceChildren();
  for (const character of characters) groupList.append(replyArticle(character));
  updateStartOver();
  show("group");
}

function syncHearButton() {
  const ready = pairIds.length === 2;
  hearButton.disabled = !ready;
  if (!ready) {
    hearButton.textContent = "Pick two characters";
    pairHint.textContent = "Pick two different characters.";
    return;
  }
  const named = pairIds.map((id) => characters.find((item) => item.id === id));
  hearButton.textContent = `Hear ${named[0].name} and ${named[1].name}`;
  pairHint.textContent = "Press a chosen character again to change the pair.";
}

function renderPairCards(options = {}) {
  const arrive = options.arrive !== false;
  pairList.replaceChildren();
  for (const character of characters) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = arrive ? `card arrive ${character.id}` : `card ${character.id}`;
    const pressed = pairIds.includes(character.id);
    button.setAttribute("aria-pressed", String(pressed));
    button.disabled = !pressed && pairIds.length >= 2;
    const name = document.createElement("strong");
    name.textContent = character.name;
    const blurb = document.createElement("small");
    blurb.textContent = character.blurb;
    const copy = document.createElement("span");
    copy.className = "card-copy";
    copy.append(name, blurb);
    button.append(characterPortrait(character.id), copy);
    button.addEventListener("click", () => {
      if (pairIds.includes(character.id)) pairIds = pairIds.filter((id) => id !== character.id);
      else if (pairIds.length < 2) pairIds = [...pairIds, character.id];
      renderPairCards({ arrive: false });
      syncHearButton();
    });
    pairList.append(button);
  }
}

function showPair() {
  pairSituation.textContent = situation;
  renderPairCards();
  syncHearButton();
  updateStartOver();
  show("pair");
}

function showPairResult() {
  const picked = pairIds.map((id) => characters.find((item) => item.id === id)).filter(Boolean);
  if (picked.length !== 2 || !libraryReady) return;
  pairResultSituation.textContent = situation;
  pairReplies.replaceChildren();
  for (const character of picked) pairReplies.append(replyArticle(character));
  updateStartOver();
  show("pairResult");
}

function showLatest(character) {
  showIdentity(character);
  const level = safetyLevel(situation);
  if (level) {
    renderSafety(level);
    return;
  }
  const shown = shownByCharacter[character.id] || [];
  if (shown.length === 0) {
    const first = rankedMatches(character.id, situation)[0] || null;
    if (first) shownByCharacter[character.id] = [first.id];
    renderResponse(first);
    return;
  }
  const last = library.find((entry) => entry.id === shown[shown.length - 1]) || null;
  renderResponse(last);
}

function showNext(character) {
  const level = safetyLevel(situation);
  if (level) {
    showIdentity(character);
    renderSafety(level);
    return;
  }
  const shown = shownByCharacter[character.id] || [];
  const next = rankedMatches(character.id, situation).find((entry) => !shown.includes(entry.id)) || null;
  if (next) shownByCharacter[character.id] = [...shown, next.id];
  renderResponse(next);
}

situationInput.addEventListener("input", updateSubmit);
editText.addEventListener("input", updateEdit);
retryText.addEventListener("input", updateRetry);

surpriseButton.addEventListener("click", showSurprise);

document.querySelector("#surprise-another").addEventListener("click", showSurprise);

document.querySelector("#surprise-accept").addEventListener("click", () => {
  if (!surpriseDilemma.textContent.trim()) return;
  situationInput.value = surpriseDilemma.textContent;
  updateSubmit();
  document.querySelector("#situation-form").requestSubmit();
});

document.querySelector("#situation-form").addEventListener("submit", (event) => {
  event.preventDefault();
  surprisePanel.hidden = true;
  if (!libraryReady || !hasText(situationInput.value)) return;
  const next = situationInput.value.trim();
  const unchanged = situation !== "" && next === situation;
  if (!unchanged) {
    situation = next;
    shownByCharacter = {};
    displayedReply = null;
    replyBeforeEmpty = null;
    retrySnapshot = null;
    resetSpeakButton();
    showChoose();
    return;
  }
  situationInput.value = situation;
  showChoose({ keepSelection: true });
});

document.querySelector("#edit-situation").addEventListener("click", () => {
  editText.value = situation;
  updateEdit();
  chooseRead.hidden = true;
  editForm.hidden = false;
  editText.focus();
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!hasText(editText.value)) return;
  situation = editText.value.trim();
  shownByCharacter = {};
  replyBeforeEmpty = null;
  chooseSituation.textContent = situation;
  closeEdit();
});

document.querySelector("#cancel-edit").addEventListener("click", () => {
  editText.value = situation;
  closeEdit();
});

speakButton.addEventListener("click", () => {
  const character = selectedCharacter();
  if (!character) return;
  showLatest(character);
});

document.querySelector("#hear-response").addEventListener("click", () => {
  const character = selectedCharacter();
  if (!character) return;
  speakText(character.id, responseText.textContent);
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-stop-speech]")) stopSpeaking();
});

if (speechSupported()) {
  loadVoices();
  speechSynthesis.addEventListener("voiceschanged", loadVoices);
}

document.querySelector("#ask-group").addEventListener("click", () => {
  if (!situation.trim() || !libraryReady) return;
  closeEdit();
  showGroup();
});

document.querySelector("#ask-pair").addEventListener("click", () => {
  if (!situation.trim() || !libraryReady) return;
  closeEdit();
  showPair();
});

document.querySelector("#back-pair").addEventListener("click", () => {
  showChoose({ keepSelection: true });
});

hearButton.addEventListener("click", showPairResult);

document.querySelector("#back-pair-result").addEventListener("click", showPair);

document.querySelector("#change-pair").addEventListener("click", showPair);

document.querySelector("#back-group").addEventListener("click", () => {
  showChoose({ keepSelection: true });
});

document.querySelector("#back-choose").addEventListener("click", () => {
  editText.value = situation;
  closeEdit();
  showWelcome();
});

document.querySelector("#back-response").addEventListener("click", () => {
  if (!retryForm.hidden && retrySnapshot) {
    situation = retrySnapshot.situation;
    shownByCharacter = retrySnapshot.shown;
    replyBeforeEmpty = retrySnapshot.reply;
    displayedReply = retrySnapshot.reply;
    retryForm.hidden = true;
  }
  showChoose({ keepSelection: true });
});

for (const button of startOverButtons) {
  button.addEventListener("click", openStartOver);
}

document.querySelector("#keep-it").addEventListener("click", closeStartOver);

document.querySelector("#confirm-start-over").addEventListener("click", performStartOver);

document.querySelector("#ask-another-character").addEventListener("click", () => showChoose());

anotherResponseButton.addEventListener("click", () => {
  const character = selectedCharacter();
  if (!character) return;
  showNext(character);
});

tryAgainButton.addEventListener("click", () => {
  retrySnapshot = {
    situation,
    reply: replyBeforeEmpty,
    shown: structuredClone(shownByCharacter),
  };
  retryText.value = situation;
  updateRetry();
  responseRead.hidden = true;
  responseText.hidden = true;
  reviewLabel.hidden = true;
  responseSpeech.hidden = true;
  stopSpeaking();
  retryForm.hidden = false;
  retryText.focus();
});

retryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const character = selectedCharacter();
  if (!character || !hasText(retryText.value)) return;
  situation = retryText.value.trim();
  shownByCharacter = {};
  replyBeforeEmpty = null;
  showLatest(character);
});

document.querySelector("#cancel-retry").addEventListener("click", () => {
  if (!retrySnapshot) return;
  situation = retrySnapshot.situation;
  shownByCharacter = retrySnapshot.shown;
  replyBeforeEmpty = retrySnapshot.reply;
  const character = selectedCharacter();
  if (!character) return;
  showIdentity(character);
  renderResponse(retrySnapshot.reply);
});

submitButton.disabled = true;
renderCards();
updateStartOver();

for (const slot of document.querySelectorAll("[data-cast]")) {
  slot.append(characterPortrait(slot.dataset.cast));
}

Promise.all([
  fetch("data/responses.json?v=editorial17").then((response) => {
    if (!response.ok) throw new Error("The replies could not be loaded.");
    return response.json();
  }),
  fetch("data/safety.json?v=editorial13").then((response) => {
    if (!response.ok) throw new Error("The replies could not be loaded.");
    return response.json();
  }),
])
  .then(([replies, safety]) => {
    library = replies;
    safetyData = safety;
    libraryReady = true;
    updateSubmit();
  })
  .catch(() => {
    loadError.hidden = false;
    loadError.textContent = "The replies could not be loaded.";
    submitButton.disabled = true;
  });
