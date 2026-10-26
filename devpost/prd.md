---
doc: prd
status: approved
---
<!-- `status` is the progress state every skill reads. Write `draft` when you first save this file,
     and change it to `approved` when the learner clearly approves the displayed plan ("looks good" counts).
     Do not request a second sign-off. Never skip the draft save —
     an unsaved draft dies with the conversation. -->

<!-- This is the complete product definition: the scope sketch, filled in. Adapt it
     to the product. Drop any section that doesn't apply, and add sections this product
     needs. Completeness is the standard, not length — a short PRD for a small product
     is correct. Keep it inside the approved POC boundary.

     Keep heading names stable and descriptive: `4-spec` and `5-build` reference
     them by name. -->

# Tell Me Everything! — Product Requirements

A public web app where an adult shares a situation and hears it back from one of four characters. Source: `scope.md > Who It's For` and `scope.md > The Core Loop`.

This draft records the welcome screen, character choice, the response screen, and the four characters' visual direction.

## The Core Journey
Source: `scope.md > The Core Loop`.

1. Someone opens Tell Me Everything! and lands on the welcome screen. The 18+ notice is at the top, before the app name and tagline. It stays visible without taking over the screen. Below it they see the name, the tagline, the supporting line, a place to describe what happened, and the line under that box. They have not chosen a character yet.
2. They enter the situation and submit it. They do this before they choose a character. Submit stays disabled while the box is empty or only spaces, and the screen says “You’ll need to tell us something first!” Once they type something, submit turns on. A successful submit trims spaces at the start and end. They stay on this screen until there is something to send.
3. They arrive on Choose your advisor. They see the situation they just submitted, with a way to edit it, and four character cards. Edit stays on this screen: the summary becomes a text field filled with the current situation, with Save changes and Cancel. Save changes stays unavailable while the field is empty or only spaces, and the screen says “You’ll need to tell us something first!” A real save trims spaces at the ends, keeps the wording in the middle, and returns to the normal card view. Cancel always restores the previous text. Neither action asks for a response. They select one card. The card is highlighted, and a button names that character, for example "Let Nosey Aunty speak." The next character they choose answers the latest saved situation.
4. They click that button. The same situation is kept. They do not type it again. If a reply is genuinely being prepared, they see that character's typing line. If a curated reply is ready immediately, they see the reply with no added wait. The typing line disappears as soon as the reply is ready.
5. The ready screen shows the selected character's name and visual identity first, then the full response. The original situation stays reachable. “Ask another character” returns to Choose your advisor with that same situation, so they can pick a different character. The new character responds to it without asking them to type it again. “Ask for another response” stays on the response screen. The same character gives a different answer to the same situation, shown in place of the previous one. They do not type the situation again or choose another character. If they tap “Ask for another response” and no suitable alternative is available, they see “Hmm, we need a little more to work with! Try telling us what happened in a different way.” and two choices: “Try again” and “Ask another character.” Try again makes the original situation editable on the response screen. They change the text and tap “Submit again.” The current character stays selected. Cancel restores the original situation and returns to the previous response. They are not sent back to the welcome screen. A serious situation still uses that character, with a serious tone and no jokes. If it suggests immediate danger, the response is safety guidance instead.

The loop can be acted out from opening the app to reading a reply and trying another character. The characters' visual direction is defined under Look and Feel. Clothing details can be refined later. They are not extra product features.

## Screens and Layout

### Welcome screen
Source: `scope.md > The Core Loop` and `scope.md > The POC Boundary`.

This is the first screen. The 18+ notice is at the top, before the app name and tagline. It stays visible and does not distract from the rest of the screen. The copy below it is:

- **Name:** Tell Me Everything!
- **Tagline:** You tell them. They listen. They may or may not judge.
- **Supporting line:** Four personalities. Your business. And absolutely no peace.
- **Situation box placeholder:** Tell us what happened. Leave absolutely nothing out...
- **Line under the box:** Is it work drama? Relationship issues? Friendship stuff? Tell us, we're listening.

