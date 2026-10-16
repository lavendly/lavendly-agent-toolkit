# Recipe: trailers, teasers and bumpers

## 1. Purpose, audience, ending

- Purpose: sell a world, a conflict and a tone without telling the story.
  On Lavendly: teasers for a series or a channel, a pitch trailer for a
  script, a launch for a short film.
- Audience: people deciding in two seconds whether they care.
- The ending is the button: one beat after the title (a line, a scare, a
  last image) that leaves the question open. A teaser withholds; a trailer
  promises.

## 2. The grammar

Music first, picture cut to it. Setup, complication, escalation montage, the
drop (silence), title, button. Acts one and two cut at 2 to 3 s per shot; the
montage at 0.5 to 1 s per shot, every cut on a beat.

What Lavendly cannot do, and what to do instead:

| Trailer convention | On Lavendly |
|---|---|
| Text cards between shots | Not rendered from the MCP. Make "title room" shots: a dark or plain frame held 3 s (dust in a single beam, a slow push into a black doorway) where the user adds the title in the app. Models garble letters, so never ask the model to write the title |
| Dozens of 1 s montage shots | Each generation costs a full clip. Make montage bursts: one Veo clip with bracketed time ranges holds four 2 s shots for one price; trim and `split_clip` it into fragments |
| Hard stop before the title | Ask the score for it in the brief; with a generated score the stop is approximate. With the user's own cue (hosted url) it lands where the cue has it |
| Braams, risers, impacts on cuts | Hits written into the clips' own sound ("SFX: a deep impact hit at the cut") with `native` on those clips; the rest `off` |
| 2.39:1 letterbox | Not as an aspect (21:9 falls back to the 9:16 frame on export). Compose 16:9 with the action in the central band and the top and bottom of frame dark |

## 3. Structures by length

Model lengths for Veo 3.1 Fast. "Burst" is one 8 s clip with four bracketed
2 s shots.

### 6 s: bumper

| # | Content | Move | Cut | Generate |
|---|---|---|---|---|
| 1 | Burst: the strongest image (0 to 2 s), two fragments on beats (2 to 6 s), a dark title frame (6 to 8 s) | per bracket | 6 s (trim the middle) | 8 s |

### 15 s: teaser

| # | Size, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Close-up, 85mm, near-dark room | locked-off | A match strikes and lights her face; one whispered line | 3 s | 4 s |
| 2 | Burst | per bracket | Four escalating fragments | 7 s | 8 s |
| 3 | Title room | slow push into darkness | Dust drifting in one beam | 3 s | 4 s |
| 4 | Close-up, 85mm | locked-off | Button: her eyes snap to the door | 2 s | 4 s |

### 30 s: trailer

| # | Size, lens | Move | Action | Act | Cut | Generate |
|---|---|---|---|---|---|---|
| 1 | Extreme wide, low angle, anamorphic look | crane up | A lone figure on a ridge, a dust storm wall behind | World | 4 s | 4 s |
| 2 | Medium close-up, 85mm | locked-off | She lowers her visor; "It's moving." | World | 3 s | 4 s |
| 3 | Insert, 100mm | locked-off | A pressure gauge needle drops to zero | Inciting | 2 s | 4 s |
| 4 | Wide, 35mm | slow push-in | A half-buried base door, a light blinking inside | Inciting | 4 s | 4 s |
| 5 | Burst A | per bracket | She runs; a hatch slams; dust floods a corridor; her face lit red | Build | 5 s | 8 s |
| 6 | Burst B | per bracket | A cable snaps; a rover tips; her hand on a lever; her eye | Build | 5 s | 8 s |
| 7 | Title room | locked-off | Dark corridor, dust in a single beam | Title | 3 s | 4 s |
| 8 | Close-up, 85mm | locked-off | Button: a knock on her visor from outside; she turns | Button | 4 s | 4 s |

### 60 s: full trailer

