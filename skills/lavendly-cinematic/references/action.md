# Recipe: action

## 1. Purpose, audience, ending

- Purpose: momentum and stakes: a chase, an escape, a stunt, a fight
  implied. The viewer must always know who is where, where they are going,
  and what happens if they fail.
- Audience: genre fans, sports and stunt audiences, trailers, series
  set-pieces.
- The ending: arrival or failure, then a breath. The last shot is a held
  stillness after motion (she lands and does not move; the car stops in the
  rain).

## 2. What generated video can and cannot do

- Bodies break in fast action: limbs morph, feet slide, hands fuse. Keep
  each clip to one movement, 3 to 5 s, with the motion path written out.
- Speed is sold by the camera, not by the subject's speed: a locked-off
  camera the runner passes close to, a telephoto lens compressing the
  street, a camera tracking at the same speed with parallax.
- Contact between people (punches landing, grappling) is where models fail
  and where filters refuse. Cut on the action before the contact; show the
  reaction or the result.
- Every cut on action carries velocity: end the motion prompt mid-move
  ("she is still in the air as the shot ends") and start the next one
  "already in motion from the first frame", in the same direction.

## 3. Structures by length

Model lengths for Kling v3 Pro (3 to 15 s; 5 s for anything up to 5 s costs
one block). Energy curve per beat: still, slow, medium, fast, stop.

### 6 s: preparation, explosion, reaction

| # | Size, angle, lens | Move | Action | Energy | Cut | Generate |
|---|---|---|---|---|---|---|
| 1 | Close-up, 85mm | locked-off | Her eyes on the gap between two rooftops; breath | Still | 2 s | 5 s |
| 2 | Wide, low angle, 24mm | locked-off | She sprints past the lens and leaps the gap, still in the air at the cut | Fast | 4 s | 5 s |

### 15 s: the chase beat

| # | Size, angle, lens | Move | Action | Energy | Cut | Generate |
|---|---|---|---|---|---|---|
| 1 | Close-up, 85mm | locked-off | She glances back over her shoulder; footsteps behind | Still | 2 s | 5 s |
| 2 | Wide, 135mm telephoto | locked-off | She runs toward the lens down a compressed street | Medium | 3 s | 5 s |
| 3 | Medium, 35mm | tracking alongside at running pace | She vaults a low wall, already running | Fast | 3 s | 5 s |
| 4 | Insert, ground level, 24mm | locked-off | Her boots hit a puddle, water bursts toward the lens | Fast | 2 s | 5 s |
| 5 | Wide, low angle, 24mm | locked-off | She leaps the rooftop gap, slow motion at the peak | Peak | 3 s | 5 s |
| 6 | Medium, 50mm | locked-off | She lands, rolls, stays down, breathing | Stop | 2 s | 5 s |

### 30 s: escape

| # | Size, lens | Move | Action | Energy | Cut | Generate |
|---|---|---|---|---|---|---|
| 1 | Close-up, 85mm | locked-off | A door handle turns from outside; she watches it | Still | 3 s | 5 s |
| 2 | Medium, 35mm | locked-off | She opens the window, climbs out onto the ledge | Slow | 4 s | 5 s |
| 3 | Wide, high angle, 24mm | locked-off | The ledge, the drop, the fire escape two metres away | Slow | 3 s | 5 s |
| 4 | Medium close-up, 85mm | slow push-in | She measures the gap; jaw sets | Still | 3 s | 5 s |
| 5 | Wide, 35mm | locked-off | She jumps to the fire escape, still in the air at the cut | Fast | 3 s | 5 s |
| 6 | Insert, 100mm | locked-off | Her hands catch the rail, already gripping | Fast | 2 s | 5 s |
| 7 | Medium, 35mm | tracking down with her | She runs down the iron stairs | Fast | 3 s | 5 s |
| 8 | Wide, 135mm | locked-off | Above, a figure leans out of the window, too late | Medium | 3 s | 5 s |
| 9 | Wide, eye level, 24mm | locked-off | She drops to the alley and runs out of frame left | Fast | 3 s | 5 s |
| 10 | Wide, 35mm | locked-off | The empty alley, rain, a slow breath of silence | Stop | 3 s | 5 s |

### 60 s: a set-piece

