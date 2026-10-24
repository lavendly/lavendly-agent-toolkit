# MCP call shapes: cinematic

Exact arguments, shown on one worked example: a 30 s two-hander on Seedance
2.0 Fast with two character references and a location plate (Hana and Kenji
in a narrow Osaka apartment kitchen at night; she has sold the family noodle
shop, he slides the shop keys back). The user's own film replaces it. Then the
genre-specific calls: app stills as opening images, frame chaining, the
grade, speed ramps and comedy timing. Argument names are the live MCP
names; placeholders are in angle brackets. Read real node ids from
`get_workflow`.

## Probes

`get_status`, then `get_ledger`, once per session, free. `get_status` gives
voice and music config, not video models: the model facts come from this
skill's tables, and `estimate_cost` `per_scene` shows the model each scene
will use.

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
`data.video_url` on a clip node, or the `attach_track` `url`. Not
there: a public URL goes through `import_asset`; media pasted in the chat
never reaches you, so ask the user to upload it to the Asset Library and
list again.

## `import_asset`: the references

```json
{ "kind": "image", "url": "https://example.com/hana-headshot.jpg", "filename": "hana-headshot.jpg" }
```

Repeat for Kenji and for the kitchen plate. Each returns a hosted Lavendly url.
A character reference is a clean, evenly lit, front or three-quarter head
and shoulders on a plain background; a full-body sheet with several faces
averages them into a stranger. Media pasted into the chat never reaches
you: ask for an Asset Library upload (then `list_assets`) or a public URL.

It returns a path like `/api/v1/storage/m/<key>`. Use it exactly as
returned on image nodes and tracks; never rewrite it to an absolute https
url (the provider cannot open a signed-in link). A link the user copies
from the app (`https://app.lavendly.ai/api/v1/storage/m/<key>`) goes in as
its `/api/v1/storage/m/<key>` path.

## `create_workflow`: the motion prompts in order

```json
{
  "name": "The Shop Keys",
  "description": "30 s two-hander. Hana on the left, Kenji on the right. She sold the family noodle shop; he slides the shop keys back.",
  "aspect": "16:9",
  "videoModel": "bytedance/seedance-2.0-fast",
  "shots": [
    { "prompt": "<motion prompt, shot 1: wide master>", "duration": 5 },
    { "prompt": "<motion prompt, shot 2: insert keys>", "duration": 5 },
    { "prompt": "<motion prompt, shot 3: Hana line 1>", "duration": 5 },
    { "prompt": "<motion prompt, shot 4: Kenji line 2>", "duration": 5 },
    { "prompt": "<motion prompt, shot 5: Hana line 3>", "duration": 5 },
    { "prompt": "<motion prompt, shot 6: Kenji reaction>", "duration": 5 },
    { "prompt": "<motion prompt, shot 7: wide, keys slide back>", "duration": 10 }
  ],
  "project_name": "<only when the user named a project>",
  "idempotency_key": "wf-the-shop-keys-2026-10-16"
}
```

Durations come from the model's exact list (Seedance 4 to 15; Veo 4, 6, 8;
Kling 3 to 15). The server makes each shot a scene: an image node whose
prompt is the first 500 characters of the shot prompt, wired into a clip
node. Only the top-level `videoModel` and `aspect` apply.

## `update_workflow`: still prompts and references

One call with the full `nodes` and `edges` arrays (they are replaced):

1. Each image node's `data.prompt` becomes that shot's still-frame prompt
   (under 500 characters).
2. One reference node per reference, wired only into the clips whose shot
   contains that person or place, after the scene's own image edge.

