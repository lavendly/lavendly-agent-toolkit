# MCP call shapes: multi-clip

Exact arguments and abbreviated responses for a three-shot film. Argument
names are the live MCP names. Placeholders are in angle brackets.

## Probes

```json
{}
```

`get_status` (providers, voice config, capability flags) and `get_ledger`
(available credits, pending reservations). Both free. Once per session.

## `create_workflow` with shots in beat order

```json
{
  "name": "Mara crosses the city",
  "description": "Three shots: market, bridge, station. One dawn palette.",
  "shots": [
    { "prompt": "<anchors>\n<camera>\n<beat 1 action>", "duration": 5 },
    { "prompt": "<anchors>\n<camera>\n<beat 2 action>", "duration": 5 },
    { "prompt": "<anchors>\n<camera>\n<beat 3 action>", "duration": 6 }
  ],
  "project_name": "<only when the user named a project>",
  "idempotency_key": "wf-mara-crosses-the-city-2026-09-26"
}
```

The server compiles each shot into a grouped scene (imageSource wired into
videoGenerator) and wires scene to scene left to right. The response holds
the nodes: collect the videoGenerator node ids in shot order. They are the
`clip_id` and `node_id` values for the rest of the run.

The server also reads an optional top-level `aspect` such as `"9:16"`. It is
not listed in the MCP input schema; check `get_schema` before relying on it.

## `attach_track` voiceover on the first clip

```json
{
  "workflow_id": "<id>",
  "clip_id": "<first videoGenerator node id>",
  "kind": "voiceover",
  "text": "Mara steps into the market as the stalls open.\nOn the bridge she checks the letter again.\nThe station clock reads six. She does not look back.",
  "voice": "alloy",
  "idempotency_key": "vo-<workflow id>"
}
```

One track carries the whole script. Fallback when the server answers
`url required`: same call with `url` set to the hosted file, `text` kept for
captions.

## `attach_track` music on the first clip, one score

```json
{
  "workflow_id": "<id>",
  "clip_id": "<first videoGenerator node id>",
  "kind": "music",
  "mood": "sparse felt piano and low strings, opening on a held note over the market, building through the bridge, release into a single sustained chord at the station",
  "duration": 16,
  "ducking": true,
  "volume": 0.36,
  "idempotency_key": "mus-<workflow id>"
}
```

`duration` equals the whole film. Never attach a second music track to a
later clip. Fallback: `url` to one hosted file, same volume and ducking.

## `update_track` captions

```json
{
  "workflow_id": "<id>",
  "track_id": "<voiceover track id>",
  "subtitleStyle": "pop"
}
```

Values: `off`, `pop`, `tiktok`, `minimal`.

## `set_clip_native_audio`, every clip

```json
{
  "workflow_id": "<id>",
  "clip_id": "<videoGenerator node id>",
  "native_audio": { "mode": "off" }
}
```

Repeat per clip. On a dialogue clip only: `{ "mode": "mix", "volume": 0.6 }`.

## `get_workflow_audio` to confirm the mix

```json
{ "workflow_id": "<id>" }
```

Returns per-clip native audio and the attached tracks, derived from the live
graph. Use it before the estimate to confirm exactly one music track exists.

## `estimate_cost`

```json
{ "workflow_id": "<id>" }
```

Response:

```json
{
  "total": 36,
  "remaining": 36,
  "per_scene": [
    { "node_id": "<clip 1>", "model": "<model id>", "credits": 12, "already_generated": false },
    { "node_id": "<clip 2>", "model": "<model id>", "credits": 12, "already_generated": false },
    { "node_id": "<clip 3>", "model": "<model id>", "credits": 12, "already_generated": false }
  ],
  "available_credits": 140,
  "sufficient": true
}
```

Announce: "Three scenes, <model>, 36 credits of 140. Go ahead?" Above 30
percent of the balance, wait for a yes. `sufficient: false`: stop.

## `generate_scene` for the whole film

```json
{
  "workflow_id": "<id>",
  "idempotency_key": "gen-<workflow id>-1"
}
```

No `node_id`: every scene that has not been generated. Returns a job handle.

## `get_generation_status`

```json
{ "workflow_id": "<id>" }
```

Read `phase`, `progress`, `progress_message`, `stalled`, `needs_browser`.
Poll every 5 to 10 seconds. Speak once per phase change and once per scene
that lands.

## `quality_check` per scene

```json
{ "workflow_id": "<id>", "node_id": "<clip id>", "expect_audio": false }
```

Native audio is off on narrated clips, so `expect_audio` stays false for
them. Response: `{ "pass", "score", "failures", "reroll_hint" }`.

## Re-roll one scene

Append `reroll_hint` to that scene's video node prompt (and to its image
reference node prompt when the failure is about the still), write the nodes
back, regenerate only that scene:

```json
{
  "workflow_id": "<id>",
  "nodes": [ "<all nodes, the one prompt amended>" ],
  "edges": [ "<unchanged edges>" ]
}
```

then

```json
{
  "workflow_id": "<id>",
  "node_id": "<failing clip id>",
  "idempotency_key": "gen-<workflow id>-<clip id>-reroll-1"
}
```

Once. A second failure means the brief must change.

## `get_scene_frame` per scene

```json
{ "workflow_id": "<id>", "node_id": "<clip id>" }
```

One thumbnail url per scene. Present them as a contact sheet: beat name,
duration, score, link.

## `create_render` and `get_render`

```json
{ "workflow_id": "<id>", "idempotency_key": "render-<workflow id>-1" }
```

Free, reuse-aware. Then poll:

```json
{ "workflow_id": "<id>", "job_id": "<job id>" }
```

Until `status` is `done` (read `result.video_url`) or `failed`. Two retries
at most, same key.

## `import_asset` for the user's own reference

```json
{ "kind": "image", "url": "https://<public url>", "filename": "mara-ref.jpg" }
```

Returns the hosted url. Chat attachments never reach the agent; the user
uploads at https://lavendly.ai/AssetLibrary or gives a public URL.