| Section | Time | Shots | Content |
|---|---|---|---|
| Goal and threat | 0 to 10 s | 3 | What she carries, who wants it, where she must reach |
| First run | 10 to 25 s | 6 | Telephoto runs, a vault, a near miss, screen direction left to right |
| Complication | 25 to 35 s | 3 | The way is blocked; a held close-up; she chooses another way |
| Escalation | 35 to 50 s | 6 to 7 | Shorter shots (2 s), a jump, a slow-motion peak |
| Arrival or failure | 50 to 56 s | 2 | The landing, the door, the train |
| Breath | 56 to 60 s | 1 | Stillness, held |

### 90 s: a sequence with a breather

The 60 s set-piece plus a middle breather of 15 to 20 s (hiding, breath,
the threat passing close in a long locked-off shot) before a second run.
Over 20 clips: show the cost before planning further.

## 4. Hook and payoff

- Hook: the peak or the threat in frame 1 (mid-leap, a door handle turning,
  a headlight in the mirror), with a sound.
- Payoff: the landing or the arrival, then the longest hold of the film in
  stillness. Silence before the peak makes it land.

## 5. Camera, light, colour

- Telephoto runs toward the lens, low angles for the hero, tracking
  alongside with parallax, locked-off wides the action crosses, inserts on
  feet, hands, the object being carried.
- Screen direction: the hero runs left to right for the whole chase; a
  change of direction is shown happening in one shot.
- One camera move per shot; no whip pans inside a generated clip; never the
  same move twice in a row.
- Light: hard low sun with rim through dust; sodium street lamps on wet
  asphalt; stadium-like overhead floods; a single top light in a gym.
- Colour: high contrast, crushed blacks, one accent colour (her red jacket).
- Motion texture: "crisp motion with a fast shutter, no motion blur" for
  impacts; "slow motion, 120 fps look" for the peak, under 4 s.

Exact phrases that work:

- "Action film still, telephoto lens look, crisp motion"
- "135mm telephoto, the street compressed and stacked behind her"
- "camera tracks alongside her at running pace, parked cars passing in the foreground"
- "already in motion from the first frame, running left to right"
- "she is still in the air as the shot ends"
- "both feet leave the ledge, arms forward, she lands with knees bent and rolls once"

## 6. Speed ramps and slow motion on Lavendly

- A ramp from real time into slow motion: generate the clip in slow motion
  ("slow motion, 120 fps look"), `split_clip` at the moment before the peak,
  then `edit_clip` with speed 2 on the first half (it plays at real time)
  and leave the second half at 1 (slow).
- Do not slow normal footage with speed below 1 for long: generated frames
  repeat and stutter. Use speed 0.7 at most on real-time footage.
- Hold a slow-motion peak 1.5 to 3 s.

## 7. Sound

