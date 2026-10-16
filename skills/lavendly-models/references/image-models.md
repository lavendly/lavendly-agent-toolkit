# Image models: opening frames, hero stills, sheets

Every Lavendly scene animates an opening image. The image decides the
framing, the identity, the light and the palette before the video model
moves anything, so the image step is where the look is born and where a
re-roll is cheapest.

## The five image models

| Model | id | Credits per image | Use it for |
|---|---|---|---|
| Auto (Nano Banana 3.1) | auto, resolves to google/gemini-3.1-flash-image-preview | 2 | The default for opening images; the MCP path uses it |
| Nano Banana 3.1 | google/gemini-3.1-flash-image-preview | 2 | Opening images, hero stills, sheets; descriptive sentences and photography words |
| Gemini 3 Pro Image | google/gemini-3-pro-image-preview | 3 | The higher tier of the same family; a hero sheet or a key still when a 2-credit draw misses detail |
| Gemini 2.5 Flash Image | google/gemini-2.5-flash-image | 2 | The earlier Flash image model, same price as 3.1; Google's own first-and-last-frame demos used it |
| GPT-5 Image | openai/gpt-5-image | 5 | Edits phrased "change only X; keep face, pose, framing and background"; strong instruction following and lettering in the still |
| GPT-5 Image mini | openai/gpt-5-image-mini | 1 | The cheapest draw: blocking and composition tests |

Unknown image ids fall back to 2 credits. Images are generated through a
chat call with image output; the price per image is flat.

## How the server makes opening images (MCP path)

- A scene's image node with a `prompt` and no url gets an opening image
  before its clip, on its own hold, priced in `estimate_cost` as
  `opening_image_credits`.
- The server sends "Generate a single image. Subject: " followed by the
  node's prompt, with the node's aspect ratio, and **no reference images**.
  A character or product reference wired to the scene never reaches the
  opening image on this path.
- The prompt is cut to 500 characters at a word boundary. Put the subject
  and its locked words first, then framing, light and background; the clean
  frame line last, short.
- `create_workflow` `shots` text becomes the image prompt too (its first
  500 characters) unless you set each image node's `prompt` with
  `update_workflow`. Always set it: a motion prompt makes a poor still.
- An image node that already has a url is not regenerated. Setting a url
  (a packshot, a chained last frame, an app-made still) skips the charge.
- To re-roll a bad opening image: change the node's `prompt`, clear its
  `data.url`, `generate_scene` for that scene. The same call makes the
  clip again, so a wrong still costs a clip too. A re-roll is a fresh draw,
  not an edit.
- Which image model the server uses for an image node on the MCP path when
  the node names one is not documented; assume Auto at 2 credits and trust
  the number in the estimate.

## What only the app can do (canvas)

- Image-to-image: up to 3 connected images ride with the prompt ("Using the
  N reference images provided, generate a single image. Keep the
  subject/identity from the references."). Any of the five models receives
  them. This is how a per-shot still is edited from a hero sheet.
- A character sheet from a made clip: the in-app Director's lock subject
  makes one picture (front, three-quarter, side on white), paid like a
  picture.
- Persona training (a trained likeness for a consenting person): 100
  credits per run.

When a shot needs one of these, ask the user to make the image in the app
(or upload it to the Asset Library) and bring it back with `import_asset`.

## Writing the still-frame prompt

- A photograph, not a story: shot size and angle, lens feel and depth,
  the subject with its locked words, pose and expression, the place with 2
  or 3 concrete props, the light (source, direction, hardness, colour), 3 to
  5 palette colours, the texture or medium.
- The start of the shot, never the payoff: the lamp is off, the box is
  closed, the hero has not arrived yet.
- Keep every input in colour; grade in the edit. Monochrome stills fed to a
  video model come back grey and flat.
- Text: image models can letter a label, but the video model re-letters it
  as it moves. Keep labels blank or turned away, screens dark or angled,
  signs out of frame.
- End with "No text, no on-screen graphics." (and "no logo" for products).

Template, under 500 characters:

```text
<style line>. <subject and locked words>, <pose or state>, <where in the frame>. <shot size, angle, lens feel>. <light: source, direction, hardness, colour>. <background, 2 props>. No text, no on-screen graphics.
```

## Choosing per job

| Job | Model | Why |
|---|---|---|
| Opening images through the MCP | Auto | The path's default; 2 credits |
| Composition tests before a paid film | GPT-5 Image mini in the app | 1 credit a draw |
| Hero sheet or turnaround | Nano Banana 3.1, Gemini 3 Pro Image for the final | Descriptive prose, multi-turn edits in the app |
| A fix to one detail of an approved still | GPT-5 Image in the app, image-to-image | "Change only X" edits; never rebuild an approved still |
| Per-shot stills of a recurring hero | Nano Banana 3.1 in the app with the sheet connected | Up to 3 references ride on the canvas |
