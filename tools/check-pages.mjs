// Every page of the manual (*.md in the root, except README.md and AGENTS.md) has front matter with a title, a nav_order
// that no other page has, and a permalink /name/ that no other page has. Run by .github/workflows/check.yml:
//   node tools/check-pages.mjs
import { readdirSync, readFileSync } from 'node:fs';

const problems = [];
const seen = { nav_order: new Map(), permalink: new Map() };
for (const file of readdirSync('.').filter((f) => f.endsWith('.md') && !['README.md', 'AGENTS.md'].includes(f)).sort()) {
    const match = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) {
        problems.push(`${file}: no front matter (--- title, nav_order, permalink ---)`);
        continue;
    }
    const fields = Object.fromEntries(match[1].split(/\r?\n/).map((line) => line.match(/^([a-z_]+):\s*(.*)$/)).filter(Boolean).map((m) => [m[1], m[2].trim()]));
    if (!fields.title) problems.push(`${file}: no title`);
    if (!/^\d+$/.test(fields.nav_order ?? '')) problems.push(`${file}: nav_order is not a number (${fields.nav_order ?? 'missing'})`);
    if (!/^\/([a-z0-9-]+\/)?$/.test(fields.permalink ?? '')) problems.push(`${file}: permalink must be /name/ (${fields.permalink ?? 'missing'})`);
    for (const key of ['nav_order', 'permalink']) {
        if (!fields[key]) continue;
        if (seen[key].has(fields[key])) problems.push(`${file}: ${key} ${fields[key]} is also used by ${seen[key].get(fields[key])}`);
        else seen[key].set(fields[key], file);
    }
}
if (problems.length) {
    console.error(problems.join('\n'));
    process.exit(1);
}
console.log(`${seen.permalink.size} pages: titles, menu order and addresses in order`);
