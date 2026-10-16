# FLUX 3 Video (Black Forest Labs)

The app's copy for it is "Stylized, art-directed shots". Native sound, six
shapes, single takes up to 20 s. The dearest per block after Veo 3.1 and
Seedance 2.0.

## Lavendly specs

| | FLUX 3 Video |
|---|---|
| id | black-forest-labs/flux-3-video |
| Seconds | 5 to 20 |
| Resolutions | 720p 20, **1080p 34** credits per 5 s |
| Aspects | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 |
| First frame / last frame (provider) | yes / yes; Lavendly sends the first frame only |
| References | 2 |
| Sound | yes |
| Clip at default (MCP) | 5 s 34, 10 s 68, 15 s 102, 20 s 136 |

Not on Lavendly: black-forest-labs/flux-video-edit and
black-forest-labs/flux-video-upscale are editors and upscalers, excluded as
non-generators.

## What the MCP path changes

- Quoted at 1080p: 34 per block. A 15 s film of three 5 s clips is 102
  credits plus opening images.
- The last frame is not reachable, so a designed end composition is written
  as the end state.
- 21:9 exports inside the 9:16 frame size; keep films on 9:16, 16:9, 1:1,
  3:4 or 4:3.

## The dialect

No vendor video prompting guide was available at authoring time. Write it
as the shared order with the look decided first, because the look is why
you chose it:

1. The medium and style in concrete words (paper cutout with torn edges,
   gouache on cold-press paper, risograph print in two inks, matte clay).
2. Subject and its locked words.
3. The one action and the one camera move.
4. Light and palette as named colours.
5. Sound and the lock sentence.

Keep the style words identical in every prompt of the film; a synonym is a
new style.

## Example 1: paper-cutout fable, FLUX 3 Video, 16:9, 10 s

Still-frame prompt:

```text
Paper cutout animation still, layered coloured card with torn edges and soft drop shadows between layers. A small white goose with an orange beak stands at the edge of a dark blue paper pond under three layered pine trees. Wide shot, straight on, the goose small on the left third. Light from the upper right like a desk lamp over the paper set. Palette: navy, bottle green, cream, one orange accent. No text, no on-screen graphics.
```

Motion prompt:

```text
Paper cutout animation, layered card with torn edges. The goose waddles to the water in three stepped paper moves, steps in, and floats to the centre of the pond; paper ripples open around it in rings. Slow push-in that stops on a medium shot of the goose. The pines, the pond and the lamp light stay exactly as in the opening frame. Exactly one goose. Sound: paper rustle on each step, a soft splash, no music.
```

## Example 2: graphic product set, FLUX 3 Video, 9:16, 5 s

Still-frame prompt:

```text
Graphic studio set, flat colour blocks. A round glass bottle of amber hair oil with a black dropper cap stands on a terracotta cylinder plinth, a mustard arch behind it, a pale pink floor. Camera straight on at bottle height, the bottle centred in the lower half. Hard light from the left, a crisp long shadow to the right. Palette: terracotta, mustard, blush, black. Front label area blank. No text, no logo, no on-screen graphics.
```

Motion prompt:

```text
Graphic studio set, flat colour blocks. A single drop of amber oil falls from the dropper into frame and lands on the plinth beside the bottle, spreading into a small glossy disc. Locked-off camera. The bottle, the arch and the shadow stay exactly as in the opening frame. Exactly one bottle, one drop. Sound: a soft drip, quiet room tone, no music.
```

## Failure modes and fixes

| Failure | Fix |
|---|---|
| The style drifts toward a generic glossy look | The medium named first and identical in every prompt; materials named (card, gouache, clay) |
| The style changes between scenes | A synonym crept in; paste the style line verbatim |
| Price surprise | 34 per block at 1080p on the MCP path; route drafts elsewhere |

## When to pick

- Art-directed, stylised films where the look is the brief, with sound.
- One designed take of 15 to 20 s in a stylised world.
