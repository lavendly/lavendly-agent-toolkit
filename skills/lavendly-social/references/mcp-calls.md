# MCP call shapes: social

Exact arguments for short-form builds, imported footage, jump cuts and
loops. Argument names are the live MCP names; placeholders are in angle
brackets. Read real node ids from `get_workflow`: each compiled shot has a
group, an image node (`img_` prefix) and a clip node (`vid_` prefix).

Names, titles, prompts and keys shown are example values; the user's own
film replaces them.

## Probes

`get_status` (voices, providers) and `get_ledger` (credits), once per
session, both free.

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

## `import_asset`: the user's footage and references

```json
{ "kind": "video", "url": "https://example.com/episode-42-part-2.mp4", "filename": "episode-42-part-2.mp4" }
```

Limits on `import_asset`: video 64 MB and 3 minutes, image 25 MB, music
50 MB and 10 minutes, by `url`; inline `data` about 11 MB. Bigger video (up
to 300 MB) goes through the Asset Library upload in the app, then
`list_assets`. Long sources are cut into parts of 3 minutes or less before
import. Media pasted in the chat never reaches you.

It returns a path like `/api/v1/storage/m/<key>`. Use it exactly as
returned on image nodes and tracks; never rewrite it to an absolute https
url (the provider cannot open a signed-in link). A link the user copies
from the app (`https://app.lavendly.ai/api/v1/storage/m/<key>`) goes in as
its `/api/v1/storage/m/<key>` path.

## `create_workflow`: generated shots, vertical

```json
{
  "name": "POV: first day at the bakery",
  "description": "POV short, 15 s, five cuts, one line of voice, one bed.",
  "aspect": "9:16",
  "videoModel": "google/veo-3.1-fast",
  "shots": [
    { "prompt": "<motion prompt, the hook>", "duration": 4 },
    { "prompt": "<motion prompt, shot 2>", "duration": 4 },
    { "prompt": "<motion prompt, shot 3>", "duration": 4 },
    { "prompt": "<motion prompt, shot 4>", "duration": 4 },
    { "prompt": "<motion prompt, the payoff>", "duration": 4 }
  ],
  "idempotency_key": "wf-pov-bakery-2026-10-16"
}
```

Then `get_workflow` and `update_workflow` with each image node's
`data.prompt` set to its still-frame prompt (send the full `nodes` and
`edges` arrays back).

## `create_workflow`: clips from imported footage only

No generation: clip nodes that already carry a video are reused by the
render (read from the render code; confirm the first render plays them).

```json
{
  "name": "Podcast 42, clip: the van story",
  "aspect": "9:16",
  "nodes": [
    {
      "id": "vid_src_1",
      "type": "videoGenerator",
      "position": { "x": 400, "y": 200 },
      "data": { "title": "Source part 2", "video_url": "<url from list_assets or import_asset>", "duration": 180, "aspect": "9:16" }
    }
  ],
  "edges": [],
  "idempotency_key": "wf-pod42-van-2026-10-16"
}
```

Set `duration` to the source part's real length (`metadata.duration_sec`
from `list_assets`, also as `duration_seconds`), or it is treated as 5 s. `estimate_cost` should
show it as already generated: zero clip credits. Read the node id back from
`get_workflow`. Never call `generate_scene` on this node: it would generate
over the import.

A workflow with exactly one clip node goes through the full stitch when it
has a picture edit other than volume and mute (a trim, a crop) or a
captioned voiceover, so the trim, the crop and the captions apply. With
neither, it ships the raw clip.

## `edit_clip`: cut the moment, reframe to vertical

```json
{
  "workflow_id": "<id>",
  "node_id": "<clip id>",
  "edits": {
    "trim": { "start_ms": 61500, "end_ms": 93800 },
    "crop": { "x": 656, "y": 0, "w": 608, "h": 1080 }
  }
}
```

