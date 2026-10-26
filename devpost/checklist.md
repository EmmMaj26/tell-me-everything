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

- [x] **2. Switch characters, ask for another reply, and edit the situation**
  Becomes usable: You can ask another character without retyping, ask the same character for another reply, and see “Try again” plus “Ask another character” when no other reply fits. Edit and the empty-text rules work.
  Why now: The first slice proves a reply exists. This slice finishes the rest of the journey around that reply. The later entertainment sits on this journey, and the last test needs these controls.
  PRD ref: `prd.md > Choose your advisor`, `prd.md > Response ready`, `prd.md > No suitable answer`, `prd.md > Welcome screen submit`
  Spec ref: `spec.md > The Core Journey Through the System`, `spec.md > Matcher`
  Build: Keep the situation when returning to the character cards. Add one extra needs-review reply per character for the same work situation, so a second request can show a different line. Serve the next matching reply, then the no-alternative message with both buttons. Add Try again, Submit again, Cancel, and Edit with Save changes and Cancel, including the empty and whitespace rules.
  Verify (mechanical): With the server running, switch characters and confirm the situation text is unchanged. Request another reply and confirm a different labeled line, then the no-alternative message with both buttons. Confirm an empty save or submit stays disabled.
  Learner check: From a reply, switch to another character without retyping, then ask for another reply and say whether the two choices make sense when there isn’t one.
  Commit: `Add character switching, another reply, and editing`

- [x] **3. Serious situations skip the joke**
  Becomes usable: A clearly serious non-emergency shows the agreed short message and stops. Immediate danger, and unclear danger, show a brief message to contact local emergency services or someone trusted. The work situation still gets a joke.
  Why now: A funny reply on a serious input is the main way the demo can go wrong, so this is checked before pictures, voices, or extra performance.
  PRD ref: `prd.md > Serious situation`
  Spec ref: `spec.md > Safety check`, `spec.md > Important Failure Modes`
  Build: Add the safety phrase file and run it before matching. Cover the PRD’s immediate-danger cases and the non-emergency message. Do not invent phone numbers or extra questions. Do not speak a character joke over a safety message.
  Verify (mechanical): Submit one immediate-danger phrase, one serious non-emergency phrase, and “I don't wanna go to work.” Confirm the first two are not jokes and the third still is.
  Learner check: Try one serious sentence and one ordinary sentence, and say whether the serious one stayed kind and the ordinary one stayed funny.
  Commit: `Check safety before showing a joke`

- [ ] **4. Make the page look like the four characters**
  Becomes usable: The working journey now has the character colors, simple animal pictures, strong readable type, and a layout that is usable on a phone. Behavior stays the same.
  Why now: The talking pictures and the argument scene need a simple animal to move. Drawing them after the journey works means a picture problem cannot block the demo.
  PRD ref: `prd.md > Look and Feel`
  Spec ref: `spec.md > Look and Feel`
  Build: Apply the magazine-and-group-chat feel, the four color treatments, and simple in-page animal drawings with the signature accessories. Use fonts already on the computer. Keep each animal as one picture the later steps can animate.
  Verify (mechanical): Reload the local page and confirm each character is visibly distinct at card size and beside a reply, with no missing-image errors.
  Learner check: Look at all four characters on your phone or a narrow window, and say whether they are recognizable and the page is easy to read.
  Commit: `Style the four animal characters`

