# Recipe: satisfying and ASMR clips

Macro processes that complete: honey folding into ribbons, ink blooming in
water, sand crumbling from a clean cut, glass glowing and stretching. The
pleasure is texture, completion and sound, so the picture stays simple and
the sound is the content.

## 1. Purpose, audience, ending

Relaxation and sensory clips for Shorts, Reels and TikTok, brand texture
films (food, cosmetics, materials), background loops. The ending is a
completed action: the last ribbon settles, the cut slice falls away, the
glass cools to its shape. Nothing left unfinished; or the clip loops
([recipe-loops.md](recipe-loops.md)).

## 2. What models do well and badly

| Do (reliable) | Avoid (fails often) |
|---|---|
| pours: honey, syrup, cream into coffee, paint, glaze over a cake | exact slicing into even pieces (soap cutting, cake slices counted) |
| ink or dye blooming in clear water | anything that needs an exact count of more than five things |
| slime or dough folding and stretching | hands doing fine work (peeling, threading, tying) |
| kinetic sand crumbling from one clean press | dominoes, chain reactions with many parts |
| molten glass glowing, drooping, stretching | pressure-washing reveals (patterns and letters appear) |
| wax melting, ice softening, bubbles rising | crushing and breaking glass (shards multiply) |
| one object sliding into a matching slot, slowly | fast impacts and splashes over 4 s of slow motion |

## 3. Structure by length

Built on Veo 3.1 Fast (4, 6 or 8 s; long takes suit the genre). Example
set: a warm kitchen counter, honey, cream, pancakes.

### 6 s: one complete action

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 6 | Close-up | 45 degrees above | 85mm, shallow focus | locked-off | honey folds onto itself in slow ribbons on a pancake stack and settles | 6 | 8, trim |

### 15 s: three actions, one set

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 4 | Extreme close-up | Top-down | 100mm macro | locked-off | cold cream blooms into black coffee in slow clouds | 4 | 4 |
| 2 | 4 to 8 | Close-up | 45 degrees above | 85mm | locked-off | a pat of butter slides and melts across a hot pancake | 4 | 4 |
| 3 | 8 to 15 | Close-up | 45 degrees above | 85mm | locked-off | honey ribbons fold onto the stack and settle | 7 | 8, trim |

### 30 s: four long takes

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 8 | Extreme close-up | Top-down | macro | locked-off | ink drops into a glass of water and blooms | 8 | 8 |
| 2 | 8 to 16 | Close-up | 45 degrees | 85mm | ultra-slow slider left | glaze pours over a round cake and runs down the sides | 8 | 8 |
| 3 | 16 to 24 | Macro | Top-down | macro | locked-off | a metal cutter presses down through a cube of kinetic sand; the slice crumbles away | 8 | 8 |
| 4 | 24 to 30 | Close-up | Eye level | 85mm | locked-off | honey ribbons fold and settle | 6 | 8, trim |

### 60 s: one long process

A single process told as a continuous take across clips (the Glass Quick
Start film works this way): each scene starts from the previous scene's last
frame (`get_scene_frame` last, `/api` plus the returned path set as the next
image url; only from an untrimmed end), and each motion
prompt opens with "Continue the exact same shot without any cut, same
<place>, same camera position, same <light>". Seven 8 s clips and one 4 s
clip: 210 credits on Veo 3.1 Fast. After two hops, start the next scene
from a fresh still written to show the process at that stage, or the colour
and detail drift. The alternative is two 30 s single takes on Wan 3.0 (288
credits, no chaining). Example: a small glass bubble blown from a gather.

| # | Time | Size | Angle | Lens feel | Move | Action | Opening frame | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 8 | Close-up | Eye level | 100mm, shallow | locked-off | the glowing gather turns slowly on the pipe | fresh still | 8 |
| 2 | 8 to 16 | Close-up | Eye level | 100mm | locked-off | it droops into a thick teardrop | last frame of 1 | 8 |
| 3 | 16 to 24 | Close-up | Eye level | 100mm | locked-off | the tip cools from orange to amber | last frame of 2 | 8 |
| 4 | 24 to 32 | Close-up | Eye level | 100mm | locked-off | the pipe turns and the gather rounds again | fresh still | 8 |
| 5 | 32 to 40 | Close-up | Eye level | 100mm | locked-off | the pipe rolls along a steel table; one side flattens | last frame of 4 | 8 |
| 6 | 40 to 48 | Close-up | Eye level | 100mm | locked-off | the gather swells slowly into a small bubble from inside | last frame of 5 | 8 |
| 7 | 48 to 56 | Close-up | Eye level | 100mm | locked-off | the bubble cools from orange to deep red | fresh still | 8 |
| 8 | 56 to 60 | Close-up | Eye level | 100mm | locked-off | the finished bubble hangs still, glowing faintly | last frame of 7 | 4 |

## 4. Hook and payoff

- Hook (frame 1): the action already under way, with a crisp sound on the
  first frame; never a still set waiting for something to happen.
- Payoff: perfect completion (the last ribbon lands, the slice falls cleanly,
  the bloom fills the glass), then a short hold.

## 5. Camera, light, colour

