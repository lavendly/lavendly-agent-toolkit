# Prompt anchors: ads

The product block, the two prompts per shot in each model family's
dialect, the sentences that lock a product, the banned words, and the
vocabulary of materials, macro and product light. Prompts are in English.
Never write the model name, the clip length or the aspect in a prompt.

## 1. The product block

Written once, observable only, pasted verbatim into every still-frame
prompt. Never the brand name, never label words: models try to letter them.

```text
<the thing>: <shape and proportions>, <material and finish>, <colour>, <size cue>, <one distinguishing mark>.
```

```text
The serum bottle: a slim 30 ml amber glass bottle with rounded shoulders, a black rubber dropper bulb on a matte black collar, a plain cream label on the front, about the height of a hand.
```

```text
The headphones: matte black over-ear headphones, oval ear cups with soft protein-leather cushions, a slim brushed-steel headband slider, a single small grey button on the right cup.
```

```text
The sneaker: a low-top white leather running shoe, gum rubber outsole, three rows of perforations on the toe box, a pale grey suede heel tab.
```

```text
The watch: a round 38 mm steel watch, brushed case with a polished bezel, a plain cream dial with thin baton hands and no numerals, a brown suede strap.
```

A word changed is a different object. A label is "a plain cream label" in
words, whatever the real packshot says; the real label only exists in
frames that open on the packshot.

## 2. The still-frame prompt (opening image)

The opening image is made from text alone, at the film's shape, with the
first 500 characters kept. Subject first. A photograph of the start state:
no action, no camera move, never the payoff.

```text
<style line>. <product block>. <where it sits and what it rests on>. <camera: size, height, angle, lens feel>. <light: source, direction, softness, colour>. <materials that must read>. <background and depth>. <negative space for the end card, if any>. No text, no logo, no on-screen graphics.
```

Style lines that work (one per film, identical in every prompt): "Premium
product commercial still", "Clean studio product photograph", "Natural-light
lifestyle photograph", "Vertical phone photo, natural light" (UGC).

## 3. The motion prompt (the clip)

The clip animates its own opening image. Describe the change: what moves,
how, when, where it ends, plus one lock sentence, the exact count, the
sound and the clean frame. Do not describe the picture again.

### Veo 3.1, Fast, Lite

Plain sentences in the order camera, action, end, lock, audio. Sound on
labelled lines. Dialogue as `She says: <line>. (no subtitles)`.

```text
Locked-off camera, macro distance. 0 to 1 s: the drop is already falling from the dropper tip. 1 to 3 s: it lands on the stone and spreads into a glossy bead that stops moving. The bottle, the stone and the backlight stay exactly as in the opening frame. Exactly one drop, exactly one bottle. SFX: a single soft drip. Ambient noise: quiet studio room tone. No music. Clean frame, no text, no logo.
```

### Seedance 2.0, 2.0 Fast, 2.0 Mini, 2.5, 1.5 Pro

30 to 100 words, subject first; for timed shots a short production note.
Seedance puts most motion in the first two seconds: ask for the action
"already in motion from the first frame". References are named by number
with one job and an exclusion.

```text
The serum bottle on wet white stone, already in motion from the first frame. TIMELINE: 0 to 2 s, a single drop falls from the dropper tip and lands; 2 to 5 s, the drop spreads into a bead and settles. CAMERA: locked-off macro, no movement. CONTINUITY: reference 1 is the bottle's shape, glass, collar and label layout only; ignore its background and light. Exactly one bottle, one drop. AUDIO: one soft drip, faint room tone, no music. ENDING STATE: the bead still, the bottle unchanged.
```

### Kling v3 Standard, Pro, Video O1

Scene, subject, action, camera, audio, in plain readable language; plain
directional verbs (push in, pull back, pan left, tilt up). Treat the opening
frame as the anchor and say how the scene evolves from it.

