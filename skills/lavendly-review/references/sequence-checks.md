# Sequence checks

`quality_check` judges one scene against its own prompt, one cut on two
frames (with `previous_node_id`), and the rendered film's loudness. Nothing
on the server judges the video as a whole against its intent, so this skill
does that part itself, with frames it opens and the audio summary it reads.
Apply only the rows that matter for the video's intent; a row that does not
apply is skipped, not failed.

## 1. Intent and continuity mode

Read the intent card from the plan that made the video (lavendly-director
writes one). Without one, infer the type and the continuity mode from the
brief and the scenes, and state them in one line before reporting anything.

| Mode | Typical videos | Cut checks that apply |
|---|---|---|
| Strict | One continuous action or place, dialogue, product handling, a tutorial step across shots | All of section 2 |
| Flexible | Ads, explainers, documentaries, travel, social stories | Identity, light within a scene, readable place within a scene, who is present within a scene, nothing missing |
| Discontinuous | Music videos, montages, mood pieces, rapid-cut ads | Motifs, rhythm, sound across the cut |

| Type | Check first |
|---|---|
| Narrative | Character identity, spatial logic, action continuity, setup and payoff |
| Advertisement | Product visible and recognisable, one message, brand look, the call to action |
| Product demo | Each claimed feature shown working, plausible handling, order of use |
| Tutorial | Step order, each step's result visible, readable interface text, nothing skipped |
| Explainer | One idea per scene, introduced before it is used |
| Documentary | Factual fidelity, context before detail, footage that does not mislead |
| Music video | Cuts on the beat, recurring motifs, energy that follows the track |
| Social | The first second, pace, readable with sound off, platform aspect |
| Animation | Character design and one animation style held, plausible motion |

Choice or error: a deviation is a choice when the plan calls for it and a
first-time viewer would understand it. When the viewer would not
understand it, it is an error even if it was intended. A jump cut in a fast
social clip is a choice; the same cut inside a continuous dramatic scene is
an error. A tutorial showing a result before its step is always an error.

## 2. Each cut

Server first: for each cut between scene N and scene N+1, `quality_check`
with `node_id` (N+1), `previous_node_id` (N), `same_scene` and `present`.
`same_scene` is true under the same heading and false under a new one (the
headings come from `get_scene_plan`, else the plan, else your inference,
said in one line); `present` is who or what should be in N+1's frame (the
plan's list). The answer's `cut` holds `cut_pass` (false when any finding is
high) and findings, each with `severity` (high, medium, low), `kind`
(identity, cast, state, light, geography, repeat), `detail`, `why`, `fix`
and `mode` (regenerate, plan or edit), at confidence 0.6. With `same_scene`
false only identity (for names in `present`) and repeat are checked. The
cut is advisory: it never flips `pass`, and `skip_vlm` skips it.

- Report each finding with its why and its fix, as a row of section 6.
  Confidence is medium for a finding the tool alone reported, high once you
  see it in both frames.
- On a high finding, open both frames before paying for a re-roll. A
  finding you cannot see in them is reported, not repaired.
- A `mode` of edit (repeat) is a free trim first; plan (geography) is a
  wider shot or a held screen side in the plan; regenerate is a paid re-roll.
- A `previous_` error (`previous_node_not_found`, `previous_not_generated`)
  means scene N is wrong or not generated: fix the order, do not re-roll.

Then your own look: open the last frame of N and the first frame of N+1
(`get_scene_frame`, frame last then first). On a server without the frame
option, use mid frames and lower the confidence. On a self-hosted server
whose `get_schema` shows no `previous_node_id`, this look is the whole cut
check.
Frame last reads the raw clip, not the trimmed window: when scene N is
trimmed at its end, judge that cut on the rendered film instead.

- The same entity looks the same: face, product, wardrobe, colour.
- Position, posture and object state carry over, or the story explains the
  change.
- Screen direction holds when the action continues across the cut.
- The place and the spatial relationships stay readable.
- Nothing is missing: the viewer can tell how N's end became N+1's start.
- Same scene, same people: inside one place and one stretch of time,
  nobody appears without an entrance or a reveal, and nobody who was there
  is gone without an exit on screen or an explanation. A new place or a
  clear time jump starts the cast fresh. A stray extra the model added
  counts too.
- Light, time, weather and colour hold within a scene. A scene is one
  place and one stretch of time; use the plan's headings when there are
  any, otherwise infer them and say so.
- Two people talking: each keeps their side of the frame, eyelines meet,
  reverse shots mirror in size and height; the person speaking is the one
  in frame with a moving mouth.
