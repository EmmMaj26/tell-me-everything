const characters = [
  {
    id: "awful-aunty",
    name: "Awful Aunty",
    blurb: "Concerned, nosy, full of advice, overly affectionate.",
  },
  {
    id: "no-mercy-uncle",
    name: "No Mercy Uncle",
    blurb: "Straight facts. Zero cushioning. Kinda harsh, but with love.",
  },
  {
    id: "hype-man",
    name: "Your Hype Man",
    blurb: "Loud support. Unreasonable confidence. Urgency to be your best self.",
  },
  {
    id: "crazy-little-sister",
    name: "Your Crazy Little Sister",
    blurb: "Side-eye. Questions. Pure audacity. On your side, and still unhinged.",
  },
];

const views = {
  welcome: document.querySelector("#welcome"),
  choose: document.querySelector("#choose"),
  response: document.querySelector("#response"),
};

const situationInput = document.querySelector("#situation");
const situationHint = document.querySelector("#situation-hint");
const submitButton = document.querySelector("#submit-situation");
const chooseSituation = document.querySelector("#choose-situation");
const cardList = document.querySelector("#character-cards");
const speakButton = document.querySelector("#let-speak");
const responseName = document.querySelector("#response-name");
const responseBlurb = document.querySelector("#response-blurb");
const responseText = document.querySelector("#response-text");
const responseSituation = document.querySelector("#response-situation");
const reviewLabel = document.querySelector("#review-label");
const loadError = document.querySelector("#load-error");

let library = [];
let situation = "";
let selectedId = "";

function show(name) {
  for (const [key, view] of Object.entries(views)) {
    view.hidden = key !== name;
  }
}

function hasText(value) {
  return value.trim().length > 0;
}

function updateSubmit() {
  const ready = hasText(situationInput.value);
  submitButton.disabled = !ready;
  situationHint.hidden = ready;
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function bestReply(characterId, text) {
  const haystack = normalize(text);
  let winner = null;
  let winnerLength = -1;
  for (const entry of library) {
    if (entry.character !== characterId) continue;
    for (const keyword of entry.keywords) {
      const needle = normalize(keyword);
      if (needle && haystack.includes(needle) && needle.length > winnerLength) {
        winner = entry;
        winnerLength = needle.length;
      }
    }
  }
  return winner;
}

function renderCards() {
  cardList.replaceChildren();
  for (const character of characters) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card";
    button.dataset.id = character.id;
    button.setAttribute("aria-pressed", String(character.id === selectedId));
    const name = document.createElement("strong");
    name.textContent = character.name;
    const blurb = document.createElement("small");
    blurb.textContent = character.blurb;
    button.append(name, blurb);
    button.addEventListener("click", () => {
      selectedId = character.id;
      speakButton.disabled = false;
      speakButton.textContent = `Let ${character.name} speak`;
      renderCards();
    });
    cardList.append(button);
  }
}

function showReply(character) {
  const reply = bestReply(character.id, situation);
  responseName.textContent = character.name;
  responseBlurb.textContent = character.blurb;
  responseSituation.textContent = situation;
  if (!reply) {
    reviewLabel.hidden = true;
    responseText.textContent =
      "Hmm, we need a little more to work with! Try telling us what happened in a different way.";
  } else {
    reviewLabel.hidden = !reply.needsReview;
    responseText.textContent = reply.text;
  }
  show("response");
}

situationInput.addEventListener("input", updateSubmit);

document.querySelector("#situation-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!hasText(situationInput.value)) return;
  situation = situationInput.value.trim();
  selectedId = "";
  speakButton.disabled = true;
  speakButton.textContent = "Choose a character";
  chooseSituation.textContent = situation;
  renderCards();
  show("choose");
});

speakButton.addEventListener("click", () => {
  const character = characters.find((item) => item.id === selectedId);
  if (!character) return;
  showReply(character);
});

document.querySelector("#ask-another-character").addEventListener("click", () => {
  selectedId = "";
  speakButton.disabled = true;
  speakButton.textContent = "Choose a character";
  chooseSituation.textContent = situation;
  renderCards();
  show("choose");
});

submitButton.disabled = true;
renderCards();

fetch("data/responses.json")
  .then((response) => {
    if (!response.ok) throw new Error("The replies could not be loaded.");
    return response.json();
  })
  .then((data) => {
    library = data;
    updateSubmit();
  })
  .catch(() => {
    loadError.hidden = false;
    loadError.textContent = "The replies could not be loaded.";
    submitButton.disabled = true;
  });
