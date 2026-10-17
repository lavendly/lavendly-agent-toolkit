---
name: lavendly-music-video
version: 0.2.0
priority: normal
description: |
  Music videos on the Lavendly MCP with the song as the spine: performance, narrative, abstract and visualizer, dance, lyric moments without rendered text, live-session looks. Maps the track into bars, turns BPM into a cut list of exact trims, attaches the song once as the only music, keeps clips silent, picks shots that work without lip sync.
  Use when: "a music video for my song", "a visualizer", "cut it on the beat", "a dance video", "a chorus clip for Reels".
  Chain: runs the lavendly-director process; lavendly-cost-aware wins spend; lavendly-publish posts; lavendly-cinematic for story scenes.
  NOT for: lip sync to the user's vocal, rendered lyrics, songs over 180 s in one film, another artist's song or likeness.
argument-hint: "[track: its name in the Asset Library, public URL, or 'make one'] [BPM and first downbeat if known] [type] [length] [aspect] [artist look]"
---

# Lavendly Music Video

The song is the film's clock and its only music. Every cut lands on its
grid, every section has its own look, and the picture never fights the
track with sound of its own. This skill turns a song into a song map, a cut
list in milliseconds and shots a model can make without lip sync; the
director's process (intent card, plan, ledger, checks) carries it into
Lavendly.

## Before anything else

- Load lavendly-director when installed and follow its process; the steps
  below name what this genre adds. Without it, the Sequence below is
  complete on its own.
- `get_status` and `get_ledger` once per session. Never claim or deny a
  capability or model from memory; `get_schema` when in doubt.
- Find the track first. It decides the length, the grid and the cost.
  Without a track, offer to make one (below); no clip is paid before the
  user confirms the score.
- Ask for what you cannot hear: the BPM, the time signature if not 4/4, the
  time of the first downbeat in the file, and the start times of the
  sections (intro, verse, chorus, bridge, drop). One question with all of
  them. If the user does not know, give them the tap method in
  [references/beat-maths.md](references/beat-maths.md).
- Rights: the user's own song or one they hold a licence for. Name the rule
  once when they name a commercial release; never publish without their
  confirmation that they hold the rights.

## How the track enters Lavendly

| The user has | Do |
|---|---|
| Already in Lavendly ("my song", an earlier upload) | `list_assets` with `type` audio (uploads are filed as audio; generated scores as music, search that next) and the song's name; show the match by name when more than one fits; attach its `url` |
| A file on their computer | They upload it to the Asset Library in the Lavendly app; find it with `list_assets` and attach its `url` |
| A public link to the audio file | `import_asset` with `kind` music and the `url`; attach the hosted url it returns |
| A file pasted in the chat | It never reaches you: ask for the Asset Library upload, then `list_assets` |
| No track | Offer a score from `attach_track` synthesis (`mood` plus `duration`, 5 to 120 s, about 3 credits per 30 s), with the tempo and the section timings written into the brief; say you cannot hear it, so the grid is the brief's until the user confirms the times. Order: create the workflow (free), announce the score's credits, attach it to a clip and wire it film-wide (step 11), ask the user to listen and confirm the downbeats, adjust the cut list, and only then `estimate_cost` and pay for clips |

For a chorus cut, set the song's source in-point with `edit_clip` `trim`
`start_ms` on its node, or ask the user to upload an excerpt that starts on
the section (or one bar before it). Upload limits: 50 MB and 10 minutes;
one film is at most 180 s. A generated score may ignore the BPM in its
brief: never promise exact tempo, and have the user confirm the downbeats.

## Sequence

