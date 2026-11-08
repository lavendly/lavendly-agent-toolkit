# Recipe: exploded view

A film of an object's insides: it rests whole, shows its mechanism
working, comes apart in layers along one axis, holds the exploded state
while the camera turns, names its parts, and snaps back together so the
last frame is the first. A 15 s loop, a 30 s film or a 60 s chaptered
teardown, in 9:16, 1:1 or 16:9. It suits anything with a mechanism worth
seeing: a watch, a film camera, headphones, a drone, a lock, a music box.
On Lavendly every picture is a generated clip cut by the server render;
part names are spoken and captioned, never drawn as labels.

## 1. Pick the object

| Fits | Why |
|---|---|
| A mechanical watch, a music box, a lock and key | small parts that move on their own, a sound for every motion |
| A film camera, a drone, headphones, a keyboard | clear layers, hard materials, one part that works on its own |
| A small engine, a gearbox, a bicycle hub | a mechanism that turns, gears meshing, a sound bed |

| Does not fit | Use instead |
|---|---|
| A living organ (a heart, an eye) | the science explainer with a teaching model, not live anatomy: video models get valves, flow and chambers wrong |
| Technical drawings, pressure curves, live readouts | numbers spoken and captioned; drawings and data are made in the user's own tool and imported ([limits-and-alternatives.md](limits-and-alternatives.md)) |
| More than seven layers, or hundreds of tiny parts | two shots, front half and back half, or the 60 s chaptered version |
| A real branded product shown as someone else's | the user's own product and packshot, or a generic object with no marks |

## 2. The brief

Ask only what the user has not said, in one message.

| Question | What the answer decides |
|---|---|
| What is the object, in one sentence? | the hero shot and the description block |
| Is it your product, with a packshot? | the packshot opens every whole-object shot; none yet: a described object, shown as a concept |
| Which part should the viewer remember? | the part that gets its own working shot |
| What should it feel like: precise, warm, raw? | the background, the light, the score |
| How long, and where will it run? | 15, 30 or 60 s, and the ratio (section 9) |
| Do you want a voice naming the parts? | narration on (names spoken and captioned) or sound only |

## 3. The description block

Write the object once and paste it into every prompt. Name every layer
in the order it comes apart, its material and colour, and how many of
each there are. A layer is a flat group that moves as one piece.

- Five to seven layers, stacked along one axis (a watch from crystal to
  case back; headphones from cushion to cup; a drone from rotors to
  battery). Count the parts that can multiply: "exactly four gears",
  "exactly two rotor blades on each arm".
- Even gaps between layers, stated: "each layer a finger's width above
  the one below".
- One background (infinite black, a soft grey studio sweep), one light
  rig named as sources, and what each metal reflects.
- Faces and dials carry no numerals or letters: "plain baton markers, no
  numerals, no text". Generated letters come out as gibberish.

## 4. Structure

### 30 s (six scenes, the default)

| Scene | Length | Shot | Moves |
|---|---|---|---|
| 1 | 5 s | the object whole, at rest, in near silence; its one live motion (the seconds hand stepping) | slow push-in |
| 2 | 5 s | macro on the working mechanism (the balance wheel swinging, the hairspring breathing) | locked-off |
| 3 | 6 s | it comes apart: each layer lifts in the stated order and stops in place | object moves, camera locked |
| 4 | 5 s | the exploded state, every layer floating still | camera orbits 45 degrees |
| 5 | 4 s | one part alone, working, close | macro slide |
| 6 | 5 s | it snaps back together and rests whole | scene 3 played in reverse |

- Scene 3 opens on the same still as scene 1, so scene 6 (scene 3
  reversed with `edit_clip`) ends exactly on scene 1's first frame and
  the film loops.
- Scene 4 opens on scene 3's last frame (frame chaining), so the
  exploded state never changes between them.
- The camera or the object moves in a shot, never both.

### 15 s loop

Scene 1 (whole, 4 s), scene 3 (apart, 6 s), scene 3 reversed (5 s). No
voice; the sound carries it.

### 60 s teardown

One chapter per layer group, each a sequence: the case, the face, the
drive, the heart of the mechanism, the power. Each chapter: the layer
lifts, its part works close, one spoken line. Open and close on the
whole object so it still loops.

## 5. Making the mechanism true

The motion prompt says how each part moves, at what speed, and in which
direction. Real mechanisms read as real; invented ones read as wrong.

- Meshing gears turn in opposite directions; the bigger gear turns
  slower.
- A watch balance wheel swings back and forth about three times a second
  through most of a turn, the hairspring expanding and contracting; the
  pallet fork rocks with each swing; the escape wheel steps forward one
  tooth at a time; the mainspring barrel turns very slowly.
- A mechanical seconds hand moves in small steps, six a second. One
  jump per second reads as a quartz watch.
- Jewel bearings are small and red; screws are blued steel.
- Rotors spin as a blur with a still hub; springs compress and return;
  a key turns the pins up to one line before the plug turns.

## 6. Names, honestly

The render draws one kind of text: captions burned from a synthesized
voiceover. Labels, arrows and callouts are not drawn in the picture.

- Narration on: one short line per part, the name last: "This spring
  stores the power. The mainspring." About 2.3 words a second; a line
  ends before the next part moves.
- Sound only: the parts are named in the post's caption or description,
  in exploding order.
- Never write "label", "text", "name" or "callout" as picture content in
  a prompt. Leave an empty plain field beside the object where the user
  can set type after export.

## 7. Sound

The mechanism is the score.

