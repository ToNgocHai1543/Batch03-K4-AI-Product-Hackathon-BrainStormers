/**
 * Verify AI citations against PDF_PAGES / known PDF map (pages 1–29).
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { PDF_PAGES } from '../src/data/citationMap.js';
import {
  RECAP_BANK,
  BRIDGE_LINK_BANK,
  CHECKLIST_BANK,
  QUIZ_BANK,
} from '../src/data/bridgeContentBank.js';
import { COURSE_DAYS } from '../src/data/courseData.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const issues = [];

const extractSlides = (text) => {
  const out = [];
  const re = /slide\s*([\d\s,\-–]+)/gi;
  let m;
  while ((m = re.exec(String(text || ''))) !== null) {
    const nums = m[1].match(/\d+/g) || [];
    // Expand ranges like 23-24 when two consecutive numbers appear with a dash between them
    const raw = m[1];
    const range = raw.match(/(\d+)\s*[-–]\s*(\d+)/);
    if (range) {
      const a = Number(range[1]);
      const b = Number(range[2]);
      for (let p = Math.min(a, b); p <= Math.max(a, b); p += 1) out.push(p);
      // also keep any other comma-separated numbers outside the range pair
      for (const n of nums) {
        const v = Number(n);
        if (v !== a && v !== b) out.push(v);
      }
    } else {
      for (const n of nums) out.push(Number(n));
    }
  }
  return [...new Set(out)];
};

const checkRange = (label, text) => {
  for (const p of extractSlides(text)) {
    if (p < 1 || p > 29) issues.push(`${label}: out-of-range slide ${p}`);
  }
};

// Expected topic → pages (from citationMap)
const topicExpect = {
  Day01: PDF_PAGES.Day01,
  Day02: PDF_PAGES.Day02,
};

// 1) courseData keyConcepts + summary + slides subtitles
for (const day of COURSE_DAYS) {
  for (const k of day.keyConcepts || []) {
    checkRange(`${day.code} keyConcept ${k.name}`, k.citation);
  }
  checkRange(`${day.code} summary`, day.summaryContent);
  for (const s of day.slides || []) {
    const jump = s.pdfPage || s.page;
    const m = String(s.subtitle || '').match(/Slide\s+(\d+)/i);
    if (m && s.pdfPage && Number(m[1]) !== s.pdfPage) {
      // Allow multi-cite subtitles like "Slide 13, 27" or "Slide 23-24"
      const nums = extractSlides(s.subtitle);
      if (!nums.includes(s.pdfPage)) {
        issues.push(
          `${day.code} subtitle vs pdfPage: "${s.title}" subtitle cites [${nums}] pdfPage=${s.pdfPage}`
        );
      }
    }
    if (jump < 1 || jump > 29) {
      issues.push(`${day.code} slide jump OOB: ${s.title} -> ${jump}`);
    }
  }
}

// 2) content banks
for (const [name, bank] of [
  ['RECAP', RECAP_BANK],
  ['BRIDGE', BRIDGE_LINK_BANK],
  ['CHECKLIST', CHECKLIST_BANK],
  ['QUIZ', QUIZ_BANK],
]) {
  bank.forEach((item, i) => checkRange(`${name}[${i}]`, JSON.stringify(item)));
}

// 3) llmService KNOWLEDGE_BASE (parse source text — not exported)
const llmSrc = readFileSync(join(root, 'src/services/llmService.js'), 'utf8');
const kbBlock = llmSrc.match(/const KNOWLEDGE_BASE = \[([\s\S]*?)\n\];/);
if (!kbBlock) {
  issues.push('Could not parse KNOWLEDGE_BASE from llmService.js');
} else {
  const slidePagesBlocks = [...kbBlock[1].matchAll(/slidePages:\s*\[([^\]]+)\]/g)];
  slidePagesBlocks.forEach((m, i) => {
    const pages = m[1].split(',').map((x) => Number(x.trim())).filter((n) => !Number.isNaN(n));
    for (const p of pages) {
      if (p < 1 || p > 29) issues.push(`KB[${i}] slidePages OOB ${p}`);
    }
  });
  checkRange('KB content', kbBlock[1]);
}

// 4) Known wrong legacy numbers that should NOT appear as topic citations
const forbiddenPairs = [
  [/Cost-of-[Ee]rror[^\n]{0,80}slide\s*22/, 'Cost-of-Error must not cite slide 22 (use 15/17)'],
  [/Double Diamond[^\n]{0,80}slide\s*16/, 'Double Diamond must not cite slide 16 (use 3/4)'],
  [/Temperature[^\n]{0,80}slide\s*1[89]/, 'Temperature must not cite old condensed page'],
  [/Prompt 4[^\n]{0,80}slide\s*15/, 'Prompt 4 must cite 28 not 15'],
  [/Lost in the [Mm]iddle[^\n]{0,80}[Ss]lide\s*20/, 'Lost-in-middle subtitle should be 14 not 20'],
];

const corpus = [
  llmSrc,
  readFileSync(join(root, 'src/data/courseData.js'), 'utf8'),
  readFileSync(join(root, 'src/data/bridgeContentBank.js'), 'utf8'),
].join('\n');

for (const [re, msg] of forbiddenPairs) {
  if (re.test(corpus)) issues.push(`LEGACY: ${msg}`);
}

// 5) Sanity: every PDF_PAGES value in 1..29
for (const [day, topics] of Object.entries(topicExpect)) {
  for (const [topic, pages] of Object.entries(topics)) {
    for (const p of pages) {
      if (p < 1 || p > 29) issues.push(`citationMap ${day}.${topic} OOB ${p}`);
    }
  }
}

console.log('=== Citation verification ===');
console.log(`Issues: ${issues.length}`);
issues.forEach((x) => console.log(' -', x));
if (issues.length) process.exit(1);
console.log('OK — no citation issues found.');
