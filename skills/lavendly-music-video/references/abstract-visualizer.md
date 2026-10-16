# Recipe: abstract film and visualizer

## 1. Purpose, audience, ending

- Purpose: the song's feeling as images without a story: textures,
  transformations, a motif that evolves. A visualizer for a release, a loop
  for a streaming canvas, an art film for a single.
- Audience: listeners who keep the video playing; release-day posts;
  streaming and social loops.
- The ending: the motif resolved (the shape closes, the colour returns to
  the first section's), or a loop that never ends.

## 2. What a visualizer is on Lavendly

- Nothing reacts to the audio: there is no waveform or audio-reactive
  render. Rhythm comes from cutting on the grid and from motions written at
  a known rate ("the sphere pulses once every two seconds" at 120 BPM).
- One motif carries the film: a shape, an object, a material (a chrome
  sphere, ink in water, a paper moon). Each section changes its colour,
  scale or state; it never changes into something unrelated.
- A loop: one clip of 5 to 10 s with cyclic motion (a full rotation, a pulse
  that returns), repeated as copies of its node (the same `data.video_url`,
  no generation credits) placed one after another; `edit_clip` loop is
  accepted but ignored by the export. Check the seam: open the
  first and last frames with `get_scene_frame`; when they differ, end the
  motion prompt on the start state ("returns to its starting position").
- Square works best for art and streaming canvases; 9:16 for Shorts.

## 3. Structures by length

At 120 BPM (1 bar = 2 s). Model lengths for Wan 2.7 or FLUX 3 Video (5 s or
10 s).

### 6 s: one transformation (3 bars)

| Slot | Bars | Size, lens | Move | Action | Generate |
|---|---|---|---|---|---|
| 1 | 1 to 3 | Macro, 100mm | locked-off | A drop of indigo ink falls into clear water and blooms into a slow cloud on the downbeat | 10 s, trimmed to 6 |

### 15 s: three linked transformations (128 BPM, 8 bars)

| Slot | Bars | Size, lens | Move | Action | Generate |
|---|---|---|---|---|---|
| 1 | 1 to 2 | Macro | locked-off | Ink blooms in water | 5 s |
| 2 | 3 to 4 | Macro | slow push-in | The ink cloud turns into fine smoke in a black space (match cut on shape) | 5 s |
| 3 | 5 to 6 | Wide | slow orbit | The smoke curls around a chrome sphere | 5 s |
| 4 | 7 to 8 | Close-up | locked-off | The sphere reflects the ink colour and stills | 5 s |

### 30 s: a visual poem in five images (16 bars at 128 BPM)

Five to seven images, one motif, cut every 2 to 4 bars, a burst of half-bar
pieces from one clip at the chorus. Match cuts on shape (circle to moon to
eye) and colour between sections.

### 60 s: three movements (120 BPM, 30 bars)

| Movement | Bars | Look | Cut every |
|---|---|---|---|
| Calm | 1 to 8 | Indigo ink in water, macro, slow | 4 bars |
| Disturbance | 9 to 22 | The motif breaks: smoke, shards, fast orbits, bursts | 1 to 2 bars |
| Resolution | 23 to 30 | The motif whole again, still, the first colour | one 8-bar hold or two 4-bar holds |

About 12 clips.

### 90 s and longer: visualizer with loops

Three to five looped clips, one per section, each 5 to 10 s, repeated as
copies of the clip node to fill the section (each copy wired to the song),
with hard cuts on section downbeats.
Cheapest per minute of all music videos: five clips can fill three minutes.

## 4. Hook and payoff

- Hook: an image that breaks physics calmly at frame 0 (ink falling upward,
  a sphere floating in a desert).
- Payoff: the motif resolved and still on the last section, or the loop.

## 5. Camera, light, colour

- Very slow push-ins, static tableaux, slow orbits around the motif, match
  cuts on shape and colour.
- Light: one colour per section from one source; hard sun in empty
  landscapes; a soft dark-field glow for macro liquids.
- Colour: one dominant hue per section; the first and last sections share it.

Exact phrases that work:

- "macro, 100mm, focus plane only millimetres deep, black background"
- "a single drop of indigo ink falls into clear water and blooms into a slow cloud"
- "a mirror-polished chrome sphere floats one metre above white sand, reflecting the sky"
- "rotates exactly one full turn and returns to its starting position"
- "one colour per frame: deep indigo on black"

## 6. Sound plan

- The song once, volume 1, `ducking` false; every clip `off`
  ([one-track-rule.md](one-track-rule.md)).
- Without a track: a generated score fits this genre well (ambient,
  electronic, piano), music first, then the picture to its grid.

## 7. Model picks

| Tier | Model | Why |
|---|---|---|
| Best look | FLUX 3 Video | Art-directed, stylised, 1:1 and 9:16; 5 to 20 s |
| Value with style plates | Wan 2.7 | 4 references (style plates), 12 per 5 s, 1:1 |
| Silent value | Hailuo 3 Max | 10 per 5 s, 1:1 and 9:16 |
| Long single take | Wan 3.0 | Up to 30 s, for a slow continuous transformation |
| Draft | Grok Imagine | 9 per 5 s, 1:1 |

Typical cost (clips plus about 2 per opening image):

| Model | 15 s (4 x 5 s) | 30 s (7 x 5 s) |
|---|---|---|
| FLUX 3 Video | 4 x 34 = 136, plus 8 | 7 x 34 = 238, plus 14 |
| Wan 2.7 | 4 x 12 = 48, plus 8 | 7 x 12 = 84, plus 14 |
| Hailuo 3 Max | 4 x 10 = 40, plus 8 | 7 x 10 = 70, plus 14 |

A 3-minute looped visualizer from five 10 s Wan 2.7 clips: 5 x 24 = 120,
plus 10.

## 8. Prompt pairs

### Pair 1: the ink (FLUX 3 Video, calm movement)

Still frame:

```text
Abstract music video frame, macro, black background. Extreme close-up, 100mm macro lens, focus plane only millimetres deep. A single drop of deep indigo ink hangs at the tip of a glass pipette just above the still surface of clear water in a glass tank. Soft glow from below the tank, everything else black. Palette: deep indigo, black, faint silver. No text, no letters, no logos.
```

Motion:

```text
Abstract music video frame, macro. Locked-off camera. 0 to 2 s: the indigo drop falls and touches the water. 2 to 10 s: it blooms slowly into a soft cloud that curls downward and outward in thin threads, then hangs almost still. Exactly one ink cloud, nothing else in the water. Silent, no music generated. Clean frame: no text, no letters, no logos.
```

### Pair 2: the sphere loop (Wan 2.7, square, with a style plate)

Still frame:

```text
Abstract music video frame, empty white desert at noon. Wide shot, low angle, 24mm lens, square composition centred. A mirror-polished chrome sphere floats one metre above white sand, reflecting the pale sky and the dunes. Hard white noon sun from above, a crisp round shadow on the sand below. Palette: white, pale blue, chrome. No text, no letters, no logos.
```

Motion:

```text
The chrome sphere rotates slowly on its vertical axis exactly one full turn and returns to its starting position; its reflection slides around it; its shadow stays still. Static camera, low angle. Reference 1 is the style plate for palette and light only; ignore its content. The sphere, the sand and the light stay exactly as in the opening frame. Exactly one sphere, nothing else in the desert. Light source: hard sun, top light, high contrast, wide shot, centred composition, cool tone. Silent, no music generated. Clean frame: no text.
```

Repeat this clip as copies of its node over its section after checking
that its first and last frames match.

Second family notes: on Hailuo 3 Max put the move after the action ("the
sphere turns one full turn [Static shot]"); on Grok, describe the still
first in one sentence, then the motion.

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| Messy "AI dream" clutter | One surreal element per shot, a clean background |
| Morphing that looks like an error | Write the start and end states of the transformation |
| The loop jumps at the seam | Cyclic motion ending on the start state; check first and last frames |
| Colours drift between sections | One colour line per section, pasted verbatim |
| Letters appear on surfaces | "No text, no letters, no logos" in both prompts |
| Nothing feels on the beat | Cut on downbeats; pulses written at the bar rate |

## 10. Policy guards

- No other artist's album art, logos or signature visuals copied or named.
- No flashing faster than three times a second over large areas (a
  photosensitivity risk); strobe only in short bursts.
