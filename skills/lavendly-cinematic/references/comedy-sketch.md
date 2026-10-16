# Recipe: comedy sketch

## 1. Purpose, audience, ending

- Purpose: one absurd premise, escalated, then broken by a punchline.
  Shareable humour for feeds, brand entertainment, creator series.
- Audience: people scrolling with sound off as often as on.
- The ending: the punchline, then a button (a reaction or a tag) held 1 to
  2 s. A sketch that ends on the punchline with no reaction feels cut off.

## 2. Comic timing on Lavendly

Generated clips are bad at comic timing inside one take: the pause comes too
early, the reaction too big. Build timing in the edit.

- Setup and punchline are separate clips. The pause is made by the cut and
  the trims, not by the model.
- Before the punchline: 0.5 to 1 s of stillness. Trim the setup clip to end
  on stillness, or cut to a deadpan reaction for that beat.
- After the punchline: hold the reaction 1 to 2 s, then cut.
- `split_clip` a long reaction to place a beat of it before and after the
  punchline; `edit_clip` trims set the exact pause in milliseconds.
- Deadpan is the safest performance: "holds perfectly still for one second,
  then one slow blink". Over-reactions read as AI at once.
- The muted test: a joke carried only by dialogue is lost with sound off
  (native dialogue is not captioned from the MCP). Prefer visual gags, or
  carry the words in a narrator line with captions.

## 3. Structures by length

Model lengths for Veo 3.1 Fast (4 or 8 s).

### 6 s: setup and punchline

| # | Size, angle, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Medium two-shot, 35mm | locked-off | A man presses the printer button; it prints one blank page | 3 s | 4 s |
| 2 | Medium, 35mm | locked-off | It prints a second blank page, then a third, faster; he looks at the lens, deadpan | 3 s | 4 s |

### 15 s: setup, escalation, punchline, button

| # | Size, angle, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Medium, 35mm, flat office light | locked-off | A man presses "print" on a printer; one blank page comes out | 3 s | 4 s |
| 2 | Wide, 24mm | locked-off | Blank pages pour out faster and pile on the floor; he does not move | 5 s | 8 s |
| 3 | Close-up, 50mm | locked-off | Deadpan: he looks at the lens, holds still | 2 s | 4 s |
| 4 | Medium, 35mm | locked-off | A colleague walks up, takes one blank page, reads it carefully, nods, leaves | 5 s | 8 s |

### 30 s: rule of three

| # | Size, lens | Move | Action | Beat | Cut | Generate |
|---|---|---|---|---|---|---|
| 1 | Medium two-shot, 35mm | locked-off | A job interview; the candidate sits down | Premise | 3 s | 4 s |
| 2 | Medium close-up, 50mm | locked-off | The interviewer slides a pen across; the candidate picks it up; it squeaks like a toy | Instance 1 | 4 s | 4 s |
| 3 | Close-up, 50mm | locked-off | Interviewer: no reaction, one slow blink | Reaction | 2 s | 4 s |
| 4 | Medium close-up, 50mm | locked-off | The candidate sits back; the chair squeaks too, longer | Instance 2 | 4 s | 4 s |
| 5 | Close-up, 50mm | locked-off | Interviewer writes one word, slowly | Reaction | 3 s | 4 s |
| 6 | Medium two-shot, 35mm | locked-off | They shake hands: total silence | Instance 3, the break | 4 s | 4 s |
| 7 | Close-up, 50mm | snap zoom in | The candidate's face, horrified at the silence | Punchline | 3 s | 4 s |
| 8 | Wide, 24mm | locked-off | Button: the interviewer squeaks the pen once, satisfied | Tag | 7 s | 8 s |

### 60 s: premise, three escalations, reversal, tag

Premise (2 shots), escalation 1 (instance and reaction), escalation 2
(bigger, a third person drawn in), escalation 3 (the biggest, the room
involved), reversal (the pattern breaks: the one normal thing becomes the
strange one), reaction, tag, a final tag. Twelve to fourteen shots; the
same framing repeated for each instance so the repetition reads.

### 90 s: a runner

Too long for one sketch. Make three 25 to 30 s sketches on the same premise
(the same office, the same deadpan man), each with its own punchline, and a
callback in the third to the first. Or split into a series (lavendly-series).

## 4. Hook and button

- Hook: start inside the premise. The first frame is already absurd or
  about to be (the printer mid-print), never an establishing shot.
- Punchline: the shortest beat and the shortest line.
- Button: one reaction or one tag, held 1 to 2 s; or a callback.

## 5. Camera, light, colour

- Camera: locked-off for setups (the frame is the stage); identical framing
  for repeated instances; a snap zoom or a crash zoom only on the punchline
  shot; mockumentary handheld with slow optical zooms as a format choice.
- Lens: 24mm wides (comic distortion of space), 35mm medium, 50mm
  close-ups; no shallow-focus beauty.
- Light: high key, flat, even; sitcom fluorescent; bright daylight.
- Colour: natural, bright, no grade.

Exact phrases that work:

- "Comedy sketch frame, flat even light"
- "flat high-key overhead fluorescent light, few shadows"
- "holds perfectly still for one second, then one slow blink"
- "deadpan, no smile, looks straight into the lens"
- "the same framing as the previous instance"
- "snap zoom from medium to close-up on his face in the last second"

## 6. Sound