| Act | Time | Shots | Content |
|---|---|---|---|
| World and protagonist | 0 to 10 s | 3 shots of 3 to 4 s | Vista, hero close-up, her routine in one action |
| Conflict and antagonist | 10 to 25 s | 5 shots of 3 s | The inciting insert, the threat in silhouette (introduced before it acts), two dialogue fragments |
| Low point, music drops out | 25 to 35 s | 2 shots of 5 s | A held face in silence; one line |
| Montage crescendo | 35 to 52 s | 3 bursts (12 fragments) | Every cut on a beat, escalating scale |
| Title room | 52 to 56 s | 1 shot | Dark frame held |
| Button | 56 to 60 s | 1 shot | The last image or line |

About 15 generations: 11 single shots and 3 bursts, plus the title room.

### 90 s: long trailer

The 60 s trailer with a second-act turn: after the low point, a 15 s block
of 4 shots that reveals the twist of the premise (a friend is the threat,
the storm is a machine), then the montage at a faster grid. Hold the title
to 85 s. Over 90 s, cut two trailers.

## 4. Hook and button

- Frame 0: the strongest image of the piece or a line over a near-black
  frame, with a sound hit at 0 s. Never a fade-up.
- The drop: 0.5 to 1 bar of silence before the title.
- Button: one short beat after the title room that turns the tone (a scare,
  a joke, a question).

## 5. Camera, light, colour

- Slow push-ins on faces, crane reveals for scale, a static frame for every
  line. Whip pans and crash zooms only inside bursts, one per fragment.
- Light: high-contrast low key, volumetric beams, rim-lit silhouettes,
  practical fire, neon or warning lamps.
- Colour coded to the genre: cold desaturated for thriller, rust and ochre
  for desert sci-fi, warm gold for drama. One palette line for the trailer.

Exact phrases that work:

- "Feature film trailer frame, anamorphic lens look"
- "oval bokeh, a thin horizontal flare from the warning lamp"
- "volumetric light beams through dusty air, the rest of the frame black"
- "rim light outlining her shoulders against the dark corridor"
- "the top and bottom of the frame dark, the action in the central band"
- Bracket syntax for a burst: "[00:00-00:02] ... [00:02-00:04] ... [00:04-00:06] ... [00:06-00:08] ..."

## 6. Sound

- One score cue for the whole trailer, attached once. Brief with timings:
  "Trailer cue, 30 s, about 100 BPM. Low sustained synth drone 0 to 14 s
  with sparse deep hits; a rising pulse from 14 s building to 24 s; a hard
  stop at 24 s with one second of silence; a single low braam at 25 s under
  the title; a high string sting at 28 s. Instrumental." Volume 0.9 to 1.
- Clips: `off` on montage fragments; `native` on dialogue fragments and on
  shots whose own hit is part of the design.
- Dialogue fragments: 3 to 6 lines of 2 to 8 words; no narrator needed.
  30 s holds about 25 spoken words in total.
- Narration with captions can carry a title line ("This winter.") when the
  user wants words on screen: the caption burns from the voiceover.

Beat grid: one beat lasts 60,000 / BPM ms (100 BPM: 600 ms; 120 BPM: 500
ms). Cut the montage on multiples of a beat with `edit_clip` trims, measuring
from the score's first downbeat. A generated score may not follow the BPM
in the brief, and its downbeat time is not known to you: never promise exact
tempo; ask the user to confirm the downbeats in the app's player after
listening, or cut on the brief's grid and say the sync is approximate.
Give the score's node `fade_out_ms` only when the cue does not end itself:
a fade on the last clip never fades a film-wide score.

## 7. Model picks

| Tier | Model | Why |
|---|---|---|
| Best quality | Seedance 2.0 | 4 references (hero, threat, location, style plate), 1080p |
| Best image, bursts | Veo 3.1 | Bracketed multi-shot in one 8 s clip; native hits |
| Value | Veo 3.1 Fast | Bursts at 28 credits for four shots |
| Silent fragments | Hailuo 3 Max | 10 per 5 s; the score carries the sound |
| Draft | Seedance 2.0 Mini | 9 per 5 s with references |

Typical cost (clips plus about 2 per opening image):

| Model | 15 s (4 clips above) | 30 s (8 clips above) |
|---|---|---|
| Veo 3.1 Fast | 3 x 14 + 28 = 70, plus 8 | 6 x 14 + 2 x 28 = 140, plus 16 |
| Veo 3.1 | 3 x 47 + 94 = 235, plus 8 | 6 x 47 + 2 x 94 = 470, plus 16 |
| Seedance 2.0 | 3 x 44 + 88 = 220, plus 8 | 6 x 44 + 2 x 88 = 440, plus 16 |

