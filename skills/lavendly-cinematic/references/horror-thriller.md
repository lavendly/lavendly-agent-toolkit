# Recipe: horror and thriller

## 1. Purpose, audience, ending

- Purpose: dread, then release. Horror makes the viewer afraid of what they
  might see; thriller makes them afraid of what will happen.
- Audience: genre fans, seasonal campaigns, series hooks, found-footage
  shorts on vertical feeds.
- The ending: a scare that pays off the tension ladder, a reveal that
  re-reads the film, or a sting that reopens it. The last frame is chosen,
  never a fade into nothing.

## 2. Structures by length

Model lengths for Veo 3.1 Fast (4 or 8 s). Horror lives on long holds, so
8 s generations trimmed to 6 or 7 s are common.

### 6 s: the wrong detail

| # | Size, angle, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Wide, eye level, 24mm | locked-off | A dark farmhouse hallway; at 4 s the bedroom door opens a few centimetres by itself | 6 s | 8 s |

### 15 s: calm, unease, sound, reveal, black

| # | Size, angle, lens | Move | Action | Cut | Generate |
|---|---|---|---|---|---|
| 1 | Medium, 35mm | locked-off | A woman reads in bed by a lamp; ordinary | 3 s | 4 s |
| 2 | Wide, 24mm, deep focus | locked-off | The hallway beyond her open door; nothing | 4 s | 4 s |
| 3 | Close-up, 85mm | locked-off | She lowers the book; she heard something; eyes to the door | 4 s | 4 s |
| 4 | Wide, 24mm | very slow push-in | The hallway: a shape now stands at the far end, still | 3 s | 4 s |
| 5 | Black | | `fade_out_ms` on shot 4, one sound | 1 s | none |

### 30 s: the tension ladder

| # | Size, lens | Move | Action | Rung | Cut | Generate |
|---|---|---|---|---|---|---|
| 1 | Wide, 24mm | locked-off | Kitchen at night, a man makes tea; a window behind him onto a black garden | Calm | 4 s | 4 s |
| 2 | Insert, 100mm | locked-off | The kettle's steel side reflects the window; a pale shape in the reflection, unclear | Wrong 1 | 3 s | 4 s |
| 3 | Medium close-up, 85mm | locked-off | He stops stirring; listens | Sound | 4 s | 4 s |
| 4 | Wide, 24mm | slow pan right | The garden through the window: empty lawn, a swing moving slightly | Wrong 2 | 5 s | 8 s |
| 5 | Medium, 35mm | locked-off | He laughs once at himself, turns back to the counter | False calm | 4 s | 4 s |
| 6 | Wide, 24mm | locked-off | Behind him in the window, a figure stands on the lawn; he does not see it | Scare | 6 s | 8 s |
| 7 | Close-up, 85mm | locked-off | He freezes; his eyes move toward the window without turning his head; cut to black | Sting | 4 s | 4 s |

### 60 s: two false scares and a real one

| Beats | Time | Shots |
|---|---|---|
| Calm, the place and the person | 0 to 10 s | 2 shots (wide, medium) |
| Wrong detail one | 10 to 18 s | insert and reaction |
| False scare one (a cat, a pipe knock) | 18 to 25 s | 2 short shots, then a laugh |
| Wrong detail two, bigger | 25 to 35 s | slow push-in that never arrives, a long hold |
| False scare two | 35 to 42 s | a door, a reflection that is only a coat |
| False calm | 42 to 48 s | a medium shot, breath out |
| The real scare | 48 to 55 s | the figure in the deep-focus background, held |
| Sting | 55 to 60 s | close-up, then black, then one sound |

About 12 to 13 shots.

### 90 s: a ladder with a second act

The 60 s ladder plus a 30 s middle: the person investigates (a flashlight
POV down the stairs, an insert of a door handle turning from the other
side, a false resolution where the house is quiet and the lights come
back). The real scare moves to 75 s; the sting reopens the story with a
final image (the figure is now inside). About 18 shots.

### Thriller variant (30 s)

