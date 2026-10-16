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
| Heading | Kitchen counter, morning | Study, late afternoon |
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

The heading names the place and the time in a few words. Shots with the
same heading are one scene; a new heading is a new scene. A time jump in
the same place gets its own heading ("Café table, evening" after "Café
table, afternoon"), and the video must make the jump readable (light,
a dip to black, a line). The cast, light and object-state rules apply
within a heading and reset at the next one.

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

## 4. Two people talking

- Fix each speaker's side of the frame for the whole scene and write it in
  both prompts of every shot: "Mia on the left, facing right; Tom on the
  right, facing left". The camera stays on one side of the line between
  them; crossing it needs a visible move.
- Reverse shots mirror each other: if Mia's close-up has her in the left
  third looking right, Tom's has him in the right third looking left, at
  the same size and height.
- Eyelines meet: each speaker looks toward the side of the frame where the
  other one sits, at the other's eye height.
- One spoken line per clip, by the person whose face is in frame, with the
  speaker named in the motion prompt. Never let a clip carry a line for
  someone who is off screen unless the plan says it is heard over a
  listener's reaction.
- Cover the listener too: a reaction shot is often the strongest cut.

## 5. Carrying the plan into Lavendly

| Plan element | How it reaches the platform |
|---|---|
| Heading, purpose, action, outcome, framing | The still-frame prompt and the motion prompt of that scene; the heading and who is present open every motion prompt of the scene |
| Locked descriptions | Pasted verbatim into both prompts; the hero reference node wired into every clip and image node |
| Strict continuation across a cut | `get_scene_frame` with frame set to last on the earlier scene (not trimmed at its end: last reads the raw clip); `/api` plus the returned path becomes the next scene's image node url through `update_workflow`, before `generate_scene` |
| Light and place | Named identically in every prompt of the scene |
| Sound and timing | `set_clip_native_audio`, `attach_track`, `update_workflow` edges to every clip, `update_track` (startTime, volume in percent, ducking) |
| Transition and duration | `edit_clip` trims and fades, `split_clip`, `move_clip` |
| Dependencies | Scene order in `create_workflow`, and `move_clip` when the cut needs a different order (it reorders; clips play back to back) |

Check `get_schema` for the frame option before relying on it; on a server
without it, describe the end state of the earlier shot at the start of the
next motion prompt instead.

Where `get_schema` lists `set_scene_plan`, store each shot's heading, who is
present and its hand-off with it right after `create_workflow` (keyed by the
video node id); the server then opens that scene's prompt with the heading
and the cast. Read it back with `get_scene_plan` in a later session instead
of rebuilding the plan from memory.

## 6. When the plan changes

A change to a locked description, to a step's outcome, or to the order of
dependent shots makes every later shot that relied on it stale. List the
stale shots, say which need a paid re-roll and which only need an edit, and
get a yes before spending.
