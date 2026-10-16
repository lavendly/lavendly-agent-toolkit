# Prompt anchors: motion design

The two prompts every shot needs, the object block, layout language for
empty space, lock and count sentences, reference roles, model dialects, the
banned words and the narration budget.

## 1. The still-frame prompt (the opening image)

On the MCP path every opening image is drawn from this text alone, cut at
500 characters. Keep it under 500 with the look and the hero object first.
When the user has a real packshot, skip the generated still: set the photo
as the scene's image url, so the clip animates the real product.

```text
<look line>. <object block>. <where it sits and what holds it>. <background: cyc, gradient, field>. <layout: which part of the frame stays empty>. <camera: size, angle, lens feel, depth of field>. <light rig in words>. Palette: <3 to 5 named colours>. No text, no letters, no logo.
```

- A stable frame at the start of the move; never the payoff, never the
  aspect or the model name.
- Empty space is described as a thing, not as "room for a title" (the word
  "title" invites letters): "the left third is a plain charcoal field with
  nothing in it".

## 2. The motion prompt (the clip)

The clip animates its own opening image: describe the change.

```text
<look line>, one continuous take. <0 to N s: what moves, how, with what easing>. <N to M s: the rest>. Camera: <one move with its amount, speed and stop, or locked-off>. End state: <the final composition>. <lock sentence>. <count line>. <reference roles, when wired>. Sound: <what is heard>. Clean frame: no text, no on-screen graphics.
```

- One camera move per clip, with its amount ("orbits 45 degrees to the
  right") and its stop ("stops on the three-quarter view").
- Camera motion and object motion are separate: say which one moves ("the
  turntable turns the bottle a quarter turn; the camera stays locked").
- Easing in words ([motion-principles.md](motion-principles.md)).

### Lock sentences

```text
The bottle keeps its exact shape, cap and proportions; the backdrop and the light stay exactly as in the opening frame.
The architecture stays rigid and fixed; only the camera moves.
The empty right half stays a plain field with nothing in it.
```

### Count lines

```text
Exactly one bottle, nothing else on the floor.
Exactly four layers, evenly spaced, no extra parts.
The one sphere is the only object in the frame.
```

### Reference role sentences

```text
Reference 1 is the bottle's shape, glass thickness and cap only; ignore its background and lighting.
Reference 2 is the style plate: match its palette and light quality only, not its content.
```

Priority when slots are short: the product, then a second angle or the
material close-up, then the style plate, then the set. Never wire
references into a Veo 3.1 Lite (Auto) scene.

## 3. The object block

1 to 2 sentences, observable only, pasted verbatim into every still:

```text
<Object>: <shape and proportion>, <material and finish>, <colour>, <size cue>, <one distinguishing detail>.
```

```text
The bottle: a square clear glass perfume bottle with thick bevelled walls, a heavy brushed-gold cube cap, amber liquid two thirds full, a blank front face.
```

## 4. Look lines

One line, first in both prompts, identical across the piece.

| Look | Look line |
|---|---|
| Studio CGI product | Clean CGI product render, physically based materials, soft studio lighting |
| Soft clay render | Soft matte clay render, rounded bevels, gentle ambient occlusion, pastel studio light |
| Glass and light | CGI abstract of clear glass and refracted light, dark studio, precise edge highlights |
| Surreal still life | Surreal still-life film, calm and exact, long shadows, muted ochre and slate palette |
| Macro texture | Macro film of materials, razor-thin focus, tactile surfaces |
| Isometric diorama | Isometric diorama, a floating cut-out block of land, miniature scale |
| Satisfying macro | Macro process film, locked-off, one soft key light, clean neutral background |

## 5. Layout language for empty space

| Need | Write |
|---|---|
| Title on the left | "the left third is a plain charcoal field with nothing in it" |
| Logo at centre on the last hold | "the centre of the frame ends as an empty field of deep blue" |
| Lower band for captions | "the lower third is an empty floor with nothing on it" |
| Square-safe for every aspect | "the object sits in the centre square; the edges are plain background" |

## 6. Model dialects

Never write the model name, the duration or the aspect in the prompt.

| Family | How to write |
|---|---|
| Veo | Shot, subject, action, context, look, in that order. Sounds on labelled lines: "SFX: a glass chime." "Ambient noise: a quiet studio." Write "No music." when the score comes from the edit. Up to four timed beats of 2 s or more in one 8 s clip. |
| Seedance | 30 to 100 words, the object first, precise verbs. Motion lands in the first two seconds: "already turning from the first frame". Reference roles in sentences with what to ignore. No @-tags. |
| Kling | Scene, subject, action, camera, audio, style; plain directional verbs; the opening image is the anchor, say how it evolves. |
| Wan | Subject, scene, motion, then aesthetic control words (light source, light type, shot size, lens, colour tone), then the look; for a clip from its own opening image, motion and camera only. Literal words land well: "rim light", "low contrast", "tilt-shift", "time-lapse". |
| Hailuo | Prose plus a bracket camera command after the action: "[Static shot]", "[Push in]", "[Truck left]", at most three in one bracket. Its prompt rewriter is on and Lavendly cannot switch it off: keep prose plain. Silent. |
| Runway | Motion only, simple, the object in general terms; positive phrasing only. Silent. |
| FLUX 3, Grok | No published prompt guide: the Veo order in plain prose; Grok's first sentence reads like a still. |

## 7. Banned words in prompts

| Banned | Write instead |
|---|---|
| cinematic, filmic | the move and the lens feel: "slow 45-degree orbit, 100mm macro, shallow focus" |
| stunning, breathtaking, gorgeous, beautiful, amazing, epic, mind-blowing, insane | the material and the light: "caustics dancing on black stone" |
| masterpiece, award-winning, trending | delete |
| 8k, 4k, ultra realistic, hyperrealistic, photorealistic, highly detailed | delete; name the surface: "brushed aluminium, fine anisotropic streaks" |
| dynamic, energetic, dramatic | the motion and its easing: "snaps into place and settles with a small overshoot" |
| vibrant (as filler), vibe, aesthetic, sleek, premium (as filler) | the colours and the finish: "saturated cobalt on matte white" |
| renderer or software brand names, artist names | the look itself: "ray-traced reflections, soft global illumination" |

## 8. Narration budget

About 2.3 words per second of the shot it covers (calm 2.0; the server
ceiling is 2.5, and a longer line freezes the last frame).

| Shot | Calm (2.0) | Standard (2.3) | Ceiling (2.5) |
|---|---|---|---|
| 4 s | 8 | 9 | 10 |
| 5 s | 10 | 11 | 12 |
| 8 s | 16 | 18 | 20 |
| 10 s | 20 | 23 | 25 |

Numbers are spelled out in the narration ("forty percent"); check how the
caption shows them on the render.

## 9. The clean-frame line

Every motion prompt ends with it; every still ends with "No text, no
letters, no logo."

```text
Clean frame: no text, no on-screen graphics.
```
