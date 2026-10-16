# MCP call shapes: music video

Exact arguments for the 30 s chorus cut in [beat-maths.md](beat-maths.md)
section 8 (128 BPM, first downbeat at 0.470 s) on Seedance 2.0 Fast, from
the track to the placed cut. Argument names are the live MCP names;
placeholders in angle brackets. Read real node ids from `get_workflow`.

## The track

From a public link:

```json
{ "kind": "music", "url": "https://example.com/my-song-chorus-edit.wav", "filename": "my-song-chorus-edit.wav" }
```

`import_asset` returns the hosted url. From the Asset Library the user
shares the hosted link directly; use it as is. Limits: 50 MB and 10 minutes
per music file; the film is at most 180 s.

## `create_workflow`: one shot per source clip, in timeline order

```json
{
  "name": "Nova, Silver (chorus cut)",
  "description": "30 s chorus cut, 128 BPM, downbeat 0.470 s. Song attached once; clips silent.",
  "aspect": "9:16",
  "videoModel": "bytedance/seedance-2.0-fast",
  "shots": [
    { "prompt": "<motion prompt: rooftop at dusk, wide>", "duration": 5 },
    { "prompt": "<motion prompt: hand on the railing>", "duration": 5 },
    { "prompt": "<motion prompt: Take A, performance>", "duration": 10 },
    { "prompt": "<motion prompt: city lights b-roll>", "duration": 5 },
    { "prompt": "<motion prompt: the red scarf motif>", "duration": 5 },
    { "prompt": "<motion prompt: burst source>", "duration": 5 },
    { "prompt": "<motion prompt: crane up, post-chorus>", "duration": 10 }
  ],
  "idempotency_key": "wf-nova-silver-chorus"
}
```

Then `get_workflow` and one `update_workflow` with each image node's
`data.prompt` set to its still prompt, and the artist reference wired after
the scene's own image edge (shape as in lavendly-director; a role sentence
in each motion prompt).

## Every clip silent

```json
{ "workflow_id": "<id>", "clip_id": "vid_1", "native_audio": { "mode": "off" } }
```

`set_clip_native_audio` on every clip. For a planned ambience moment:
`{ "mode": "mix", "volume": 0.3 }`.

## The song, once

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "music",
  "url": "<hosted url of the song>",
  "duration": 30,
  "volume": 1,
  "ducking": false,
  "idempotency_key": "song-<workflow id>"
}
```

No track yet: the same call with `mood` and `duration` instead of `url`
(5 to 120 s; charged when attached, about 3 credits per 30 s). The provider
(ElevenLabs Music or Lyria 3, `get_status` `music.provider`) may not follow
the BPM in the brief: never promise exact tempo; the user confirms the
downbeats after listening. If the server answers `url required`, the user
makes the track in the app's Asset Library and you attach it by `url`.

## The song across the whole film: `update_workflow`

Where `get_schema` lists `scope` on `attach_track`, pass `"scope": "film"`
when you attach the song: the server wires it to every clip and the edges
below are not needed (split pieces made later still need their edge).
Otherwise add them by hand.

`attach_track` wires the song's node to the first clip only. It plays as the
film's music only when its node has an edge to every clip (type
videoGenerator). Left on clip 1 it is mixed into clip 1 alone, and the
export freezes clip 1's last frame for the rest of the song. After the
attach, `get_workflow`, then send the full `nodes` and `edges` arrays back
with one more edge per other clip, copied from the edge `attach_track` made
(same shape, new `id` and `target`):

```json
{
  "workflow_id": "<id>",
  "nodes": [ "<every node, unchanged>" ],
  "edges": [
    "<every existing edge>",
    { "id": "<song node id>->vid_2", "source": "<song node id>", "target": "vid_2" },
    { "id": "<song node id>->vid_3", "source": "<song node id>", "target": "vid_3" }
  ]
}
```

Split pieces are new clip nodes with no audio edges: wire the song to them
too, after every split, and check `get_workflow_audio` before the render.

The block: a song attached by `url` gets a 30 s block unless `duration` is
passed (5 to 120 on attach); above 120 s raise it with `update_track`
`duration`. Set it to the film's length: the song is cut at the block end.
An in-point: `edit_clip` on the song's node with `trim` `start_ms` (the
source in-point) and `end_ms`. A song cut before its natural end gets
`fade_out_ms` on its node; a fade on the last clip never fades it.

```json
{ "workflow_id": "<id>", "node_id": "<song node id>", "edits": { "trim": { "start_ms": 41200, "end_ms": 71200 }, "fade_out_ms": 800 } }
```

Levels: attach-time music `volume` 1 is read as 100 percent (unity). A
later `update_track` `volume` is stored as a percent with no conversion:
pass 100 for unity, never 1.

A cold open before the song: start the song later on the film clock (a
`startTime` on a film-wide track is a position on the film, not an
in-point).

```json
{ "workflow_id": "<id>", "track_id": "<track id>", "startTime": 2.0 }
```

## Estimate, then generate

`estimate_cost` with the `workflow_id`; announce in one line:

```text
7 clips on Seedance 2.0 Fast: 99 credits, opening images 14, total 113; the song is yours (no charge); 187 left after. Go ahead?
```

`generate_scene` for the performance take first (it carries the look), check
its frames, then the rest:

```json
{ "workflow_id": "<id>", "node_id": "vid_3", "max_credits": 24, "idempotency_key": "gen-<workflow id>-vid_3" }
```

## Trims to the exact slot lengths

Slot lengths come from absolute cut times (beat-maths section 7). Skip about
500 ms of warm-up:

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "edits": { "trim": { "start_ms": 500, "end_ms": 4720 } } }
```

