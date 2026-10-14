---
doc: spec
status: approved
---
<!-- `status` is the progress state every skill reads. Write `draft` when you first save this file,
     and change it to `approved` when the learner clearly approves the displayed plan ("looks good" counts).
     Do not request a second sign-off. Never skip the draft save —
     an unsaved draft dies with the conversation. -->

# Tell Me Everything! — Technical Spec

## How This Works, In Plain Language
The app is one small website. Three kinds of files make the pages: HTML for the structure, CSS for the look, and JavaScript for what happens when someone taps a button. The jokes are not inside those page files. They live in a separate JSON file, which is a plain text list of written replies.

Someone opens the site in a browser. They read the 18+ notice, type a situation, and pick a character. The page checks a safety list first. If the situation is serious, they see the serious message from the PRD and no joke. Otherwise the page looks through the JSON list for that character, finds a reply whose keywords appear in what they typed, and shows it. They can ask that character for another reply or go back and pick someone else. The situation stays on the page, so they do not type it again.

This shape is a few files and no accounts, database, or paid service. A bigger framework would add setup before the first working path. Maro agreed to this tradeoff: a small website that is tested on the computer first. Publishing it at a public web address is a nice-to-have only if that can be done easily and for free. It must not delay the working demo, and it must not cost money.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

1. The browser opens `index.html`. The welcome view is visible. The 18+ notice is the first thing in that view. Implements `prd.md > Welcome screen`.
2. The person types a situation. If the box is empty or only spaces, the submit button stays off and the page shows “You’ll need to tell us something first!” A real submit trims spaces at the start and end, saves the text in the page’s memory, and shows Choose your advisor. Implements `prd.md > Welcome screen submit`.
3. Choose your advisor shows the situation, an Edit control, and four character cards drawn from the character list in JavaScript. One card can be selected. The button reads “Let [Name] speak.” Edit turns the summary into a text field on that same view. Save changes is disabled when the field is empty or only spaces, with the same “You’ll need to tell us something first!” message. A real save trims the ends and keeps internal line breaks. Cancel restores the previous text. Nothing here asks for a reply. Implements `prd.md > Choose your advisor`.
4. “Let [Name] speak” runs the safety check, then the matcher, for the latest saved situation and the selected character. A curated reply that is ready immediately is shown at once. No fake typing pause. Implements `prd.md > Response typing lines` and `prd.md > Response ready`.
5. The response view shows the character’s name and picture, the reply, the situation, “Ask another character,” and “Ask for another response.”
6. “Ask another character” returns to Choose your advisor with the same situation. The next character they pick is answered from that text. Implements `prd.md > Response ready`.
7. “Ask for another response” asks the matcher for a different reply from the same character. If one exists, it replaces the previous reply on the same view. If none exists, the page shows “Hmm, we need a little more to work with! Try telling us what happened in a different way.” and the buttons “Try again” and “Ask another character.” Implements `prd.md > No suitable answer`.
8. “Try again” edits the situation on the response view. “Submit again” trims the ends, keeps that character selected, and runs safety and matching again. Cancel restores the previous situation text and the previous reply. The welcome view is not used for this. Implements `prd.md > No suitable answer`.
9. Closing the tab or refreshing the page clears the situation. Nothing is stored on a server. Opening the page again starts at the welcome view.

## Stack
Learner choice, accepted in this conversation: plain HTML, CSS, and JavaScript, plus a separate JSON file for the response library. No framework. The tradeoff accepted is a small site that is fast to test, not a base for a large product.

No external libraries are required for the first build. The languages are documented here:

- HTML: https://developer.mozilla.org/en-US/docs/Web/HTML
- CSS: https://developer.mozilla.org/en-US/docs/Web/CSS
- JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- JSON: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

Versions do not apply. These are browser features.

Unverified until the build starts: that `python3` is available on this computer so the local preview command below works. If it is missing, the build checks that before writing features and picks another one-command static server. That check does not add a framework.

## Where It Runs and How Someone Tries It
The first build runs locally in a browser. No API key is required.

From the project folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

A plain double-click of `index.html` is not the supported way to try it. Browsers often refuse to let a page read a neighboring JSON file that way. The local server only hands the same files to the browser. It is not a database and not a hosted AI service.

The demo recording uses that local page: open the site, submit a situation, pick a character, read a reply, switch characters, and, if useful, show the no-alternative message.

The hackathon requires two things: a public code repository and a short demo video. A separately hosted public app URL is not one of those rules. The local demo is the priority.

Publishing the same files at a public web address is a nice-to-have, and only if it is easy and free. It must not delay the working demo. It must not introduce hosting costs. No host is chosen in this spec. No paid hosting plan is activated. If a free option later proves awkward, the repository and the video still meet the hackathon rules.

