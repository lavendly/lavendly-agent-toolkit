# MCP call shapes: storyteller

Exact arguments and abbreviated responses for every tool this skill uses.
Argument names are the live MCP names. Responses are shortened to the fields
the skill reads. Placeholders are in angle brackets. Filled values follow one
worked example, an espresso bar at dawn; the user's own idea replaces it.

## 1. `get_status`

```json
{}
```

Read: provider readiness per domain, voice configuration (`voice.provider`,
`models.tts_voices`), capability flags. It lists no video models. Free. Call
once per session.

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
      "duration": 8
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
`shots` (default `"16:9"`), and a top-level `videoModel` (default Auto, Veo
3.1 Lite). A `videoModel` inside a shot is ignored. For a length Auto does
not make, add `"videoModel": "bytedance/seedance-2.0-mini"`.

Duration on a shot defaults to 5 when omitted, which Auto does not make:
always write it. The server sends it as written, never snapped.

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
  "subtitleStyle": "tiktok",
  "idempotency_key": "vo-<workflow id>"
}
```

No `voice` means Rachel, the default. Never pass `volume` on a voiceover: it
is stored as a percent, so 1 means 1 percent; the default 100 is unity.

Voices: read `get_status` `models.tts_voices`. When it lists ElevenLabs
voices (direct ElevenLabs), pass a premade id: Rachel 21m00Tcm4TlvDq8ikWAM,
Adam pNInz6obpgDQGcFmaJgB, Bella EXAVITQu4vr4xnSDxMaL, Antoni
ErXwobaYiN019PkySvjV, Elli MF3mGyEYCl7XYWbV9V6O, Josh TxGEqnHWrfWFTfGW9XjX,
Arnold VR6AewLTigWG4xSOukaG, Sam yoZ06aMxZJJ28mfd3POQ. When it lists the
OpenAI names (alloy, echo, fable, onyx, nova, shimmer), voice runs on
ElevenLabs through OpenRouter and every one of those names plays as Rachel:
pass one of sarah, george, adam, alice, bella, bill, brian, callum, charlie,
chris, daniel, eric, harry, jessica, laura, liam, lily, matilda, river,
roger, will. Script up to 4,000 characters, priced per character.

Fallback when the server answers `url required`:

```json
{
  "workflow_id": "<id>",
  "clip_id": "<videoGenerator node id>",
  "kind": "voiceover",
  "url": "<url from list_assets: the mp3, wav or m4a in the Asset Library>",
  "idempotency_key": "vo-<workflow id>"
}
```

A voiceover attached by `url` has no word timings, so it never gets burned
captions. Response: the new track with its id (needed for `update_track`)
and the source node the server placed on the canvas.

## 7. `attach_track` music, synthesis form first

```json
{
  "workflow_id": "<id>",
  "clip_id": "<videoGenerator node id>",
  "kind": "music",
  "mood": "quiet solo piano, opening on a held chord, a small lift as the cup fills, release into room tone",
  "duration": 8,
  "ducking": true,
  "volume": 0.38,
  "idempotency_key": "mus-<workflow id>"
}
```

`mood` (or `url`) is required; there is no default mood. `duration` is the
block length (5 to 120 s): the score is cut at the block end, so make it the
clip's length. On a 4 s clip attach with 5, then `update_track` `duration` 4. Attach-time music `volume` 0 to 2 is read as a fraction (0.38
becomes 38 percent). The provider (ElevenLabs Music or Lyria 3, see
`get_status` `music.provider`) may not follow a tempo in the brief.

Fallback: replace `mood` with `url` pointing at a hosted file and keep
`duration`. Keep `ducking: true` (drops the music to about a third under the
voice) and the volume.

## 8. Captions and `update_track`

Captions burn from the synthesized voiceover's word timings when its
`subtitleStyle` is not `off`. A workflow with exactly one clip then goes
through the full stitch, so the captions burn and any `edit_clip` picture
edit applies; with no captions and no picture edit (volume and mute aside)
it ships the raw clip. To change the style after the attach:

```json
{
  "workflow_id": "<id>",
  "track_id": "<voiceover track id>",
  "subtitleStyle": "youtube"
}
```

`update_track` also adjusts `muted`, `ducking`, `duration` (the block
length) and `startTime` (where the track starts on the clip, not a source
in-point). Its `volume` is stored as a percent: pass 35 for a music bed, 100
for unity, never 0.35.

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

## `list_assets`: media already in Lavendly

When the user says the file is already in Lavendly (their library, an
earlier upload, "my photo"), find it there first:

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
`data.video_url` on a clip node, or the `attach_track` `url`. An uploaded
video as a clip costs zero generation credits; set `data.duration` (and
`duration_seconds`) from `metadata.duration_sec`, or it is treated as 5 s. Not
there: a public URL goes through `import_asset`; media pasted in the chat
never reaches you, so ask the user to upload it to the Asset Library and
list again.

## Bringing in the user's own media: `import_asset`

```json
{
  "kind": "image",
  "url": "https://<public url>",
  "filename": "product.jpg"
}
```

Returns the hosted Lavendly url. Media pasted into the chat never reaches
the agent; the user uploads it at https://lavendly.ai/AssetLibrary (then
`list_assets`) or gives a public URL. Limits by `url`: image 25 MB, video 64 MB and 3 minutes,
music 50 MB and 10 minutes; inline `data` about 11 MB.

It returns a path like `/api/v1/storage/m/<key>`. Use it exactly as
returned on image nodes and tracks; never rewrite it to an absolute https
url (the provider cannot open a signed-in link). A link the user copies
from the app (`https://app.lavendly.ai/api/v1/storage/m/<key>`) goes in as
its `/api/v1/storage/m/<key>` path.