Slot 1 is 4220 ms long: 500 to 4720. Slot 2 (3750 ms): 500 to 4250. The
post-chorus clip (7500 ms): 500 to 8000.

## Take A into three pieces

Trim the take to the performance window, then split. `split_clip` takes
seconds into the clip's own box (rate-aware), not film time.

```json
{ "workflow_id": "<id>", "node_id": "vid_3", "edits": { "trim": { "start_ms": 500, "end_ms": 8000 } } }
```

```json
{ "workflow_id": "<id>", "node_id": "vid_3", "at_sec": 1.875 }
```

Split the second half again at 1.875 (seconds into that half). The pieces
are 1875, 1875 and 3750 ms. Then wire the song to the new pieces. The burst source splits the same way into four
937.5 ms pieces (trim 500 to 4250 first).

## Speed to fit a move

```json
{ "workflow_id": "<id>", "node_id": "vid_5", "edits": { "speed": 1.17 } }
```

The timeline box becomes the trim window divided by the speed.

## Order every clip

The export plays clips back to back in timeline order; the trims alone set
the cut times, and a timeline gap is never rendered. `move_clip` only sets
the order: give each clip its slot's start so the order and the Studio
timeline match the cut list:

```json
{ "workflow_id": "<id>", "node_id": "vid_3", "timeline_start_sec": 7.97 }
```

`move_clip` for every slot in order (0, 4.22, 7.97, 9.845, 11.72, 13.595,
15.47, 16.4075, 17.345, 18.2825, 19.22, 22.97). Then `get_workflow` and read
each clip's `timeline_start` and duration back.

## Loops for a visualizer

`edit_clip` `loop` is accepted but ignored by the export. Repeat a clip by
adding copies of its node with the same `data.video_url` and trim through
`update_workflow` (no generation credits), one after another, each wired to
the song. Check the seam first: `get_scene_frame` with frame first and frame
last on that clip.

## Render and check

`create_render` (free), poll `get_render`, then `quality_check` without
`node_id` and `get_workflow_audio`: one music track wired to every clip,
every clip `off` or the planned ambience. Its sequence findings
`continue_without_link` and `ending_unnamed` cannot be cleared on the MCP
path; ignore them. Deliver the link and ask the user to confirm sync at three
named times.
