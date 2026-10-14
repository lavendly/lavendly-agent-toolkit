# MCP call shapes: director

Exact arguments for a three-scene product film with a supplied hero image.
Argument names are the live MCP names. Placeholders are in angle brackets.
Node ids below follow the server's naming for compiled shots: a group
`g_<suffix>`, an image node `img_<suffix>`, a clip node `vid_<suffix>`; read
the real ids from `get_workflow`.

## Probes

```json
{}
```

`get_status` and `get_ledger`, once per session, both free.

## `import_asset`: the hero

```json
{
  "url": "https://example.com/lamp-reference.jpg",
  "kind": "image",
  "filename": "lamp-reference.jpg"
}
```

Returns the hosted Lavendly url. Keep it; it goes on the reference node.
Repeat for a style plate if the user has one. Media pasted in the chat never
reaches you: ask for an Asset Library upload or a public URL.

## `create_workflow`: scenes in order

```json
{
  "name": "Lumen, the lamp",
  "description": "Three scenes: the switch, the nook, the hero shot. One lamp, one warm source.",
  "aspect": "16:9",
  "videoModel": "google/veo-3.1-fast",
  "shots": [
    { "prompt": "<motion prompt, scene 1>", "duration": 6 },
    { "prompt": "<motion prompt, scene 2>", "duration": 6 },
    { "prompt": "<motion prompt, scene 3>", "duration": 4 }
  ],
  "project_name": "<only when the user named a project>",
  "idempotency_key": "wf-lumen-2026-10-14"
}
```

The server compiles each shot into a grouped scene: an image node (the
scene's opening image, prompt derived from the shot) wired into a clip node.
The motion prompt is the clip's prompt. Durations must be lengths the model
makes (Veo: 4, 6, 8).

## `get_workflow`: find the nodes

```json
{ "workflow_id": "<id>" }
```

From `nodes`, per scene and in left-to-right order of the group's position:
the group (type `group`, `data.memberIds`), the image node (type
`imageSource`, id starting with `img_`), the clip node (type
`videoGenerator`, id starting with `vid_`). The clip ids are the `node_id`
and `clip_id` values for everything below.

## `update_workflow`: opening prompts and the hero wiring

One call. Send the full `nodes` and `edges` arrays back (the server replaces
them), with these changes:

1. Each image node's `data.prompt` becomes the still-frame prompt for that
   scene (a stable frame: subject, placement, camera position, light,
   materials, background; no action, no camera move).
2. One new reference node for the hero, with the hosted url, wired into every
   clip and every image node.

```json
{
  "workflow_id": "<id>",
  "nodes": [
    "<every existing node, image nodes with their new data.prompt>",
    {
      "id": "ref_hero",
      "type": "imageSource",
      "position": { "x": 80, "y": -260 },
      "data": {
        "title": "Reference: the lamp",
        "url": "<hosted url from import_asset>",
        "imgSource": "upload",
        "reference": true
      }
    }
  ],
  "edges": [
    "<every existing edge>",
    { "id": "ref_hero->img_1", "source": "ref_hero", "target": "img_1", "data": { "mode": "reference" } },
    { "id": "ref_hero->vid_1", "source": "ref_hero", "target": "vid_1", "data": { "mode": "reference" } },
    { "id": "ref_hero->img_2", "source": "ref_hero", "target": "img_2", "data": { "mode": "reference" } },
    { "id": "ref_hero->vid_2", "source": "ref_hero", "target": "vid_2", "data": { "mode": "reference" } },
    { "id": "ref_hero->img_3", "source": "ref_hero", "target": "img_3", "data": { "mode": "reference" } },
    { "id": "ref_hero->vid_3", "source": "ref_hero", "target": "vid_3", "data": { "mode": "reference" } }
  ]
}
```

Edge order matters on the render path: the scene's own image edge must stay
first on each clip (it is the first frame); the hero edge comes after (a
reference). On models that take two references (Veo), wire the hero and at
most one style plate; nothing else.

The hero description in words goes into every prompt as well. The image
locks the look; the words lock the identity when the model leans on text.

## `set_clip_native_audio`: per clip

```json
{ "workflow_id": "<id>", "clip_id": "vid_1", "native_audio": { "mode": "mix", "volume": 0.3 } }
```

`native` for a scene with its own sound or dialogue, `mix` with 0.3 to 0.5
under narration, `off` for a music edit. New clips from `create_workflow`
have no mode set; set every clip.

## `attach_track`: narration, one voice for the film

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "voiceover",
  "text": "Three words at the start.\nSix more as the room comes in.\nA last line on the hero shot.",
  "voice": "<voice id from get_status, or omit for the default>",
  "subtitleStyle": "off",
  "idempotency_key": "vo-<workflow id>"
}
```

One track carries the whole script, one line per scene, inside the 2.3 words
per second budget of the scene it covers. `subtitleStyle` from `off`,
`tiktok`, `reels`, `youtube`, `caption`.

## `attach_track`: one score

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "music",
  "mood": "Warm, sparse felt piano over a low string pad. Opens on a single held note as the switch clicks, builds gently through the room, lands on one sustained chord for the hero shot. Instrumental, never busy.",
  "duration": 18,
  "ducking": true,
  "volume": 0.35,
  "idempotency_key": "music-<workflow id>"
}
```

`duration` close to the film's length (5 to 120). Fallback when the server
answers `url required`: the same call with `url` set to a hosted file.

## `estimate_cost`, then approval

```json
{ "workflow_id": "<id>" }
```

Read `total`, `opening_image_credits`, `per_scene`, `available_credits`,
`sufficient`. Announce in one line and wait for a yes. Pass the approved
number as `max_credits` on every generate call; the server answers
`quote_exceeded` instead of overspending.

## `generate_scene`: one scene at a time

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "max_credits": 40, "idempotency_key": "gen-<workflow id>-vid_1" }
```

Then `get_generation_status` every 5 to 10 seconds, silently. When scene 1
lands, `get_scene_frame` with `node_id` `vid_1`, look, `quality_check`, and
only then generate scene 2. The opening image of a scene is made first when
its image node has a prompt and no url; its price was in the estimate.

## `quality_check`: per scene, then the film

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "expect_audio": true }
```

Reads `pass`, `score`, `failures`, `reroll_hint`, `story_pass`. A false
`story_pass` alone is advisory: open the frame before spending. For the
rendered film, omit `node_id`.

## `edit_clip`: the cut

```json
{
  "workflow_id": "<id>",
  "node_id": "vid_3",
  "edits": { "trim": { "start_ms": 500, "end_ms": 4500 }, "fade_out_ms": 400 }
}
```

`trim` is in source milliseconds. `fade_out_ms` on the outgoing clip and
`fade_in_ms` on the incoming one make a dip to black. `split_clip` with
`at_sec` cuts one clip into two halves; `move_clip` with `timeline_start_sec`
places a clip. The server keeps `timeline_start` and `duration` in sync.

## `create_render`, `get_render`

```json
{ "workflow_id": "<id>", "idempotency_key": "render-<workflow id>" }
```

Free; it reuses the generated clips. Poll `get_render` until done; then
`quality_check` without `node_id` once, then deliver the link.
