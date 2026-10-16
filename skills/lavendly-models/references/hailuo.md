# Hailuo family (MiniMax)

Hailuo 2.3, Hailuo 3 and Hailuo 3 Max. The one family with a written camera
command syntax: bracket commands that place a move at a point in the action.
Expressive faces, precise moves on a budget.

## Lavendly specs

| Model | id | Seconds | Resolution (default bold) | Aspects | Refs | Sound | Credits per 5 s | Clip at default |
|---|---|---|---|---|---|---|---|---|
| Hailuo 2.3 | minimax/hailuo-2.3 | 6, 10 | **1080p** only | 16:9 only | 2 | no | 10 | 6 s 20, 10 s 20 |
| Hailuo 3 | minimax/hailuo-3 | 5 to 15 | **2k** only | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | 2 | yes | 18 | 5 s 18, 10 s 36, 15 s 54 |
| Hailuo 3 Max | minimax/hailuo-3-max | 5 to 15 | 480p 10, **768p 10** | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | 2 | no | 10 | 5 s 10, 10 s 20, 15 s 30 |

Hailuo 2.3: first frame only. Hailuo 3 and 3 Max: first and last frame on
the provider side; Lavendly sends the first frame only.

## What the MCP path changes

- Hailuo 2.3 makes 16:9 only. A 9:16 or 1:1 node is snapped to 16:9 by the
  server and the film exports letterboxed. Never use it in a vertical film.
- Hailuo 2.3 at 6 s and 10 s both cost 20: generate 10 and trim.
- Hailuo 3 renders only at 2k. On the canvas it opens on the Studio plan
  (403 plan_resolution below it); the MCP path sends no resolution, so the
  gate does not fire and it is quoted at 18 per block on any plan. The
  export is still capped at the plan's frame size.
- Hailuo 2.3 and 3 Max are silent: narration and score come from
  `attach_track`, native audio off.
- With a Film Bible, the server appends this family's negatives: face
  geometry warping, eye misalignment, frame freeze, abrupt motion blur.

## The optimiser note

MiniMax's own API rewrites prompts by default (a prompt optimiser that is on
unless the caller turns it off). Lavendly sends no switch for it, and
whether the optimiser runs behind Lavendly's provider is unverified. Assume
your words may be rewritten: keep each shot simple, put the bracket command
right after the description it belongs to, state the end state, and judge
the landed frame, not the prompt.

## The dialect

Prose description plus bracket commands. The 15 commands:

| Command | Move |
|---|---|
| `[Truck left]`, `[Truck right]` | the camera slides sideways |
| `[Pan left]`, `[Pan right]` | the camera turns on its axis |
| `[Push in]`, `[Pull out]` | the camera travels toward or away |
| `[Pedestal up]`, `[Pedestal down]` | the camera rises or sinks |
| `[Tilt up]`, `[Tilt down]` | the camera tips on its axis |
| `[Zoom in]`, `[Zoom out]` | the lens zooms |
| `[Shake]` | handheld shake |
| `[Tracking shot]` | the camera follows the subject |
| `[Static shot]` | the camera holds still |

- Several commands inside one bracket happen together, three at most:
  `[Push in, Pedestal up]`.
- Sequential moves are commands placed in order in the text:
  `A chef plates a dish [Static shot], then lifts the plate toward camera [Push in].`
- Put each command right after the description it belongs to.
- One bracket per beat; a static shot for complex action.

## Example 1: food, Hailuo 3, 9:16, 10 s, native sound

Still-frame prompt:

```text
Vertical food film still. A chef in a white jacket, sleeves rolled, stands behind a steel pass, a white plate in front of her with seared scallops on pea puree. Camera at plate height, close, the plate in the lower third, her hands above it. Hard warm heat-lamp light from above, steam rising, a dark kitchen behind with copper pans out of focus. No text, no on-screen graphics.
```

Motion prompt:

```text
The chef sets three pea shoots on the scallops with tweezers, one at a time [Static shot], then wipes the plate rim with a cloth and lifts the plate toward the camera until it fills the lower half of the frame [Push in]. Steam keeps rising under the heat lamp. Exactly one chef, one plate. The chef, the pass and the light stay exactly as in the opening frame. Sound: the tweezers tapping porcelain, a pan sizzling off screen, kitchen hum, no music. Clean frame: no text, no on-screen graphics.
```

## Example 2: reveal, Hailuo 3 Max, 16:9, 5 s, silent

Still-frame prompt:

```text
Architectural photo. A narrow stone stairway climbs between whitewashed walls toward a strip of blue sky, a single terracotta pot with a lemon tree on the third step. Camera low at the foot of the stairs, looking up, walls framing both sides. Hard midday sun from the top of the frame, crisp shadow lines across the steps. No text, no on-screen graphics.
```

Motion prompt:

```text
The camera rises along the stairway past the lemon tree [Pedestal up, Tilt down] and stops when the sea appears beyond the top step, flat and blue, with one white sailboat [Static shot]. Leaves of the lemon tree stir in a light wind. The stairway, the walls and the sunlight stay exactly as in the opening frame. Nobody in frame.
```

## Failure modes and fixes

| Failure | Fix |
|---|---|
| The shot is not what the prompt asked (rewritten) | Simpler wording, commands after the description, the end state stated; judge the frame |
| The camera fights the subject's motion | One command per beat; `[Static shot]` for complex action |
| A vertical film comes back letterboxed | Hailuo 2.3 was used; move those scenes to Hailuo 3 or 3 Max |
| Faces warp in fast moves | Slower move, one command, a closer start frame |

## When to pick

- Hailuo 3: exact camera choreography with sound, any of six shapes.
- Hailuo 3 Max: the same choreography silent at 10 per block, under
  narration or a score.
- Hailuo 2.3: landscape-only silent shots where 10 s for 20 credits fits.
