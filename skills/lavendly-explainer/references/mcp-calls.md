# MCP call shapes: explainer

Exact arguments for a narrated explainer, plus imported real footage.
Argument names are the live MCP names; placeholders are in angle brackets.
Read real node ids from `get_workflow`: compiled shots give a group, an
image node (`img_` prefix) and a clip node (`vid_` prefix) per scene.

## Probes

`get_status` and `get_ledger`, once per session, both free. `get_status`
gives the voice route (`models.tts_voices`) and provider readiness; it lists
no video models.

## `list_assets`: media already in Lavendly

When the user says the file is already in Lavendly (their library, an
earlier upload, "the clip I uploaded"), find it there first:

```json
{ "type": "video", "query": "<the name or words the user used>", "limit": 20 }
```

`type` is image, video, audio, voice or music; `query` matches the asset
name; `limit` 1 to 200 (default 50), newest first. Returns
`{ assets, count, total }`; each asset has `id`, `name`, `type`, `url`,
`thumbnail_url` and `metadata` (`metadata.duration_sec` for video and
audio), scoped to the workspace and project privacy. When more than one
could fit, show the names and let the user pick. Use the `url` exactly as
returned: `data.url` on an image node (a first frame or a reference),
`data.video_url` on a clip node, or the `attach_track` `url`. An uploaded
video as a clip costs zero generation credits; set `data.duration` (and
`duration_seconds`) from `metadata.duration_sec`, or it is treated as 5 s. Not
there: a public URL goes through `import_asset`; media pasted in the chat
never reaches you, so ask the user to upload it to the Asset Library and
list again.

## Real footage, screen recordings, photos: `import_asset`

```json
{ "kind": "video", "url": "https://example.com/repotting-closeup.mp4", "filename": "repotting-closeup.mp4" }
```

Limits on `import_asset`: image 25 MB, video 64 MB and 3 minutes, music
50 MB and 10 minutes, by `url`; inline `data` about 11 MB. Larger video (up
to 300 MB) goes through the Asset Library upload in the app, then
`list_assets`. Media pasted in the chat never reaches you. Returns the
hosted url.

It returns a path like `/api/v1/storage/m/<key>`. Use it exactly as
returned on image nodes and tracks; never rewrite it to an absolute https
url (the provider cannot open a signed-in link). A link the user copies
from the app (`https://app.lavendly.ai/api/v1/storage/m/<key>`) goes in as
its `/api/v1/storage/m/<key>` path.

## `create_workflow`: scenes in order

```json
{
  "name": "Why octopuses have three hearts",
  "description": "Faceless explainer, 16 s, four scenes, narration and one score.",
  "aspect": "9:16",
  "videoModel": "google/veo-3.1-fast",
  "shots": [
    { "prompt": "<motion prompt, scene 1>", "duration": 4 },
    { "prompt": "<motion prompt, scene 2>", "duration": 4 },
    { "prompt": "<motion prompt, scene 3>", "duration": 4 },
    { "prompt": "<motion prompt, scene 4>", "duration": 4 }
  ],
  "idempotency_key": "wf-octopus-hearts-2026-10-16"
}
```

Durations from the model's exact list (Veo: 4, 6, 8). Only the top-level
`videoModel` and `aspect` apply; the export takes the first clip's aspect.
The shot text is sent to the video model as written, and its first 500
characters also become the opening-image prompt until you replace it.

## `update_workflow`: still-frame prompts, references, imported clips

Read the workflow, then send the full `nodes` and `edges` arrays back with
the changes (the server replaces both arrays):

1. Each image node's `data.prompt` becomes that scene's still-frame prompt.
2. A reference node, when a recurring object or style must hold (not on
   Veo 3.1 Lite, which takes none):

```json
{
  "id": "ref_style",
  "type": "imageSource",
  "position": { "x": 80, "y": -260 },
  "data": { "title": "Reference: paper diorama style", "url": "<hosted url>", "imgSource": "upload", "reference": true }
}
```

and one edge to each clip that needs it, after the scene's own image edge:

```json
{ "id": "ref_style->vid_2", "source": "ref_style", "target": "vid_2", "data": { "mode": "reference" } }
```

Say the reference's one job in that clip's motion prompt.

3. Imported footage as a ready clip: a clip node that already carries a
   video is reused by the render and not generated again (read from the
   render code; confirm on the first render that it plays):

