# Script writing: explainer

The narration is the master clock of an explainer. Write it first, count
it, fit the pictures to it. A script written after the shot list always
runs long.

## 1. Word budgets by length

The server allows 2.5 words per second of picture (the budget is
`floor(seconds x 2.5)`); a voice longer than its picture freezes the last
frame. Write under the ceiling, by register:

| Length | Ceiling (2.5/s) | Explainer (2.4/s) | Tutorial (2.3/s) | Documentary (2.1/s) | Sentences | Beats |
|---|---|---|---|---|---|---|
| 6 s | 15 | 13 | 12 | 11 | 1 to 2 | 1 |
| 15 s | 37 | 33 | 32 | 28 | 3 to 4 | 3 to 4 |
| 30 s | 75 | 68 | 65 | 58 | 6 to 8 | 6 to 8 |
| 45 s | 112 | 100 | 96 | 88 | 9 to 11 | 8 to 10 |
| 60 s | 150 | 140 | 130 | 120 | 11 to 14 | 10 to 12 |
| 90 s | 225 | 210 | 195 | 180 | 16 to 20 | 14 to 18 |

Per scene: 4 s carries 10 words at most, 5 s 12, 8 s 20, 10 s 25. Leave
half a second of silence at the start of a line that follows a sound the
picture makes (a click, a call, a splash) and at the very end.

The voice's real pace decides the final timing. After `attach_track`, read
the track's length in `get_workflow_audio`; if it runs over the picture,
cut words, never speed the voice.

## 2. Sentence craft

- Short declarative sentences, 6 to 14 words. One idea per sentence. Active
  voice. Present tense for mechanisms and nature; past tense for history.
- Concrete nouns the picture can show: "the root ball", not "the plant's
  foundation".
- Define a term the first time, in the same sentence: "Photosynthesis,
  the way leaves turn light into sugar, ..."
- After an aside, name the subject again. A pronoun attaches to the last
  thing said.
- Never "in this video", "today we will", "welcome back", "imagine",
  "let's dive in", "did you know that" as a whole opening, "it's important
  to note".
- Cut adjectives before nouns. Cut adverbs first of all.
- Write for the ear: read every line aloud once; a line that needs a breath
  in the middle is two lines.

## 3. Numbers in speech

| Write in the script | Not |
|---|---|
| "about forty percent" | "40%" |
| "in nineteen sixty-nine" | "in 1969" |
| "two point five metres" | "2.5m" |
| "three hundred million people" | "300,000,000" |
| "one in four" | "25 percent" when the picture shows people |
| "twice as long" | "a 100 percent increase" |

- One number per sentence. Round with "about" unless the exact figure is
  the point and the user supplied it.
- Make the size visible: "about the weight of a paperclip", "enough water
  to fill four bathtubs". The picture shows the comparison, never the digit.
- Units are spoken in full. Years are spoken as people say them.
- Captions come from the voice's word timings: they show the words (or the
  digits when the server transcribes); both read correctly.
- The voice reads letters in acronyms one by one; spell out on first use
  ("the W H O, the World Health Organization") or prefer the full name.

## 4. Hook lines for explainers

The first sentence lands inside 2.5 s, six words or fewer before its first
full stop, over the strongest frame of the film.

| Hook | Template | Example |
|---|---|---|
| Counter-intuitive fact | "<Thing> <does the unexpected>." | "Your bones are mostly water." |
| Direct question | "Why does <everyday thing> <happen>?" | "Why is the sea salty?" |
| Mistake callout | "You have been <doing X> wrong." | "You have been watering cactuses wrong." |
| Stakes | "<Number> <people or things> depend on <thing>." | "One small fish feeds half the ocean." |
| Mystery object | "This <object> <did something big>." | "This spoon changed medicine." |
| Outcome first (how-to) | "<Result> in <time>. Here is how." | "A sharp knife in five minutes. Here is how." |
| Then and now | "<Year>: <state>. Today: <state>." | "Eighteen fifty: no light after dark." |
| Myth | "<Belief>? Not quite." | "Goldfish forget in seconds? Not quite." |
| Scale | "<Small thing> is bigger than <big thing>." | "A blue whale's heart is the size of a car." |

The picture at 0.0 s is the subject of the hook in its most legible frame;
never a title card, never a fade from black, never an establishing wide.

## 5. The concept gate (before any spend)

1. Retell the film in three sentences: "It opens on ..., then ..., it ends
   with ...". No retelling, no film yet.
2. The muted viewer: with the sound off and captions off, after one
   viewing, can a stranger say what it is about, what it shows them, and
   what to do or remember? Each answer must be seen happening on screen.
