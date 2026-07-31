import {
  RECAP_BANK,
  BRIDGE_LINK_BANK,
  CHECKLIST_BANK,
  QUIZ_BANK,
  BANK_STATS
} from './bridgeContentBank.js';
import { pickRandom } from '../utils/sampleBank.js';

export { BANK_STATS };

const DEFAULTS = {
  recap: 5,
  bridgeLinks: 3,
  checklist: 3,
  quiz: 3
};

/**
 * Build a Happy-Path-style bridge payload by randomly sampling the fixed banks.
 */
export const sampleBridgeBundle = (counts = {}) => {
  const cfg = { ...DEFAULTS, ...counts };

  const recap = pickRandom(RECAP_BANK, cfg.recap, (item, idx) => ({
    ...item,
    id: idx + 1
  }));

  const bridgeLinks = pickRandom(BRIDGE_LINK_BANK, cfg.bridgeLinks, (item, idx) => ({
    ...item,
    id: `b${idx + 1}`
  }));

  const checklist = pickRandom(CHECKLIST_BANK, cfg.checklist, (item, idx) => ({
    ...item,
    id: `ck${idx + 1}`,
    done: false
  }));

  const quiz = pickRandom(QUIZ_BANK, cfg.quiz, (item, idx) => ({
    ...item,
    id: `q${idx + 1}`
  }));

  return {
    pathName: 'Happy Path (Chuẩn)',
    status: 'success',
    badgeClass: 'badge-happy',
    confidenceScore: 0.95,
    recap,
    bridgeLinks,
    checklist,
    quiz,
    sampledFromBank: true,
    bankStats: BANK_STATS
  };
};

/**
 * Random quiz set only (for "Sinh Quiz AI" button).
 */
export const sampleQuizSet = (count = 3) =>
  pickRandom(QUIZ_BANK, count, (item, idx) => ({
    ...item,
    id: `q${idx + 1}`
  }));
