---
name: lavendly-social
version: 0.2.0
priority: normal
description: |
  Make short-form social video on the Lavendly MCP: TikTok, Reels, Shorts, LinkedIn and X formats with a first-second hook, a cut every 2 to 3 s, a payoff before the end, captions clear of the platform buttons, phone-footage realism, honest AI presenters, clips from imported long videos.
  Use when: "a TikTok about", "POV video", "day in the life", "top 5 video", "storytime", "clip my podcast", "a looping Short", "faceless channel", "talking-head avatar".
  Chain: lavendly-director runs the process; lavendly-storyteller for one-shot posts; lavendly-explainer for lessons; lavendly-publish posts.
  NOT for: copying a creator's video or voice, trending audio, AI people as real testimony, lip sync to an attached voice, media pasted in chat.
argument-hint: "[idea or source video url] [format] [platform] [duration 6..90] [voice or 'native sound']"
---

# Lavendly Social

Short-form is decided in the first second and kept by a change every two
to three seconds. This skill holds what top creators know about hooks,
pacing, payoffs, loops, captions, safe zones and platform norms, applied
exactly to what Lavendly's models and tools can do: no rendered titles, no
lip sync to an attached voice, captions burned from narration, cuts that
cost a clip each. lavendly-director owns the shared process (intent card,
plan, ledger, checks, repair); lavendly-storyteller owns the single-shot
post. This skill supplies the format decisions on top.

## Before anything else

- `get_status` and `get_ledger` once per session; `get_schema` when unsure.
- Load lavendly-director when installed and follow its process; the
  Sequence below is complete without it. A post that is one shot under
  12 s goes to lavendly-storyteller.
- Write the platform card first: platform, aspect, length, sound default,
  safe zone, caption style ([references/platform-specs.md](references/platform-specs.md)).
- Pick the format recipe (first table below).
- Trends: you cannot see what is trending today. Ask the user to name or
  describe the format; build the format, never a copy of a specific video.
- Every name, product, place and story in this skill and its references is an
  example. The user's brief replaces it; never carry one into their film.

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities, voices, credits |
| 2 | write | Platform card and format; intent card (type social, continuity flexible, discontinuous for montage formats) |
| 3 | write | Three hook options from [references/hooks-library.md](references/hooks-library.md), each with its payoff; pick one; the muted-viewer test |
| 4 | write | Script inside 2.5 words per second, spoken from 0.0 s; beat sheet with a change every 2 to 3 s ([references/retention.md](references/retention.md)) |
| 5 | write | Shot list from the recipe; still-frame and motion prompts ([references/prompt-anchors.md](references/prompt-anchors.md), [references/phone-footage.md](references/phone-footage.md) for the native look) |
| 6 | show | Hook, script, shot list (one line each), look, sound, model, credits; wait for "go" |
| 7 | `list_assets`, `import_asset` | The user's footage, a face or product reference, a long video to clip: already in Lavendly, `list_assets` (show the name when more than one fits); a public URL, `import_asset`; a clip takes `data.duration` from `metadata.duration_sec` |
| 8 | `create_workflow` | `shots`, `aspect` (9:16 unless the card says otherwise), `videoModel`, `idempotency_key` ([references/mcp-calls.md](references/mcp-calls.md)) |
| 9 | `get_workflow`, `update_workflow` | Still-frame prompts; reference node with its role; imported clips as ready nodes |
| 10 | `set_clip_native_audio` | Per clip: `mix` under voice, `native` for spoken lines and the sound that is the joke, `off` for silent b-roll |
| 11 | `attach_track`, `get_workflow_audio` | Voiceover from 0.0 s with a caption style; one music bed with `ducking: true`; both with `"scope": "film"`, confirmed with `get_workflow_audio` to reach every clip (only if not, `update_workflow` edges to the missing clips) ([references/mcp-calls.md](references/mcp-calls.md)) |
| 12 | `estimate_cost` | Announce in one line; wait for a yes |
| 13 | `generate_scene` | The hook scene first; open its first frame; then the rest in order |
| 14 | `get_generation_status`, `get_scene_frame`, `quality_check` | Silent polling; per scene: the hook frame, identity, no drawn text |
| 15 | `edit_clip`, `split_clip`, `move_clip` | Trim each clip to its best 1.5 to 3 s; jump cuts; loops |
| 16 | `create_render`, `get_render` | Free |
| 17 | `quality_check`, `get_workflow_audio` | Whole video: muted watch, safe zones, payoff timing, loop seam; deliver with a post caption; posting is lavendly-publish |

## Decision rules

### Format routing