Same ladder, but the threat is a person or a clock: 1 establishing, 2 the
message (a phone glowing face up, the screen turned away), 3 the reaction,
4 the hallway, 5 the door handle turning, 6 the decision, 7 the action and
cut. Faster cutting from shot 5 (2 to 3 s per shot).

## 3. Hook and payoff

- Hook: something slightly wrong in frame 1 (a door ajar, a figure in the
  background, a reflection) or a single sound over a still frame.
- Payoff: the scare shown in the background of a deep-focus wide, held, or
  a sting of two seconds then black. Imply, never show the full thing.

## 4. Camera, light, colour

- Locked-off long holds; slow push-ins that never reach the door; slow pans
  that reveal; handheld POV for found footage; Dutch angles once at most.
- Negative space where something might appear: frame the person off
  centre with an empty doorway on the other side.
- Light: low key, one practical (a flashlight, a TV glow, a candle, a fridge
  door), cold moonlight through a window, under-lighting rarely.
- Colour: desaturated, a green or blue cast, crushed blacks, the face still
  readable. Edit: saturation 0.65 (a multiplier), brightness -0.05 on every clip.

Exact phrases that work:

- "Horror film still, 16mm grain, low-key light"
- "lit only by moonlight through the window at the far end, deep shadows, her face still readable"
- "deep focus, the dark doorway behind her sharp"
- "very slow push-in toward the open door over the whole shot, the door never reached"
- "the figure stands perfectly still and does not move toward camera"
- "desaturated blue-grey, crushed blacks"

### Found footage method

Decide first: who filmed it, on what device, in what year, and why. Then:

- The camera paragraph describes the device's defects: "handheld consumer
  camcorder, slight wide-angle distortion, night mode noise, autofocus
  hunting between the trees and her face".
- One imperfection event per shot, never the same twice: focus hunts, the
  frame is late to follow her, the lens is bumped, a branch crosses the
  lens, the light dips, the recording cuts as if switched off.
- Clean frame stays: "no timestamp, no date stamp, no recording icon, no
  on-screen text". Models garble overlays; a date stamp reads as AI.
- No slow motion, no score in the clip, no glide moves.

## 5. Sound

- Ambience on every shot (room tone, wind against glass, a fridge hum):
  `native`. The scare is mostly sound design inside the clips.
- Silence or a drop in ambience before the scare; then a sting (a sharp
  string note or a low impact) written into the scare clip as "SFX".
- Score: a low drone brief at volume 0.2 to 0.3 for the whole film, or none.
  Brief: "Low dark drone, no melody, slowly rising in pitch from 0 to 22 s,
  cutting out completely at 22 s, then one low impact at 24 s. Instrumental,
  sparse."
- Whispered lines only, 2 to 6 words; no narrator.

## 6. Model picks

| Tier | Model | Why |
|---|---|---|
| Best quality | Veo 3.1 | Dark scenes hold texture; strong native ambience and SFX |
| Best value | Veo 3.1 Fast | Same, 14 per 4 s clip |
| Fear on faces from a still | Kling v3 Pro | Small facial changes held from an approved still |
| Long single take | Wan 3.0 | One 15 to 30 s hold with sound |
| Draft | Seedance 2.0 Mini | 9 per 5 s, sound on |

Typical cost (clips plus about 2 per opening image):

| Model | 15 s (4 clips) | 30 s (7 clips) |
|---|---|---|
| Veo 3.1 Fast | 4 x 14 = 56, plus 8 | 5 x 14 + 2 x 28 = 126, plus 14 |
| Veo 3.1 | 4 x 47 = 188, plus 8 | 5 x 47 + 2 x 94 = 423, plus 14 |
| Kling v3 Pro | 4 x 20 = 80, plus 8 | 6 x 20 + 40 = 160, plus 14 |

## 7. Prompt pairs

### Pair 1: the hallway (Veo 3.1 Fast, 6 s)

Still frame:

