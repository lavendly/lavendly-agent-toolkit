# Recipe: product launch motion graphics

A launch film for a new product: a 15 s teaser, a 30 s launch, a 45 to
60 s film or a 90 s detailed launch, in 9:16, 1:1 and 16:9. The film says
what the product is, shows why it matters, and leaves one picture and one
line the viewer remembers. On Lavendly every picture is a generated clip
cut by the server render; type, logos, interfaces and charts are planned
around that, never promised in the picture.

## 1. The product brief comes first

Ask before planning, in one message, and adapt everything below to the
answers. Ask only what the user has not said.

| Question | What the answer decides |
|---|---|
| What is it, in one sentence? | the category (section 4) and the hero shot |
| Who is it for? | the person on screen, the setting, the voice |
| What problem does it solve? | whether the film opens on the problem or on the product |
| What is different about it? | the one feature that gets the longest shot |
| What should the viewer feel? | the visual direction (section 3) and the score |
| What should they remember? | the last line spoken and the end card picture |
| What should they do? | the call to action, spoken and captioned |
| Where will it run, and how long? | length and ratios (section 11) |
| What do you already have? | packshots, screen recordings, a logo, footage, a brand colour list |

Rules that follow from the answers:

- No physical product (software, an agent, a service): the film shows the
  person and the outcome, and the interface only as the user's own screen
  recording ([limits-and-alternatives.md](limits-and-alternatives.md)).
- A real packshot exists: it is the opening image of every product shot.
  None yet: describe the object once in full and paste it into every shot;
  the film is a concept, and the user says so where it is shown.
- Claims are the user's and must be true. Numbers are spoken, never drawn.

## 2. Choose the narrative

| Narrative | Fits | Shape |
|---|---|---|
| Problem to solution | SaaS, services, AI tools | the frustration shown in a body, never told; the product arrives; the relief in the world; the end card |
| Transformation | consumer goods, apps, services | the before; the moment of use; the after in the same framing and light |
| Product reveal | hardware, consumer flagships | fragments in narrow light; the whole object once, near the end; held |
| Feature demonstration | developer tools, apps, hardware | one feature per shot with its proof; three features in 30 s at most |
| World building | AI products, robotics, a new category | the world the product makes possible first; the product appears late |
| Founder vision | early products, B2B | the founder's one line (their own footage or the voiceover); the world it points to; the product |
| Use-case story | mobile apps, marketplaces, services | one person, one task, done start to finish |
| Technical deep dive | developer tools, APIs, hardware | how it works as physical metaphors, one per idea; the numbers spoken |

One narrative per film. A 90 s launch may nest a feature demonstration
inside a problem to solution, never three narratives in a row.

## 3. Choose the visual direction

Pick from the product's identity, not from the trend. One direction for
the whole film; it goes into every prompt as the same look line.

| Direction | When the product is | Light and palette | Camera | Score |
|---|---|---|---|---|
| Cinematic premium | a flagship object | one hard key, a rim light, deep shadow; near black plus one accent | slow push-ins, eased orbits under 90 degrees | low pulse, a swell into the reveal |
| Minimalist editorial | design-led apps and goods | soft high-key daylight; white, stone, one colour | locked-off, centred, generous empty space | sparse piano or plucks |
| Futuristic | AI, robotics, developer tools | cool edge light, haze, thin lines of light; graphite with cyan or violet | slow slides, macro across surfaces | synth arpeggio, 110 to 125 BPM |
| Playful | consumer apps, marketplaces | bright even light; three saturated colours | small overshoot and settle, cuts on every beat | claps, light percussion |
| Industrial | robotics, machines, tools | hard daylight, sparks, dust in the beam; steel and safety orange | low angles, tracking alongside | heavy drums, metallic hits |
| Luxury | premium goods | overhead softbox and strip lights; black, gold, cream | slow eased orbits, macro slides | slow strings, long reverb |
| Organic lifestyle | wellness, food, home, services | warm window light; earth tones | handheld with a slight sway | acoustic guitar, warm pads |
| Documentary | services, founder vision, B2B | available light; natural colour | observational handheld | room tone, a sparse bed |

Light rigs and easing: [motion-principles.md](motion-principles.md).

## 4. Product categories