3. The one image: name the frame a viewer would describe to a friend. It
   usually belongs in the first seconds.
4. Picture or page: mark every beat P (a picture that carries the idea) or
   G (a page that only works with the words). More than a third G: rework.
5. Event or state: mark every beat E (something changes) or S (something
   just sits there). Video models are good at events; a run of states reads
   as a slideshow.
6. Read the script and the beat sheet as a stranger would. Makers grade
   their own plans about two points high; when in doubt, cut.

## 6. Signposting

- Announce the shape once, early: "Three reasons." / "It takes four steps."
- Mark each part as it starts: "First", "Second", "The last one is the
  strangest". Keep the same pattern all the way through.
- Turn with a hinge line: "Here is the catch.", "But that is only half of
  it.", "So what happens next?"
- Land with a takeaway the viewer can repeat in one breath: "Salt goes in,
  only water comes out." Not a moral, not a summary of everything.

## 7. Arcs by explainer type (beat menus)

| Arc | Beats, in order | Best for |
|---|---|---|
| Hook and payoff | Hook, context, 3 to 4 mechanism beats, payoff, loop line | Faceless shorts, facts |
| How it works | Question, the parts, part 1 in action, part 2, part 3, the whole working, takeaway | Machines, biology, systems |
| Myth buster | The belief, why people believe it, the test or evidence, the truth, what to do instead | Health, science, money |
| Timeline | Before, the spark, 3 to 5 dated steps, the turning point, after, why it matters now | History, inventions |
| Problem, agitate, solve | The problem, the cost of it, the fix, the fix working, the result | Training, how-to |
| Steps | Result first, tools, steps 1 to N, common mistake, result again, recap | Tutorials |
| Observation | Place, subject, behaviour, challenge, outcome, place again | Documentary, nature |
| News | What happened, why it matters, background, three key facts, what to watch | News explainers |

Counts: 30 s holds 6 to 8 beats and about 70 words; 60 s holds 10 to 12
beats and about 140 words. Hook 1 to 3 s, body 70 to 80 percent, payoff 10
to 20 percent, any spoken call to action 2 s or less.

Camera rhythm per arc, one move per shot: hook and payoff push-in, pan,
static, push-in, tilt, pull-out, static; timeline pans in one direction
beat to beat, push-in on the turning point, pull-out on the takeaway; steps
use the same locked top-down angle per step with one push-in for the
result. Never the same move twice in a row; static for the payoff.

## 8. Retention beats

| Where | Beat | Line pattern |
|---|---|---|
| 0 to 3 s | Open a loop | A question, a promise, a surprising claim |
| 20 to 30 percent | Confirm the promise | "Here is the first reason." |
| 40 to 50 percent | Re-hook | "But that is not the strange part." |
| 60 to 75 percent | Raise the stakes | "And this is where it matters for you." |
| 80 to 90 percent | Payoff | The answer, shown on screen |
| Last 1 to 2 s | Exit | The takeaway, or a loop line that leads back to the first sentence |

Close every loop you open. One open question at a time.

## 9. Script templates

15 s, faceless fact (33 words):

```text
Octopuses have three hearts. (4)
Two pump blood through the gills. (6)
The third pumps it around the body. (7)
When an octopus swims, that third heart stops. (8)
So most octopuses would rather crawl. (6)
```

30 s, how it works (68 words): hook (5), the parts (12), part one (12),
part two (12), part three (12), the whole (10), takeaway (5).

60 s, myth buster (about 140 words): belief (8), why people believe it
(20), the test (25), what it found (25), the truth (20), what to do instead
(25), takeaway line (8), one closing question (8).

90 s, timeline (about 200 words): then (10), the spark (20), four dated
steps of 25 each (100), the turning point (25), now (25), why it matters
(20).

## 10. Voice

- One voice for the film. Name it in the plan and keep it.
- Voice names the server accepts on the OpenRouter voice route (when
  `get_status` `models.tts_voices` shows the OpenAI names): sarah, george,
  adam, alice, bella, bill, brian, callum, charlie, chris, daniel, eric,
  harry, jessica, laura, liam, lily, matilda, river, roger, will. The OpenAI
  names (alloy, echo, fable, onyx, nova, shimmer) all play as Rachel, the
  default: never offer them as different voices. With direct ElevenLabs
  (the list shows ElevenLabs voices) pass a premade id; the ids are in
  [mcp-calls.md](mcp-calls.md).
- Starting points by register, to confirm by ear: calm documentary george,
  bill or lily; clear explainer brian, alice or matilda; friendly tutorial
  will, sarah or chris; neutral news daniel or river.
- Delivery tags such as `[whispers]` work on the default voice model; use
  them rarely in explainers. Full stops make pauses.
