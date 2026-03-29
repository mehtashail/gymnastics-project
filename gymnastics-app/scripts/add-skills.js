const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '../src/data/skills.json');
const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));

const newSkills = [
  {
    "id": "vault-011",
    "name": "Squat On, Jump Off",
    "technicalName": "Squat-On Vault",
    "apparatus": "vault",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "This is often the very first real vault a young gymnast learns — usually in Level 1-3 or XCEL Bronze. She runs down the runway, bounces off the springboard, and lands both feet on top of the vault table in a squat (crouching) position. From there, she stands up and jumps off to land on the mat. Think of it like jumping on and then off a big box.",
    "whatToLookFor": [
      "A confident run and a good two-foot jump onto the springboard",
      "Both feet landing squarely on top of the vault table at the same time",
      "A brief moment of balance in the squat position before jumping off",
      "Arms reaching forward as she jumps off the table",
      "A controlled landing with bent knees — not a stumble forward"
    ],
    "commonMistakes": [
      "Landing only one foot on the vault table instead of two simultaneously",
      "Squatting too far back on the table and falling toward the springboard side",
      "Jumping off the table before finding balance, which leads to a forward crash",
      "Not using enough spring off the board, making the feet barely reach the table"
    ],
    "quickTipsChecklist": [
      { "id": "v011-1", "cue": "Two feet on table", "description": "Both feet land on the vault top at the same moment" },
      { "id": "v011-2", "cue": "Brief balance", "description": "She pauses a moment in squat before jumping off" },
      { "id": "v011-3", "cue": "Arms forward on dismount", "description": "Arms reach out in front as she jumps off the table" },
      { "id": "v011-4", "cue": "Soft landing", "description": "Bent knees absorb the landing — no crashing or stumbling" }
    ],
    "relatedSkillIds": ["vault-001", "vault-003"],
    "videos": [
      {
        "id": "v011-vid1",
        "title": "Squat On Jump Off Vault — Beginner Gymnastics",
        "url": "https://www.youtube.com/results?search_query=squat+on+jump+off+vault+gymnastics+beginner+level+3",
        "type": "tutorial"
      }
    ],
    "tags": ["vault", "beginner", "squat-on", "first vault", "level 1", "level 2", "level 3"]
  },
  {
    "id": "vault-012",
    "name": "Front Handspring Vault with Full Twist",
    "technicalName": "FHS with 360° Twist",
    "apparatus": "vault",
    "discipline": "WAG",
    "difficultyValue": "C",
    "difficultyTier": "Intermediate",
    "description": "This vault starts exactly like the basic front handspring vault — she runs, hits the springboard, and pushes off the table — but then adds a full 360-degree twist while in the air before landing. Her body spins like a corkscrew during the flight phase. It's a crowd-pleasing skill because the spin happens while she's airborne, making it look much more impressive than the basic version.",
    "whatToLookFor": [
      "A powerful, fast run that doesn't slow down near the board",
      "Strong straight arms on the table — same foundation as the basic FHS",
      "A clean, controlled twist that starts immediately after leaving the table",
      "The twist completing fully before she begins to land (not still spinning on the mat)",
      "A stable landing — the twist makes balance harder, so extra steps are common but penalized"
    ],
    "commonMistakes": [
      "Starting the twist too early (on the table) instead of in the air — looks messy and loses power",
      "An incomplete twist where she lands at only 270 degrees, facing sideways",
      "Losing height by twisting too quickly — the vault should still show a clear flight phase",
      "Landing off-axis and stumbling sideways because the twist wasn't straight"
    ],
    "quickTipsChecklist": [
      { "id": "v012-1", "cue": "Fast approach", "description": "Full sprint all the way to the board" },
      { "id": "v012-2", "cue": "Twist starts in air", "description": "The rotation begins after she leaves the table, not on it" },
      { "id": "v012-3", "cue": "Full 360 completed", "description": "She lands facing the vault — twist is complete before landing" },
      { "id": "v012-4", "cue": "Controlled landing", "description": "Feet together, knees bent, minimal steps" }
    ],
    "relatedSkillIds": ["vault-001", "vault-004", "vault-005"],
    "videos": [
      {
        "id": "v012-vid1",
        "title": "Front Handspring Full Twist Vault Tutorial",
        "url": "https://www.youtube.com/results?search_query=front+handspring+full+twist+vault+gymnastics+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["vault", "intermediate", "handspring", "full twist", "level 6", "level 7"]
  },
  {
    "id": "bars-014",
    "name": "Mill Circle",
    "technicalName": "Mill Circle (Forward Hip Circle)",
    "apparatus": "uneven_bars",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "The mill circle is one of the first bar skills young gymnasts learn — it's a fundamental Level 3 skill done on the low bar. Starting in a straddle position with her hips resting on the bar (one leg in front, one behind), she leans forward and swings all the way around the bar in a full circle, ending back where she started. It looks like she's rotating around a horizontal pole with her hips as the pivot point.",
    "whatToLookFor": [
      "A clear straddle start — one leg in front, one behind, hips on the bar",
      "A confident lean forward to initiate the circle — she shouldn't hesitate",
      "Her body staying close to the bar throughout the rotation",
      "Straight legs during the circle (bent knees are a common deduction)",
      "A clean finish back in the straddle position, in control"
    ],
    "commonMistakes": [
      "Bending the knees during the circle, which loses the clean line judges look for",
      "Sliding off the bar during the rotation — usually because hips aren't centered",
      "Not leaning forward enough to start the circle, causing the skill to stall halfway",
      "Letting go of the bar in a panic mid-circle — this is a safety concern"
    ],
    "quickTipsChecklist": [
      { "id": "b014-1", "cue": "Straddle on bar", "description": "One leg forward, one behind, hips resting on the bar" },
      { "id": "b014-2", "cue": "Confident lean forward", "description": "Leans into the rotation without stopping" },
      { "id": "b014-3", "cue": "Straight legs", "description": "Knees stay extended throughout the circle" },
      { "id": "b014-4", "cue": "Full rotation", "description": "Completes the circle and returns to start position" }
    ],
    "relatedSkillIds": ["bars-001", "bars-002", "bars-003"],
    "videos": [
      {
        "id": "b014-vid1",
        "title": "Mill Circle on Bars — Level 3 Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=mill+circle+gymnastics+bars+level+3+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["bars", "beginner", "mill circle", "hip circle", "level 3", "low bar", "foundational"]
  },
  {
    "id": "bars-015",
    "name": "Flyaway Dismount",
    "technicalName": "Layout Flyaway",
    "apparatus": "uneven_bars",
    "discipline": "WAG",
    "difficultyValue": "B",
    "difficultyTier": "Intermediate",
    "description": "The flyaway is the most common bars dismount you'll see at gymnastics meets from Level 4 all the way up. At the peak of a giant swing or underswing, your daughter releases the bar and flies through the air in a straight (layout) or tucked position, landing on the mat facing away from the bar. The name says it all — she literally flies away from the bar.",
    "whatToLookFor": [
      "A powerful giant swing or underswing leading into the dismount",
      "A clean release of both hands at the same moment — no one hand releasing early",
      "A straight or tight body position in the air (not sagging or arching randomly)",
      "Good height after release — she should visibly rise before coming down",
      "Landing on two feet with control — not pitching forward onto hands"
    ],
    "commonMistakes": [
      "Releasing the bar too early (at the bottom of the swing) instead of at the top, which kills height",
      "Letting go with one hand before the other, causing a sideways twist",
      "A bent/piked body during the flight that makes the dismount look uncontrolled",
      "Over-rotating and landing facing the bar instead of away from it",
      "A blind landing — she should be spotting the mat before her feet arrive"
    ],
    "quickTipsChecklist": [
      { "id": "b015-1", "cue": "Powerful swing into dismount", "description": "A big swinging motion powers the release" },
      { "id": "b015-2", "cue": "Both hands release together", "description": "Simultaneous release for a straight flight" },
      { "id": "b015-3", "cue": "Visible height", "description": "She rises clearly before coming down to the mat" },
      { "id": "b015-4", "cue": "Two-foot landing", "description": "Sticks on two feet facing away from the bar" }
    ],
    "relatedSkillIds": ["bars-004", "bars-008"],
    "videos": [
      {
        "id": "b015-vid1",
        "title": "Flyaway Dismount Gymnastics Bars Tutorial",
        "url": "https://www.youtube.com/results?search_query=flyaway+dismount+gymnastics+uneven+bars+tutorial+level+4+5",
        "type": "tutorial"
      }
    ],
    "tags": ["bars", "intermediate", "dismount", "flyaway", "level 4", "level 5", "release"]
  },
  {
    "id": "bars-016",
    "name": "Stalder Circle",
    "technicalName": "Stalder",
    "apparatus": "uneven_bars",
    "discipline": "WAG",
    "difficultyValue": "D",
    "difficultyTier": "Advanced",
    "description": "Named after Swiss gymnast Josef Stalder, this is a circling skill where your daughter keeps her legs in a straddle (wide-apart) position while circling the bar. Instead of a giant swing where legs stay together, the Stalder requires her to hold a pike-straddle shape with legs pressed against the bar on each side as she rotates. It demands extreme flexibility and body tension — making it a big step up from a regular giant swing.",
    "whatToLookFor": [
      "A clear straddle shape entering the circle — legs noticeably wide apart",
      "Her legs pressing close to the bar (not floating away) as she goes around",
      "A tight body position maintained throughout — no loosening mid-rotation",
      "A smooth, continuous rotation rather than a jerky or stalled circle",
      "A clean finish into a handstand or cast position after completing the circle"
    ],
    "commonMistakes": [
      "Legs drifting away from the bar during the circle, losing the required shape",
      "A hip angle that opens too early, killing the rotation before completion",
      "Insufficient flexibility — the straddle requires exceptional hip flexibility",
      "Stalling at the back or top of the circle and losing momentum"
    ],
    "quickTipsChecklist": [
      { "id": "b016-1", "cue": "Wide straddle maintained", "description": "Legs stay wide apart throughout the entire circle" },
      { "id": "b016-2", "cue": "Legs close to bar", "description": "Thighs press near the bar as she rotates around" },
      { "id": "b016-3", "cue": "No pausing", "description": "Smooth continuous rotation with no hesitation" },
      { "id": "b016-4", "cue": "Clean finish", "description": "Arrives back at handstand or cast in control" }
    ],
    "relatedSkillIds": ["bars-004", "bars-006", "bars-007"],
    "videos": [
      {
        "id": "b016-vid1",
        "title": "Stalder Circle Gymnastics Uneven Bars",
        "url": "https://www.youtube.com/results?search_query=stalder+circle+gymnastics+uneven+bars+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["bars", "advanced", "stalder", "circle", "straddle", "flexibility"]
  },
  {
    "id": "beam-014",
    "name": "Forward Roll on Beam",
    "technicalName": "Forward Roll",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "A forward somersault performed entirely on the 4-inch wide balance beam. Your daughter tucks her chin, places her hands on the beam, and rolls forward, bringing her feet over and around to land back on the beam in a standing position. It's the same basic motion as a floor forward roll — but done on a beam barely wider than a textbook. Level 3 gymnasts learn this as one of their first beam acrobatic elements.",
    "whatToLookFor": [
      "Chin tucked to chest before initiating the roll — this protects her neck",
      "Hands placed flat and evenly on the beam, shoulder-width apart",
      "A smooth, controlled roll along the spine — not a crash or a topple to the side",
      "Feet landing squarely on the beam when she comes around — not too wide or narrow",
      "Standing up in control without grabbing the beam with hands"
    ],
    "commonMistakes": [
      "Not tucking the chin, causing her to roll on her head instead of the back of her skull",
      "Placing hands unevenly, which starts the roll with a sideways lean",
      "Rolling too fast and losing control when her feet hit the beam",
      "Overbalancing forward onto her face when standing up from the roll"
    ],
    "quickTipsChecklist": [
      { "id": "bm014-1", "cue": "Chin tucked before roll", "description": "Chin goes to chest first — protects her neck" },
      { "id": "bm014-2", "cue": "Even hand placement", "description": "Both hands on the beam, centered, at the same time" },
      { "id": "bm014-3", "cue": "Controlled roll speed", "description": "Smooth rotation — not too fast, not stalled" },
      { "id": "bm014-4", "cue": "Feet land on beam", "description": "Feet arrive squarely on the beam when coming up to stand" }
    ],
    "relatedSkillIds": ["beam-001", "beam-002"],
    "videos": [
      {
        "id": "bm014-vid1",
        "title": "Forward Roll on Balance Beam — Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=forward+roll+balance+beam+gymnastics+tutorial+level+3",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "beginner", "forward roll", "level 3", "acrobatic", "foundational"]
  },
  {
    "id": "beam-015",
    "name": "Arabesque / Scale on Beam",
    "technicalName": "Arabesque",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "An arabesque is a classical ballet position held on the beam: your daughter balances on one leg while extending the other leg straight behind her, with her arms gracefully extended. A scale is similar but the back leg is raised very high (ideally at or above hip height). These are dance elements required in almost every beam routine at every level. They look elegant but require strong balance and flexibility.",
    "whatToLookFor": [
      "Standing leg straight and not wobbling — the base of the whole position",
      "Back leg lifted high and straight — ideally at or above hip level",
      "Hips level (not tilted) — a common deduction judges look for",
      "Arms graceful and extended, not tensed or flailing for balance",
      "A still, held position — judges want to see she can maintain it, not just pass through it"
    ],
    "commonMistakes": [
      "A bent knee on the standing leg, which makes the whole position look weak",
      "Hips tilting sideways as the back leg rises — this is a significant deduction",
      "Back leg barely at hip height when it should be higher",
      "Arms grabbing for balance rather than held in a controlled shape",
      "Wobbling or stepping out before the hold time is complete"
    ],
    "quickTipsChecklist": [
      { "id": "bm015-1", "cue": "Straight standing leg", "description": "The support leg is fully extended, not bent" },
      { "id": "bm015-2", "cue": "Back leg high and straight", "description": "The raised leg is at or above hip height" },
      { "id": "bm015-3", "cue": "Hips level", "description": "Both hips are at the same height — no tilting" },
      { "id": "bm015-4", "cue": "Graceful arms", "description": "Arms are held in a beautiful shape, not flailing" }
    ],
    "relatedSkillIds": ["beam-001", "beam-003"],
    "videos": [
      {
        "id": "bm015-vid1",
        "title": "Arabesque on Balance Beam — Gymnastics Dance Elements",
        "url": "https://www.youtube.com/results?search_query=arabesque+scale+balance+beam+gymnastics+dance+element+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "beginner", "arabesque", "scale", "dance", "ballet", "balance"]
  },
  {
    "id": "beam-016",
    "name": "Split on Beam",
    "technicalName": "Split",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Intermediate",
    "description": "Performing a full split on the balance beam means lowering both legs into a flat split position — front to back — along a 4-inch wide surface. Your daughter sinks from a standing or kneeling position down until both legs are fully extended along the beam. It's one of the most visually striking held positions in gymnastics and requires the same flexibility as a floor split, plus the nerve to do it at beam height.",
    "whatToLookFor": [
      "Hips completely square and facing forward — not turned out to one side to cheat the split",
      "Both legs fully extended and flat on the beam — not hovering above it",
      "Front toes pointed — no flexed foot on the leading leg",
      "Back toes pointed and leg flat against the beam",
      "A controlled lowering down and controlled rising back up — no plopping or grabbing"
    ],
    "commonMistakes": [
      "Hips rotating sideways to make the split look fuller than it actually is — judges see this easily",
      "Front foot flexed (toes up) instead of pointed, which is a deduction",
      "Not achieving full contact between both legs and the beam — still a few inches off",
      "Grabbing the beam with hands when lowering or rising, causing an additional deduction"
    ],
    "quickTipsChecklist": [
      { "id": "bm016-1", "cue": "Square hips", "description": "Hips face directly forward, not rotated to the side" },
      { "id": "bm016-2", "cue": "Both legs flat on beam", "description": "Full contact from hip to toe on both sides" },
      { "id": "bm016-3", "cue": "Pointed toes", "description": "Both feet pointed throughout the skill" },
      { "id": "bm016-4", "cue": "No hands on beam", "description": "Rises back up without using hands for support" }
    ],
    "relatedSkillIds": ["beam-001", "beam-015"],
    "videos": [
      {
        "id": "bm016-vid1",
        "title": "Split on Balance Beam — Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=split+on+balance+beam+gymnastics+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "intermediate", "split", "flexibility", "held element", "dance"]
  },
  {
    "id": "beam-017",
    "name": "Sissone on Beam",
    "technicalName": "Sissone",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "B",
    "difficultyTier": "Intermediate",
    "description": "A sissone is a ballet-derived jump on the beam where your daughter takes off from two feet and lands on one foot, with the other leg extended to the side or rear. It creates a brief split shape in the air. On the beam, the sissone is often used as a connecting element in jump series — two or three jumps linked together — which scores bonus points. Parents often see this as a quick small jump that transitions into a bigger leap.",
    "whatToLookFor": [
      "A clear two-foot takeoff — both feet leave the beam at the same moment",
      "A split shape in the air — legs separating visibly during the jump",
      "A one-foot landing in balance — her free leg stays extended rather than dropping immediately",
      "Pointed toes throughout the jump, both in the air and on landing",
      "The landing being controlled — she shouldn't wobble or put the free foot down for balance"
    ],
    "commonMistakes": [
      "A weak jump height — low jumps mean judges can't see the split shape clearly",
      "Both feet landing instead of just one (turns it into a different, lower-value skill)",
      "The free leg immediately dropping on landing instead of staying extended",
      "Flexed feet (toes up) which are always penalized on beam dance elements"
    ],
    "quickTipsChecklist": [
      { "id": "bm017-1", "cue": "Two-foot takeoff", "description": "Both feet push off the beam simultaneously" },
      { "id": "bm017-2", "cue": "Split shape in air", "description": "Legs clearly separate during the jump" },
      { "id": "bm017-3", "cue": "One-foot landing", "description": "Lands on one foot with the other leg extended" },
      { "id": "bm017-4", "cue": "Pointed toes throughout", "description": "Toes pointed from takeoff through landing" }
    ],
    "relatedSkillIds": ["beam-005", "beam-006", "beam-016"],
    "videos": [
      {
        "id": "bm017-vid1",
        "title": "Sissone on Balance Beam — Gymnastics Jump Series",
        "url": "https://www.youtube.com/results?search_query=sissone+balance+beam+gymnastics+jump+series+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "intermediate", "sissone", "jump", "dance element", "leap series", "connecting element"]
  },
  {
    "id": "beam-018",
    "name": "Side Aerial on Beam",
    "technicalName": "Aerial Cartwheel",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "E",
    "difficultyTier": "Elite",
    "description": "The side aerial (aerial cartwheel) is one of the most breathtaking beam skills you'll ever watch: your daughter does a full sideways cartwheel over the beam without her hands ever touching it. She launches off one foot, flies sideways through the air in a cartwheel-like arc, and lands back on the beam on two feet — all without touching her hands down. The crowd always reacts to this one. It requires not just flexibility and strength but extraordinary courage.",
    "whatToLookFor": [
      "A powerful push off the takeoff leg — she needs serious power to clear the beam without hands",
      "A high, arching flight path — you should see her body rise well above the beam",
      "A straight body in a clear cartwheel shape in the air (not bent or tucked)",
      "Both hands staying at her sides or in her arms — any hand touch on the beam is a fall",
      "A two-foot landing centered on the beam, not falling off to either side"
    ],
    "commonMistakes": [
      "Touching hands to the beam in panic — this is counted as a fall and is a major deduction",
      "Not enough height, causing the hips to brush the beam on the way over",
      "Over-rotating or under-rotating, causing a sideways landing off the beam",
      "A bent body shape in the air that loses the clean cartwheel line"
    ],
    "quickTipsChecklist": [
      { "id": "bm018-1", "cue": "Powerful one-foot launch", "description": "Strong push off creates the height needed to clear the beam" },
      { "id": "bm018-2", "cue": "Hands stay up", "description": "Hands never touch the beam — any touch is a fall" },
      { "id": "bm018-3", "cue": "Clear cartwheel arc", "description": "Her body makes a visible sideways arc over the beam" },
      { "id": "bm018-4", "cue": "Two-foot landing", "description": "Both feet land on the beam at the same time, centered" }
    ],
    "relatedSkillIds": ["beam-001", "beam-004", "beam-009"],
    "videos": [
      {
        "id": "bm018-vid1",
        "title": "Side Aerial on Balance Beam — Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=side+aerial+cartwheel+balance+beam+gymnastics+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "elite", "aerial", "cartwheel", "no-hands", "dramatic", "crowd favorite"]
  },
  {
    "id": "floor-014",
    "name": "Back Walkover",
    "technicalName": "Back Walkover",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "The back walkover is one of the most common skills you'll see young gymnasts practice — it's usually one of the first real acrobatic skills a Level 3 gymnast learns. Starting from a stand, your daughter arches backward, plants one hand then the other on the floor, kicks her legs over one at a time, and stands back up. Think of it as a bridge that keeps moving. It requires a good backbend (bridge) and the confidence to kick over backwards.",
    "whatToLookFor": [
      "A deep, fluid arch as she reaches back — not a sudden jerk backward",
      "Her eyes finding the floor behind her before her hands land (she should see where she's going)",
      "Hands landing sequentially — one at a time, not both at once",
      "Legs splitting wide as they pass over (the wider the better — more flexibility, better score)",
      "Standing up all the way with arms overhead, not hunching forward on the finish"
    ],
    "commonMistakes": [
      "Closing her eyes during the backbend — she needs to see the floor so her hands know where to go",
      "Bending her knees as the legs pass over, which collapses the clean line judges want to see",
      "Both hands landing simultaneously instead of sequentially (makes it look like a different, messier skill)",
      "Not finishing fully upright — stepping forward in a crouch instead of stretching tall"
    ],
    "quickTipsChecklist": [
      { "id": "f014-1", "cue": "Eyes find floor", "description": "She looks back and sees the mat before her hands land" },
      { "id": "f014-2", "cue": "Hands one at a time", "description": "Sequential hand placement, not a simultaneous plop" },
      { "id": "f014-3", "cue": "Straight legs over", "description": "Knees don't bend as legs pass overhead" },
      { "id": "f014-4", "cue": "Tall finish", "description": "Stands up fully with arms overhead, not hunching" }
    ],
    "relatedSkillIds": ["floor-001", "floor-015"],
    "videos": [
      {
        "id": "f014-vid1",
        "title": "Back Walkover Tutorial — Gymnastics for Beginners",
        "url": "https://www.youtube.com/results?search_query=back+walkover+gymnastics+tutorial+beginner+level+3",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "beginner", "back walkover", "level 3", "acrobatic", "bridge", "foundational"]
  },
  {
    "id": "floor-015",
    "name": "Front Walkover",
    "technicalName": "Front Walkover",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "The front walkover is the forward-facing companion to the back walkover — equally common at Level 3 and above. Your daughter kicks one leg up overhead, bridges forward, and walks her hands down while her legs pass over in a split, landing one foot at a time to stand up. It flows continuously forward and requires both flexibility (a good split position overhead) and strength (to push up from the bridge to standing). Judges love a big, split-legged version.",
    "whatToLookFor": [
      "A high kick to start — the lead leg should go up aggressively to power the skill",
      "Straight arms when hands contact the floor — bent arms collapse the bridge",
      "A clear split overhead — legs wide apart when directly above her (this is the most visible part)",
      "Landing one foot at a time, not both together (landing both together is the front handspring — a different skill)",
      "Standing up fully at the finish with arms raised, not bent-over"
    ],
    "commonMistakes": [
      "A weak kick that doesn't generate enough momentum to carry her over (she stalls in the bridge)",
      "Bent elbows when hands hit the floor, which can be an injury risk and is penalized",
      "A poor split overhead — legs close together looks messy and reduces the score",
      "Both feet landing at the same time — this changes it to a front handspring (different skill entirely)"
    ],
    "quickTipsChecklist": [
      { "id": "f015-1", "cue": "Aggressive kick", "description": "Lead leg kicks up high to power the skill over" },
      { "id": "f015-2", "cue": "Straight arms on floor", "description": "Elbows locked, not bent, when hands touch" },
      { "id": "f015-3", "cue": "Wide split at top", "description": "Legs split wide when directly overhead" },
      { "id": "f015-4", "cue": "One foot at a time", "description": "Steps down one foot then the other — not both together" }
    ],
    "relatedSkillIds": ["floor-014", "floor-016"],
    "videos": [
      {
        "id": "f015-vid1",
        "title": "Front Walkover Tutorial — Gymnastics",
        "url": "https://www.youtube.com/results?search_query=front+walkover+gymnastics+tutorial+beginner",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "beginner", "front walkover", "level 3", "level 4", "acrobatic", "flexibility"]
  },
  {
    "id": "floor-016",
    "name": "Front Handspring",
    "technicalName": "Front Handspring",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "B",
    "difficultyTier": "Beginner",
    "description": "The front handspring is like a supercharged front walkover — instead of stepping down one foot at a time, she snaps both feet down together with power, landing on two feet simultaneously. She runs, hurdles (a one-two step), throws her arms to the floor, kicks her legs overhead, and snaps down to an upright landing. It's often the first punch tumbling skill a gymnast learns, because it teaches the powerful snap-down action needed for all future front passes.",
    "whatToLookFor": [
      "A confident hurdle step going into the skill — this generates the power",
      "Straight arms the moment hands contact the floor — this is non-negotiable",
      "A tight body with legs together as they pass over (not split apart like a walkover)",
      "A sharp snap-down — both feet hitting the floor together with a visible snap of the body",
      "Standing upright on the landing — not crashing forward onto bent knees"
    ],
    "commonMistakes": [
      "Bending arms when hands hit the floor — this kills the power and risks the shoulders",
      "Legs split apart instead of together during the flight (makes it look like a front walkover instead)",
      "A slow, soft landing instead of a sharp snap-down — she should pop up not dribble down",
      "Not following through fully: landing in a deep crouch instead of an upright stand"
    ],
    "quickTipsChecklist": [
      { "id": "f016-1", "cue": "Straight arms on floor", "description": "Arms fully locked the instant hands contact the mat" },
      { "id": "f016-2", "cue": "Legs together over", "description": "Legs stay together as they pass overhead — not split" },
      { "id": "f016-3", "cue": "Sharp snap-down", "description": "Both feet hit the floor together with a powerful snap" },
      { "id": "f016-4", "cue": "Stand up tall", "description": "Arrives upright, not hunching forward in a crouch" }
    ],
    "relatedSkillIds": ["floor-015", "floor-001"],
    "videos": [
      {
        "id": "f016-vid1",
        "title": "Front Handspring Tutorial — Gymnastics Floor",
        "url": "https://www.youtube.com/results?search_query=front+handspring+gymnastics+floor+tutorial+beginner",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "beginner", "front handspring", "level 4", "level 5", "snap-down", "tumbling"]
  },
  {
    "id": "floor-017",
    "name": "Tuck Jump / Pike Jump",
    "technicalName": "Jump with Body Shape",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "These are the most fundamental jump elements in a floor routine — required at every level from 1 to Elite. A tuck jump: your daughter jumps straight up and pulls both knees tightly to her chest at the peak. A pike jump: she jumps and shoots both legs straight out in front of her (parallel to the floor) at the peak, body making an L-shape. They look simple but judges score them on height, shape precision, and pointed toes.",
    "whatToLookFor": [
      "A clear, visible jump height — low jumps mean there's no time to show the shape properly",
      "For tuck: knees pulled all the way to the chest, not just a small knee bend",
      "For pike: legs horizontal and completely straight, parallel to the floor — not a slight forward lean",
      "Pointed toes throughout the jump — flexed feet are always penalized",
      "Landing with control: feet together, slight knee bend to absorb impact"
    ],
    "commonMistakes": [
      "Low jump height that leaves no time to form the required shape",
      "Tuck: knees only halfway up to the chest (a lazy tuck)",
      "Pike: legs not fully extended or not horizontal — sagging toward the floor",
      "Flexed feet (toes pointing up) — a very common beginner error that costs points",
      "Landing with feet apart or stumbling"
    ],
    "quickTipsChecklist": [
      { "id": "f017-1", "cue": "Jump high first", "description": "Max height creates time to show the full shape" },
      { "id": "f017-2", "cue": "Full shape at peak", "description": "Knees to chest (tuck) or legs horizontal (pike) — not halfway" },
      { "id": "f017-3", "cue": "Pointed toes throughout", "description": "Toes pointed from takeoff through the shape and landing" },
      { "id": "f017-4", "cue": "Controlled landing", "description": "Both feet together with a soft knee bend" }
    ],
    "relatedSkillIds": ["floor-004", "floor-005", "floor-006"],
    "videos": [
      {
        "id": "f017-vid1",
        "title": "Tuck Jump and Pike Jump — Gymnastics Dance Elements Tutorial",
        "url": "https://www.youtube.com/results?search_query=tuck+jump+pike+jump+gymnastics+floor+dance+element+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "beginner", "tuck jump", "pike jump", "dance element", "jumps", "foundational", "level 1"]
  },
  {
    "id": "floor-018",
    "name": "Tour Jeté",
    "technicalName": "Tour Jeté (Half-Turn Jump)",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "C",
    "difficultyTier": "Intermediate",
    "description": "The tour jeté (pronounced toor zheh-TAY) is one of the most commonly seen leaps in competitive floor routines. Your daughter kicks one leg forward and upward while jumping off the other, completes a 180-degree half-turn in the air (rotating so she's facing the opposite direction), and lands on the leg she kicked forward. At its best it looks like a floating, turning split leap. If you've watched a floor routine and wondered 'what was that spinning jump?', it was probably this.",
    "whatToLookFor": [
      "A big, powerful jump height — the turn needs time and air to complete cleanly",
      "A clear split shape in the air — legs wide apart, both extended, during the turn",
      "The full 180-degree rotation completing before she lands (landing sideways means an incomplete turn)",
      "Pointed toes throughout — from the kick all the way through to landing",
      "A one-foot landing in control — not grabbing for balance or taking extra steps"
    ],
    "commonMistakes": [
      "An incomplete 180-degree turn — ending up facing 90 degrees instead of fully reversed",
      "Low jump height that leaves no time to show the split shape during the turn",
      "Legs not splitting wide in the air — a small or bent-leg jump is penalized",
      "Flexed feet on the front or back leg during the jump"
    ],
    "quickTipsChecklist": [
      { "id": "f018-1", "cue": "High jump", "description": "Big jump height creates time for the turn and split shape" },
      { "id": "f018-2", "cue": "Split shape during turn", "description": "Legs wide apart, both extended, while rotating" },
      { "id": "f018-3", "cue": "Full 180 rotation", "description": "She lands facing the opposite direction from takeoff" },
      { "id": "f018-4", "cue": "Pointed toes throughout", "description": "Feet pointed from the kick through the landing" }
    ],
    "relatedSkillIds": ["floor-004", "floor-005", "floor-007"],
    "videos": [
      {
        "id": "f018-vid1",
        "title": "Tour Jeté — Gymnastics Floor Leap Tutorial",
        "url": "https://www.youtube.com/results?search_query=tour+jete+gymnastics+floor+exercise+tutorial+leap",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "intermediate", "tour jete", "leap", "turn", "dance element", "180 turn"]
  },
  {
    "id": "floor-019",
    "name": "Double Arabian",
    "technicalName": "Double Arabian Salto",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "E",
    "difficultyTier": "Advanced",
    "description": "The double Arabian is a sophisticated tumbling pass that moves forward through the air — the opposite of a standard back-tumbling pass. Your daughter does a round-off and back handspring to build power (moving backward), then at the last moment performs a half-twist going into the air, which turns her to face forward, followed by two full front somersaults in a tucked or piked position. The combination of direction change and double rotation makes it a crowd favorite and a serious difficulty score.",
    "whatToLookFor": [
      "A powerful round-off and back handspring approach to build maximum speed",
      "A clean half-twist that turns her from backward-facing to forward-facing in the air",
      "Two clear, complete rotations in a tight tuck or pike position — not one and a half",
      "Opening out of the tuck before landing — uncurling too late leads to a crash",
      "A two-foot landing with controlled deceleration — this skill carries a lot of speed"
    ],
    "commonMistakes": [
      "Incomplete double rotation — landing after only 1.5 flips (a very common and risky error)",
      "A sloppy half-twist that leaves her body slightly off-axis, causing the somersaults to spin sideways",
      "An open (loose) tuck position that slows the rotation and makes completion harder",
      "Over-rotating and landing pitched forward — the forward-moving direction makes over-rotation possible too"
    ],
    "quickTipsChecklist": [
      { "id": "f019-1", "cue": "Powerful approach", "description": "Round-off and BHS build maximum speed going in" },
      { "id": "f019-2", "cue": "Clean half-twist", "description": "The direction change is sharp — she faces forward cleanly" },
      { "id": "f019-3", "cue": "Two complete rotations", "description": "Both flips complete before she opens to land" },
      { "id": "f019-4", "cue": "Open before landing", "description": "She uncurls from tuck in time to land safely on two feet" }
    ],
    "relatedSkillIds": ["floor-002", "floor-003", "floor-010"],
    "videos": [
      {
        "id": "f019-vid1",
        "title": "Double Arabian — Gymnastics Floor Exercise Tutorial",
        "url": "https://www.youtube.com/results?search_query=double+arabian+gymnastics+floor+exercise+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "advanced", "double arabian", "salto", "forward tumbling", "level 8", "level 9"]
  }
];

const updated = [...skills, ...newSkills];
fs.writeFileSync(skillsPath, JSON.stringify(updated, null, 2));
console.log('Done. Skills count:', updated.length);
