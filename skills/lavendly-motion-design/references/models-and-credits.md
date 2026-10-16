# Models and credits for motion design on Lavendly

Every number here is what the server path (the MCP) does today. Clips made
through the MCP are priced and rendered at the model's default resolution,
use the exact duration you write (the server does not snap it), and get the
provider's default sound setting. Read the live numbers from `estimate_cost`
before every spend; this table is for planning.

## 1. How a clip is priced

- 1 credit = $0.10. A clip is billed in 5 s blocks, rounded up:
  `ceil(seconds / 5) x credits per block`. 6 s pays 2 blocks, like 10 s. On
  Veo (4, 6 or 8 s only) 4 s is 1 block, 6 s and 8 s are 2: make 8 s and
  trim when the cut wants 6 or 7.
- Each scene's opening image is made first and charged on its own (about 2
  credits on the default image model; `opening_image_credits` in the
  estimate). A scene whose image node already has a url (a packshot the
  user supplied) makes no opening image.
- Voice: about 1 credit per 1,000 characters on ElevenLabs v3. Music: 3
  credits per 30 s block (5 s = 1, 15 s = 2, 30 s = 3, 60 s = 6).
- The quote is a hold; the charge settles to the provider's real cost, never
  above the quote. Render is free.

## 2. The generators

Res = the default resolution the MCP path gets. Refs = reference images
Lavendly sends. Block = credits per 5 s. 15 s and 30 s = clips only for a
typical build.

| Display name | id | Lengths (s) | Aspects | Res | Refs | Sound | Block | 15 s | 30 s |
|---|---|---|---|---|---|---|---|---|---|
| Veo 3.1 | google/veo-3.1 | 4, 6, 8 | 16:9, 9:16 | 1080p | 2 | yes | 47 | 188 (8+4+4) | 376 (4 x 8) |
| Veo 3.1 Fast | google/veo-3.1-fast | 4, 6, 8 | 16:9, 9:16 | 1080p | 2 | yes | 14 | 56 | 112 |
| Veo 3.1 Lite (Auto) | google/veo-3.1-lite | 4, 6, 8 | 16:9, 9:16 | 1080p | 0 | yes | 10 | 40 | 80 |
| Seedance 2.0 | bytedance/seedance-2.0 | 4 to 15 | 1:1, 3:4, 9:16, 4:3, 16:9, 21:9, 9:21 | 1080p | 4 | yes | 44 | 132 (3 x 5) | 264 |
| Seedance 1.5 Pro | bytedance/seedance-1-5-pro | 4 to 12 | as Seedance 2.0 | 1080p | 4 | yes | 14 | 42 | 84 |
| Seedance 2.0 Mini | bytedance/seedance-2.0-mini | 4 to 15 | as Seedance 2.0 | 720p | 4 | yes | 9 | 27 | 54 |
| Seedance 2.5 | bytedance/seedance-2.5 | 4 to 30 | 16:9, 4:3, 1:1, 3:4, 9:16, 21:9 | 720p | 4 | yes | 27 | 81 (one take) | 162 (one take) |
| Kling v3 Pro | kwaivgi/kling-v3.0-pro | 3 to 15 | 16:9, 9:16, 1:1 | 720p | 2 | yes | 20 | 60 | 120 |
| Kling v3 Standard | kwaivgi/kling-v3.0-std | 3 to 15 | 16:9, 9:16, 1:1 | 720p | 2 | yes | 15 | 45 | 90 |
| Wan 2.7 | alibaba/wan-2.7 | 2 to 10 | 16:9, 9:16, 1:1, 4:3, 3:4 | 1080p | 4 | yes | 12 | 36 | 72 |
| Wan 3.0 | alibaba/wan-3.0 | 2 to 30 | 16:9, 4:3, 1:1, 3:4, 9:16 | 1080p | 2 | yes | 24 | 72 (one take) | 144 (one take) |
| Wan 3.0 Prime | alibaba/wan-3.0-prime | 2 to 30 | as Wan 3.0 | 1080p | 2 | yes | 33 | 99 | 198 |
| Hailuo 2.3 | minimax/hailuo-2.3 | 6, 10 | 16:9 only | 1080p | 2 | no | 10 | 40 | 60 |
| Hailuo 3 Max | minimax/hailuo-3-max | 5 to 15 | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | 768p | 2 | no | 10 | 30 | 60 |
| FLUX 3 Video | black-forest-labs/flux-3-video | 5 to 20 | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | 1080p | 2 | yes | 34 | 102 | 204 |
| Runway Gen-4.5 | runway/gen-4.5 | 2 to 10 | 16:9, 9:16 | 720p | 2 | no | 14 | 42 | 84 |
| Grok Imagine | x-ai/grok-imagine-video | 1 to 15 | 16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3 | 720p | 2 | treat as silent | 9 | 27 | 54 |

