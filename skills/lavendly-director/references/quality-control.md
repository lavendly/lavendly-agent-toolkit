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
- [ ] Every shot has a heading (place and time); time jumps inside one
      place have their own heading and a way to read them.
- [ ] Every shot has a purpose; a shot with none is cut.
- [ ] Each "from" matches the previous shot's "to"
      ([sequence-plan.md](sequence-plan.md)).
- [ ] Dependencies are introduced before they are used.
- [ ] The ending row delivers what the card's ending field promises.
- [ ] Narration fits 2.3 words per second of the picture it covers.
- [ ] Still-frame prompts are separate from motion prompts; one primary
      action per clip.
- [ ] Every operation planned exists in the MCP catalog; known limits were
      said plainly (no wipes, no rendered titles).

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

Deterministic first: for every cut, `quality_check` with `node_id` (shot
N+1), `previous_node_id` (shot N), `same_scene` (true under the same
heading, false under a new one) and `present` (who or what should be in
N+1's frame, the scene plan's list). It compares N's last frame with N+1's
first and returns `cut`: `cut_pass` (false when any finding is high) and
findings, each with `severity` (high, medium, low), `kind` (identity, cast,
state, light, geography, repeat), `detail`, `why`, `fix` and `mode` (the fix
type: regenerate, plan or edit), at confidence 0.6. With `same_scene` false
only identity (for the names in `present`) and repeat are checked. The cut
is advisory: it never flips `pass`, and `skip_vlm` skips it. Report each
finding with its why and its fix. On a high finding, open both frames
yourself before paying for a re-roll; a finding you cannot see in them is
reported at low confidence, not repaired. An error starting `previous_`
(`previous_node_not_found`, `previous_not_generated`) means the earlier scene
is wrong or not generated yet. On a self-hosted server whose `get_schema`
shows no `previous_node_id`, the frame comparison below is the whole check.

Judgment: open the last frame of N and the first frame of N+1
(`get_scene_frame` with frame set to last, then first). Compare them with
each other and with the ledger. The column on the right says when a row
applies.

| Check | Applies |
|---|---|
| The same entity looks the same (face, product, wardrobe, colour) | Strict, flexible |
| Position, posture and object state carry over, or the plan explains the change | Strict |
| Screen direction holds: an exit right enters left when the action continues | Strict |
| The place, spatial relationships and camera side are readable after the cut | Strict; flexible within a scene |
| No missing action: the viewer can tell how N's end became N+1's start | Strict, flexible |
| Same scene, same people: nobody appears without an entrance or a reveal, nobody vanishes without an exit or an explanation; a new place or a clear time jump resets this | Strict, flexible |
| Light, time, weather and colour hold within a scene | Strict, flexible |
| The two shots are not the same size and angle (a jump cut) unless the card wants one; inside a continuous scene trim the cut onto a line end or a motion first (free), re-roll only if it still reads as a missing frame | All, except styles that use jump cuts |
| N+1 adds something; it does not repeat N | All |
| The cut lands on a motion, a beat or a line end, not mid-word | All |
| Sound across the cut: no abrupt drop, no clash of two voices, ambience carries within a place | All |
| Two people talking: each keeps their side of the frame, eyelines meet, reverse shots mirror in size and height | Strict, flexible |
| The person speaking the line is the one in frame with a moving mouth, and is the speaker the plan names | All with dialogue |
| Motifs the card names recur as planned | Discontinuous |

Distinguish a choice from an error with the three questions in
[video-types.md](video-types.md) section 4.

## 4. Level C: the whole video

After `create_render`, run `quality_check` without `node_id` and with
`expect_audio` true, open the mid frame of each scene in order, and read
the audio summary (`get_workflow_audio`). The film check also returns
`loudness` (section 5). Then judge:

- [ ] The video does what the card's objective says, for the stated
      audience.
