# MCP call shapes: cost-aware

The calls this skill adds around a domain skill's sequence. Argument names are
the live MCP names.

## Pre-flight

```json
{}
```

`get_status`: provider readiness, voice and music config, capability flags.
It lists no video or image models. `get_ledger`: available credits, plan, pending
reservations. `get_monthly_usage`: `fraction_used` of the monthly upstream
budget. All three are free. Run them once per session and again before an
unattended run.

Working balance = available minus pending reservations.

## `estimate_cost`

```json
{ "workflow_id": "<id>" }
```

Response:

```json
{
  "total": 36,
  "remaining": 24,
  "per_scene": [
    { "node_id": "<clip 1>", "model": "<model id>", "credits": 12, "already_generated": true },
    { "node_id": "<clip 2>", "model": "<model id>", "credits": 12, "already_generated": false },
    { "node_id": "<clip 3>", "model": "<model id>", "credits": 12, "already_generated": false }
  ],
  "available_credits": 140,
  "sufficient": true
}
```

Read `remaining` for the marginal spend: clip 1 already exists and the render
will reuse it. Announce: "2 scenes left to generate, <model>, 24 credits,
116 left after. Go ahead?"

Thresholds:

| Condition | Action |
|---|---|
| `sufficient` false | stop, report needed versus available |
| `remaining` above the cap | stop (unattended) or ask (attended) |
| `remaining` above 30 percent of working balance | ask; unattended: stop |
| `fraction_used` above 0.85 | refuse non-critical generation |

## Model preference on `create_workflow`

The MCP input schema for `create_workflow` lists `name`, `description`,
`nodes`, `edges`, `duration`, `project_id`, `project_name`,
`idempotency_key`, the `shots` convenience array, `aspect` and `videoModel`
(applied to every compiled shot; a `videoModel` inside a shot is ignored).
The server validates no argument and checks no model id, so use exact names
and only ids from this table (credits per 5 s block at default resolution):

| Model | Id | Seconds | Credits per block | Notes |
|---|---|---|---|---|
| HeyGen Video 1 | `heygen/heygen-video-1` | 5 to 15 | 7 | silent |
| Seedance 2.0 Mini | `bytedance/seedance-2.0-mini` | 4 to 15 | 9 | sound, up to 4 references |
| Veo 3.1 Lite (Auto, no `videoModel`) | `google/veo-3.1-lite` | 4, 6, 8 | 10 | sound, never a reference |
| Veo 3.1 Fast | `google/veo-3.1-fast` | 4, 6, 8 | 14 | sound, dialogue, 2 references |

An id outside the allowlist is quoted at a flat 14 per block and sent to
the provider as is. Durations are sent as written: use the model's exact
lengths.

```json
{
  "name": "<name>",
  "shots": [ { "prompt": "<prompt>", "duration": 4 } ],
  "videoModel": "<cheapest model id that meets the brief>",
  "idempotency_key": "wf-<slug>-<date>"
}
```

To change the model on an existing scene, set that videoGenerator node's
`data.videoModel` (not `data.model`) in `update_workflow` (pass the full
`nodes` array with the one change), then confirm it in `per_scene`.

## Idempotency key conventions

| Action | Key |
|---|---|
| `create_workflow` | `wf-<slug>-<date>` |
| `attach_track` voiceover | `vo-<workflow id>` |
| `attach_track` music | `mus-<workflow id>` |
| `generate_scene` (all) | `gen-<workflow id>-1` |
| `generate_scene` (re-roll) | `gen-<workflow id>-<clip id>-reroll-1` |
| `create_render` | `render-<workflow id>-1` |
| `publish_video` | `pub-<workflow id>-<channel id>` |

Mint once per logical action. Reuse on retry. The server returns the same
response for the same key within 24 hours. Never increment the suffix to
"retry"; a new suffix is a new action and a new charge.

## Rejoining a job after a timeout

```json
{ "workflow_id": "<id>" }
```

`get_generation_status` for generation; `get_render` with `job_id` for a
render. Poll every 5 to 10 seconds, silently. Report a phase change in one
line.

## Continuing a prior unattended run

```json
{}
```

`list_workflows` ignores `limit` and has no filters: it returns every
workflow, newest update first, each with `name`, `description` and
`project_id`. A workflow with the same name from
today means a prior run may have generated some scenes: call
`estimate_cost` on it, read `already_generated`, and continue from there
instead of creating a duplicate.

## Verifying a refund after a failure

`get_ledger` again. A render that failed after producing some clips charges
only for the clips delivered; the rest of the reservation is released. If the
ledger does not reflect that within a minute, report the discrepancy with
the workflow name, not the id.
