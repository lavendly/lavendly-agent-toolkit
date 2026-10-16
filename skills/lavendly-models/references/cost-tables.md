# Cost tables

Credits on the MCP path for typical films, per model, at the default
resolution (the only price the MCP path quotes). Pricing version
2026-10-13c. `estimate_cost` is always the final word; these tables are for
choosing before a workflow exists.

## The formula

- 1 credit = $0.10 retail.
- Block credits = ceil(USD per second x 5 x 1.05 / 0.045), at least 1.
- Clip credits = ceil(seconds / 5) x block credits.
- Each scene adds its opening image: 2 credits on Auto. A scene whose image
  node already has a url (a packshot, a chained frame) adds 0.
- The quote is a hold. The charge settles to the provider's reported cost,
  never above the quote. A billed clip that fails to deliver on the server
  path is still charged.
- Voice and music made by `attach_track` are charged when attached and are
  not in `estimate_cost`. Voice = ceil(USD / 0.045), at least 1, at $0.04
  per 1,000 characters on ElevenLabs v3 ($0.02 on flash and turbo): 1,000
  characters is 1 credit, 5,000 is 5 (3 on flash). Music is 3 credits per
  30 s, rounded up: 15 s = 2, 30 s = 3, 60 s = 6.

## The plans behind the tables

| Film | Range models (5 s blocks) | Veo (4, 6, 8 s) | Hailuo 2.3 (6, 10 s) |
|---|---|---|---|
| 6 s | one 6 s clip: 2 blocks, 1 scene | one 8 s clip trimmed: 2 blocks, 1 scene | one 6 s clip: 2 blocks, 1 scene |
| 15 s | three 5 s clips: 3 blocks, 3 scenes | two 8 s clips trimmed: 4 blocks, 2 scenes | 10 s + 6 s: 4 blocks, 2 scenes |
| 30 s | six 5 s clips: 6 blocks, 6 scenes | four 8 s clips trimmed: 8 blocks, 4 scenes | three 10 s: 6 blocks, 3 scenes |
| 60 s | twelve 5 s clips: 12 blocks, 12 scenes | eight 8 s clips trimmed: 16 blocks, 8 scenes | six 10 s: 12 blocks, 6 scenes |

Range models with 5 s in their list: every model except Veo, Hailuo 2.3,
Kling Video O1 and Wan 2.6, which make 5 and 10 (same block count: write
5 + 10 for 15 s). Fewer, longer clips (two 15 s, one 30 s on Wan 3.0 or
Seedance 2.5) cost the same blocks and fewer opening images.

## Clip credits, plus opening images in brackets (Auto, 2 each)