```text
Horror film still, 16mm grain, low-key light. Wide shot down a narrow farmhouse hallway at night, eye level, 24mm lens, deep focus. Bare wooden floorboards, a faded runner rug, a bedroom door on the right standing slightly ajar, a window at the far end. Lit only by cold moonlight through that window, deep shadows along both walls. Palette: blue-grey, black, pale silver.
```

Motion:

```text
Horror film shot, 16mm grain. Locked-off camera. 0 to 4 s: nothing moves; the moonlight stays still on the floor. 4 to 7 s: the bedroom door on the right slowly opens another few centimetres by itself, and stops. 7 to 8 s: stillness. The hallway, the rug and the moonlight stay exactly as in the opening frame. Nobody in frame, no person or animal. Ambient noise: one floorboard creak, wind against glass. No music. Clean frame: no text, no subtitles, no on-screen graphics.
```

### Pair 2: the window (Veo 3.1 Fast, 30 s shot 6)

Still frame:

```text
Horror film still, 16mm grain, low-key light. Wide shot, 24mm lens, deep focus. Owen: a man in his fifties, heavy build, bald, grey stubble, a faded blue flannel shirt. He stands at a kitchen counter with his back to a large black window, stirring a mug. Lit by one warm under-cabinet light on the counter; the window behind him shows a dark lawn under faint moonlight. Palette: warm amber, black, cold blue.
```

Motion:

```text
Horror film shot, 16mm grain. Locked-off camera. 0 to 3 s: Owen stirs the mug slowly, his back to the window. 3 to 8 s: on the dark lawn beyond the window, far behind him, a pale figure is standing perfectly still where there was nothing; it does not move toward the house. Owen does not turn. Owen, the kitchen and the light stay exactly as in the opening frame. Exactly one person in the kitchen; exactly one still figure on the lawn, nobody else. Ambient noise: a spoon against ceramic, a fridge hum. Clean frame: no text, no subtitles, no on-screen graphics.
```

### Pair 3: found footage (Veo 3.1 Fast)

Still frame:

```text
Consumer camcorder frame, night, flashlight only. First-person view walking in a pine forest, a flashlight beam on the pine trunks ahead, the rest black. Slight wide-angle distortion, night mode noise. Pine needles on the ground lit at the bottom of frame. Palette: black, sickly green-grey, white beam. No timestamp, no on-screen text.
```

Motion:

```text
Handheld consumer camcorder footage, first person, already walking from the first frame. 0 to 3 s: the beam sweeps slowly from left to right across the trunks; autofocus hunts. 3 to 5 s: the beam catches a pale figure standing still between two trees, then swings away fast. 5 to 6 s: the frame jolts as if the camera was bumped. Nobody else in frame. Sound: heavy breathing behind the camera, a twig snap, then sudden static. No music. Clean frame: no timestamp, no recording icon, no on-screen text.
```

Second family notes: on Kling write the fear as two behaviours in the
Action field ("her breath stops; her eyes move to the window without her head
turning"); on Seedance add "already in motion from the first frame" to the
found-footage walk.

## 8. Failure modes and fixes

| Failure | Fix |
|---|---|
| The model shows a monster, gore or a full creature | Imply: silhouette, a figure standing still, a shadow; "it does not move toward camera" |
| The scare is softened or refused by a filter | Keep it suggestive; no blood, no injury, no weapon in use |
| Dark scenes turn to muddy noise | "Deep blacks but her face readable, one practical light"; check the frame before the next scene |
| The figure walks toward the lens or multiplies | Count it ("exactly one still figure") and fix it in place |
| Overlays (timestamps, REC dots) on found footage | The clean-frame line names them; no "VHS" with date stamp |
| The score covers the silence | The score brief cuts out before the scare; clips `native` |
| Jump scares with no ladder | Build at least two rungs before the scare in 30 s, three in 60 s |
| The house layout changes between shots | One geography line pasted into every prompt: "the hallway, bedroom door on the right, window at the far end" |

## 9. Policy guards

- No gore, no graphic injury, no torture, no harm to children or animals
  shown. Threat is implied.
- No real crimes, victims or places presented as real ("the true story of").
- Found footage is fiction: label it as such when posted.
