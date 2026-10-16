# Troubleshooting: publish

Situations and error strings around posting, and what to do.

## `connected: false` or no channels

No social channel is connected to this Lavendly account. Say: "No channel is
connected yet. Connect one in Settings (Connect Postiz) and tell me when it
is there." Stop. Do not poll `list_channels` in a loop.

## The named channel is not in the list

Show the channels by name and platform, ask which one. Never pick.

## No `done` render

`list_renders` shows none, or only `failed`. Publishing needs a rendered
film. Hand back to the domain skill or lavendly-review; do not pass a
`video_url` you have not seen come from a render.

## YouTube without a title

`publish_video` needs `title` for YouTube. Propose one (100 characters or
fewer, plain) in the confirmation message; do not call until the user has
seen it.

## `when` in the past or under five minutes away

The server rejects a past time; a near-future time gives the user no chance
to change their mind. Ask for a new time. Say the current time in their zone
so the fix is easy.

## Timezone unknown

Ask once: "Which timezone should I use for 9 am?" Keep the answer for the
session. Never assume UTC for a user who spoke in local time.

## Timeout or lost response on `publish_video`

The post may have gone out. Do not call again with a new key. Retry with the
identical `idempotency_key`; the server returns the same response for 5
minutes. If more than 5 minutes passed, ask the user to check the channel
before any retry.

## Timeout on `schedule_video`

There is no idempotency key on this tool. Do not call it again blind. Ask the
user to check scheduled posts in the Lavendly app; call again only if nothing
is there.

## The platform rejects the post

The error message names the platform reason (too long, unsupported aspect,
policy). Quote it in plain words, propose the smallest change (shorten the
caption, re-render at the platform's aspect through the domain skill), and
re-confirm before any new call.

## `status: publishing` for a long time

The platform is processing. Say so, give the channel name, and stop. Do not
publish again.

## The user asks to delete or edit the post

There is no MCP tool for that. Point to the platform (published) or the
Lavendly app (scheduled). Do not pretend.

## The user asks to skip the AI label

It is set automatically by the platform's rules through Lavendly. Say so
once; do not look for a flag to disable it.

## The user asks to post a film that failed review

Show the contact sheet row and ask for the words "accept scene <n>". Without
them, do not post. With them, note the acceptance in the report line.