```json
{
  "id": "vid_real_1",
  "type": "videoGenerator",
  "position": { "x": 1400, "y": 200 },
  "data": { "title": "Real: repotting close-up", "video_url": "<url from list_assets or import_asset>", "duration": 6, "aspect": "9:16" }
}
```

Set `duration` to the clip's real length (`metadata.duration_sec` from
`list_assets`, also as `duration_seconds`), or it is treated as 5 s.
Place it in order with `move_clip` (`timeline_start_sec`) or by its
position; trim it with `edit_clip`. `estimate_cost` lists it as already
generated.

4. Frame chaining for a continuous action: `get_scene_frame` with frame
   last on scene N, then `/api` plus that path on scene N+1's image node
   `data.url` before generating scene N+1. Re-anchor from the hero reference
   after two or three hops.

`get_scene_frame` returns `frame_url` as a path like
`/v1/storage/images/thumb_<id>.jpg`. Prefix it with `/api` before writing it
to the next image node's `data.url` (`/api/v1/storage/images/thumb_<id>.jpg`);
the path without `/api` is dropped and the clip runs without a first frame.
Never use an absolute https url. Frame last reads the raw clip, not the
trimmed window: chain only from a scene that is not trimmed at its end, or
describe the end state in words instead.

## Two models in one video

`shots` take only the top-level `videoModel`. To give one scene another
model (a better model on the hook, a presenter model next to b-roll), set
`data.videoModel` on that clip node with `update_workflow` (full `nodes`
array), then run `estimate_cost` and check that `per_scene` names the
intended model for each scene before any spend. Keep one look: mix models
of one family, or check one frame of each before generating the rest.

## `set_clip_native_audio`: every clip

```json
{ "workflow_id": "<id>", "clip_id": "vid_1", "native_audio": { "mode": "mix", "volume": 0.3 } }
```

`mix` 0.2 to 0.4 under narration, `native` only for the sound that is the
point, `off` for silent illustration. Imported footage with useful sound:
`native` or `mix` 0.5.

## `attach_track`: the voiceover, whole script

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "voiceover",
  "scope": "film",
  "text": "Octopuses have three hearts.\nTwo pump blood through the gills.\nThe third pumps it around the body.\nWhen an octopus swims, that third heart stops.\nSo most octopuses would rather crawl.",
  "voice": "brian",
  "subtitleStyle": "tiktok",
  "idempotency_key": "vo-<workflow id>"
}
```

Up to 4,000 characters are synthesized (the node keeps the first 800 as
text). `subtitleStyle`: `youtube` for 16:9, `tiktok` or `reels` for 9:16,
`caption` for boxed training captions, `off` on request.

Voices: no `voice` means Rachel, the default. Read `get_status`
`models.tts_voices`. When it lists ElevenLabs voices (direct ElevenLabs),
pass a premade id: Rachel 21m00Tcm4TlvDq8ikWAM, Adam pNInz6obpgDQGcFmaJgB,
Bella EXAVITQu4vr4xnSDxMaL, Antoni ErXwobaYiN019PkySvjV, Elli
MF3mGyEYCl7XYWbV9V6O, Josh TxGEqnHWrfWFTfGW9XjX, Arnold VR6AewLTigWG4xSOukaG,
Sam yoZ06aMxZJJ28mfd3POQ. When it lists the OpenAI names (alloy, echo,
fable, onyx, nova, shimmer), voice runs on ElevenLabs through OpenRouter and
every one of those names plays as Rachel: pass one of sarah, george, adam,
alice, bella, bill, brian, callum, charlie, chris, daniel, eric, harry,
jessica, laura, liam, lily, matilda, river, roger, will. Script up to 4,000
characters per voiceover (longer is cut), priced per character.

Captions burn only from a synthesized voiceover (`text`, which keeps word
timings) with an explicit `subtitleStyle` (`off`, `tiktok`, `reels`,
`youtube`, `caption`), one style per film; a one-scene film burns them too.
A voiceover attached by `url`, native dialogue and imported speech get none.

## `attach_track`: one score

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "music",
  "scope": "film",
  "mood": "Curious, light underwater feel: soft marimba and a low bowed bass at about 80 BPM. Opens on a single plucked note with the hook, builds a gentle pulse through the three facts, settles on a held chord under the last line. Instrumental, sparse, leaves room for the voice.",
  "duration": 16,
  "ducking": true,
  "volume": 0.3,
  "idempotency_key": "music-<workflow id>"
}
```

