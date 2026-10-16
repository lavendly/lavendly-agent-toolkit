# Quality control

Check the video at three levels: each asset on its own, each cut between
neighbours, and the whole video as one finished piece. Apply only the rows
that matter for the intent card and the continuity mode
([video-types.md](video-types.md)); a row that does not apply is skipped,
not failed. Run the deterministic checks first (they come from a tool and
cost nothing to trust), then the judgment checks (frames you open and
read).

Approve a shot when it serves the video, fits its neighbours and keeps the
entities themselves, not because it looks attractive on its own.

## 1. Before generation: the plan

- [ ] The intent card is written and the user saw it.
- [ ] Every shot has a purpose; a shot with none is cut.
- [ ] Each "from" matches the previous shot's "to"
      ([sequence-plan.md](sequence-plan.md)).
- [ ] Dependencies are introduced before they are used.
- [ ] The ending row delivers what the card's ending field promises.
- [ ] Narration fits 2.3 words per second of the picture it covers.
- [ ] Still-frame prompts are separate from motion prompts; one primary
      action per clip.
- [ ] Every operation planned exists in the MCP catalog; known limits were
      said plainly (no dissolves or wipes, no rendered titles).

## 2. Level A: each asset

Deterministic, from `quality_check` with `node_id`:

- [ ] `pass` is true and `score` is 6 or above.
- [ ] The duration and streams are right; with `expect_audio` true, the clip
      is not silent where it should carry sound.
- [ ] `story_pass` is true. When it is false alone, open the frame before
      spending: it is advisory.

Judgment, from the mid frame (`get_scene_frame`):

- [ ] The subject matches its ledger row: shape, material, colour, marks,
      wardrobe.
- [ ] Hands, tools and contact points are plausible; nothing floats, slides
      or changes shape without a reason.
- [ ] Light has the planned source and direction; materials respond to it;
      grain, bloom, flare and haze only when asked.
- [ ] The action of the row happened, with its start and end state.
- [ ] Text, labels, interfaces and products shown are correct and readable,
      or blank on purpose. A tutorial's interface text is read word by word.
- [ ] No phone UI, timestamp, recorder dot, watermark or stray text.
- [ ] Composition gives one visual priority; the important action is
      visible, not cropped or hidden behind foreground.

## 3. Level B: each cut

For every cut between shot N and shot N+1, open the last frame of N and the
first frame of N+1 (`get_scene_frame` with frame set to last, then first).
Compare them with each other and with the ledger. The column on the right
says when a row applies.

| Check | Applies |
|---|---|
| The same entity looks the same (face, product, wardrobe, colour) | Strict, flexible |
| Position, posture and object state carry over, or the plan explains the change | Strict |
| Screen direction holds: an exit right enters left when the action continues | Strict |
| The place, spatial relationships and camera side are readable after the cut | Strict; flexible within a scene |
| No missing action: the viewer can tell how N's end became N+1's start | Strict, flexible |
| Light, time, weather and colour hold within a scene | Strict, flexible |
| The two shots are not the same size and angle (a jump cut) unless the card wants one | All, except styles that use jump cuts |
| N+1 adds something; it does not repeat N | All |
| The cut lands on a motion, a beat or a line end, not mid-word | All |
| Sound across the cut: no abrupt drop, no clash of two voices, ambience carries within a place | All |
| Motifs the card names recur as planned | Discontinuous |

Distinguish a choice from an error with the three questions in
[video-types.md](video-types.md) section 4.

## 4. Level C: the whole video

After `create_render`, run `quality_check` without `node_id` and with
`expect_audio` true, open the mid frame of each scene in order, and read
the audio summary (`get_workflow_audio`). Then judge:

- [ ] The video does what the card's objective says, for the stated
      audience.
- [ ] Someone who has not read the plan can follow it on one viewing.
- [ ] Every "must show" item is on screen long enough to register.
- [ ] Information arrives in order: nothing is used before it is introduced.
- [ ] Questions, promises and demonstrations raised early are resolved.
- [ ] Pace suits the type: no shot so short its action is lost, none held
      after its information is spent, no run of shots that feel the same.
