# Recipe: 3D environments and macro worlds

Worlds the camera travels through: a moss forest at insect scale, a city
inside a raindrop, a floating island diorama, an impossible architecture.
The craft is one camera path with landmarks, rigid geometry, scale cues and
light that tells the time of day.

## 1. Purpose, audience, ending

World-building openers, establishing shots for a series, product worlds,
music visuals, ambient screens, explainer settings. The ending is an
arrival: the camera reaches a destination frame (the tower, the clearing,
the drop of dew) and slows into a hold.

## 2. Structure by length

Built on Wan 3.0 (any whole length 2 to 30 s, 1080p, sound): one long take
has no chaining drift between clips. Long takes are written as a timeline
of landmarks, one every 4 to 6 s, so the clip keeps something happening.
Example: a moss forest seen at the scale of an ant.

### 6 s: one push into the world

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 6 | Wide to medium | Ground level | macro, tilt-shift | slow glide forward | between moss stems toward one dew drop glowing in a sun shaft | 6 | 6 |

### 15 s: one continuous take

| # | Time | Size | Angle | Lens feel | Move | Landmark |
|---|---|---|---|---|---|---|
| 1a | 0 to 5 | Wide | Ground level | macro | glide forward at walking pace | moss stems like a forest, light shafts through haze |
| 1b | 5 to 10 | Medium | Ground level | macro | the glide continues, rising slightly | past a red mushroom the size of a tree |
| 1c | 10 to 15 | Close-up | Slightly low | macro | the glide eases to a stop | arriving at one dew drop holding the whole forest upside down |

Generate: one 15 s clip. A trim, a fade, a colour edit or captions send
the one-clip film through the full stitch and apply; with none of them it
ships the raw clip.

### 30 s: one take, or three shots

| Option | Build | Why |
|---|---|---|
| One 30 s take | six landmarks, one every 5 s, one path | no seams; the path must stay simple |
| Three 10 s shots | wide entry, mid journey, arrival; bridging cut on motion | each shot is easier to control; place changes get a bridge |

### 60 s: two takes and a bridge

Two long takes joined by a bridging shot that shows the new place before
the camera travels in it. A change of light (day to dusk) happens inside a
take as a time passage, never on a cut.

| # | Time | Size | Angle | Lens feel | Move | Landmarks | Generate |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 25 | Wide to medium | Ground level | macro, tilt-shift | forward glide at walking pace | moss stems in sun shafts (0 to 5), the red mushroom (5 to 10), a beetle crossing the path (10 to 15), a dew drop field (15 to 20), the fern tunnel's mouth ahead (20 to 25) | 25 |
| 2 | 25 to 35 | Medium | Ground level | macro | the glide continues through the tunnel | the bridge: curled fern fronds overhead, green light, the pond's glint at the far end | 10 |
| 3 | 35 to 60 | Wide | Low over water | macro | forward glide, easing to a stop | the pond edge (35 to 40), lily pads like islands (40 to 45), the light turning to dusk gold as time passes (45 to 50), a water strider skating (50 to 55), arrival at one floating petal, held (55 to 60) | 25 |

Wan 3.0: 5 + 2 + 5 blocks, 288 credits.

## 3. Hook and payoff

- Hook (0 to 2 s): the scale surprise already visible (a dew drop as big as
  a house, a city in a raindrop) with the camera already moving.
- Payoff: the arrival at the destination, the move easing to a stop, the
  frame holding 2 s or more.

## 4. Camera, light, colour

- One path, one speed, named landmarks with where the camera passes them
  ("past the mushroom on the left, under the arch of the fern"). Say the
  camera glides through space; a pan from a fixed position is a different
  shot.
- Speeds in human terms: "at walking pace", "drifting slowly", never "fast".
  FPV-style banking only in a simple world.
- Scale cues for macro: dew drops as boulders, moss stems as trees, razor-
  thin focus, tilt-shift blur at top and bottom.
- Isometric dioramas: a floating cut-out block of land showing soil and rock
  layers on its sides, seen from 45 degrees above, a short orbit of 45
  degrees at most.
- Architecture: "the buildings stay rigid and fixed; verticals stay
  straight; only the camera moves."
- Light: motivated volumetric shafts through haze or mist, golden hour from
  one side, bioluminescence at night, a soft sky fill.
- Colour: 3 to 5 palette words; one hue shift at most per take (dawn gold
  to morning green).
- Exact phrases: "the camera glides forward at walking pace past ... and
  eases to a stop facing ...", "macro scale, moss stems tall as trees",
  "sun shafts through light haze", "the ground and the stems stay fixed;
  only the camera moves".

## 5. Sound