```json
{
  "workflow_id": "<id>",
  "nodes": [
    "<every existing node, image nodes with their new data.prompt>",
    { "id": "ref_hana", "type": "imageSource", "position": { "x": 80, "y": -420 },
      "data": { "title": "Reference: Hana", "url": "<hosted url>", "imgSource": "upload", "reference": true } },
    { "id": "ref_kenji", "type": "imageSource", "position": { "x": 320, "y": -420 },
      "data": { "title": "Reference: Kenji", "url": "<hosted url>", "imgSource": "upload", "reference": true } },
    { "id": "ref_kitchen", "type": "imageSource", "position": { "x": 560, "y": -420 },
      "data": { "title": "Reference: kitchen", "url": "<hosted url>", "imgSource": "upload", "reference": true } }
  ],
  "edges": [
    "<every existing edge, the scene image edges first>",
    { "id": "ref_hana->vid_3", "source": "ref_hana", "target": "vid_3", "data": { "mode": "reference" } },
    { "id": "ref_kitchen->vid_3", "source": "ref_kitchen", "target": "vid_3", "data": { "mode": "reference" } },
    { "id": "ref_kenji->vid_4", "source": "ref_kenji", "target": "vid_4", "data": { "mode": "reference" } },
    { "id": "ref_kitchen->vid_4", "source": "ref_kitchen", "target": "vid_4", "data": { "mode": "reference" } },
    { "id": "ref_hana->vid_1", "source": "ref_hana", "target": "vid_1", "data": { "mode": "reference" } },
    { "id": "ref_kenji->vid_1", "source": "ref_kenji", "target": "vid_1", "data": { "mode": "reference" } },
    { "id": "ref_kitchen->vid_1", "source": "ref_kitchen", "target": "vid_1", "data": { "mode": "reference" } }
  ]
}
```

Rules:

- On the render path the first connected image with a url is the first
  frame; the others are references. Keep the scene's own image edge first.
- Caps: 4 references on Seedance and Wan 2.6 and 2.7, 2 on the others, none
  on Veo 3.1 Lite. Priority when slots are short: the face of whoever speaks
  in the shot, then the other face, then the place, then a style plate.
- Every wired reference gets one role sentence in that clip's motion prompt:
  "Reference 1 is Hana's face and hair only; ignore its background and pose.
  Reference 2 is the kitchen's layout and light only."
- On Veo 3.1 and Fast, a clip with references is generated at 8 s.
- Reference images do not reach the opening images on this path (they are
  made from text). The locked description in the still prompt is what draws
  the person in frame 1.

## An app still as a scene's opening image

When the user made the close-up's opening still in the Lavendly app from the
character reference and shared its hosted link, set it on that scene's
image node; a node with a url is not regenerated:

```json
{
  "workflow_id": "<id>",
  "nodes": [
    "<every node unchanged except:>",
    { "id": "img_3", "type": "imageSource", "position": { "x": 960, "y": 0 },
      "data": { "title": "Opening: Hana line 1", "url": "<hosted still url>", "prompt": "<still prompt kept for the record>" } }
  ],
  "edges": ["<every edge unchanged>"]
}
```

Keep the node's existing fields (position, group membership) as `get_workflow`
returned them; change only `data.url`.

## Frame chaining for continuous action

```json
{ "workflow_id": "<id>", "node_id": "vid_5", "frame": "last" }
```

`get_scene_frame` returns an image path. Put `/api` plus that path on the
next scene's image node `data.url` with `update_workflow`, then generate
that scene. Chain at most 2
to 3 hops; then regenerate a clean opening from the still prompt. Chain only
a shot that continues the same angle and action; a new angle gets its own
still. No two clips start from the same frame.

`get_scene_frame` returns `frame_url` as a path like
`/v1/storage/images/thumb_<id>.jpg`. Prefix it with `/api` before writing it
to the next image node's `data.url` (`/api/v1/storage/images/thumb_<id>.jpg`);
the path without `/api` is dropped and the clip runs without a first frame.
Never use an absolute https url. Frame last reads the raw clip, not the
trimmed window: chain only from a scene that is not trimmed at its end, or
describe the end state in words instead.

## `set_clip_native_audio`

```json
{ "workflow_id": "<id>", "clip_id": "vid_3", "native_audio": { "mode": "native", "volume": 1 } }
```

`native` for dialogue and sound-led shots (not ducked under a voiceover);
`mix` with volume 0.25 to 0.35 under narration; `off` for score-only shots.
New clips have no mode: set every clip.