```text
From the opening frame, the headphones rest on the concrete plinth. The camera pushes in slowly toward the right ear cup over the whole shot. The two strip-light reflections slide smoothly across the cup as the angle changes. The headphones keep their exact shape, finish and button. Exactly one pair of headphones, nobody in frame. Sound: a low soft whoosh at the start, then a quiet studio. Clean frame, no text.
```

### Wan 2.6, 2.7, 3.0

Image to video: motion description plus camera movement, then the
aesthetic control words Wan maps literally (light source, light type, time
of day, shot size, lens, colour tone).

```text
The armchair stays still while afternoon sunlight slides slowly across the boucle seat and the oak legs. Camera: slow push in, medium shot, medium lens. Soft side light, warm colour tone, low contrast. The chair keeps its exact shape and fabric. Exactly one chair, nobody in frame. Sound: quiet room tone, a distant bird. Clean frame, no text.
```

### Hailuo 2.3, 3, 3 Max

Prose with the model's own camera commands placed right after the action
they belong to; one command per beat, at most three inside one bracket.
Hailuo 2.3 and 3 Max make no sound; write none.

```text
The watch lies on black velvet, sparkles moving across the polished bezel as a hidden turntable turns it by sixty degrees [Static shot]. The watch keeps its exact case, dial and strap. Exactly one watch. Clean frame, no text.
```

### Runway Gen-4.5