- [ ] **5. Give each character a browser voice**
  Becomes usable: Pressing “Let [Name] speak” reads that character’s reply aloud in a voice that is distinct from the other three. The written reply still appears if sound is unavailable.
  Why now: This is the first entertainment add-on, and it uses only the speech feature already in the browser. It comes after the journey and the animals so the demo is already complete if a computer has no suitable voice.
  PRD ref: `prd.md > Response ready`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Components`, `spec.md > External Services and Dependencies`, `spec.md > Important Failure Modes`
  Build: Add a small voice file with pitch, rate, and a male or female hint for each character. Use the browser’s built-in `speechSynthesis` and a voice already installed on the computer. Start speech from the existing button click. Add a way to stop it. If the browser has no speech feature, show the text and a short note. Do not call a voice service.
  Verify (mechanical): On the local page, submit the work situation, let each character speak, and confirm four different pitch or rate settings and that the text remains visible. In a browser check, confirm no request leaves the computer for a voice.
  Learner check: Listen to all four characters say the work reply, and say whether you can tell them apart without looking at the name.
  Commit: `Read each reply in a distinct browser voice`

- [ ] **6. Let the animals react while they speak**
  Becomes usable: The chosen animal moves while its line is being read, then settles when the sound stops. The written reply and the buttons stay usable.
  Why now: The voice step provides a real start and stop. The animation follows that, instead of pretending to talk on a timer.
  PRD ref: `prd.md > Look and Feel`, `prd.md > Response ready`
  Spec ref: `spec.md > Look and Feel`, `spec.md > Components`
  Build: Add CSS motion for a small reaction and a speaking pose on each animal. Turn the speaking pose on when the browser starts the voice and off when it ends or is stopped. Keep the motion short and readable on a phone.
  Verify (mechanical): Let one character speak and confirm the picture moves during the sound and stops when the line ends or Stop is pressed. Switch characters and confirm the previous animal is still.
  Learner check: Play one reply with sound and say whether the animal feels like it is talking, and whether the page is still easy to read.
  Commit: `Animate the animal while the reply is spoken`

- [ ] **7. Add an optional scripted argument**
  Becomes usable: After a reply, you can choose to watch a short argument between characters. Crazy Little Sister moves toward No Mercy Uncle, they trade a few scripted lines, and the other two react. You can skip it. Your own reply stays on the page.
  Why now: This is the most fiddly extra. It comes after voices and motion exist, and it stays optional so a problem here cannot block the demo.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Response library`, `spec.md > Data Model`, `spec.md > What Was Simplified and Why`
  Build: Add one editable scene file for the work situation. Each beat names the speaker, the line, and an optional character to move toward. Play the beats with the browser voice and the speaking animation. Move Sister toward Uncle with a CSS shift, then return everyone when the scene ends or is skipped. Label the scene lines as needing review. If the move is unreliable, keep the same script as speech bubbles in place and do not add a heavier animation.
  Verify (mechanical): Submit the work situation, start the scene, and confirm Sister’s picture shifts toward Uncle, the lines come from the scene file, Skip ends it, and the original reply is still there. Confirm a safety result does not offer the scene.
  Learner check: Watch the argument once and skip it once, and say whether it feels like a fun extra rather than a new task.
  Commit: `Add an optional scripted character argument`

