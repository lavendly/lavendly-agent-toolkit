# Prompt anchors: places

The place block, the two prompts per shot in each model family's dialect,
the sentences that hold a room still, camera and light for spaces,
materials, banned words and narration. Prompts in English. Never write the
model name, the clip length or the aspect in a prompt.

## 1. The place block

Written once per place, observable only, pasted verbatim into every
still-frame prompt of that place (concept scenes) and used to check photo
scenes.

```text
<the place>: <size and shape>, <main materials>, <openings: windows and doors with counts>, <the fixed features>, <the light source and its direction>.
```

```text
The living room: a long open-plan room, pale oak floor, white walls, three floor-to-ceiling windows on the left wall looking onto a garden, a low linen sofa facing a stone fireplace on the right wall, soft daylight from the windows.
```

```text
The terrace: a whitewashed stone terrace above the sea, a low white wall along the front edge, two blue wooden chairs and a small round table, a bougainvillea on the right corner, late afternoon sun from the right.
```

Counts are what keep rooms from re-arranging: "three windows", "one door
on the far wall", "two chairs".

## 2. The still-frame prompt (concept scenes)

The opening image is made from text alone, subject first, first 500
characters kept. Write it as an architectural or travel photograph of the
start state: no action, no camera move.

```text
<style line>. <shot size, camera height, lens feel, "vertical lines straight">. <place block>. <what is on every surface>. <light line>. <palette>. <people: none, or exactly who and where>. No text, no signs, no logo.
```

Style lines (one per film): "Architectural photograph", "Interior
photograph", "Travel photograph", "Natural-light food photograph",
"Editorial fashion photograph", "Sports photograph", "Documentary
photograph".

Photo scenes need no still prompt: the photo is the opening image.

## 3. The motion prompt

The clip animates its own opening image (the photo or the still). Describe
the change: the camera move with speed and end, the small natural motion,
the end state, one lock sentence, the count, the sound, the clean frame.

### Veo 3.1, Fast, Lite

```text
Smooth gimbal glide forward toward the windows at slow walking pace, then the camera settles. The curtains move slightly in a breeze; the garden trees sway outside. The room's walls, three windows, sofa and fireplace stay exactly as in the opening frame; vertical lines stay straight. Nobody in frame. Ambient noise: a quiet room, distant birds outside. No music. Clean frame, no text.
```

### Wan 2.7, 2.6, 3.0

Motion plus camera, then literal aesthetic words.

```text
The camera pushes in slowly toward the windows. The curtains move slightly; the trees outside sway. Camera: slow push in, wide shot, wide lens, eye level. Soft daylight, window light, low contrast, neutral colour tone. The room keeps its exact layout, windows and furniture. Nobody in frame. Sound: quiet room, birds outside. Clean frame, no text.
```

### Hailuo 2.3 (16:9 only, silent)

Prose with the model's camera command right after the description; one
command per beat; no sound line.

```text
The empty living room with three tall windows and a linen sofa, curtains moving slightly in a breeze [Push in]. The room keeps its exact layout and windows. Clean frame, no text.
```

### Kling v3

```text
From the opening frame, the camera glides slowly forward along the terrace toward the low white wall, then stops. The bougainvillea moves in the breeze; the sea glitters below. The terrace keeps its exact wall, chairs and table. Nobody in frame. Sound: waves below, wind, a distant boat motor. Clean frame, no text.
```

### Seedance 2.0, 2.5, 1.5 Pro

A short production note, subject first, motion already under way at the
first frame.

```text
The whitewashed terrace above the sea, the breeze already moving from the first frame. TIMELINE: 0 to 5 s, the bougainvillea sways, light glitters on the water. CAMERA: slow glide forward toward the low wall, then holds. CONTINUITY: the wall, two chairs and the table stay exactly as in the opening frame. Nobody in frame. AUDIO: waves, wind, no music. ENDING STATE: the camera at rest above the wall, the sea filling the lower half.
```

### Runway Gen-4.5 (silent)

Motion only, general terms, positive: "The camera slowly pushes in. The
curtains move gently. The room stays the same."

## 4. Lock, count and cast sentences

