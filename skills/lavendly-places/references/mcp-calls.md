# MCP call shapes: places

Exact arguments for a five-scene 15 s listing film built from the user's
photos, and for a concept scene made from text. Argument names are the live
MCP names; placeholders are in angle brackets. Read the real node ids from
`get_workflow`; compiled shots use a group `g_<suffix>`, an image node
`img_<suffix>` and a clip node `vid_<suffix>`.

## Probes

`get_status`, `get_ledger`, free, once per session. `get_schema` when a
field or option is in doubt.

## `import_asset`: one call per photo

```json
{ "url": "https://example.com/listing/01-front.jpg", "kind": "image", "filename": "01-front.jpg" }
```

Returns the hosted Lavendly url. Keep a list in scene order: photo name,
hosted url, room or view, orientation. Images up to 25 MB. Video footage
(`kind` video, up to 64 MB by `url` and 3 minutes; inline `data` about 11
MB) imports the same way and becomes a clip through `update_workflow`: a
videoGenerator node with `data.video_url` set to the hosted url and
`data.duration`, in scene order. It costs no generation credits; never call
`generate_scene` on it. A photo never plays as a clip on its own: it opens a
generated scene. Media pasted in the chat never reaches you: ask for an
Asset Library upload or a public URL.

It returns a path like `/api/v1/storage/m/<key>`. Use it exactly as
returned on image nodes and tracks; never rewrite it to an absolute https
url (the provider cannot open a signed-in link). A link the user copies
from the app (`https://app.lavendly.ai/api/v1/storage/m/<key>`) goes in as
its `/api/v1/storage/m/<key>` path.

## `create_workflow`: scenes in order

```json
{
  "name": "12 Alder Lane, listing 15 s",
  "description": "Front, entry, living, kitchen, garden at dusk. Photo-led, camera and light only.",
  "aspect": "16:9",
  "videoModel": "google/veo-3.1-fast",
  "shots": [
    { "prompt": "<motion prompt, scene 1: front>", "duration": 4 },
    { "prompt": "<motion prompt, scene 2: entry>", "duration": 4 },
    { "prompt": "<motion prompt, scene 3: living>", "duration": 4 },
    { "prompt": "<motion prompt, scene 4: kitchen>", "duration": 4 },
    { "prompt": "<motion prompt, scene 5: garden>", "duration": 4 }
  ],
  "idempotency_key": "wf-alder-listing-15"
}
```

- Only the top-level `videoModel` and `aspect` apply to every shot.
- Each `duration` is a length the model makes (Veo 4, 6, 8; Wan 2.7 2 to
  10; Wan 3.0 2 to 30; Kling v3 3 to 15; Hailuo 2.3 6 or 10). It is sent as
  written; a length off the list can be refused.
- The shot `prompt` is the clip's prompt verbatim; its first 500
  characters also become the opening image prompt, which the next step
  replaces (with a photo, or a real still prompt).

## `update_workflow`: photos as first frames

One call; send the full `nodes` and `edges` arrays back (they are
replaced). For each photo scene set the image node's `data.url` to the
hosted photo. An image node with a url is not regenerated: no opening image
is made or charged, and the clip opens exactly on the photo.

```json
{
  "workflow_id": "<id>",
  "nodes": [
    "<every existing node unchanged, except:>",
    { "id": "img_1", "type": "imageSource", "position": "<as read>", "data": { "<existing fields>": "...", "url": "<hosted url of 01-front.jpg>", "imgSource": "upload" } },
    { "id": "img_2", "type": "imageSource", "position": "<as read>", "data": { "<existing fields>": "...", "url": "<hosted url of 02-entry.jpg>", "imgSource": "upload" } }
  ],
  "edges": ["<every existing edge, unchanged>"]
}
```

Keep every existing field of each node (group membership, aspect, title);
change only `data.url` (and `data.imgSource`). On the MCP path the first
connected image with a url is the first frame; leave each clip's own image
edge first.

## `update_workflow`: concept scenes

