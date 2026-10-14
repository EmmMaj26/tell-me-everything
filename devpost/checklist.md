---
doc: checklist
status: approved
---
<!-- `status` is the progress state every skill reads. Write `draft` when you first save this file,
     and change it to `approved` when the learner clearly approves the displayed plan ("looks good" counts).
     Do not request a second sign-off. Never skip the draft save —
     an unsaved draft dies with the conversation. -->

# Build Checklist

Build mode: learn — Maro tests the app after slice 1 before the next step

## Slices

- [x] **1. Four characters answer the same situation**
  Becomes usable: A local site where you can pass the 18+ notice, type “I don't wanna go to work,” see all four characters, pick any of them, and read a distinct sample reply. Each sample reply is visibly labeled “Sample — needs your review.”
  Why now: This is the heart of the app, so it comes first. Starting the local server and creating the page files happens inside this step, not as a separate setup step.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Welcome screen`, `prd.md > Welcome screen submit`, `prd.md > Choose your advisor`, `prd.md > Response ready`
  Spec ref: `spec.md > Where It Runs and How Someone Tries It`, `spec.md > Components`, `spec.md > Data Model`, `spec.md > File Structure`
  Build: Create the page files and the JSON library. Include at least one needs-review reply per character for the same work situation. Wire welcome, character choice, and an immediate reply. No fake typing delay.
  Verify (mechanical): Start `python3 -m http.server 8000`, open the local page, submit the work situation for each character, and confirm four different labeled replies and no console errors.
  Learner check: Open the local site, try “I don't wanna go to work” with all four characters, and say whether each reply sounds like that character.
  Commit: `Show four character replies for one situation`

- [ ] **2. Switch characters, ask for another reply, and edit the situation**
  Becomes usable: You can ask another character without retyping, ask the same character for another reply, and see “Try again” plus “Ask another character” when no other reply fits. Edit and the empty-text rules work.
  Why now: The first slice proves a reply exists. This slice finishes the rest of the journey around that reply.
  PRD ref: `prd.md > Choose your advisor`, `prd.md > Response ready`, `prd.md > No suitable answer`, `prd.md > Welcome screen submit`
  Spec ref: `spec.md > The Core Journey Through the System`, `spec.md > Matcher`
  Build: Keep the situation when returning to the character cards. Serve the next matching reply or the no-alternative message with both buttons. Add Try again, Submit again, Cancel, and Edit with Save changes and Cancel, including the empty and whitespace rules.
  Verify (mechanical): With the server running, switch characters and confirm the situation text is unchanged. Request another reply until the no-alternative message appears with both buttons. Confirm an empty save or submit stays disabled.
  Learner check: From a reply, switch to another character without retyping, then ask for another reply and say whether the two choices make sense when there isn’t one.
  Commit: `Add character switching, another reply, and editing`

- [ ] **3. Serious situations skip the joke**
  Becomes usable: A clearly serious non-emergency shows the agreed short message and stops. Immediate danger, and unclear danger, show a brief message to contact local emergency services or someone trusted. The work situation still gets a joke.
  Why now: A funny reply on a serious input is the main way the demo can go wrong, so this is checked before any visual polish.
  PRD ref: `prd.md > Serious situation`
  Spec ref: `spec.md > Safety check`, `spec.md > Important Failure Modes`
  Build: Add the safety phrase file and run it before matching. Cover the PRD’s immediate-danger cases and the non-emergency message. Do not invent phone numbers or extra questions.
  Verify (mechanical): Submit one immediate-danger phrase, one serious non-emergency phrase, and “I don't wanna go to work.” Confirm the first two are not jokes and the third still is.
  Learner check: Try one serious sentence and one ordinary sentence, and say whether the serious one stayed kind and the ordinary one stayed funny.
  Commit: `Check safety before showing a joke`

- [ ] **4. Make the page look like the four characters**
  Becomes usable: The working journey now has the character colors, simple animal pictures, strong readable type, and a layout that is usable on a phone. Behavior stays the same.
  Why now: The journey is already testable. Visual polish comes after it works, so a drawing problem cannot block the demo.
  PRD ref: `prd.md > Look and Feel`
  Spec ref: `spec.md > Look and Feel`
  Build: Apply the magazine-and-group-chat feel, the four color treatments, and simple in-page animal drawings with the signature accessories. Use fonts already on the computer.
  Verify (mechanical): Reload the local page and confirm each character is visibly distinct at card size and beside a reply, with no missing-image errors.
  Learner check: Look at all four characters on your phone or a narrow window, and say whether they are recognizable and the page is easy to read.
  Commit: `Style the four animal characters`

- [ ] **5. Re-test the whole journey after the visual changes**
  Becomes usable: Confidence that the colors and pictures did not break the journey. No new feature is added.
  Why now: It comes after the visual step, which is when a layout change can quietly break a button or a message.
  PRD ref: `prd.md > The Core Journey`
  Spec ref: `spec.md > The Core Journey Through the System`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Walk the existing journey on the styled page and fix anything the visual step broke.
  Verify (mechanical): On the styled page, run the work situation through all four characters, switch characters, request another reply, submit an empty situation, and submit one serious phrase. Confirm each result still matches the earlier slices.
  Learner check: Use the styled app for one ordinary situation and one serious situation, and say whether anything that worked before now feels broken.
  Commit: `Confirm the journey still works after styling`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 1, when all four characters can answer the same situation
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: not started
Route and stops: not started
Edit outcome: not started
Reflection: not started
Activity mode: not started

## Revisions
