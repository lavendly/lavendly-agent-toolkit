# Install the Lavendly Agent Toolkit

The toolkit is two things an agent needs together:

- **The Lavendly MCP** at `https://mcp.lavendly.ai/mcp`: the tools.
- **Six skills** in `skills/`: how to use the tools well.

| Skill | What it does |
|---|---|
| `lavendly-director` | Direct a 15 to 90 s video: intent, hero lock, shot plan, sound, the cut, checks |
| `lavendly-storyteller` | A narrated short (5 to 12 s, one shot) from a one-line idea |
| `lavendly-multi-clip` | 2 to 6 shots with character and palette anchors and one score |
| `lavendly-cost-aware` | Budget guardrails, loaded for unattended or budgeted runs |
| `lavendly-review` | The quality loop: each scene, each cut, the whole video |
| `lavendly-publish` | Posting and scheduling to connected channels |

Sign-in: the hosted MCP signs you in with your Lavendly account the first
time a tool is used (OAuth). No key to paste. For unattended runs, see
[Unattended runs](#unattended-runs).

## Hosts with plugins: one install

These hosts install the skills and register the MCP in one step.

| Host | Install | Then |
|---|---|---|
| Claude Code | `/plugin marketplace add lavendly/lavendly-agent-toolkit`, then `/plugin install lavendly@lavendly` | `/mcp`, pick `lavendly`, sign in |
| Codex | `codex plugin marketplace add lavendly/lavendly-agent-toolkit`, then `codex plugin add lavendly@lavendly` | sign in when Codex asks |
| Gemini CLI | `gemini extensions install https://github.com/lavendly/lavendly-agent-toolkit` | `/mcp auth lavendly` |
| Cursor | **Customize**, add this repository as a plugin (team marketplace or a local clone), install | sign in when Cursor asks |
| Any Agent Plugins host | point it at this repository; it reads `plugin.json`, `skills/` and `mcp.json` | sign in when the host asks |

Skills are invoked by name: in Claude Code `/lavendly:lavendly-director`; in
other hosts the agent picks them from their descriptions, or you name them.

Files each host reads:

| Host | Manifest | MCP | Skills |
|---|---|---|---|
| Claude Code | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | `.mcp.json` | `skills/` |
| Codex | `.codex-plugin/plugin.json`, `.agents/plugins/marketplace.json` | `.mcp.json` | `skills/` |
| Gemini CLI | `gemini-extension.json` | `gemini-extension.json` | `skills/` |
| Cursor | `.cursor-plugin/plugin.json` | `mcp.json` | `skills/` |
| Agent Plugins | `plugin.json` | `mcp.json` | `skills/` |

## Other hosts: skills, then the MCP

### 1. The skills

Cross-agent installer. It detects Amp, VS Code with Copilot, Windsurf,
OpenCode, Cline and the hosts above, and writes each skill where that host
looks:

```bash
npx skills add lavendly/lavendly-agent-toolkit
```

Other ways:

```bash
gh skill install lavendly/lavendly-agent-toolkit          # GitHub CLI 2.90+
amp skill add lavendly/lavendly-agent-toolkit --global    # Amp
npx -y @lavendly/agent-toolkit install --dir <skills dir> # any folder
npx -y @lavendly/agent-toolkit --list                     # what is available
```

### 2. The MCP

| Host | Add the server |
|---|---|
| Amp | `amp mcp add lavendly https://mcp.lavendly.ai/mcp` |
| VS Code (Copilot agent mode) | `.vscode/mcp.json`: `{ "servers": { "lavendly": { "type": "http", "url": "https://mcp.lavendly.ai/mcp" } } }` |
| Windsurf | `~/.codeium/windsurf/mcp_config.json`: `{ "mcpServers": { "lavendly": { "serverUrl": "https://mcp.lavendly.ai/mcp" } } }` |
| OpenCode | `opencode.json`: `{ "mcp": { "lavendly": { "type": "remote", "url": "https://mcp.lavendly.ai/mcp", "enabled": true } } }` |
| Claude Code without the plugin | `claude mcp add --transport http lavendly https://mcp.lavendly.ai/mcp` |
| Anything else | a remote (streamable HTTP) MCP server at `https://mcp.lavendly.ai/mcp`; per-agent notes at https://docs.lavendly.ai/mcp/overview |

Sign in when the host asks. A host without OAuth support needs the API key
form below.

## Unattended runs

OAuth needs a person at a browser. For cron jobs, CI or a headless agent,
create an API key in **Dashboard > Settings > API keys** and send it as a
header. Keep it in the host's MCP config or a secret store, never in a skill
file or a chat.

```bash
claude mcp add --transport http lavendly https://mcp.lavendly.ai/mcp \
  --header "Authorization: Bearer <key>"
amp mcp add lavendly --header "Authorization=Bearer <key>" https://mcp.lavendly.ai/mcp
```

Hosts without a header option can run the local server instead:
`npx -y @lavendly/mcp` with `LAVENDLY_API_KEY` in its environment.

Load `lavendly-cost-aware` for any run nobody watches.

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
| Claude Code | `/plugin update lavendly@lavendly` |
| Codex | `codex plugin marketplace upgrade`, then reinstall the plugin |
| Gemini CLI | `gemini extensions update lavendly` |
| `npx skills` | re-run `npx skills add lavendly/lavendly-agent-toolkit` |
| `gh skill install` | `gh skill update lavendly/lavendly-agent-toolkit` |
| `@lavendly/agent-toolkit` | re-run `npx -y @lavendly/agent-toolkit install` (replaces existing copies) |
