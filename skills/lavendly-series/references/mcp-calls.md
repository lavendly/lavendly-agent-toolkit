# MCP call shapes: series

Exact arguments for starting a show, making the next episode from the last
one, recording the story so far, and scheduling approved episodes. Argument
names are the live MCP names; placeholders in angle brackets. The
episode's own build (shots, references, sound, estimate, generation,
checks, render) follows the director's call shapes.

## Start the show

```json
{
  "name": "Pip of Whisperpine",
  "description": "Bible v1. Kids fable, 60 s weekly, 16:9. Pip: small round red fox cub, oversized ears, cream chest and tail tip, amber eyes, notch in left ear, blue knitted scarf; on four paws. Moss: small grey owl, one white feather over the right eye. Style: storybook gouache, soft paper texture. Format: the hollow at dusk, the problem, two tries, a friend helps, goodnight sign-off.",
  "primary_color": "#B5482E",
  "secondary_color": "#EADBC8"
}
```

`create_project` returns the project; keep its id for every episode. The
description cannot be updated later by the MCP: keep it short and final.
Names are stored up to 80 characters and descriptions up to 400 (project
and workflow alike); longer text is cut silently, so count before sending.

## References, once

```json
{ "kind": "image", "url": "https://example.com/pip-head-closeup.png", "filename": "pip-head-closeup.png" }
```

`import_asset` per sheet, head close-up and place plate; record each hosted
url in the bible.

It returns a path like `/api/v1/storage/m/<key>`. Use it exactly as
returned on image nodes and tracks; never rewrite it to an absolute https
url (the provider cannot open a signed-in link). A link the user copies
from the app (`https://app.lavendly.ai/api/v1/storage/m/<key>`) goes in as
its `/api/v1/storage/m/<key>` path.

## Episode 1

```json
{
  "name": "Pip of Whisperpine S01E01: The First Lantern",
  "description": "S01E01. Bible v1.",
  "project_id": "<project id>",
  "aspect": "16:9",
  "videoModel": "bytedance/seedance-2.0-fast",
  "shots": [
    { "prompt": "<recurring first shot: the hollow at dusk, locked text>", "duration": 5 },
    { "prompt": "<the problem>", "duration": 5 }
  ],
  "idempotency_key": "wf-pip-s01e01"
}
```

Then the director's steps: `get_workflow`, `set_scene_plan`,
`update_workflow` (still prompts, reference nodes with the bible's hosted
urls), `set_clip_native_audio`, `attach_track` (voice, score),
`estimate_cost`, `generate_scene` scene by scene, `quality_check` per scene
and per cut, `create_render`.

The scene plan, keyed by clip node id, before the first `generate_scene`:

```json
{
  "workflow_id": "<episode workflow id>",
  "scenes": {
    "vid_1": { "heading": "the hollow, dusk", "present": ["Pip"], "hands_off": "Pip looks up at the dark lantern" },
    "vid_2": { "heading": "the hollow, dusk", "present": ["Pip", "Moss"], "hands_off": "Moss lands on the stone" }
  }
}
```

`heading` is the plan's heading word for word (up to 80 characters);
`present` lists exactly who is seen, from the closed cast (up to 8 entries
of up to 60). The server opens each planned scene's prompt with "Scene:
<heading>" and "In frame: <present>, exactly one of each. Nobody else enters
the frame, and no second copy, twin or reflection of them." `hands_off` is
stored for the next session, not put in the prompt. The cut check reads the
same plan: `quality_check` with `node_id`, `previous_node_id`, `same_scene`
(true under one heading) and `present`.

## After delivery: the story so far

```json
{
  "workflow_id": "<episode workflow id>",
  "description": "S01E01. Bible v1. Story so far: Pip lights the oak's lantern alone for the first time. End state: Pip in the hollow, scarf on, one lantern lit on the flat stone; dusk turning to night. Next: the rain is coming."
}
```

`update_workflow` with only `workflow_id` and `description` (400
characters at most; longer is cut silently). Then `get_workflow` and confirm
the description came back whole.

Keep the score's hosted url for the next episodes: `get_workflow_audio`
lists the episode's tracks with their urls.

## The next episode

Find the show and its latest episode:

```json
{}
```

`list_projects` (no arguments). Then:

```json
{}
```

`list_workflows` takes no filter and ignores `limit`: it returns every
workflow of the account, newest update first, each row with `name`,
`description` and `project_id`. Keep the rows whose `project_id` is the
show's project and whose name starts "Pip of Whisperpine S01E".
Then:

```json
{ "workflow_id": "<latest episode id>" }
```

`get_workflow`: read the description, the reference nodes (`data.reference`
true) and their urls, the locked slot prompts. Then `get_scene_plan` with
the same `workflow_id`: the last scene's heading, who was present and its
hand-off (an empty `scenes` means the episode was made without one). Then
the final frame:

```json
{ "workflow_id": "<latest episode id>", "node_id": "<last clip id>", "frame": "last" }
```

`get_scene_frame` returns an image path: open it and write the starting
states. To use it as an opening image, prefix it with `/api` before writing
it to a `data.url`.

Create the new episode in the same project with the same model, the same
references by url, the same voice id and the reused score:

```json
{
  "workflow_id": "<new episode id>",
  "clip_id": "<first clip id>",
  "kind": "music",
  "scope": "film",
  "url": "<hosted score url from episode 1>",
  "duration": 60,
  "volume": 0.3,
  "ducking": true,
  "idempotency_key": "music-<new episode id>"
}
```

A score by `url` gets a 30 s block unless `duration` is passed: set it to
the episode's length. Attach the narration the same way, with
`"scope": "film"` (the voice in the bible's voice id, no `volume`), and
confirm both reach every clip, exactly as below.

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


## The recurring first shot, identical by design

When the opening shot must match episode 1 exactly, put episode 1's opening
image url on the new episode's first image node (it is then not
regenerated), keep the same motion prompt, and pass the same seed:

```json
{ "workflow_id": "<new episode id>", "node_id": "<first clip id>", "options": { "seed": 4242 }, "max_credits": 13, "idempotency_key": "gen-<new episode id>-first" }
```

Whether a provider honours `seed` is not verified; check the frames. Never
reuse an opening image anywhere else in the episode.

## Unattended pre-flight

`get_ledger`, then `get_monthly_usage` (stop when the month's share is above
0.85), then `estimate_cost` against the run's cap. `generate_scene` carries
`max_credits` per scene so the server refuses with `quote_exceeded` rather
than overspending.

## Scheduling approved episodes

After the user's explicit yes per episode (lavendly-publish owns the
confirmation and the disclosure):

```json
{
  "workflow_id": "<episode id>",
  "channel_id": "<channel id from list_channels>",
  "when": "2026-10-23T17:00:00+02:00",
  "title": "Pip of Whisperpine, Episode 3: The Long Night",
  "caption": "Pip and Moss find paw prints in the snow. A new episode every Friday."
}
```

`schedule_video` returns a `scheduled_post_id`; report the time in the
user's time zone.
