# Re-roll wording: review

What a failure class means, how to append the hint, and what must never
enter a re-roll prompt.

## The re-roll prompt

The original prompt stays intact. The hint goes after it, verbatim, on its
own line. Nothing else changes.

```text
<original prompt: anchors, camera, action>
<reroll_hint exactly as returned>
```

If the hint contradicts an anchor (the anchor says black hair, the hint says
"keep the brown hair"), the reference image is wrong, not the anchor. Stop
and show the user the frame instead of re-rolling.

## Failure classes

| Failure text contains | Class | Before the re-roll |
|---|---|---|
| identity, face, drift, different person | identity | Confirm the character anchor is byte-identical in this prompt; restore it |
| wardrobe, clothing, coat, hat | identity | Remove any action that changes clothing; restore the anchor |
| hand, fingers, limb, melting, waxy, dead eyes | artifact | Append the hint; keep hands visible and at rest in the action line |
| duration, stream, silent, no audio | structural | Regenerate as is; check `expect_audio` was right for this clip |
| palette, colour, lighting, time of day | palette | Confirm the palette anchor; remove any new light source from the action |
| reference, mismatch, conditioning | reference | Check the image node and its edge into the video node |
| text, watermark, caption, logo | overlay | State positively: "clean frame, no lettering on surfaces" is a negative; write "bare walls, unmarked clothing" |

## Scope of a re-roll

One scene. One appended hint. Same duration, same model unless the second
failure is an artifact class, in which case the next attempt (if the user
approves it) steps up one model tier through the domain skill, not through
this one.

Never:

- regenerate scenes that passed
- rewrite the anchors to "help" the hint
- change the duration to dodge a structural failure without telling the user
- add a second hint on top of the first after a second failure

## Words that must not enter a re-roll prompt

The same banned list as the domain skills. A re-roll is the moment agents
reach for them; do not.

| Banned | Write instead |
|---|---|
| cinematic | the move: "slow dolly push, shallow focus" |
| stunning, breathtaking, gorgeous, beautiful, amazing | the thing itself |
| masterpiece | delete |
| 8k, 4k, ultra-realistic, highly detailed, photorealistic | describe texture: "pores, stubble, linen weave" |
| epic | the scale in camera terms |
| dynamic, energetic | the motion in plain words |

Constraints stay positive: "hands resting on the rail, fingers relaxed and
fully visible", not "no extra fingers".

## Wording for the user

Failure, one line per scene, plain words:

"Scene 2 (bridge) failed: her hair turned brown and the left hand has extra
fingers. One re-roll, 12 credits. Go ahead?"

Second failure:

"Scene 2 failed again on the hand. I will not re-roll a third time with the
same prompt. Options: accept it, change the action so the hands are in the
coat pockets, or cut the shot to 4 seconds and re-roll once more."

Borderline pass:

"Scene 3 passed at 5.8: the compass is dull where the anchor says brass. Fine
to render, or re-roll for 12 credits?"
