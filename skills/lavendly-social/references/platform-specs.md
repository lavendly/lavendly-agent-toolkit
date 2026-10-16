# Platform specs: social

What each platform expects and what Lavendly can deliver. Platform numbers
change; the ones marked "community" are medians from creator tooling, not
platform documentation. Check the platform's help page when a number
decides a choice.

## 1. What Lavendly delivers

| Item | Value |
|---|---|
| Longest film | 180 s (render refuses longer) |
| Export frame, Free and Starter | 9:16 720x1280, 16:9 1280x720, 1:1 1080x1080, 3:4 810x1080 |
| Export frame, Creator and up | 9:16 1080x1920, 16:9 1920x1080, 1:1 1080x1080, 3:4 1080x1440 |
| Export shape | The first clip's aspect; other shapes are letterboxed |
| Shapes models make | 9:16 and 16:9 on every family except Hailuo 2.3 (16:9 only); 1:1 on Seedance, Kling, Wan 2.7 and 3.0, Hailuo 3 Max, HeyGen, Grok; 3:4 on Seedance, Wan 2.7 and 3.0, Hailuo 3 Max, HeyGen, Grok; no model makes 4:5 |
| Captions | Burned from the voiceover's word timings; styles `tiktok`, `reels`, `youtube`, `caption`; bottom aligned on an MCP render (the brand-kit position does not reach it); film of two or more scenes only |
| On-screen titles | Not rendered from the MCP; the user adds them in the app |
| Loudness | Per-clip levelling and a limiter near -0.5 dBFS; no -14 LUFS target yet |
| AI label | Publishing through lavendly-publish adds the platform's AI label |

## 2. Platforms

| | TikTok | Instagram Reels | YouTube Shorts | LinkedIn | X |
|---|---|---|---|---|---|
| Shape | 9:16 | 9:16 | 9:16 | 1:1 or 9:16 (4:5 is native, but no model makes it: use 1:1 or 3:4) | 16:9 or 1:1; 9:16 plays |
| Sound default | On | Often off | On | Mostly off | Mostly off |
| Lengths that perform | 7 to 15 s for hooks and memes; 21 to 34 s for stories (TikTok's own ad guidance); 9 to 15 s for direct response | 7 to 30 s | 15 to 45 s; Shorts run up to 3 minutes | 30 to 90 s | 15 to 45 s; 140 s maximum on standard accounts |
| Pace | Cut every 2 to 3 s | 2 to 3 s | 2 to 4 s | 3 to 5 s | 3 to 5 s |
| Caption style | `tiktok` | `reels` | `tiktok` or `reels` | `caption` (boxed) | `caption` or `youtube` on 16:9 |
| Tone | Native, direct, fast | Polished-native, visual first | Hook-led, loop-friendly | Professional, specific, useful | Opinion, news, humour |

TikTok's ad guidance (2026): over 63 percent of the highest click-through
videos show the key message or product in the first 3 s; vertical video
has a 25 percent higher 6-second watch-through; tracks above 120 BPM drive
higher view-through. Meta: design for sound off, the key visual in the
first 3 s.

## 3. Safe zones (at 1080x1920; scale by two thirds for 720x1280)

| Platform | Top | Bottom | Left | Right | Source |
|---|---|---|---|---|---|
| TikTok | 150 px | 320 px | 60 px | 120 px | community |
| Reels | 210 px | 340 px | 40 px | 100 px | community |
| Reels (Meta guidance) | 269 px (14 percent) | 672 px (35 percent) | 65 px (6 percent) | 65 px | Meta summary |
| Shorts | 150 px | 350 px | 60 px | 150 px | community |
| All three | 210 px | 450 px | 60 px | 150 px | community |

- Faces and the subject: the band from 15 to 55 percent of frame height,
  inside the side margins. Write it into still prompts: "the face in the
  upper middle of the frame, the lower third plain floor".
- Captions: Lavendly burns them at the bottom by default, inside the zone
  the platforms cover with the description and buttons. The brand-kit
  caption position does not reach a render started from the MCP; keep the
  bottom third of the picture free of anything that matters.
- Right edge: TikTok and Shorts stack buttons there; nothing important in
  the right 120 to 150 px.
- A version for several platforms: keep the key content inside the centre
  square (1080x1080 in the middle of the vertical frame) so a 1:1 or 4:5
  crop in the app keeps it.

## 4. Captions

| Rule | Value |
|---|---|
| Characters per line | 42 at most |
| Lines | 2 at most |
| Reading speed | about 17 characters per second (20 for adults is the upper limit) |
| Shortest hold | 1.2 s for a short line |
| Longest hold | 7 s |
| Social chunks | 1 to 4 words, 3 to 5 chunks per second of speech at most |
| Lavendly chunks | `tiktok` 3 words (56 px, bold), `reels` 4 words (44 px), `youtube` 6 words (40 px), `caption` 4 words boxed (42 px) |

- Captions show the words the voice speaks. Short sentences, numbers
  written as words, no stage directions in the script.
- Native speech from a clip and the sound of imported footage get no burned
  captions from the MCP. Point the user to the platform's auto-captions at
  upload (TikTok, Reels and Shorts all offer them) or to the app.

## 5. Cover frame

- Platforms show a cover in the feed grid and in search. Frame 0 should
  work as the cover: the subject large, centred in the 1:1 middle square,
  no motion blur.
- The cover is chosen in the platform's app when posting or in the app
  before publishing; the MCP has no cover argument that this skill relies
  on (check `get_schema` and the `publish_video` settings for the channel).
- For a loop, the frame 0 cover is also the end frame: make it the finished
  picture.

## 6. Posting copy

- Post caption: the hook under 15 words, one line of value or context, the
  AI disclosure when generated people or realistic scenes are in it, three
  hashtags at most. "A constraint beats an adjective" ("One pan. Six
  minutes.").
- YouTube needs a title; LinkedIn rewards a first line that states the
  point; X rewards a line that stands alone.
- Posting, scheduling and the confirmation belong to lavendly-publish.
