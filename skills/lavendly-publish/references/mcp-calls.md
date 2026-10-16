# MCP call shapes: publish

Exact arguments and abbreviated responses. Argument names are the live MCP
names. Placeholders are in angle brackets.

## `list_channels`

```json
{}
```

Response:

```json
{
  "connected": true,
  "channels": [
    { "id": "<channel id>", "name": "Lavendly Studio", "platform": "youtube" },
    { "id": "<channel id>", "name": "@lavendly", "platform": "tiktok" }
  ]
}
```

`connected: false` or an empty list: the user connects a channel in
Settings (Connect Postiz). No agent call can do that. Stop and say so.

## `list_renders`

```json
{ "workflow_id": "<id>" }
```

Response: the render jobs for the workflow with `status` and, when `done`,
`result.video_url`. `publish_video` and `schedule_video` use the latest
successful render unless you pass `video_url`. Name the render you will post
("the render from 14:02 today, 16 seconds").

## `list_all_renders`, when the user does not name the workflow

```json
{ "limit": 10 }
```

Cross-workflow render history, newest first. Use it to find "my last video".

## `publish_video`, now

```json
{
  "workflow_id": "<id>",
  "channel_id": "<channel id from list_channels>",
  "title": "Mara crosses the city at dawn",
  "caption": "Three shots, one morning. Market, bridge, station.\n#shortfilm #dawn",
  "idempotency_key": "pub-<workflow id>-<channel id>"
}
```

`title` is required for YouTube and used by TikTok. `video_url` overrides the
media; `settings` carries per-platform overrides merged over safe defaults
(leave it out unless the user asks for something specific and you have
confirmed the field with `get_schema`).

Response: `{ "status": "publishing" | "published", "release_url": "<post link when available>" }`.
AI disclosure for the platform is set server-side.

## `schedule_video`, later

```json
{
  "workflow_id": "<id>",
  "channel_id": "<channel id from list_channels>",
  "when": "2026-10-01T09:00:00+02:00",
  "title": "Mara crosses the city at dawn",
  "caption": "Three shots, one morning. Market, bridge, station.\n#shortfilm #dawn"
}
```

`when` is ISO 8601 with the user's offset and must be in the future.
Response: `{ "status": "scheduled", "scheduled_post_id": "<id>", "when": "<iso>" }`.
Say the local time back in words. There is no `idempotency_key` on this
tool in the catalog: call it once.

## Time formats

| User says (Europe/Berlin, summer) | `when` |
|---|---|
| tomorrow at 9 | `2026-09-27T09:00:00+02:00` |
| Friday 18:30 | `2026-10-02T18:30:00+02:00` |
| in two hours (now 14:05) | `2026-09-26T16:05:00+02:00` |

Ask for the timezone once if it is unknown; keep it for the session. Never
send a bare `Z` time for a user who spoke in local time.

## Confirmation before either call

```text
Ready to publish "Mara crosses the city at dawn" to Lavendly Studio (YouTube).
Caption starts: "Three shots, one morning."
Scheduled for Thursday 1 October at 09:00 (UTC+2).
The platform's AI-generated label will be set automatically.
Posting is public and cannot be undone from here. Post it?
```

Wait for the yes. Anything else is not a yes.

## After the call

One line: "Scheduled to Lavendly Studio for Thursday 1 October, 09:00." or
"Published to @lavendly: <post link>." For `publishing`, say the platform is
processing and where the post will appear.
