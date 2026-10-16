# Recipe: 3D product render and CGI hero shots

The look of a studio CGI product film: physically based materials on a
seamless cyc or infinite black, motion-control camera moves, caustics,
exploded views and assemblies. On Lavendly the product's identity comes
from the user's real packshot; the model supplies light and motion.

## 1. Purpose, audience, ending

Launch films, product pages, ad hero shots, feature reveals. Audience:
buyers who must recognise the product on the shelf. The ending is a held
pack shot: the product still, at its best angle, on a clean background, for
2 s or more, with empty space where the user adds the logo or the name.

## 2. Structure by length

Built on Veo 3.1 Fast (4, 6 or 8 s; 6 and 7 s cuts are made at 8 s and
trimmed). Example: a perfume bottle in still water.

### 6 s: one hero move

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 6 | Medium close-up | Low | 100mm, shallow focus | slow 45-degree orbit right, eased | a drop lands beside the bottle; one ring spreads; caustics ripple | 6 | 8, trim |

### 15 s: material, hero, pack shot

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 4 | Extreme close-up | Eye level | 100mm macro | macro slide along the bevel | light runs along the glass edge; amber liquid glows | 4 | 4 |
| 2 | 4 to 8 | Medium | Low | 85mm | slow 45-degree orbit | the cap catches the rim light | 4 | 4 |
| 3 | 8 to 15 | Medium wide | Eye level | 50mm | locked-off | the drop and the ring; the bottle holds; empty field above it | 7 | 8, trim |

### 30 s: a feature film in miniature

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 4 | Extreme close-up | Top-down | macro | locked-off | amber liquid swirling in darkness, lit from behind | 4 | 4 |
| 2 | 4 to 8 | Medium | Eye level | 85mm | locked-off | the gold cap descends and seats on the bottle with a click | 4 | 4 |
| 3 | 8 to 12 | Extreme close-up | Low | macro | macro slide | the bevelled edge, light running along it | 4 | 4 |
| 4 | 12 to 18 | Wide | Eye level | 35mm | slow push-in | the bottle on still water in infinite black; caustics on the floor | 6 | 8, trim |
| 5 | 18 to 22 | Medium close-up | Low | 100mm | slow 45-degree orbit | the rim light slides across the cap | 4 | 4 |
| 6 | 22 to 30 | Medium wide | Eye level | 50mm | locked-off | the pack shot: one drop, one ring, the bottle holds; empty field above | 8 | 8 |

### 60 s: a launch film in chapters

| # | Time | Size | Angle | Lens feel | Move | Action | Cut | Generate |
|---|---|---|---|---|---|---|---|---|
| 1 | 0 to 4 | Extreme close-up | Top-down | macro | locked-off | amber liquid swirls in darkness, lit from behind | 4 | 4 |
| 2 | 4 to 8 | Extreme close-up | Low | macro | macro slide | light draws the glass edge out of black | 4 | 4 |
| 3 | 8 to 12 | Medium | Eye level | 85mm | locked-off | amber liquid fills the empty bottle to two thirds | 4 | 4 |
| 4 | 12 to 18 | Medium | Eye level | 85mm | locked-off | the gold cap descends and seats with a click | 6 | 8, trim |
| 5 | 18 to 22 | Extreme close-up | Low | macro | macro slide | the bevel, light running along it | 4 | 4 |
| 6 | 22 to 28 | Close-up | 45 degrees | 100mm | rack focus | from the cap's brushed grain to the liquid's glow | 6 | 8, trim |
| 7 | 28 to 32 | Extreme close-up | Eye level | macro | locked-off | one bubble rises through the liquid | 4 | 4 |
| 8 | 32 to 38 | Wide | Eye level | 35mm | slow push-in | the bottle on still water in infinite black, caustics on the floor | 6 | 8, trim |
| 9 | 38 to 42 | Medium close-up | Low | 100mm | locked-off | a drop lands beside it; one ring spreads | 4 | 4 |
| 10 | 42 to 46 | Medium | Low | 85mm | slow 45-degree orbit | the rim light slides across the cap | 4 | 4 |
| 11 | 46 to 52 | Medium | Eye level | 85mm | locked-off camera | the turntable turns the bottle a quarter turn | 6 | 8, trim |
| 12 | 52 to 60 | Medium wide | Eye level | 50mm | locked-off | the pack shot, the empty field above; holds | 8 | 8 |

