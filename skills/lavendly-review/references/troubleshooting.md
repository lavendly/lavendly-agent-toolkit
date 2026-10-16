# Troubleshooting: review

Error strings and situations in the quality loop, and what to do.

## `quality_check` returns `pass: false`

Read `failures`, classify them (see prompt-anchors.md in this folder),
announce the cost of one re-roll, append `reroll_hint` to that scene's
prompt, regenerate only that `node_id`, check again. Once.

## The same scene fails twice

Stop re-rolling. Show the frame with `get_scene_frame`, quote the failures in
plain words, offer: accept, change the beat, or shorten the shot. Never a
third identical attempt. Never present the scene as done.

## `reroll_hint` is empty on a failure

Structural failures (duration, missing stream) often carry no hint.
Regenerate the scene as is, once. If it fails again, report the failure text
and stop; this is a platform issue, not a prompt issue.

## `quality_check` errors instead of answering

If the error mentions the vision provider, run again with `skip_vlm: true`
and say the check was structural only. Never claim the vision rubric passed
when it did not run.

## The frame url does not open for the user

`get_scene_frame` urls need the user signed in to Lavendly. Say so. Do not
try to fetch or re-host the image.

## `update_workflow` returns 409 (`workflow_conflict` or `version_conflict`)

The graph changed since you read it (the user edited the canvas, or a job
wrote a clip). Reload with `get_workflow`, re-apply the one prompt change to
the fresh `nodes`, write once. Never write a stale copy.

## `update_workflow` dropped nodes

You sent a partial `nodes` array. Passing `nodes` replaces all nodes. Reload
with `get_workflow`; if scenes are gone, tell the user immediately and stop.
There is no undo tool.

## `insufficient_credits` on the re-roll

Report needed versus available. Offer to render with the scene flagged in
the contact sheet, or to wait. Do not mint a new key or split the call.

## `needs_browser` during the re-roll

Tell the user to open the workflow in the Lavendly app; stop polling; do not
start another job.

## `stalled: true`

Re-check once after 10 seconds. Still stalled: report and stop. Never a
parallel job for the same scene.

## The film renders but `quality_check` on the film fails

Read the failures. A missing audio stream means the tracks did not mix: check
`get_workflow_audio`, fix the track (`update_track`, or re-attach), render
again with a new `idempotency_key` (free; the same key would replay the old
render for 24 hours). A visual failure on the film
names a scene: go back to that scene's loop.

## The user says "just render it" with a failing scene

Show the contact sheet with the FAILED row and ask for the words "accept
scene <n>". Then render and write "scene <n> accepted with failures" in the
delivery line. Without those words, do not render.

## Timeout on `generate_scene`

Rejoin with `get_generation_status`. If you must resend, use the identical
`idempotency_key`.
