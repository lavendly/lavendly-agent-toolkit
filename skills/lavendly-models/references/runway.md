# Runway Gen-4.5

An image-led model: it animates an approved still with short, simple,
positive motion prompts. Silent, 720p, two shapes.

## Lavendly specs

| | Runway Gen-4.5 |
|---|---|
| id | runway/gen-4.5 |
| Seconds | 2 to 10 |
| Resolution | 720p only |
| Aspects | 16:9, 9:16 |
| First frame / last frame | yes / no |
| References | 2 |
| Sound | no |
| Credits per 5 s block | 14 |
| Clip at default (MCP) | 5 s 14, 10 s 28 |

Not on Lavendly: runway/aleph-2 (an editor, excluded as a non-generator).

## What the MCP path changes

- Silent: narration and score from `attach_track`, native audio off.
- 720p is the only resolution; on Creator plans and up the stitch scales it
  to 1080p.
- 2 s clips cost one block; write 5 or 10 when the cut allows.

## The dialect

Runway's guidance: Gen-4 "thrives on prompt simplicity".

- Prompt the motion only. Describing the image "can reduce motion or lead
  to inconsistencies". The opening image already holds the subject, the
  place and the look.
- Refer to subjects in general terms: "the woman", "the bottle", "the
  subject", never their full description.
- Positive phrasing only. Negative prompts are not supported: write "the
  camera remains still", never "no camera movement". A negative prompt sent
  in `generate_scene` options is likely ignored.
- Build in this order, adding only what the shot needs: subject motion,
  camera motion, scene motion, style descriptors.
- No conversational phrasing and no multiple scene changes in one prompt.
- A short camera label can lead: "Pan right: ...", "Slow motion: ...".

## Example 1: approved product still, 9:16, 5 s

Opening image: an approved still made in the app, or the user's photo, set
as the image node url. A text-only still-frame prompt for the same frame:

```text
Vertical product photo. A clear glass perfume bottle with a faceted body and a round brass cap stands on wet black stone, droplets on the stone around it. Camera low and close, the bottle in the centre, its top at the upper third. One narrow backlight from behind, a bright rim on the glass edges, the background black. Front label area blank. No text, no logo, no on-screen graphics.
```

Motion prompt:

```text
A fine mist drifts slowly upward behind the bottle and catches the backlight. The camera remains still. The bottle stays exactly the same.
```

## Example 2: portrait with subtle life, 16:9, 5 s

Still-frame prompt:

```text
Portrait photo by a window. A man in his sixties with a grey stubble beard and wire-rimmed glasses, a dark green knit sweater, sits in an armchair holding a cup of tea in both hands, looking out of the window. Medium close-up, eye level, shallow focus. Soft overcast window light from the left, the right side of his face in gentle shadow. A bookshelf out of focus behind. No text, no on-screen graphics.
```

Motion prompt:

```text
The man lifts the cup, takes a slow sip, lowers it, and keeps looking out of the window. Steam rises from the cup. Slow push-in. The man and the room stay exactly as in the opening frame.
```

## Failure modes and fixes

| Failure | Fix |
|---|---|
| Little or no motion | The prompt described the picture; cut it to the motion |
| The camera moves when asked not to | "The camera remains still", positive; keep the subject motion small |
| Drift from the reference | Text that contradicts the image (hair colour, wardrobe) causes drift; remove it |
| Several things change at once | One change per re-roll |

## When to pick

- An approved still that must move a little and stay itself: product
  hero shots, portraits, VFX-like scene motion (mist, water, particles).
- Silent shots under narration or a score, at 14 per block.
