---
doc: scope
status: approved
---
<!-- `status` is the progress state every skill reads. Write `draft` when you first save this file,
     and change it to `approved` when the learner clearly approves the displayed plan ("looks good" counts).
     Do not request a second sign-off. Never skip the draft save —
     an unsaved draft dies with the conversation. -->

<!-- Scope is a rough sketch of the heart of the idea — NOT the detailed product
     definition. Resist the urge to fill this out exhaustively: features, screens,
     and behavior belong in the PRD, which comes next. Capture what makes this
     project distinctive and what belongs in a coherent proof of concept.
     Add a section if the conversation surfaced something important that
     doesn't fit below. Keep it short and readable. -->

# Tell Me Everything!

A fun little web app for adults, open to hackathon judges through a shareable link. Someone describes a situation, picks one of four characters, and gets a quirky, funny reply. The curated library answers first. A hosted AI reply is allowed only when that library has nothing suitable, and only if an early feasibility test says it is viable.

## The Unique Kernel
The same situation comes back in four completely different personalities, and you can switch characters and compare them. Written, curated lines are the heart of the library and are always tried first. When no suitable curated line exists, a hosted model may answer in the selected character's voice, guided by curated examples and the character descriptions. If that model is unavailable, the app still has a reliable fallback. The library stays part of the product and can keep growing.

## Who It's For
An adult, 18 or over, of any gender, in a moment when they want something a little different: a nice, quirky, funny answer about a situation they're dealing with. Hackathon judges need to open the same app from a shareable URL and try it themselves. The characters may use occasional profanity, sarcasm, and adult humour. What they do today instead is not established.

## The Core Loop
They open Tell Me Everything!, see the 18+ notice, describe a situation, and choose one of four characters. A serious situation overrides every joke, curated or generated, and shows a compassionate, serious message.

Otherwise the curated library is checked first. If it has a suitable response, they see it in that character's voice. If several suitable responses exist, they can ask for another one where practical. They can try the same situation with another character and compare.

If the library has nothing suitable, and the AI feasibility test has passed, and the hosted model is available inside its usage allowance, the app asks that model for a reply in the selected character's voice. The model is guided by curated examples and the character descriptions. If the model is unavailable or its allowance is exhausted, a suitable curated response is used first. If no suitable curated response exists, the app asks them to rephrase. It does not pretend the library matched.

## Inspiration & Identity
Fun, quirky, natural, conversational, and sarcastic. Occasional cussing where it fits the character. Playful roasting stays distinct from genuinely harmful or abusive responses. The wording should sound human: no robotic lines, no repetitive templates, no generic advice.

Each character has a recognisably different personality:

- **Awful Aunty:** affectionate, nosy, dramatic, and full of unsolicited advice.
- **No Mercy Uncle:** blunt, dry, cutting, and allergic to excuses, with occasional encouragement.
- **Your Hype Man:** loud, loyal, confident, and hilariously encouraging.
- **Your Crazy Little Sister:** exasperated, judgemental, scandalised, nosy, and interrogative. Her signature catchphrase is: "Babe. I know you fucking lying."

No outside apps or visual references were named.

## Why This Matters to the Learner
"At the end of the day, this is just meant to be fun. Just a fun little app." They also want judges to open a public link and try it. The suggested 2–4 hours is a target for the first working proof of concept, not a limit on improving it. The hackathon deadline is 26 October. The priority is a working end-to-end demo, built and tested early. The library grows after that, before the deadline. A target number of responses must not delay the first working version.

## What "Working" Looks Like
The non-negotiable MVP is a working public web app: the 18+ notice, four distinct characters, the curated library, character switching, another-response, safety handling, and a reliable fallback. A judge can open a shareable URL and use it. The one-minute demo still shows a situation, a character, a response, and a switch to another character.

There is no fixed number of responses required before the first working version.

Their example is still the clearest demo beat: "I don't wanna go to work." Awful Aunty fusses and asks if they're sick. No Mercy Uncle tells them to stop making excuses and still tries to encourage them. Your Hype Man hypes the rewards of the work and the freedom those rewards can buy. Your Crazy Little Sister cusses them out, questions their entire existence, and makes them ask if they're actually okay.

If the AI feasibility test succeeds, an unmatched situation can also receive an AI reply in the selected voice, and that path is part of the MVP. If the test fails, the public curated app still stands, and the project documents what adding AI later would require.

Before 26 October: improve the humour and the interface, expand the library, test more ways of phrasing a situation, and prepare the required public GitHub repository and short demo video.

## The Response Library
The library is a core part of Tell Me Everything!, not a throwaway sample for the demo. It is checked before any hosted model.

Maro contributes jokes, witty lines, observations, situations, and ideas for the characters. Drafting starter responses, scenarios, alternative punchlines, and organisation can be helped, but a new response is not approved content until it has been reviewed and curated. An AI reply shown at runtime is not automatically added to the approved library.

The library lives in its own clearly organised local file or files, separate from the interface and the matching logic. The matching logic reads from the library. Maro should be able to keep adding their own lines as the app develops without rewriting the application or changing the interface.

A short how-to ships with the library. It shows three jobs, each with an example: add a new response, add an alternative response, and add a new topic. The how-to uses the real file once that file type is chosen. The shape of an entry is:

