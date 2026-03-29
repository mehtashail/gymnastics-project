const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '../src/data/skills.json');
let skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));

// ─── STEP 1: Fix existing skills ─────────────────────────────────────────────

// Fix 1: floor-007 Triple Double — difficultyValue "J" is invalid; real FIG value is "H"
{
  const s = skills.find(x => x.id === 'floor-007');
  if (s) { s.difficultyValue = 'H'; console.log('Fixed floor-007 difficultyValue J → H'); }
}

// Fix 2: vault-009 Handspring with Half Twist — Beginner → Intermediate (Level 5-6 skill)
{
  const s = skills.find(x => x.id === 'vault-009');
  if (s) { s.difficultyTier = 'Intermediate'; console.log('Fixed vault-009 tier Beginner → Intermediate'); }
}

// Fix 3: vault-003 Yurchenko family — difficultyValue C → D (simplest Yurchenko is D)
{
  const s = skills.find(x => x.id === 'vault-003');
  if (s) { s.difficultyValue = 'D'; console.log('Fixed vault-003 difficultyValue C → D'); }
}

// Fix 4: floor-003 Back Layout — Beginner → Intermediate (Level 5-6 skill)
{
  const s = skills.find(x => x.id === 'floor-003');
  if (s) { s.difficultyTier = 'Intermediate'; console.log('Fixed floor-003 tier Beginner → Intermediate'); }
}

// Fix 5: beam-016 Split on Beam — Intermediate → Beginner (A value, Level 3-4)
{
  const s = skills.find(x => x.id === 'beam-016');
  if (s) { s.difficultyTier = 'Beginner'; console.log('Fixed beam-016 tier Intermediate → Beginner'); }
}

// Fix 6: bars-006 Pirouette — fix incorrect technicalName (Stalding and Endo are different skills)
{
  const s = skills.find(x => x.id === 'bars-006');
  if (s) {
    s.technicalName = 'Handstand Pirouette Turn';
    s.description = 'A pirouette on bars is a turn in the handstand position at the top of the bar. After casting to a handstand, your daughter pirouettes (turns) either a half-turn (180°) or a full turn (360°) while balancing in the handstand. The half-pirouette is used to change direction or transfer between skills, while the full pirouette is a difficulty element in itself. Parents often see these as the brief pause-and-spin at the top of the bar swing.';
    console.log('Fixed bars-006 technicalName and description');
  }
}

// Fix 7: bars-010 Shaposhnikova — Elite E → Advanced D (base Shaposhnikova is D)
{
  const s = skills.find(x => x.id === 'bars-010');
  if (s) {
    s.difficultyTier = 'Advanced';
    s.difficultyValue = 'D';
    console.log('Fixed bars-010 tier Elite E → Advanced D');
  }
}

// Fix 8: Merge beam-010 (Aerial Cartwheel) and beam-018 (Side Aerial) — same skill
// Keep beam-010 ID but upgrade to Advanced D with better combined description.
// Remove beam-018 and update any relatedSkillIds that reference it.
{
  const beam010 = skills.find(x => x.id === 'beam-010');
  if (beam010) {
    beam010.name = 'Aerial Cartwheel on Beam (Side Aerial)';
    beam010.technicalName = 'Aerial Cartwheel / Side Aerial';
    beam010.difficultyValue = 'D';
    beam010.difficultyTier = 'Advanced';
    beam010.description = 'The side aerial (also called aerial cartwheel) is one of the most breathtaking beam skills you will ever watch: your daughter does a full sideways cartwheel over the beam without her hands ever touching it. She launches off one foot, flies sideways through the air in a cartwheel-like arc, and lands back on the beam on two feet — all without touching her hands down. The crowd always reacts to this skill. It requires extraordinary courage and is a big step up from a regular cartwheel on beam.';
    beam010.whatToLookFor = [
      'A powerful push off the takeoff leg — she needs serious power to clear the beam without hands',
      'A high, arching flight path — you should see her body rise well above the beam',
      'A straight body in a clear cartwheel shape in the air (not bent or tucked)',
      'Both hands staying at her sides — any hand touch on the beam is scored as a fall',
      'A two-foot landing centered on the beam, not falling off to either side'
    ];
    beam010.commonMistakes = [
      'Touching hands to the beam in panic — this is counted as a fall and is a major deduction',
      'Not enough height, causing the hips to brush the beam on the way over',
      'Over-rotating or under-rotating, causing a sideways landing off the beam',
      'A bent body shape in the air that loses the clean cartwheel line'
    ];
    beam010.quickTipsChecklist = [
      { id: 'b010-1', cue: 'Powerful one-foot launch', description: 'Strong push-off creates the height needed to clear the beam' },
      { id: 'b010-2', cue: 'Hands stay up', description: 'Hands never touch the beam — any touch is a fall' },
      { id: 'b010-3', cue: 'Clear cartwheel arc', description: 'Her body makes a visible sideways arc over the beam' },
      { id: 'b010-4', cue: 'Two-foot landing', description: 'Both feet land on the beam at the same time, centered' }
    ];
    console.log('Updated beam-010 to Advanced D (merged with beam-018)');
  }
  // Remove beam-018 (duplicate)
  skills = skills.filter(x => x.id !== 'beam-018');
  // Fix any relatedSkillIds pointing to beam-018 → point to beam-010 instead
  skills.forEach(s => {
    if (s.relatedSkillIds && s.relatedSkillIds.includes('beam-018')) {
      s.relatedSkillIds = s.relatedSkillIds.map(id => id === 'beam-018' ? 'beam-010' : id);
      console.log('Updated relatedSkillIds in', s.id, 'beam-018 → beam-010');
    }
  });
}