`trim` is in source milliseconds. `crop` has two modes (read from the
render code): with x and y both 0 it reframes to the shape w:h, centred
(`{ "x": 0, "y": 0, "w": 9, "h": 16 }` is a centred vertical crop); any
other x or y is an exact pixel box in the source, clamped to it. A speaker
off centre in a 1920x1080 source: x 300, y 0, w 608, h 1080 keeps a window
starting 300 px from the left (use x 1, not 0, for a box at the left
edge). A crop from 1080p to vertical leaves 608 px of width: it looks soft
on 1080p exports; say so.

## `split_clip`: jump cuts and pause removal

```json
{ "workflow_id": "<id>", "node_id": "<clip id>", "at_sec": 12.4 }
```

`at_sec` is seconds into the clip's own box (rate-aware), not film time.
Split at the start and end of a pause, then remove the middle piece's node
with `update_workflow` (full `nodes` and `edges` arrays). Clips play back to
back in order, so the pieces join with no gap; `move_clip` sets the order
and never adds space (an overlap renders only as a dissolve). The second half of a split gets no audio
edges: re-wire any track that must cover it.

Each piece must stay at least 0.25 s long. For a generated 8 s take, the
same moves turn one clip into a two or three cut jump sequence.

## Two models in one video

`shots` take only the top-level `videoModel`. To give one scene another
model (a better model on the hook, a presenter model next to b-roll), set
`data.videoModel` on that clip node with `update_workflow` (full `nodes`
array), then run `estimate_cost` and check that `per_scene` names the
intended model for each scene before any spend. Keep one look: mix models
of one family, or check one frame of each before generating the rest.

## `set_clip_native_audio`

```json
{ "workflow_id": "<id>", "clip_id": "<clip id>", "native_audio": { "mode": "native", "volume": 1 } }
```

`native` for imported speech and for a line spoken in a generated clip;
`mix` 0.2 to 0.4 under a voiceover; `off` for silent b-roll.

## `attach_track`: the voice from 0.0 s, with captions

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "voiceover",
  "scope": "film",
  "text": "POV: it's your first day and the oven is already on fire.",
  "voice": "jessica",
  "subtitleStyle": "tiktok",
  "idempotency_key": "vo-<workflow id>"
}
```

Then confirm `startTime` is 0 with `update_track` if the track was moved
(`startTime` is where the track starts on its mix clock: the film for a
track wired to every clip, the clip's start for a per-clip track). One
voice for the video.

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

## `attach_track`: the bed

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "music",
  "scope": "film",
  "mood": "Bright, light-footed bed: muted electric guitar plucks and a soft kick at about 120 BPM, steady from the first second, a two-beat stop just before the payoff, then one last bar.",
  "duration": 15,
  "ducking": true,
  "volume": 0.3,
  "idempotency_key": "music-<workflow id>"
}
```

`duration` equals the video's length. `mood` or `url` is required. A tempo
in the brief is a request the provider may not follow: never promise exact
BPM; ask the user to confirm the downbeats by ear before cutting to them.

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

```text
5 shots on Veo 3.1 Fast: clips 70, opening images 10, voice and bed about 3 when attached; 83 total, 117 left after. Go ahead?
```

## `generate_scene`: the hook first

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "max_credits": 16, "idempotency_key": "gen-<workflow id>-vid_1" }
```

Open its first frame with `get_scene_frame` (frame first) before paying for
the rest: the hook frame decides the video.

## Loops

`edit_clip` `loop` is accepted but ignored by the export. Repeat a clip by
adding a second clip node with the same `data.video_url` through
`update_workflow`, after the original (no generation credits).

Play a copy backwards (a ping-pong loop): the same copy, then:

```json
{ "workflow_id": "<id>", "node_id": "<copy id>", "edits": { "reverse": true } }
```

`reverse` reverses the copy's audio too: set that clip to `off` or mute it.

## Render and check

`create_render` (free) with an idempotency key, `get_render` until done,
then `quality_check` without `node_id` and with `expect_audio` true.