| The brief | Recipe | Length that works | Lead sound |
|---|---|---|---|
| "POV: you are ..." | [references/recipe-pov.md](references/recipe-pov.md) | 7 to 20 s | Native, one line |
| A trend or meme format | [references/recipe-trends-memes.md](references/recipe-trends-memes.md) | 6 to 15 s | The joke's sound, original bed |
| A creator or avatar speaking to camera | [references/recipe-talking-head.md](references/recipe-talking-head.md) | 15 to 45 s | Native speech or voice over a silent presenter |
| A day, a routine, a vlog | [references/recipe-day-in-the-life.md](references/recipe-day-in-the-life.md) | 15 to 45 s | Voice and ambience |
| Top 3, top 5, ranking, "things I" | [references/recipe-listicle.md](references/recipe-listicle.md) | 15 to 45 s | Voice |
| A story told in first person | [references/recipe-storytime.md](references/recipe-storytime.md) | 30 to 60 s | Voice |
| An opinion or take on a topic | [references/recipe-commentary.md](references/recipe-commentary.md) | 20 to 60 s | Voice |
| Best moments of a podcast or long video | [references/recipe-clips-from-footage.md](references/recipe-clips-from-footage.md) | 15 to 55 s | The source's own sound |
| A seamless loop | [references/recipe-loops.md](references/recipe-loops.md) | 5 to 15 s | Native or none |
| A recurring faceless series | [references/recipe-faceless-channel.md](references/recipe-faceless-channel.md) | 20 to 45 s | Voice and bed |

### The first second

- Frame 0 is the best frame of the video: the subject large, legible,
  already in motion or mid-expression. Never a fade from black, a logo, an
  establishing wide or an empty room.
- The spoken hook starts at 0.0 s (the voiceover at `startTime` 0) and
  lands by 2 s: six words or fewer before its first full stop. Captions show
  it as it is spoken; there is no other on-screen text.
- One open question per hook. The hook and the payoff make the same
  promise; a hook the video does not pay off is a lie and kills the next
  video's reach.

### Pace and the cost of a cut

- A visual change every 2 to 3 s on TikTok, Reels and Shorts: a new shot,
  a size change, a jump cut, a new place or a sound hit. LinkedIn and X
  tolerate 3 to 5 s.
- Every cut is a clip, and every clip is paid. Plan one clip per cut,
  generate 4 or 5 s, and trim to the best 1.5 to 3 s window with
  `edit_clip`. One continuous 8 s take split with `split_clip` into two or
  three windows gives a jump-cut sequence for the price of one clip.
- One action per clip; vary shot size every cut; never the same camera
  move twice in a row.

### Payoff and ending

- The payoff lands by 85 percent of the runtime and is held at least 1.5 s.
  The video ends on the payoff, a loop back to frame 0, or one specific
  question. No "follow for more" outro, no end card, no fade out.
- A comment prompt is specific and easy to answer ("Which one did I get
  wrong?"); never bait, never fake controversy.

### Look

- Decide native or polished. Native (phone, selfie, vlog, POV) follows
  [references/phone-footage.md](references/phone-footage.md): who filmed it,
  on what device, in what year, and one imperfection per shot, with the
  clean-frame line (no recording dot, no battery icon, no timestamp).
  Polished creator looks use the director's light and lens rules.
- Vertical framing: the face or subject in the band from 15 to 55 percent
  of frame height; nothing that matters in the bottom 30 percent.

### People on camera

- AI people are never presented as real people giving testimony: no "I
  tried this and it worked" from a generated face, no fake customer, no
  fake expert, no fake eyewitness. A generated host is a character; the
  post caption says the video is AI-generated.
- No real person's likeness or voice, no cloned creator.
- Lavendly cannot sync a generated mouth to an attached voice. Speech on
  camera comes from a native-audio model saying one line per 4 to 8 s clip
  in medium close-up, locked camera, one face; everything else is a voice
  over a presenter whose mouth is closed or out of view
  ([references/recipe-talking-head.md](references/recipe-talking-head.md)).

### Captions and safe zones

- Captions burn from the voiceover's word timings: `tiktok` (bold, three
  words per chunk) or `reels` (minimal, four) on vertical, `youtube` on
  16:9, `caption` (boxed) on LinkedIn. Clips whose speech is native or
  imported get no burned captions from the MCP: say so and point to the
  platform's auto-captions or the app.
- Captions sit at the bottom by default, where TikTok and Reels put their
  buttons and description. Keep the picture's key content in the upper two
  thirds; the brand-kit caption position does not reach an MCP render.
- Lines: 42 characters at most, 2 lines, about 17 characters per second;
  short spoken sentences make readable chunks.

### Sound

- A voice and one original bed (`ducking: true`, 0.25 to 0.35 under voice,
  up to 0.8 for a music-led loop), or native sound alone. Trending and
  commercial songs are never attached; the user adds a platform sound in
  the platform's app when posting, from its licensed library.
