/**
 * Random sampling helpers for prebaked content banks.
 */

export const shuffle = (items) => {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Pick `count` unique items from bank (without replacement).
 * Reassigns sequential ids via optional mapId.
 */
export const pickRandom = (bank, count, mapId = null) => {
  if (!Array.isArray(bank) || bank.length === 0) return [];
  const n = Math.min(count, bank.length);
  const picked = shuffle(bank).slice(0, n);
  if (!mapId) return picked;
  return picked.map((item, idx) => mapId(item, idx));
};