| Step | Call | What this genre adds |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities, credits |
| 2 | ask, write | The track, BPM, downbeat, sections; the song map ([references/beat-maths.md](references/beat-maths.md)) |
| 3 | write | Intent card (director) with continuity mode discontinuous or montage, the type recipe, the motif, the look per section, the artist's locked description |
| 4 | write | Cut list: every cut time in ms from the grid, shot per slot, cut length, model length; trims computed ([references/beat-maths.md](references/beat-maths.md)) |
| 5 | write | Per shot a still prompt (under 500 characters) and a silent motion prompt ([references/prompt-anchors.md](references/prompt-anchors.md)) |
| 6 | show | Song map, section looks, cut list summary, model, rough cost; wait for "go" |
| 7 | `list_assets`, `import_asset` | The track, the artist reference, a style plate: already in Lavendly, `list_assets`; a public link, `import_asset` |
| 8 | `create_workflow` | `shots` in timeline order, one `aspect`, one `videoModel`, `idempotency_key` |
| 9 | `get_workflow`, `update_workflow` | Still prompts on image nodes; references within the cap with a role sentence each |
| 10 | `set_clip_native_audio` | `off` on every clip; an ambience-only clip in a breakdown or intro at `mix` 0.3 to 0.5 ([references/one-track-rule.md](references/one-track-rule.md)) |
| 11 | `attach_track`, `get_workflow_audio` | The song, once: `kind` music, `"scope": "film"`, `url`, `duration` equal to the film, volume 1, `ducking` false; confirm with `get_workflow_audio` that it reaches every clip; only if it does not, `update_workflow` edges to the missing clips; split pieces made later always get their edge ([references/one-track-rule.md](references/one-track-rule.md)) |
| 12 | `estimate_cost` | One line: clips, model, credits, balance after; wait for yes |
| 13 | `generate_scene` | The first chorus shot first (it carries the look), check it, then in order |
| 14 | `get_generation_status`, `get_scene_frame` | Silent polling; a frame per scene |
| 15 | `quality_check` | Per scene; style held to the section's look; no lettering in frame |
| 16 | `edit_clip`, `split_clip`, `move_clip` | Trims to the exact cut lengths (clips play back to back, so trims set every cut); speed to fit a move to a bar; split a long take into pieces (`at_sec` from the clip's start); `move_clip` sets the order (an overlap renders only as a dissolve, with matching fades) |
| 17 | `create_render`, `get_render` | Free |
| 18 | `quality_check`, `get_workflow_audio` | One music track, every clip `off` or a chosen ambience; ask the user to confirm sync at three named times |

## Decision rules

### The song decides

- The edit follows the song's sections: each section gets a look (a place,
  a palette, a light) and a cutting density. Choruses return to the same
  place or motif and escalate; verses are closer and quieter; the bridge
  strips down; the last chorus is the biggest.
- Cut on downbeats. Change shot every 2 to 4 bars in verses, every 1 to 2
  bars in choruses, on beats only in short bursts at a drop. A held shot of
  2 bars after a burst makes the burst land.
- Silence and drops are cut points: the picture changes on the hit after the
  break.
- First frame rhymes with the last: the same place, framing or motif,
  changed.

### Picture without lip sync

- Lavendly cannot sync a mouth to the user's recording. Performance shots
  are built so the mouth does not have to match: wide shots, silhouettes,
  profile and back views, hair or a microphone across the mouth, eyes closed
  between lines, hands on the instrument, a breath before the line.
- A singing close-up is at most one beat long in the cut, or not used. Never
  promise lip sync; say what the video does instead in the plan.
- Generated clips are silent in the mix. Write "silent, no music generated"
  in every motion prompt and set every clip `off`.

### Shots and models

| Type | Recipe | First choice | Value | Draft |
|---|---|---|---|---|
| Performance | [references/performance.md](references/performance.md) | Seedance 2.0 (4 refs, 44 per 5 s) | Seedance 2.0 Fast (11) | Seedance 2.0 Mini (9) |
| Narrative | [references/narrative-mv.md](references/narrative-mv.md) | Veo 3.1 Fast (14 per 4 s) | Kling v3 Standard (15 per 5 s) | Veo 3.1 Lite (10, no refs) |
| Abstract, visualizer | [references/abstract-visualizer.md](references/abstract-visualizer.md) | FLUX 3 Video (34 per 5 s) | Wan 2.7 (12, 4 refs) | Hailuo 3 Max (10, silent) |
| Dance | [references/dance-choreography.md](references/dance-choreography.md) | Kling v3 Pro (20 per 5 s) | Seedance 2.0 Fast | Grok Imagine (9) |
| Lyric moments | [references/lyric-moments.md](references/lyric-moments.md) | Veo 3.1 Fast | Wan 2.7 | Hailuo 3 Max |
| Live session | [references/live-session.md](references/live-session.md) | Kling v3 Pro | Seedance 2.0 Fast | Seedance 2.0 Mini |

- Sound flags do not matter here (clips are `off`), so silent models are
  fair value: Hailuo 3 Max (10 per 5 s), Runway Gen-4.5 (14 per 5 s, 16:9
  and 9:16).