- Native: the world's bed (wind, water, insects), and magnified sounds for
  macro (a dew drop falling like a bell); `native` at 0.6 to 0.8.
- Narration: optional, documentary pace 2.0 words per second (15 s about 30
  words, 30 s about 60); with narration clips go to `mix` at 0.3.
- Score brief: "A sparse ambient pad with slow felt piano at about 70 BPM,
  one new layer at each landmark, resolving as the camera stops."
  0.35 with `ducking: true` under narration, 0.5 without.

## 6. Model picks and credits

| Pick | Model | 6 s | 15 s | 30 s | Why |
|---|---|---|---|---|---|
| Best quality | Wan 3.0 Prime | 66 | 99 | 198 | 1080p single takes to 30 s |
| Recommended | Wan 3.0 | 48 | 72 | 144 | 1080p single takes to 30 s, sound |
| Value | Seedance 2.5 | 54 | 81 | 162 | single takes to 30 s, 4 refs, 720p |
| Draft | Seedance 2.0 Mini | 18 | 27 | 54 (2 x 15 s) | 720p, takes to 15 s |

Seedance puts most of its motion in the first two seconds and the camera
may drift later in long takes; write the path and the stop explicitly.

## 7. Prompt pairs (Wan dialect)

Pair 1: the moss forest (the 15 s take)

Still-frame prompt:

```text
Macro film of materials, razor-thin focus, tactile surfaces. Ground level inside a moss forest at insect scale: moss stems tall as trees, a red mushroom the size of a house on the left, dew drops like glass boulders, morning sun shafts through light haze, a narrow open path of soil leading forward. Wide shot, macro lens, tilt-shift blur at top and bottom. Low gold sun from the right. Palette: moss green, dew silver, mushroom red, gold. No text, no letters.
```

Motion prompt:

```text
The camera glides forward along the soil path at walking pace. 0 to 5 s: between the moss stems, sun shafts drifting through the haze. 5 to 10 s: past the red mushroom on the left, rising slightly. 10 to 15 s: the glide eases to a stop facing one large dew drop that holds the whole forest upside down inside it. The moss, the mushroom and the ground stay fixed; only the camera moves. Exactly one red mushroom. Macro scale, sun shafts, low contrast, warm side light. Sound: soft wind, a single drop falling like a small bell, insect hum. Clean frame: no text, no on-screen graphics.
```

Pair 2: the floating island (a 6 s diorama orbit)

Still-frame prompt:

```text
Isometric diorama, a floating cut-out block of land, miniature scale. A small square island floating in a pale sky: a cottage with a green roof, three round trees, a stream that runs off one edge as a thin waterfall of mist; the island's sides show brown soil and grey rock layers. Seen from 45 degrees above, centred, deep focus. Soft morning light from the left, soft shadows. Palette: grass green, soil brown, slate, sky blue. No text, no letters.
```

Motion prompt:

```text
The camera orbits 45 degrees to the right around the island at an even pace and eases to a stop. The trees sway slightly; the waterfall of mist drifts down from the edge and fades. The cottage, the trees and the island's shape stay rigid and fixed. Exactly one cottage and three trees. Isometric diorama, soft morning light. Sound: light wind, a faint stream. Clean frame: no text, no on-screen graphics.
```

Second family (Seedance 2.5), pair 1 as a production note: "Continuous take.
Starting state: ground level on the soil path in a moss forest at insect
scale, the camera already gliding forward. 0 to 5 s: between moss stems in
sun shafts. 5 to 10 s: past the red mushroom on the left. 10 to 15 s: eases
to a stop facing one dew drop. Camera: forward glide at walking pace, stops
on the drop. Continuity: the moss and the mushroom stay fixed. Audio: soft
wind, one drop like a bell. Ending state: the drop centred, held."

## 8. Failure modes and fixes

| Failure | Fix |
|---|---|
| Architecture breathes or bends | "rigid and fixed, verticals straight; only the camera moves" |
| The path wanders or turns back | one path, named landmarks, a named stop |
| Nothing happens after the first seconds | a landmark every 4 to 6 s on the timeline |
| Scale changes mid-take | scale cues in both prompts; one lens feel for the take |
| Repeating tiled textures (the check reports a repeating pattern) | fewer identical elements; name variation ("stems of different heights") |
| Objects appear from doorways and arches | say what is inside every opening ("the arch frames only sky") |
| Long take drifts in colour or detail | shorter takes with bridging cuts; never chain more than 2 to 3 hops |
| The diorama orbit reveals a broken back side | orbit 45 degrees at most |

## 9. Policy guards

- No real city, landmark or building presented as a documented real place
  when it is generated; a real place shown in a fantasy is labelled as such
  by the user.
- No other brand's logos or signage in the world; signs stay blank.