| Category | Show | The picture cannot show | The honest way |
|---|---|---|---|
| SaaS and web apps | the person's problem, the relief, the outcome away from the screen | a real interface | the user's screen recording, imported; generated screens face away or glow softly |
| AI products and agents | the task done, the time handed back; a metaphor for the work | chat text, model output | the request and the result spoken and captioned; one physical metaphor (threads joining, papers sorting themselves) |
| Mobile apps | the phone in a hand in the world, the moment of use | app screens | the screen faces away; the user's recording for the demo shot |
| Developer tools and APIs | speed, connection, a system working | code, terminals, docs | the user's terminal recording; a metaphor (pipes joining, a switch thrown, a relay of light) |
| Hardware | material, edges, the one interaction, scale against a hand | the exact logo, label text | the packshot as opening image, labels small or turned away |
| Robotics and industrial | one motion with intent, scale against a person, the work done | exact motion paths, safety claims | one motion per clip; the user's own footage for real operation |
| Consumer goods | the product in hand, its texture, the moment of use | packaging text | packshot, label turned away; see [recipe-product-render.md](recipe-product-render.md) for hero shots |
| Marketplaces | the two sides meeting: one buyer, one maker, the hand-over | listings, prices | two people, one object passing between them |
| Services | the people and the client's outcome | quotes from real clients | the user's own client footage; true claims spoken |

## 5. Structure by length

Plan the music first and write every time as bars. At 120 BPM a beat is
0.5 s, a bar 2 s, an 8-bar phrase 16 s, so Veo's 4 s and 8 s clips are 2
and 4 bars. Scene changes land on phrase lines; cuts land on bars; one
held bar before the end card. Each chapter is one sequence
(`create_sequence`) named as in the tables, one named scene per shot.

Worked example used through this file: Halden, a pocket voice recorder
with one key, an aluminium body and a soft ring light, whose app
transcribes and summarises meetings; Orla, a project lead in her thirties,
uses it. The user's own product replaces it. Gen is the length to generate
on Veo 3.1 Fast (4 or 8 s; trim to the cut).

### 15 s teaser (product reveal)

| # | Time | Bars | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 4 | 1 to 2 | macro, low, 100mm | macro slide | a line of light runs along Halden's aluminium edge in darkness | 4 | 4 |
| 2 | 4 to 8 | 3 to 4 | insert, top-down | locked | a thumb presses the one key; the ring light pulses once | 4 | 4 |
| 3 | 8 to 12 | 5 to 6 | medium, eye level, 50mm | slow push-in | Orla speaking across a cafe table, Halden standing between the cups | 4 | 4 |
| 4 | 12 to 15 | 7 to 8 | medium wide, eye level | locked | end card: Halden on a pale table, the right half an empty field; the name spoken and captioned | 3 | 4 |

Sequences: Reveal (1 to 2), Use (3), End (4). About 64 credits with
opening images.

### 30 s launch (problem to solution)

| # | Time | Bars | Size, angle, lens | Move | Action | Cut | Gen |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 4 | 1 to 2 | medium, eye level, 50mm | locked | Orla in a meeting, writing fast while three people talk at once | 4 | 4 |
| 2 | 4 to 8 | 3 to 4 | close-up, high angle | slow push-in | her pen stops over a page of crossed-out lines, no readable words | 4 | 4 |
| 3 | 8 to 12 | 5 to 6 | macro, low, 100mm | macro slide | Halden in darkness, light tracing its edge | 4 | 4 |
| 4 | 12 to 16 | 7 to 8 | insert, top-down | locked | her thumb presses the key; the ring pulses | 4 | 4 |
| 5 | 16 to 20 | 9 to 10 | medium wide, eye level | slow slide | Halden on the meeting table; Orla listening, hands still, looking up | 4 | 4 |
| 6 | 20 to 26 | 11 to 13 | medium close-up | locked | the demo: the user's screen recording of the summary, or Orla reading her phone, the screen a soft glow facing away, a small smile | 6 | 8 |
| 7 | 26 to 30 | 14 to 15 | medium, eye level | locked | end card: Halden standing on the empty table, the right half a clean pale field, held | 4 | 4 |

Sequences: Problem (1 to 2), Product (3 to 5), Proof (6), End (7). About
128 credits; an imported recording for shot 6 saves 30.

### 45 to 60 s film (feature demonstration)

Four chapters on the 8-bar phrases of a 120 BPM score:

