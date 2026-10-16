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
    { "prompt": "<anchors>\n<camera>\n<beat 1 action>", "duration": 6 },
    { "prompt": "<anchors>\n<camera>\n<beat 2 action>", "duration": 4 },
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

The server also reads an optional top-level `aspect` such as `"9:16"`
(default `"16:9"`) and a top-level `videoModel` (default Auto, Veo 3.1 Lite,
which makes 4, 6 or 8 s). A `videoModel` inside a shot is ignored. Durations
are sent as written, never snapped: use the model's exact lengths. The
`seq_` edges between scenes condition nothing.

## `attach_track` voiceover on the first clip

```json
{
  "workflow_id": "<id>",
  "clip_id": "<first videoGenerator node id>",
  "kind": "voiceover",
  "text": "Mara steps into the market as the stalls open.\nOn the bridge she checks the letter again.\nThe station clock reads six. She does not look back.",
  "subtitleStyle": "tiktok",
  "idempotency_key": "vo-<workflow id>"
}
```

One track carries the whole script. Fallback when the server answers
`url required`: same call with `url` set to the hosted file; a voiceover by
`url` has no word timings and gets no captions.

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
`youtube`, `caption`), one style per film, on a film of two or more scenes.
A voiceover attached by `url`, native dialogue and imported speech get none.

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

`duration` equals the whole film (5 to 120 s). `mood` or `url` is required;
there is no default mood. Never attach a second music track to a later clip:
each `attach_track` with a `mood` makes and charges a new score. Fallback:
`url` to one hosted file, same volume, ducking and `duration`.

Levels: attach-time music `volume` 0 to 2 is read as a fraction (0.35
becomes 35 percent). A voiceover's `volume` and every `update_track`
`volume` are stored as a percent with no conversion: never pass `volume` on
a voiceover (the default 100 is unity), and when a level must change later
pass `update_track` `volume` in percent (35 for a music bed, 100 for unity),
never 0.35.

## Make the score and the narration film-wide: `update_workflow`

Where `get_schema` lists `scope` on `attach_track`, pass `"scope": "film"`
when you attach the score and a film-wide narration: the server wires the
new node to every clip and the edges below are not needed. Otherwise add
them by hand.

`attach_track` wires its new node to one clip only. A score or a narration
plays across the film only when its node has an edge to every clip node
(type videoGenerator). Left on one clip it is mixed into that clip alone, and
a track longer than the clip freezes that clip's last frame for the rest of
the track. After the attach, `get_workflow`, then send the full `nodes` and
`edges` arrays back with one more edge per other clip, copied from the edge
`attach_track` made (same shape, new `id` and `target`):

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
graph. Use it before the estimate to confirm exactly one music track exists
and that it and the voiceover reach every clip.

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
