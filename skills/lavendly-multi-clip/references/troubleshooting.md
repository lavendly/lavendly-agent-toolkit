# Troubleshooting: multi-clip

Error strings as the server returns them and what to do. Tool errors arrive
as `{ "error": { "code", "message", "http_status" } }`.

## `url required` (code `invalid_args`, 400) on `attach_track`

This server does not synthesize from `text` or `mood` yet. Ask the user to
generate one voiceover and one music track in the Lavendly app (Asset
Library), then attach each by hosted `url` on the first clip, with the same
`idempotency_key` prefix. Still one score for the whole film.

## Two music tracks on the film

`get_workflow_audio` shows more than one music track. Keep the one on the
first clip; `detach_track` the others with `remove_source_node: true`. One
score per film is a product law, not a preference.

## `insufficient_credits` (402) or `sufficient: false`

Stop. Report needed versus available. Options in this order: fewer or shorter
shots, a cheaper model if `get_status` lists one, a top-up. Never split the
generate call to slip under the check.

## A scene fails `quality_check`

Append `reroll_hint` to that scene's prompt, regenerate only that `node_id`
once, check again. Never regenerate the whole film for one shot. A second
failure on the same scene: show the frame with `get_scene_frame` and ask how
to change the beat. Never present the film as done with a failing scene in
it.

## Identity drift between shots

The anchors were not pasted verbatim, or a shot prompt contradicts them
("she pulls up her hood" when the anchor fixes the hair). Restore the exact
anchor text, remove the contradiction, re-roll that scene once.

## Palette drift

One shot reads as a different time of day. Check the palette anchor is the
same bytes in every prompt and that the action line does not introduce a new
light source ("neon sign" against a dawn anchor). Fix the prompt, re-roll
once.

## `needs_browser`

The workflow needs the canvas to finish. Tell the user to open it in the
Lavendly app; stop polling; do not start another job.

## `stalled: true`

Re-check once after 10 seconds. Still stalled: report and ask before
retrying with the same `idempotency_key`. Never a parallel job for the same
scene.

## Render `failed`

Retry `create_render` at most twice with the same key. Then read
`get_workflow_audio` (a broken track url is the usual cause) and
`get_generation_status`. Two identical failures mean something must change.

## `version_conflict` or `workflow_conflict` (409)

The workflow changed since you loaded it. Reload with `get_workflow`,
re-apply the prompt change to the fresh nodes, write once.

## `workflow_not_found` or `clip_not_found` (404)

Reload with `get_workflow` and read the videoGenerator ids again. Never guess.

## Timeout on a paid call

The job may be running. Rejoin with `get_generation_status`. If you must
resend, use the identical `idempotency_key`; the server returns the same
response for 24 hours.

## The user attached a reference photo in chat

It never reaches you. Ask for an upload at https://lavendly.ai/AssetLibrary
or a public URL, then `import_asset` and use the returned url. Do not
describe the photo from imagination.
