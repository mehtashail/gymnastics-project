const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '../src/data/skills.json');
let skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));

// ─── Fix existing entries ─────────────────────────────────────────────────────

// Fix vault-003: name says "Yurchenko (Round-off Entry)" but content describes Yurchenko Layout
{
  const s = skills.find(x => x.id === 'vault-003');
  if (s) {
    s.name = 'Yurchenko Layout';
    s.technicalName = 'Yurchenko Layout / Back Salto Stretched';
    s.description = 'The Yurchenko Layout is the standard Yurchenko vault that Level 7-8 gymnasts compete. Your daughter performs the distinctive Yurchenko entry — a round-off onto the springboard followed by a back handspring onto the vault table — then launches off in a completely straight body position (no tucking or bending) and backflips to land. The "layout" refers to the straight, fully extended body in the air after the table. Almost all elite vault families use this same entry, making this vault the gateway to the entire Yurchenko world.';
    // Update tags
    s.tags = ['vault', 'intermediate', 'yurchenko', 'layout', 'level 7', 'level 8', 'round-off entry'];
    console.log('Fixed vault-003: renamed to Yurchenko Layout');
  }
}

// Fix vault-008: technicalName says "Straddle On, Jump Off" but should be "Straddle Vault"
{
  const s = skills.find(x => x.id === 'vault-008');
  if (s) {
    s.technicalName = 'Straddle Vault';
    console.log('Fixed vault-008 technicalName: Straddle On Jump Off → Straddle Vault');
  }
}

// ─── Add 3 remaining missing skills ──────────────────────────────────────────

