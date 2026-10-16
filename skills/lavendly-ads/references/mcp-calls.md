# MCP call shapes: ads

Exact arguments for a five-scene 15 s product ad with a real packshot.
Argument names are the live MCP names; placeholders are in angle brackets.
Read the real node ids from `get_workflow`; compiled shots use a group
`g_<suffix>`, an image node `img_<suffix>` and a clip node `vid_<suffix>`.

## Probes

`get_status`, `get_ledger`, both free, once per session. `get_schema` when
a field or option is in doubt.

## `import_asset`: the packshot

```json
{ "url": "https://example.com/serum-packshot.jpg", "kind": "image", "filename": "serum-packshot.jpg" }
```

Returns the hosted Lavendly url. Ask for the packshot in the film's shape
(a 9:16 or 16:9 version with clean space around the product); a packshot
in another shape is reframed by the model in ways you cannot control.
Import a lifestyle photo the same way when the user owns one. Images up to
25 MB. Media pasted in the chat never reaches you: ask for an Asset Library
upload or a public URL.

It returns a path like `/api/v1/storage/m/<key>`. Use it exactly as
returned on image nodes and tracks; never rewrite it to an absolute https
url (the provider cannot open a signed-in link). A link the user copies
from the app (`https://app.lavendly.ai/api/v1/storage/m/<key>`) goes in as
its `/api/v1/storage/m/<key>` path.

## `create_workflow`: scenes in order

```json
{
  "name": "Serum, Reels 15 s",
  "description": "Hook: the drop. Proof: absorbs on skin. CTA: try it tonight.",
  "aspect": "9:16",
  "videoModel": "google/veo-3.1-fast",
  "shots": [
    { "prompt": "<motion prompt, scene 1: the drop>", "duration": 4 },
    { "prompt": "<motion prompt, scene 2: texture>", "duration": 4 },
    { "prompt": "<motion prompt, scene 3: application>", "duration": 4 },
    { "prompt": "<motion prompt, scene 4: the hand after>", "duration": 4 },
    { "prompt": "<motion prompt, scene 5: packshot>", "duration": 4 }
  ],
  "idempotency_key": "wf-serum-reels-15"
}
```

- Only the top-level `videoModel` and `aspect` apply to every shot.
- Each `duration` is a length the model makes (Veo 4, 6, 8; Seedance 2.0
  4 to 15; Kling v3 3 to 15; Wan 2.7 2 to 10). The MCP path sends it as
  written; a length off the list can be refused by the provider.
- The shot `prompt` goes to the video model verbatim and its first 500
  characters also become the opening image prompt. Replace that with a real
  still-frame prompt in the next step.

## `update_workflow`: still prompts, packshot frames, reference wiring

One call; send the full `nodes` and `edges` arrays back (they are replaced).

1. Each text-opened scene: the image node's `data.prompt` becomes the
   still-frame prompt (start state, product description verbatim, light,
   set, room for the end card; no action, under 500 characters, subject
   first).
2. Each product-exact scene (the packshot, the label, the hero): set the
   image node's `data.url` to the hosted packshot. An image node with a url
   is not regenerated and costs no opening image; the clip opens exactly on
   that picture.
3. One reference node for the packshot, wired into the clips of the
   text-opened scenes only, after their own image edge, within the cap
   (none on Veo 3.1 Lite).

```json
{
  "workflow_id": "<id>",
  "nodes": [
    "<every existing node; img nodes with their new data.prompt>",
    "<img node of scene 5 with data.url set to the hosted packshot>",
    {
      "id": "ref_product",
      "type": "imageSource",
      "position": { "x": 80, "y": -260 },
      "data": { "title": "Reference: the serum", "url": "<hosted packshot url>", "imgSource": "upload", "reference": true }
    }
  ],
  "edges": [
    "<every existing edge, each clip's own image edge first>",
    { "id": "ref_product->vid_2", "source": "ref_product", "target": "vid_2", "data": { "mode": "reference" } },
    { "id": "ref_product->vid_3", "source": "ref_product", "target": "vid_3", "data": { "mode": "reference" } },
    { "id": "ref_product->vid_4", "source": "ref_product", "target": "vid_4", "data": { "mode": "reference" } }
  ]
}
```

On the MCP path the first connected image with a url is the first frame and
the rest are references, so each clip's own image edge must stay first.
Opening images made on the server never see the reference; the product
description in the still prompt is all they get.

## `set_clip_native_audio`