- Camera: macro, top-down or 45 degrees above, locked-off; at most an
  ultra-slow slider of a few centimetres. Hands only when needed, one hand,
  one simple grip, entering from one side.
- Light: one soft key with clean shadows, or soft even light; a backlight
  through liquids, glass and translucent materials so they glow.
- Background: clean and neutral (white marble, dark walnut, a pastel paper
  sweep), nothing busy.
- Colour: pastel or monochrome sets that let the material's colour lead.
- Exact phrases: "Macro process film, locked-off, one soft key light, clean
  neutral background", "slow motion", "folds onto itself in slow ribbons",
  "the slice crumbles away in fine grains", "settles and stops".

## 6. Sound (the content)

- Native sound is the Foley: write each sound precisely on Veo ("SFX: a
  soft sticky drip, close-miked", "SFX: a crisp crunch, then a fine sand
  trickle"), add "Ambient noise: a quiet room." and "No music."
- Clips `native` at 1. Lavendly has no separate effects track; a designed
  sound file can ride as the film's one music track by `url`.
- Music: none, or a very soft pad at volume 0.1 (no voice, so ducking does
  nothing).
- Narration: none; a whispered line at most (ElevenLabs v3 "[whispers]"),
  1.5 words per second.

## 7. Model picks and credits

| Pick | Model | 15 s (4+4+7) | 30 s (8+8+8+6) | Why |
|---|---|---|---|---|
| Best quality | Veo 3.1 | 188 | 376 | crisp native SFX, 1080p |
| Recommended | Veo 3.1 Fast | 56 | 112 | the Glass Quick Start film's model; native SFX |
| Value | Seedance 1.5 Pro | 56 (4 s minimum: 4+4+8) | 112 | 1080p, sound, 14 per block |
| Draft | Seedance 2.0 Mini | 36 | 72 | 720p, sound |

## 8. Prompt pairs (Veo dialect)

Pair 1: honey ribbons (6 s)

Still-frame prompt:

```text
Macro process film, locked-off, one soft key light, clean neutral background. A stack of three golden pancakes on a white plate on dark walnut, a wooden honey dipper held above it with one thick ribbon of honey already touching the top pancake. Close-up, 45 degrees above, 85mm, shallow focus. Warm backlight through the honey from behind, soft key from the left, dark background. Palette: honey gold, cream, walnut. No text, no letters, no logo.
```

Motion prompt:

```text
Close-up, 45 degrees above, locked-off camera. 0 to 5 s: the honey ribbon folds onto itself in slow, even loops on top of the pancakes, glowing in the backlight, spreading toward the edges. 5 to 6 s: the last fold lands and the honey settles and stops. End state: a glossy pool of honey on the top pancake. The pancakes, the plate and the light stay exactly as in the opening frame. Exactly one dipper and one stack. Slow motion. SFX: a soft sticky drip, close-miked. Ambient noise: a quiet kitchen. No music. Clean frame: no text, no on-screen graphics.
```

Pair 2: molten glass (one scene of the 60 s continuous process)

Still-frame prompt:

```text
Macro process film, locked-off, one soft key light, clean neutral background. A glowing orange gather of molten glass on the end of a long steel blowpipe, held still over a dark workshop bench, the glass round and smooth, bright at the core, nobody in frame. Close-up, eye level, 100mm, shallow focus. The furnace glow from behind right, everything else dark. Palette: molten orange, amber, soot black. No text, no letters, no logo.
```

Motion prompt:

```text
Continue the exact same shot without any cut, same dark workshop, same camera position, same furnace glow behind. 0 to 4 s: the glowing gather droops slowly under its own weight and stretches into a thick teardrop. 4 to 8 s: its colour cools from bright orange to deep amber at the tip while the core keeps glowing. End state: an amber teardrop hanging still from the pipe. Exactly one gather of glass on one pipe. SFX: a faint crackle of cooling glass. Ambient noise: the low roar of the furnace. No music. Clean frame: no text, no on-screen graphics.
```

Second family (Seedance 1.5 Pro), pair 1 in 30 to 100 words: "Honey is
already folding in slow loops on the stack of pancakes from the first
frame, glowing in the warm backlight; the last fold lands and the honey
settles into a glossy pool. Locked-off close-up from 45 degrees above,
shallow focus, dark walnut. Exactly one stack. Sound: a soft sticky drip
only, no music. Clean frame: no text, no on-screen graphics."

## 9. Failure modes and fixes

| Failure | Fix |
|---|---|
| Cutting and slicing physics fail | choose a press or a pour; show the result; under 5 s |
| Liquid behaves like jelly or freezes | one pour path, slow motion, the end state named |
| Generated sound is soft and generic | name each sound exactly and "close-miked"; "No music." |
| The model adds its own music | "No music." in the prompt; the clip stays `native`; no score |
| Hands warp | no hands, or one hand with one grip named |
| Too much happening | one process per clip, one material |
| Chained continuous take drifts in colour | fresh still from words after two hops |

## 10. Policy guards

- Food and cosmetic clips show textures, not results claimed as proof of a
  benefit.
- No real people's voices; a whisper is a synthetic voice the user chose.