- Native on every action clip: footsteps, breath, impacts, engines, rain.
  Exaggerated foley reads well; write the sources ("Sound: boots on wet
  tarmac, heavy breath, a car horn far behind").
- Score: driving percussion at 120 to 150 BPM; a drop to silence 1 s before
  the peak; a hit on the landing. Brief: "Driving low percussion and a
  pulsing synth bass at about 140 BPM from 2 s; drops out completely at 18 s;
  one deep hit at 19 s; a sparse low drone under the last 4 s.
  Instrumental." Volume 0.5 to 0.7; clips `native` at 1.
- Lines: 2 to 6 words, shouted or breathed; 30 s holds about 15 words.

## 8. Model picks

| Tier | Model | Why |
|---|---|---|
| Best human motion | Kling v3 Pro | Holds bodies and clothes through motion from a still; sound |
| Value | Seedance 2.0 Fast | 11 per 5 s, 4 references; motion front-loaded, which suits short action |
| Vehicles at night, rain | Veo 3.1 Fast | Reflections and engine sound |
| Physics-heavy stunts | Hailuo 3 | Bracket camera commands; sound; quoted at 2k |
| Draft | Grok Imagine | 9 per 5 s, any length 1 to 15 s |

Typical cost (clips plus about 2 per opening image):

| Model | 15 s (6 clips of 5 s) | 30 s (10 clips of 5 s) |
|---|---|---|
| Kling v3 Pro | 6 x 20 = 120, plus 12 | 10 x 20 = 200, plus 20 |
| Seedance 2.0 Fast | 6 x 11 = 66, plus 12 | 10 x 11 = 110, plus 20 |
| Veo 3.1 Fast (4 s clips) | 6 x 14 = 84, plus 12 | 10 x 14 = 140, plus 20 |
| Hailuo 3 | 6 x 18 = 108, plus 12 | 10 x 18 = 180, plus 20 |

## 9. Prompt pairs

### Pair 1: the gap (Kling v3 Pro)

Still frame:

```text
Action film still, telephoto lens look, crisp motion. Wide shot, low angle, 24mm lens, from the far rooftop. Kaya: a woman in her twenties, athletic, short bleached hair, a red nylon jacket, black cargo trousers, white running shoes with a black stripe. She runs toward the edge of a flat concrete rooftop, the gap to the next roof between her and the lens. Hard low evening sun behind her, rim light, dust in the air. Palette: red, concrete grey, gold.
```

Motion:

```text
Scene: two flat city rooftops at sunset, a two-metre gap between them. Character: Kaya in her red jacket, already running toward the edge from the first frame, left to right. Action: at 1 s both her feet leave the ledge, arms forward; slow motion at the peak of the jump; she is still in the air over the gap as the shot ends. Camera: static, low angle, from the far roof. Audio: running steps on concrete, one sharp breath, wind. Kaya, her jacket and the rooftops stay exactly as in the opening frame. Exactly one person in frame, nobody else. Clean frame: no text.
```

### Pair 2: the night run (Veo 3.1 Fast)

Still frame:

```text
Action film still, telephoto lens look. Low side angle at wheel height, 35mm lens. A dark green two-door coupe with a dented rear left door drives along a wet multi-storey car park ramp at night. Sodium-orange ceiling lights reflected in long streaks along its bonnet; light rain mist; the ramp curving up to the right. Palette: bottle green, sodium orange, black.
```

Motion:

```text
Action film shot. The camera trucks alongside the coupe at the same speed from front wheel to rear wheel. The coupe is already moving uphill from the first frame; its wheels turn forward smoothly; reflections slide along the bodywork. At 3 s its headlights flare across a concrete pillar ahead. The coupe stays the same car, the same shape and colour. Exactly one car in frame, nobody else. SFX: engine pulling hard, tyres hissing on wet concrete. Clean frame: no text, no number plate characters, no on-screen graphics.
```

### Pair 3: the catch (Seedance 2.0 Fast)

Still frame:

```text
Action film still, crisp motion. Insert shot, 100mm lens. Kaya's hands, short unpainted nails, red jacket cuffs, reaching for a rusted black iron fire-escape rail against a brick wall at sunset. Hard low sun from the left, long shadows on the bricks. Palette: rust, red, brick orange.
```

Motion:

```text
Kaya's hands already in motion from the first frame: both hands slap onto the iron rail and close around it; the rail shudders once; her knuckles whiten as her weight lands. Locked-off camera, close. Her hands, her cuffs and the rail stay exactly as in the opening frame. Exactly two hands in frame, nobody else. Audio: a hard metal clang, a grunt, the rail ringing. No music. Clean frame: no text.
```

Second family notes: on Hailuo 3 put the camera command right after the
action it moves with: "She leaps the gap [Tracking shot], lands and rolls
[Static shot]."

## 10. Failure modes and fixes

| Failure | Fix |
|---|---|
| Limbs morph, feet slide, hands fuse | One movement per clip, 3 to 5 s, the path written ("both feet leave the ledge, arms forward"); slow motion at the peak |
| The runner teleports or changes direction | Screen direction in every prompt ("running left to right"); "already in motion from the first frame" |
| Velocity dies at the cut | End mid-move; start the next prompt in the same move |
| Wheels spin backward, badges garble | "wheels turn forward smoothly"; no badge or number plate characters |
| Punches look like dancing or are refused | Cut before contact; show the reaction; no injury |
| A second runner or pursuer appears | Count everyone; the pursuer introduced in their own shot first |
| Everything at the same speed | Energy curve: still, slow, medium, fast, stop; shorten shots toward the peak |

## 11. Policy guards

- Violence implied: no blood, no injury detail, no weapons aimed at people,
  no real weapons brands. Stunts are fiction; no instructions for dangerous
  acts.
- No real vehicles' logos or plates, no real athletes or stunt performers by
  name or likeness.