- Native on everything: the printer whir, the squeak, the silence of the
  room. The comic sound is written exactly ("a high rubber squeak, twice").
- Lines at 2.5 to 3 words per second in fast exchanges, but each clip still
  carries one short line; the punchline is the shortest line.
- Score: usually none. If one, a light pizzicato or a muted ukulele bed at
  volume 0.15 to 0.2 that stops for the punchline. Silence is a sound.
- A narrator with captions when the joke needs words for muted viewers:
  dry, third person, 2.3 words per second.

## 7. Model picks

| Tier | Model | Why |
|---|---|---|
| Best | Veo 3.1 | Physical comedy and delivered lines with sound |
| Value | Veo 3.1 Fast | 14 per 4 s; most sketches are many short clips |
| Non-English dialogue | Kling v3 Standard | 15 per 5 s, labelled speakers |
| Visual gags, no dialogue | Seedance 2.0 Mini | 9 per 5 s, sound |
| Draft | Veo 3.1 Lite | 10 per 4 s; no references |

Typical cost (clips plus about 2 per opening image):

| Model | 15 s (4 clips) | 30 s (8 clips) |
|---|---|---|
| Veo 3.1 Fast | 2 x 14 + 2 x 28 = 84, plus 8 | 7 x 14 + 28 = 126, plus 16 |
| Veo 3.1 Lite | 2 x 10 + 2 x 20 = 60, plus 8 | 7 x 10 + 20 = 90, plus 16 |
| Kling v3 Standard | 4 x 15 = 60, plus 8 | 7 x 15 + 30 = 135, plus 16 |

## 8. Prompt pairs

### Pair 1: the printer (Veo 3.1 Fast, 15 s shot 2)

Still frame:

```text
Comedy sketch frame, flat even light. Wide shot, eye level, 24mm lens. Dev: a man in his thirties, round face, short black hair, a light blue short-sleeved shirt with a pen in the pocket, stands beside a grey office printer, holding one blank sheet. A plain open-plan office behind him, empty desks. Flat high-key overhead fluorescent light, few shadows. Palette: pale blue, office grey, white.
```

Motion:

```text
Comedy sketch, flat even light, locked-off camera. 0 to 2 s: the printer feeds out another blank page. 2 to 6 s: blank pages come out faster and faster and pile up on the floor around his shoes. 6 to 8 s: Dev does not move; he turns his head to look straight into the lens, deadpan, and holds still. Dev, the printer and the office stay exactly as in the opening frame. Exactly one person in frame, nobody else. Sound: printer whirring faster, pages fluttering. No music. Clean frame: no text on the pages, no on-screen graphics.
```

### Pair 2: the squeak (Veo 3.1 Fast, 30 s shot 2)

Still frame:

```text
Comedy sketch frame, flat even light. Medium close-up, eye level, 50mm lens. Priya: a woman in her twenties, long black hair in a high ponytail, a navy blazer over a white shirt, sitting very upright at a glass interview table, hands folded. A plain white office wall behind. Flat high-key daylight from a window on the left. Palette: navy, white, pale grey.
```

Motion:

```text
Comedy sketch, flat even light, locked-off camera. 0 to 2 s: a pen slides into frame across the table and stops in front of Priya. 2 to 3 s: she picks it up politely. 3 to 4 s: it squeaks loudly like a rubber toy; she freezes with the pen in the air. Priya, her blazer and the table stay exactly as in the opening frame. Exactly one person in frame, nobody else. Sound: a high rubber squeak, once. No music. Clean frame: no text, no on-screen graphics.
```

### Pair 3: the deadpan reaction (Kling v3 Standard)

Still frame:

```text
Comedy sketch frame, flat even light. Close-up, eye level, 50mm lens. Mr Hale: a man in his sixties, thin grey comb-over, half-moon reading glasses low on his nose, a brown tweed jacket. He sits behind a desk and looks straight ahead at someone off screen left. Plain white wall behind. Flat high-key daylight. Palette: brown, white, grey.
```

Motion:

```text
Scene: an interview room, flat daylight. Character: Mr Hale behind the desk. Action: he holds perfectly still for one full second, then one slow blink, then looks down and writes one word on a pad below frame. Camera: static, close-up. Audio: a pen scratching, room tone. Mr Hale, his glasses and the wall stay exactly as in the opening frame. Exactly one person in frame, nobody else. Clean frame: no text.
```

Second family notes: Seedance spends its motion early; for a deadpan hold
write the stillness as the action ("he stays perfectly still from the first
frame until the last second, then blinks once").

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| The pause lands in the wrong place | Separate setup and punchline clips; set the pause with trims |
| Mugging, giant reactions | "deadpan, holds still"; a smaller shot size |
| The joke dies with sound off | A visual gag, or narrator lines with captions |
| Repeated instances do not look repeated | Identical framing and still prompt for each instance; only the action changes |
| Props morph mid-gag (the pen becomes two pens) | Count the prop: "exactly one pen" |
| Text on signs or paper the joke relies on | Make the joke physical; leave room for a title the user adds in the app |
| Laughter or a sitcom laugh track appears in native audio | "Sound: room tone only, no laughter" |

## 10. Policy guards

- No real people, no impressions of public figures, no parodies naming a
  real brand, show or person.
- Punch up, not at groups: no jokes about protected characteristics.
- Pranks shown are fiction and not instructions for harming anyone.
