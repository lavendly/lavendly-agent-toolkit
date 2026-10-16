# MCP call shapes: animation

Exact arguments for an animated film with a hero sheet and a style plate.
Argument names are the live MCP names; placeholders are in angle brackets.
Compiled shots get a group `g_<suffix>`, an image node `img_<suffix>` and a
clip node `vid_<suffix>`; read the real ids from `get_workflow`.

## 1. Probes (free, once per session)

`get_status`, then `get_ledger`. `get_schema` before relying on any option
this file marks as "where `get_schema` lists it".

## 2. `import_asset`: the hero sheet and the style plate

```json
{ "kind": "image", "url": "https://example.com/pip-head-closeup.png", "filename": "pip-head.png" }
```

```json
{ "kind": "image", "url": "https://example.com/forest-style-plate.png", "filename": "style-plate.png" }
```

Each returns a hosted Lavendly url. Keep both. Media pasted in the chat never
reaches you: ask for an Asset Library upload or a public URL.

It returns a path like `/api/v1/storage/m/<key>`. Use it exactly as
returned on image nodes and tracks; never rewrite it to an absolute https
url (the provider cannot open a signed-in link). A link the user copies
from the app (`https://app.lavendly.ai/api/v1/storage/m/<key>`) goes in as
its `/api/v1/storage/m/<key>` path.

## 3. `create_workflow`: one shot per scene

```json
{
  "name": "Pip and the first star",
  "description": "Watercolour fable, three scenes, one fox cub, one lantern.",
  "aspect": "16:9",
  "videoModel": "alibaba/wan-2.7",
  "shots": [
    { "prompt": "<motion prompt, scene 1>", "duration": 5 },
    { "prompt": "<motion prompt, scene 2>", "duration": 5 },
    { "prompt": "<motion prompt, scene 3>", "duration": 5 }
  ],
  "project_name": "<only when the user named a project or series>",
  "idempotency_key": "wf-pip-first-star"
}
```

- `prompt` is the motion prompt; it reaches the model as written.
- The same text also seeds each scene's opening image (its first 500
  characters) until you replace the image prompt in step 5.
- `duration` must be on the model's list (Veo 4, 6, 8; Wan 2.7 any whole
  number 2 to 10; Kling 3 to 15). The server does not correct it.
- Only the top-level `videoModel` and `aspect` apply to every shot.

## 4. `get_workflow`: find the nodes

```json
{ "workflow_id": "<id>" }
```

Per scene, in left-to-right order: the group (type `group`), the image node
(type `imageSource`, id `img_...`) and the clip node (type
`videoGenerator`, id `vid_...`). Clip ids are the `node_id` and `clip_id`
for everything below.

## 5. `update_workflow`: still prompts and reference wiring

One call; send the full `nodes` and `edges` arrays back with these changes:

1. Each image node's `data.prompt` becomes that scene's still-frame prompt
   (under 500 characters, style line first, hero block verbatim).
2. One reference node per reference image, wired into every clip (and every
   image node, which the canvas path uses; the MCP path draws opening
   images from words only).

```json
{
  "workflow_id": "<id>",
  "nodes": [
    "<every existing node, image nodes with their new data.prompt>",
    {
      "id": "ref_hero",
      "type": "imageSource",
      "position": { "x": 80, "y": -260 },
      "data": { "title": "Reference: Pip, head", "url": "<hosted hero url>", "imgSource": "upload", "reference": true }
    },
    {
      "id": "ref_style",
      "type": "imageSource",
      "position": { "x": 80, "y": -420 },
      "data": { "title": "Reference: style plate", "url": "<hosted plate url>", "imgSource": "upload", "reference": true }
    }
  ],
  "edges": [
    "<every existing edge, each scene's own image edge first on its clip>",
    { "id": "ref_hero->vid_1", "source": "ref_hero", "target": "vid_1", "data": { "mode": "reference" } },
    { "id": "ref_style->vid_1", "source": "ref_style", "target": "vid_1", "data": { "mode": "reference" } },
    { "id": "ref_hero->vid_2", "source": "ref_hero", "target": "vid_2", "data": { "mode": "reference" } },
    { "id": "ref_style->vid_2", "source": "ref_style", "target": "vid_2", "data": { "mode": "reference" } }
  ]
}
```

Rules:

- The scene's own image edge stays first on each clip: the first connected
  image with a url is the first frame; the others ride as references.
- Wire at most the model's cap: 4 on Seedance and Wan 2.6 and 2.7, 2 on the
  rest, none on Veo 3.1 Lite (Auto). On a 2-slot model: hero, then plate.
- Each wired reference gets its role sentence in that clip's motion prompt
  ([prompt-anchors.md](prompt-anchors.md) section 2).

### Using the user's own stills as opening frames

When the user supplies or makes the opening stills (the strictest style
lock), import each one and set it on that scene's image node instead of a
prompt:

```json
{ "id": "img_1", "type": "imageSource", "data": { "url": "<hosted still url>", "prompt": "<the still-frame prompt, kept for the record>" } }
```

An image node with a url is not regenerated and its opening image is not
charged.