| Model | Per 5 s | 6 s | 15 s | 30 s | 60 s |
|---|---|---|---|---|---|
| Veo 3.1 | 47 | 94 (+2) | 188 (+4) | 376 (+8) | 752 (+16) |
| Veo 3.1 Fast | 14 | 28 (+2) | 56 (+4) | 112 (+8) | 224 (+16) |
| Veo 3.1 Lite (Auto) | 10 | 20 (+2) | 40 (+4) | 80 (+8) | 160 (+16) |
| Seedance 2.0 | 44 | 88 (+2) | 132 (+6) | 264 (+12) | 528 (+24) |
| Seedance 2.0 Fast | 11 | 22 (+2) | 33 (+6) | 66 (+12) | 132 (+24) |
| Seedance 2.0 Mini | 9 | 18 (+2) | 27 (+6) | 54 (+12) | 108 (+24) |
| Seedance 2.5 | 27 | 54 (+2) | 81 (+6) | 162 (+12) | 324 (+24) |
| Seedance 1.5 Pro | 14 | 28 (+2) | 42 (+6) | 84 (+12) | 168 (+24) |
| Kling v3 Standard | 15 | 30 (+2) | 45 (+6) | 90 (+12) | 180 (+24) |
| Kling v3 Pro | 20 | 40 (+2) | 60 (+6) | 120 (+12) | 240 (+24) |
| Kling Video O1 | 14 | 28 (+2) | 42 (+6) | 84 (+12) | 168 (+24) |
| Hailuo 2.3 | 10 | 20 (+2) | 40 (+4) | 60 (+6) | 120 (+12) |
| Hailuo 3 | 18 | 36 (+2) | 54 (+6) | 108 (+12) | 216 (+24) |
| Hailuo 3 Max | 10 | 20 (+2) | 30 (+6) | 60 (+12) | 120 (+24) |
| Grok Imagine | 9 | 18 (+2) | 27 (+6) | 54 (+12) | 108 (+24) |
| Grok Imagine 1.5 | 30 | 60 (+2) | 90 (+6) | 180 (+12) | 360 (+24) |
| Grok Imagine 1.5 Lite | 17 | 34 (+2) | 51 (+6) | 102 (+12) | 204 (+24) |
| Wan 2.6 | 18 | 36 (+2) | 54 (+6) | 108 (+12) | 216 (+24) |
| Wan 2.7 | 12 | 24 (+2) | 36 (+6) | 72 (+12) | 144 (+24) |
| Wan 3.0 | 24 | 48 (+2) | 72 (+6) | 144 (+12) | 288 (+24) |
| Wan 3.0 Prime | 33 | 66 (+2) | 99 (+6) | 198 (+12) | 396 (+24) |
| HappyHorse 1.0 | 20 | 40 (+2) | 60 (+6) | 120 (+12) | 240 (+24) |
| HappyHorse 1.1 | 15 | 30 (+2) | 45 (+6) | 90 (+12) | 180 (+24) |
| FLUX 3 Video | 34 | 68 (+2) | 102 (+6) | 204 (+12) | 408 (+24) |
| Runway Gen-4.5 | 14 | 28 (+2) | 42 (+6) | 84 (+12) | 168 (+24) |
| HeyGen Video 1 | 7 | 14 (+2) | 21 (+6) | 42 (+12) | 84 (+24) |

Unknown model ids are quoted 14 per clip by default; never rely on it.

## Rounding traps

| Trap | Example | Do |
|---|---|---|
| A second over a block boundary buys a whole block | 6 s = 10 s; 11 s = 15 s | Write 5, 10, 15; trim in the edit |
| Veo 6 s | 6 s and 8 s both 2 blocks | Write 8 and trim; or 4 (1 block) |
| Short inserts | a 2 or 3 s clip still pays 1 block | Give the insert 5 s and trim, or fold it into a longer clip |
| Hailuo 2.3 at 6 s | 20, same as 10 s | Write 10 and trim |
| Many short scenes | 12 scenes add 24 credits of opening images | Fewer, longer clips where the cut allows; chained scenes skip the image |
| The draft model on the MCP path | Grok 1.5 Lite quoted 17 per block at 1080p | Draft on Seedance 2.0 Mini (9) or Veo 3.1 Lite (10) |
| A re-roll | a new still prompt with a cleared url pays the opening image and the clip again; one call makes both | Get the still prompt right before the first generation; a wrong still costs a clip too |

## Sizing against plans

| Plan | Credits per month | Frame size in the export |
|---|---|---|
| Free | 35 to start, plus 5 per daily claim | 720p |
| Starter | 200 | 720p |
| Creator | 450 | 1080p |
| Studio | 1,200 | 1080p frames (4k plans also export 1080p) |
| Enterprise | 12,500 | 1080p frames |

A 15 s film on Veo 3.1 Lite is 44 credits with opening images: more than a
new Free account holds. Say so before building, and offer 6 s (22) or
Seedance 2.0 Mini at 15 s (33).

## Worked example: 30 s ad, mixed models

| Scenes | Model | Clips | Credits |
|---|---|---|---|
| 1 hook, 4 s | Veo 3.1 Fast | 4 s | 14 |
| 2 to 4 product, 5 s each, three references | Seedance 2.0 Mini | 3 x 5 s | 27 |
| 5 testimonial line on camera, 8 s | Veo 3.1 Fast | 8 s | 28 |
| 6 call to action, 5 s | Seedance 2.0 Mini | 5 s | 9 |
| Opening images | Auto | 6 | 12 |
| Narration 70 words (about 400 characters, ElevenLabs v3) | | | 1 |
| Score 30 s | | | 3 |
| Total | | | 94 |

Total picture 32 s, trimmed to 30 in the edit. A testimonial spoken by an
AI person is never presented as a real customer.