- Every motion gets one designed sound: the ticks, a soft metallic slide
  as a layer lifts, a single click as it seats again.
- A watch ticks six times a second; a score at 120 BPM puts three ticks
  on every beat, so cuts on the beat land on a tick.
- Silence before the first layer lifts: half a bar.
- Music, if any, low and slow under the mechanism; the snap back lands
  on a downbeat with the click.

## 8. Prompt pairs (Veo dialect)

Tallis is a generic hand-wound watch used only as an example.

Pair 1: the object whole (scene 1)

Still-frame prompt:

```text
Precise studio product film. Tallis: a round hand-wound wristwatch 38 mm across, polished yellow-gold case, domed sapphire crystal, cream enamel dial with thin gold baton markers and no numerals or text, two gold leaf hands and a small seconds subdial at six o'clock, brown leather strap. It rests flat on a black velvet pad on infinite black. Three-quarter top view, 100mm macro, shallow focus on the crystal edge. One soft key light from the upper left, a thin rim light from behind, the gold reflecting a warm line. No text, no logo.
```

Motion prompt:

```text
One continuous take. 0 to 5 s: the small seconds hand moves in small steps, six a second; nothing else moves. Camera: a slow push-in toward the dial, easing in and out. End state: the dial fills the centre of frame. Tallis keeps its exact shape, one crown, two hands and one seconds hand. SFX: a quiet fast ticking, six ticks a second. No music. Clean frame: no text, no on-screen graphics.
```

Pair 2: it comes apart (scene 3)

Use the scene 1 still as the opening image.

Motion prompt:

```text
One continuous take. Tallis comes apart straight upward along its centre axis, one layer at a time, each layer stopping a finger's width above the one below: 0 to 1 s the crystal lifts; 1 to 2 s the two hands and the seconds hand lift; 2 to 3 s the cream dial lifts; 3 to 4 s the balance wheel with its blued hairspring and its gold bridge lifts; 4 to 5 s the gear bridge with exactly four gilded gears lifts; 5 to 6 s the mainplate with the mainspring barrel and red jewels rises a little; the gold case stays on the pad. Camera: locked-off. End state: seven layers floating in a straight even stack, every part still. Exactly one of each part, the gears exactly four. SFX: a soft metallic slide for each layer, then near silence. No music. Clean frame: no text, labels or graphics.
```

With the user's packshot: set it as the opening image of scenes 1 and 3,
drop the object description and keep the counts and the lock sentence.

## 9. Ratios

| Ratio | Composition |
|---|---|
| 9:16 | the explode runs vertically, the stack filling the middle band; nothing important in the top fifth or the bottom quarter |
| 1:1 | the object centred, the stack shorter: five layers at most |
| 16:9 | the explode runs sideways along a horizontal axis, the empty field on one side |

Each ratio is its own film: rewrite the axis and the empty field for the
frame. Veo makes 16:9 and 9:16 only; a 1:1 version is made on a model
that offers it, read from `estimate_cost`.

## 10. Build order on Lavendly

1. The brief (section 2) and the description block (section 3); state
   the structure and the honest limit on names (section 6) in one plan.
2. `estimate_cost` for the whole film; wait for the user's yes.
3. `create_workflow` with the skill, one scene per shot; `set_scene_plan`
   with each shot's prompts, length and move. For 60 s,
   `create_sequence` per chapter.
4. The packshot or the scene 1 still as the opening image of scenes 1
   and 3; generate scene 3 before scene 4 so scene 4 opens on its last
   frame.
5. `generate_scene` for scene 1 alone; `get_scene_frame` first and last,
   `quality_check`; then scenes 2 to 5.
6. Scene 6: duplicate scene 3's clip and `edit_clip` it with reverse;
   check that its last frame matches scene 1's first.
7. `attach_track` for the score; `edit_clip` trims on the beats.
8. Narration on: `attach_track` voiceover with one line per part and the
   caption style.
9. `create_render`, `get_render`, `quality_check` on the whole film; watch
   the loop point twice.

## 11. Quality checklist

- The object: the same shape, parts and counts in every shot; nothing
  gained or lost between coming apart and going back.
- The explode: one axis, the stated order, even gaps, every layer still
  at the end.
- The mechanism: directions and speeds as section 5; the seconds hand in
  small steps.
- No letters anywhere in the picture; dials plain; captions inside the
  safe area.
- The loop: the last frame of scene 6 matches the first of scene 1.
- Sound: one sound per motion, cuts on a tick or a beat, the click on
  the reassembly.

## 12. Failure modes and fixes

| Failure | Fix |
|---|---|
| Gears multiply or merge | count them in the description and the motion prompt; five to seven layers |
| Layers drift sideways or tilt | one axis named ("straight upward along its centre axis"), the camera locked |
| Parts change shape between apart and together | scene 6 is scene 3 reversed, never a new generation |
| Numerals or gibberish on the dial | "plain baton markers, no numerals, no text" in every prompt |
| The balance wheel spins like a fan | "swings back and forth", "most of a turn", "about three times a second" |
| The loop jumps | scene 3 opens on scene 1's still; check the last frame of scene 6 |
| Labels appear in the frame | never ask for names in the picture; leave a plain empty field |

## 13. Policy guards

- Show the user's own product, or a generic object with no brand marks;
  never another company's product presented as the user's.
- A product that does not exist yet is shown as a concept, and the user
  says so where the film runs.
- Mechanism shots explain how a thing works; they are not repair or
  disassembly instructions, and the film does not claim safety or
  durability the user has not proved.
