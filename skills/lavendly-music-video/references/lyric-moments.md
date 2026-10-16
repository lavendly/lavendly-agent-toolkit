# Recipe: lyric moments without rendered text

## 1. Purpose, audience, ending

- Purpose: the words of the song become pictures. Each key line gets an
  image whose action lands on the line's key word. The feel of a lyric
  video, with no letters on screen.
- Audience: fans who know the words; new listeners who remember the song by
  its images.
- The ending: the last key line's image held to the last hit, often the
  title line of the song pictured.

## 2. What Lavendly cannot do, and what replaces it

- No rendered lyrics, titles or kinetic type from the MCP, and video models
  garble letters. Never ask a model to write a word in frame.
- No lyric captions: captions burn only from a voiceover track's word
  timings. Do not attach the song as a voiceover to get captions: it
  changes the mix and transcribing a sung vocal is unreliable.
- What replaces text: the key word pictured at the moment it is sung, and
  room in the frame (plain sky, a dark wall) where the user can add a title
  card in the app.

## 3. Picturing a line

For each key line, choose one of three readings and keep the choice
consistent across the video:

| Reading | Line "I left the light on" | Use |
|---|---|---|
| Literal | A porch light switched on at dusk, an empty chair beside it | Story songs, folk, country |
| Metaphor | A single lit window in a dark tower block | Pop, indie |
| Counterpoint | Bright noon, every light in the house off, curtains open | Irony, heartbreak sung brightly |

Rules:

- The action lands on the key word (the light switches on as "light" is
  sung), not on the start of the line.
- One key word per line, one image per key word. A line without a picturable
  word gets the motif instead.
- Repeated lines (the chorus) return to the same image, escalated each time
  (the porch light; then the street of porch lights; then the whole town lit).

## 4. Timing a key word

You need the time of each key word in the file: ask the user for it (any
player shows the seconds), or for the lyric lines with their start times.

Two ways to land the action on the word:

1. Cut on the word: the cut time is the word's time (minus one export frame,
   33 ms). The new image appears with the word.
2. Act on the word: cut on the downbeat before the word, and write the
   action's timing into the motion prompt ("at 1.5 s the light switches
   on"). Then trim so the action falls on the word: if the cut is at
   12.000 s, the word at 13.250 s and the action at 1.5 s into the clip, trim
   start_ms = 1500 minus 1250 = 250. Open the mid frame to confirm the
   action's timing before trusting it.

## 5. Structures by length

At 120 BPM (1 bar = 2 s). Model lengths for Veo 3.1 Fast (4 s = 2 bars).

### 6 s: one line pictured

| Slot | Bars | Size, lens | Move | Action | Generate |
|---|---|---|---|---|---|
| 1 | 1 to 2 | Wide, 35mm | locked-off | A dark porch at dusk, an empty chair | 4 s |
| 2 | 3 | Close-up, 50mm | locked-off | The porch light switches on, on the key word | 4 s, trimmed to the word |

### 15 s: a chorus of four key lines (128 BPM, 8 bars)

| Slot | Bars | Key word | Image | Generate |
|---|---|---|---|---|
| 1 | 1 to 2 | "light" | Porch light switches on at dusk | 4 s |
| 2 | 3 to 4 | "road" | The empty road from the porch, headlights far away | 4 s |
| 3 | 5 to 6 | "home" | A hand sets a second cup on the porch table | 4 s |
| 4 | 7 to 8 | "waiting" | The chair, the light, the two cups; held | 4 s |

### 30 s: verse and chorus (16 bars at 128 BPM)

Verse: 4 images for 4 key lines, every 2 bars, quiet and close. Chorus: the
four chorus images above. Eight clips. The first verse image and the last
chorus image share a framing.

### 60 s: verse, chorus, verse, chorus (120 BPM, 30 bars)

Verse 1 (4 images), chorus (4 images), verse 2 (4 new images continuing
the story), chorus 2 (the same 4 images escalated: more lights, wider
frames). Sixteen clips; the chorus clips are new generations of the same
framing with the escalation written in, never the same clip twice.

### 90 s: the whole lyric arc

