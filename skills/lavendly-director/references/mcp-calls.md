# MCP call shapes: director

Exact arguments for a worked example: a three-scene product film for the
Kestrel thermos (a brushed-steel camping thermos with a dented olive-green
cap) in a harbour net shed before dawn, with a supplied hero image. The
user's own film replaces it.
Argument names are the live MCP names. Placeholders are in angle brackets.
Node ids below follow the server's naming for compiled shots: a group
`g_<suffix>`, an image node `img_<suffix>`, a clip node `vid_<suffix>`; read
the real ids from `get_workflow`.

## Probes

```json
{}
```

`get_status` and `get_ledger`, once per session, both free.

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

## `import_asset`: the hero

```json
{
  "url": "https://example.com/kestrel-thermos-reference.jpg",
  "kind": "image",
  "filename": "kestrel-thermos-reference.jpg"
}
```

Returns the hosted Lavendly url. Keep it; it goes on the reference node.
Repeat for a style plate if the user has one. Media pasted in the chat never
reaches you: ask for an Asset Library upload (then `list_assets`) or a
public URL.

It returns a path like `/api/v1/storage/m/<key>`. Use it exactly as
returned on image nodes and tracks; never rewrite it to an absolute https
url (the provider cannot open a signed-in link). A link the user copies
from the app (`https://app.lavendly.ai/api/v1/storage/m/<key>`) goes in as
its `/api/v1/storage/m/<key>` path.

## `create_workflow`: scenes in order

```json
{
  "name": "The Kestrel thermos, before dawn",
  "description": "Three scenes: the cap, the bench, the hero shot. One thermos, one cool window source.",
  "aspect": "16:9",
  "videoModel": "google/veo-3.1-fast",
  "shots": [
    { "prompt": "<motion prompt, scene 1>", "duration": 6 },
    { "prompt": "<motion prompt, scene 2>", "duration": 6 },
    { "prompt": "<motion prompt, scene 3>", "duration": 4 }
  ],
  "project_name": "<only when the user named a project>",
  "idempotency_key": "wf-kestrel-2026-10-14"
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

## `set_scene_plan`: the plan stored with the film

Right after `get_workflow`, before any `generate_scene`:

```json
{
  "workflow_id": "<id>",
  "scenes": {
    "vid_1": { "heading": "net shed, before dawn", "present": ["Idris", "Lucie", "the Kestrel thermos"], "hands_off": "Idris slides the thermos along the bench to Lucie" },
    "vid_2": { "heading": "net shed, before dawn", "present": ["Idris", "Lucie", "the Kestrel thermos"], "hands_off": "the cap off, steam rising, the thermos upright between them" }
  }
}
```

Keys are clip node ids. `heading` up to 80 characters (the plan's heading
word for word), `present` up to 8 entries of up to 60, `hands_off` up to
200. An entry replaces that scene's plan, `null` removes it, scenes left out
are kept. When a planned scene is generated, its prompt opens with
"Scene: <heading>" and, when `present` is not empty, "In frame: <present>,
exactly one of each. Nobody else enters the frame, and no second copy, twin
or reflection of them." That line replaces the Film Bible's film-wide cast
line in that scene, so list everyone who should be seen. `hands_off` is
stored, not put in the prompt. `get_scene_plan` with `workflow_id` returns
`{ workflow_id, version, scenes }`; read it first in any later session.

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
        "title": "Reference: the Kestrel thermos",
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

## `create_sequence`: chapters on the canvas

```json
{
  "workflow_id": "<workflow_id>",
  "scene_ids": ["g_<a>", "g_<b>", "g_<c>"],
  "name": "Cold open"
}
```

Only for a film with more than about six scenes or distinct chapters: one
sequence per heading of the sequence plan, with the scene (group) ids from
`get_workflow` in order. Organisation only; nothing about the cut changes.
Returns `{ id, name, scene_ids }`. `list_sequences` reads them back,
`update_sequence` takes `sequence_id` with a new `name` or the full new
`scene_ids`, and `delete_sequence` removes the rectangle and keeps the scenes.

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
  "scope": "film",
  "text": "Three words at the start.\nSix more as the room comes in.\nA last line on the hero shot.",
  "voice": "<voice id from get_status, or omit for the default>",
  "subtitleStyle": "off",
  "idempotency_key": "vo-<workflow id>"
}
```

One track carries the whole script, one line per scene, inside the 2.3 words
per second budget of the scene it covers. `subtitleStyle` from `off`,
`tiktok`, `reels`, `youtube`, `caption`. No `volume` on a voiceover.

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

## `attach_track`: one score

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "music",
  "scope": "film",
  "mood": "Warm, sparse felt piano over a low string pad. Opens on a single held note as the cap turns, builds gently through the net shed, lands on one sustained chord for the hero shot. Instrumental, never busy.",
  "duration": 18,
  "ducking": true,
  "volume": 0.35,
  "idempotency_key": "music-<workflow id>"
}
```

`duration` equal to the film's length (5 to 120); the block cuts the score
at its end. `mood` or `url` is required. Fallback when the server answers
`url required`: the same call with `url` set to a hosted file.

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


## `estimate_cost`, then approval

```json
{ "workflow_id": "<id>" }
```

Read `total`, `opening_image_credits`, `per_scene`, `available_credits`,
`sufficient`. Announce in one line and wait for a yes:

```text
4 shots on Veo 3.1 Fast: clips 48 credits, opening images 8, total 56; narration and score charged when attached; 144 left after. Go ahead?
```

`max_credits` caps one call: on `generate_scene` for one scene, that scene's
line in `per_scene` plus its opening image; on `create_render`, the approved
`remaining`. The server answers `quote_exceeded` instead of overspending.

## `generate_scene`: one scene at a time

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "max_credits": 40, "idempotency_key": "gen-<workflow id>-vid_1" }
```

