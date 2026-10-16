# Models and credits for animation on Lavendly

Every number here is what the server path (the MCP) does today. Clips made
through the MCP are priced at the model's default resolution, use the exact
duration you write (the server does not snap it), and get the provider's
default sound setting. Read the live numbers from `estimate_cost` before
every spend; this table is for planning.

## 1. How a clip is priced

- 1 credit = $0.10. A clip is billed in 5 s blocks, rounded up:
  `ceil(seconds / 5) x credits per block`. A 6 s clip pays 2 blocks, the same
  as 10 s. On Veo (4, 6 or 8 s only) 4 s is 1 block, 6 s and 8 s are 2: make
  8 s and trim when the cut wants 6.
- Each scene's opening image is made first, from its still-frame prompt, and
  is charged on its own (about 2 credits each on the default image model;
  `estimate_cost` lists it as `opening_image_credits`).
- Voice: about 1 credit per 1,000 characters on ElevenLabs v3 (minimum 1).
  Music: 3 credits per 30 s block (15 s = 2, 30 s = 3, 60 s = 6, 90 s = 9).
- The quote is a hold; the final charge settles to the provider's real cost
  and never above the quote. Render is free.

## 2. The generators that matter for animation

Res = the default resolution the MCP path gets (a 720p clip looks soft in
a 1080p film). Refs = how many reference images Lavendly sends with a clip.
Sound = whether the model makes its own audio. Block = credits per 5 s at the default
resolution. 15 s and 30 s = a typical build (shot lengths in brackets),
clips only, opening images extra.

| Display name | id | Lengths (s) | Aspects | Res | Refs | Sound | Block | 15 s | 30 s |
|---|---|---|---|---|---|---|---|---|---|
| Veo 3.1 | google/veo-3.1 | 4, 6, 8 | 16:9, 9:16 | 1080p | 2 | yes | 47 | 188 (8+4+4) | 376 (4 x 8) |
| Veo 3.1 Fast | google/veo-3.1-fast | 4, 6, 8 | 16:9, 9:16 | 1080p | 2 | yes | 14 | 56 (8+4+4) | 112 (4 x 8) |
| Veo 3.1 Lite (Auto) | google/veo-3.1-lite | 4, 6, 8 | 16:9, 9:16 | 1080p | 0 | yes | 10 | 40 | 80 |
| Seedance 2.0 | bytedance/seedance-2.0 | 4 to 15 | 1:1, 3:4, 9:16, 4:3, 16:9, 21:9, 9:21 | 1080p | 4 | yes | 44 | 132 (3 x 5) | 264 (6 x 5) |
| Seedance 1.5 Pro | bytedance/seedance-1-5-pro | 4 to 12 | 1:1, 3:4, 9:16, 9:21, 4:3, 16:9, 21:9 | 1080p | 4 | yes | 14 | 42 (3 x 5) | 84 (6 x 5) |
| Seedance 2.0 Fast | bytedance/seedance-2.0-fast | 4 to 15 | as Seedance 2.0 | 720p | 4 | yes | 11 | 33 | 66 |
| Seedance 2.0 Mini | bytedance/seedance-2.0-mini | 4 to 15 | as Seedance 2.0 | 720p | 4 | yes | 9 | 27 | 54 |
| Seedance 2.5 | bytedance/seedance-2.5 | 4 to 30 | 16:9, 4:3, 1:1, 3:4, 9:16, 21:9 | 720p | 4 | yes | 27 | 81 | 162 |
| Kling v3 Pro | kwaivgi/kling-v3.0-pro | 3 to 15 | 16:9, 9:16, 1:1 | 720p | 2 | yes | 20 | 60 (3 x 5) | 120 (6 x 5) |
| Kling v3 Standard | kwaivgi/kling-v3.0-std | 3 to 15 | 16:9, 9:16, 1:1 | 720p | 2 | yes | 15 | 45 | 90 |
| Wan 2.7 | alibaba/wan-2.7 | 2 to 10 | 16:9, 9:16, 1:1, 4:3, 3:4 | 1080p | 4 | yes | 12 | 36 (3 x 5) | 72 (6 x 5) |
| Wan 2.6 | alibaba/wan-2.6 | 5, 10 | 16:9, 9:16 | 1080p | 4 | yes | 18 | 54 | 108 |
| Wan 3.0 | alibaba/wan-3.0 | 2 to 30 | 16:9, 4:3, 1:1, 3:4, 9:16 | 1080p | 2 | yes | 24 | 72 | 144 |
| Hailuo 2.3 | minimax/hailuo-2.3 | 6, 10 | 16:9 only | 1080p | 2 | no | 10 | 40 (10+6) | 60 (3 x 10) |
| Hailuo 3 | minimax/hailuo-3 | 5 to 15 | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | 2k | 2 | yes | 18 | 54 | 108 |
| Hailuo 3 Max | minimax/hailuo-3-max | 5 to 15 | as Hailuo 3 | 768p | 2 | no | 10 | 30 | 60 |
| FLUX 3 Video | black-forest-labs/flux-3-video | 5 to 20 | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | 1080p | 2 | yes | 34 | 102 | 204 |
| Runway Gen-4.5 | runway/gen-4.5 | 2 to 10 | 16:9, 9:16 | 720p | 2 | no | 14 | 42 | 84 |
| Grok Imagine | x-ai/grok-imagine-video | 1 to 15 | 16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3 | 720p | 2 | treat as silent | 9 | 27 | 54 |
| HappyHorse 1.1 | alibaba/happyhorse-1.1 | 3 to 15 | 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, 9:21 | 1080p | 2 | treat as silent | 15 | 45 | 90 |

