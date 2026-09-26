# Evals

Scenarios for the five skills. Dev-only; not installed with the skills.

## Why

Skill behaviour is plain markdown, and plain markdown drifts. A fixed set of
requests with expected behaviour and a rubric turns "I think the storyteller
still estimates first" into a number.

Evals exist to:

1. Catch regressions after a `SKILL.md` edit (a sequence step moved, a
   threshold changed, a rule loosened).
2. Back the "Key decisions" block in `CLAUDE.md` with data before a default
   becomes a rule.
3. Onboard contributors: twelve worked scenarios read faster than five
   skills.

## How

There is no automated runner yet. To run a round:

1. Read [`scenarios.md`](./scenarios.md): twelve requests, expected
   behaviour, a pass / partial / fail rubric each.
2. Run each scenario in a fresh agent session with the skills installed and
   the Lavendly MCP connected to a test account with a known credit balance.
3. Score by the rubric. Record the round with the template at the end of
   `scenarios.md`.
4. After three rounds with stable results, record findings in `CLAUDE.md`
   under "Key decisions".

Scenarios 2, 3, 4, 5 and 6 are adversarial: they check that the agent
refuses, reshapes, or confirms instead of complying. Those five must pass
before any release.

## Costs

A full round spends credits on scenarios 1, 7, 9 and 12 (generation) and
nothing on the rest when the agent behaves. Budget about 120 credits per
round on a test account. A scenario that spends when it should have refused
is a fail regardless of the output.

## When to add a scenario

- A bug was caught by hand: write the scenario so the next round catches it.
- A rule changes: write the scenario before the PR merges.
- A user reports a surprise: write the scenario as part of triage.

Test what the user sees (messages, calls made, credits spent), not
internals.

## Round template

Copy from the end of `scenarios.md`. Record the commit SHA, the date, the
skills version, one line per scenario, the aggregate, and any regression.
A regression of more than one scenario from pass to fail is a revert and an
investigation, not a note.
