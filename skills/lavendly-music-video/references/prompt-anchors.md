# Prompt anchors: music video

The two prompts every shot needs, the silent motion line, each model's
dialect, the looks per section, and the music video vocabulary for light,
camera and texture. No prompt contains a banned word.

## 1. The still-frame prompt (the opening image)

Made from text alone on the server, cut at 500 characters. Keep it under
450, subject first, the first moment of the shot.

```text
<section look line>. <shot size, angle, lens feel>. <artist or character locked description, verbatim>. <pose at the start, where in frame>. <place with two or three named props>. <light: source, colour, direction, haze>. Palette: <three to five colours>. <texture, if the section has one>. No text, no letters, no logos.
```

## 2. The motion prompt (silent)

```text
<section look line>, one continuous take. <camera: the one move, its speed, where it stops>. <0 to N s: the action, already in motion from the first frame>. <N to M s: the rest>. <end state>. <lock sentence>. <count line>. Silent, no music generated. Clean frame: no text, no letters, no logos.
```

- Lock sentence: "Her face, her silver jacket, the corridor and the neon tubes
  stay exactly as in the opening frame."
- Count line: "Exactly one person in frame, nobody else." For a band:
  "Exactly four musicians: the singer centre, the guitarist left, the
  bassist right, the drummer behind; nobody else."
- Moving to the music without hearing it: "she sways slowly, about one sway
  every two seconds" (at 120 BPM, one sway per bar). Write the rate as a
  count per second, never a BPM the model cannot hear. Treat sync as a cut
  decision, not a performance one.

## 3. Model dialects

Never write the model name, the duration or the aspect in a prompt.

| Family | Order | Notes for music video |
|---|---|---|
| Seedance 2.0, Fast, Mini, 2.5 | Subject first, 30 to 100 words | Motion arrives in the first two seconds: "already in motion from the first frame". References by role in prose: "Reference 1 is the singer's face and jacket only; ignore its background and pose" |
| Kling v3 | Scene, character, action, camera, style | Strongest human and dance motion; plain directional camera verbs; one move |
| Veo 3.1, Fast, Lite | Camera, subject, action, context, style | Bracketed time ranges hold up to four cuts in 8 s: a burst in one clip |
| Wan 2.7, 3.0 | Subject, scene, motion, then literal aesthetic words | Image-to-video: motion description plus camera movement; good with style plates |
| FLUX 3 Video | Camera, subject, action, context, style | Art-directed, stylised looks; 5 s minimum |
| Hailuo 3 Max | Prose plus bracket commands after the action | Silent; `[Push in]`, `[Pan left]`, `[Static shot]`, `[Tracking shot]` |
| Runway Gen-4.5 | Motion only, simple | Silent; 16:9 and 9:16 only |
| Grok Imagine | A still description first, then the motion | Any length 1 to 15 s |

## 4. Looks per section

One look line per section, pasted into every prompt of that section. The
artist's description stays the same across sections; the place, the light
and the palette change on purpose.

| Section | Look line example |
|---|---|
| Intro | Music video frame, blue dusk, one cold street lamp, haze, 16mm grain |
| Verse | Music video frame, small bedroom at night, one warm bedside lamp, Super 8 texture |
| Pre-chorus | Music video frame, the same bedroom, a red light starting to pulse from outside the window |
| Chorus | Music video frame, white tiled corridor, magenta neon tube on the left wall, cyan on the right, light haze |
| Bridge | Music video frame, black void, one hard white spotlight from above |
| Final chorus | Music video frame, the tiled corridor, strobing magenta and cyan, dense haze |
| Outro | Music video frame, blue dusk again, the street lamp, no haze |

## 5. Light for music video

| Light | Write | Use |
|---|---|---|
| Coloured gels | "one magenta light from the left, one cyan light from the right, the face split between them" | Pop, electronic |
| Hard backlight in haze | "a hard white light behind her, beams cutting through thick haze, her silhouette sharp" | Drops, entrances |
| Strobe | "the light flashes on and off twice a second" | Drops, burst pieces only |
| Neon practicals | "unlettered neon tubes in magenta and cyan on the wall" | Night, synth-pop |
| Single spotlight | "one hard spotlight from directly above, everything else black" | Ballads, bridges |
| Golden hour | "low gold sun behind him, long shadows, warm rim on the hair" | Folk, indie, narrative |
| Practical lamps | "a string of warm bulbs across the room, round bokeh" | Live session, intimate |
| Car light at night | "passing street lamps sweep across her face every second" | Driving songs |

## 6. Camera vocabulary

| Move | Write | Fits |
|---|---|---|
| Orbit | "slow orbit from left to right around the singer at chest height, a quarter turn" | Chorus performance |
| Gimbal glide | "smooth gimbal glide forward through the doorway toward her" | Pop, transitions into a section |
| Handheld energy | "handheld camera close to him, small natural shakes" | Rock, punk, live |
| Fisheye | "fisheye lens close to the lens, the room curving at the edges" | Hip-hop, skate, 1990s looks |
| Locked symmetry | "locked-off camera, perfectly symmetrical centred composition" | Art pop, choreography |
| Crane | "crane rising from the stage floor to high above the band" | Final chorus, outro |
| Push-in | "slow push-in from medium to close-up over the whole shot" | Verses, the key line |
| Whip pan | only inside a bracketed burst, one per fragment | Drops |

One move per shot; adjacent shots never repeat a move; the payoff is static.

## 7. Texture and format

| Write | Reads as |
|---|---|
| Super 8 film texture, light leaks, gate weave | Nostalgia, memory verses |
| consumer camcorder, soft focus, slight colour bleed (no timestamp) | Lo-fi, 1990s |
| 16mm film, visible grain | Indie, folk |
| fine 35mm grain, soft highlight roll-off | Polished narrative |
| clean digital, crisp, deep blacks | Electronic, pop chorus |

## 8. Instruments that survive generation

- Count the strings and the parts: "a six-string acoustic guitar with a
  straight neck", "an upright piano with its lid closed".
- Keep fretting and fingering hands out of close-ups; hands on instruments
  read best in medium shots, partly out of focus, or from behind.
- Drums: "the drummer from behind, sticks a blur of motion".
- No brand names or logos on instruments, amps or headphones.

## 9. Banned words

| Banned | Write instead |
|---|---|
| cinematic, filmic | the lens and the move: "24mm, slow orbit, haze" |
| stunning, breathtaking, gorgeous, beautiful, amazing, epic | the thing: "magenta light cutting through the haze" |
| masterpiece, award-winning, trending | delete |
| 8k, 4k, ultra realistic, hyperrealistic, photorealistic, highly detailed | the texture: "sequins catching the light, sweat on the temple" |
| dynamic, energetic, dramatic, vibrant | the motion and the light: "she spins once, the strobe flashes twice" |
| vibe, mood, aesthetic | the palette: "magenta, cyan, black" |
| insane, mind-blowing | delete |
