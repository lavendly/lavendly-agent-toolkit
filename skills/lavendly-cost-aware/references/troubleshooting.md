# Troubleshooting: cost-aware

Errors, refusals and the wording to use. Tool errors arrive as
`{ "error": { "code", "message", "http_status" } }`.

## `insufficient_credits` (402)

The message names needed and available credits. Say:

"Generating <n> scenes needs <needed> credits; <available> are available.
Options: shorter or fewer shots, a cheaper model, or a top-up. Which?"

Unattended: emit the skipped line and stop. Do not retry until the ledger
changes. Never split the generate call into smaller ones to pass the check.

## `sufficient: false` from `estimate_cost`

Same as above, before any spend has happened. No call to `generate_scene`.

## Estimate above the cap

Attended: "This needs <credits> of a <cap> budget. Cut to <n> shots for about
<credits> or raise the budget?" Unattended: skipped line, stop.

## Estimate above 30 percent of the working balance

Attended: announce and wait for a yes. Unattended: treat as above the cap.

## `fraction_used` above 0.85

The monthly upstream budget is nearly used. Refuse non-critical generation:
"Monthly usage is at <percent> percent; I am not generating until it resets
or you say this one is critical." Unattended: skipped line, stop.

## `url required` (code `invalid_args`) on `attach_track`

No audio synthesis on this server. The track needs a hosted file from the
Lavendly app (Asset Library). Attended: ask once. Unattended: skip the track,
say so in the report, do not fail the whole run because of it unless the
brief requires narration.

## Two identical failures

The same error twice on the same action with the same key. Stop. The prompt
or the parameters must change. Report the error message once; do not send a
third attempt.

## Timeout or lost response on a paid call

Do not resend with a new key. Rejoin with `get_generation_status` or
`get_render`. If you must resend, use the identical `idempotency_key`.

## `stalled: true`

Re-check once after 10 seconds. Still stalled: report it and stop. Never
start a parallel job for the same scene.

## `needs_browser`

The workflow needs the canvas to finish. Tell the user to open it in the
Lavendly app. Unattended: report and stop; the run cannot complete headless.

## Render `failed`

Retry at most twice, same key. Render is free, so the retries cost nothing,
but the third identical failure is information, not bad luck: read
`get_workflow_audio` and `get_generation_status`, report the cause.

## A domain skill wants to skip the estimate

It cannot. This skill has `priority: high`. Run `estimate_cost`, announce,
then continue with the domain skill's sequence.

## The user says "just render everything now"

Render is free, but a render of a workflow with ungenerated scenes triggers
generation, which is not. Run the pre-flight, estimate, announce, and wait
for the yes. Then render. Say in one line why the pause exists.

## Unknown model id in the brief

`get_status` did not list it. Say so, show the closest listed model with its
per-scene credits from `estimate_cost`, and wait. Never pass an unlisted id.