```json
{ "workflow_id": "<id>", "clip_id": "vid_1", "native_audio": { "mode": "native", "volume": 1 } }
```

`native` where the product sound is the point and no narration plays over
it (the drip, the click); `mix` with 0.3 to 0.5 under narration; `off` for
a music-only edit and for any reversed clip. Set every clip; new clips have
no mode.

## `attach_track`: narration and score

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "voiceover",
  "scope": "film",
  "text": "One drop.\nIt sinks in before you count to five.\nSoft, not sticky.\nTry it tonight. Link below.",
  "voice": "<an ElevenLabs voice from the list below, or omit for Rachel>",
  "subtitleStyle": "reels",
  "idempotency_key": "vo-<workflow id>"
}
```

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "music",
  "scope": "film",
  "mood": "Minimal warm electronic pulse around 100 BPM, soft plucked synth and a felt kick. Opens almost silent under the drop, builds one layer per scene, lands on a single held chord under the packshot. Instrumental.",
  "duration": 15,
  "ducking": true,
  "volume": 0.35,
  "idempotency_key": "music-<workflow id>"
}
```

One voice and one score for the film. Captions: `tiktok`, `reels`,
`youtube`, `caption` or `off`. Music `duration` 5 to 120 s; score credits 2
for 15 s, 3 for 30 s, 6 for 60 s. Voice on the default model is about 1
credit per 1,000 characters. Fallback when the server answers
`url required`: the same call with `url` set to a hosted file (a voiceover
by `url` gets no captions). A tempo in the brief is a request the music
provider may not follow: never promise exact BPM; after the render ask the
user to confirm the downbeats by ear before cutting to them.

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


## `estimate_cost`, then yes

```json
{ "workflow_id": "<id>" }
```

Read `total`, `per_scene`, `opening_image_credits`, `available_credits`,
`sufficient`. Packshot scenes show no opening image charge. Announce:

```text
5 shots on Veo 3.1 Fast: clips 70 credits, 4 opening images 8, narration and score about 3 when attached; total 81; 219 left after. Go ahead?
```

## `generate_scene`, scene by scene

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "max_credits": 16, "idempotency_key": "gen-<workflow id>-vid_1" }
```

`max_credits` is that scene's `per_scene` line plus its opening image. Poll
`get_generation_status` every 5 to 10 s silently. Optional `options`
accepted on this path: aspect ratio, seed and a negative prompt; whether a
provider honours the last two is not verified, so never rely on them.

## `quality_check` and frames

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "expect_audio": true }
```

Then `get_scene_frame` with `frame` set to first, mid and last on product
scenes: compare the product's outline, cap, finish and label layout against
the packshot. A bad text finding on a label means the label moved or was
redrawn: re-roll with a smaller move or open on the packshot.

## `edit_clip`: trims, the end hold, reverse

```json
{ "workflow_id": "<id>", "node_id": "vid_3", "edits": { "trim": { "start_ms": 400, "end_ms": 3200 } } }
```

```json
{ "workflow_id": "<id>", "node_id": "vid_5", "edits": { "trim": { "start_ms": 0, "end_ms": 3000 }, "fade_out_ms": 300 } }
```

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "edits": { "reverse": true, "trim": { "start_ms": 0, "end_ms": 3500 } } }
```

`trim` is in source milliseconds; edits apply in the order trim, reverse,
speed, crop, then fades. Cut model warm-up (the first 300 to 600 ms often
settles) and tails. A slow-motion hold: trim a still stretch and set
`speed` to 0.25 to 0.5. Hard cuts between clips; a dip to black is
`fade_out_ms` on one clip and `fade_in_ms` on the next. A dissolve: give
every video clip a position in film order with `move_clip` (an
unpositioned clip renders after the positioned ones), move the later clip
and every clip after it earlier by the overlap, then `fade_out_ms` on the
earlier and `fade_in_ms` on the later equal to the overlap (within 50 ms).
Wipes are not rendered.

## `create_render`, `get_render`

```json
{ "workflow_id": "<id>", "idempotency_key": "render-<workflow id>-a" }
```

Free. Poll `get_render` until done, then `quality_check` with no `node_id`.
For a variant, change one thing and render again with a new idempotency
key ("render-<id>-b"); both renders stay in `list_renders`.

## Hand-off to publish

`publish_video` and `schedule_video` belong to lavendly-publish, after an
explicit yes. For any ad with an AI person, the caption carries the
disclosure line.
