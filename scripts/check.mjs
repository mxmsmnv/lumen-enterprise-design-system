import fs from 'node:fs';
import vm from 'node:vm';

const required = ['index.html','404.html','styles.css','docs.css','app.js','tokens.json','README.md','favicon.svg','assets/wellness-hero.png'];
const failures = [];
for (const file of required) if (!fs.existsSync(file) || fs.statSync(file).size === 0) failures.push(`Missing required file: ${file}`);

const app = fs.readFileSync('app.js','utf8');
const html = fs.readFileSync('index.html','utf8');
const docs = fs.readFileSync('docs.css','utf8');
const styles = fs.readFileSync('styles.css','utf8');
try { new vm.Script(app); } catch (error) { failures.push(`JavaScript syntax: ${error.message}`); }
try { JSON.parse(fs.readFileSync('tokens.json','utf8')); } catch (error) { failures.push(`tokens.json: ${error.message}`); }

const contracts = [
  ['hash routing', "addEventListener('hashchange'"],
  ['component search', 'data-catalog-search'],
  ['sidebar search', 'data-sidebar-search'],
  ['isolated examples', 'isolatedExamples(path)'],
  ['device previews', 'data-preview-device'],
  ['local theme previews', 'data-preview-theme'],
  ['code reveal', 'data-show-code'],
  ['copy action', 'data-copy-code'],
  ['accessibility guidance', 'guideline-list']
];
for (const [name, marker] of contracts) if (!app.includes(marker) && !docs.includes(marker)) failures.push(`Missing contract: ${name}`);
if (!html.includes('docs.css') || !html.includes('styles.css')) failures.push('Documentation and library CSS layers must both load.');
if (!styles.includes('prefers-reduced-motion')) failures.push('Reduced motion contract is missing.');
if (!styles.includes('[data-theme="dark"]')) failures.push('Dark theme contract is missing.');
if (!(docs + styles).includes('24.375rem') || !(docs + styles).includes('48rem')) failures.push('Phone/tablet preview widths are missing.');

const forbidden = [/kislovodsk/i,/plaza\.spa/i,/ПЛАЗА/i];
for (const pattern of forbidden) if (pattern.test(app + html + docs + styles)) failures.push(`Forbidden source-brand marker: ${pattern}`);

const registrySource = app.slice(0, app.indexOf('const meta'));
const routeMatches = [...registrySource.matchAll(/\['[^']+','([^']+)'\]/g)].map(match => match[1]);
if (new Set(routeMatches).size < 45) failures.push('Catalog route coverage is below 45 unique entries.');

if (failures.length) {
  console.error(failures.map(item => `✗ ${item}`).join('\n'));
  process.exit(1);
}
console.log(`✓ Lumen catalog contract passed · ${new Set(routeMatches).size} registered routes · isolated previews, search, themes and responsive controls present`);
