# Phone-footage realism: social

The native look of TikTok, Reels and vlogs is footage someone filmed on a
device, not a studio shot. Models default to tripod-smooth, evenly lit,
graded, posed frames. This method switches those defaults off on purpose,
for formats that need it (POV, day in the life, vlog, storytime
reconstructions, memes). Never on a product hero shot or a polished
explainer.

## 1. Four questions before any prompt

Answer them in one line each and keep the answers for the whole video:

1. Who is filming? (the person in the video at arm's length, a friend
   walking beside them, a chest mount, a phone propped on a shelf)
2. On what device? (a current phone rear camera, a current phone front
   camera, a 2014 phone, a 2008 pocket camcorder, a head-mounted action
   camera)
3. When? (the year, the time of day, the season)
4. Why is it being filmed? (to show a friend, to post a routine, to keep a
   memory, by accident)

Example card: "Filmed by Ana herself at arm's length on a current phone
front camera, a weekday morning in October, to post her morning routine."

## 2. Device looks

| Device | Write | Typical defects |
|---|---|---|
| Current phone, rear camera | "phone rear camera, slight wide angle, crisp centre, sharpening halos on edges" | HDR flattening bright windows, auto exposure shifts |
| Current phone, front camera | "phone front camera at arm's length, slight wide-angle distortion close to the face" | Softer detail, face slightly too large in frame, skin texture visible |
| Phone propped on a shelf | "phone propped on a shelf at waist height, fixed, slightly tilted" | Horizon a few degrees off, subject partly leaves frame |
| 2014 phone | "a 2014 phone video, narrow exposure range, windows blown white, warm white balance" | Noise in shadows, slow focus |
| 2008 pocket camcorder | "a 2008 pocket camcorder, soft image, low light noise, 4:3 framing inside the vertical frame" | Smeared motion, colour bleeding in reds |
| Action camera on the chest or head | "head-mounted action camera, very wide fisheye, the horizon bending" | Bounce with each step, hands large in frame |
| A friend filming | "filmed by a friend walking beside her, handheld, reacting late" | Framing catches up after the action |

## 3. Camera defects (choose 3 to 5 for the whole video)

- Natural handheld sway from breathing; small corrections.
- Auto exposure adjusting when the camera turns toward a window.
- Autofocus hunting once, then settling on the face.
- White balance warming indoors, cooling outdoors.
- Slight rolling wobble on a fast pan.
- Shadows a little noisy and soft in low light.
- A faint haze over the lens near a bright light (a smudge).
- The horizon a few degrees off level.
- Framing a beat late on the action.
- Highlights clipping on a white shirt or a sunny wall.

Close the camera paragraph with the positive line: "unstabilised handheld
phone camera, colour straight from the phone, light as it is in the room".

## 4. One imperfection per shot (never the same twice)

| Imperfection | Write |
|---|---|
| Focus hunt | "focus pulses once between the cup and her face, then settles on her face" |
| Late framing | "the camera follows the dog a beat late, catching it at the frame edge" |
| Exposure swing | "turning toward the window, the picture brightens then settles" |
| A bump | "the phone knocks lightly against the counter edge, a small jolt" |
| Off-screen voice | "someone off screen calls her name once" (native sound) |
| Thumb near the lens | "a soft pink edge of a thumb enters the bottom corner for a moment" |
| A stray animal | "a cat walks through the background and out" |
| Wind on the mic | "a gust rumbles on the microphone" |
| A reflection | "her phone's reflection shows faintly in the window, nothing on its screen readable" |
| Lens flare from a lamp | "a small flare when the lamp passes through frame" |
| A missed moment | "the toast pops before the camera reaches it" |
| Hand shake on a step | "a step down the stairs jolts the frame" |
| Re-framing | "she tilts the phone to fit the window in, the horizon swinging level" |
| A passer-by | "a person crosses the far background, out of focus, not looking" |
| Light change | "a cloud passes and the room dims for a moment" |
| The phone set down | "she props the phone against a jar; it slides a centimetre and stops" |
| Laughing breath | "her laugh shakes the frame slightly" (native) |
| Background noise | "a scooter passes outside" (native) |
| Pocket ending | "the shot ends as the phone turns toward her pocket, the picture swinging" |
| Cut mid-move | the clip trimmed so the shot ends mid-gesture (an edit, not a prompt) |

## 5. Caught, not posed

- Nobody looks at the lens unless they are the one filming in selfie mode.
  Write "she looks at the kettle, not at the camera".
- Actions are ordinary and slightly inefficient: reaching twice, a cup set
  down off-centre.
- Places are lived in: "a chair with a hoodie over it, a charging cable on
  the counter, two mugs in the sink"; name 6 to 10 specific things, and
  exclude what models add (shop signs, crowds, cafes) by naming what is
  there instead.
- Light is what the place has: "a ceiling bulb and grey window light",
  never a studio three-point set.
- Sound is what the phone microphone hears: close voice loud, room echo,
  fridge hum, traffic outside. "No music" in the clip.

## 6. The clean-frame line still applies

A phone look invites interface graphics. Every motion prompt ends with:
"Clean frame: no text, no recording dot, no battery icon, no timestamp, no
on-screen graphics." These are the artefacts that read as fake at once.

## 7. Prompt pattern (Veo 3.1 Fast)

Still-frame prompt:

```text
Phone video still, filmed at arm's length on a current phone front camera. Ana, a woman in her late twenties with a messy dark bun and an oversized grey hoodie, stands in a small kitchen holding a mug, looking at the kettle, not at the camera. Slight wide-angle distortion, her face in the upper middle of the frame. Grey morning window light and one ceiling bulb. A hoodie over a chair, two mugs in the sink. Clean frame, no text.
```

Motion prompt:

```text
Phone video, one continuous take, unstabilised handheld phone camera at arm's length, colour straight from the phone. 0 to 2 s: Ana pours water from the kettle into the mug. 2 to 4 s: she turns the camera slightly toward the window; the picture brightens, then settles. Camera: handheld sway, no deliberate move. End state: the mug full, the window in the left of frame. Ana, the kitchen and the light stay as in the opening frame. Exactly one person. Sound: kettle pour, room echo, a scooter passing outside. No music. Clean frame: no text, no recording dot, no battery icon, no timestamp, no on-screen graphics.
```

## 8. Policy

- A realistic phone look makes AI footage easy to mistake for a real
  recording. Never present it as a real person's real day, a real event,
  a real review or a real testimony. The post caption says the video is
  AI-generated; lavendly-publish adds the platform label.
- No real person's likeness. No minors in realistic phone footage.
