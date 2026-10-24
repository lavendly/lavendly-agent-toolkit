# The hero sheet

The sheet is the picture every later frame is judged against. It is made
once, approved once, and reused by url in every scene and every episode.

## 1. Where the sheet comes from, best first

| Source | How | Cost |
|---|---|---|
| A real image the user owns (photo of a consenting person, a packshot, a drawing, an earlier episode's sheet) | Already in the Asset Library: `list_assets`; a public url: `import_asset` | free |
| Made in the Lavendly app | An image node with the user's photos connected (image-to-image, up to 3 references), or the in-app Director's lock subject (one picture: front, three-quarter, side on white), or a trained persona for a consenting person; then found with `list_assets` | 1 to 5 credits per image; persona training 100 |
| The MCP casting scenes | Section 3: two scenes whose opening images are the sheet and whose clips are screen tests | 2 opening images plus 2 short clips |

Media pasted into the chat never reaches the agent: ask for an Asset
Library upload or a public url.

## 2. Construction laws

1. Plain mid-grey background, even soft light from the front, no cast
   shadow on the background. Light and background in a reference leak into
   every shot that uses it.
2. Neutral expression, mouth closed, eyes open, looking at or just past the
   lens.
3. The head close-up is the single source of the face. Never several faces
   of one character inside one reference image: the model averages them
   into a generic face. Full-figure images are for the outfit and the
   silhouette.
4. Full figure: front view, standing straight, arms relaxed, the whole body
   from head to feet inside the frame with space around it.
5. Turnaround views (three-quarter, profile, back) come from a turn, not
   from a grid of small figures.
6. Creatures: add mouth open and mouth closed close-ups. Animals stand on
   all four legs unless the brief says otherwise.
7. Two subjects of very different size: one extra frame of both side by
   side, full figure. If the scale is uncertain, render the smaller one
   smaller, never larger.
8. Photoreal people keep facial asymmetry, pores, fine lines and age cues;
   no airbrushed skin, no mannequin symmetry, no heroic pose.
9. Products: front, three-quarter, side, top and a label close-up, on a
   neutral background, real photographs or an accurate render.
10. Every image in colour. A grade, if any, is applied in the edit.
11. Fix a flawed sheet with an edit, never by rebuilding: in the app, the
    approved image connected, "change only X; keep the face, pose, framing
    and background". A rebuilt sheet is a new person.

## 3. The MCP casting scenes

When nothing is supplied and the user will not use the app, cast through
the MCP. One workflow, two scenes, on the film's model at its shortest
exact length (a screen test of this face on that model), or on Seedance 2.0
Mini at 4 s when the film's model is expensive.

| Scene | Opening image (the sheet) | Clip (the screen test) | Frames to keep |
|---|---|---|---|
| A, face | Head and shoulders, front three-quarter, neutral, grey | A blink and a slow head turn to face the lens; creatures open and close the mouth once | The opening image (face), `get_scene_frame` mid for the open mouth |
| B, figure | Full figure, front, grey | A slow quarter turn on the spot, stopping in profile | The opening image (front), frame mid (three-quarter), frame last (profile) |

Cost, two scenes: 4 credits of opening images plus two clips. Seedance 2.0
Mini at 4 s: 22 in total. Veo 3.1 Fast at 4 s: 32. Kling v3 Standard at
3 s: 34. Veo 3.1 at 4 s: 98. Announce it like any other spend.

After generation, read each image node's `data.url` from `get_workflow`:
those hosted urls are the sheet. Show them with the locked description and
wait for approval. If the face is wrong, change one phrase in the image
prompt, clear its url, and re-roll that scene only (the still and its
screen test are both made again, at the same price). If one detail is wrong
and the face is right, keep it and change the words to match the picture,
or fix the detail in the app.

The prompts below follow one worked example: Dara, an invented cycle
courier, and Juno, an invented pangolin in a hand-drawn kids style. The
user's own hero replaces them.

### Prompts for scene A (person)

Still-frame prompt:

```text
Character reference photo. Dara: a woman in her mid twenties, deep brown skin, oval face, high cheekbones, thick arched black eyebrows, long black box braids tied back in a low knot, a small silver ring in her right nostril only, yellow rain shell over a grey hoodie. Head and shoulders, front three-quarter view, eye level, neutral expression, mouth closed. Plain mid-grey background, even soft front light. No text, no on-screen graphics.
```

Motion prompt:

```text
Locked-off camera, head and shoulders. Dara blinks once, then slowly turns her head to face the lens straight on and holds, mouth closed, calm. Dara, her braids and the grey background stay exactly as in the opening frame. Exactly one woman in frame, nobody else. Sound: quiet room tone only.
```

### Prompts for scene B (person)

Still-frame prompt:

```text
Character reference photo. Dara: a woman in her mid twenties, deep brown skin, long black box braids tied back in a low knot, yellow rain shell over a grey hoodie, black canvas courier bag across her body, black cargo trousers rolled at the ankle, white high-top trainers. Full body, standing straight, arms relaxed, front view, camera at waist height, head to trainers inside the frame with space around her. Plain mid-grey background, even soft light. No text, no on-screen graphics.
```

Motion prompt:

```text
Locked-off camera, full figure. Dara turns slowly on the spot a quarter turn to her right until she stands in profile, then holds still. Her rain shell, courier bag, trousers and trainers stay exactly the same. Exactly one woman in frame, nobody else. Sound: quiet room tone only.
```

### Prompts for scene A (creature)

Still-frame prompt:

```text
Character reference image, hand-drawn 2D kids style, flat colour, soft pencil outlines. Juno: a small round pangolin, warm caramel scales with cream edges, round black eyes, a short pointed snout, a long tapered tail, standing on all four legs, one chipped scale above her left eye. Head and shoulders, three-quarter view, eye level, mouth closed. Plain mid-grey background, even soft front light. No text, no on-screen graphics.
```

Motion prompt:

```text
Locked-off camera. Juno opens her mouth in a small slow yawn, closes it, and looks straight at the lens. Juno and the grey background stay exactly as in the opening frame. Exactly one pangolin, nobody else. Sound: a small yawn, quiet room tone.
```

## 4. Size frame for two subjects

```text
Character size reference image, hand-drawn 2D kids style. Juno, the small round pangolin with caramel scales and one chipped scale above her left eye, stands on all four legs beside Bo, a tall grey heron on two long thin legs, wings folded; Juno's head reaches Bo's knee. Full figures side by side, front view, camera low, both whole inside the frame. Plain mid-grey background, even soft light. Exactly one pangolin and one heron. No text, no on-screen graphics.
```

Use it as a reference only in scenes where both appear, with the role
sentence "Reference 2 is the size of Juno next to Bo only".

## 5. A style plate (optional)

One frame that defines palette, grain and contrast, with nobody in it. It
takes a reference slot, so it comes after the face and the outfit and only
on models with room (Seedance and Wan 2.6 or 2.7 on the MCP path take 3).

## 6. What the sheet cannot do on the MCP path

The server makes every opening image from text only. A sheet wired to a
scene reaches the clip as a reference, never the opening image. So the face
in a text-only opening image is a new draw from the locked words; the clip
then pulls toward the reference. For shots where the face must match from
the first frame, use a chained frame, a supplied photo, or a still made in
the app from the sheet (see the first-frame table in SKILL.md).