For text-made scenes, set the image node's `data.prompt` to the still-frame
prompt (subject first, under 500 characters, the start state, the light
line, no action, no camera move) and leave `data.url` empty. A style plate
or a location photo the user owns can be wired into the clips as a
reference node (within the cap: 4 on Seedance and Wan 2.6, 2.7 with at most
3 sent besides the first frame on the MCP path, 2 on the others, 0 on Veo
3.1 Lite: a Lite scene with any reference is skipped uncharged and the
render still ends `done`, so count the scenes in every render), with its role in the motion prompt ("Reference 1 is the palette
and light only; ignore its content").

## `set_clip_native_audio`

```json
{ "workflow_id": "<id>", "clip_id": "vid_3", "native_audio": { "mode": "mix", "volume": 0.3 } }
```

`mix` 0.3 to 0.5 under narration (the room tone and birds stay under the
voice), `native` 1 where the place's sound is the point (waves, a sizzle, a
crowd at a teaser's end), `off` for a music-only edit. Set every clip.

## `attach_track`: narration and score

```json
{
  "workflow_id": "<id>",
  "clip_id": "vid_1",
  "kind": "voiceover",
  "scope": "film",
  "text": "Three bedrooms on a quiet lane.\nLight from both sides, all day.\nA kitchen made for long dinners.\nBook a viewing this week.",
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
  "mood": "Light acoustic guitar and soft piano around 96 BPM, warm and unhurried. Opens on a single guitar figure at the front door, adds piano through the rooms, lifts gently in the garden, ends on a held chord at dusk. Instrumental.",
  "duration": 15,
  "ducking": true,
  "volume": 0.3,
  "idempotency_key": "music-<workflow id>"
}
```

One voice and one score per film. Score credits 2 for 15 s, 3 for 30 s, 6
for 60 s; voice about 1 credit per 1,000 characters on the default model.
Fallback when the server answers `url required`: the same call with `url`
set to a hosted file (a voiceover by `url` gets no captions). A tempo in the
brief is a request the provider may not follow: never promise exact BPM.

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

## `estimate_cost`, then yes

```json
{ "workflow_id": "<id>" }
```

Photo scenes show no opening image charge. Announce:

```text
5 photo scenes on Veo 3.1 Fast: clips 70 credits, no opening images, narration and score about 3; total 73; 427 left after. Go ahead?
```

## `generate_scene`, scene by scene

```json
{ "workflow_id": "<id>", "node_id": "vid_1", "max_credits": 14, "idempotency_key": "gen-<workflow id>-vid_1" }
```

`max_credits` is that scene's `per_scene` line plus its opening image (none
on a photo scene). Poll `get_generation_status` every 5 to 10 s silently.

## Checking a place against its photo

```json
{ "workflow_id": "<id>", "node_id": "vid_3", "frame": "last" }
```

`get_scene_frame` with first, mid and last: count the windows, doors and
openings, check that walls stay straight and furniture stays put, compare
the view with the photo. Then `quality_check` with `node_id` and
`expect_audio` true. A changed feature is a Critical finding on a real
place, whatever the score.

## `edit_clip`: trims, holds, a dip for time passing

```json
{ "workflow_id": "<id>", "node_id": "vid_2", "edits": { "trim": { "start_ms": 300, "end_ms": 3600 } } }
```

```json
{ "workflow_id": "<id>", "node_id": "vid_4", "edits": { "fade_out_ms": 400 } }
```

```json
{ "workflow_id": "<id>", "node_id": "vid_5", "edits": { "fade_in_ms": 400, "trim": { "start_ms": 0, "end_ms": 4000 } } }
```

Trim the first 300 to 600 ms when the move starts with a lurch, and the
tail when walls start to bend. A slow hold: trim a steady stretch and set
`speed` to 0.5. Hard cuts between rooms; a dip to black (`fade_out_ms` then
`fade_in_ms`) for day to dusk, or a dissolve between two rooms: give every
video clip a position in film order with `move_clip` (an unpositioned clip
renders after the positioned ones), move the later clip and every clip
after it earlier by the overlap, then `fade_out_ms` on the earlier and
`fade_in_ms` on the later equal to the overlap (within 50 ms). Otherwise
clips play back to back; `move_clip` sets the order, and `split_clip`
`at_sec` counts from the clip's own start. A film of one clip node applies
these edits too: any picture edit sends it through the full stitch.

## `create_render`, `get_render`

```json
{ "workflow_id": "<id>", "idempotency_key": "render-<workflow id>" }
```

Free. Poll `get_render` until done, then `quality_check` with no
`node_id`. A second aspect (9:16 after 16:9) is a second workflow with
vertical photos; the prompts carry over, the clips are paid again.
