# Response library

Tell Me Everything! answers from this file. It does not use a trained AI model, and it does not understand a sentence the way a person does. `app.js` compares the situation with the keywords below, after the safety check.

## Characters

- `nosey-aunty` — Nosey Aunty. Loving, nosy, dramatic, and full of questions. She wants the whole story, including the parts that are not the original problem, and she advises from real concern.
- `no-mercy-uncle` — No Mercy Uncle. Blunt, dry, practical, and secretly caring. He wants a clear next step, not a repeated lecture.
- `hype-man` — Your Hype Man Brother. Warm, energetic, and on your side. He helps you move, without turning every problem into the same comeback speech.
- `crazy-little-sister` — Your Crazy Little Sister. An adult tabby: chaotic, blunt, strangely funny, and fiercely loyal. She may sound outrageous. She still protects you, and she does not suggest violence, threats, or revenge. “Babe. I know you fucking lying.” is occasional, not her opening line.

## Situations

| Situation | Topic | How a sentence is recognised |
|---|---|---|
| Not wanting to go to work | `work-and-career` | “don't wanna go to work” and the close variants. Priority 1. |
| A colleague taking credit | `work-and-career` | “credit for my work” and “taking/took/takes credit”. Priority 2, so it wins when the work-dread phrase is also in the sentence. |
| Partner argument about dishes or chores | `everyday-life` | “wash the dishes”, “washing the dishes”, “leaving the dishes”, “the washing up”, and the close variants. Not the word “partner” or “dishes” by itself. |
| A friend who does not pay you back | `friendships` | “pay me back”, “owes me money”, and the close variants. |
| Jealous of a friend's success | `friendships` | “jealous of my friend” and the close variants. Not the word “friend” by itself. |
| A boss who does not appreciate you | `work-and-career` | “boss doesn't appreciate” and the close variants. |
| Spending too much | `money` | “spending too much”, “overspending”, and the close variants. |
| Someone gossiping about you | `friendships` | “gossiping about me” and the close variants. |
| Unsure whether someone you are dating is interested | `dating-and-relationships` | “don't know if they like me”, “genuinely interested in me”, “giving me mixed signals”, “someone I'm dating”, and the close variants. “Mixed signals” on its own is not a keyword. |

Each of those has two replies per character, except stolen credit, which has one. Ask for another response shows the other reply for that character and that winning situation. When none is left, the app asks for the situation in a different way.

## A reply

```json
{
  "id": "chores-aunty-fed",
  "character": "nosey-aunty",
  "topic": "everyday-life",
  "priority": 2,
  "keywords": ["about the dishes", "household chores"],
  "text": "The reply the character says.",
  "needsReview": true
}
```

`id` is unique. `character` is one of the four ids above. `keywords` are phrases, not single everyday words. `priority` breaks a tie between situations: a higher number wins, then the longer matching phrase, then the order in the file. Replies from a lower priority are not offered as another response.

`needsReview: true` shows “Sample — needs your review.” Remove that only after the wording is approved.

Copy a block to add a reply. Same character, same keywords, and a new `id` gives Ask for another response a second line. A new topic is just a new `topic` string. The page does not need a new screen.

## Safety comes first

Before any joke, `app.js` checks `data/safety.json`. Immediate danger and serious distress replace the reply. The character's name and portrait stay. Another ordinary response is not offered. The phrase list is limited. It is not a comprehensive classifier, and it will miss wording that is not in that file.

## Matching limits

- A phrase has to appear in the situation. Similar meaning with different words will miss.
- Straight and curly apostrophes are treated as the same. Other wording still has to match a keyword.
- Short words such as “work”, “friend”, “money”, “partner”, and “boss” are not keywords, because they would fire on the wrong stories.
- If one sentence truly contains two specific situations, the longer matching phrase wins. After those replies are used up, another response can move to the other match.
- “I don't wanna go to work because someone took credit for my work” matches stolen credit, not the dread-of-work replies.
- “Giving me mixed signals” is treated as dating. “My boss keeps giving me mixed signals” can still land there, because that sentence has no longer work phrase. “My boss doesn't appreciate me and keeps giving me mixed signals” prefers the boss reply, because that phrase is at least as long and the boss replies come first.