`node_id` must be a clip node (type videoGenerator): an image node answers
`node_not_found`. There is no image-only generation on the MCP; an opening
image is made only with its clip and paid with it.

Then `get_generation_status` every 5 to 10 seconds, silently. When scene 1
lands, `get_scene_frame` with `node_id` `vid_1`, look, `quality_check`, and
only then generate scene 2. The opening image of a scene is made first when
its image node has a prompt and no url; its price was in the estimate. To
re-roll a bad opening image, change the image node's prompt and clear its
`data.url` with `update_workflow` (the full `nodes` array), then
`generate_scene` for that scene: a new opening image is made, then the clip.

## `quality_check`: per scene, then the film

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "expect_audio": true }
```

Reads `pass`, `score`, `failures`, `reroll_hint`, `story_pass`. A false
`story_pass` alone is advisory: open the frame before spending.

The cut into a scene, once both scenes are generated:

```json
{ "workflow_id": "<id>", "node_id": "vid_2", "previous_node_id": "vid_1", "same_scene": true, "present": ["Idris", "Lucie", "the Kestrel thermos"] }
```

Adds `cut: { previous_node_id, same_scene, cut_pass, findings, boundary,
notes }`. Each finding: `severity` (high, medium, low), `family`, `kind`
(identity, cast, state, light, geography, repeat), `detail`, `why`, `fix`,
`mode` and `confidence` (0.6). `cut_pass` is false when any finding is
high; the cut never flips `pass`, and `skip_vlm` skips it. `same_scene`
defaults to true; false keeps only identity (for names in `present`) and
repeat. A bad earlier scene answers with a `previous_` code
(`previous_node_not_found`, `previous_not_generated`).

For the rendered film, omit `node_id`; the answer adds `loudness`
(`integrated_lufs`, `true_peak_dbtp`, `lra`, `target_lufs`,
`target_true_peak_dbtp`). Below -20 or above -10 LUFS, or a true peak above
-1 dBTP, adds a warning to `failures`; it never flips `pass`.

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
`at_sec` (seconds into the clip, rate-aware, not film time) cuts one clip
into two halves; the second half gets no audio edges. `move_clip` with
`timeline_start_sec` sets the order; a gap is never rendered (clips play
back to back) and an overlap renders only as a dissolve. Applied in the export: trim, speed, volume, mute,
fades, crop, rotate, flip, reverse, color; `loop`, `resize`, `stabilize` and
`lut_id` are accepted but ignored.

## A dissolve: `move_clip` plus two fades

Trim first (a left trim moves `timeline_start`). Then:

1. Give every video clip a position, in film order: `move_clip` the first
   to 0 and each next one to the previous start plus the previous clip's
   `duration` (from `get_workflow`, or from the `edit_clip` answer). A clip
   with no position renders after every clip that has one.
2. `move_clip` the later clip of the pair to the earlier one's start plus
   its `duration` minus the overlap, and every clip after it earlier by the
   same overlap, so no gap opens (a render finished in the browser plays a
   gap as black).
3. `edit_clip` the earlier clip with `fade_out_ms` and the later clip with
   `fade_in_ms`, both equal to the overlap in ms (within 50 ms).

For `vid_2` at 6 s lasting 6 s and a 1 s dissolve into `vid_3`:

```json
{ "workflow_id": "<id>", "node_id": "vid_3", "timeline_start_sec": 11 }
{ "workflow_id": "<id>", "node_id": "vid_2", "edits": { "fade_out_ms": 1000 } }
{ "workflow_id": "<id>", "node_id": "vid_3", "edits": { "fade_in_ms": 1000 } }
```

The export blends picture and sound over the overlap and the film is the
timeline length (shorter by the overlap). An overlap without matching
fades plays back to back; fades without an overlap are a dip to black.

## `get_scene_frame`: chaining a continuing shot

`get_scene_frame` returns `frame_url` as a path like
`/v1/storage/images/thumb_<id>.jpg`. Prefix it with `/api` before writing it
to the next image node's `data.url` (`/api/v1/storage/images/thumb_<id>.jpg`);
the path without `/api` is dropped and the clip runs without a first frame.
Never use an absolute https url. Frame last reads the raw clip, not the
trimmed window: chain only from a scene that is not trimmed at its end, or
describe the end state in words instead.

## `create_render`, `get_render`

```json
{ "workflow_id": "<id>", "idempotency_key": "render-<workflow id>" }
```

Free; it reuses the generated clips. Every export is normalized to -14 LUFS
with a -1.5 dBTP true peak ceiling. Poll `get_render` until done; its result
carries `loudness` (`normalized`, `integrated_lufs`, `true_peak_dbtp`,
`lra`). Then `quality_check` without `node_id` once, then deliver the link.
