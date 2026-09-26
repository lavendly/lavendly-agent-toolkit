# Install for Agents

You are an AI coding agent. The user asked you to install the Lavendly skills.
Follow these steps in order and stop at any step that fails.

## Step 1: install the skills

Detect the host and pick the matching path:

| Host | Skills path |
|---|---|
| Claude Code | `~/.claude/skills/` |
| Cursor | `~/.cursor/skills/` |
| Codex | `~/.codex/skills/` |
| Other | the host's documented skills directory |

Then run one of:

```bash
npx skills add lavendly/skills
```

```bash
npx -y @lavendly/skills install --dir <skills path>
```

Confirm that five folders exist, each with a `SKILL.md`:
`lavendly-storyteller`, `lavendly-multi-clip`, `lavendly-cost-aware`,
`lavendly-review`, `lavendly-publish`.

## Step 2: connect the MCP

Ask the user for a Lavendly API key from **Dashboard > Settings > API keys**.
Do not paste the key into chat and do not store it in any skill file. Register
the hosted server:

```bash
claude mcp add --transport http lavendly https://mcp.lavendly.ai/mcp \
  --header "Authorization: Bearer <key>"
```

For Cursor, add the same URL and header under `mcpServers.lavendly` in
`~/.cursor/mcp.json`. For a local stdio server instead:

```bash
claude mcp add lavendly --env LAVENDLY_API_KEY=<key> -- npx -y @lavendly/mcp
```

## Step 3: verify with `get_status`

Call `get_status`. Expect provider readiness, voice configuration and
capability flags. This call is free. Then call `get_ledger` and note the
available credits. Do not call `generate_scene` or `create_render` during
verification.

If `get_status` fails with an authentication error, the key is wrong or
missing: ask the user to check it. If the tool is not listed at all, the MCP is
not registered: repeat Step 2.

## Step 4: report

Tell the user in two lines: the skills are installed, the MCP is connected,
and how many credits are available. Offer three starter prompts:

- "Make a 5 second narrated clip of ..."
- "Three shots of the same character: ..., ..., ..."
- "Check the quality of my last workflow and render it."

Do not explain file paths or internals unless asked.
