---
name: lavendly-cost-aware
version: 0.2.0
priority: high
description: |
  Budget guardrails for every Lavendly MCP run, attended or unattended: pre-flight on status, ledger and monthly usage; estimate before any spend; the cheapest model when the user asks for cheap or a budget demands it; strict retry and idempotency discipline; one-line announcements and reports. Loads on top of a domain skill and wins every spend approval, cap and retry decision.
  Use when: "budget", "cheap", "do not overspend", "run this every Monday", "unattended", "cron", "keep it under N credits", or whenever the agent will call generate_scene without a human reading each estimate.
  Chain: load first, then the domain skill (storyteller, multi-clip, director or a genre skill) for the film itself; lavendly-review still runs; lavendly-publish still needs an explicit yes, which a routine the user set up with a channel and a cap provides.
  NOT for: writing prompts or scripts (domain skills), quality judgement (lavendly-review), or publishing decisions (lavendly-publish).
argument-hint: "[budget in credits] [mode: attended|unattended] [report target]"
---

# Lavendly Cost-aware

Money rules. This skill has `priority: high`: when it disagrees with a domain
skill about whether to spend, this skill wins. It never picks a shot or a
voice; it decides whether the call happens and with which model.

## Before anything else

Pre-flight, before the first paid call.

| Step | Call | Read | Rule |
|---|---|---|---|
| 1 | `get_status` | provider readiness, voice and music config (it lists no video models) | Never claim or deny a capability from memory |
| 2 | `get_ledger` | available credits, pending reservations | Available minus pending is the working balance |
| 3 | `get_monthly_usage` | `fraction_used` | Above 0.85: refuse non-critical generation, report |
| 4 | `estimate_cost` | `total`, `remaining`, `per_scene`, `sufficient` | Announce; ask above 30 percent of balance; refuse when `sufficient` is false |

Every run states its budget before spending: the user's cap, or in unattended
mode the operator's cap from the brief. If unattended and no cap is given,
use 10 percent of the working balance and say so in the report.

- Every name, product, place and story in this skill and its references is an
  example. The user's brief replaces it; never carry one into their film.

## Spend rules

1. Estimate before any spend. `estimate_cost` runs after the workflow exists,
   before any paid `attach_track` and before `generate_scene`. Read `remaining`, not
   `total`, when clips already exist: render reuses them.
2. Announce before every paid call, one line: what, model or scene count,
   credits, balance after. Example: "Generate 3 scenes, <model>, 36 credits,
   104 left. Go ahead?"
3. Above 30 percent of the working balance: wait for a yes. In unattended
   mode there is no yes, so the cap is a hard stop.
4. `sufficient` false or `insufficient_credits`: stop. Report needed versus
   available. Suggest fewer or shorter shots, a cheaper model, or a top-up.
   Never split a generate call to slip under the check.
5. Render is free and never re-charges. Generation is paid per clip. A
   `quality_check` re-roll is a paid generation: announce it like any other.
   Voice and music synthesized by `attach_track` are charged when attached
   and are not in `estimate_cost`: put their credits in the approval line
   with the clips ("clips 46 plus voice and music 3, total 49. Go ahead?")
   and attach them only after the yes, or before it only when the user
   approved that spend explicitly.
6. Refuse "render everything now" until steps 1 to 4 are done. Speed is not
   permission.

## Model preference

- The genre skill (or lavendly-models) picks the model for quality, sound,
  references and aspect; this skill does not override that pick. It steps
  down to the cheapest model that meets the brief only when the user asked
  for cheap, set a budget the pick does not fit, or the run is unattended.
  Then say what the cheaper model loses in one line. Model ids and prices
  come from the table in [references/mcp-calls.md](references/mcp-calls.md);
  `estimate_cost.per_scene` shows the model each scene will use. No tool
  lists video models.
- Pass the chosen model as the top-level `videoModel` on `create_workflow`.
  Never invent a model id: the server does not check it, quotes an unknown
  id at a flat 14 credits per block and sends it to the provider as is.
- Durations are sent as written, never snapped: use the model's exact
  lengths (Auto makes 4, 6 or 8 s).
- Shots without faces: the cheapest model is almost always enough. Shots with
  people: step up one tier only when the cheapest shows visible artifacts on
  `quality_check`.
- The user asking for "the best" is a reason to name the price difference,
  not to skip the estimate.

## Retry and idempotency discipline

- One `idempotency_key` per logical action: `create_workflow`, each
  `attach_track`, `generate_scene`, `create_render`, `publish_video`. Mint it
  once, reuse it on every retry of that action. Never mint a new key to retry.
- Max 2 retries per render, same key. Two identical failures mean the prompt
  or the parameters must change; a third attempt is not a fix.
- Never duplicate a running job. On a timeout or a lost response, poll
  `get_generation_status` (or `get_render` with the job id) to rejoin.
- A failing scene is re-rolled once, alone, by `node_id`. Never the whole
  film.
- `stalled` twice: report, do not restart. `needs_browser`: tell the user to
  open the canvas, stop.

## Unattended mode

Applies to cron jobs, long autonomous tasks, and any run where nobody reads
the estimate before it fires.

- The brief carries the cap. Without one, cap at 10 percent of the working
  balance and report the assumption.
- No questions. A missing choice that changes the result is a stop with a
  report, not a guess.
- Skip the run entirely when `fraction_used` is above 0.85 or the cap is
  below the estimate. Report why in one line.
- Use `list_workflows` before creating (it returns every workflow, newest
  first, no filter): an identical name from the same day means a prior run
  may have partly succeeded. Continue it instead of duplicating.
- Report after each render, one line, then stop. A routine the user set up
  with a channel and a cap also posts the reviewed film to that channel
  (lavendly-series, Routines).

## Reporting format

After each render, one line:

```text
[Lavendly] <name>, <duration> s, <scenes> scenes, <credits> credits, <video link>
```

After a refusal, one line:

```text
[Lavendly] skipped <name>: <reason> (<needed> credits needed, <available> available)
```

If the brief names a webhook or a channel for reports, post the same line
there. Apart from a routine's post, nothing else goes out unattended.

## Compatibility

`attach_track` synthesizes from `text` or from `mood` plus `duration` on
servers with the synthesis update. If the server answers `url required`,
synthesis is unavailable there: report that the run needs a hosted voice or
music file from the Lavendly app (Asset Library), found with
`list_assets`, and stop that step. In
attended mode ask the user; in unattended mode report and skip the track.

## When to stop

- `sufficient` false, `insufficient_credits`, `fraction_used` above 0.85.
- Estimate above the cap, or above 30 percent of balance without a yes.
- Two identical failures on the same action.
- A domain skill wants to spend before `estimate_cost` has run.

## UX rules

1. No raw ids or JSON in chat. Credits, names, links.
2. Polling is silent; one line per phase change.
3. Reply in the user's language; keep the report line format fixed.
4. Every paid call is announced in one line before it happens.

## Reference docs

- [references/mcp-calls.md](references/mcp-calls.md): pre-flight calls, estimate shapes, key conventions.
- [references/troubleshooting.md](references/troubleshooting.md): refusal wording and error handling.