| Job | Sentence |
|---|---|
| Room still | "The walls, windows, doors and furniture stay exactly as in the opening frame; only the camera moves." |
| Verticals | "Vertical lines stay straight, no lens distortion." |
| Openings counted | "Exactly three windows on the left wall and one door on the far wall." |
| Exterior still | "The building's facade, windows and roofline stay exactly as in the opening frame." |
| View held | "The view through the window stays the same garden." |
| Empty | "Nobody in frame." |
| One person | "Exactly one woman, seen from behind at the far end of the room, nobody else." |
| Distant people | "A few distant people stay small and soft in the background." |
| Signs | "Signs and menus stay blank or turned away." |
| Clean frame | "Clean frame, no text, no logo, no on-screen graphics, no timestamps." |

## 5. Camera for spaces

| Move | Phrase | Use |
|---|---|---|
| Gimbal glide | "smooth gimbal glide forward at slow walking pace" | rooms, corridors, terraces |
| Lateral truck | "the camera trucks slowly to the right along the counter" | kitchens, bars, facades |
| Pedestal | "slow pedestal up from table height to standing height" | over counters, over a garden wall |
| Push-in | "slow push-in toward the window over the whole shot" | a feature, a view |
| Pull-back | "slow pull-back revealing the whole room" | reveals, endings |
| Pan | "slow pan from the door to the window, about forty-five degrees" | reveals inside one room |
| Drone advance | "high aerial drone shot slowly advancing toward the house" | exteriors, coast, villages |
| Drone orbit | "slow aerial orbit of about forty-five degrees around the building" | exteriors only, never full |
| Crane | "crane shot rising from the path to roof height" | facades, entrances |
| Locked-off | "static locked-off camera on a tripod" | details, food steps, holds |
| FPV | "FPV drone flight forward through the doorway at walking speed" | sparingly; geometry drifts fast |

Lens feel: "18mm wide interior lens, vertical lines straight", "24mm
architectural lens", "35mm at eye level", "85mm detail", "100mm macro".
Camera height for interiors: "camera at chest height, about 1.3 m".

## 6. Light for places

| Light | Phrase |
|---|---|
| Interior day | "bright soft overcast daylight from the windows, every lamp on, balanced" |
| Interior evening | "warm lamps on, blue dusk in the windows" |
| Exterior day | "soft sun from the right, a clear pale sky" |
| Twilight exterior | "blue hour, deep blue sky, every window glowing warm, path lights on" |
| Golden hour | "low warm sun from behind, long soft shadows" |
| Midday beach | "bright midday sun, turquoise water, short shadows" |
| Night market | "warm tungsten bulbs and red lanterns, steam in the light" |
| Restaurant | "warm pendant lights over each table, candles, the room in soft amber" |
| Stage | "moving lights sweeping through light haze, a deep blue wash" |
| Gym or court | "hard top light, dust in the air" |

Colour: neutral white balance for listings ("true colours, neutral white
balance, no heavy grade"); warm and natural for hospitality and food;
"avoid an orange sky" for travel.

## 7. Materials of places

"pale oak floor with visible grain", "polished concrete", "white plaster
walls", "honed marble countertop with soft grey veins", "brushed brass
taps", "linen upholstery", "wool rug", "terracotta tiles", "whitewashed
stone", "black steel window frames", "weathered timber cladding", "glazed
ceramic tiles", "rattan", "velvet banquette", "zinc bar top".

## 8. Banned words in prompts

| Banned | Write instead |
|---|---|
| cinematic, filmic | the move and the lens: "slow gimbal glide, 18mm, verticals straight" |
| stunning, breathtaking, gorgeous, beautiful, amazing, epic, insane, mind-blowing | the thing: "three tall windows over a green garden" |
| luxury, luxurious, dream home, paradise as adjectives | the materials and the view |
| masterpiece, award-winning | delete |
| 8k, 4k as praise, ultra realistic, hyperrealistic, photorealistic | delete; name the material |
| dynamic, dramatic | the motion and its speed |
| vibrant as filler | the colours: "turquoise water, white walls, terracotta roofs" |

## 9. Narration lines

Ceiling `floor(seconds x 2.5)` words, written to about 2.3 per second.

| Length | Words |
|---|---|
| 6 s | 10 to 13 |
| 15 s | 28 to 32 |
| 30 s | 55 to 68 |
| 60 s | 115 to 135 |

Features and feeling, one per line, true to the place: "Light from both
sides, all day." Numbers spelled out ("three bedrooms"). Never "welcome
to", "nestled", "boasts", "dream", "paradise", "hidden gem".
