# MCP call shapes: motion design

Exact arguments for product renders, idents, title plates and loops.
Argument names are the live MCP names; placeholders are in angle brackets.
Compiled shots get a group `g_<suffix>`, an image node `img_<suffix>` and a
clip node `vid_<suffix>`; read the real ids from `get_workflow`.

## 1. Probes (free, once per session)

`get_status`, `get_ledger`; `get_schema` when an argument is in doubt.

## 2. `import_asset`: packshots, plates, the user's art

### Already in Lavendly: `list_assets`

When the user says the file is already in Lavendly (their library, an
earlier upload, "my packshot"), find it there first:

```json
{ "type": "image", "query": "<the name or words the user used>", "limit": 20 }
```

`type` is image, video, audio, voice or music; `query` matches the asset
name; `limit` 1 to 200 (default 50), newest first. Returns
`{ assets, count, total }`; each asset has `id`, `name`, `type`, `url`,
`thumbnail_url` and `metadata` (`metadata.duration_sec` for video and
audio), scoped to the workspace and project privacy. When more than one
could fit, show the names and let the user pick. Use the `url` exactly as
returned: `data.url` on an image node (a first frame or a reference),
`data.video_url` on a clip node, or the `attach_track` `url`. Not
there: a public URL goes through `import_asset`; media pasted in the chat
never reaches you, so ask the user to upload it to the Asset Library and
list again.

```json
{ "kind": "image", "url": "https://example.com/bottle-front.png", "filename": "bottle-front.png" }
```

A designed sound or a sonic logo the user owns:

```json
{ "kind": "music", "url": "https://example.com/brand-motif.wav", "filename": "brand-motif.wav" }
```

Each returns a hosted url. Media pasted in the chat never reaches you: ask
for an Asset Library upload (then `list_assets`) or a public URL.

It returns a path like `/api/v1/storage/m/<key>`. Use it exactly as
returned on image nodes and tracks; never rewrite it to an absolute https
url (the provider cannot open a signed-in link). A link the user copies
from the app (`https://app.lavendly.ai/api/v1/storage/m/<key>`) goes in as
its `/api/v1/storage/m/<key>` path.

## 3. `create_workflow`

```json
{
  "name": "Bottle launch, 15 s",
  "description": "Material macro, hero orbit, pack shot. One bottle, infinite black.",
  "aspect": "16:9",
  "videoModel": "google/veo-3.1-fast",
  "shots": [
    { "prompt": "<motion prompt, shot 1>", "duration": 4 },
    { "prompt": "<motion prompt, shot 2>", "duration": 4 },
    { "prompt": "<motion prompt, shot 3>", "duration": 8 }
  ],
  "idempotency_key": "wf-bottle-launch-15"
}
```

`prompt` is the motion prompt, sent as written; its first 500 characters
seed the opening image until you replace the image prompt. Durations from
the model's exact list. Only the top-level `videoModel` and `aspect` apply.

## 4. `get_workflow`, then `update_workflow`

Read the image node (`img_...`) and clip node (`vid_...`) per scene. Then
one `update_workflow` with the full `nodes` and `edges` arrays:

- Generated still: the image node's `data.prompt` becomes the still-frame
  prompt (under 500 characters).
- Real packshot as the opening frame (the strongest product lock): set the
  image node's `data.url` to the hosted packshot; it is not regenerated and
  no opening image is charged.
- References: one node per image, wired into every clip after the scene's
  own image edge, within the cap (4 on Seedance and Wan 2.6 and 2.7, 2 on
  the rest, none on Veo 3.1 Lite).

```json
{
  "workflow_id": "<id>",
  "nodes": [
    "<every existing node>",
    { "id": "img_1", "type": "imageSource", "data": { "url": "<hosted packshot url>", "prompt": "<still prompt kept for the record>" } },
    { "id": "ref_side", "type": "imageSource", "position": { "x": 80, "y": -260 },
      "data": { "title": "Reference: bottle side profile", "url": "<hosted side view url>", "imgSource": "upload", "reference": true } }
  ],
  "edges": [
    "<every existing edge, each scene's own image edge first on its clip>",
    { "id": "ref_side->vid_1", "source": "ref_side", "target": "vid_1", "data": { "mode": "reference" } },
    { "id": "ref_side->vid_2", "source": "ref_side", "target": "vid_2", "data": { "mode": "reference" } }
  ]
}
```

The motion prompt carries the role sentence for each wired reference.

## 5. Audio

```json
{ "workflow_id": "<id>", "clip_id": "vid_1", "native_audio": { "mode": "native", "volume": 1 } }
```