Sora, Luma, LTX and Pixverse are not on Lavendly. Grok Imagine 1.5 Lite is
quoted 17 per block on the MCP path, more than Veo 3.1 Lite.

## 3. Rules that follow

- Anything that fills the frame and must look finished gets a 1080p model;
  a 720p clip in a 1080p export looks soft from the first second.
- Never wire a reference into Veo 3.1 Lite (Auto). A product packshot plus a
  style plate needs 2 slots; packshot, label close-up, plate and set need 4
  (Seedance, Wan 2.7).
- One model and one aspect per film (only the top-level `videoModel` and
  `aspect` apply). The film takes the first clip's aspect; 21:9, 9:21, 3:2
  and 2:3 have no export frame and fall back to the 9:16 size.
- Export: 720p on Free and Starter, 1080p on Creator and up (4K plans also
  get 1080p frames). Every clip is normalised to 30 frames per second.
- Long single takes (no cut, no chaining drift): Wan 3.0 and Wan 3.0 Prime
  (to 30 s, 1080p), Seedance 2.5 (to 30 s, 720p), FLUX 3 (to 20 s).
- Silent models (Hailuo 2.3, Hailuo 3 Max, Runway) suit score-led pieces;
  set their clips to `off`.

## 4. Picks by sub-genre (planning default; scene 1 is the test)

| Sub-genre | Best quality | Recommended | Value | Draft |
|---|---|---|---|---|
| Product render, CGI hero | Veo 3.1 | Veo 3.1 Fast | Seedance 1.5 Pro (4 refs, 1080p) | Seedance 2.0 Mini |
| Abstract, surreal | FLUX 3 Video | Veo 3.1 Fast | Wan 2.7 | Seedance 2.0 Mini |
| Seamless loops | Seedance 2.0 | Wan 2.7 | Wan 2.7 | Seedance 2.0 Mini |
| Satisfying, ASMR | Veo 3.1 | Veo 3.1 Fast | Seedance 1.5 Pro | Seedance 2.0 Mini |
| Title-sequence moods | FLUX 3 Video | Veo 3.1 Fast | Wan 2.7 | Seedance 2.0 Mini |
| Logo-free idents | Seedance 2.0 | Veo 3.1 Fast | Seedance 1.5 Pro | Seedance 2.0 Mini |
| 3D environments, macro worlds | Wan 3.0 Prime | Wan 3.0 | Seedance 2.5 | Seedance 2.0 Mini |
| Data and product metaphors | Veo 3.1 | Veo 3.1 Fast | Wan 2.7 | Seedance 2.0 Mini |

Reasons, from each vendor's published strengths and the platform limits:
Veo for native sound and its documented prompt grammar at 1080p; FLUX 3 for
art-directed stylised shots up to 20 s; Seedance for 4 references at 1080p;
Wan 2.7 for any whole length from 2 to 10 s (exact loop lengths), 1:1 and 4
references; Wan 3.0 and Seedance 2.5 for 30 s single takes. None is
measured on Lavendly yet.