- The two shots are not the same size and angle, unless the style wants a
  jump cut. Inside a continuous scene the first fix is free: trim the cut
  onto the end of a line or onto a motion (`edit_clip`), so it reads as a
  deliberate beat; re-roll only when it still reads as a missing frame. A
  same-size cut that already lands on a line break is Low.
- N+1 adds something; it does not repeat N.
- Sound across the cut: no abrupt drop, no two voices clashing, ambience
  carries within a place.
- In discontinuous mode: the named motifs recur and the cut sits on the
  rhythm.

## 3. The whole video

After the render: `quality_check` without `node_id` and with `expect_audio`
true, the mid frame of each scene in order, and `get_workflow_audio`.

- It does what the intent says, for its audience.
- A first-time viewer can follow it.
- Everything that must be shown is on screen long enough to register.
- Information arrives in order; nothing is used before it is introduced.
- Every person is introduced the first time they appear; every absence
  inside a continuing scene is explained.
- What the opening promised or asked is resolved.
- Pace suits the type: no shot too short to read, none held after its
  information is spent, no run of shots that feel the same.
- Picture and sound agree; narration does not describe what is not there.
- The look holds across the video except where the plan changes it.
- The ending is the promised one (payoff, call to action, result, summary,
  reveal, or a chosen open ending).
- Aspect and length match the platform.

## 4. Audio, from the audio summary

| Check | Fix |
|---|---|
| Music ducked under narration and dialogue | `update_track` ducking true, `volume` 35 (a percent, never 0.35); film-wide music ducks only under a voiceover also wired to every clip |
| Score and narration reach every clip | Attach with `"scope": "film"` and check `get_workflow_audio`; for a clip it missed, `update_workflow` adds the edge; a track on one clip only freezes that clip's last frame for the rest of the track |
| One score, not one per scene | `detach_track` the extras |
| Narration and native dialogue do not overlap | `set_clip_native_audio` to mix or off, or a rewritten line (`startTime` moves the whole track on its mix clock) |
| Narration fits its picture (about 2.3 words per second) | A shorter line attached again (synthesis is paid) |
| A clip's own audio jumps in level against its neighbours | `edit_clip` volume |
| A hard edge at the start or the end | `edit_clip` `fade_in_ms` or `fade_out_ms`; for the score, on the music node (a clip fade does not fade a film-wide score) |

Loudness is measured. Every export is normalized to -14 LUFS integrated
with a -1.5 dBTP true peak ceiling, and the film's `quality_check` returns
`loudness` (`integrated_lufs`, `true_peak_dbtp`, `lra`, `target_lufs`,
`target_true_peak_dbtp`). Report the integrated level and the true peak. A
film below -20 or above -10 LUFS, or with a true peak above -1 dBTP, gets a
warning in `failures` that never flips `pass`: report it and find the cause
(a quiet mix, one loud clip).

Not measured: the balance between layers and a single loud moment inside a
film whose average is on target. Say when a moment is in doubt and ask the
user to listen to it; never report a level that was not measured. Keep
intended silence; do not add music or effects the intent did not ask for.

## 5. Severity

| Severity | Meaning |
|---|---|
| Critical | Fails its objective, a major contradiction, essential information missing, or a technical failure |
| High | A continuity error, broken action, unclear transition or audio problem that damages comprehension or quality |
| Medium | Pacing, coverage, consistency or editing that noticeably weakens it |
| Low | Polish that does not change comprehension |

## 6. A finding

| Severity | Where | Issue | Why it matters here | Fix | Fix type | Confidence |
|---|---|---|---|---|---|---|
| High | Cut from "pour" to "first sip" | The cup is full again in the second shot | The pour looks undone; the sip reads as a mistake | Re-roll the second shot chained from the last frame of the first | Targeted regeneration, paid | High: both frames opened |

The message to the user opens with one line naming the video type and the
continuity mode, then the findings with severity and confidence, in plain
words.

Confidence: high when a deterministic tool check reported it or both
frames show it plainly, medium when it rests on one mid frame or on the cut
check alone, low when inferred without a frame.

## 7. Repair, smallest first

1. Edit: trim, split, reorder, speed (free).
2. Audio: volume, ducking, native mode, track timing (free).
3. Transition: a dip to black, a dissolve (an overlap plus matching fades),
   or the cut moved onto a motion (free).
4. One scene re-rolled, the fix named, `reroll_hint` appended (paid,
   announced, at most one per scene).
5. A new direction for a section (paid; ask).

After any repair: re-check that scene, both of its cuts, and the whole
video after the next render. Until that check passes, the fix is "applied,
not yet checked".