- Under voice every clip is `mix` 0.2 to 0.4 with "No music." in the motion
  prompt; a clip whose sound is the joke stays `native`.

### Models and credits

| Pick | Model | Why | 15 s, 5 cuts | 30 s, 10 cuts |
|---|---|---|---|---|
| Default | Veo 3.1 Fast | Phone realism, native speech and sound, 9:16 | 83 | 164 |
| Value (720p exports on Free and Starter anyway) | Seedance 2.0 Mini | 9 per 4 to 5 s clip, sound, 4 references | 58 | 114 |
| Recurring face or product | Seedance 2.0 Fast or Wan 2.7 | 4 references | 68 to 73 | 134 to 144 |
| Presenter with voiceover | HeyGen Video 1 | People-centric, 7 per 5 s clip, silent | 48 | 94 |
| Body motion, dance-like action | Kling v3 Pro | Human movement | 113 | 224 |
| Draft | Veo 3.1 Lite | 10 per 4 s; no references | 63 | 124 |

Totals include opening images (2 each), voice (1) and the bed (2 or 3).
Details and per-recipe builds: [references/models-and-credits.md](references/models-and-credits.md).

### Versions and aspects

- 9:16 for TikTok, Reels, Shorts; 1:1 or 9:16 for LinkedIn; 16:9 or 1:1
  for X. The export takes the first clip's shape; another shape is a second
  render of a second workflow, never a crop promised as free.
- Over 90 s is not a short: offer parts. The export stops at 180 s.

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the music from `mood`
plus `duration` on servers that carry the synthesis update. Try that form
first. If the server answers `url required`, ask the user to make the voice
or the music in the Lavendly app (Asset Library), then find it with
`list_assets` and attach its `url`. A voiceover attached by `url` has no word timings and gets no
burned captions; say so.

## When to stop

- The brief asks to recreate a specific creator's video, voice, face or
  catchphrase, or to use a song the user does not own: decline that part in
  one line and offer the format with original material.
- A generated person would present a testimonial, a review, a medical or
  financial result, or an eyewitness account as real: reshape to a labelled
  dramatisation or the user's own footage.
- A trend that is dangerous to copy (a stunt, a challenge that harms), or
  that targets a real private person: decline.
- `sufficient` is false, or the user declines the estimate.
- `needs_browser`, `stalled` twice, the same failure twice: as
  lavendly-director says.
- Media pasted in the chat: ask for an Asset Library upload, then
  `list_assets`; or a public URL, then `import_asset`.

## UX rules

1. Lead with three hook options in one line each; the user picks.
2. Show the script with seconds, then the shots; one screen.
3. Say plainly what Lavendly will not do for this format (titles, lip sync,
   trending audio) and what the user adds in the app or at posting.
4. Names and links, never ids or JSON; models by display name; silent
   polling; a frame link for the hook scene before the rest is paid for.
5. Deliver the video with a post caption draft: hook under 15 words, one
   line of value, the AI disclosure where needed, three relevant hashtags at
   most. Posting needs an explicit yes and belongs to lavendly-publish.
6. The user's language in chat; English in prompts and tool arguments; the
   narration in the audience's language.

## Reference docs

- [references/hooks-library.md](references/hooks-library.md): visual and spoken hooks for the first 1 to 3 s, by goal.
- [references/retention.md](references/retention.md): open loops, interrupts with numbers, payoff timing, loops, comment prompts, curve fixes.
- [references/platform-specs.md](references/platform-specs.md): TikTok, Reels, Shorts, LinkedIn, X: shapes, lengths, safe zones, captions, covers.
- [references/phone-footage.md](references/phone-footage.md): who filmed it, device, year, defects, one imperfection per shot.
- [references/models-and-credits.md](references/models-and-credits.md): models, lengths, references, sound, credits, builds.
- [references/prompt-anchors.md](references/prompt-anchors.md): the two prompts, social style lines, dialects, banned words.
- [references/mcp-calls.md](references/mcp-calls.md): call shapes, imported footage, jump cuts, loops.
- [references/troubleshooting.md](references/troubleshooting.md): failures and fixes.
- [references/recipe-pov.md](references/recipe-pov.md)
- [references/recipe-trends-memes.md](references/recipe-trends-memes.md)
- [references/recipe-talking-head.md](references/recipe-talking-head.md)
- [references/recipe-day-in-the-life.md](references/recipe-day-in-the-life.md)
- [references/recipe-listicle.md](references/recipe-listicle.md)
- [references/recipe-storytime.md](references/recipe-storytime.md)
- [references/recipe-commentary.md](references/recipe-commentary.md)
- [references/recipe-clips-from-footage.md](references/recipe-clips-from-footage.md)
- [references/recipe-loops.md](references/recipe-loops.md)
- [references/recipe-faceless-channel.md](references/recipe-faceless-channel.md)