The person types the situation here and submits it. They cannot submit an empty situation. If the box is empty or contains only spaces, the submit button is disabled and the screen shows “You’ll need to tell us something first!” Once they type something, the button is enabled. Submitting removes extra spaces at the beginning and end. They stay on this first screen until they have entered something. Choosing a character happens on the next screen.

### Choose your advisor
Source: `scope.md > The Core Loop`.

This screen appears after the situation is submitted. It stays simple, playful, accessible, and usable on a phone.

- **Heading:** Okay, who are we asking?
- **Supporting line:** Your juicy business has been received. Choose your advisor wisely. Or don't. We love a bad decision.
- The submitted situation is shown in a visible summary, with Edit.
- Edit turns that summary into a text field already filled with the current situation. Save changes and Cancel are shown. All four character cards stay visible. The person remains on this screen.
- Save changes stores the edited text and returns to the normal character-selection view. It cannot be completed when the field is empty or only whitespace: the action is disabled, and the screen shows “You’ll need to tell us something first!” Cancel still works and restores the previous situation. A successful save trims leading and trailing whitespace and preserves internal formatting. Neither action requests a response. The person stays on Choose your advisor throughout.
- The next advisor they choose responds to the latest saved situation.
- All four characters appear as separate cards the person can click.

The card lines below are interface copy. They do not replace the personalities in `scope.md > Inspiration & Identity`.

- **Nosey Aunty** — all up in your business. Full of advice and love, very nosy.
- **No Mercy Uncle** — brutally honest. Calls out your nonsense. Wants you to do better, even when it hurts.
- **Your Hype Man Brother** — believes in you. Pumps you up. Finds the bright side. Turns every problem into a comeback story.
- **Your Crazy Little Sister** — side-eye, questions, pure audacity, on your side and still unhinged.

One character can be selected at a time. The selected card has a clear visual highlight. A button shows the selected character's name, for example "Let Nosey Aunty speak." Clicking it opens that character's response.

There is no account, no payment, and no requirement to pick a topic first.

### Response screen
Source: `scope.md > The Core Loop` and `scope.md > Matching and the Hybrid Reply`.

While a response is genuinely being prepared, the screen shows the selected character's typing line. These lines are interface copy. They do not change `scope.md > Inspiration & Identity`, and they are not entries in the curated response library.

- **Nosey Aunty:** “Nosey Aunty is typing… and she's shocked. 😱”
- **No Mercy Uncle:** “No Mercy Uncle is typing… and he's coming for you. 💀”
- **Your Hype Man Brother:** “Your Hype Man Brother is typing… and he's about to bring it! 🔥”
- **Your Crazy Little Sister:** “Your Crazy Little Sister is typing… and she is giving you bombastic side eye . 👀”

The lines can be revised on their own, without changing how the rest of the screen behaves.

If a curated response is available immediately, the screen does not add a wait and does not show the typing line. As soon as a response is ready, the typing line is hidden and the response is shown.

If preparing a response fails, the approved fallback applies. A suitable curated response is shown first. If no suitable curated response exists, the screen shows “Hmm, we need a little more to work with! Try telling us what happened in a different way.” A button labeled “Try again” makes the original situation editable on the response screen. They change the text and tap “Submit again.” The current character stays selected. Cancel restores the original situation and returns to the previous response. They are not sent back to the welcome screen. Source: `scope.md > Matching and the Hybrid Reply`.

When the response is ready, the screen stays uncluttered:

- The selected character's name and visual identity come first and are prominent. The identity is that character's animal design, described under Look and Feel, and it stays recognizable at card size and beside the response.
- The full response follows, in readable conversational formatting that keeps that character's voice and humour.
- The original situation stays accessible.
- The primary action is labeled “Ask another character.” It returns to Choose your advisor, keeps the original situation, and lets them choose a different character. That character responds to the same situation. They do not type it again.
- “Ask for another response” stays on the response screen. The same character gives a different answer to the same situation, and that answer replaces the previous one. They do not type the situation again or choose another character. If no suitable alternative is available, they see “Hmm, we need a little more to work with! Try telling us what happened in a different way.” and can choose “Try again” or “Ask another character.” Try again makes the situation editable on the response screen. “Submit again” sends the revised text to the same character. Cancel restores the original situation and the previous response. They are not sent to the welcome screen. The existing typing rule still applies: a line only while a reply is genuinely being prepared, and no added wait when a curated reply is ready immediately.
- A serious situation keeps the character’s identity and drops the comedy. The check runs before any normal or AI reply. A non-emergency uses the final short message beginning “I’m really sorry you’re going through this.” Immediate danger uses the safety guidance instead of showing only that message. Source: `scope.md > Safety`.