Score 3 credits per 30 s.

## 8. Prompt pairs

### Pair 1: the opening vista (Veo 3.1 Fast)

Still frame:

```text
Feature film trailer frame, anamorphic lens look. Extreme wide shot, low angle. Vera: a woman in a weathered orange pressure suit with a cracked white helmet, standing alone on a black basalt ridge, small in the lower third of frame. A vast dust storm wall rises behind her; the sun is a small white disc through haze. The top and bottom of the frame dark. Palette: rust, charcoal, pale ochre. Coarse 35mm grain.
```

Motion:

```text
Feature film trailer shot, anamorphic lens look. Slow crane up and back over the whole shot, ending high above the ridge. 0 to 4 s: Vera does not move; dust streams sideways across the frame from right to left. The storm wall stays the same shape and distance. Exactly one person in frame, nobody else. SFX: a low sub-bass hit at the start, wind roar rising. Ambient noise: suit breathing. Clean frame: no text, no subtitles, no on-screen graphics.
```

### Pair 2: a montage burst (Veo 3.1 Fast, bracketed)

Still frame:

```text
Feature film trailer frame, anamorphic lens look. Medium shot from behind, 35mm lens. Vera in her orange pressure suit and cracked white helmet runs down a narrow steel corridor lit by one red warning lamp on the far wall, dust hanging in the air. Deep shadow on both sides. Palette: rust, black, warning red.
```

Motion:

```text
[00:00-00:02] Tracking shot behind Vera as she runs down the red-lit corridor, already in motion. [00:02-00:04] Insert: a steel hatch slams shut in front of the lens. SFX: a heavy metal impact. [00:04-00:06] Wide shot: dust floods the corridor from the far end toward camera. [00:06-00:08] Close-up through her cracked visor, her eyes lit red, she stops breathing for a second. Vera's suit and helmet stay the same in every shot. Exactly one person in every shot, nobody else. Clean frame: no text, no subtitles, no on-screen graphics.
```

### Pair 3: the title room (any model)

Still frame:

```text
Feature film trailer frame, anamorphic lens look. Wide shot down a dark steel corridor, eye level, 35mm lens. Empty. A single beam of pale light falls from a ceiling vent at the centre, dust drifting in it; everything else near black. Large empty dark space in the upper half of the frame. Palette: black, pale grey.
```

Motion:

```text
Locked-off camera. Dust drifts slowly down through the single beam; nothing else moves. The corridor stays exactly as in the opening frame, empty, nobody in frame. Sound: a low air hum. Clean frame: no text, no on-screen graphics.
```

Second family notes: Seedance takes the same burst as a TIMELINE of four
2 s blocks in a production note, with CONTINUITY repeating the suit and the
helmet; Kling v3 can hold several shots in one clip but its multi-shot
switch is not a Lavendly argument, so write single shots for Kling.

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| The hero changes across fifteen shots | Locked description verbatim in every still; references wired on Seedance; app stills for the close-ups |
| Generic glossy "AI trailer" look | A film stock and a lens in the style line; one palette; delete every banned word |
| Garbled title text | Title room shots only; the user adds titles in the app |
| Action warps in fast fragments | 2 s fragments inside bursts; cut before the warp with `edit_clip` |
| Bursts drift between their shots | Repeat the identity sentence at the end of the burst; four shots maximum per 8 s |
| A montage of unrelated pretty shots | Each fragment escalates one thing (distance, danger, scale); write its verb |
| Clip music fights the score | Native `off` on every montage clip |
| The button lands flat | It must change the tone; write the turn as a physical event (a knock, a door, a look) |

## 10. Policy guards

- The user's own story or a concept; never a trailer for a real film,
  franchise or studio, and no lookalike of a real actor.
- No real studio, distributor or rating-board logos or cards; no "from the
  director of" naming a real person.
- A concept trailer is labelled as a concept when posted (lavendly-publish
  writes the disclosure).