## Look and Feel
Carried from `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`.

The page feels like a cheeky entertainment magazine mixed with a fun group chat. Writing is bold, modern, playful, and easy to read. Headings are strong. Body text is clean. Buttons and short messages have a little personality. The page stays polished and uncluttered, including on a phone.

Character colors:

- Awful Aunty, elephant: plum and pink
- No Mercy Uncle, lion: charcoal
- Your Hype Man, giraffe: green
- Your Crazy Little Sister, cat: lavender

The first build draws each character in the page with SVG, so the pictures travel with the files and do not come from another service. Each picture stays recognizable at card size and beside a reply: elephant, lion with a mane, giraffe, cat with ears and tail. Clothing starts with the signature pieces that can be drawn simply: Aunty’s glasses and a structured bag, Uncle’s suit and mane, the giraffe’s jacket and sneakers, the cat’s wig, hoops, and tail. Richer fashion detail can be refined after the journey works. Outfit changes are drawing changes, not new product features.

Fonts are chosen during implementation from fonts already on the computer, so the demo does not depend on a paid font or a font website. They must match the writing style above and not overpower the characters.

Copy that must appear exactly as written is taken from the PRD, including the typing lines, the empty-field message, the no-alternative message, and the non-emergency safety message. Typing lines are kept in one small list in `app.js` so their wording can change without changing the screen logic. The first build does not invent a delay, so those lines are not shown for an instant curated reply.

## Components

### Welcome screen
Shows the 18+ notice, the name, the tagline, the supporting line, the situation box, the line under the box, and submit. Talks to the page memory when submit succeeds.
PRD ref: `prd.md > Welcome screen`, `prd.md > Welcome screen submit`.

### Choose your advisor
Shows the situation summary, Edit, four cards, and “Let [Name] speak.” Talks to the character list and the page memory. Edit, Save changes, and Cancel stay on this view.
PRD ref: `prd.md > Choose your advisor`.

### Response screen
Shows the selected character, the reply or the no-alternative message, the situation, and the actions. Talks to the safety check and the matcher.
PRD ref: `prd.md > Response screen`, `prd.md > Response ready`, `prd.md > Response typing lines`, `prd.md > No suitable answer`.

### Safety check
Runs before any joke, including any future AI reply. Reads `data/safety.json`. Compares the whole situation, in lowercase, with curated phrases. A longer phrase beats a shorter one. A single everyday word is not enough to trigger safety.
PRD ref: `prd.md > Serious situation`.

The check has two lists:

- **Immediate danger.** Phrases for the five cases already listed in the PRD: suicide or self-harm, violence or threats happening now, being trapped or kept from safety, a life-threatening medical emergency, and someone else about to be seriously hurt. A match shows a brief supportive message telling them to get immediate help from local emergency services or someone they trust. No joke. No invented phone number. No follow-up question.
- **Serious, not immediate.** Phrases for distress that is not happening as an emergency right now. A match shows the exact non-emergency message from the PRD, then stops.

If a phrase is worrying but not clearly one of those two, it is listed with the immediate-danger result. That is the PRD’s rule for an unclear case: the brief help message, not a joke, and not another question. Past, news, fiction, and ordinary feelings are not given those phrases, so they do not automatically become the emergency message.

This is phrase matching, not understanding. It will miss some serious wording and may catch an ordinary sentence if a phrase is too broad. The build tests both, as required by `scope.md > Safety`. The page does not claim it can detect every emergency.

### Matcher
Reads `data/responses.json` after the safety check has allowed a joke. Keeps only replies for the selected character. A reply matches when one of its keywords or phrases appears in the situation. Longer keywords win. Ties keep the order in the file.

The page remembers which reply ids have already been shown for this character and this situation. “Ask for another response” shows the next match. When none remain, it shows the no-alternative message and offers “Try again” and “Ask another character.” It does not invent a reply.
PRD ref: `prd.md > Response ready`, `prd.md > No suitable answer`.

### Response library
The JSON file the matcher reads. Adding a reply means adding an entry. It does not require a change to the HTML. A short how-to sits beside the file.
PRD ref: `prd.md > What We're Building`. Scope ref: `scope.md > The Response Library`.

## Data Model
The current situation, the selected character id, and the ids already shown live only in the page’s memory while the tab is open. Submit, Save changes, and Submit again replace the situation text. Refreshing or closing the tab drops them. That is intentional for the first build: there is no account and no database.

A library entry looks like this:

```json
{
  "id": "work-aunty-sick",
  "character": "awful-aunty",
  "topic": "work-and-career",
  "keywords": ["don't wanna go to work", "dont wanna go to work", "work"],
  "text": "You don't want to go? Have you eaten? You sound poorly.",
  "needsReview": true
}
```

The first demo includes every character and enough sample replies to show different personalities for the same situation. `needsReview: true` means the line is sample copy. The page shows a visible label, “Sample — needs your review,” on any reply with that flag. It is not approved humour until Maro reviews it and the flag is removed. Scope ref: `scope.md > The Response Library`.

Character ids are `awful-aunty`, `no-mercy-uncle`, `hype-man`, and `crazy-little-sister`. Topics start as `work-and-career`, `dating-and-relationships`, `friendships`, `money`, and `everyday-life`. A new topic is a new string on an entry, not a code change.

Safety entries are phrases plus which message they select: `immediate` or `serious`. They are data, not jokes.

## File Structure

```
Tell me everything/
├── index.html          # All three views, one page
├── styles.css          # Look, including phone layout and character colors
├── app.js              # Views, safety check, matching, typing-line text
├── data/
│   ├── responses.json  # Curated replies
│   ├── safety.json     # Safety phrases
│   └── LIBRARY.md      # How to add a reply, an alternative, or a topic
├── devpost/            # Approved plans and this spec
└── README.md           # How to start the local preview
```

`characters` are a short list in `app.js` because they are the fixed cast, not growing library lines. Their typing lines live in that same list.

## External Services and Dependencies
None in the first build.

- No hosted AI, no API key, no paid API.
- No accounts, no database, no content-management system.
- No font service and no image host.
- A hosted public URL is not part of the first build. The hackathon rules for this spec are the public code repository and the demo video. A free, easy publication of these same files may be considered later. It is not allowed to delay the demo or to cost money. No host is selected here.

## Important Failure Modes
- **The JSON file fails to load.** The page shows a plain message that the replies could not be loaded, and it does not invent a joke.
- **No library line matches, or no further alternative exists.** The no-alternative message, with “Try again” and “Ask another character.”
- **A safety phrase matches.** The serious message for that list. No character joke.
- **Empty or whitespace-only text.** Submit or Save changes stays disabled, with “You’ll need to tell us something first!”

## What Was Simplified and Why
- **Curated replies only** instead of the conditional hosted AI path. The approved scope keeps AI behind a feasibility test. Putting it in the first build would add a server, a key, a provider, and a cost check before the journey can be tested. The same page can gain that path later without replacing the library.
- **In-page SVG characters** instead of commissioned editorial art. The animals, colors, and signature accessories are in the first demo. Finer wardrobe detail can be redrawn after the path works.
- **Memory that lasts only while the tab is open** instead of a database. The demo does not need the situation to survive a refresh.
- **Phrase lists for safety** instead of a model that reads meaning. The PRD’s “whole situation” rule is honored by matching curated phrases, including the cautious list for unclear danger, and by saying plainly that this can miss or over-catch. The page does not claim it detects every emergency.
- **A local static server** instead of a hosted website. It only lets the browser read the files for the demo. A public web address is optional later, and only if it is easy and free.

## Decisions and Open Issues
- **Plain HTML, CSS, JavaScript, and JSON.** Learner choice. Reason: the fastest understandable path to a local demo. Tradeoff: not a large-app foundation.
- **Curated journey first. AI, accounts, databases, and paid services stay out.** Learner choice. The working demo is local.
- **A hosted public URL is a nice-to-have, not a hackathon rule.** Learner clarification. The required submission pieces are a public code repository and a demo video. Publishing the app must not delay that demo and must not cost money. The approved scope and PRD files are unchanged.
- **Safety is a phrase list checked before any joke.** Derived from the PRD and the no-AI first build. Tradeoff: it cannot understand the way a person can. The build verifies it with serious phrases, ordinary phrases that must stay funny, and phrases that should not fire on news, fiction, or the past.
- **Maro’s uncertainty, carried from the start.** They want to see why a technical choice is made, and how a reply can be chosen without an AI model. This spec is the clarification: the page compares the typed situation with phrases stored in JSON, safety first, then jokes. The evidence during the build is a local test of one situation across four characters, one “another response,” one no-match, and one serious input.
- **The first working demo includes all four characters and enough sample responses to show their different personalities on the same situation.** Learner addition at approval. Any line that still needs Maro’s review is clearly labeled and is not treated as approved library content.
- **No public host is selected.** Publishing stays optional. It is revisited only after the local demo works, and only for an easy free option. Cost is out.
- **Specific font names are unresolved until implementation.** The style is already decided. The build picks readable fonts already on the computer.