```
id: work-aunty-sick
character: Awful Aunty
topic: Work and career
keywords: work, job, don't wanna go, dont wanna go
text: You don't want to go? Have you eaten? You sound poorly.
```

An alternative is another entry with the same character and topic, and a different id and text. A new topic is a new topic name on an entry. Neither one requires a change to the app.

Each response should be able to carry, where appropriate: a unique identifier, the character it belongs to, the topic or situation category, matching keywords or phrases, the response text, and optional metadata that helps organise or maintain the library.

For this version, a simple local TypeScript or JSON file is enough. Which of those two files to use is a technical choice for the later plan. No database, content-management system, accounts, or payments.

Starting topics, not a permanent limit:

- Work and career
- Dating and relationships
- Friendships
- Money
- Everyday life

More topics can be added later without redesigning the app. The number of responses stays flexible. Quality and distinct voices matter more than a quota. Two or three different responses per character per topic is only a loose later guide, where practical. It is not a target the first version has to hit.

The first milestone needs a reviewed starter set large enough to show a match, another response, a character switch, a fallback, and a safety override. That set can be small. Growing the library comes after the demo works, and before 26 October.

## Matching and the Hybrid Reply
The library match stays local and simple: keywords and phrases. Those keywords should include common ways people say the same thing, including misspellings we choose to list. We test those variations. A misspelling is only recognised by the library if it is written there. The app does not correct spelling on its own.

When the library has no suitable response, a hosted AI model may generate a reply in the selected character's voice. That path is conditional. It becomes part of the MVP only after an early feasibility test of the complete deployed experience: the public URL, secure server-side API requests, secret management, fallback behaviour, and any potential hosting or usage costs. The test has to identify the simplest viable provider and deployment approach, including the real free-usage allowance. No provider is chosen yet. No provider is assumed to be unlimited or permanently free. No cost is incurred, and no paid service is activated, without Maro's explicit approval.

Private keys stay in server-side handling. They are never placed in browser code or in the public repository.

If AI is unavailable or its allowance is exhausted, a suitable curated response is used first. If no suitable curated response exists, the app asks the user to rephrase.

If the feasibility test fails, the MVP is the public curated app, and a short note records what would be required to add AI later.

## Safety
A potentially serious situation overrides the jokes and shows an appropriate, compassionate, serious message. The app must not make light of potential self-harm, suicide, immediate danger, abuse, violence, medical emergencies, or severe distress.

The serious-situation override is defined and tested before any humorous AI response is generated. A serious input does not reach the model. Keyword matching is not a guarantee of safety. It is imperfect, and it cannot promise that every serious situation will be detected. That limitation is documented. Testing has to include safety-related inputs, ordinary inputs that might accidentally trigger the safety rules, and different ways of describing the same ordinary situation, including common phrases and misspellings.

The exact words of the serious message are not chosen yet.

## The POC Boundary
Always in the MVP: a public web app with a shareable URL, the 18+ welcome notice, four characters, a separate curated library, a short how-to for adding a response, an alternative, or a topic, library matching, another response when several curated lines fit, character switching, safety handling, and a reliable fallback. The response count is flexible.

In the MVP only if the feasibility test succeeds: a hosted AI reply when the library has nothing suitable, with the key kept on the server, inside a free usage allowance that has been checked on the deployed app. If the test fails, that path stays out, and the curated public app is still the MVP. If AI cannot answer, a suitable curated response comes first, then a rephrase.

Before 26 October, after the first path works: more reviewed lines, the five starting topics at whatever pace the humour deserves, tests of other phrases and misspellings, stronger humour, interface improvements, and the safety tests.

## Later
Formal age verification. An 18+ notice is enough for this version.

Topics beyond the first five. The app should be able to accept them without a redesign. They are not required for the first milestone.

Adding AI later, if the feasibility test fails now. The failed test should say what provider, hosting, key handling, and cost question would have to be solved.

## Explicitly Cut
- **Putting API keys in browser code or in the public repository.** Server-side handling is required for any hosted model.
- **Turning on a paid service, or spending money, without explicit approval.** A free allowance is preferred. It is not assumed to be unlimited or permanent.
- **Letting an AI reply skip the library or the safety check.** The library is first. Serious situations override the comedy.
- **Saving a runtime AI reply into the approved library without review.**
- **Treating an unreviewed draft as approved library content.**
- **Accounts, payments, a database, a content-management system, and a fully launched commercial product.** A library file is enough for the lines. A minimal server-side piece is allowed only so a hosted model can keep its key private.
- **Harmful or abusive responses, and jokes about serious harm.** The characters can roast. They do not become cruel, and serious situations leave the comedy.
- **Reusing or changing Novs or Novs Signal.** This project stays completely separate.

## Open Decisions
These stay unresolved until the appropriate later planning stage, or until the feasibility test. None of them is a provider choice, a deployment, or a spend.

- Which hosted model, if any, has a real free allowance large enough for judges to try the deployed app, and what happens when that allowance runs out.
- The simplest hosting that gives judges a public URL, makes secure server-side API requests, and manages secrets, including any potential hosting or usage cost.
- Whether the feasibility test of that complete deployed experience passes. That result decides if AI is in the MVP.
- TypeScript or JSON for the library file.
- The exact wording of the serious-situation message.