## Look and Feel
The welcome copy should feel conversational, playful, intriguing, and mischievous. It invites someone to share, and it sets the expectation that the four characters may answer with different opinions, including blunt or judgmental ones.

Choose your advisor should feel simple, playful, accessible, and mobile friendly. A selected card must be visibly distinct from the others.

The ready response screen is uncluttered. The character's name and visual identity are the prominent part. The response reads as conversation, not as a dense block that flattens the joke.

The four characters are animals in human fashion: clothing, accessories, poses, and expressions. Recognizable animal features stay visible. Someone should be able to tell they are animals. Clothing and accessories sharpen that identity. They do not hide it.

The shared style is fashion-forward, expressive, cool, and polished: one cast of editorial cartoon mascots, not children's storybook animals. One illustrative style covers all four, with coherent proportions, rendering, lighting, and detail. Each character has a color treatment. The designs work small on the selection cards and stay recognizable beside a response.

Outfits below are visual direction. They can be refined later. They are not new product features. Personalities stay as in `scope.md > Inspiration & Identity`. Typing lines stay as already written.

- **Nosey Aunty is an elephant.** Glamorous, loving, and extremely nosy. Large ears, a long trunk, and grey skin. Voluminous dark hair with silver highlights, stylish glasses, pearl jewellery, and gold accessories. A plum blouse, blush-pink trousers, heels, and a fashionable handbag. Color treatment: plum, pink, cream, and gold.
- **No Mercy Uncle is a lion.** Mature, imposing, and dry. A full mane, a feline muzzle, and whiskers. His signature look is a sharp charcoal tailored suit, white shirt, dark tie, pocket square, polished dark shoes, and a gold watch. Color treatment: charcoal, deep brown, muted gold, and cream.
- **Your Hype Man Brother is a giraffe.** Charismatic and energetic. A long neck, brown spots, ossicones, and a giraffe muzzle. His signature look is a green varsity jacket, white T-shirt, dark trousers, green-and-white trainers, a gold chain, and dark sunglasses. Color treatment: forest green, sage green, warm brown, gold, cream, and white.
- **Your Crazy Little Sister is a cat.** Glamorous, fashionable, and mischievous, confident and cheeky, not sexualized. A long black wig with a fashionable center part or dramatic waves. Gold hoop earrings, layered gold necklaces, and long manicured nails. A trendy outfit such as a crop top with jeans and sneakers or heels, or a mini dress with heels. Dramatic side-eye, arched eyebrows, suspicion, and judgmental amusement. Ears and tail stay visible. Color treatment: lavender.

The writing is bold, modern, playful, and easy to read. Headings are strong. Body text is clean. Buttons and messages have a little personality. The overall feel is a cheeky entertainment magazine mixed with a fun group chat: polished and readable, not childish or cluttered. The type complements the four colourful animal characters and does not compete with them. Suitable fonts are chosen during implementation to match this style. Character color treatments are already set.

The four characters keep the names and personalities in `scope.md > Inspiration & Identity`:

- **Nosey Aunty:** affectionate, inquisitive, funny when she judges, dramatic, and impossible to keep out of your business. Her signature line is: "So tell me everything… including your love life, oh!"
- **No Mercy Uncle:** brutally honest, dryly sarcastic, and demanding, with a love he rarely says out loud. His signature line is: "I'm going to tell you what nobody else has the guts to say."
- **Your Hype Man Brother:** charismatic, enthusiastic, and fiercely loyal. He is hilariously overconfident, and his support is genuine. His signature line is: "First of all, you're a legend. Now let's figure this out!"
- **Your Crazy Little Sister:** exasperated, judgemental, scandalised, nosy, and interrogative. Her signature catchphrase is: "Babe. I know you fucking lying."