- [ ] **8. Re-test the whole journey after the extras**
  Becomes usable: Confidence that the pictures, voices, motion, and optional scene did not break the journey. No new feature is added.
  Why now: It is the last check before the deadline demo. It covers character switching, another response, editing, and the safety rules, plus the new sound and scene.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Serious situation`
  Spec ref: `spec.md > The Core Journey Through the System`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Walk the existing journey on the finished page and fix anything the later slices broke.
  Verify (mechanical): On the finished page, run the work situation through all four characters, switch characters, request another reply, edit the situation, submit an empty situation, submit one serious phrase, play one voice, and start then skip the scene. Confirm each result still matches the earlier slices.
  Learner check: Use the app for one ordinary situation and one serious situation, and say whether anything that worked before now feels broken.
  Commit: `Confirm the journey still works after the extras`

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

- After the tested Step 1 checkpoint, Maro asked for browser voices, speaking animations, an optional scripted argument, and a full journey retest. The unfinished journey stays first, because that retest includes switching, another reply, editing, and safety, and those controls are not in the checkpoint. The animal drawings stay before the animation. The old “retest after styling” step is now slice 8, after the extras. Voices use the browser’s built-in speech only. The argument is one optional, editable scene; if moving a character is unreliable, the same lines play in place.
- 14 October 2026: Maro tested blank submission, editing, asking for another response, switching characters, and Try again. Those checks passed and match slice 2. The Git checkpoint `c0e6b90` stays unchanged, so this pass is recorded here only.
- Maro asked for the animal pictures before the safety slice. Slice 3 stays unchecked. This picture step does not add voices, playback, motion, or the argument.
- 14 October 2026: The eight work-situation sample replies were rewritten for variety. Your Crazy Little Sister’s catchphrase is no longer the opening of her first reply. It appears once, inside her second reply. Nosey Aunty’s signature love-life line appears once, in her first reply. Samples stay labeled for review. No testing slice was marked passed.
- 14 October 2026: The welcome screen was restyled, with decorative speech bubbles for the four characters, Back, and a confirmed Start over. Reply text, artwork, and safety behaviour were left as they were. No testing slice was marked passed.
- 15 October 2026: Your Crazy Little Sister’s signature portrait is now the standing, arms-crossed illustration. The earlier seated portrait is kept as crazy-little-sister-seated.png. Welcome bubbles and the situation card got a light comic-magazine treatment. No testing slice was marked passed.
- 20 October 2026: Safety now runs before keyword matching, from `data/safety.json`, on the first reply, Ask for another response, and Submit again. One needs-review workplace-conflict sample was added per character. Slice 3 stays unchecked because the learner check has not been done. Mechanical checks run in the browser at `http://localhost:8000/?v=editorial13` all passed:
  - “My colleague keeps taking credit for my work, and I'm so angry I want to confront them tomorrow.” returned the new labeled sample for all four characters. It did not return a safety message or a “don't wanna go to work” reply. A second request for the same character showed the existing no-match message.
  - “I'm so angry with my colleague that I want to hurt them. Tell me how to do it without getting caught.” returned the exact immediate-danger message for all four characters. The character name and portrait stayed. The sample label, Try again, and Ask for another response were hidden. A forced click of Ask for another response, and choosing another character, still showed that same message.
  - “My partner threatened to hurt me tonight, and I'm scared to go home. What should I do?” did the same for all four characters.
  - “I feel hopeless about everything.” returned the agreed supportive message for all four characters, with no joke and no Ask for another response.
  - “I don't wanna go to work” still returned both existing labeled work replies for each character.
  - Submit again could not keep a joke: changing a work reply to the threat sentence, and changing the credit reply to the hurt sentence, both replaced the reply with the immediate-danger message.
- 20 October 2026, later: Two more situations were tried on the current local app at `http://localhost:8000/?v=safety-two`, with Your Crazy Little Sister and Nosey Aunty. Slice 3 stays unchecked.
  - “My partner gets violent when I disagree, and I'm scared about tonight.” showed the ordinary no-match message for both characters. It did not trigger the immediate-danger message.
  - “Someone at home said they would hurt me if I came back.” showed the ordinary no-match message for both characters. It did not trigger the immediate-danger message.
- 24 October 2026: Hands-on browser testing passed the slice 3 checks. Safety uses a limited phrase list and is not a comprehensive classifier. The dishes situation still needs a funny library reply.
  - “I don't wanna go to work” produced replies for all four characters. The second reply and the ordinary no-match behaviour worked.
  - Back preserved the original situation and reply. Edit → Cancel restored the original situation and reply. Start over → Keep it preserved state. Confirming Start over cleared the previous situation and reply.
  - “Someone at home said they would hurt me if I came back.” displayed the immediate-danger message for all four characters. Switching characters from that result preserved the safety message. The result did not offer another response.
  - “I feel hopeless about everything.” displayed the supportive serious-distress message for all four characters.
  - “My partner and I had an argument about the dishes.” displayed the ordinary no-match message for all four characters and did not trigger safety.
  - Previously the same day, at `http://localhost:8000/?v=safety-violent`, “My partner gets violent when I disagree, and I'm scared about tonight.” and “Someone at home said they would hurt me if I came back.” both triggered the immediate-danger message for Your Crazy Little Sister and Nosey Aunty. The dishes argument stayed an ordinary no-match, and “I don't wanna go to work” still produced the existing work replies. This followed the earlier miss recorded above, after `partner gets violent` and `would hurt me` were added to the phrase list.
