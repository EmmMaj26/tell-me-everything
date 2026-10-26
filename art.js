const portraits = {
  "nosey-aunty": "images/nosey-aunty.png?v=editorial6",
  "no-mercy-uncle": "images/no-mercy-uncle.png?v=editorial7",
  "hype-man": "images/hype-man.png?v=editorial8",
  "crazy-little-sister": "images/crazy-little-sister.png?v=editorial12",
};

const crazyLittleSisterExpressions = {
  "side-eye": "images/crazy-little-sister-side-eye.png?v=editorial9",
  shock: "images/crazy-little-sister-shock.png?v=editorial9",
  laughing: "images/crazy-little-sister-laughing.png?v=editorial9",
  judgement: "images/crazy-little-sister-judgement.png?v=editorial9",
  angry: "images/crazy-little-sister-angry.png?v=editorial9",
  sarcastic: "images/crazy-little-sister-sarcastic.png?v=editorial9",
  roasting: "images/crazy-little-sister-roasting.png?v=editorial9",
  concerned: "images/crazy-little-sister-concerned.png?v=editorial9",
  excited: "images/crazy-little-sister-excited.png?v=editorial9",
  supportive: "images/crazy-little-sister-supportive.png?v=editorial9",
};

const crazyLittleSisterOutfits = {
  seated: "images/crazy-little-sister-seated.png?v=editorial12",
  lounge: "images/crazy-little-sister-lounge.png?v=editorial9",
  "night-out": "images/crazy-little-sister-night-out.png?v=editorial9",
  "smart-casual": "images/crazy-little-sister-smart-casual.png?v=editorial9",
  traditional: "images/crazy-little-sister-traditional.png?v=editorial9",
  work: "images/crazy-little-sister-work.png?v=editorial9",
};

const hypeManExpressions = {
  grin: "images/hype-man-grin.png?v=editorial8",
  laughing: "images/hype-man-laughing.png?v=editorial8",
  celebrating: "images/hype-man-celebrating.png?v=editorial8",
  "side-eye": "images/hype-man-side-eye.png?v=editorial8",
  thinking: "images/hype-man-thinking.png?v=editorial8",
  reassuring: "images/hype-man-reassuring.png?v=editorial8",
  proud: "images/hype-man-proud.png?v=editorial8",
};

const hypeManOutfits = {
  "smart-casual": "images/hype-man-smart-casual.png?v=editorial8",
  work: "images/hype-man-work.png?v=editorial8",
  traditional: "images/hype-man-traditional.png?v=editorial8",
  relaxed: "images/hype-man-relaxed.png?v=editorial8",
};

const noMercyUncleExpressions = {
  stern: "images/no-mercy-uncle-stern.png?v=editorial7",
  "side-eye": "images/no-mercy-uncle-side-eye.png?v=editorial7",
  disappointed: "images/no-mercy-uncle-disappointed.png?v=editorial7",
  lecturing: "images/no-mercy-uncle-lecturing.png?v=editorial7",
  amused: "images/no-mercy-uncle-amused.png?v=editorial7",
  facepalm: "images/no-mercy-uncle-facepalm.png?v=editorial7",
  proud: "images/no-mercy-uncle-proud.png?v=editorial7",
};

const noMercyUncleOutfits = {
  "smart-casual": "images/no-mercy-uncle-smart-casual.png?v=editorial7",
  relaxed: "images/no-mercy-uncle-relaxed.png?v=editorial7",
  traditional: "images/no-mercy-uncle-traditional.png?v=editorial7",
};

const noseyAuntyExpressions = {
  "side-eye": "images/nosey-aunty-side-eye.png?v=editorial6",
  question: "images/nosey-aunty-question.png?v=editorial6",
  shock: "images/nosey-aunty-shock.png?v=editorial6",
  gossip: "images/nosey-aunty-gossip.png?v=editorial6",
  judgement: "images/nosey-aunty-judgement.png?v=editorial6",
  "love-life": "images/nosey-aunty-love-life.png?v=editorial6",
};

function characterPortrait(id) {
  const figure = document.createElement("span");
  figure.className = "portrait";
  const img = document.createElement("img");
  img.src = portraits[id] || "";
  img.alt = "";
  figure.append(img);
  return figure;
}
