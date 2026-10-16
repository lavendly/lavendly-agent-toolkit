# MCP call shapes: storyteller

Exact arguments and abbreviated responses for every tool this skill uses.
Argument names are the live MCP names. Responses are shortened to the fields
the skill reads. Placeholders are in angle brackets.

## 1. `get_status`

```json
{}
```

Read: provider readiness per domain, voice configuration (default voice,
available voice ids), capability flags. Free. Call once per session.

## 2. `get_ledger`

```json
{}
```

Read: `available` credits, plan, pending reservations. Free.

## 4. `create_workflow`

```json
{
  "name": "Espresso at dawn",
  "shots": [
    {
      "prompt": "<shot prompt, anchors first, action last>",
      "duration": 5
    }
  ],
  "project_name": "<only when the user named a project>",
  "idempotency_key": "wf-espresso-at-dawn-2026-09-26"
}
```

The server compiles each shot into a grouped scene: one image reference node
(type imageSource) wired into one video node (type videoGenerator). The
response is the persisted workflow with its id and nodes. The clip id you need
for audio and quality calls is the id of the videoGenerator node.

The server also reads an optional top-level `aspect` such as `"9:16"` next to
`shots`. It is not listed in the MCP input schema, so check `get_schema` before
relying on it, and otherwise leave the default.

Duration on a shot defaults to 5 when omitted.

## 5. `get_workflow` (only if the create response was truncated)

```json
{ "workflow_id": "<id>" }
```

## 6. `attach_track` voiceover, synthesis form first

```json
{
  "workflow_id": "<id>",
  "clip_id": "<videoGenerator node id>",
  "kind": "voiceover",
  "text": "Steam lifts off the portafilter. The first drops fall, dark and slow.",
  "voice": "alloy",
  "idempotency_key": "vo-<workflow id>"
}
```

Fallback when the server answers `url required`:

```json
{
  "workflow_id": "<id>",
  "clip_id": "<videoGenerator node id>",
  "kind": "voiceover",
  "url": "https://<hosted mp3, wav or m4a from the Asset Library>",
  "text": "<the same script, for captions>",
  "voice": "alloy",
  "idempotency_key": "vo-<workflow id>"
}
```

Response: the new track with its id (needed for `update_track`) and the source
node the server placed on the canvas. Text is stored up to 800 characters.

## 7. `attach_track` music, synthesis form first

```json
{
  "workflow_id": "<id>",
  "clip_id": "<videoGenerator node id>",
  "kind": "music",
  "mood": "quiet solo piano, opening on a held chord, a small lift as the cup fills, release into room tone",
  "duration": 5,
  "ducking": true,
  "volume": 0.38,
  "idempotency_key": "mus-<workflow id>"
}
```

Fallback: replace `mood` and `duration` with `url` pointing at a hosted file.
Keep `ducking: true` (drops the music 8 dB under the voice) and the volume.

## 8. `update_track` captions

```json
{
  "workflow_id": "<id>",
  "track_id": "<voiceover track id>",
  "subtitleStyle": "tiktok"
}
```

Values: `off`, `tiktok`, `reels`, `youtube`, `caption`. The same call adjusts `volume`
(0 to 2), `muted`, `ducking`, and the trim window (`startTime`, `duration`).

## 9. `set_clip_native_audio`

```json
{
  "workflow_id": "<id>",
  "clip_id": "<videoGenerator node id>",
  "native_audio": { "mode": "off" }
}
```

Dialogue shot: `{ "mode": "mix", "volume": 0.6 }`.

## 10. `estimate_cost`

```json
{ "workflow_id": "<id>" }
```

Response:

```json
{
  "total": 12,
  "remaining": 12,
  "per_scene": [
    { "node_id": "<clip id>", "model": "<model id>", "credits": 12, "already_generated": false }
  ],
  "available_credits": 140,
  "sufficient": true
}
```

Announce as: "One scene, <model>, 12 credits of 140. Go ahead?"

## 11. `generate_scene`

```json
{
  "workflow_id": "<id>",
  "idempotency_key": "gen-<workflow id>-1"
}
```

Omit `node_id` for a single-shot workflow. Returns a job handle. Reuse the same
key on any retry of this same action.

## 12. `get_generation_status`

```json
{ "workflow_id": "<id>" }
```

Response:

```json
{
  "phase": "generating_clips",
  "progress": 0.6,
  "progress_message": "Rendering clip 1 of 1",
  "seconds_since_update": 4,
  "stalled": false,
  "needs_browser": false,
  "video_url": null
}
```

Phases: `scripting`, `generating_images`, `generating_clips`, `voice`,
`stitching`, `uploading`, `done`, `failed`, `needs_browser`. Poll every 5 to
10 seconds, speak only when `phase` changes.

## 13. `quality_check`

```json
{
  "workflow_id": "<id>",
  "node_id": "<clip id>",
  "expect_audio": false
}
```

`expect_audio` is false for a narrated clip with native audio off: the clip
itself is silent until the render mixes the tracks. Use true on the
rendered film (no `node_id`).

Response: `{ "pass": true, "score": 8.5, "failures": [], "reroll_hint": "" }`.
On `pass: false`, follow lavendly-review: append `reroll_hint` to the scene
prompt, regenerate that one `node_id`, check again. Once.

## 14. `get_scene_frame`

```json
{ "workflow_id": "<id>", "node_id": "<clip id>" }
```

Response: a thumbnail url the signed-in user can open. Share it as a link.

## 15. `create_render` and `get_render`

```json
{
  "workflow_id": "<id>",
  "idempotency_key": "render-<workflow id>-1"
}
```

Free. Stitches the generated clip with its tracks. Returns a job handle with a
job id. Then:

```json
{ "workflow_id": "<id>", "job_id": "<job id>" }
```

Poll until `status` is `done` (read `result.video_url`) or `failed`. Retry a
failed render at most twice with the same key.

## Bringing in the user's own media: `import_asset`

```json
{
  "kind": "image",
  "url": "https://<public url>",
  "filename": "product.jpg"
}
```

Returns the hosted Lavendly url. Media pasted into the chat never reaches
the agent; the user uploads it at https://lavendly.ai/AssetLibrary or gives
a public URL. Limits match the app uploader: image 25 MB, video 300 MB and
3 minutes, music 50 MB and 10 minutes.
