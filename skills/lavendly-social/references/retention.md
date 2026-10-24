# Retention: social

How short-form keeps a viewer from the hook to the payoff, and back to the
start. Numbers marked "claimed" come from creator tooling, not from
Lavendly measurements; treat them as starting points.

## 1. Open loops

An open loop is a question the viewer needs closed. Open one in the first
2 s; close it at the payoff; open the next only after closing one.

| Loop | Opens with | Closes with |
|---|---|---|
| Question | "Why do cats knock things off tables?" | The answer, shown |
| Promise | "The third one surprised me." | The third one |
| Countdown | "Five, ranked." | Number one |
| Story | "And that is when the door locked." | How they got out |
| Mystery object | An unexplained object in frame 0 | What it is for |
| Before state | The mess, the problem | The after |
| Stakes | "If this cracks, I lose the deposit." | It holds, or it cracks |

Hinge lines that close one loop and open the next: "But that's not the
weird part.", "Here's where it gets worse.", "Which brings me to number
two.", "So I tried again."

## 2. Pattern interrupts, with numbers

A pattern interrupt is any change that resets attention: a cut, a new shot
size, a new place, a motion change, a sound hit, a new line of information.

| Platform | Average interval | Changes in 15 s | In 30 s | In 60 s |
|---|---|---|---|---|
| TikTok, Reels, Shorts | 2 to 3 s | 5 to 7 | 10 to 14 | 18 to 25 |
| LinkedIn, X | 3 to 5 s | 3 to 5 | 6 to 10 | 12 to 18 |

- Vary the intervals (2, 3, 1.5, 3, 2.5); an even rhythm reads as a loop.
- Shot size changes every cut; the same camera move never twice in a row.
- On Lavendly every new shot is a paid clip. Cheaper interrupts: a jump cut
  inside one clip (`split_clip` and trim the gap), a speed change on a
  window (`edit_clip` speed 0.5 or 1.5), a native sound hit, a new
  sentence. Use them between new shots.
- Do not interrupt the payoff: it is held still.

## 3. Payoff timing

| Length | Hook | Body | Payoff by | Exit |
|---|---|---|---|---|
| 6 to 10 s | 0 to 2 s | 2 to 6 s | 7 s | 1 s or a loop |
| 15 s | 0 to 2 s | 2 to 11 s | 12 s | 2 s |
| 30 s | 0 to 3 s | 3 to 24 s | 25 s | 3 s |
| 45 s | 0 to 3 s | 3 to 37 s | 38 s | 4 s |
| 60 s | 0 to 3 s | 3 to 50 s | 51 s | 5 s |

- The payoff is static or slow and held at least 1.5 s; a punchline gets
  half a second of silence before it.
- Close a smaller loop at about 40 percent (an early win) so the viewer
  trusts the bigger one will close.
- After the payoff, leave. Every second after it loses viewers.

## 4. Rewatch loops

- Line loop: the last sentence runs into the first ("...and that's why I
  never" / "...trust a hotel kettle."). Write both lines together.
- Picture loop: the last frame matches frame 0 in framing and state; the
  cut back is invisible ([recipe-loops.md](recipe-loops.md)).
- Hard cut ending: end mid-motion on the payoff, no outro; the replay
  starts before the viewer decides to scroll.
- Hidden detail: something in frame 0 that only makes sense after the
  payoff (seen on the second watch). Say nothing about it.

## 5. Comment prompts

- Specific, low effort, opinion or experience: "Which one would you keep?",
  "What did I miss at number four?", "Has this happened to you?"
- Spoken at the very end in under 2 s, or in the post caption only.
- Never bait ("comment YES"), never a fake mistake planted to farm
  corrections, never fake controversy, never a giveaway the user is not
  running.

## 6. The muted test

TikTok and Shorts default to sound on; Reels, LinkedIn and X feeds are
often watched muted. Before spending, read the beat sheet with no sound:

- Does frame 0 alone make someone stop?
- Do the captions (the voice's words) carry the hook and the payoff?
- Is the payoff visible on screen, not only said?

## 7. Retention curve fixes (after posting)

| Curve | Meaning | Fix in the next video |
|---|---|---|
| Cliff in the first 2 s | Hook failed | A stronger frame 0, the voice from 0.0 s, the subject larger |
| Flat, then a drop in the middle | Body sagged | Tighten to 2 to 3 s cuts, add a re-hook at 40 percent |
| Steady decline to the end | No reason to stay | An explicit promise ("number one is the strangest") |
| Drop just before the end | Payoff arrived late or an outro | Move the payoff earlier, cut everything after it |
| Bump near the end | Viewers rewatch | Tighten the loop seam |
| Spike at one moment | That beat works | Open with it next time |

Target, claimed by creator tooling: about 70 percent average view-through
on 15 to 30 s videos.

## 8. Length that holds

- Hook-led facts and memes: 7 to 15 s.
- Lists and how-tos: 20 to 40 s.
- Stories and commentary: 30 to 60 s; clipped long-form moments 25 to 40 s
  (claimed sweet spot for clips: 15 to 55 s, peak 25 to 40 s).
- Over 60 s only when every 10 s adds a new beat.

## 9. Why retention decides reach

Every feed shows a new video to a small audience first and widens it only
when that audience stops, stays and acts: finishes and rewatches on TikTok
and Shorts, sends on Reels, shares on Facebook, replies on X, early upvotes
on Reddit. The hook and the retention rules above win the first test; the
signal each feed rewards wins the next ones
([distribution.md](distribution.md)).
