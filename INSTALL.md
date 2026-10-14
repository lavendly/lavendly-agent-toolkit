# Install Lavendly Skills

Five skills ship in this repo:

- `lavendly-director`: direct a 15 to 90 s film with a locked hero, chosen camera and light, sound design and a cut
- `lavendly-storyteller`: a narrated short (5 to 12 s, one shot) from a one-line idea
- `lavendly-multi-clip`: 2 to 6 shots with character and palette anchors and one score
- `lavendly-cost-aware`: budget guardrails, loaded for unattended or budgeted runs
- `lavendly-review`: the quality loop before any render or post
- `lavendly-publish`: posting and scheduling to connected channels

They compose: `cost-aware` overrides every spend decision, `review` runs after
generation, `publish` runs only after a successful render and an explicit yes.

## Prerequisites

1. A Lavendly account and an API key from **Dashboard > Settings > API keys**.
2. The Lavendly MCP registered in your agent. Hosted endpoint:
   `https://mcp.lavendly.ai/mcp` with header `Authorization: Bearer <key>`.
   Local alternative: `npx -y @lavendly/mcp` with `LAVENDLY_API_KEY` in the
   environment. Per-agent instructions: https://docs.lavendly.ai/mcp/overview
3. Node.js 18 or newer for the `npx` methods.

The skills contain no secrets and never read your key. The key belongs to the
MCP client configuration only.

## Option 1: `npx skills`

Cross-agent. Detects Claude Code, Cursor, Codex and other hosts that load
`SKILL.md` folders, and writes each skill to the right path.

```bash
npx skills add lavendly/skills
```

## Option 2: `gh skill install`

GitHub CLI v2.90 or newer:

```bash
gh skill install lavendly/skills
```

## Option 3: Claude Code marketplace

Claude Code only. Inside Claude Code:

```
/plugin marketplace add lavendly/skills
/plugin install lavendly@lavendly
```

This reads `.claude-plugin/marketplace.json` and registers the five skills as
`/lavendly:storyteller`, `/lavendly:multi-clip`, `/lavendly:cost-aware`,
`/lavendly:review` and `/lavendly:publish`.

## Option 4: `@lavendly/skills` installer

Zero-dependency Node script. Copies each skill folder into `~/.claude/skills/`.

```bash
npx -y @lavendly/skills install                 # all five
npx -y @lavendly/skills install storyteller      # one or more, by short name
npx -y @lavendly/skills install --dir ./.cursor/skills   # another target
npx -y @lavendly/skills --list                  # what is available
```

Re-running replaces an existing copy of the same skill, so this is also the
update path.

## Verify

In your agent, ask:

> Check the Lavendly status and tell me whether voice and music are configured.

The agent should call `get_status` and answer in one or two lines without
spending credits. Then try:

> Make a 5 second clip of a barista pulling an espresso shot at dawn. Narrate it.

The agent should show the estimate and wait for your approval before it
generates anything.

## Updating

| Method | Update |
|---|---|
| `npx skills` | re-run `npx skills add lavendly/skills` |
| `gh skill install` | `gh skill update lavendly/skills` |
| Claude Code marketplace | `/plugin update lavendly@lavendly` |
| `@lavendly/skills` | re-run `npx -y @lavendly/skills install` |
