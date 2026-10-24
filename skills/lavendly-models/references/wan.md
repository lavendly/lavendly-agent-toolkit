# Wan family (Alibaba)

Wan 2.6, Wan 2.7, Wan 3.0 and Wan 3.0 Prime. Native sound on all four,
literal category words that the model reads reliably, stylised looks
(claymation, felt, watercolour), and single takes up to 30 s on 3.0.

## Lavendly specs

| Model | id | Seconds | Resolutions (default bold) | Aspects | Refs | Credits per 5 s | Clip at default |
|---|---|---|---|---|---|---|---|
| Wan 2.6 | alibaba/wan-2.6 | 5, 10 | 720p 12, **1080p 18** | 16:9, 9:16 | 4 | 18 | 5 s 18, 10 s 36 |
| Wan 2.7 | alibaba/wan-2.7 | 2 to 10 | 720p 12, **1080p 12** | 16:9, 9:16, 1:1, 4:3, 3:4 | 4 | 12 | 5 s 12, 10 s 24 |
| Wan 3.0 | alibaba/wan-3.0 | 2 to 30 | 480p 6, 720p 12, **1080p 24** | 16:9, 4:3, 1:1, 3:4, 9:16 | 2 | 24 | 5 s 24, 10 s 48, 30 s 144 |
| Wan 3.0 Prime | alibaba/wan-3.0-prime | 2 to 30 | 480p 8, 720p 17, **1080p 33** | 16:9, 4:3, 1:1, 3:4, 9:16 | 2 | 33 | 5 s 33, 10 s 66, 30 s 198 |

All have native sound. First frame on every model; Wan 2.7 also accepts a
last frame on the provider side, which Lavendly never sends.

## What the MCP path changes

- Reference cap quirk: Wan 2.6 and 2.7 get 4, Wan 3.0 and 3.0 Prime get 2
  (the cap is matched on the version number). The MCP path sends at most 3,
  so Wan 2.6 and 2.7 take 3 there.
- Wan 2.7 costs 12 at 1080p, the same as at 720p: the cheapest 1080p block
  with sound and references on Lavendly.
- Wan 2.6 makes 5 or 10 s only, 16:9 or 9:16 only.
- Wan 3.0 and 3.0 Prime run one take to 30 s (only Seedance 2.5 also does).
  A 30 s take is 6 blocks: the same price as six 5 s clips, with one opening
  image instead of six, and no cut to hide a drift.
- Wan 2.7 and 3.0 take 2 s: a quick insert at one block.

## The dialect

Three official formulas:

- Basic: **Subject + Scene + Motion**.
- Advanced: **Subject (description) + Scene (description) + Motion
  (description) + Aesthetic control + Stylisation**.
- Image-to-video: **Motion description + Camera movement**. Every Lavendly
  clip animates its opening image, so this is the motion prompt's shape; the
  advanced formula is the still-frame prompt's shape.

Wan was trained on both English and Chinese category labels, so literal
category words read better here than anywhere else:

| Control | Words |
|---|---|
| Light source | sunny, artificial, moonlight, practical, firelight, fluorescent, overcast, mixed |
| Light type | soft, hard, top, side, edge (rim), silhouette, low contrast, high contrast |
| Time of day | sunrise, sunset, dusk, dawn, day, night |
| Shot size | extreme close-up, close-up, medium close-up, medium, medium wide, wide |
| Composition | center, balanced, left-weighted, right-weighted, symmetrical, short-side |
| Lens | medium, wide, long-focus, telephoto, fisheye |
| Angle | over-the-shoulder, high, low, Dutch, aerial |
| Shot type | clean single, two shot, three shot, group, establishing |
| Colour tone | warm, cool, saturated, desaturated |
| Camera move | push in, pull back, pan left, pan right, tilt up, move left, move right, handheld, tracking, arc |
| Stylisation | felt style, 3D cartoon, pixel art, puppet animation, claymation, 2D anime, watercolour, oil painting, black and white animation, tilt-shift, time-lapse |

## Example 1: puppet animation fable, Wan 2.7, 16:9, 5 s

Still-frame prompt:

```text
Puppet animation still, handmade felt over a visible wire armature. Tiko, a small hummingbird puppet of emerald green felt with a ruby felt throat, a thin black wire beak and round black bead eyes, perches on a wire twig beside a paper trumpet flower. Medium wide shot, low angle, left-weighted composition. Soft side light, dusk, warm tone, a paper moon low in a felt sky. No text, no on-screen graphics.
```

Motion prompt:

```text
Tiko's wings blur into a hover; he lifts off the twig, darts toward the right of frame in two short stepped moves, and holds in the air with his beak at the mouth of the paper flower. Slow pan right that follows him and stops when he stops. Tiko, the flower and the dusk light stay exactly as in the opening frame. Exactly one hummingbird, nobody else. Sound: a soft wing hum, a cricket, no music.
```

## Example 2: interior long take, Wan 3.0, 16:9, 20 s

Still-frame prompt:

```text
Interior architecture photo. An empty Scandinavian living room, white oak floor, a pale linen sofa against a white wall, a single ceramic vase with dry grass on a low walnut table. Wide shot from the doorway at eye level, symmetrical composition, wide lens. Sunny, soft, morning light from a tall window on the right, low contrast, warm tone. Nobody in the room. No text, no on-screen graphics.
```

Motion prompt:

```text
The camera pushes in slowly from the doorway along the oak floor, past the sofa, and stops two steps from the walnut table with the vase centred. The patch of sunlight on the floor brightens a little as a cloud passes. The room, the furniture and the light stay exactly as in the opening frame. Nobody in frame. Sound: room tone, birds outside, no music.
```

## Failure modes and fixes

| Failure | Fix |
|---|---|
| Washed out, generic look from a short prompt | Add the aesthetic control words: light source, light type, time, shot size, lens |
| Image-to-video ignores the motion | Motion and camera only, one move |
| Over-sharpened or oversaturated | "low contrast, desaturated, soft light" |
| A second bird or a stray extra | The exact count line; the cast named |

## When to pick

- Wan 2.7: the value pick at 1080p (12 per block) with sound, three
  references on the MCP path, and five shapes.
- Wan 3.0 and 3.0 Prime: one continuous take of 15 to 30 s with sound.
- Wan 2.6: 5 or 10 s at 1080p with up to three references on the MCP path,
  landscape or vertical only.
- Any Wan: stylised animation looks named in the stylisation words.