Motion only, simple, the subject in general terms ("the bottle", "the
woman"), positive phrasing. No sound.

```text
The camera slowly pushes in. The bottle stays still while the backlight brightens behind it. The bottle keeps its exact shape and label.
```

### Grok Imagine

The first sentence reads like a still (subject, set, light, framing), the
motion second. Treat it as silent unless the user hears sound in a test.

## 4. Lock, count and role sentences

| Job | Sentence |
|---|---|
| Lock the product | "The bottle's shape, cap and label stay exactly as in the opening frame." |
| Lock product and set | "The headphones, the plinth and the strip-light reflections stay exactly as in the opening frame; only the camera moves." |
| Rigid object | "A rigid glass bottle with a fixed black cap, a solid unchanging form." |
| Count | "Exactly one bottle, nobody else in frame." / "Exactly one hand enters; nothing else enters." |
| Reflection bounded | "A faint reflection of the bottle in the wet stone, nothing else." |
| Reference role | "Reference 1 is the sneaker's shape, materials and colours only; ignore its background, pose and light." |
| Second reference | "Reference 2 is the model's face and hair only; ignore her clothes and background." |
| Label kept away | "The label faces away from the camera." / "The label is a plain cream panel." |
| Screen kept blank | "The phone screen shows a plain dark glass surface, switched off." |
| Clean frame | "Clean frame, no text, no logo, no on-screen graphics, no timestamps." |

Reference priority when slots are short: the product first, then the face,
then a style plate, then a location. Never one image as both the first
frame and a loose style reference.

## 5. Banned words in prompts

| Banned | Write instead |
|---|---|
| cinematic, filmic | the move and the lens: "slow push-in, 85mm portrait lens, shallow focus" |
| stunning, breathtaking, gorgeous, beautiful, amazing, epic, insane, mind-blowing | the thing: "honey-gold light through the amber glass" |
| masterpiece, award-winning, trending | delete |
| 8k, 4k as praise, ultra realistic, hyperrealistic, highly detailed, photorealistic | the texture: "fine pores, brushed steel grain" |
| dynamic, energetic, dramatic | the motion and its speed: "the cap snaps off in one fast twist" |
| vibrant as filler | the colours: "saturated tomato red against charcoal" |
| luxury, premium as adjectives inside prompts | the cues: "black velvet, one hard point light, slow quarter turn" |

The style line "Premium product commercial still" is a format label, kept
identical across a film; it is the only place "premium" appears.

## 6. Materials: words that make them read

| Material | Words | Light that shows it |
|---|---|---|
| Clear glass | "clear glass with thick rounded walls, a bright edge line along each side" | backlight or two strip lights at the sides on black |
| Amber or tinted glass | "amber glass glowing honey-gold where the light passes through" | backlight behind the bottle |
| Frosted glass | "frosted glass with a soft milky glow" | broad soft light from behind and above |
| Brushed metal | "brushed aluminium with fine parallel grain" | one long soft strip at a low angle |
| Polished metal, chrome | "mirror-polished steel holding a long clean gradient" | large soft panel reflected, dark surroundings |
| Gold | "warm yellow gold with soft gradient reflections" | diffused panel above, small hard points for sparkle |
| Matte plastic | "matte soft-touch plastic, no shine" | broad soft key, gentle falloff |
| Gloss plastic or lacquer | "high-gloss lacquer holding one long highlight" | a single strip softbox |
| Leather | "full-grain leather with visible pores and a soft sheen" | raking side light |
| Suede, nubuck | "suede with a soft napped surface" | low raking light |
| Knit, wool | "chunky wool knit, individual loops visible" | soft side light |
| Denim | "indigo denim twill, diagonal weave visible" | soft side light |
| Silk, satin | "liquid satin sheen sliding over the folds" | soft top light |
| Ceramic | "glazed white ceramic with a soft highlight" | window light |
| Wood | "oiled oak with open grain" | warm side light |
| Cream, lotion | "thick white cream holding a soft peak" | soft top light, small catchlight |
| Gel, serum | "clear gel holding a round bead with a bright catchlight" | backlight |
| Powder | "fine powder pressed into a smooth disc, a few loose grains" | soft raking light |
| Skin | "natural skin texture, fine pores, a few freckles, soft sheen on the cheekbone" | clamshell or window light |
| Condensation | "fine beads of condensation on cold glass, a few running down" | side backlight |

## 7. Macro language

- "Macro shot, 100mm macro lens, focus plane only millimetres deep."
- "Extreme close-up of the dropper tip, the bead filling a third of the frame."
- "Slow focus pull from the cap's edge to the label panel."
- "Macro slide along the watch bracelet, links passing slowly through focus."
- Keep macro moves tiny: "the camera slides two centimetres to the right".
- A macro of a label shows the real label only when the scene opens on the
  packshot; otherwise keep the label out of focus or out of frame.

## 8. Product light

| Setup | Phrase |
|---|---|
| Clean white sweep | "seamless white background, broad soft light from above, a soft contact shadow" |
| Dark field for glass | "black background, two tall strip lights at the sides drawing bright edge lines on the glass" |
| Bright field for glass | "evenly lit white panel behind the glass, crisp dark outlines" |
| Gloss gradient | "one large softbox reflected as a long clean gradient across the surface" |
| Rim on chamfers | "a thin cool rim light tracing the chamfered edges" |
| Backlit liquid | "backlight through the liquid, the colour glowing from inside" |
| Sparkle | "several small hard point lights creating moving sparkles in the facets" |
| Caustics | "light through the glass throwing soft caustic patterns on the surface below" |
| Low key | "low-key studio, most of the frame in shadow, one controlled source" |
| Window lifestyle | "soft window light from the left, gentle falloff into the room" |
| Golden hour | "low warm sun from behind, long soft shadows, a warm rim on the product" |

Name one source per scene and keep its direction in every shot of that
scene. Colour temperature in words: "warm tungsten", "neutral daylight",
"cool blue dusk".

## 9. Motion amplitude

Small words prevent warping: "very slowly", "a quarter turn", "about thirty
degrees", "a few centimetres", "over the whole shot", "the camera settles
and holds for the last second". Fast camera plus fast subject is the first
cause of melted products in every model.

## 10. Narration lines

Ceiling `floor(seconds x 2.5)` words, written to about 2.3 per second.
Present tense, one benefit per sentence, the product named as people say
it, numbers spelled out. Never "introducing", "in this video", "imagine",
"game-changer", "revolutionary".

| Scene length | Words |
|---|---|
| 2 s | 4 to 5 |
| 3 s | 6 to 7 |
| 4 s | 8 to 10 |
| 6 s bumper | 12 to 15 |
| 15 s ad | 30 to 34 |
| 30 s ad | 62 to 70 |
| 60 s ad | 125 to 140 |
