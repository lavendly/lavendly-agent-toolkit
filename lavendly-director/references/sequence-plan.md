# The sequence plan and the continuity ledger

Clips made one at a time come out as attractive strangers. The plan is what
makes them one video: every shot knows what came before it, what it must
hand to the next, and what the viewer has to know by then. Write it before
any spend, show it with the intent card, and re-read it before every scene
is generated and every cut is judged.

The MCP has no field that stores this plan. It lives in the conversation,
in the shot list shown to the user. Never say it is saved on the server. Its
effects reach the platform through the prompts, the reference wiring, the
frame chaining and the edits.

## 1. One row per shot

Fill the fields the video type needs (see
[video-types.md](video-types.md)); a montage shot needs fewer than a
tutorial step.

| Field | Example (tutorial) | Example (ad) |
|---|---|---|
| Purpose | Show where the filter cartridge sits | Hook: the click of the switch |
| Subject, action, outcome | Hand lifts the lid; the empty slot is visible | Thumb presses the switch; the shade glows |
| Framing and move | Medium top-down, locked-off | Extreme close-up, slow push-in |
| From the previous shot | The jug is on the counter, lid closed | Opens the film |
| To the next shot | Lid open, slot empty, cartridge in the other hand | The lamp is lit, room still dark |
| Entities in frame | Jug (ledger row J), cartridge (C) | Lamp (hero, ledger row L) |
| Cast change | None | None (a hand enters at 1 s, introduced by the motion) |
| Must the viewer already know | What the cartridge looks like (shot 1) | Nothing |
| Sound and timing | Narration 9 words over 4 s; native clicks | Native switch click at 1 s; score starts at 2 s |
| Transition out | Hard cut on the hand's motion | Hard cut |
| Duration | 4 s | 4 s |

The two "from" and "to" columns are the contract between neighbours. When
shot 3's "from" does not match shot 2's "to", fix the plan before paying for
either.

## 2. Dependencies

- Introduce before use: the product before its feature, the tool before the
  step, the person before their reaction, the problem before the solution.
- Every question the opening raises has a row that answers it. Mark it in
  the plan ("answers the hook of shot 1").
- A step that produces a state (the lid open, the light on, the glass full)
  lists that state in "to"; every later shot that shows the object starts
  from it until another shot changes it.

## 3. The continuity ledger

One row per entity that must stay recognisable, one row per place. In
strict and flexible mode the ledger is the reference for every adjacent-shot
check. In discontinuous mode keep only the motif rows.

```text
Entity  Locked description (verbatim in prompts)          State after last landed shot     Where, facing
L lamp  Brass arc lamp, linen drum shade, black cord...   lit, shade warm                  right third, switch toward camera
H hand  Woman's right hand, short clear nails, rolled...  resting on the switch            enters from left

Place   Light source and direction        Time, weather   Geography                            Present
Study   Window camera left, soft, warm    Late afternoon  Desk along the window, shelf behind  L, H
```

Rules:

- The locked description never changes after the user approves it. The
  state column changes when a shot changes the state.
- After each scene lands, open its last frame and update the state and
  position columns from what the frame shows, not from what the prompt
  asked for. The next scene's prompt starts from the ledger.
- Screen direction: a subject leaving frame right enters the next shot from
  the left when the action continues. Write it in the "where, facing"
  column.
- Gaze and attention: when a person looks at something off screen, the next
  shot shows what they look at, or the plan says why not.
- Who is in the scene: a scene is one place and one stretch of time. Inside
  it, the people (and the hero object) present stay the same from shot to
  shot unless the video shows why. A person who appears mid-scene is
  introduced: an entrance on screen, a door or a voice, someone turning to
  them, or a wider shot that reveals they were there all along. A person who
  was there and is gone in the next shot leaves on screen, or a later shot
  or a line explains it. A new scene (another place, or a time jump the
  video makes clear) starts its cast fresh: nobody needs an exit to be
  absent from it.

## 4. Carrying the plan into Lavendly

| Plan element | How it reaches the platform |
|---|---|
| Purpose, action, outcome, framing | The still-frame prompt and the motion prompt of that scene |
| Locked descriptions | Pasted verbatim into both prompts; the hero reference node wired into every clip and image node |
| Strict continuation across a cut | `get_scene_frame` with frame set to last on the earlier scene; that image becomes the next scene's image node url through `update_workflow`, before `generate_scene` |
| Light and place | Named identically in every prompt of the scene |
| Sound and timing | `set_clip_native_audio`, `attach_track`, `update_track` (startTime, volume, ducking) |
| Transition and duration | `edit_clip` trims and fades, `split_clip`, `move_clip` |
| Dependencies | Scene order in `create_workflow`, and `move_clip` when the cut needs a different order |

Check `get_schema` for the frame option before relying on it; on a server
without it, describe the end state of the earlier shot at the start of the
next motion prompt instead.

## 5. When the plan changes

A change to a locked description, to a step's outcome, or to the order of
dependent shots makes every later shot that relied on it stale. List the
stale shots, say which need a paid re-roll and which only need an edit, and
get a yes before spending.
