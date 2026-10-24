---
name: lavendly-publish
version: 0.2.0
priority: normal
description: |
  Post or schedule a rendered Lavendly film to a connected channel through the Lavendly MCP: list channels, pick one, write a platform-fit title and caption, note that AI disclosure is automatic, confirm channel, title and time in one message, then publish_video or schedule_video with an ISO 8601 time in the user's timezone. Nothing posts without an explicit yes.
  Use when: "post this", "publish to YouTube", "schedule for tomorrow at 9", "put it on TikTok", "share it on my channel", or after a render when the user asks what happens next.
  Chain: only after lavendly-review has passed the rendered film (or the user accepted flagged scenes in so many words); lavendly-storyteller and lavendly-multi-clip produce the film; lavendly-cost-aware does not gate publishing (it is free) but its idempotency rules apply.
  NOT for: generating or rendering (domain skills), connecting a channel (the user does that in Settings), cancelling or editing a post after it went out, or posting anything the user has not confirmed.
argument-hint: "[workflow name] [channel] [now | ISO time] [title] [caption]"
---

# Lavendly Publish

Publishing posts publicly. It cannot be pulled back from here. Everything in
this skill exists to make the confirmation before the call exact and the call
itself boring.

## Before anything else

- `get_status` was called this session. Never claim or deny a capability
  from memory.
- A successful render exists: `list_renders` shows a `done` job with a video
  link, or the user gave a `video_url`. No render, no post.
- The film passed lavendly-review, or the user accepted flagged scenes in so
  many words. Say which.
- Every name, product, place and story in this skill and its references is an
  example. The user's brief replaces it; never carry one into their film.

## Sequence

| Step | Call | Purpose |
|---|---|---|
| 1 | `list_channels` | `channels[{id, name, platform}]` and `connected` |
| 2 | check | `connected` false: the user must connect a channel in Settings (Connect Postiz). You cannot do it. Stop |
| 3 | `list_renders` | Confirm a `done` render and which one will post (the latest by default) |
| 4 | write | Title (required for YouTube and Reddit), the community for Reddit, caption, and for a schedule the ISO 8601 time in the user's timezone |
| 5 | confirm | One message: channel and platform, title, first line of the caption, now or the exact local time with offset, the AI-disclosure note, the "cannot be undone" note. Wait for a yes |
| 6a | `publish_video` | `workflow_id`, `channel_id`, `title`, `caption`, `idempotency_key`; `subreddit` for Reddit |
| 6b | `schedule_video` | `workflow_id`, `channel_id`, `when`, `title`, `caption`; `subreddit` for Reddit |
| 7 | report | Status (`publishing`, `published`, `scheduled`), the post link when returned (`release_url`), the local time for a schedule |

Exact JSON: [references/mcp-calls.md](references/mcp-calls.md).

## Decision rules

### Channels

- Use the channel the user named. Two channels on the same platform: ask
  which, by name. Never pick silently.
- `connected` false or an empty list: say "no channel is connected; connect
  one in Settings, then tell me" and stop. Do not retry in a loop.
- Cross-posting to several channels is several confirmations, or one
  confirmation that lists every channel by name.

### Titles and captions

| Platform | Title | Caption |
|---|---|---|
| YouTube | required, 100 characters or fewer, plain, no clickbait, no all caps | description: what the film shows, one line; hashtags at most three |
| TikTok | used when given, keep it short | the caption carries the post; hashtags at most three; no "link in bio" unless the user has one |
| Instagram | not used | first line is the hook; plain sentences; hashtags at the end |
| Reddit | required, 300 characters or fewer, written like a person posting, not an ad | the post text under the video; no hashtags. `subreddit` is the community the user names (r/name); never pick one for them. Communities that ban video or require a flair reject the post |
| X | not used | one sentence and the point; under 200 characters |

- Present tense, concrete, in the user's language. No exclamation marks, no
  emojis unless the user's own channel style uses them and they ask.
- Never claim the film is real footage. Never invent product claims,
  prices, or dates that are not in the brief.

### AI disclosure

Lavendly sets the platform's AI-disclosure flag automatically where the
platform has one (TikTok, YouTube). Say this in the confirmation so the user
is not surprised by a label on the post. Do not offer to turn it off.

### Time

- `schedule_video` takes `when` as ISO 8601 and it must be in the future.
  Write it with the user's timezone offset, for example
  `2026-10-01T09:00:00+02:00`, and say the local time back in words.
- "Tomorrow at 9" is ambiguous only when the timezone is unknown. Ask once,
  then keep it for the session.
- A time in the past, or under five minutes away, is a question, not a call.

### Confirmation wording

Use this shape, filled in, before every publish or schedule:

```text
Ready to publish "<title>" to <channel name> (<platform>).
Caption starts: "<first line>".
<Now | Scheduled for <weekday> <date> at <local time> (<offset>)>.
The platform's AI-generated label will be set automatically.
Posting is public and cannot be undone from here. Post it?
```

Only "yes", "post it", "go", or an equivalent in the user's language counts.
A question, a correction, or silence is not a yes.

### Idempotency

- `publish_video` takes an `idempotency_key`: mint it once per post
  (`pub-<workflow>-<channel>`) and reuse it on any retry. Never a new key.
- `schedule_video` has no key in the catalog: call it once. On a timeout,
  ask the user to check the scheduled posts in the Lavendly app before you
  call again. A double schedule is two posts.

## What cannot be undone

- A published post is live on the platform. There is no MCP tool to delete
  it. The user removes it on the platform.
- There is no MCP tool to cancel or edit a scheduled post. Say so before
  scheduling; the user manages it in the Lavendly app.
- Say both in the confirmation, once, without drama.

## When to stop

- `connected` false, or the named channel is not in the list.
- No `done` render for the workflow.
- The film has an unreviewed or FAILED scene the user has not accepted.
- The user did not say yes, or changed anything after the confirmation
  (re-confirm).
- A YouTube post without a title.
- `when` is in the past or the timezone is unknown.

## UX rules

1. No raw ids or JSON in chat. Channel names, titles, links, local times.
2. Reply in the user's language; write the caption in the language of the
   channel's audience if the user says it differs.
3. One question at a time: channel, then time, then title. Skip what the
   brief already answered.
4. Report the result in one line with the post link when the platform
   returns one; otherwise the status and where to find it.
5. Never post, schedule, or "test post" without the explicit yes. A routine
   the user set up with a channel and a credit cap is that yes, for that
   channel only.
6. The render result cannot confirm burned captions: say "captions
   requested" and ask the user to check before posting. When describing
   checks, name the frames that were opened (first, mid, last), never
   "checked frame by frame".

## Reference docs

- [references/mcp-calls.md](references/mcp-calls.md): channels, renders, publish, schedule, responses.
- [references/troubleshooting.md](references/troubleshooting.md): `connected` false, missing title, past time, timeouts, platform rejections.
