# MCP call shapes: characters

Exact arguments for carrying an identity through a film. Argument names are
the live MCP names; every schema rejects unknown arguments. Node ids follow
the server's naming for compiled shots (`img_` for image nodes, `vid_` for
clip nodes); read the real ids from `get_workflow`.

## `import_asset`: the hero, a packshot, a sheet

```json
{ "kind": "image", "url": "https://example.com/mia-face.jpg", "filename": "mia-face.jpg" }
```

Returns a hosted Lavendly url. Images up to 25 MB; url ingest is buffered up
to 64 MB, inline `data` about 11 MB. Repeat for each sheet image and each packshot angle. Media pasted
in the chat never reaches you: ask for an Asset Library upload or a public
url.

## Casting: two scenes, sheet stills plus screen tests

```json
{
  "name": "Mia, casting",
  "description": "Face and full figure on grey, with screen tests.",
  "videoModel": "bytedance/seedance-2.0-mini",
  "aspect": "16:9",
  "shots": [
    { "prompt": "<screen-test motion prompt, face>", "duration": 4 },
    { "prompt": "<screen-test motion prompt, quarter turn>", "duration": 4 }
  ],
  "idempotency_key": "wf-mia-casting"
}
```

Then `get_workflow`, and `update_workflow` to set each image node's
`data.prompt` to the sheet still prompt (the `shots` text would otherwise
become the image prompt). `estimate_cost`, announce, `generate_scene`
without `node_id` (both scenes are independent). After both land:

- `get_workflow`: each image node's `data.url` is a sheet image.
- `get_scene_frame` on the figure scene with frame mid and frame last: the
  three-quarter and profile views. Before wiring one of these as a
  reference, prefix the returned path with `/api` (see the chain below).

```json
{ "workflow_id": "<casting id>", "node_id": "vid_2", "frame": "last" }
```

## The film: still prompts, first frames and references in one update

After `create_workflow` for the film and `get_workflow`, send one
`update_workflow` with the full `nodes` and `edges` arrays. Abridged:

```json
{
  "workflow_id": "<film id>",
  "nodes": [
    { "id": "img_1", "type": "imageSource", "data": { "prompt": "<still-frame prompt: locked description first, under 500 characters>" } },
    { "id": "img_2", "type": "imageSource", "data": { "url": "<hosted packshot url, three-quarter angle>" } },
    {
      "id": "ref_1",
      "type": "imageSource",
      "position": { "x": 80, "y": -260 },
      "data": { "title": "Reference: Mia, face", "url": "<hosted face url>", "imgSource": "upload", "reference": true }
    },
    {
      "id": "ref_2",
      "type": "imageSource",
      "position": { "x": 320, "y": -260 },
      "data": { "title": "Reference: Mia, outfit", "url": "<hosted full-figure url>", "imgSource": "upload", "reference": true }
    },
    "<every other node unchanged, with its position, group fields and data>"
  ],
  "edges": [
    "<every existing edge, the scene's own image edge first on each clip>",
    { "id": "ref_1->vid_1", "source": "ref_1", "target": "vid_1", "data": { "mode": "reference" } },
    { "id": "ref_2->vid_1", "source": "ref_2", "target": "vid_1", "data": { "mode": "reference" } },
    { "id": "ref_1->vid_3", "source": "ref_1", "target": "vid_3", "data": { "mode": "reference" } }
  ]
}
```

- The first image with a url reaching a clip is its first frame; the next
  ones are its references, in edge order. Keep the scene's own image edge
  first, then the references in the order the role sentences number them.
- Wire references to clip nodes. Wiring them to image nodes changes nothing
  on the MCP path (opening images are text only); it helps only if the user
  later regenerates the still in the app.
- Edge `mode` is read by the canvas only; the server path ignores it.
- Count edges per clip: the model's cap, at most 3 on the MCP path, none on
  Veo 3.1 Lite or Auto. Without a Film Bible the server applies no per-model
  cap, and a Veo 3.1 Lite scene with any reference is retried, then skipped
  uncharged while the render still ends `done`: count the scenes in every
  render.
- An image node with a url (`img_2` above) is not regenerated and costs no
  opening image. Each scene gets its own url or prompt: no two scenes start
  from the same frame.

## Generate scene 1 alone and look

```json
{ "workflow_id": "<film id>", "node_id": "vid_1", "max_credits": 11, "idempotency_key": "gen-<film id>-vid_1" }
```