## `attach_track`: one score

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "music",
  "scope": "film",
  "mood": "Sparse felt piano and a low cello. Silent for the first ten seconds. A single held cello note enters on the turn, a three-note piano figure on the reaction, resolving to one soft chord on the last image. About 70 BPM, instrumental.",
  "duration": 30,
  "volume": 0.3,
  "ducking": true,
  "idempotency_key": "music-<workflow id>"
}
```

## `attach_track`: narration (noir, a letter read aloud)

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "voiceover",
  "scope": "film",
  "text": "The room was paid for till Friday. Nobody had slept in it.\nShe drank rye and left her colour on the glass.",
  "voice": "<an ElevenLabs voice from the list below, or omit for Rachel>",
  "subtitleStyle": "youtube",
  "idempotency_key": "vo-<workflow id>"
}
```

One track carries the whole script, 2.3 words per second of the shots it
covers. If the server answers `url required`, the user makes the voice or
the score in the app's Asset Library, you find it with `list_assets` and
attach its `url`
(a voiceover by `url` gets no captions). A tempo in a score brief is a
request the provider may not follow: never promise exact BPM; ask the user
to confirm the downbeats by ear.

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


## `estimate_cost`, then one line

```text
7 shots on Seedance 2.0 Fast: clips 88 credits, opening images 14, total 102; the score is charged when attached (about 3); 198 left after. Go ahead?
```

## `generate_scene`: scene 1, then the hardest shot

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "max_credits": 15, "idempotency_key": "gen-<workflow id>-vid_1" }
```

`max_credits` is that scene's `per_scene` line plus its opening image. Poll
`get_generation_status` every 5 to 10 s, silently. Check scene 1 with
`get_scene_frame` and `quality_check` (with `expect_audio` true on dialogue
shots), then generate the hardest performance shot (the turn), then the rest.

## `edit_clip`: timing, grade, ramps

Trim to the useful window (source milliseconds):

```json
{ "workflow_id": "<id>", "node_id": "vid_6", "edits": { "trim": { "start_ms": 600, "end_ms": 4600 } } }
```

The same grade on every clip (black and white noir shown):

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "edits": { "color": { "saturation": 0, "contrast": 1.2 } } }
```

Contrast and saturation are multipliers (1 neutral), brightness an offset (0
neutral), hue in degrees. `loop`, `resize`, `stabilize` and `lut_id` are
accepted but ignored by the export.

A dip to black for a time jump: `fade_out_ms` 500 on the outgoing clip,
`fade_in_ms` 500 on the incoming one.

A dissolve (a softer time jump, a memory): give every video clip a position
in film order with `move_clip` (an unpositioned clip renders after the
positioned ones), move the later clip and every clip after it earlier by
the overlap, then `fade_out_ms` on the earlier and `fade_in_ms` on the
later, both equal to the overlap (within 50 ms). The export blends picture
and sound over it. Wipes are not rendered.

A speed ramp into slow motion (the clip was generated in slow motion):

```json
{ "workflow_id": "<id>", "node_id": "vid_5", "at_sec": 1.5 }
```

`at_sec` counts seconds into the clip (rate-aware), not film time.
`split_clip` returns two halves; then `edit_clip` with `{ "speed": 2 }` on the
first half so the approach plays at real time, and the second half stays
slow. The second half has no audio edges. `move_clip` with
`timeline_start_sec` restores the order if needed; clips play back to back,
and an overlap renders only as a dissolve.

Comedy pause: trim the setup clip to end on 0.5 to 1 s of stillness, and
trim the reaction clip so it holds 1 to 2 s after the punchline.

## `create_render`, `get_render`, the last check

```json
{ "workflow_id": "<id>", "idempotency_key": "render-<workflow id>" }
```

Free. Poll `get_render` until done, then `quality_check` without `node_id`
for the whole film and `get_workflow_audio` to confirm every clip's mode and
the one score. Deliver the link, the length and what the viewer sees.