const newSkills = [
  {
    "id": "beam-024",
    "name": "Front Walkover on Beam",
    "technicalName": "Front Walkover",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "B",
    "difficultyTier": "Intermediate",
    "description": "The front walkover on beam is a required skill at Level 5 and commonly seen through Level 7. Your daughter kicks one leg up and forward, bridges over the beam with both hands touching, and steps down one foot at a time — the exact same motion as a floor front walkover, but on a 4-inch wide surface. The challenge is keeping everything centered on the beam while in a fully inverted bridge position. Parents at Level 5-6 meets see this in nearly every beam routine.",
    "whatToLookFor": [
      "A powerful kick with the lead leg — more kick means more control through the handstand position",
      "Both hands landing flat and centered on the beam, shoulder-width apart",
      "A clear split overhead — legs wide apart at the top of the walkover",
      "Landing one foot at a time — stepping out of the walkover, not snapping both feet down",
      "Staying centered on the beam throughout — no drifting to one side during the inversion"
    ],
    "commonMistakes": [
      "A weak kick that stalls the skill in the bridge position on the beam (dangerous and very common)",
      "Hands landing off-center on the beam, causing a sideways lean",
      "Both feet landing simultaneously — which changes it to a front handspring on beam (a different, harder skill)",
      "Losing balance and stepping off the beam on the hand placement or step-down"
    ],
    "quickTipsChecklist": [
      { "id": "bm024-1", "cue": "Powerful kick over", "description": "Strong lead leg kick carries her all the way through the walkover" },
      { "id": "bm024-2", "cue": "Centered hand placement", "description": "Both hands flat on the beam, centered, not off to one side" },
      { "id": "bm024-3", "cue": "Split at the top", "description": "Legs wide apart when directly over the beam" },
      { "id": "bm024-4", "cue": "One foot at a time", "description": "Steps down sequentially — front foot, then back foot" }
    ],
    "relatedSkillIds": ["beam-002", "beam-021", "beam-004"],
    "videos": [
      {
        "id": "bm024-vid1",
        "title": "Front Walkover on Balance Beam — Level 5 Tutorial",
        "url": "https://www.youtube.com/results?search_query=front+walkover+balance+beam+gymnastics+level+5+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "intermediate", "front walkover", "level 5", "level 6", "level 7", "acrobatic"]
  },
  {
    "id": "beam-025",
    "name": "Switch Leap on Beam",
    "technicalName": "Switch Split Leap",
    "apparatus": "balance_beam",
    "discipline": "WAG",
    "difficultyValue": "C",
    "difficultyTier": "Intermediate",
    "description": "The switch leap on beam is one of the most common dance elements at Level 6-8 and is distinct from the Switch Ring Leap (which requires a dramatic back-bend ring position). In the switch leap, your daughter takes off from one foot in a split leap position and then switches her legs in the air — front leg sweeps back, back leg sweeps forward — so she lands in the opposite split. This 'switching' of the legs in midair is what gives the skill both its name and its visual appeal. A required dance element at many optional levels, it's performed in nearly every competitive beam routine above Level 5.",
    "whatToLookFor": [
      "A clear first split position as she takes off — she needs to show the initial split before the switch",
      "A visible switch of the legs — both legs change position in the air",
      "The second split position also being clear — judges need to see two distinct split shapes",
      "Good height — the switch cannot happen without sufficient air time",
      "A controlled one-foot landing — not grabbing for balance on the beam after landing"
    ],
    "commonMistakes": [
      "Insufficient height that leaves no time to show both split positions",
      "A barely visible switch — legs trading positions so slowly that judges can't count two distinct shapes",
      "Flexed feet on either the takeoff or landing leg",
      "Landing and immediately losing balance — the beam is unforgiving if the landing foot isn't precisely centered"
    ],
    "quickTipsChecklist": [
      { "id": "bm025-1", "cue": "Show first split", "description": "Initial split is clear before the switch happens" },
      { "id": "bm025-2", "cue": "Visible leg switch", "description": "Both legs trade positions clearly in the air" },
      { "id": "bm025-3", "cue": "Good height", "description": "Enough air time to show both split positions" },
      { "id": "bm025-4", "cue": "Pointed toes throughout", "description": "Feet pointed from takeoff through landing" }
    ],
    "relatedSkillIds": ["beam-019", "beam-008", "beam-017"],
    "videos": [
      {
        "id": "bm025-vid1",
        "title": "Switch Leap on Balance Beam — Gymnastics Tutorial",
        "url": "https://www.youtube.com/results?search_query=switch+leap+balance+beam+gymnastics+level+6+7+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["beam", "intermediate", "switch leap", "dance element", "leap", "level 6", "level 7", "level 8"]
  },
  {
    "id": "bars-023",
    "name": "Toe-on Circle to Handstand",
    "technicalName": "Toe-on Circle / Toe Hecht",
    "apparatus": "uneven_bars",
    "discipline": "WAG",
    "difficultyValue": "C",
    "difficultyTier": "Advanced",
    "description": "The toe-on circle (also called a toe hecht in some coaching traditions) is a circling skill where your daughter hooks her toes over the bar in a piked position, swings through under the bar forward, and rises up to a handstand. The 'toe-on' refers to the toes hooking over the bar at the beginning of the circle, which gives the gymnast extra leverage to complete the rotation. It's a staple of Level 7-8 bar routines, and parents at upper-JO meets see it constantly as a transition element that lets gymnasts link skills together.",
    "whatToLookFor": [
      "A clean toe-on position at the start — toes hooking over the bar, body piked",
      "A smooth forward swing under the bar with good body tension",
      "Rising into a handstand at the finish — not just returning to a cast but arriving fully vertical",
      "A continuous, uninterrupted rotation — no stalling mid-circle",
      "Toes leaving the bar cleanly as she rises to handstand — no snagging"
    ],
    "commonMistakes": [
      "Toes not hooking over the bar cleanly, causing the skill to fail before it starts",
      "Stalling at the bottom of the swing because of insufficient body tension",
      "Not rising all the way to a handstand — stopping short in a cast position",
      "Snagging toes on the bar as she rotates up, which disrupts the handstand finish"
    ],
    "quickTipsChecklist": [
      { "id": "b023-1", "cue": "Toes hook over bar", "description": "Both toes hook cleanly over the bar at the start" },
      { "id": "b023-2", "cue": "Tight body tension", "description": "Core and legs braced through the forward swing" },
      { "id": "b023-3", "cue": "Rise to full handstand", "description": "Arrives at vertical handstand at the top — not half-way" },
      { "id": "b023-4", "cue": "Clean toe release", "description": "Toes leave the bar smoothly as she rises up" }
    ],
    "relatedSkillIds": ["bars-016", "bars-022", "bars-002"],
    "videos": [
      {
        "id": "b023-vid1",
        "title": "Toe-on Circle to Handstand — Gymnastics Bars Tutorial",
        "url": "https://www.youtube.com/results?search_query=toe+on+circle+handstand+gymnastics+bars+level+7+8+tutorial",
        "type": "tutorial"
      }
    ],
    "tags": ["bars", "advanced", "toe-on", "circle", "handstand", "level 7", "level 8", "transition"]
  }
];

skills = [...skills, ...newSkills];

// Write updated file
fs.writeFileSync(skillsPath, JSON.stringify(skills, null, 2));

// Print final summary
const byApp = {};
skills.forEach(function(s) {
  if (!byApp[s.apparatus]) byApp[s.apparatus] = {};
  if (!byApp[s.apparatus][s.difficultyTier]) byApp[s.apparatus][s.difficultyTier] = [];
  byApp[s.apparatus][s.difficultyTier].push(s.name);
});
const order = ['vault','uneven_bars','balance_beam','floor_exercise'];
const tiers = ['Beginner','Intermediate','Advanced','Elite'];
console.log('\n=== FINAL SKILL DATABASE ===');
order.forEach(function(app) {
  console.log('\n' + app.toUpperCase() + ':');
  let total = 0;
  tiers.forEach(function(t) {
    const list = byApp[app] && byApp[app][t] ? byApp[app][t] : [];
    if (list.length) {
      console.log('  ' + t + ' (' + list.length + '):', list.join(', '));
      total += list.length;
    }
  });
  console.log('  Subtotal:', total);
});
console.log('\nGRAND TOTAL:', skills.length);