## 6. `set_clip_native_audio`: every clip

```json
{ "workflow_id": "<id>", "clip_id": "vid_1", "native_audio": { "mode": "mix", "volume": 0.3 } }
```

`native` for Foley-led or spoken shots, `mix` at 0.3 to 0.5 under narration,
`off` for a music edit or a silent model.

## 7. `attach_track`: narration and one score

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "voiceover",
  "scope": "film",
  "text": "Pip has a lantern.\nBut where is the first star?\nThere it is. Goodnight, Pip.",
  "voice": "<an ElevenLabs voice from the list below, or omit for Rachel>",
  "subtitleStyle": "youtube",
  "idempotency_key": "vo-<workflow id>"
}
```

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "music",
  "scope": "film",
  "mood": "Celesta, harp and felt piano at about 70 BPM, soft and unhurried; a solo cello enters at the turn; slows and resolves on one held harp chord on the last page. Instrumental.",
  "duration": 15,
  "ducking": true,
  "volume": 0.25,
  "idempotency_key": "music-<workflow id>"
}
```

One voice and one score for the film. Fallback when the server answers
`url required`: the same call with `url` set to a hosted file (a voiceover
by `url` gets no captions). A tempo in the brief is a request the music provider may not follow: never
promise exact BPM, and ask the user to confirm the downbeats by ear before
cutting to them.

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


## 8. `estimate_cost`, then approval

```json
{ "workflow_id": "<id>" }
```

Announce in one line and wait for a yes:

```text
3 scenes on Wan 2.7: clips 36 credits, opening images 6, total 42; narration and score charged when attached; 158 left after. Go ahead?
```

## 9. `generate_scene`: scene 1 first

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "max_credits": 14, "idempotency_key": "gen-<workflow id>-vid_1" }
```

`max_credits` is that scene's `per_scene` line plus its opening image.
Poll `get_generation_status` every 5 to 10 s, silently.

## 10. `get_scene_frame`: check the style, chain a continuation

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "frame": "first" }
```

- `first` shows the opening image as animated: check the style against the
  plate before paying for scene 2.
- `mid` (default) for the acting and the artefacts.
- `last` to chain: put `/api` plus the returned path on the next scene's
  image node `data.url` with `update_workflow`, then generate the next scene.
  Chain at most 2 to 3 hops; then start from a fresh still written from the
  bible.

`get_scene_frame` returns `frame_url` as a path like
`/v1/storage/images/thumb_<id>.jpg`. Prefix it with `/api` before writing it
to the next image node's `data.url` (`/api/v1/storage/images/thumb_<id>.jpg`);
the path without `/api` is dropped and the clip runs without a first frame.
Never use an absolute https url. Frame last reads the raw clip, not the
trimmed window: chain only from a scene that is not trimmed at its end, or
describe the end state in words instead.

## 11. Re-roll one opening image

Change the image node's `data.prompt`, remove its `data.url`, send the full
`nodes` with `update_workflow`, then `generate_scene` for that scene: a new
opening image is made, then the clip. Announce the cost first.

## 12. `quality_check`

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "expect_audio": true }
```

`expect_audio` false for silent models (Hailuo 2.3, Hailuo 3 Max, Runway).
Read `pass`, `score`, `failures`, `reroll_hint`, `story_pass`. Without
`node_id` after the render, for the whole film.

## 13. `edit_clip`: trims, holds, fades

```json
{ "workflow_id": "<id>", "node_id": "vid_3", "edits": { "trim": { "start_ms": 400, "end_ms": 6400 }, "fade_out_ms": 600 } }
```

- An 8 s Veo clip cut to 6 s: `trim` to the strongest 6 s window.
- A bedtime ending: `fade_out_ms` of 800 to 1500 on the last clip and on
  the music node (a clip fade does not fade a film-wide score).
- `speed` (0.1 to 8) can stretch a hold slightly; check the clip after, as
  a slowed generated clip may look less smooth.
- `split_clip` with `at_sec` (seconds into the clip, not film time) when
  one clip holds two beats; `move_clip` with `timeline_start_sec` sets the
  order: clips play back to back and a gap is never rendered.
- A dissolve (a soft page change between scenes): give every video clip a
  position in film order with `move_clip` (a clip with no position renders
  after the positioned ones), move the later clip and every clip after it
  earlier by the overlap, then `fade_out_ms` on the earlier clip and
  `fade_in_ms` on the later, both equal to the overlap (within 50 ms). The
  export blends picture and sound over it. An overlap without matching
  fades plays back to back.
- Applied by the export: trim, speed, volume, mute, fades, crop, rotate,
  flip, reverse, color. `loop`, `resize`, `stabilize` and `lut_id` are
  accepted but ignored. A one-scene film applies them too: any picture edit
  other than volume and mute, or a captioned voiceover, sends it through the
  full stitch; with neither it ships the raw clip.

## 14. `create_render`, `get_render`

```json
{ "workflow_id": "<id>", "idempotency_key": "render-<workflow id>" }
```

Free. Poll `get_render` until done, `quality_check` once without `node_id`,
deliver the link.