`duration` 5 to 120, equal to the film length (the block cuts the score at
its end). `mood` or `url` is required. A tempo in the brief is a request the
provider may not follow: never promise exact BPM.

Levels: attach-time music `volume` 0 to 2 is read as a fraction (0.35
becomes 35 percent). A voiceover's `volume` and every `update_track`
`volume` are stored as a percent with no conversion: never pass `volume` on
a voiceover (the default 100 is unity), and when a level must change later
pass `update_track` `volume` in percent (35 for a music bed, 100 for unity),
never 0.35.

## Make the score and the narration film-wide: `scope` film

A score or a narration plays across the film only when its node has an edge
to every clip node (type videoGenerator). Attach it with `"scope": "film"`:
the server adds an edge from the new node to every clip in the workflow and
lists them in the response's `clip_ids`. Then call `get_workflow_audio` and
confirm the track reaches every clip. Without `scope` (default `"clip"`) the
node is wired to one clip only: mixed into that clip alone, and a track
longer than the clip freezes that clip's last frame for the rest of the
track. `scope` wires the clips that exist at attach time; a clip added or
split later needs its own edge.

Only if `get_workflow_audio` shows the track on fewer clips (an older or
self-hosted server that drops the argument), add the edges yourself:
`get_workflow`, then `update_workflow` with the full `nodes` and `edges`
arrays and one more edge per other clip, copied from the edge `attach_track`
made (same shape, new `id` and `target`):

```json
{
  "workflow_id": "<id>",
  "nodes": [ "<every node, unchanged>" ],
  "edges": [
    "<every existing edge>",
    { "id": "<music node id>->vid_2", "source": "<music node id>", "target": "vid_2" },
    { "id": "<music node id>->vid_3", "source": "<music node id>", "target": "vid_3" },
    { "id": "<voiceover node id>->vid_2", "source": "<voiceover node id>", "target": "vid_2" },
    { "id": "<voiceover node id>->vid_3", "source": "<voiceover node id>", "target": "vid_3" }
  ]
}
```

A voice line that belongs to one scene stays on that clip only. Film-wide
music ducks only under film-wide voices, never under a per-scene line.

Then a clean ending: the block (`duration`) cuts the score at its end, and a
fade on the last clip does not fade a film-wide score. Fade the music node
itself:

```json
{ "workflow_id": "<id>", "node_id": "<music node id>", "edits": { "fade_out_ms": 1500 } }
```


## `estimate_cost`, then approval

```json
{ "workflow_id": "<id>" }
```

Announce in one line and wait:

```text
4 scenes on Veo 3.1 Fast: clips 56, opening images 8, voice and score about 3 more when attached; 67 total, 133 left after. Go ahead?
```

## `generate_scene`: scene 1 first

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "max_credits": 16, "idempotency_key": "gen-<workflow id>-vid_1" }
```

`max_credits` is that scene's `per_scene` line plus its opening image.
Poll `get_generation_status` every 5 to 10 s, silently.

## Checks

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "expect_audio": false }
```

`quality_check` per scene (`expect_audio` false when native sound is off or
under narration), then `get_scene_frame` (mid, and last for the cut). On
the rendered film omit `node_id` and set `expect_audio` true.

## `edit_clip`: cut on the sentence

```json
{ "workflow_id": "<id>", "node_id": "vid_2", "edits": { "trim": { "start_ms": 400, "end_ms": 3900 } } }
```

Trim the model's warm-up (the first 300 to 600 ms) and any tail. A
chapter break: `fade_out_ms` 300 on the outgoing clip, `fade_in_ms` 300 on
the incoming. `split_clip` with `at_sec` (seconds into the clip, not film
time) splits one clip into two beats. Clips play back to back; `move_clip`
sets the order, and an overlap renders only as a dissolve (both fades equal
to the overlap). Colour: contrast and saturation are multipliers (1 neutral);
`loop`, `resize`, `stabilize` and `lut_id` are ignored by the export.

## `create_render`, `get_render`

```json
{ "workflow_id": "<id>", "idempotency_key": "render-<workflow id>" }
```

Free. Poll `get_render` until done, then the whole-film `quality_check`.