Add a bridge (one long hold for the bridge's key line) and a final chorus
(the biggest escalation: the whole town lit). About 22 clips.

## 6. Camera, light, colour

- Locked-off for most key-word images: the action is the event. Slow
  push-ins on verses; a crane on the final chorus escalation.
- Light: practical light that can change on the word (a lamp, a porch
  light, a match, headlights) is the best key-word action.
- Colour: one palette for verses, one for choruses.

Exact phrases that work:

- "at 1.5 s the porch light switches on, and nothing else changes"
- "a plain dusk sky across the upper third of the frame, empty"
- "the same framing as the first porch shot, now every house on the street lit"
- "the sheet of paper is blank", "the sign faces away from camera"

## 7. Sound plan

- The song once, volume 1, `ducking` false; every clip `off`
  ([one-track-rule.md](one-track-rule.md)).

## 8. Model picks

| Tier | Model | Why |
|---|---|---|
| Best | Veo 3.1 | Light changes and practicals read cleanly; 4 s is 2 bars at 120 BPM |
| Value | Veo 3.1 Fast | 14 per 4 s |
| Value with style plates | Wan 2.7 | 12 per 5 s, 4 references, literal light words |
| Silent value | Hailuo 3 Max | 10 per 5 s |

Typical cost (clips plus about 2 per opening image):

| Model | 15 s (4 clips) | 30 s (8 clips) |
|---|---|---|
| Veo 3.1 Fast | 4 x 14 = 56, plus 8 | 8 x 14 = 112, plus 16 |
| Wan 2.7 (5 s) | 4 x 12 = 48, plus 8 | 8 x 12 = 96, plus 16 |
| Hailuo 3 Max | 4 x 10 = 40, plus 8 | 8 x 10 = 80, plus 16 |

## 9. Prompt pairs

### Pair 1: "light" (Veo 3.1 Fast, literal)

Still frame:

```text
Music video frame, dusk on a wooden porch. Medium close-up, eye level, 50mm lens. An unlit brass porch lamp on a white clapboard wall beside a front door, an empty wooden rocking chair below it. Cool blue dusk light, the sky pale. A plain dusk sky across the upper third of the frame, empty. Palette: dusk blue, white, brass. No text, no letters, no logos.
```

Motion:

```text
Music video frame, dusk on a wooden porch. Locked-off camera. 0 to 1.5 s: stillness; a moth drifts past. At 1.5 s the porch lamp switches on and warm light spreads over the wall and the chair; nothing else changes. 1.5 to 4 s: the moth circles the lamp. The porch, the chair and the lamp stay exactly as in the opening frame. Nobody in frame. Silent, no music generated. Clean frame: no text, no letters, no logos.
```

### Pair 2: "waiting" (Wan 2.7, metaphor, with a style plate)

Still frame:

```text
Music video frame, night city. Wide shot, low angle, 35mm lens. A tall dark tower block against a deep blue night sky, every window dark except one on the seventh floor, lit warm yellow. Wet street in the foreground reflecting the one window. Palette: deep blue, black, warm yellow. No text, no letters, no logos.
```

Motion:

```text
The one lit window stays lit; at 2 s a second window beside it lights up warm yellow, and the reflection in the wet street doubles. Static camera, low angle. Reference 1 is the style plate for palette and light only; ignore its content. The tower block and the street stay exactly as in the opening frame. Nobody in frame. Light source: practical window light, night, low key, wide shot, cool with one warm accent. Silent, no music generated. Clean frame: no text, no signs.
```

Second family notes: on Hailuo 3 Max write the light change then "[Static
shot]"; on Seedance write "already still from the first frame" and give the
light change a time.

## 10. Failure modes and fixes

| Failure | Fix |
|---|---|
| The model writes words or gibberish in frame | No word in the prompt that asks for text; "no text, no letters, no signs"; blank paper, turned signs |
| The action misses the word | Cut on the word, or trim so the timed action falls on it; check the mid frame |
| Too literal, reads like clip art | One reading per video (literal, metaphor or counterpoint); the motif for lines without a picture |
| Chorus images feel repeated | The same framing with an escalation written in, a new generation each time |
| The user expects lyric text | Say once that Lavendly does not render it; leave title room; the user can add text in the app |

## 11. Policy guards

- The user's own lyrics or licensed ones; never write lyrics of a song the
  user does not hold rights to into prompts or chat beyond a few words.
- No real people or brands as pictures of a line.
