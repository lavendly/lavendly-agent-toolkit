# HappyHorse family (Alibaba)

HappyHorse 1.0 and 1.1. Range durations from 3 to 15 s and seven shapes,
including 21:9 and 9:21. The app describes 1.1 as keeping "consistent
characters across frames". Sound is unknown.

## Lavendly specs

| Model | id | Seconds | Resolutions (default bold) | Aspects | Refs | Sound | Credits per 5 s | Clip at default |
|---|---|---|---|---|---|---|---|---|
| HappyHorse 1.0 | alibaba/happyhorse-1.0 | 3 to 15 | 720p 12, **1080p 20** | 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, 9:21 | 2 | unknown | 20 | 5 s 20, 10 s 40, 15 s 60 |
| HappyHorse 1.1 | alibaba/happyhorse-1.1 | 3 to 15 | 720p 12, **1080p 15** | same 7 | 2 | unknown | 15 | 5 s 15, 10 s 30, 15 s 45 |

First frame only.

## What the MCP path changes

- Quoted at 1080p: 1.1 is 15 per block, 1.0 is 20. Pick 1.1 unless the user
  asks for 1.0.
- Sound flag unknown: treat as silent. Narration and score from
  `attach_track`, native audio off, until `quality_check` with
  `expect_audio` true proves a clip carries sound. Never plan dialogue on
  HappyHorse.
- 21:9 and 9:21 export inside the 9:16 frame size; keep films on 9:16,
  16:9, 1:1, 3:4 or 4:3.

## The dialect

No vendor prompting guide was available at authoring time. HappyHorse is an
Alibaba model, so write it like Wan: the still-frame prompt as Subject +
Scene + Aesthetic control + Stylisation, the motion prompt as Motion +
Camera, with literal category words (light source, light type, shot size,
lens). Name every character by the same short name in every clip, and state
the count. Treat the first clip as a test: put it on the hardest shot.

## Example 1: two characters, HappyHorse 1.1, 16:9, 5 s

Still-frame prompt:

```text
Natural photo, overcast daylight. June, a woman in her late twenties, freckles, auburn hair in a low knot, mustard raincoat, walks a grey whippet in a red collar along a wet beach at low tide. Medium wide shot, side-on, June on the left third, the dog ahead of her on the right. Soft light, desaturated, cool tone, the sea flat and grey. No text, no on-screen graphics.
```

Motion prompt:

```text
June walks to the right at an easy pace; the whippet trots ahead on all four legs, stops, and looks back at her. Tracking shot that moves right with them at the same speed. Exactly one woman and one dog, nobody else. June, the dog and the grey light stay exactly as in the opening frame.
```

## Example 2: wide landscape plate, HappyHorse 1.1, 16:9, 10 s

Still-frame prompt:

```text
Landscape photo, dawn. A single red wooden cabin on a low rise above a still lake, birch trees behind, mist lying on the water. Extreme wide shot from the far shore, the cabin small on the right third, the lake filling the lower half. Soft light from the low sun behind the trees, warm on the mist, cool on the water. Nobody in the scene. No text, no on-screen graphics.
```

Motion prompt:

```text
The mist drifts slowly to the left across the lake and thins; the sun clears the birches and the cabin's front catches warm light. Locked-off camera. The cabin, the trees and the shoreline stay exactly as in the opening frame. Nobody in frame.
```

## Failure modes and fixes

| Failure | Fix |
|---|---|
| A clip arrives with sound you did not plan | Keep native audio off or set it to `mix` low under narration |
| Character changes between scenes | The same name and locked words, the reference wired, the first scene checked before the next |
| Letterboxed export | 21:9 or 9:21 used; use 16:9 or 9:16 for films |

## When to pick

- HappyHorse 1.1: recurring characters across scenes when sound comes from
  narration and score, at 15 per block.
- HappyHorse 1.0: only on request.
