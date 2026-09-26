# Lavendly Skills: Cookbook

Three recipes. Each one is what you say, what the agent does, and where the
money goes. Tool names are the live MCP names; everything the agent says to
you comes back as names and links, never ids.

---

## Recipe 1: a narrated short from one line

**Skill:** `lavendly-storyteller` (plus `lavendly-cost-aware` if you want the
agent to refuse over a cap).

**What you say:**

```
Make a 6 second clip of a lighthouse keeper lighting the lamp at dusk.
Narrate it quietly. Vertical.
```

**What the agent does:**

1. `get_status`, `get_ledger`. Reports in one line: "Voice and music ready,
   140 credits available."
2. Writes the script inside the budget (6 s, 13 to 14 words): "He climbs the
   last step as the sea goes dark. The lamp takes, and turns."
3. Writes the shot prompt: subject, setting, light, one camera move, action
   last. No banned words.
4. `create_workflow` with one shot of 6 s.
5. `attach_track` voiceover with the script (synthesis first, hosted file if
   the server says `url required`), `attach_track` music with a one-line arc
   and `ducking: true` at 0.38, `update_track` captions to `pop`,
   `set_clip_native_audio` to `off`.
6. `estimate_cost`. Says: "One scene, <model>, 12 credits of 140. Go ahead?"
   Waits.
7. `generate_scene`, then polls `get_generation_status` silently; you hear
   "generating clip" and "done", nothing in between.
8. `quality_check` on the scene. Passed at 8.2. `get_scene_frame`: you get a
   thumbnail link.
9. `create_render` (free), polls `get_render`, delivers the link: "6 s, alloy,
   the lamp turning on at dusk."

**Where the money goes:** the single `generate_scene` call. Everything else
is free.

**Tips:**

- Ask for a voice by name (alloy, echo, fable, onyx, nova, shimmer) if you
  care; otherwise you get alloy and the agent tells you.
- "No captions" turns them off. "Landscape" switches the caption style to
  minimal.
- Anything over 12 s becomes a multi-clip proposal, not a stretched shot.

---

## Recipe 2: a three-shot consistent sequence

**Skill:** `lavendly-multi-clip`, then `lavendly-review`.

**What you say:**

```
Three shots of the same woman: she leaves a market at dawn, crosses an iron
bridge reading a letter, and stops under a station clock. Quiet narration,
one piece of music.
```

**What the agent does:**

1. Probes, then writes two anchors and shows them:

   ```
   Character: Mara, late twenties, slight and quick, a rust-red waxed cotton
   coat over a grey wool sweater, black hair cut at the jaw, a brass compass
   on a cord around her neck.
   Palette: low dawn sun from the east with long shadows, cool shade and warm
   highlights, muted teal and copper grade.
   Go?
   ```

   This is your cheap moment: "make the coat green" costs nothing now and a
   full re-roll later.

2. On "go": three prompts, each starting with both anchors byte for byte,
   then one camera move, then the beat. Three narration lines that hand off
   to each other (about 35 words for 16 s).
3. `create_workflow` with three shots (5, 5, 6 s).
4. `attach_track` voiceover on the first clip with the whole script;
   `attach_track` music once, on the first clip, `duration: 16`, ducking on,
   volume 0.36. `set_clip_native_audio` off on all three clips.
5. `get_workflow_audio` to confirm one music track. `estimate_cost`: "Three
   scenes, <model>, 36 credits of 140. Go ahead?"
6. `generate_scene` for the whole film. You hear each scene land: "market",
   "bridge", "station".
7. `lavendly-review` takes over: `quality_check` on each scene. The bridge
   fails on hands. The agent says: "Scene 2 (bridge) failed: left hand has
   extra fingers. One re-roll, 12 credits. Go ahead?" On yes it appends the
   server's `reroll_hint` to that scene's prompt, regenerates only that
   scene, checks again: passed.
8. `get_scene_frame` on all three, then the contact sheet:

   ```
   Scene       Duration  Score  Status            Frame
   1 Market    5 s       8.4    passed            <link>
   2 Bridge    5 s       7.0    passed (re-roll)  <link>
   3 Station   6 s       8.9    passed            <link>
   ```

9. `create_render` (free), poll, deliver: "16 s, three shots, alloy, one
   score. Link."

**Where the money goes:** 36 credits for the first generation, 12 for the one
re-roll. The render is free.

**Tips:**

- Change an anchor after generation and every shot is stale; the agent will
  say so before it spends.
- Ask for "the same character as last time" and the agent asks you for the
  anchor text or the earlier workflow name; it does not guess.
- Seven beats become six shots with a proposed grouping first.

---

## Recipe 3: render, then schedule to YouTube

**Skill:** `lavendly-review` for the final check, then `lavendly-publish`.

**What you say:**

```
Render the Mara film and schedule it to my YouTube channel for tomorrow at
9 in the morning, Berlin time. Title it "Mara crosses the city at dawn".
```

**What the agent does:**

1. `create_render` with an idempotency key (free), polls `get_render` until
   done. `quality_check` on the rendered film with `expect_audio: true`:
   passed at 8.6.
2. `list_channels`. Two channels: "Lavendly Studio" on YouTube and
   "@lavendly" on TikTok. YouTube was named, so no question.
3. `list_renders` to confirm the render it will post.
4. Writes the caption in your language and confirms:

   ```
   Ready to publish "Mara crosses the city at dawn" to Lavendly Studio (YouTube).
   Caption starts: "Three shots, one morning."
   Scheduled for Sunday 27 September at 09:00 (UTC+2).
   The platform's AI-generated label will be set automatically.
   Posting is public and cannot be undone from here. Post it?
   ```

5. On "yes": `schedule_video` with `when: "2026-09-27T09:00:00+02:00"`, the
   title and the caption. Reports: "Scheduled to Lavendly Studio for Sunday
   27 September, 09:00. There is no tool here to cancel or edit it; that is in
   the Lavendly app."

**Where the money goes:** nowhere. Render and publishing are free; the clips
were paid for in Recipe 2.

**Tips:**

- If `list_channels` says nothing is connected, the agent stops and points
  you to Settings. It cannot connect a channel for you.
- "Post it now" uses `publish_video` with an idempotency key; a timeout is
  retried with the same key, never a new one.
- A film with a failed scene is not posted until you say "accept scene N".