| Chapter | Time | Bars | Shots | What it holds |
|---|---|---|---|---|
| World | 0 to 16 | 1 to 8 | 4 x 4 s | the problem in the body, the setting, the person |
| Reveal | 16 to 32 | 9 to 16 | 3 shots (4, 4, 8 s) | fragments, the key press, the whole object held |
| Features | 32 to 48 | 17 to 24 | 3 x 4 s plus a 4 s demo | one feature per shot, each with its proof |
| Payoff | 48 to 60 | 25 to 30 | 4 s, 8 s | the outcome in the world, the end card held |

A 45 s cut drops the World chapter to two shots and Features to two.
About 240 credits for 60 s.

### 90 s detailed launch

| Chapter | Time | What it holds |
|---|---|---|
| Hook | 0 to 8 | the one picture the film is remembered by, before any explanation |
| Problem | 8 to 24 | the person, the frustration, shown in two or three shots |
| Reveal | 24 to 40 | the product formed or found, then held whole |
| Features | 40 to 72 | three features of about 10 s each: the detail, the use, the proof (a demo the user imports where it is a screen) |
| Vision | 72 to 84 | the world the product points to, or the founder's line |
| End | 84 to 90 | the end card held, the name and the action spoken |

About 18 shots, near 380 credits. Read the live number from
`estimate_cost` before every spend and wait for a yes.

## 6. Shots that hold up

