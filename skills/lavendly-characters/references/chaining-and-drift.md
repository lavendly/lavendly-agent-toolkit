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
movement still carrying ("Mia is mid-stride toward the door, as in the
opening frame; she keeps walking..."). Do not open the prompt with "This
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

## 8. Worked example: Mia, three scenes, Seedance 2.0 Mini, 16:9

References wired to every clip after the scene's own image: 1 = the face
close-up, 2 = the full figure (scenes 1 and 2 only). Scene 1 starts from a
text-only opening image, scene 2 is chained from scene 1 (hop 1), scene 3
is a new angle from a fresh still (the chain resets).

Scene 1, still-frame prompt:

```text
Narrative short film still, 35mm look. Mia: a woman in her early thirties, warm light-brown skin, oval face, thick straight black eyebrows, shoulder-length black curly hair, a small gold hoop in her left ear only, mustard corduroy jacket, dark green canvas backpack. She stands in a bus shelter at dusk, facing left, hair damp. Medium shot, eye level. Cold blue streetlight from above left. Exactly one person. No text, no on-screen graphics.
```

Scene 1, motion prompt:

```text
Reference 1 is Mia's face and hair only; ignore its grey background and pose. Reference 2 is Mia's jacket and backpack only. Already in motion from the first frame: Mia looks up the street, sees headlights, and steps to the kerb, her right hand on the backpack strap. Locked-off camera. Mia, the shelter and the blue streetlight stay exactly as in the opening frame. Exactly one Mia in frame, nobody else. Audio: rain on the shelter roof, a bus approaching, no music.
```

Scene 2, first frame: scene 1's last frame. Motion prompt:

```text
Reference 1 is Mia's face and hair only; ignore its background. Mia stands at the kerb as in the opening frame; the bus doors fold open in front of her and she steps up inside, her right hand still on the backpack strap. Slow pan left that follows her and stops on the open doors. Mia and the streetlight stay exactly as in the opening frame. Exactly one Mia, nobody else in frame; the bus is empty. Audio: doors hissing, rain, no music.
```

Scene 3, still-frame prompt (a clean frame, new angle):

```text
Narrative short film still, 35mm look. Mia: a woman in her early thirties, warm light-brown skin, oval face, thick straight black eyebrows, shoulder-length black curly hair, a small gold hoop in her left ear only, mustard corduroy jacket. She sits by a bus window, hair damp, backpack on her lap, looking out. Close-up, three-quarter from the aisle. Warm light from above, blue streetlights on the wet window. Exactly one person. No text, no on-screen graphics.
```

Scene 3, motion prompt:

```text
Reference 1 is Mia's face and hair only; ignore its grey background and pose. Mia breathes out, her shoulders drop, and a small smile starts at one corner of her mouth as she watches the street slide past. Locked-off camera. Mia, the window and the warm light stay exactly as in the opening frame. Exactly one Mia in frame, nobody else. Audio: bus engine hum, rain on the glass, no music.
```

One `generate_scene` call makes scene 3's opening image and then its clip,
so the still cannot be approved before the clip is paid for. When scene 3's
face must match from the first frame, set its image url to a still the user
made in the app from the sheet instead of the prompt above.
