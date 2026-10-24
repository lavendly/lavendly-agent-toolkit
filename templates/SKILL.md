---
name: lavendly-<name>
version: <VERSION>
priority: normal
description: |
  <One sentence: what the skill makes on the Lavendly MCP and the decisions it owns.>
  Use when: "<a phrase a user says>", "<another>", "<another>".
  Chain: <which skill runs the process, which it hands to for models, spend, review, posting>.
  NOT for: <what belongs to another skill (name it)>, <what the skill refuses>.
argument-hint: "[<slot>] [<slot>] [<slot: allowed values>]"
---

# Lavendly <Name>

<Two to four sentences: the one idea this kind of film lives on, and what this
skill decides on top of lavendly-director's process.>

## Before anything else

- `get_status` and `get_ledger` once per session. Never claim or deny a
  capability or a model from memory; `get_schema` when unsure.
- Read the brief for these slots: <slot>, <slot>, <slot>. Ask one question
  only when the answer changes the film.
- Every name, product, place and story in this skill and its references is an
  example. The user's brief replaces it; never carry one into their film.

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `get_status`, `get_ledger` | Capabilities and credits |
| 2 | write | <the card or plan this skill adds> ([references/prompt-anchors.md](references/prompt-anchors.md)) |
| 3 | show | The plan and the estimate range; wait for "go" |
| 4 | `estimate_cost` | Announce: shots, model, total, balance after; wait for yes |
| 5 | `generate_scene` | Scene by scene with `max_credits` |
| 6 | `quality_check` | Each scene and each cut |
| 7 | `create_render`, `get_render` | Free |
| 8 | deliver | Link, length, what the user adds in the app |

## Decision rules

<Rule first, then the labelled example. For instance:>

- <The rule, stated positively.> Example: "<a concrete case in camera, light
  and material words, with a name used in no other skill>".

## Compatibility

`attach_track` synthesizes the voiceover from `text` and the music from
`mood` plus `duration`; on a `url required` answer, upload to the Asset
Library and attach by `url`. (Keep this section only if the skill attaches
audio.)

## When to stop

- <The stop condition, and what the agent says to the user.>

## UX rules

- Speak in the user's language. Names and links, never ids.

## Reference docs

- [references/mcp-calls.md](references/mcp-calls.md): exact call shapes, with
  example values the user's film replaces.
- [references/prompt-anchors.md](references/prompt-anchors.md): the slot
  templates first, then one worked example, and the banned words.
