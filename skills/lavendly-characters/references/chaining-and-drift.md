# Chaining and drift

Chaining puts the last frame of one clip at the start of the next, so a
face, a coat or a product carries over pixel for pixel. It is the strongest
identity tool on the MCP path and it decays with every hop.

## 1. What Lavendly does and does not do

- Only a first frame is ever sent to a video model. Last-frame conditioning
  (pinning where a clip must end) is not reachable.
- The canvas chains automatically through video-to-video links; the server
  path that MCP agents drive ignores those links. Chaining is by hand.
- An image node that has a url is used as is and not regenerated; its
  prompt is ignored. A chained scene therefore costs no opening image.

## 2. Chaining by hand

1. Generate scene N alone and wait for it to land.
2. `quality_check` scene N and open its frames. Do not chain from a scene
   that drifted: the next one inherits the fault.
3. `get_scene_frame` on scene N with frame last. Open the image: is the
   hero whole, sharp, not mid-blink, not mid-blur?
4. `update_workflow`: set scene N+1's image node `data.url` to `/api` plus
   the returned path (`/api/v1/storage/images/thumb_<id>.jpg`; the path
   without `/api` is dropped and the clip starts from nothing). Send the full
   `nodes` and `edges` arrays. Frame last reads the raw clip, not a trimmed
   window: when N is trimmed at its end, describe its end state instead.
5. Write N+1's motion prompt from what the last frame shows, not from what
   N's prompt asked for: position, facing, state, who is present.
6. `estimate_cost`, announce, `generate_scene` for N+1 only.

Write the continuation as a description of the opening frame and the
movement still carrying (for example "Dara is mid-stride toward the door,
as in the opening frame; she keeps walking..."). Do not open the prompt with "This
shot continues the previous": the whole-film sequence lint can flag that
opening as a continuation with no canvas link.

If `get_schema` shows no frame option on `get_scene_frame`, the call
returns the mid frame: do not chain from it. Describe the end state of N at
the start of N+1's motion prompt instead.

## 3. The drift limit

Each hop passes through a decoded video frame: detail softens, faces lose
their marks, the palette slides warm or green, the resolution is the clip's
(720p on Kling and Runway). After 2 to 3 hops the face is noticeably
another person's.

- Count hops from the last clean frame. A clean frame is the approved sheet
  image, a supplied photo, an app-made still from the sheet, or a text-only
  opening image you checked against the sheet.
- At hop 3, start the next scene from a clean keyframe instead of the last
  frame.
- Wire the face reference to every chained clip on models that take one:
  it pulls each hop back toward the sheet.

## 4. The clean keyframe

Two ways, best first:

1. In the app: an image node with the sheet connected and the last frame
   connected, prompt "the same woman as the reference, in the pose and
   place of the second image; change nothing else", then import the result
   and set it as N+1's image url.
2. Through the MCP: clear N+1's image `data.url`, set its `prompt` to a
   still-frame prompt that opens with the locked description and describes
   the pose and place the last frame showed, wire the face reference to
   the clip, and generate. The still is a new text-only draw: check it
   against the sheet before trusting the clip.

## 5. Cuts reset drift

A cut to a new angle or a new size starts from a clean keyframe and the
viewer accepts the jump. Prefer a cut over a fourth hop whenever the story
does not need one continuous movement. Plan the chain for the moments that
truly continue (a walk through a door, a pour, a turn) and cut elsewhere.

## 6. Order and timing

- Chained scenes generate one after another: N+1 cannot start before N's
  last frame exists. Unchained scenes can run in parallel (up to 6).
- A re-roll of scene N invalidates every frame chained from it: re-chain
  N+1 from the new last frame and say which later scenes are now stale and
  what re-rolling them costs.

## 7. Checking a chained cut

Open N's last frame and N+1's first frame side by side
(`get_scene_frame` frame last, then frame first):

- [ ] Same face marks, hair, wardrobe, props in the same hands.
- [ ] Same light direction and colour; no warm or green slide.
- [ ] The motion continues in the same direction and at the same pace.
- [ ] Nobody new appeared, nobody vanished.
- [ ] Sharpness has not fallen visibly. If it has, the next scene starts
      from a clean keyframe.

## 8. Worked example: Dara, three scenes, Seedance 2.0 Mini, 16:9

An invented cycle courier in Manchester; the user's own hero, place and
shots replace her.

References wired to every clip after the scene's own image: 1 = the face
close-up, 2 = the full figure (scenes 1 and 2 only). Scene 1 starts from a
text-only opening image, scene 2 is chained from scene 1 (hop 1), scene 3
is a new angle from a fresh still (the chain resets).

Scene 1, still-frame prompt:

```text
Narrative short film still, 35mm look. Dara: a woman in her mid twenties, deep brown skin, oval face, high cheekbones, thick arched black eyebrows, long black box braids tied back in a low knot, a small silver ring in her right nostril only, yellow rain shell, black courier bag. She stands under a railway arch at dusk, one hand on her bicycle, facing left, braids damp. Medium shot, eye level. Cold blue streetlight from above left. Exactly one person, one bicycle. No text, no on-screen graphics.
```

Scene 1, motion prompt:

```text
Reference 1 is Dara's face and braids only; ignore its grey background and pose. Reference 2 is Dara's rain shell and courier bag only. Already in motion from the first frame: Dara looks up the street, sees the rain easing, and swings her right leg over the bicycle, one hand still on the handlebar. Locked-off camera. Dara, the arch and the blue streetlight stay exactly as in the opening frame. Exactly one Dara in frame, one bicycle, nobody else. Audio: rain dripping off the arch, a train passing overhead, no music.
```

Scene 2, first frame: scene 1's last frame. Motion prompt:

```text
Reference 1 is Dara's face and braids only; ignore its background. Dara sits astride the bicycle under the arch as in the opening frame; she pushes off and rides out into the wet street, both hands on the handlebars. Slow pan left that follows her and stops on the wet cobbles. Dara and the streetlight stay exactly as in the opening frame. Exactly one Dara, nobody else in frame; the street is empty. Audio: tyres hissing on wet cobbles, rain, no music.
```

Scene 3, still-frame prompt (a clean frame, new angle):

```text
Narrative short film still, 35mm look. Dara: a woman in her mid twenties, deep brown skin, oval face, high cheekbones, thick arched black eyebrows, long black box braids tied back in a low knot, a small silver ring in her right nostril only, yellow rain shell. She waits at a lit front door, braids damp, a parcel in both hands. Close-up, three-quarter from the side. Warm light from the doorway, blue streetlight on the wet brick behind. Exactly one person. No text, no on-screen graphics.
```

Scene 3, motion prompt:

```text
Reference 1 is Dara's face and braids only; ignore its grey background and pose. Dara breathes out, her shoulders drop, and a small smile starts at one corner of her mouth as the door light brightens on her face. Locked-off camera. Dara, the doorway and the warm light stay exactly as in the opening frame. Exactly one Dara in frame, nobody else. Audio: rain on the pavement, a door latch turning off screen, no music.
```

One `generate_scene` call makes scene 3's opening image and then its clip,
so the still cannot be approved before the clip is paid for. When scene 3's
face must match from the first frame, set its image url to a still the user
made in the app from the sheet instead of the prompt above.