// ─── STEP 2: Add missing priority-1 skills ───────────────────────────────────

const newSkills = [
  {
    "id": "bars-017",
    "name": "Pullover (Bar Mount)",
    "technicalName": "Pullover / Chin-up Mount",
    "apparatus": "uneven_bars",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "The pullover is literally the first bar skill almost every young gymnast learns — it is how they get onto the bar in the first place. Your daughter grabs the bar, kicks her legs up and over, and pulls her body up and over to end up on top of the bar with her hips resting against it. Think of it as a slow-motion somersault around the bar. At Level 1-3 meets, nearly every bar routine begins with a pullover mount.",
    "whatToLookFor": [
      "A strong grip on the bar with both hands before anything else happens",
      "A kick with one or both legs to generate upward momentum",
      "The hips rising and traveling over the bar — this is the core of the skill",
      "Her body ending in a front support position on top of the bar (belly over the bar, arms straight)",
      "Straight arms in the final front support position — not bent"
    ],
    "commonMistakes": [
      "Not kicking hard enough, causing the hips to stop at the bar rather than going over",
      "Belly-flopping over the bar rather than rotating smoothly — usually from insufficient kick",
      "Bent arms in the final front support position, which is a deduction",
      "Losing grip on the bar during the rotation — a safety concern and fall"
    ],
    "quickTipsChecklist": [
      { "id": "b017-1", "cue": "Strong grip", "description": "Both hands grip the bar firmly before starting" },
      { "id": "b017-2", "cue": "Kick powers the rotation", "description": "The leg kick carries hips up and over the bar" },
      { "id": "b017-3", "cue": "Hips clear the bar", "description": "Belly and hips travel all the way over to the other side" },
      { "id": "b017-4", "cue": "Straight arms at finish", "description": "Ends in front support with arms locked straight" }
    ],
    "relatedSkillIds": ["bars-003", "bars-014"],
    "videos": [
      {
        "id": "b017-vid1",
        "title": "Pullover on Bars — Level 1 Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=pullover+bars+gymnastics+level+1+tutorial+beginner",
        "type": "tutorial"
      }
    ],
    "tags": ["bars", "beginner", "pullover", "mount", "level 1", "level 2", "level 3", "foundational"]
  },
  {
    "id": "bars-018",
    "name": "Underswing Dismount",
    "technicalName": "Underswing / Sole Circle Dismount",
    "apparatus": "uneven_bars",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "The underswing dismount is one of the first dismounts young gymnasts learn from the low bar, commonly seen at Level 3-4 meets. From a hanging or support position, your daughter swings her feet up to the bar (toes touch the bar briefly), then swings forward and releases, flying off the bar to land on the mat. It looks like she's swinging on a swing set and then letting go at the right moment to land safely.",
    "whatToLookFor": [
      "A smooth swing into the skill — she shouldn't be stationary before the dismount",
      "Her feet rising up to touch or near the bar at the peak of the swing back",
      "A clean release at the right moment — not too early (won't clear the bar) or too late (drops down)",
      "A stretched, straight-body position in the air after releasing",
      "A two-foot landing with bent knees — not a crash forward"
    ],
    "commonMistakes": [
      "Releasing too early before the feet get to the bar, creating an uncontrolled fall",
      "Bent knees when the feet reach the bar, which reduces the clean line",
      "Landing with feet apart or stumbling forward significantly",
      "A piked or hunched body position in the air after release"
    ],
    "quickTipsChecklist": [
      { "id": "b018-1", "cue": "Feet up to bar", "description": "Toes reach up near the bar on the backswing" },
      { "id": "b018-2", "cue": "Release at peak of swing", "description": "Lets go as she swings forward and up, not too early" },
      { "id": "b018-3", "cue": "Straight body in air", "description": "Body is extended after releasing the bar" },
      { "id": "b018-4", "cue": "Soft two-foot landing", "description": "Both feet land together with bent knees" }
    ],
    "relatedSkillIds": ["bars-017", "bars-015"],
    "videos": [
      {
        "id": "b018-vid1",
        "title": "Underswing Dismount — Level 3 Bars Tutorial",
        "url": "https://www.youtube.com/results?search_query=underswing+dismount+gymnastics+bars+level+3+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["bars", "beginner", "dismount", "underswing", "level 3", "level 4"]
  },
  {
    "id": "bars-019",
    "name": "Flyaway Dismount (Tuck)",
    "technicalName": "Tucked Flyaway",
    "apparatus": "uneven_bars",
    "discipline": "WAG",
    "difficultyValue": "B",
    "difficultyTier": "Beginner",
    "description": "The tucked flyaway is the first version of the flyaway dismount that most Level 4 gymnasts compete. Unlike the layout flyaway (where the body stays straight), in the tuck version your daughter pulls her knees to her chest while she's flying through the air after releasing the bar, completing a backflip in a tight ball shape before opening up to land. You'll see this at nearly every Level 4 and some Level 5 meets — it is the most common bars dismount at those levels.",
    "whatToLookFor": [
      "A solid giant swing or tap swing leading into the dismount",
      "A clean release of both hands at the same moment",
      "Knees pulling tight to the chest immediately after release — forming a tight ball",
      "Opening out of the tuck (straightening) before her feet hit the mat",
      "A two-foot landing facing away from the bar — not still in a tuck, and not over-rotated"
    ],
    "commonMistakes": [
      "An incomplete tuck — knees barely lifted, making it look like a loose, uncontrolled fall",
      "Not opening from the tuck in time, causing a crash landing while still curled up",
      "Releasing the bar too early (before the tap), killing height and making the tuck rushed",
      "Landing facing the bar (over-rotation) instead of away from it"
    ],
    "quickTipsChecklist": [
      { "id": "b019-1", "cue": "Strong tap swing entry", "description": "Good swing into the dismount provides height" },
      { "id": "b019-2", "cue": "Tight tuck immediately", "description": "Knees pull to chest right after hands release" },
      { "id": "b019-3", "cue": "Open before landing", "description": "Legs extend out before feet hit the mat" },
      { "id": "b019-4", "cue": "Land facing away from bar", "description": "Lands on two feet facing away — not still spinning" }
    ],
    "relatedSkillIds": ["bars-015", "bars-018"],
    "videos": [
      {
        "id": "b019-vid1",
        "title": "Tucked Flyaway Dismount — Level 4 Gymnastics Bars",
        "url": "https://www.youtube.com/results?search_query=tuck+flyaway+dismount+gymnastics+bars+level+4+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["bars", "beginner", "dismount", "flyaway", "tuck", "level 4"]
  },
  {
    "id": "beam-019",
    "name": "Split Leap on Beam",
    "technicalName": "Split Leap / Grand Jeté",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "The split leap on beam is one of the most common beam dance elements you'll see at Level 4 and above — it's required in some form at almost every level. Your daughter runs a few steps, takes off from one foot, and kicks both legs into a full split shape in the air while traveling forward, then lands on one foot and continues. On the narrow beam, the balance required to take off and land in a straight line is enormous. It looks like a flying split.",
    "whatToLookFor": [
      "A clear split shape in the air — both legs extended and as close to 180 degrees apart as possible",
      "Good height off the beam — the leap needs airtime to show the split",
      "Pointed toes on both the front and back foot — flexed feet are always penalized",
      "Landing on one foot in a controlled position — not grabbing for balance immediately",
      "The leap staying on the beam's center line — veering sideways risks a fall"
    ],
    "commonMistakes": [
      "A small or bent-leg split in the air — the front or back leg doesn't reach full extension",
      "Flexed front foot (toes up) — very common and always penalized",
      "Low jump height that leaves no time to show the split clearly",
      "Landing off-center and having to step sideways to avoid falling off"
    ],
    "quickTipsChecklist": [
      { "id": "bm019-1", "cue": "Both legs fully extended", "description": "Front and back leg both reach as far as possible — no bent knees" },
      { "id": "bm019-2", "cue": "Pointed toes on both feet", "description": "Both feet pointed throughout the leap" },
      { "id": "bm019-3", "cue": "Good height", "description": "She rises off the beam visibly before coming down" },
      { "id": "bm019-4", "cue": "Controlled one-foot landing", "description": "Lands on one foot in balance, centered on the beam" }
    ],
    "relatedSkillIds": ["beam-004", "beam-017", "beam-015"],
    "videos": [
      {
        "id": "bm019-vid1",
        "title": "Split Leap on Balance Beam — Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=split+leap+balance+beam+gymnastics+tutorial+level+4",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "beginner", "split leap", "leap", "dance element", "level 4", "grand jete"]
  },
  {
    "id": "beam-020",
    "name": "Cat Leap on Beam",
    "technicalName": "Pas de Chat",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "The cat leap (officially called pas de chat, French for 'cat's step') is a small but very common jump seen on beam at Levels 3-5. Your daughter takes off from one foot, brings both knees up briefly in a turned-out position while in the air (like a cat jumping), and lands on two feet. It's often used as a connecting movement between other elements. Parents see this frequently and wonder why she does that quick little hop-with-bent-knees step.",
    "whatToLookFor": [
      "Both knees rising up simultaneously at the peak of the jump — forming a clear bent-leg shape",
      "A light, controlled takeoff and landing — this is a graceful connecting skill, not a power jump",
      "Pointed toes even with bent knees — the feet should still be pointed",
      "Landing softly on two feet with balance",
      "The skill flowing smoothly into the next element without a stop or wobble"
    ],
    "commonMistakes": [
      "Knees barely lifting — the shape needs to be clearly visible to judges",
      "Flexed feet (toes up) — even in this small jump, pointed feet are required",
      "A heavy, awkward landing that disrupts the routine's flow",
      "Looking down at the beam on the jump, which throws off balance"
    ],
    "quickTipsChecklist": [
      { "id": "bm020-1", "cue": "Knees up clearly", "description": "Both knees rise visibly at the peak of the jump" },
      { "id": "bm020-2", "cue": "Pointed toes", "description": "Feet remain pointed despite the bent knees" },
      { "id": "bm020-3", "cue": "Light landing", "description": "Soft, controlled two-foot landing — not heavy" },
      { "id": "bm020-4", "cue": "Flows into next skill", "description": "No pause or wobble after landing — continues the routine" }
    ],
    "relatedSkillIds": ["beam-017", "beam-019"],
    "videos": [
      {
        "id": "bm020-vid1",
        "title": "Cat Leap / Pas de Chat on Beam — Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=cat+leap+pas+de+chat+balance+beam+gymnastics+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "beginner", "cat leap", "pas de chat", "jump", "connecting element", "level 3", "level 4"]
  },
  {
    "id": "beam-021",
    "name": "Front Aerial on Beam",
    "technicalName": "Front Aerial Walkover",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "D",
    "difficultyTier": "Advanced",
    "description": "The front aerial walkover is the forward no-hands counterpart to the side aerial — instead of going sideways, your daughter walks over forward without hands, just like a front walkover but with no hands touching the beam. She kicks one leg aggressively forward and upward, arches over the beam in a split position in the air, and lands one foot at a time back on the beam. It's frequently confused with the side aerial by parents but is a completely different skill. Common at Level 7-9.",
    "whatToLookFor": [
      "A powerful kick with the leading leg to carry her body over — no hands means the kick must do all the work",
      "A clear split shape overhead — legs wide apart as they pass over",
      "No hands touching the beam — any touch counts as a fall",
      "Landing one foot at a time, in control — same footwork as a front walkover",
      "The skill staying on the beam's center line — not drifting sideways"
    ],
    "commonMistakes": [
      "An underpowered kick that stalls the skill — she can't complete the rotation without hands",
      "Reaching hands down to the beam in a panic (fall deduction)",
      "Landing both feet at the same time instead of one at a time — changes it to a different skill",
      "Drifting to one side and stepping off the beam on the landing"
    ],
    "quickTipsChecklist": [
      { "id": "bm021-1", "cue": "Powerful kick over", "description": "Aggressive lead leg kick carries the whole body over" },
      { "id": "bm021-2", "cue": "No hands touch beam", "description": "Both hands stay up — touching the beam is a fall" },
      { "id": "bm021-3", "cue": "Split shape overhead", "description": "Legs wide apart in the air over the beam" },
      { "id": "bm021-4", "cue": "One foot at a time landing", "description": "Steps down sequentially, not both feet simultaneously" }
    ],
    "relatedSkillIds": ["beam-002", "beam-010"],
    "videos": [
      {
        "id": "bm021-vid1",
        "title": "Front Aerial Walkover on Beam — Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=front+aerial+walkover+balance+beam+gymnastics+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "advanced", "front aerial", "aerial walkover", "no hands", "level 7", "level 8", "level 9"]
  },
  {
    "id": "floor-020",
    "name": "Round-off",
    "technicalName": "Round-off",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "The round-off is one of the most important skills in all of gymnastics because it converts forward-running momentum into backward power — which is exactly what's needed to do back handsprings and backflips. Your daughter runs forward, kicks into a cartwheel-like motion but snaps both feet down together instead of one at a time, ending up facing the direction she came from with both feet landing simultaneously. Almost every tumbling pass starts with a round-off. Level 1-3 gymnasts spend a large part of practice just working on their round-off.",
    "whatToLookFor": [
      "A strong hurdle (one-two approach step) into the round-off — this builds speed",
      "Straight arms when hands hit the floor — same as a cartwheel",
      "The body rotating sideways through the handstand position",
      "A sharp snap-down — both feet hitting the floor at the exact same moment (this is what separates it from a cartwheel)",
      "Finishing with her back to the direction she came from — she's reversed direction"
    ],
    "commonMistakes": [
      "Feet not landing simultaneously — one landing before the other makes it look like a sloppy cartwheel",
      "Bent arms on the floor contact — loses power and can be a safety issue",
      "A weak or slow snap-down — without a sharp snap the momentum dies and there's nothing left for the next skill",
      "Finishing with a body that isn't fully upright and ready to rebound into the next element"
    ],
    "quickTipsChecklist": [
      { "id": "f020-1", "cue": "Strong hurdle into round-off", "description": "A one-two step approach builds speed going in" },
      { "id": "f020-2", "cue": "Straight arms on floor", "description": "Arms locked when hands contact the mat" },
      { "id": "f020-3", "cue": "Both feet land together", "description": "The snap-down brings both feet to the mat at the same instant" },
      { "id": "f020-4", "cue": "Reversed direction at finish", "description": "She ends up facing where she started — fully reversed" }
    ],
    "relatedSkillIds": ["floor-001", "floor-021"],
    "videos": [
      {
        "id": "f020-vid1",
        "title": "Round-off Tutorial — Gymnastics Basics",
        "url": "https://www.youtube.com/results?search_query=round+off+gymnastics+tutorial+beginner+level+2+3",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "beginner", "round-off", "level 1", "level 2", "level 3", "foundational", "tumbling prerequisite"]
  },
  {
    "id": "floor-021",
    "name": "Back Handspring",
    "technicalName": "Back Handspring",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "A",
    "difficultyTier": "Beginner",
    "description": "The back handspring is one of the most iconic gymnastics skills — it's what most people picture when they think of a gymnast. Starting from standing, your daughter swings her arms, sits back like she's about to sit in a chair, then springs backward through the air placing her hands on the floor behind her and snapping her feet back down to land. It's like a very fast backward bridge that keeps moving. Gymnasts usually learn this at Level 3-4 and it becomes the backbone of all their tumbling. You'll also see it done in series — two, three, or more in a row.",
    "whatToLookFor": [
      "A powerful arm swing to initiate the skill — arms swinging backward drive the jump",
      "A jump up and backward — not just falling backward, but genuinely jumping",
      "Straight arms when hands contact the floor — no bending at the elbows",
      "A tight, hollow body as legs snap over and around",
      "A sharp, simultaneous two-foot landing — not one foot then the other"
    ],
    "commonMistakes": [
      "Just falling backward instead of jumping — this is one of the most common beginner mistakes and makes the skill look slow and dangerous",
      "Bending the arms when hands hit the floor, which collapses the skill and risks the wrists",
      "Looking backward and craning the neck — coaches want the head in a neutral position",
      "Feet landing one at a time instead of together — looks sloppy and kills the rebound"
    ],
    "quickTipsChecklist": [
      { "id": "f021-1", "cue": "Jump backward — don't fall", "description": "She should feel like she's jumping up and back, not just collapsing" },
      { "id": "f021-2", "cue": "Arms swing hard", "description": "Arm swing backward is what creates the backward momentum" },
      { "id": "f021-3", "cue": "Straight arms on floor", "description": "Elbows locked when hands contact the mat — no bending" },
      { "id": "f021-4", "cue": "Both feet land together", "description": "Snap-down brings both feet to the mat at the same time" }
    ],
    "relatedSkillIds": ["floor-001", "floor-020"],
    "videos": [
      {
        "id": "f021-vid1",
        "title": "Back Handspring Tutorial — Gymnastics for Beginners",
        "url": "https://www.youtube.com/results?search_query=back+handspring+gymnastics+tutorial+beginner+level+3",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "beginner", "back handspring", "BHS", "level 3", "level 4", "tumbling", "foundational"]
  },
  {
    "id": "floor-022",
    "name": "Back Layout with Half Twist",
    "technicalName": "Back Salto Layout 1/2",
    "apparatus": "floor_exercise",
    "discipline": "WAG",
    "difficultyValue": "C",
    "difficultyTier": "Intermediate",
    "description": "The back layout with half twist (often called a 'half' or 'layout half') is one of the most common tumbling elements you'll see at Level 6-8 meets. It's a back layout flip — straight body, no tuck — but in the middle of the flip she adds a 180-degree half-turn, so she lands facing the opposite direction from where she took off. The twist is smooth and controlled, not panicked. Parents at higher-level meets see this constantly but often think it's a full twist because the turn looks big in the air.",
    "whatToLookFor": [
      "A powerful round-off and back handspring leading in — speed fuels the layout",
      "The body staying completely straight and tight throughout — no piking or tucking at any point",
      "The half-turn happening smoothly in the middle of the flip — not jammed in awkwardly at the end",
      "Landing facing away from the direction of travel — completing the 180-degree turn",
      "A controlled landing on both feet — not stumbling from the twist"
    ],
    "commonMistakes": [
      "Piking (bending at the hips) during the layout — the body should be a straight plank throughout",
      "Twisting too early (right at takeoff) which makes the whole skill look off-balance",
      "Only completing a quarter-turn — ending up sideways instead of reversed",
      "Stumbling forward on the landing because the twist rotated the body off-axis"
    ],
    "quickTipsChecklist": [
      { "id": "f022-1", "cue": "Straight body throughout", "description": "No bending at the hips — body stays flat like a board" },
      { "id": "f022-2", "cue": "Twist is smooth and even", "description": "The half-turn flows naturally in the middle of the flip" },
      { "id": "f022-3", "cue": "Full 180 completed", "description": "She lands facing the opposite direction from takeoff" },
      { "id": "f022-4", "cue": "Controlled landing", "description": "Both feet land together with minimal extra steps" }
    ],
    "relatedSkillIds": ["floor-003", "floor-001", "floor-004"],
    "videos": [
      {
        "id": "f022-vid1",
        "title": "Layout Half Twist — Gymnastics Floor Tutorial",
        "url": "https://www.youtube.com/results?search_query=layout+half+twist+gymnastics+floor+tutorial+level+6+7",
        "type": "tutorial"
      }
    ],
    "tags": ["floor", "intermediate", "layout half", "half twist", "back salto", "level 6", "level 7", "level 8"]
  }
];

// Add new skills
skills = [...skills, ...newSkills];

// ─── Write updated file ───────────────────────────────────────────────────────
fs.writeFileSync(skillsPath, JSON.stringify(skills, null, 2));

// Print summary
const byApp = {};
skills.forEach(function(s) {
  if (!byApp[s.apparatus]) byApp[s.apparatus] = {};
  if (!byApp[s.apparatus][s.difficultyTier]) byApp[s.apparatus][s.difficultyTier] = [];
  byApp[s.apparatus][s.difficultyTier].push(s.name);
});
const order = ['vault','uneven_bars','balance_beam','floor_exercise'];
const tiers = ['Beginner','Intermediate','Advanced','Elite'];
console.log('\n=== UPDATED SKILL COUNTS ===');
order.forEach(function(app) {
  console.log('\n' + app.toUpperCase() + ':');
  tiers.forEach(function(t) {
    const list = byApp[app] && byApp[app][t] ? byApp[app][t] : [];
    if (list.length) console.log('  ' + t + ' (' + list.length + '):', list.join(', '));
  });
});
console.log('\nTotal skills:', skills.length);
