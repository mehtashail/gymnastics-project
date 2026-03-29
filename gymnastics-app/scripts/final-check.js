const s = require('../src/data/skills.json');
const direct = s.reduce((n, x) => n + x.videos.filter(v => v.url.includes('watch?v=')).length, 0);
const search = s.reduce((n, x) => n + x.videos.filter(v => v.url.includes('search_query=')).length, 0);
const bad = s.filter(x => x.videos.some(v => v.url.includes('watch?v=') === false && v.url.includes('search_query=') === false));

console.log('Total skills:', s.length);
console.log('Direct YouTube links:', direct, '(tap → goes straight to video)');
console.log('YouTube search links:', search, '(tap → opens YouTube with targeted search)');
console.log('Malformed URLs:', bad.length);

console.log('\nDirect links:');
s.forEach(function(x) {
  x.videos.filter(function(v) { return v.url.includes('watch?v='); }).forEach(function(v) {
    console.log(' ', x.name, '-', v.channel || 'unknown', '-', v.url.split('watch?v=')[1]);
  });
});
