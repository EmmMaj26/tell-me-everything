# Adding a reply

Open `data/responses.json`. Each reply is one block in the list. Copy a block, then change it. You do not need to change the page.

A new reply:

```json
{
  "id": "work-aunty-traffic",
  "character": "awful-aunty",
  "topic": "work-and-career",
  "keywords": ["traffic", "late for work"],
  "text": "Traffic? Did you leave on time, or did you negotiate with the pillow?",
  "needsReview": true
}
```

An alternative is another block with the same `character` and `topic`, and a different `id` and `text`.

A new topic is a new `topic` name on a block, such as `"topic": "neighbours"`. The page does not need a new screen for it.

`needsReview: true` shows “Sample — needs your review” in the app. Remove that line only after you have approved the wording.

Characters:

- `awful-aunty`
- `no-mercy-uncle`
- `hype-man`
- `crazy-little-sister`

Starting topics: `work-and-career`, `dating-and-relationships`, `friendships`, `money`, `everyday-life`.