- Per-block pricing: a 3 s cut costs the same as a 5 s generation on
  Seedance, Kling, Wan, Hailuo and Grok. Generate 5 s and trim. On Veo, 4 s
  or 8 s (6 s costs as much as 8 s).
- One long performance take (10 s on Seedance 2.0 Fast, 22 credits) split
  into three or four pieces and intercut with b-roll is cheaper than four
  separate performance clips and keeps the performance continuous.
- One look per film is usually right. A film may still use a different
  model per scene: set `data.videoModel` on that clip with `update_workflow`
  and confirm it in `estimate_cost` `per_scene`.
- Aspect: 9:16 for Shorts, Reels and TikTok; 16:9 for a premiere; 1:1 for a
  visualizer (not on Veo, Runway or Wan 2.6). Never 21:9: the export falls
  back to the 9:16 frame.

### Identity and the artist

- The artist's own likeness only with their consent, from their own photo
  as a reference; never a celebrity, never another artist, never "a singer
  who looks like". A fictional performer gets a locked description like any
  character.
- Performance and dance across many cuts need references: Seedance (4) or
  Wan 2.7 (4) hold a face, an outfit and a stage; opening images are made
  from text, so the locked description goes in every still prompt.
- Discontinuous mode: wardrobe, place and scale may change per section on
  purpose; the motif and the artist's face may not.

### Policy guards

- No real people other than a consenting artist; no other artist's look,
  logo or album art; no brand logos on clothes or instruments.
- No rendered text, lyrics or titles in frame; words the song needs are
  pictured, not written.
- Dance and performance stay non-sexual; no minors in suggestive staging.

## Compatibility

`attach_track` synthesizes music from `mood` plus `duration` on servers that
carry the synthesis update; with a `url` it attaches the user's file. Try the
synthesis form first when no track exists. If the server answers `url
required`, ask the user to make the track in the Lavendly app (Asset
Library), then attach the hosted file by `url`.

## When to stop

- No track and the user declines a generated score: there is no music video
  to cut; offer a narrative short (lavendly-cinematic) instead.
- The song or the cut is over 180 s: propose an edit under 3 minutes or two
  parts.
- The user wants mouths synced to their vocal or lyrics written on screen:
  say plainly that Lavendly does neither; offer the shots that work.
- `sufficient` false or the estimate declined; `needs_browser`; `stalled`
  twice; the same failure twice on one shot.
- A named commercial song with no rights confirmed: stop before publishing.

## UX rules

1. Show the song map first (sections, bars, times), then the looks per
   section, then the cut list summary; one screen.
2. Names and links in chat, never ids or JSON. Models by display name.
3. Say what you cannot hear: the grid comes from the numbers the user gave
   or the brief; ask them to check sync at three named times after render.
4. Silent polling; one line per phase; a frame link per scene.
5. Never present a clip with lettering, a clone or a melted hand as done.
6. The user's language in chat; English in prompts and tool arguments.

## Reference docs

Recipes (structures by length, hook and payoff, camera, light, sound plan,
model picks with credits, prompt pairs, failures, policy):

- [references/performance.md](references/performance.md): the artist performing, without lip sync.
- [references/narrative-mv.md](references/narrative-mv.md): a story cut to the song.
- [references/abstract-visualizer.md](references/abstract-visualizer.md): abstract films, loops, square visualizers.
- [references/dance-choreography.md](references/dance-choreography.md): dancers, moves on the grid, speed to fit.
- [references/lyric-moments.md](references/lyric-moments.md): the key words pictured, never written.
- [references/live-session.md](references/live-session.md): a band in a room, the one-take feel.

Craft and platform:

- [references/beat-maths.md](references/beat-maths.md): BPM to bars to milliseconds to clip lengths, the song map, the cut list, the tap method.
- [references/one-track-rule.md](references/one-track-rule.md): the song attached once, clips silent or ambience only, what to do without a track.
- [references/prompt-anchors.md](references/prompt-anchors.md): the two prompts, silent motion, model dialects, looks per section, banned words.
- [references/mcp-calls.md](references/mcp-calls.md): exact call shapes for the track, the clips, trims and placement.
- [references/troubleshooting.md](references/troubleshooting.md): errors and music video failures with fixes.
