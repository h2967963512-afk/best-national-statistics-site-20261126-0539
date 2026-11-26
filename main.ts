// StatAtlas Japan — the hand-in program (Node 22, standard library only).
//
// The site is app/: plain static files a browser opens at app/index.html
// (ES modules, CSS, no build step), its content held in its own files —
// nothing it runs, styles or shows loads over the network. This program
// copies app/ and screenshots/ from beside this file to /output and writes
// /output/dossier.json, the summary the judge reads (the screenshots, the
// first load's files and bytes, and the site's source), with the vendored
// make.fun library. Leave vendor/makefun-frontend.ts as it is: the scorer
// requires dossier.json to be byte for byte what its own copy writes.
//
// Serve it locally with `node serve.ts`, then open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail fast instead of handing in a half-built entry: the site and its
// screenshots must be present before anything is copied.
const appDir = join(here, 'app');
const shotsDir = join(here, 'screenshots');
if (!statSync(join(appDir, 'index.html')).isFile()) {
  throw new Error('app/index.html is missing — the site is not built');
}
const shots = readdirSync(shotsDir).filter((f) => !f.startsWith('.') && statSync(join(shotsDir, f)).isFile());
if (shots.length < 3 || shots.length > 4) {
  throw new Error(`screenshots/ must hold 3 or 4 images, found ${shots.length}`);
}

mkdirSync(out, { recursive: true });
cpSync(appDir, join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(shotsDir)) cpSync(shotsDir, join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the bytes; the others refuse an entry the
// scorer would refuse (more than 4 screenshots or one over 256 KiB; more than 993 files and directories in app/ or
// 16 MiB of app files: app/ counts beside /output's own 1000-entry cap, its screenshots/ and dossier.json).
const dossierPath = join(out, 'dossier.json');
writeFileSync(
  dossierPath,
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

// Verify what was handed in instead of trusting the copies: the dossier must
// parse and name its schema, and /output must hold the site and every
// screenshot the entry promised. A half-written output fails loudly here,
// while the entry can still be fixed, rather than failing in the grader.
const dossier = JSON.parse(readFileSync(dossierPath, 'utf8'));
if (typeof dossier !== 'object' || dossier === null || !('schema' in dossier) || !('text' in dossier)) {
  throw new Error('dossier.json did not parse into a dossier — refusing to hand in a broken output');
}
if (!statSync(join(out, 'app', 'index.html')).isFile()) {
  throw new Error('/output/app/index.html is missing after the copy');
}
for (const shot of shots) {
  if (!statSync(join(out, 'screenshots', shot)).isFile()) {
    throw new Error(`/output/screenshots/${shot} is missing after the copy`);
  }
}
console.log(`handed in ${shots.length} screenshots, dossier ${statSync(dossierPath).size} bytes`);