- [ ] Picture and sound tell the same story; narration does not describe
      what is not on screen.
- [ ] The look holds across the video (palette, light quality, camera
      language, animation style) except where the plan changes it on
      purpose.
- [ ] The ending is the one the card promised.
- [ ] Aspect and length match the platform.

## 5. Audio

What the agent can verify from `get_workflow_audio` and the plan:

| Check | Fix with |
|---|---|
| Music is ducked under narration and dialogue | `update_track` ducking true; music volume 0.3 to 0.4 under voice |
| One score for the video, not one per scene | `detach_track` the extras |
| Narration and native dialogue do not overlap | `set_clip_native_audio` to mix or off on that clip, or move the narration with `update_track` startTime |
| Narration fits its picture (2.3 words per second) | Shorten the line and attach it again; never let it run over the next scene |
| Native sound is on where the picture shows a source the card wants heard | `set_clip_native_audio` native |
| A clip's own audio jumps in level against its neighbours | `edit_clip` volume on that clip |
| Sound starts or stops on a hard edge at the video's start or end | `edit_clip` `fade_in_ms` or `fade_out_ms`, or trim the track with `update_track` |
| Silence where the card wants sound, or sound where it wants silence | Attach or detach; keep intended silence |

What it cannot verify: perceived loudness, clipping and the balance between
layers are not measured by any tool today. When a join or a mix is in
doubt, say so and ask the user to listen to that moment; never report a
loudness level that was not measured. Do not add music or effects the card
did not ask for.

## 6. Timing and transitions

- Each shot stays long enough to read its information: about 2 s for a
  simple action, longer for text (reading time plus one second) and for a
  tutorial result the viewer must see. These are working defaults, not
  measured thresholds.
- Trim to the strongest window with `edit_clip`; split a clip that holds
  two beats with `split_clip`; reorder with `move_clip`.
- Transitions the render makes today: hard cut, cut on action, match cut
  (planned in the prompts), dip to black (`fade_out_ms` then `fade_in_ms`),
  J and L cuts (track timing), speed change (`edit_clip` speed). Dissolves
  and wipes are not rendered; do not promise them.
- A hard cut is the default. Use a dip to black for time passing or a new
  chapter, a speed change for a deliberate beat, never as decoration.

## 7. Severity

| Severity | Meaning |
|---|---|
| Critical | The video fails its objective, contradicts itself in a major way, omits essential information, or has a technical failure (a scene missing, silent where sound is required) |
| High | A continuity error, broken action, unclear transition or audio problem that damages comprehension or quality |
| Medium | Pacing, coverage, consistency or editing that noticeably weakens the result |
| Low | A polish opportunity that does not change comprehension |

## 8. A finding

Report each finding on one row, in the user's language, scenes named by
their beat:

| Where | Issue | Why it matters here | Fix | Fix type | Confidence |
|---|---|---|---|---|---|
| Cut from "lid open" to "cartridge in" | The lid is closed again in the second shot | The viewer cannot tell whether the step happened | Chain the second shot from the last frame of the first and re-roll it | Targeted regeneration, paid | High: both frames opened |

Confidence is high when a tool reported it or both frames were opened and
show it plainly, medium when it rests on one mid frame, low when it is
inferred from the plan without a frame. Say which.

Order findings by severity. List Low findings only when the user asks for
polish or nothing ranks above them.

## 9. Repair, smallest first

1. Edit: trim, split, reorder, speed (free).
2. Audio: volume, ducking, native mode, track timing (free); a shorter
   synthesized line (paid).
3. Transition: a dip to black, or the cut moved onto a motion (free).
4. Targeted regeneration of one scene, with the fix named and the server's
   `reroll_hint` appended (paid; announce; at most one per scene).
5. A change of direction for a section (paid; ask first).

Never regenerate the whole video for one shot. After any repair, check
again: the repaired scene (level A), both of its cuts (level B), and the
whole video after the next render (level C). A fix is reported as done only
after that check ran and passed; until then it is "applied, not yet
checked".
