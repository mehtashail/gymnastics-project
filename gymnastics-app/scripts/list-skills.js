const skills = require('../src/data/skills.json');
const byApparatus = {};
skills.forEach(s => {
  if (!byApparatus[s.apparatus]) byApparatus[s.apparatus] = [];
  byApparatus[s.apparatus].push({id: s.id, name: s.name, tier: s.difficultyTier, value: s.difficultyValue});
});
Object.entries(byApparatus).forEach(([app, list]) => {
  console.log('\n' + app.toUpperCase() + ' (' + list.length + ')');
  list.forEach(s => console.log('  ' + s.id + ' | ' + s.tier + ' ' + s.value + ' | ' + s.name));
});
console.log('\nTOTAL:', skills.length);

// Check for duplicates
const ids = skills.map(s => s.id);
const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dups.length) console.log('\nDUPLICATE IDs:', dups);

// Check tiers
const tierCounts = {};
skills.forEach(s => {
  const key = s.apparatus + '|' + s.difficultyTier;
  tierCounts[key] = (tierCounts[key] || 0) + 1;
});
console.log('\nTIER BREAKDOWN:');
Object.entries(tierCounts).sort().forEach(([k,v]) => console.log(' ', k, '->', v));