Seven 4 s clips and five 8 s clips on Veo 3.1 Fast: 238 credits.

### Spins and orbits

| The user wants | Do |
|---|---|
| "show it from every side" | four short clips at front, three-quarter, side and back, each a 30 to 45 degree orbit, cut on the beat |
| a continuous half turn | two quarter orbits: scene 2 starts from scene 1's last frame (`get_scene_frame` last, set as scene 2's image url); one hop only |
| a full 360 in one shot | say it drifts beyond about 90 degrees per clip; offer the four-angle cut |
| the product turning, camera still | "the turntable turns the bottle a quarter turn; the camera stays locked" |

### Exploded views and assemblies

Three to five parts, evenly spaced on one axis, each part named with its
material and colour, the order of assembly stated, the final locked state
named. More than five parts intersect and multiply.

## 3. Hook and payoff

- Hook (0 to 2 s): the product forming or emerging (parts flying together,
  liquid shaping, light drawing its edge out of darkness), or the one
  material detail that only this product has.
- Payoff: the pack shot holds still, the last motion settling, the empty
  field ready for the logo.

## 4. Camera, light, colour

- Camera: motion-control precision. Slow eased orbits of 45 to 90 degrees,
  slow push-ins, macro slides of a few centimetres, top-down spins, a crane
  over the cap. One move per clip; the pack shot locked-off.
- Light rigs ([motion-principles.md](motion-principles.md) section 5):
  overhead softbox plus two strip lights for glossy products, backlight and
  edge strips for glass, large soft sources for brushed metal, a hard light
  through glass for caustics; black flags to keep the sides dark.
- Backgrounds: "seamless white cyclorama, the floor curving up into the wall
  with no horizon line", "infinite black", "smooth gradient from charcoal to
  black", "a shallow film of still water on black", a paper sweep in the
  brand colour.
- Colour: the product's own colours plus one background colour; 3 to 4
  palette words.
- Exact phrases: "Clean CGI product render, physically based materials,
  soft studio lighting", "ray-traced reflections of the softboxes",
  "caustic light patterns on the floor", "the bottle keeps its exact shape,
  cap and proportions".

## 5. Sound

- Native: one designed sound per motion (a magnetic click, a glass chime, a
  servo whirr, a drop). SFX-led clips `native` at 1.
- Narration: short and plain: 15 s about 20 to 25 words, 30 s about 50,
  60 s about 100, at 2.0 to 2.3 words per second; one benefit per line.
- Score brief: "Minimal electronic at about 100 BPM: a soft pulse and glassy
  pads, building one layer per feature, silence for half a bar before the
  pack shot, then one low hit and a held pad."
- Mix: SFX clips `native`; narrated clips `mix` at 0.4; score 0.3 to 0.35
  with `ducking: true`; a music-led cut sets clips `mix` at 0.5 and the
  score at 0.7.

## 6. Model picks and credits

| Pick | Model | 15 s (4+4+7) | 30 s (6 shots) | Why |
|---|---|---|---|---|
| Best quality | Veo 3.1 | 188 | 376 | 1080p, native designed sound, careful motion |
| Recommended | Veo 3.1 Fast | 56 | 112 | the same grammar and sound, 1080p |
| Value | Seedance 1.5 Pro | 56 (blocks 1+1+2, 4 s minimum) | 112 (8 blocks) | 1080p, 4 refs: packshot, label close-up, plate, set |
| Draft | Seedance 2.0 Mini | 36 | 72 | 4 refs, sound, 720p |

Opening images: none for scenes that start on the user's packshot.