Not for animation work: HeyGen Video 1 (a presenter model, silent), Grok
Imagine 1.5 Lite (quoted 17 per block on the MCP path, more than Veo 3.1
Lite). Sora, Luma, LTX and Pixverse are not on Lavendly.

## 3. Rules that follow from the table

- Never wire a reference into a Veo 3.1 Lite (Auto) scene. When the hero or
  the style plate must ride as a reference, pick a model with refs.
- A style plate plus a hero sheet needs 2 slots. A hero face crop, a hero
  full body, a style plate and a location plate need 4: Seedance or Wan 2.7.
- Write durations from the model's exact list. On block-priced models 5 s
  and 10 s are the efficient lengths; on Veo 8 s.
- Only the top-level `videoModel` and `aspect` of `create_workflow` apply:
  one model and one aspect per film. Families draw a style differently, so
  do not mix families inside one film.
- The film takes the first clip's aspect. 21:9, 9:21, 3:2 and 2:3 have no
  export frame and fall back to the 9:16 size: use 16:9, 9:16, 1:1, 4:3 or
  3:4 for a film.
- Export is 720p on Free and Starter, 1080p on Creator and up.
- Silent models (Hailuo 2.3, Hailuo 3 Max, Runway) suit films whose sound is
  narration plus one score; set their clips to `off`.

## 4. Picks by animation style (planning default, test one scene first)

These come from each vendor's published strengths and the reference and
sound needs of the style. None is measured on Lavendly yet: generate scene 1,
open it, and only then commit the film to the model.

| Style | Best quality | Best value | Draft | Why |
|---|---|---|---|---|
| 3D feature look | Veo 3.1 | Veo 3.1 Fast | Seedance 2.0 Mini | Veo's native sound and character acting; Mini keeps 4 refs and sound at 9 per block |
| Anime | Seedance 2.0 | Wan 2.7 | Seedance 2.0 Mini | Wan lists 2D anime among its trained styles and takes 4 refs; Seedance 2.0 for 1080p line work |
| 2D cartoon | Veo 3.1 Fast | Wan 2.7 | Seedance 2.0 Mini | Wan for flat styles with refs; Veo for gag timing with sound |
| Claymation, stop-motion, felt | Seedance 2.0 | Wan 2.7 | Seedance 2.0 Mini | Wan lists claymation, felt and puppet animation; 4 refs hold the puppet |
| Paper cutout, collage | Kling v3 Pro | Kling v3 Standard | Seedance 2.0 Mini | the look is born in the still; Kling treats the opening image as an anchor; 1:1 available |
| Watercolour, storybook | Veo 3.1 Fast | Wan 2.7 | Seedance 2.0 Mini | Wan lists watercolour; Veo for narrated 16:9 and 9:16 |
| Kids fable, bedtime | Veo 3.1 Fast | Wan 2.7 | Seedance 2.0 Mini | Quick Start films run on Veo 3.1 Fast; 2 refs carry hero and plate |
| Mascot, brand character | Kling v3 Pro | Seedance 1.5 Pro | Seedance 2.0 Mini | Kling held faces and products from an approved still in a dated practitioner test; Seedance 1.5 Pro has 4 refs at 14 per block |

Long single takes (a 15 to 30 s scene with no cut): Wan 3.0 or Seedance 2.5.