## Features and Behavior

### Welcome screen submit
Source: `scope.md > The Core Loop`.

An empty situation cannot be submitted. While the text box is empty or only spaces, the submit button is disabled and the message is “You’ll need to tell us something first!” Typing something enables the button. Submit trims leading and trailing spaces. The person remains on the welcome screen until they enter something.

### Choose your advisor
Source: `scope.md > The Core Loop`.

The person selects one character at a time. The selected card is highlighted. The button uses that character's name. Clicking the button goes to the response and keeps the latest saved situation.

Edit does not leave Choose your advisor and does not request a response. The summary becomes an editable field prefilled with the existing text. The four cards stay visible. Save changes is disabled when the field is empty or contains only whitespace, and the message “You’ll need to tell us something first!” is shown. Cancel still restores the previous situation. A completed save trims leading and trailing whitespace, preserves internal formatting, updates the situation, and restores the normal selection view. The next chosen advisor answers that latest saved version.

After a response, the person can choose another character to compare perspectives, or request another response, as in `scope.md > The Core Loop` and `scope.md > Matching and the Hybrid Reply`. Switching characters does not ask them to type the situation again.

### Response typing lines
Source: `scope.md > The Core Loop`.

The typing line matches the selected character and appears only while a response is genuinely being prepared. A curated response that is ready immediately is shown at once. When the response is ready, the typing line is gone and the response is visible. A failed attempt follows the approved fallback: a suitable curated response first. If none exists, the no-suitable-answer message and “Try again” are shown. The four lines can be changed without changing the rest of the screen's behavior.

### Response ready
Source: `scope.md > The Core Loop`, `scope.md > Matching and the Hybrid Reply`, and `scope.md > Safety`.

The ready screen leads with the selected character's name and visual identity, then the full response in that voice. The original situation stays accessible. “Ask another character” returns to Choose your advisor with that situation kept. They choose a different character, and that character responds to the same situation without a retype. “Ask for another response” keeps them on the response screen. The same character’s different answer replaces the previous one. They do not retype the situation or pick another character. If no suitable alternative is available, they see the no-suitable-answer message and can choose “Try again” or “Ask another character.” A serious situation on this screen keeps the character and uses the serious response defined under Serious situation.

### No suitable answer
Source: `scope.md > Matching and the Hybrid Reply`.

When “Ask for another response” has no suitable alternative, the message is: “Hmm, we need a little more to work with! Try telling us what happened in a different way.”

The screen offers “Try again” and “Ask another character.” “Ask another character” returns to Choose your advisor with the situation kept.

“Try again” makes the original situation editable on the response screen. They can change the text and tap “Submit again.” The current character stays selected. They are not sent back to the welcome screen. Cancel restores the original situation and returns to the previous response.

### Serious situation
Source: `scope.md > Safety`.

This check happens before the character’s normal response is shown, including when an AI service is used. A humorous reply is not shown for a serious situation.

The character’s identity stays. The tone is short, kind, and non-judgmental. There are no jokes, sarcasm, teasing, or judgement. This is a safety response, not a counselling conversation, and it does not continue into extra back-and-forth.

For a serious situation that is not an immediate emergency, the response is this message:

“I’m really sorry you’re going through this. You deserve support, and you don’t have to handle it alone. ❤️
I’m an entertainment app, so I’m not equipped to provide the support you may need right now. Please consider reaching out to someone you trust who can be there for you.”

If the situation suggests possible immediate danger, do not show only that standard message. Use the immediate-danger guidance below instead.

Possible immediate danger is judged from the meaning of the whole situation, not from single keywords. Past experiences, news, fiction, or feelings, with no sign of immediate danger, do not automatically get the emergency response.

Treat a situation as possible immediate danger when the person describes any of these:

- **Suicide or self-harm.** They intend to end their life, have already hurt themselves, have taken a potentially dangerous amount of medication, or are about to do something that could seriously harm them.
- **Violence or threats.** Someone is threatening to kill or seriously hurt them or another person, or violence is happening now.
- **Abuse or coercion.** They are currently trapped, being attacked, threatened with serious harm, or prevented from reaching safety.
- **Medical emergencies.** They describe signs of a potentially life-threatening emergency, such as severe difficulty breathing, unconsciousness, or heavy bleeding.
- **Immediate danger to another person.** They believe someone else is about to seriously hurt themselves or another person.