## 7. Prompt pairs (Veo dialect)

Pair 1: the drop (the 6 s hero move)

Still-frame prompt:

```text
Clean CGI product render, physically based materials, soft studio lighting. The bottle: a square clear glass perfume bottle with thick bevelled walls, a heavy brushed-gold cube cap, amber liquid two thirds full, a blank front face. It stands in a shallow film of still water on a black floor, infinite black behind. Medium close-up, low angle, 100mm, shallow focus. One overhead softbox, a thin rim light from behind left, caustics on the floor. Palette: black, gold, amber. No text, no logo.
```

Motion prompt:

```text
Clean CGI product render, one continuous take. 0 to 2 s: a single drop falls from above and lands in the water beside the bottle. 2 to 6 s: one ring spreads outward past the base; the caustics on the floor ripple and settle. Camera: slow orbit 45 degrees to the right, easing in and out, stopping on the three-quarter view. End state: the bottle at three-quarter, the water flat again. The bottle keeps its exact shape, cap and proportions; the floor and the light stay as in the opening frame. Exactly one bottle and one drop. SFX: one clear water drop, a soft low tone. Ambient noise: a silent studio. No music. Clean frame: no text, no on-screen graphics.
```

Pair 2: the assembly (an exploded view)

Still-frame prompt:

```text
Clean CGI product render, physically based materials, soft studio lighting. A white running shoe split into exactly four floating layers stacked with even gaps: a grey rubber outsole at the bottom, a white foam midsole, a white knit mesh upper, white flat laces on top. Seamless light grey cyclorama, no horizon line. Medium shot, eye level, 50mm. One large overhead softbox, soft floor shadow. Palette: white, light grey, graphite. No text, no letters, no logo.
```

Motion prompt:

```text
Clean CGI product render, one continuous take. 0 to 1 s: the four layers hang still. 1 to 4 s: from the bottom up, one after another, each layer eases into the one below with a small settle, and they lock into one complete shoe. 4 to 6 s: the camera orbits 45 degrees to the right at an even pace and stops. End state: one complete shoe at three-quarter view. Exactly one shoe made of exactly four parts, no extra parts. The cyclorama and the light stay as in the opening frame. SFX: four soft mechanical clicks, one as each layer joins. No music. Clean frame: no text, no on-screen graphics.
```

With the user's packshot: set it as the scene's image url, drop the object
description from the motion prompt, keep the lock sentence, and wire a
second angle as reference 1 ("Reference 1 is the bottle's side profile
only; ignore its background").

Second family (Seedance 1.5 Pro), pair 1 in 30 to 100 words: "The square
glass perfume bottle with the gold cube cap stands in still water on black;
a single drop is already falling from the first frame, lands beside it, and
one ring spreads and settles. Slow 45-degree orbit to the right, eased.
Caustics ripple on the floor. The bottle keeps its exact shape. Sound: one
water drop, a low tone. Clean frame: no text, no on-screen graphics."

## 8. Failure modes and fixes

| Failure | Fix |
|---|---|
| The product changes shape or grows buttons | start from the real packshot; lock sentence; orbit 45 degrees, not 180 |
| The label or logo warps | label small or turned away; blank front face in a generated still; the user composites the real label |
| A second product appears in a reflection | "exactly one bottle"; name the reflection: "a faint reflection in the water, nothing else" |
| Exploded parts multiply or intersect | 3 to 5 parts, even gaps, assembly order stated |
| Plastic look on glass or metal | name the light rig and what the surface reflects |
| Liquid behaves like jelly | one drop or one pour, slow, end state named |
| The orbit drifts and the background swims | shorter orbit, even pace, a plain background |
| Close-up turns soft | a close-up is its own clip; never push past about 1.5 times the start framing |

## 9. Policy guards

- Feature callouts, prices and claims are added by the user in their editor
  and must be true; never show the product doing what it cannot do.
- A render of a product that does not exist yet is a concept: the user says
  so where it is shown.
- No other brand's product, logo or packaging in the frame.
