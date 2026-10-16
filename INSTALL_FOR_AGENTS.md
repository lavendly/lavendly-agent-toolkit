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
npx skills add lavendly/lavendly-agent-toolkit
```

```bash
npx -y @lavendly/agent-toolkit install --dir <skills path>
```

Confirm that six folders exist, each with a `SKILL.md`:
`lavendly-director`, `lavendly-storyteller`, `lavendly-multi-clip`, `lavendly-cost-aware`,
`lavendly-review`, `lavendly-publish`.

## Step 2: connect the MCP

If the user installed the toolkit as a plugin (Claude Code, Cursor, Codex),
the `lavendly` MCP server is already registered: ask the user to sign in
when the host prompts (in Claude Code, `/mcp`, then `lavendly`). Skip to the
next step.

Otherwise, register the hosted server. For a person at the keyboard, the
host's OAuth sign-in is enough:

```bash
claude mcp add --transport http lavendly https://mcp.lavendly.ai/mcp
```

For an unattended run, ask the user for a Lavendly API key from
**Dashboard > Settings > API keys**. Do not paste the key into chat and do
not store it in any skill file:

```bash
claude mcp add --transport http lavendly https://mcp.lavendly.ai/mcp \
  --header "Authorization: Bearer <key>"
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