- Hero shot: the product alone, one light rig named as sources, one eased
  move under 90 degrees, the background stated ("infinite black", "a
  seamless pale grey cyclorama with no horizon line").
- Macro detail: a few centimetres of slide across one material; the
  material named with what it reflects.
- Interaction: one hand, five fingers, one action (a press, a lift, a
  turn), its result named ("the ring light pulses once and dims").
- Lifestyle: one person, described the same in every shot (age range,
  hair, one clothing item), doing one thing; the product in frame and in
  scale.
- Environment: the place the product lives, one light, people small and
  turned away unless they are the lead.
- Transitions: cut on a motion or a shape that matches across the cut (the
  ring light becomes a lamp); dips to black and dissolves where a chapter
  ends; no wipes.
- Consistency: the product block and the person block are written once and
  pasted into every prompt; the packshot is the opening image of each
  product shot and the person's hero sheet is wired into each of their
  shots ([lavendly-director] hero lock); in the Studio both live in the
  Film Bible. A drifted shot is regenerated from the reference, never
  chained from a drifted frame.
- Alternate moves: never the same move in two neighbouring shots.

## 7. Motion graphics, honestly

The render draws one kind of text: captions burned from a synthesized
voiceover. Everything else that motion graphics usually carries is
planned as a generated shot, an imported file or an end card.

| The brief wants | How the film carries it |
|---|---|
| Kinetic typography, feature names | the words spoken and captioned; plates generated with an empty field where the user sets type after export |
| A logo sting | a logo-free ident as the last shot: material and light settle on a clean field ([recipe-brand-idents.md](recipe-brand-idents.md)); the user places the real logo |
| A UI demo | the user's own screen recording, imported; or a person reacting with the screen glowing and turned away |
| Feature callouts | one feature per shot, framed close, empty space beside it; the feature spoken |
| Data visuals | a physical metaphor with five countable objects at most ([recipe-visual-metaphors.md](recipe-visual-metaphors.md)); the exact number spoken and captioned |
| Split screens | no compositor: cut between the two sides on the beat, or one frame divided by a real line (a window frame, a wall) |
| Background treatments | named surfaces: a cyclorama, infinite black, a gradient wall, haze crossed by thin lines of light |
| An exact animated title, chart or interface | made by the user in their own motion or editing tool and imported, or added over the export; say so before planning |

Never write "title", "logo", "text" or "UI" as content in a prompt; write
the empty area as a plain surface ("the right half is an empty pale grey
field with nothing in it").

## 8. Sound identity

- The score is the product's voice: brief it from the direction (section
  3) with a tempo, the instruments, the build, and the moment of silence.
  Example for Halden: "Minimal electronic at 120 BPM: a soft pulse and
  glassy plucks, one layer added per chapter, half a bar of silence before
  the reveal, one low hit as the ring light pulses, a held pad under the
  end card."
- Make or choose the score before cutting; measure its tempo and
  downbeats (or take the BPM from the user's track) and write the shot
  list in bars. Cuts land on beats, chapters on phrase lines, cut lengths
  shorten as the track rises, one held bar before the payoff.
- Sound effects come from the clips' own sound: one designed sound per
  motion (a key click, a soft chime, a servo whirr). Name it in the motion
  prompt; set the clip `native` or `mix`. `attach_track` takes voiceover
  and music only.
- Voice: short plain lines, one idea each, about 2.2 words per second:
  15 s about 25 words, 30 s about 55, 60 s about 110, 90 s about 170. The
  name and the action are the last two lines.
- Captions on (`subtitleStyle`, one style per film) so the film reads
  muted; they burn only from a synthesized voiceover.
- Mix: score 0.3 to 0.35 with `ducking` under the voice (about 10 dB
  under speech); narrated clips
  `mix` at 0.4; effect-led clips `native`. Exports are normalized to
  -14 LUFS.

## 9. Prompt pairs (Veo dialect)

Pair 1: the reveal macro (30 s, shot 3)

Still-frame prompt:

```text
Cinematic premium product film. Halden: a small rounded rectangle voice recorder the size of a matchbox, bead-blasted silver aluminium body, one round graphite key on top, a thin ring light around the key, no markings. It lies on black slate in near darkness. Macro, low angle, 100mm, shallow focus on the front edge. One narrow strip light from the left, a faint rim light from behind. Palette: black, silver, one warm white. No text, no logo.
```

Motion prompt:

```text
One continuous take. 0 to 3 s: a thin line of light slides along the aluminium edge from left to right. 3 to 4 s: the ring light around the key glows softly and holds. Camera: macro slide a few centimetres to the right, easing in and out. End state: the key and the ring in focus, the body in shadow. Halden keeps its exact shape and its single key. Exactly one recorder. SFX: a low soft tone as the ring glows. No music. Clean frame: no text, no on-screen graphics.
```

Pair 2: the key press (30 s, shot 4)

Still-frame prompt:

```text
Cinematic premium product film. Top-down insert of a pale oak meeting table. Halden, the matchbox-sized silver aluminium voice recorder with one round graphite key and a thin ring light, lies in the centre. A woman's right hand rests beside it, short unpainted nails, a grey wool sleeve. Soft overhead window light, a gentle shadow to the right. Palette: oak, silver, grey. The top third of the frame is empty table. No text, no logo.
```

Motion prompt:

```text
One continuous take. 0 to 1 s: the hand rests still. 1 to 2 s: her thumb presses the key once and lifts. 2 to 4 s: the ring light pulses once, warm white, and settles to a dim glow. Camera: locked-off. End state: the hand back beside the recorder, the ring dimly lit. Five fingers, natural grip; exactly one hand and one recorder. SFX: one soft key click, a quiet chime as the ring pulses. Ambient noise: a quiet room. No music. Clean frame: no text, no on-screen graphics.
```

With the user's packshot: set it as the scene's image url, drop the
object description from the motion prompt and keep the lock sentence.

## 10. Build order on Lavendly

1. The brief (section 1); state the narrative, direction, length, ratios
   and the honest limits (section 7) in one plan.
2. `estimate_cost` for the whole film; wait for the user's yes.
3. `create_workflow` with the skill, one scene per shot;
   `create_sequence` per chapter; `set_scene_plan` with each shot's
   prompts, length and move.
4. Product and person references wired before any generation: the
   packshot as each product shot's opening image, the hero sheet on each
   of the person's shots. Screen recordings through `import_asset`.
5. The score with `attach_track` (music); its tempo and downbeats fix the
   bar grid.
6. `generate_scene` for scene 1 alone; `get_scene_frame` first and last,
   `quality_check`; then the rest.
7. `edit_clip` trims on the bars; `move_clip` for order or a dissolve.
8. `attach_track` voiceover with the script and the caption style.
9. `create_render`, `get_render`, `quality_check` on the whole film, then
   deliver. Render is free.

## 11. Deliverables

| Ratio | Where | Composition |
|---|---|---|
| 16:9 | site hero, YouTube, presentations | the product a third in from the side, the empty field on the other |
| 9:16 | Reels, TikTok, Shorts, stories | the product in the middle band; nothing important in the top fifth or the bottom quarter, where the platform draws its own buttons |
| 1:1 | feeds, marketplaces | the product centred, the empty field above it |

- Each ratio is its own film: copy the plan and generate at that aspect;
  rewrite the empty-field line for the new frame.
- Veo makes 16:9 and 9:16 only; a 1:1 version is made on a model that
  offers it (Seedance or Kling), read from `estimate_cost`.
- Plan the 15 s teaser from shots of the 30 s launch so it reuses their
  prompts, references and opening images.
- Exports are MP4, 1080p at 30 fps at most, -14 LUFS.

## 12. Quality checklist

Run it on the render, not only on single clips.

- Product clarity: a stranger can say what it is and who it is for after
  one watch.
- Story: one narrative; the problem or the hook in the first 2 s; the
  last line is the one to remember.
- Visual quality: no warped edges, extra keys, extra fingers or a second
  product; the packshot shape held in every product shot.
- Motion consistency: one move per shot, eased, no two neighbours alike;
  the camera or the object moves, never both.
- Brand fit: one direction, one look line, the palette in every shot.
- Readability: no generated letters anywhere; captions on and inside the
  safe area; empty fields actually empty.
- Sound: cuts on the beat; the silence before the reveal lands; voice
  clear over the score.
- Platform fit: the right ratio, length and safe area for where it runs;
  the end card held at least 2 s.
- Motion: numbers count up in motion, every scene keeps moving, named
  tools show their real logos, no card passes through another.

## 13. Failure modes and fixes

| Failure | Fix |
|---|---|
| The product gains buttons or changes shape | start from the packshot; lock sentence; orbit 45 degrees, not 180 |
| A screen shows gibberish interface | the screen faces away or glows; the real demo is the user's recording |
| Letters appear in the empty field | describe the field as a plain surface; never the words title, logo or text |
| The person changes between shots | the same person block in every prompt; the hero sheet wired; regenerate, never chain |
| Cuts feel arbitrary | the shot list was written in seconds: measure the score, rewrite it in bars, trim |
| The reveal has no weight | half a bar of silence and one locked shot before it |
| Too many features | three in 30 s, five in 90 s; the rest go to a second film |

## 14. Notes from a finished launch film

A 60 s launch film for a support product went through five rounds of
founder notes. What each round fixed, kept as rules:

Script
- Open on the viewer's own pain, and name what their customers do instead
  today (the assistants they already ask).
- Say how setup feels to the buyer ("upload your business files"), never
  how it is built ("add one line of script").
- Never show the product unsure or failing. A handoff to a person is "a
  real person, when it matters".
- Name every product line in the brief (answers, and forms for leads,
  surveys and hiring), and end on the relationship the product gives plus
  the call to action.
- Numbers exactly as the user's site states them ("less than two
  seconds", not "about two").

Picture
- The real interface must be sharp: capture it at three times screen
  density, one element at a time; never enlarge a screenshot or reuse a
  compressed one when the live page exists. Rebuild what sits behind a
  login with the same copy and colours.
- Put the product where it really ships (a chat widget at the bottom
  centre when that is how it sits on a customer site).
- Named tools appear with their real logos on transparent backgrounds.
- Numbers count up in motion, large and turning in space; never a number
  printed on a flat card.
- Every scene keeps moving for its whole length (a slow push-in, a drift);
  no frame sits still.
- No moving card passes through another plane: the card that leaves falls
  back behind, the one that stays holds in front.

Sound
- A bright, warm voice; a long read can play 7 to 10 percent faster.
- A joyful score with the tempo named in the brief. Scores come back near
  30 s: extend them by whole 8-bar phrases and keep the kick on the cut
  grid.
- One designed sound per visual event: a pop as each item lands, ticks
  under a counting number, a whoosh into each scene, a low hit on the key
  word, a chime when an answer appears, a click on a button.
- The score about 10 dB under the voice; the first mix, at 7 dB under,
  was judged too loud.

Workflow
- One timing table (the voice's word times, scene starts on the beat
  nearest each sentence, key-word moments) drives the cuts, the captions
  and the sounds, so a new voice changes numbers in one place.

## 15. Policy guards

- Every claim, number and comparison is the user's and true; the film
  never shows the product doing what it cannot do.
- A product that does not exist yet is shown as a concept, and the user
  says so where the film runs.
- No real person's likeness, no other brand's product, logo or interface,
  no fabricated testimonial.
