# MCP call shapes: review

Exact arguments and abbreviated responses for the quality loop. Argument
names are the live MCP names. Placeholders are in angle brackets.

## `get_generation_status`, is there anything to check

```json
{ "workflow_id": "<id>" }
```

Check only when `phase` is `done`, or when individual scenes have landed
during `generating_clips`. A `failed` phase is reported, not checked.

## `get_workflow`, collect the scenes

```json
{ "workflow_id": "<id>" }
```

Response: the full graph. Scenes are the nodes of type videoGenerator, read
left to right by position. Each carries `data.prompt`, `data.duration`, and
the model. The image reference for a scene is the imageSource node wired
into it. Keep the full `nodes` and `edges` arrays: `update_workflow` needs
them whole.

## `quality_check` per scene

```json
{
  "workflow_id": "<id>",
  "node_id": "<videoGenerator node id>",
  "expect_audio": false,
  "skip_vlm": false
}
```

Response:

```json
{
  "pass": false,
  "score": 4.9,
  "failures": [
    "identity drift: hair colour differs from the reference",
    "left hand has six fingers at 00:03"
  ],
  "reroll_hint": "Keep the black jaw-length hair from the reference. Hands resting on the rail, fingers relaxed and fully visible."
}
```

`expect_audio: true` when the clip's native audio is `native` or `mix`.
`skip_vlm: true` runs only the structural checks (duration, streams); say so
in the report.

## `update_workflow`, append the hint to one prompt

Take the exact `nodes` array from `get_workflow`, change only the failing
scene's video node prompt (and the image node prompt when the failure is in
the still), and write the whole array back with the unchanged `edges`:

```json
{
  "workflow_id": "<id>",
  "nodes": [
    { "id": "<image node id>", "type": "imageSource", "position": { "x": 0, "y": 80 }, "data": { "title": "<title>", "prompt": "<original prompt>", "aspect": "16:9", "groupId": "<group id>" } },
    { "id": "<video node id>", "type": "videoGenerator", "position": { "x": 0, "y": 320 }, "data": { "prompt": "<original prompt>\n<reroll_hint verbatim>", "aspect": "16:9", "duration": 5, "groupId": "<group id>" } },
    { "id": "<group id>", "type": "group", "position": { "x": -24, "y": 28 }, "data": { "name": "<scene name>", "memberIds": ["<image node id>", "<video node id>"] } }
  ],
  "edges": [ "<unchanged edges>" ]
}
```

Passing `nodes` replaces all nodes, so never send a partial list. A 409
(`workflow_conflict` or `version_conflict`) means the graph changed since
you read it: reload, re-apply, write once.

## `generate_scene`, one scene only

```json
{
  "workflow_id": "<id>",
  "node_id": "<failing video node id>",
  "idempotency_key": "gen-<workflow id>-<node id>-reroll-1"
}
```

Paid. Announce credits first. Returns a job handle; poll
`get_generation_status` silently.

## `quality_check` again

Same call as the first check on that `node_id`. Passed: continue. Failed:
stop re-rolling that scene and ask.

## `get_scene_frame` per scene

```json
{ "workflow_id": "<id>", "node_id": "<video node id>" }
```

Response: a thumbnail url the signed-in user can open. One per scene, in
order, into the contact sheet.

## `create_render`

```json
{ "workflow_id": "<id>", "idempotency_key": "render-<workflow id>-1" }
```

Free. Only after the contact sheet. Then poll:

```json
{ "workflow_id": "<id>", "job_id": "<job id>" }
```

`get_render` until `status` is `done` (`result.video_url`) or `failed`. Two
retries at most, same key.

## `quality_check` on the rendered film

```json
{ "workflow_id": "<id>", "expect_audio": true }
```

No `node_id`. `expect_audio: true` when a voiceover or music track is
attached. Report the score in one line with the video link.

## `get_workflow_audio`, when the failure is about sound

```json
{ "workflow_id": "<id>" }
```

Per-clip native audio mode and the attached tracks, derived from the live
graph. A silent film usually means every clip is `off` and no track is
attached, or a track url is broken.
