# Distribution: how each feed spreads a video

What TikTok, Reels, Shorts, Facebook Reels, X and Reddit reward, and what
that changes in the plan. Statements marked with a source are the
platform's own words; numbers marked "claimed" come from creator tooling and
guides, not from the platforms or from Lavendly measurements. Platforms
change their ranking often: re-check a source before a number decides a
choice, and never promise the user views.

Parts of this file are adapted from the viral-video-master plugin by Josiah
Siegel (https://github.com/JosiahSiegel/claude-plugin-marketplace, MIT
License, Copyright (c) 2025 Josiah Siegel). Its unsourced figures are kept
only where marked "claimed"; the platform statements were checked against
first-party sources on 2026-10-24.

## 1. How a short video spreads

Every recommendation feed works the same way in outline:

1. A new video is shown to a small group of viewers the feed predicts will
   care, followers or not. TikTok: "neither follower count nor whether the
   account has had previous high-performing videos are direct factors".
2. The feed measures what that group does: stop or swipe, watch through,
   rewatch, share, reply, follow, or ask to see less.
3. When the group responds better than similar videos, the feed shows it to
   a larger group, and measures again. A video goes viral by passing each
   test with the next, wider audience.

What follows for the plan:

- Each test is decided in the same order: does the viewer stop (frame 0 and
  the first spoken line, [hooks-library.md](hooks-library.md)), do they stay
  ([retention.md](retention.md)), and do they do the one thing that feed
  weighs most (section 2).
- The feed reads what the video is about from the caption, the spoken
  words, the sounds and the hashtags (TikTok lists captions, sounds and
  hashtags as "video information"). A clear topic reaches the right first
  audience; a vague one is tested on the wrong people and stops there.
- Most views come in the first hours and days (claimed: 68 percent of a
  TikTok video's views in its first 24 hours; claimed: Shorts older than 30
  days are rarely pushed). Search-led surfaces (YouTube search, Instagram
  keyword search, Reddit search) keep finding a well-titled video later.
- Viral is an outcome of these tests, not a property a video can be given.
  Design for the signal; report the numbers after.

## 2. What each feed rewards

| Feed | Design for | What the platform says it measures | What cuts reach |
|---|---|---|---|
| TikTok | Finishes and rewatches, then shares | Interactions (likes, shares, comments, follows), video information (captions, sounds, hashtags), device and account settings with less weight; finishing a longer video is a strong signal (TikTok newsroom, 2020) | Duplicated or reposted content is not recommended (same source); the feed avoids two videos with the same sound or creator back to back; another app's watermark (community reports) |
| Instagram Reels | Sends (shares by DM) for new viewers; watch time | Watch time, likes per reach and sends per reach are the main signals; likes weigh a little more with followers, sends a little more with non-followers (Adam Mosseri, January 2025) | Accounts that mostly post others' work are kept out of recommendations; a watermark, a speed change or a credit line does not make a repost original (Instagram originality update, 2026) |
| YouTube Shorts | Viewed versus swiped away, then watch through | Since 31 March 2025 a Shorts view counts on every start and replay; the earlier count lives on as "engaged views" in Analytics advanced mode; Studio reports viewed versus swiped away (YouTube, March 2025) | Swipes in the first seconds |
| Facebook Reels | Shares, then watch time | Since June 2025 every Facebook video is shared as a Reel, with no length or format limits (Meta, June 2025) | Claimed: reposts from other apps with their watermark |
| X | Replies, and replies the author answers; clicks into the conversation | The open-sourced For You ranker (April 2023) scores the predicted chance of a like, repost, reply, reply the author engages with, profile click, conversation click, half a video watched, negative feedback and report; weights are tuned so each adds about equally on average, and change over time | "Show less", mute, block and report weigh strongly against a post in the same table |
| Reddit | Early upvotes inside one community | Reddit's open-source hot sort (the archived r2 code) scores net votes on a log scale plus the post's age, so the first votes count most and every post fades with time; today's ranking may differ | The community's rules and moderators: a removed post has no reach; the same post in many communities at once reads as spam |
| LinkedIn | Comments and time spent | No first-party ranking statement is used here; follow the tone and pace in [platform-specs.md](platform-specs.md) | Claimed: engagement bait and reposted video |

Read the table as which behaviour to design for, not as a formula:

- TikTok and Shorts: a loop or a hard-cut ending on the payoff earns the
  rewatch; a slow start earns the swipe ([retention.md](retention.md)).
- Reels and Facebook: give the viewer a reason to send it to one person: a
  useful thing they will want to keep, a moment someone they know will
  recognise, a question for a friend. "Send this to" lines are bait; the
  reason must be in the video.
- X: end on one specific question the user can answer in replies, and tell
  the user replying in the first hour is part of the post.
- Reddit: the post must belong to the community the user names; the title
  is the hook, written like a person posting, never like an ad.

## 3. Length and the first seconds, per feed

| Feed | Longest upload | Length that spreads | First seconds |
|---|---|---|---|
| TikTok | 10 minutes in the camera, longer by upload | 7 to 15 s for hooks and memes, 21 to 34 s for stories (TikTok ad guidance); claimed: the creator programme pays on videos over 1 minute | The key message or product in the first 3 s (TikTok ad guidance) |
| Instagram Reels | 3 minutes (since January 2025) | Claimed: 7 to 30 s spreads widest, 30 to 90 s holds engagement | Claimed: the hook by 3 s, the value clear by 8 s, the main content from 12 s; design for sound off (Meta) |
| YouTube Shorts | 3 minutes (since October 2024) | 15 to 45 s by default; claimed: 50 to 60 s does best when retention holds | Frame 0 decides viewed versus swiped |
| Facebook Reels | No limit (since June 2025) | Claimed: 15 to 30 s | Sound off by default |
| X | 140 s on standard accounts | 15 to 45 s | Plays muted in the timeline; the post text carries the hook |
| Reddit | Check the community's rules | As short as the idea allows; the community's own norm wins | The title and the first frame together |