`native` for designed SFX and ASMR, `mix` at 0.3 to 0.5 under narration or a
motif, `off` for silent models, music edits and reversed loop segments.

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "music",
  "scope": "film",
  "mood": "A rising three-note marimba figure over soft felt piano, landing on a resolved major chord at 4 s, then a short natural decay into silence. Instrumental.",
  "duration": 6,
  "ducking": true,
  "volume": 0.8,
  "idempotency_key": "music-<workflow id>"
}
```

A voiceover is the same call with `kind` voiceover, `text`, `voice` and
`subtitleStyle`, and no `volume`. Fallback when the server answers `url
required`: the same call with `url` set to a hosted file (a voiceover by
`url` gets no captions). A tempo in a brief is a request the provider may
not follow: never promise exact BPM; ask the user to confirm the downbeats
by ear before trimming to the bar grid.

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


## 6. `estimate_cost` and `generate_scene`

```json
{ "workflow_id": "<id>" }
```

Announce in one line, wait for a yes, then scene 1 alone:

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "max_credits": 16, "idempotency_key": "gen-<workflow id>-vid_1" }
```

`max_credits` is the scene's `per_scene` line plus its opening image.
`get_generation_status` every 5 to 10 s, silently.

## 7. `get_scene_frame`

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "frame": "last" }
```

- `first` and `last` side by side: the loop check, the product-drift check.
- `last` on scene 1, `/api` plus the returned path set as scene 2's image
  `data.url`: a quarter orbit continued into a half turn. One hop for
  products; at most 2 to 3 hops for any chain.

`get_scene_frame` returns `frame_url` as a path like
`/v1/storage/images/thumb_<id>.jpg`. Prefix it with `/api` before writing it
to the next image node's `data.url` (`/api/v1/storage/images/thumb_<id>.jpg`);
the path without `/api` is dropped and the clip runs without a first frame.
Never use an absolute https url. Frame last reads the raw clip, not the
trimmed window: chain only from a scene that is not trimmed at its end, or
describe the end state in words instead.

## 8. `edit_clip`: trims on the beat, holds, colour

```json
{ "workflow_id": "<id>", "node_id": "vid_2", "edits": { "trim": { "start_ms": 250, "end_ms": 4250 } } }
```

- At 120 BPM two bars are 4 s: trim every plate to 4000 ms windows so the
  cuts land on the bar lines.
- A small brightness or saturation nudge toward the brand colour:
  `"color": { "brightness": 0.05, "saturation": 0.9 }`. Brightness is an
  offset (0 neutral); contrast and saturation are multipliers (1 neutral);
  hue is degrees. `loop`, `resize`, `stabilize` and `lut_id` are accepted
  but ignored by the export. A one-scene film applies the rest too (any
  picture edit sends it through the full stitch).
- A step change in speed: `split_clip`, then a different `speed` on each
  half.
- Dip to black: `fade_out_ms` on the outgoing clip, `fade_in_ms` on the
  incoming one.
- Dissolve: give every video clip a position in film order with
  `move_clip` (a clip with no position renders after the positioned ones),
  then move the later clip and every clip after it earlier by the overlap
  (`timeline_start_sec`), then `fade_out_ms` on the earlier clip and
  `fade_in_ms` on the later, both equal to the overlap (within 50 ms). The
  export blends picture and sound over it; the film is the timeline length.
  An overlap without matching fades plays back to back.

## 9. The ping-pong loop (recipe-loops method A)

For a 15 s loop from one 8 s clip `vid_1`:

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "at_sec": 4 }
```

`split_clip` returns the two halves; read both ids with `get_workflow`.
Then:

```json
{ "workflow_id": "<id>", "node_id": "<first half>", "edits": { "trim": { "start_ms": 0, "end_ms": 7500 } } }
```

```json
{ "workflow_id": "<id>", "node_id": "<second half>", "edits": { "trim": { "start_ms": 0, "end_ms": 7500 }, "reverse": true } }
```

```json
{ "workflow_id": "<id>", "node_id": "<second half>", "timeline_start_sec": 7.5 }
```

The last call is `move_clip`; it only sets the order (clips play back to
back). `reverse` reverses the half's audio too: set both halves to `off`
with `set_clip_native_audio`. `get_workflow` again: each half must show a 7.5 s
duration and the second must start at 7.5. If a half came back shorter, the
split cut the media and this path is not available on this server: use the
cyclic or occlusion method and say so. Longer loops: split into 4 or 6
segments and alternate `reverse`.

## 10. `quality_check`, `create_render`, `get_render`

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "expect_audio": true }
```

`expect_audio` false for silent models and for loops set to `off`. Then
`create_render` (free) with an idempotency key, `get_render` until done,
`quality_check` without `node_id`, deliver the link.
