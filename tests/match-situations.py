"""Situation matching checks. Mirrors normalize, priority, and safety in app.js."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIBRARY = json.loads((ROOT / "data" / "responses.json").read_text())
SAFETY = json.loads((ROOT / "data" / "safety.json").read_text())
CHARACTERS = ["nosey-aunty", "no-mercy-uncle", "hype-man", "crazy-little-sister"]


def normalize(value):
    return re.sub(r"\s+", " ", value.strip().lower().replace("’", "'").replace("‘", "'"))


def match_length(entry, haystack):
    best = 0
    for keyword in entry["keywords"]:
        needle = normalize(keyword)
        if needle and needle in haystack and len(needle) > best:
            best = len(needle)
    return best


def ranked(character, text):
    haystack = normalize(text)
    matched = []
    for index, entry in enumerate(LIBRARY):
        if entry["character"] != character:
            continue
        length = match_length(entry, haystack)
        if length:
            matched.append((entry.get("priority", 0), length, index, entry["id"]))
    if not matched:
        return []
    top = max(item[0] for item in matched)
    matched = [item for item in matched if item[0] == top]
    matched.sort(key=lambda item: (-item[1], item[2]))
    return [item[3] for item in matched]


def safety_level(text):
    haystack = normalize(text)
    best = None
    for level, phrases in (("immediate", SAFETY["immediate"]), ("serious", SAFETY["serious"])):
        for phrase in phrases:
            needle = normalize(phrase)
            if needle and needle in haystack:
                tie = best and len(needle) == best[1] and level == "immediate"
                if not best or len(needle) > best[1] or tie:
                    best = (level, len(needle))
    return best[0] if best else None


DISHES = [
    "My housemate keeps leaving the dishes for me to wash. I'm getting fed up. What should I do?",
    "My partner keeps leaving the dishes for me to wash.",
    "I'm tired of always washing the dishes.",
    "My roommate never does the dishes.",
    "My flatmate leaves all the washing up to me.",
    "We keep arguing about who should wash the dishes.",
]

OTHER = {
    "I like someone, but I can't tell if they're genuinely interested in me or just wasting my time.": "dating-",
    "I don't wanna go to work": "work-",
    "I don't wanna go to work because someone took credit for my work.": "-credit",
    "My boss doesn't appreciate my work.": "boss-",
}


DILEMMAS = [
    "I don't wanna go to work.",
    "My colleague keeps taking credit for my work.",
    "My housemate keeps leaving the dishes for me to wash.",
    "My friend won't pay me back.",
    "I'm jealous of my friend's success.",
    "My boss doesn't appreciate my work.",
    "I'm spending too much money.",
    "Someone has been gossiping about me.",
    "I like someone, but I can't tell if they're genuinely interested in me.",
]


def main():
    for sentence in DISHES:
        assert safety_level(sentence) is None, sentence
        for character in CHARACTERS:
            hits = ranked(character, sentence)
            assert hits and hits[0].startswith("chores-"), (sentence, character, hits)
            assert hits[1].startswith("chores-"), (sentence, character, hits[1])
    for sentence, prefix in OTHER.items():
        assert safety_level(sentence) is None, sentence
        for character in CHARACTERS:
            hits = ranked(character, sentence)
            assert hits and prefix in hits[0], (sentence, character, hits)
    hurt = "Someone at home said they would hurt me if I came back."
    hopeless = "I feel hopeless about everything."
    for sentence in DILEMMAS:
        assert safety_level(sentence) is None, sentence
        for character in CHARACTERS:
            hits = ranked(character, sentence)
            assert hits, (sentence, character)
    assert safety_level(hurt) == "immediate"
    assert safety_level(hopeless) == "serious"
    print("passed", len(DISHES), "dishes sentences x", len(CHARACTERS), "characters")


if __name__ == "__main__":
    main()
