# Contributing to Lavendly Skills

Every skill is one folder with a `SKILL.md` and an optional `references/`
directory, per the [Agent Skills specification](https://agentskills.io/specification.md).
Read [CLAUDE.md](./CLAUDE.md) first: it holds the style rules and the
300-line rule that reviews enforce.

## Workflow

All changes go through pull requests. No direct pushes to `main`.

```bash
git checkout main && git pull
git checkout -b <type>/<short-description>
# edit
node scripts/validate.mjs
git add -A
git commit -m "<type>(<scope>): <summary>"
git push -u origin <branch>
gh pr create
```

## Branch naming

| Prefix | Use for |
|---|---|
| `feat/` | A new skill, a new decision rule, a new reference doc |
| `fix/` | A wrong call shape, a broken link, a rule that misfires |
| `refactor/` | Moving text between `SKILL.md` and `references/` with no behaviour change |
| `docs/` | README, INSTALL, COOKBOOK, CONTRIBUTING |
| `release/` | The version bump commit |

## Commit style

Conventional Commits, so release tooling can read the history:

- `feat(multi-clip): add motion-at-the-seam rule`
- `fix(publish): title is required for YouTube, say so before confirming`
- `docs: add the scheduled YouTube recipe`
- `refactor(storyteller): move voice table to references`

The body says why, not only what. No em dashes or en dashes in commit
messages either.

## PR checklist

1. `node scripts/validate.mjs` prints no failures.
2. Frontmatter: `name` equals the folder, `version` equals `VERSION`,
   `description` contains `Use when:`, `Chain:` and `NOT for:`.
3. `SKILL.md` is under 300 lines. Moved text lands in `references/` and is
   linked from `SKILL.md`.
4. No `../` paths. Each skill installs on its own.
5. Every tool name and argument in the change exists in the live Lavendly MCP
   catalog. New field names are added to the allowlist in
   `scripts/validate.mjs` with a source comment.
6. No em dashes, en dashes or ` -- ` dashes anywhere. No exclamation marks,
   emojis or hype words in prose.
7. Product laws are unchanged or stricter: estimate before spend, render is
   free, one score per film, anchors pasted verbatim, publish only after an
   explicit yes, never mint a new idempotency key to retry. Loosening any of
   these needs a reason in the PR description and a scenario in `evals/`.
8. A behaviour change comes with a scenario in `evals/scenarios.md`.
9. If a skill was added or renamed: `.claude-plugin/marketplace.json`, the
   README tables and `INSTALL.md` are updated.
10. `CHANGELOG.md` has a line under the unreleased heading.

## Validation

`scripts/validate.mjs` needs Node 18 or newer and no dependencies. It checks
frontmatter, version sync across `VERSION`, the four manifests and
`package.json`, reference links and orphans, the 300-line limit, the dash
scan, the snake_case token scan and the marketplace paths. CI runs the same
script on every push and pull request.

## Adding a skill

Follow "Adding a skill" in [CLAUDE.md](./CLAUDE.md). The frontmatter shape:

```yaml
---
name: lavendly-<name>
version: 0.1.0
priority: normal
description: |
  <One paragraph: what the skill produces and which tools it drives.>
  Use when: "<trigger>", "<trigger>".
  Chain: <which skill runs before or after, and when>.
  NOT for: <case> (use <skill>), <case> (use <skill>).
argument-hint: "[primary input] [option]"
---
```

## License

By contributing you agree that your contribution is licensed under MIT.