`get_generation_status` every 5 to 10 s, silently. Then:

```json
{ "workflow_id": "<film id>", "node_id": "vid_1", "frame": "first" }
```

Open the first frame and compare it to the sheet before paying for scene 2.
`quality_check` with `node_id`; a `failures` entry naming identity drift
goes to the repair ladder.

## Chain scene 1 into scene 2

```json
{ "workflow_id": "<film id>", "node_id": "vid_1", "frame": "last" }
```

Then `update_workflow` with the full arrays, scene 2's image node carrying
`/api` plus that path:

```json
{ "id": "img_2", "type": "imageSource", "data": { "url": "/api/v1/storage/images/thumb_<id>.jpg", "prompt": "<kept for the record; not used while a url is set>" } }
```

`get_scene_frame` returns `frame_url` as a path like
`/v1/storage/images/thumb_<id>.jpg`. Prefix it with `/api` before writing it
to the next image node's `data.url` (`/api/v1/storage/images/thumb_<id>.jpg`);
the path without `/api` is dropped and the clip runs without a first frame.
Never use an absolute https url. Frame last reads the raw clip, not the
trimmed window: chain only from a scene that is not trimmed at its end, or
describe the end state in words instead.

Then `estimate_cost`, announce, `generate_scene` for `vid_2`. Count the hop.

## A clean keyframe at hop 3

Clear the url and give the node a still-frame prompt; the server makes a new
opening image from it before the clip:

```json
{ "id": "img_4", "type": "imageSource", "data": { "url": null, "prompt": "<locked description first, then the pose and place the last frame showed>" } }
```

If the server rejects a null url, send the node without the `url` key. Or
set the url to a still the user made in the app from the sheet.

## One voice for the character

```json
{
  "workflow_id": "<film id>",
  "clip_id": "vid_1",
  "kind": "voiceover",
  "text": "<the character's lines or the narration, within the word budget>",
  "voice": "<the character's ElevenLabs voice id, for example 21m00Tcm4TlvDq8ikWAM>",
  "subtitleStyle": "reels",
  "idempotency_key": "vo-<film id>"
}
```

Pass the voice every time. Without it, or with an OpenAI voice name
(alloy, nova and the rest), synthesis lands on the default ElevenLabs voice
(Rachel), not the character's. Ids work with direct ElevenLabs (`get_status`
`models.tts_voices` lists ElevenLabs voices); when that list shows the
OpenAI names, voice runs through OpenRouter and takes the names sarah,
george, adam, alice, bella, bill, brian, callum, charlie, chris, daniel,
eric, harry, jessica, laura, liam, lily, matilda, river, roger, will.
Never pass `volume` on a voiceover (it is stored as a percent; the default
100 is unity). Script up to 4,000 characters, priced per character.

A voiceover that runs across several scenes must reach every clip: pass
`"scope": "film"` on `attach_track` where `get_schema` lists `scope`;
otherwise, after the attach, `get_workflow`, then `update_workflow` with the full `nodes` and
`edges` arrays and one more edge per other clip, copied from the edge
`attach_track` made (new `id` and `target`). Left on one clip, a long
voiceover freezes that clip's last frame for the rest of the track. A line
that belongs to one scene stays on that clip. Captions burn only from a
synthesized voiceover with a `subtitleStyle`, on a film of two or more
scenes; a voiceover by `url` and native dialogue get none. Premade ids the server knows include Rachel
21m00Tcm4TlvDq8ikWAM, Adam pNInz6obpgDQGcFmaJgB, Bella EXAVITQu4vr4xnSDxMaL,
Antoni ErXwobaYiN019PkySvjV, Elli MF3mGyEYCl7XYWbV9V6O, Josh
TxGEqnHWrfWFTfGW9XjX, Arnold VR6AewLTigWG4xSOukaG, Sam yoZ06aMxZJJ28mfd3POQ.
A cloned voice works only for its owner. Fallback when the server answers
`url required`: the same call with `url` set to a hosted voice file made in
the app with the same voice.

## Native dialogue clips

```json
{ "workflow_id": "<film id>", "clip_id": "vid_3", "native_audio": { "mode": "native", "volume": 1 } }
```

`native` keeps the spoken line at its level and never ducks it under
narration. Use `quality_check` with `expect_audio` true on that clip.
