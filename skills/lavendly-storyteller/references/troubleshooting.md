# Troubleshooting: storyteller

Error strings as the server returns them, what they mean, what to do. Tool
errors arrive as `{ "error": { "code", "message", "http_status" } }`.

## `url required` (code `invalid_args`, 400) on `attach_track`

This server does not synthesize audio from `text` or `mood` yet. Ask the user
to generate the voice or music in the Lavendly app (Asset Library), find it
with `list_assets`, then call `attach_track` again with its `url` and the same `idempotency_key`
prefix. Say it once, plainly.

## `insufficient_credits` (402)

The message names the credits needed and available. Stop. Report both
numbers, suggest a cheaper model or a top-up, and do not call
`generate_scene` again until the ledger changes. Never split the job into
smaller generate calls to slip under the check.

## `sufficient: false` from `estimate_cost`

Same as above, before any spend. Refuse and report.

## `needs_browser` from `get_generation_status`

The workflow needs the canvas to finish (complex audio mux or a client-side
step). Tell the user to open the workflow in the Lavendly app and stop
polling. Do not start a second generation or render.

## `stalled: true`

No progress for a while. Re-check once after 10 seconds. If still stalled,
report it and ask before retrying with the same `idempotency_key`. Never
start a parallel job for the same scene.

## Render `failed`

Retry `create_render` at most twice with the same `idempotency_key`. Two
identical failures mean the workflow needs a change (a missing clip, a broken
track url), not a third try. Read `get_workflow_audio` to see the tracks and
`get_generation_status` for the reason.

## `quality_check` returns `pass: false`

Read `failures`, append `reroll_hint` to the scene prompt, regenerate that
`node_id` once, check again. A second failure is a prompt problem: show the
user the frame with `get_scene_frame` and ask how to change the brief. Never
deliver a failing clip as done.

## `workflow_not_found` or `clip_not_found` (404)

The id is wrong or belongs to another account. Call `get_workflow` and read
the videoGenerator node id again. Never guess ids.

## `version_conflict` or `workflow_conflict` (409)

The workflow or its film bible changed since you loaded it (the user edited
the canvas, or a parallel call landed). Reload with `get_workflow`, re-apply
your change to the fresh copy, write once. Never overwrite blind.

## Timeout or lost response on a paid call

The call may have gone through. Do not repeat it with a new key. Call
`get_generation_status` (or `get_render` with the job id) to rejoin the
running job. If you must resend, resend with the identical
`idempotency_key`: the server returns the same response for 24 hours.

## The user attached a file in chat

You cannot read it and you have no url. Say so, point to
https://lavendly.ai/AssetLibrary or ask for a public URL, then use
`import_asset`. Do not build a text-only scene silently.

## Unknown tool or model in the user's request

Call `get_schema` (tools) or `get_status` (models and providers). Report what
exists and offer the nearest match. Never fabricate a name.