- [ ] Someone who has not read the plan can follow it on one viewing.
- [ ] Every "must show" item is on screen long enough to register.
- [ ] Information arrives in order: nothing is used before it is introduced.
- [ ] Every person is introduced the first time they appear, and every
      absence inside a continuing scene is explained by an exit, a line or a
      later shot.
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
| Music is ducked under narration and dialogue | `update_track` ducking true, `volume` 35 (a percent, never 0.35); film-wide music ducks only under a voiceover that is also wired to every clip |
| The score and the narration reach every clip | Attach with `"scope": "film"` and check `get_workflow_audio`; for a clip it missed, `update_workflow` adds the edge; on one clip they freeze that clip's last frame |
| One score for the video, not one per scene | `detach_track` the extras |
| Narration and native dialogue do not overlap | `set_clip_native_audio` to mix or off on that clip, or rewrite the line so it falls on another scene |
| Narration fits its picture (2.3 words per second) | Shorten the line and attach it again; never let it run over the next scene |
| Native sound is on where the picture shows a source the card wants heard | `set_clip_native_audio` native |
| A clip's own audio jumps in level against its neighbours | `edit_clip` volume on that clip |
| Sound starts or stops on a hard edge at the video's start or end | `edit_clip` `fade_in_ms` or `fade_out_ms` on the music node (a clip fade does not fade a film-wide score); `update_track` `duration` sets the block end |
| Silence where the card wants sound, or sound where it wants silence | Attach or detach; keep intended silence |

Measured: every export is normalized to -14 LUFS integrated with a -1.5
dBTP true peak ceiling. The render result (`get_render`) and the film's
`quality_check` carry `loudness`: integrated LUFS, true peak, loudness
range and the targets (on the render, `normalized` false means the pass did
not run: no audio, or the film shipped at its mixed level). Report the
integrated level and the true peak. A film below -20 or above -10 LUFS, or
with a true peak above -1 dBTP, gets a warning in `failures` that never
flips `pass`; report it and look for its cause (a quiet mix, one loud
clip).

Not measured: the balance between layers (voice against music, one clip
against its neighbour) and a single loud moment inside a film whose average
is on target. When a join or a mix is in doubt, say so and ask the user to
listen to that moment; never report a level that was not measured. Do not
add music or effects the card did not ask for.

## 6. Timing and transitions

- Each shot stays long enough to read its information: about 2 s for a
  simple action, longer for text (reading time plus one second) and for a
  tutorial result the viewer must see. These are working defaults, not
  measured thresholds.
- Trim to the strongest window with `edit_clip`; split a clip that holds
  two beats with `split_clip`; reorder with `move_clip`.
- Transitions the render makes: hard cut, cut on action, match cut (planned
  in the prompts), dip to black (`fade_out_ms` then `fade_in_ms`), dissolve
  (an overlap plus matching fades, [mcp-calls.md](mcp-calls.md)), J and L
  cuts (track timing), speed change (`edit_clip` speed). Wipes are not
  rendered; do not promise them.
- A hard cut is the default. Use a dip to black for time passing or a new
  chapter, a dissolve for a soft change of place or time inside one mood, a
  speed change for a deliberate beat, never as decoration.

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

| Severity | Where | Issue | Why it matters here | Fix | Fix type | Confidence |
|---|---|---|---|---|---|---|
| High | Cut from "lid open" to "cartridge in" | The lid is closed again in the second shot | The viewer cannot tell whether the step happened | Chain the second shot from the last frame of the first and re-roll it | Targeted regeneration, paid | High: both frames opened |

Confidence is high when a deterministic tool check reported it or both
frames were opened and show it plainly, medium when it rests on one mid
frame or on the cut check alone (its findings come at 0.6), low when it is
inferred from the plan without a frame. Say which.

The message to the user opens with one line naming the video type and the
continuity mode, then the findings with severity and confidence.

Order findings by severity. List Low findings only when the user asks for
polish or nothing ranks above them.

## 9. Repair, smallest first

1. Edit: trim, split, reorder, speed (free).
2. Audio: volume, ducking, native mode, track timing (free); a shorter
   synthesized line (paid).
3. Transition: a dip to black, a dissolve, or the cut moved onto a motion
   (free).
4. Targeted regeneration of one scene, with the fix named and the server's
   `reroll_hint` appended (paid; announce; at most one per scene).
5. A change of direction for a section (paid; ask first).

Never regenerate the whole video for one shot. After any repair, check
again: the repaired scene (level A), both of its cuts (level B), and the
whole video after the next render (level C). A fix is reported as done only
after that check ran and passed; until then it is "applied, not yet
checked".

