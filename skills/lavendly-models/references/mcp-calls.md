# MCP call shapes: models

The calls that carry a model choice into Lavendly. Argument names are the
live MCP names; every input schema rejects unknown arguments. Placeholders
are in angle brackets.

## Probes, free, once per session

```json
{}
```

`get_status`: provider readiness, voice configuration and capability flags;
it lists no video or image models, so the ids come from this skill's tables.
`get_schema`: the operation catalogue with JSON Schemas; read the
`create_workflow` and `generate_scene` entries when an argument is in doubt.
`get_ledger`: balance and plan. If `estimate_cost` later quotes a different
model than you set, stop and say so. Neither MCP server validates arguments:
an unknown argument name is forwarded silently and does nothing, so copy
the names exactly.

## `create_workflow`: one model, one aspect, explicit durations

```json
{
  "name": "Ferry deck, 15 s",
  "description": "Three scenes, Seedance 2.0 Mini, vertical.",
  "videoModel": "bytedance/seedance-2.0-mini",
  "aspect": "9:16",
  "shots": [
    { "prompt": "<motion prompt, scene 1, in the Seedance dialect>", "duration": 5 },
    { "prompt": "<motion prompt, scene 2>", "duration": 5 },
    { "prompt": "<motion prompt, scene 3>", "duration": 5 }
  ],
  "project_name": "<only when the user named a project>",
  "idempotency_key": "wf-ferry-deck-2026-10-16"
}
```

- `videoModel` and `aspect` at the top level apply to every shot. A
  `videoModel` inside a shot is ignored by the compiler.
- `duration` on every shot, from the model's exact list. A shot without one
  becomes 5 s, which Veo (4, 6, 8) and Hailuo 2.3 (6, 10) do not make, and
  the server path does not snap it.
- Leaving `videoModel` out means Auto: Veo 3.1 Lite on the server path,
  which takes no references.
- The shot text goes to the video model as written, and its first 500
  characters also become the scene's opening image prompt. Set real
  still-frame prompts next.

## `get_workflow`, then `update_workflow`: still prompts and a second model

```json
{ "workflow_id": "<id>" }
```

Per scene: an `imageSource` node (id starting `img_`), a `videoGenerator`
node (id starting `vid_`) carrying `data.prompt`, `data.duration`,
`data.aspect` and `data.videoModel`, and a group node.

Send the full `nodes` and `edges` arrays back; the server replaces them.
Change only what you mean to:

```json
{
  "workflow_id": "<id>",
  "nodes": [
    { "id": "img_1", "type": "imageSource", "data": { "prompt": "<still-frame prompt, under 500 characters>", "aspect": "9:16" } },
    { "id": "vid_2", "type": "videoGenerator", "data": { "prompt": "<motion prompt in the Kling dialect>", "duration": 5, "aspect": "9:16", "videoModel": "kwaivgi/kling-v3.0-pro" } },
    "<every other node, unchanged, with its position and data>"
  ],
  "edges": ["<every existing edge, unchanged>"]
}
```

The shapes above are abridged: keep each node's `position`, group fields and
other data exactly as `get_workflow` returned them. A `version_conflict`
means the workflow changed since you read it: read it again and reapply.

To move one scene to another model, change that clip node's
`data.videoModel` (not `data.model`: the quote reads only `videoModel`) and
its `data.duration` if the lists differ, then
confirm in `estimate_cost` that `per_scene` shows the new model and price.
Keep the aspect the same as the first clip: the export takes the first
clip's shape.

## `estimate_cost`: check your maths

```json
{ "workflow_id": "<id>" }
```

```json
{
  "total": 44,
  "remaining": 44,
  "per_scene": [
    { "node_id": "vid_1", "model": "bytedance/seedance-2.0-mini", "seconds": 5, "credits": 9, "opening_image_credits": 2, "already_generated": false },
    { "node_id": "vid_2", "model": "kwaivgi/kling-v3.0-pro", "seconds": 5, "credits": 20, "opening_image_credits": 2, "already_generated": false },
    { "node_id": "vid_3", "model": "bytedance/seedance-2.0-mini", "seconds": 5, "credits": 9, "opening_image_credits": 2, "already_generated": false }
  ],
  "available_credits": 180,
  "sufficient": true
}
```

The response above is illustrative. Compare each line to the family table:
a model you did not choose, or a price that is not ceil(seconds / 5) x the
block, means a node is wrong. Announce in one line with display names, wait
for a yes.

## `generate_scene`: one scene, capped

```json
{
  "workflow_id": "<id>",
  "node_id": "vid_1",
  "max_credits": 11,
  "idempotency_key": "gen-<workflow id>-vid_1"
}
```

`node_id` must be a clip node (type videoGenerator): an image node answers
`node_not_found`. There is no image-only generation on the MCP; an opening
image is made only with its clip and paid with it.

`max_credits` is that scene's clip credits plus its opening image. Over it,
the server answers `quote_exceeded` and spends nothing.

Optional `options`; only three keys survive on the server path:

```json
{
  "workflow_id": "<id>",
  "node_id": "vid_1",
  "max_credits": 11,
  "options": { "seed": 4127, "negative_prompt": "text, watermark, extra fingers" },
  "idempotency_key": "gen-<workflow id>-vid_1-seed"
}
```

- `seed`: the provider catalogue lists seed support on Veo, Seedance, Wan,
  HappyHorse, Runway and HeyGen. A seed repeats a result only with the same
  prompt, settings and model; use it for A and B variants of one shot,
  never for continuity.
- The negative prompt is forwarded; whether each provider honours it is
  unverified, and Runway does not support negatives. Positive wording in the
  prompt is the reliable lever.
- The aspect ratio option exists; prefer the node's `aspect` so the opening
  image and the clip agree.

Then `get_generation_status` every 5 to 10 s, silently.

## `quality_check`: did the model deliver sound

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "expect_audio": true }
```

`expect_audio` true on clips from sound models where the sound matters (a
line, a click). A silent result from a sound model means the provider
default was off or the clip failed: report it, set the clip's native audio
off, and carry the sound with `attach_track`.
