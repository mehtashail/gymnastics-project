const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '../src/data/skills.json');
const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));

let passed = 0;
let failed = 0;

function check(label, condition, detail) {
  if (condition) {
    console.log(`PASS: ${label}`);
    passed++;
  } else {
    console.log(`FAIL: ${label}${detail ? ' — ' + detail : ''}`);
    failed++;
  }
}

// 1. Total skill count
check('93 total skills', skills.length === 93, `got ${skills.length}`);

// 2. No duplicate IDs
const ids = skills.map(s => s.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
check('No duplicate IDs', dupes.length === 0, dupes.join(', '));

// 3. XG coverage per apparatus — minimum counts
const xgByApp = {
  vault: skills.filter(s => s.apparatus === 'vault' && s.tags.includes('xcel-gold')).length,
  uneven_bars: skills.filter(s => s.apparatus === 'uneven_bars' && s.tags.includes('xcel-gold')).length,
  balance_beam: skills.filter(s => s.apparatus === 'balance_beam' && s.tags.includes('xcel-gold')).length,
  floor_exercise: skills.filter(s => s.apparatus === 'floor_exercise' && s.tags.includes('xcel-gold')).length,
};
check('XG vault coverage (≥1)', xgByApp.vault >= 1, `got ${xgByApp.vault}`);
check('XG bars coverage (≥6)', xgByApp.uneven_bars >= 6, `got ${xgByApp.uneven_bars}`);
check('XG beam coverage (≥5)', xgByApp.balance_beam >= 5, `got ${xgByApp.balance_beam}`);
check('XG floor coverage (≥4)', xgByApp.floor_exercise >= 4, `got ${xgByApp.floor_exercise}`);

// 4. XP A/B-only restriction: no xcel-platinum skill has C+ difficulty
const invalidXP = skills.filter(s =>
  s.tags.includes('xcel-platinum') &&
  !['A', 'B'].includes(s.difficultyValue)
);
check(
  'XP A/B-only restriction (no C+ difficulty on XP skills)',
  invalidXP.length === 0,
  invalidXP.map(s => `${s.id}(${s.difficultyValue})`).join(', ')
);

// 5. b-level consistency: every b-level skill has difficultyValue === 'B'
const wrongBLevel = skills.filter(s =>
  s.tags.includes('b-level') && s.difficultyValue !== 'B'
);
check(
  'b-level only on B-value skills',
  wrongBLevel.length === 0,
  wrongBLevel.map(s => `${s.id}(dv=${s.difficultyValue})`).join(', ')
);

// 6. XG bars structural: kip, circling skill, dismount
const xgBars = skills.filter(s => s.apparatus === 'uneven_bars' && s.tags.includes('xcel-gold'));
const hasKip = xgBars.some(s => s.tags.includes('kip'));
const hasCircle = xgBars.some(s => s.tags.some(t => t.includes('circle')));
const hasDismount = xgBars.some(s => s.tags.includes('dismount'));
check('XG bars has kip skill', hasKip);
check('XG bars has circling skill', hasCircle);
check('XG bars has dismount', hasDismount);

// 7. XG beam turn requirement
const xgBeam = skills.filter(s => s.apparatus === 'balance_beam' && s.tags.includes('xcel-gold'));
const hasBeamTurn = xgBeam.some(s => s.tags.some(t => t === 'turn' || t === 'pirouette' || t === 'full turn' || t === 'wolf turn'));
check('XG beam has 360° turn skill', hasBeamTurn);

// 8. XG floor has connected acro pass (tumbling pass tag)
const xgFloor = skills.filter(s => s.apparatus === 'floor_exercise' && s.tags.includes('xcel-gold'));
const hasTumblingPass = xgFloor.some(s => s.tags.includes('tumbling pass'));
check('XG floor has tumbling pass', hasTumblingPass);

// 9. XG floor has turn
const hasFloorTurn = xgFloor.some(s => s.tags.some(t => t === 'turn' || t === 'full turn' || t === 'wolf turn' || t === 'pirouette'));
check('XG floor has turn requirement', hasFloorTurn);

// 10. New skills have all required fields
const requiredFields = ['id', 'name', 'technicalName', 'apparatus', 'discipline', 'difficultyValue',
  'difficultyTier', 'description', 'whatToLookFor', 'commonMistakes', 'quickTipsChecklist',
  'relatedSkillIds', 'videos', 'tags'];
const newSkillIds = ['bars-024', 'beam-026', 'floor-028', 'floor-029', 'floor-030'];
newSkillIds.forEach(id => {
  const skill = skills.find(s => s.id === id);
  if (!skill) {
    check(`New skill ${id} exists`, false, 'not found in skills.json');
    return;
  }
  const missingFields = requiredFields.filter(f =>
    skill[f] === undefined ||
    skill[f] === '' ||
    (Array.isArray(skill[f]) && skill[f].length === 0)
  );
  check(`New skill ${id} has all required fields`, missingFields.length === 0, missingFields.join(', '));
});

// 11. Specific b-level IDs are correctly tagged
const expectedBLevel = ['vault-009', 'bars-002', 'bars-006', 'bars-011', 'bars-019',
  'beam-002', 'beam-005', 'beam-007', 'beam-017', 'beam-024', 'floor-003', 'floor-009',
  'floor-013', 'floor-016', 'floor-025', 'floor-029'];
expectedBLevel.forEach(id => {
  const skill = skills.find(s => s.id === id);
  const hasBLevel = skill && skill.tags.includes('b-level');
  check(`${id} has b-level tag`, hasBLevel, skill ? `tags: ${skill.tags.join(', ')}` : 'not found');
});

console.log(`\n=== Verification complete: ${passed} passed, ${failed} failed ===`);
process.exit(failed > 0 ? 1 : 0);