Lavendly's export stops at 180 s, so a 3-minute Reel or Short is also the
platform's limit. Shapes, safe zones and caption sizes are in
[platform-specs.md](platform-specs.md).

## 4. Captions, keywords and hashtags

- The post caption is how the feed learns the topic. Name the subject in
  the words a person would search: "air fryer salmon in 12 minutes", not
  "dinner hack". Say the same topic in the first spoken line, so the
  burned captions carry it too.
- Hashtags: three at most, the topic and the niche. Broad tags such as #fyp
  or #viral have no documented effect. Reddit takes none.
- Instagram: the first line before "more" is the hook; keywords in plain
  sentences help search.
- YouTube: the title is required and searchable (100 characters or fewer).
- Reddit: a title written like a person, the flair the community requires.
- X: one line that stands alone without the video.
- AI disclosure in the caption where generated people or realistic scenes
  appear; publishing through Lavendly also sets the platform's AI label.

## 5. Trends

- Lavendly cannot see what is trending. The user names the trend and where
  they saw it. Claimed: a format is worth joining while it is rising,
  within 24 to 72 hours of noticing it, not after it peaked.
- Join the format, never copy a video: the structure, the beat, the shape
  of the joke, with original pictures and original sound
  ([recipe-trends-memes.md](recipe-trends-memes.md)).
- A trending song is added by the user in the platform's app when posting,
  from its licensed library. When they plan to, offer a version without the
  music bed (voice only, or native sound) so the two do not fight, and time
  the cuts to the beat they describe.
- An original sound can become the trend: a clean, repeatable line or sound
  in the first 2 s is easier for others to reuse.

## 6. Originality and versions

- Every feed above demotes duplicated and reposted video. Each platform
  gets its own upload of the rendered file: never download a posted video
  from one app to post it on another, and never add another app's
  watermark or interface to the picture.
- The same film on several platforms is fine when it is the user's own
  work: change the first line of the caption per platform, and render a
  16:9 or 1:1 version as its own workflow when the feed wants that shape.
- Never post the same video twice to one account to retry a weak start;
  make a new hook over the same body instead (section 8).

## 7. Cadence and timing

- A schedule the user can keep beats bursts. Claimed cadences from creator
  tooling: TikTok 1 to 4 posts a day, Reels and Shorts 1 to 2 a day. The
  credits decide first: the cost per video times the cadence must fit the
  month, or the run stops halfway.
- Post when the user's own audience is active, read from their analytics.
  Generic "best time" lists disagree with each other; do not quote one as
  fact.
- The first hour matters on every feed: post when the user can answer
  comments and replies.
- Publishing and scheduling go through lavendly-publish
  (`list_channels`, `publish_video`, `schedule_video`), only after an
  explicit yes.

## 8. Reading the result

| What the numbers show | What it means | The next video |
|---|---|---|
| Few views, normal retention | The first audience was the wrong one | A clearer topic in the caption and the first spoken line |
| Many swipes in the first 2 s (Shorts viewed versus swiped) | Frame 0 or the first line failed | A stronger frame 0, the voice from 0.0 s ([hooks-library.md](hooks-library.md)) |
| Views but low watch-through | The hook works, the body sags | The curve fixes in [retention.md](retention.md) |
| High watch-through, few shares or sends | Nothing worth passing on | Give it a reason to send: useful, recognisable, a question for a friend |
| Replies, then "show less" or reports | The post provoked the wrong way | Drop the provocation; keep the specific question |
| One video far above the rest | That topic and hook work | Make the next one on the same topic with a new hook |

- Change one thing at a time: two hooks over the same body, posted on
  different days. Instagram's Trial Reels show a Reel to non-followers
  first, which suits this test.
- Lavendly cannot read post analytics from the MCP. Ask the user for the
  numbers, or work from what they describe.

## 9. What never to do

- Engagement bait ("comment YES", "send this to 5 friends"), fake
  controversy, a planted mistake to farm corrections, a hook the video does
  not pay off. X counts "show less" and reports strongly against a post;
  every viewer remembers a broken promise.
- Promise the user views, reach or virality. Say what the video is built
  to do and what the feed measures.

## Sources

- TikTok newsroom, "How TikTok recommends videos #ForYou" (2020):
  https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you
- Adam Mosseri on Instagram ranking (January 2025), as reported by Social
  Media Today: https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/
- Instagram Reels up to 3 minutes (January 2025):
  https://www.socialmediatoday.com/news/instagram-officially-expands-reels-length-3-minutes/737766/
- Instagram originality update (2026), as reported by PetaPixel:
  https://petapixel.com/2026/04/30/new-instagram-policies-target-reposted-content/
- YouTube Shorts view counting from 31 March 2025, as reported by Tubefilter:
  https://www.tubefilter.com/2025/03/26/youtube-shorts-views-counting-stats/
- Meta, all Facebook videos as Reels (June 2025), as reported by Tubefilter:
  https://www.tubefilter.com/2025/06/17/meta-facebook-reels-all-videos-update/
- X heavy ranker weights (April 2023):
  https://github.com/twitter/the-algorithm-ml/blob/main/projects/home/recap/README.md
- Reddit hot sort (archived open-source code):
  https://github.com/reddit-archive/reddit/blob/master/r2/r2/lib/db/_sorts.pyx
- viral-video-master by Josiah Siegel (MIT):
  https://github.com/JosiahSiegel/claude-plugin-marketplace/tree/main/plugins/viral-video-master
