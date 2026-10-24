# The style bible: locking an animation style across shots

Animation forgives many things a live-action film cannot, but not a style
that changes between shots. A hippo drawn in watercolour in scene 1 and in
glossy 3D in scene 3 reads as two films. The style bible is written once,
shown to the user with the intent card, and pasted into prompts word for
word.

## 1. What the bible holds

| Field | What to write | Example (watercolour fable: Nilo, a young river hippo; the user's film replaces it) |
|---|---|---|
| Style line | One line, first in every prompt | Watercolour storybook animation, wet-edged washes, visible cold-press paper grain, soft pencil underdrawing |
| Shape language | The dominant shapes and what they mean | Round, soft shapes for friends; tall thin reeds; no sharp angles near the hero |
| Proportion | Head to body, eye size, limb thickness | Head as wide as the body, eyes a third of the face height |
| Line | Weight, colour, presence, where it breaks | Thin warm-grey pencil line, broken and loose, absent inside large washes |
| Surface and material | How every surface reads | Paint pools darker at wash edges; the paper's white is the highlight |
| Palette | 3 to 5 named colours, hex kept for the human | reed gold (#C9A54A), cream (#F3E7CF), lavender (#B9A7D6), river green (#5E7F6A), warm pink (#E3A6A0) |
| Value structure | Where the lights and darks sit | Mid-light overall; darks only in the deep water and the night sky |
| Light rule | Source, direction, softness, colour, per time of day | Dusk: low warm sun from the left, soft; night: the moon on the water is the only bright source, the sky lavender |
| Motion feel | Smooth or stepped, holds, speed | Slow and gentle, held poses of 1 to 2 s, nothing faster than a slow wade |
| Camera grammar | Which moves belong to the style | Locked-off and slow pans like turning a page; no handheld, no orbit |
| Texture rule | What stays fixed while things move | The paper grain stays fixed to the frame; only the paint of moving things moves |
| Forbidden list | The looks the model drifts into, as positive replacements | flat matte paint only (never glossy 3D), soft washes (never hard cel shadows), paper white highlights (never lens flare) |
| Style plate | The one frame that defines the look | the reed-lined river bank at dusk, the water still, no character |

The forbidden list is the most valuable field. It names what this model
tends to slide into for this style and says the replacement positively.

## 2. The style plate

One image that shows the look, not the story: palette, line, material,
light and a typical background, with the hero absent or small, so the
model takes the look and not the content.

Where it comes from, best first:

1. The user's own art or a frame they own: in the Asset Library, found with
   `list_assets` (`type` image); or given as a public URL, then
   `import_asset` with `kind: "image"`.
2. A plate the user makes in the Lavendly app, where image nodes can take
   reference images (image-to-image is a canvas feature).
3. Scene 1's opening image, approved by the user before any other scene is
   paid for.

How it rides on Lavendly:

| Layer | What carries the style on the MCP path |
|---|---|
| Opening images (one per scene) | The words only: the style line, the palette and the light line verbatim. References do not reach opening images on the MCP path. |
| Clips | The opening image as first frame (it dominates), the style plate wired as a reference within the model's cap, the style line first in the motion prompt, the reference role sentence |
| The whole film | A Film Bible style, only if the user set one in the app; the MCP cannot write it |

Because the opening images are drawn from words, the style line must be
exactly the same in every still, and the palette and light lines too. When
the style must hold exactly (a series, a mascot, a client's look), make the
opening stills on the canvas from the plate, or use the user's art, and set
each scene's image url with `update_workflow` before generating.

Role sentence for the plate:

```text
Reference 2 is the style plate: match its palette, paper grain and line weight only, not its content.
```

## 3. Light rules by style

| Style | Light that keeps the look | Light that breaks it |
|---|---|---|
| 3D feature look | Warm key with cool fill, a rim to separate the character, soft bounce from the ground colour, subsurface glow through ears and leaves | flat front light, hard black shadows, neon colour casts without a source |
| Anime | Hard-edged two-tone shadow shapes, a strong rim glint on hair, sky-coloured fill, backlit sunsets with a lens-flare streak only when the plan wants it | soft gradient shading over skin, realistic skin specular |
| 2D cartoon | Flat even light, one hard shadow tone or none, colour changes for time of day | rendered gradients, volumetric beams |
| Claymation and felt | Small practical lamps in the set, warm key, small hard shadows, a slight exposure flicker between frames | huge soft studio light that flattens the fingerprints, glossy specular |
| Paper cutout | One soft directional light raking across the layers so each casts a small shadow on the one below | light that flattens the layers into one sheet |
| Watercolour, gouache | Light painted into the washes: warm and cool areas, the paper white as the brightest point | specular highlights, bloom, lens flare |

## 4. Motion feel by style

The render normalises every clip to 30 frames per second, and there is no
frame-rate or step control on Lavendly. A stepped feel has to be generated:
the prompt asks for it, and it survives the export as held frames with a
slightly uneven cadence.

| Style | Motion words that work |
|---|---|
| 3D feature look | "smooth, eased motion with anticipation before each move and a soft settle after it" |
| Anime | "limited animation on twos, held poses, hair and cloth moving in the wind while the face holds still" |
| 2D cartoon | "snappy cartoon timing, a quick anticipation, a fast move, a held pose" |
| Claymation, felt | "stop-motion at 12 frames per second, crisp frames with no motion blur, slight frame-to-frame jitter" |
| Paper cutout | "stepped cut-out animation, pieces slide and rotate on hinged joints, about 8 frames per second" |
| Watercolour, gouache | "slow, gentle motion, long holds; the paper texture stays fixed while the paint moves" |

## 5. Style test before the film (optional, paid)

When the user cannot choose between two or three looks, generate the first
scene once per candidate style line on a draft model (Seedance 2.0 Mini, a
4 s clip at 9 credits plus its opening image), show the frames side by side,
and let the user pick by eye. Announce the total first. Then write the
chosen line into the bible and never change it.

## 6. Drift checks and fixes

After every scene lands, open its first and mid frames next to the plate.

| Drift | Fix |
|---|---|
| The opening image already left the style (3D shading on a watercolour film) | Rewrite that still with the style line verbatim and the forbidden-list words, clear its image url with `update_workflow`, regenerate that scene |
| The clip slides from 2D into 3D during motion | Add "flat 2D colour, the drawing stays flat" to the lock sentence; shorten the clip; wire the plate if a slot is free |
| Texture crawls or boils across the frame | Add the texture rule ("the paper grain stays fixed to the frame") and lower the motion amount |
| Palette warms or greens over several scenes | Chained frames drift after 2 to 3 hops: start the next scene from a fresh still written from the bible, not from the last frame |
| Line weight changes between scenes | Repeat the line words exactly; wire the plate; keep the camera distance similar so line scale stays alike |
| Stop-motion turned smooth | Put the motion-feel line second in the prompt, add "crisp frames with no motion blur" |

## 7. Example bible (the worked example above), ready to paste

```text
Style line: Watercolour storybook animation, wet-edged washes, visible cold-press paper grain, soft pencil underdrawing.
Palette: reed gold, cream, lavender, river green, warm pink.
Light, dusk scenes: low warm sun from the left, soft, long lavender shadows.
Light, night scenes: the moon on the water is the only bright light, the sky deep lavender.
Motion feel: slow, gentle motion, long holds; the paper texture stays fixed while the paint moves.
Camera: locked-off or a slow pan; never handheld, never an orbit.
Forbidden, written positively: flat matte paint only, soft washes, the paper white as the highlight.
```
