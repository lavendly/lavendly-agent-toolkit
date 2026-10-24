# Recipe: reaction-free commentary

An opinion, an analysis or a take on a topic, trend or news, told with
original pictures instead of someone else's footage. Worked example: "Why
every new café looks the same" (a design take). The user's own topic replaces it.

## 1. Purpose, audience, ending

- Purpose: one clear argument, with reasons the viewer can check, in a
  voice the viewer comes back for.
- Audience: people who follow a point of view; they comment to agree or
  push back.
- The ending restates the take in one line and hands the viewer one
  question; not "smash that like button".

## 2. Format rules

- No reaction footage: never other creators' videos, clips, screenshots of
  posts, thumbnails or their faces. Lavendly has no screen capture anyway;
  the pictures are generated illustrations, the user's own footage, or
  objects and places that stand for the point.
- Facts versus opinion: say which is which ("The numbers say ...", "I
  think ..."). Facts come from the user's sources and are attributed.
- Talk about ideas, products and public trends, not private people. No
  mockery of individuals; no claims about a real person's character or
  conduct.
- A presenter is optional: routes from recipe-talking-head.md (spoken lines
  on camera, or a silent presenter with the voice). Most commentary works as
  voice over generated b-roll.

## 3. Argument shape (beat menu)

| Beat | Share | Job |
|---|---|---|
| Take | 0 to 3 s | The claim, bluntly |
| Evidence 1 | 20 percent | The first reason, with a picture that shows it |
| Evidence 2 | 20 percent | The second reason |
| Counterpoint | 15 percent | The best objection, stated fairly |
| Answer | 15 percent | Why the take survives it |
| So what | 15 percent | What it means for the viewer |
| Question | last 2 s | One question to the viewer |

## 4. Structures (9:16, Veo 3.1 Fast)

### 6 s

| # | Time | Shot | Lens | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|---|
| 1 | 0 to 6 | Medium wide | 35mm | Slow truck right | Three café counters in a row: identical pale wood, white tiles, one hanging plant each | 8, trim 6 | 13 ("Every new café looks the same. Pale wood, white tiles, one plant.") |

### 15 s

| # | Time | Shot | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | Medium | Locked | A pale wood counter, white tiles, a plant | 4, trim 3 | 6 take |
| 2 | 3 to 7 | Close-up | Truck right | Identical white subway tiles, then the same tiles in another room (match cut) | 4 | 10 reason |
| 3 | 7 to 11 | Medium | Locked | A phone held up photographing a latte from above (screen hidden) | 4 | 10 why: built for photos |
| 4 | 11 to 15 | Medium wide | Slow push-in | An old café with mismatched chairs and worn green paint | 4 | 9 so what, question |

### 30 s

| # | Time | Shot | Move | Picture | Gen | Words |
|---|---|---|---|---|---|---|
| 1 | 0 to 3 | Medium | Locked | The identical counter | 4, trim 3 | 6 take |
| 2 | 3 to 7 | Close-up | Truck right | Tiles, match cut to the same tiles | 4 | 10 evidence 1 |
| 3 | 7 to 11 | Insert | Locked | Pale wood, a hanging plant, an Edison bulb | 4 | 10 evidence 1 |
| 4 | 11 to 15 | Medium | Locked | A phone photographing a latte from above | 4 | 10 evidence 2 |
| 5 | 15 to 19 | Wide | Slow pan left | A row of identical shopfronts with blank signs | 4 | 10 counterpoint (it is cheap and it works) |
| 6 | 19 to 23 | Close-up | Locked | A worn green chair, scratched table | 4 | 10 answer |
| 7 | 23 to 27 | Medium wide | Slow push-in | The old café, warm and busy, figures at distance | 4 | 9 so what |
| 8 | 27 to 30 | Close-up | Locked | A chipped mismatched cup set down | 4, trim 3 | 7 question |

### 60 s

The 30 s shape with each evidence beat as two shots, a second
counterpoint, and either a presenter (route A spoken takes for the take
and the question) or a held moment (8 s, the old café). About 140 words.

## 5. Hook and payoff

- Hook: the take in its bluntest form, over the picture that proves the
  first half of it.
- Payoff: the "so what" over a picture that shows the alternative, and a
  question that invites disagreement on the substance.

## 6. Camera, light, colour

- Style line by topic: "Clean vertical b-roll, soft natural light" for
  places and objects; "Handmade paper diorama" for politics-adjacent or
  abstract takes.
- Match cuts make comparison arguments: matched framing across two places
  (the same tiles, the same counter height).
- Light: "soft daylight through a shop window" for the new cafés, "warm
  tungsten lamps" for the old one: the light argues too.
- Signs, menus, cups and screens blank.

## 7. Sound

- Voice: direct, conversational, 2.5 words per second at most; roger,
  alice, daniel or chris.
- Native `mix` 0.3: café murmur, cups.
- Bed: "Dry, confident bass and brushed snare at about 95 BPM, steady
  under the evidence, dropping out for the counterpoint, back for the
  answer." Volume 0.25, ducking on.
- Captions: `tiktok` on 9:16, `caption` on LinkedIn 1:1.

## 8. Models and credits

| Pick | Model | Why | 15 s | 30 s |
|---|---|---|---|---|
| Best | Veo 3.1 Fast | Places, light, match cuts | 67 | 132 |
| Value | Seedance 2.0 Mini | 9 per clip | 4 clips: 47 | 8 clips: 92 |
| Square for LinkedIn | Wan 2.7 | 1:1, 1080p | 4 clips: 59 | 8 clips: 116 |

## 9. Prompt pairs (Veo 3.1 Fast)

**Pair 1, the take.**

Still-frame prompt:

```text
Clean vertical b-roll, soft natural light. An empty new café counter in pale blond wood under white square tiles, one trailing plant hanging above, a bare bulb on a black cord, a plain white cup on the counter. Medium shot at counter height, 35mm look, deep focus. Soft daylight through a shop window on the left. Blank menu board, no lettering. Clean frame, no text.
```

Motion prompt:

```text
Clean vertical b-roll, soft natural light, one continuous take. Medium shot. 0 to 4 s: nothing moves but the plant, which sways very slightly in a draught; the bulb glows steadily. Camera: locked-off, no movement. End state: the same counter, the plant settling. The counter, the tiles and the light stay exactly as in the opening frame. No person in frame. Ambient noise: a quiet café, a coffee machine hiss far off. No music. Clean frame: no text, no subtitles, no on-screen graphics.
```

**Pair 2, the alternative.**

Still-frame prompt:

```text
Clean vertical b-roll, warm tungsten light. An old neighbourhood café with mismatched wooden chairs, worn green paint on the walls, a scratched marble table with a chipped blue cup, a few customers at the far back out of focus with their backs turned. Medium wide shot at seated eye level, 35mm look. Warm tungsten lamps and grey window light. No signs, no lettering. Clean frame, no text.
```

Motion prompt:

```text
Clean vertical b-roll, warm tungsten light, one continuous take. Medium wide. 0 to 4 s: a hand sets the chipped blue cup down on the marble table and withdraws; steam rises from it; the customers in the back move slightly. Camera: slow push-in toward the cup, stopping when it fills the lower third. End state: the cup steaming on the table. The café and the light stay exactly as in the opening frame. Faces at the back stay out of focus and turned away. Ambient noise: murmur, cups. No music. Clean frame: no text, no subtitles, no on-screen graphics.
```

**Second family, Wan 2.7 (1:1).** "The plant sways slightly; the bulb glows.
Static shot. Medium shot, soft window light, low contrast, warm colour tone.
No people. Sound: quiet café. No music."

## 10. Failure modes and fixes

| Failure | Fix |
|---|---|
| Readable shop names, menus, logos | "blank menu board, no lettering", "shopfronts with blank signs" |
| A real chain's look recognised | Generic features only; no brand colours or signature items |
| Faces in focus in background crowds | "customers at the back out of focus, backs turned" |
| Pictures do not prove the reasons | Beat sheet: each reason gets a picture that shows it |
| The take turns into a rant at a person | Rewrite to the idea or the trend |

## 11. Policy guards

- No other creators' footage, screenshots or likeness; no stitching or
  dueting from the MCP.
- Facts attributed; opinions marked as opinions.
- No claims about real individuals; no mockery of private people.
- Political and news commentary: illustrated look, no generated real
  places or people as scenes of real events (lavendly-explainer, news
  recipe, when installed).