The handling stays simple, and it is sufficiently defined for this PRD.

- **Clear immediate danger.** Do not show a humorous character response. Show a brief, supportive message encouraging them to seek immediate help from local emergency services or someone they trust. Do not invent emergency phone numbers. Do not add follow-up questions or a longer conversation.
- **Serious, but not immediate danger.** Show the agreed non-emergency message above, and stop there.
- **Unclear whether anyone is in immediate danger.** Do not ask another question. Show the same brief, supportive safety message used for clear immediate danger, instead of a humorous reply.

No further safety scenarios, counselling features, or extra conversation are part of this proof of concept. The fun character journey is the focus. The app must not claim that it can detect every emergency. Basic matching remains imperfect, as in `scope.md > Safety`.

## Product Decisions
- **Situation before character.** The person describes what happened, and submits it, before they pick who answers. An empty or whitespace-only box cannot be submitted. The same message as Save changes appears: “You’ll need to tell us something first!” They stay on the welcome screen until there is something to send. Submit trims spaces at the start and end.
- **Landing copy, as written above.** The tone invites a confession and warns that the replies may judge.
- **The 18+ notice leads the welcome screen.** It sits at the top, before the name and tagline, visible and quiet enough that the invitation still leads. Source: `scope.md > The POC Boundary`.
- **Edit stays on Choose your advisor.** The summary becomes a prefilled text field. Save changes is disabled when there is nothing but empty space, with the message “You’ll need to tell us something first!” Cancel still restores the previous situation. A real save trims the ends, keeps internal formatting, and returns to the card view. No response is requested until they choose an advisor, and that advisor hears the latest saved situation.
- **Card lines are interface copy.** The approved character definitions stay in the scope.
- **Typing lines are interface copy.** They are initial proposals for the response screen. They are not character definitions and not library responses. They show only during real preparation, never as a fake pause.
- **“Ask another character” returns to Choose your advisor.** The situation stays. They pick a different character, and that character answers the same situation.
- **“Ask for another response” stays on the response screen.** The same character gives a different answer to the same situation, in place of the previous one. No retype, and no new character choice.
- **No suitable alternative offers two ways forward.** The message is “Hmm, we need a little more to work with! Try telling us what happened in a different way.” The choices are “Try again” and “Ask another character.” Try again edits on the response screen. Ask another character returns to Choose your advisor with the situation kept.
- **The ready screen stays uncluttered.** Name and visual identity, the response, the situation, and those two actions.
- **Safety is sufficiently defined for this PRD.** A non-emergency uses the short message beginning “I’m really sorry you’re going through this,” then stops. Clear immediate danger, and cases where immediate danger is unclear, use a brief supportive message to seek help from local emergency services or someone trusted, with no joke and no follow-up question. No emergency numbers are invented. No extra safety scenarios or counselling chat.
- **The cast is four dressed animals.** Elephant, lion, giraffe, and cat, in one editorial-cartoon style. Animal features stay recognizable. Outfit details are direction, not features, and can change later.
- **The writing is bold, modern, playful, and easy to read.** Strong headings, clean body text, and a little personality in buttons and messages. Cheeky magazine plus fun group chat. Polished, not childish or cluttered. Type supports the characters and does not compete with them. The specific fonts are chosen during implementation.

## What We're Building
The welcome screen, Choose your advisor, the typing lines, and the ready response screen, inside the approved scope. The scope remains the source of truth for the public app, the library-first reply, the conditional AI feasibility test, the safety override, character switching, another-response, fallback, and the rule that nothing paid is turned on without explicit approval.

## Open Questions
None that block this PRD. It is ready for approval. Safety handling is sufficiently defined. The writing style is defined. Specific font choices happen during implementation, matched to that style. If “Ask for another response” has no suitable alternative, the app shows the clear message and offers “Try again” or “Ask another character.”
