/**
 * Utilities for compressing consecutive selections into range notation.
 *
 * E.g. MON!TUE!WED!THU  →  MON-THU
 *      1!2!3!5!6         →  1-3!5-6
 */

const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/**
 * Compress an array of consecutive weekday names into range strings.
 * Non-consecutive groups remain comma/bang-separated; consecutive runs use "-".
 *
 * @param days - Array of weekday abbreviations, e.g. ['MON','TUE','WED','THU']
 * @returns Compressed string, e.g. "MON-THU"
 */
export const compressWeekdays = (days: string[]): string => {
  if (days.length === 0) return '*';
  if (days.length === 1) return days[0];

  // Sort by canonical week order
  const sorted = [...days].sort((a, b) => WEEK_DAYS.indexOf(a) - WEEK_DAYS.indexOf(b));

  const groups: string[][] = [];
  let current: string[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prevIdx = WEEK_DAYS.indexOf(sorted[i - 1]);
    const currIdx = WEEK_DAYS.indexOf(sorted[i]);
    if (currIdx === prevIdx + 1) {
      current.push(sorted[i]);
    } else {
      groups.push(current);
      current = [sorted[i]];
    }
  }
  groups.push(current);

  return groups.map((g) => (g.length > 1 ? `${g[0]}-${g[g.length - 1]}` : g[0])).join('!');
};

/**
 * Expand a compressed weekday string back to individual day names.
 * Handles both "MON-THU" ranges and "MON!WED" bang-separated lists.
 *
 * @param compressed - e.g. "MON-THU" or "MON!WED!FRI"
 * @returns Array of individual day abbreviations, e.g. ['MON','TUE','WED','THU']
 */
export const expandWeekdays = (compressed: string): string[] => {
  if (!compressed || compressed === '*' || compressed === '?') return [];

  const parts = compressed.split('!');
  const result: string[] = [];

  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-');
      const startIdx = WEEK_DAYS.indexOf(start);
      const endIdx = WEEK_DAYS.indexOf(end);
      if (startIdx !== -1 && endIdx !== -1 && endIdx >= startIdx) {
        for (let i = startIdx; i <= endIdx; i++) {
          result.push(WEEK_DAYS[i]);
        }
      } else {
        // Not a weekday range — keep as-is (e.g. numeric or unknown)
        result.push(part);
      }
    } else {
      result.push(part);
    }
  }

  return result;
};

/**
 * Expand a compressed month-day string back to individual day numbers.
 * Handles `!`-joined lists and `-` ranges.
 *
 * e.g. "10-12"   → ['10','11','12']
 *      "1!5-7"   → ['1','5','6','7']
 *      "5!10!15" → ['5','10','15']
 */
export const expandMonthDays = (compressed: string): string[] => {
  if (!compressed) return [];
  const result: string[] = [];
  for (const part of compressed.split('!')) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-');
      const start = Number(startStr);
      const end = Number(endStr);
      if (!isNaN(start) && !isNaN(end)) {
        for (let d = start; d <= end; d++) result.push(String(d));
      } else {
        result.push(part); // non-numeric range — keep as-is
      }
    } else if (part) {
      result.push(part);
    }
  }
  return result;
};

/**
 * Compress an array of numeric day-of-month values into range strings.
 *
 * @param days - Array of day strings, e.g. ['1','2','3','5','6']
 * @returns Compressed string, e.g. "1-3!5-6"
 */
export const compressMonthDays = (days: string[]): string => {
  if (days.length === 0) return '';
  if (days.length === 1) return days[0];

  const nums = days.map(Number).sort((a, b) => a - b);

  const groups: number[][] = [];
  let current: number[] = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] + 1) {
      current.push(nums[i]);
    } else {
      groups.push(current);
      current = [nums[i]];
    }
  }
  groups.push(current);

  return groups.map((g) => (g.length > 1 ? `${g[0]}-${g[g.length - 1]}` : `${g[0]}`)).join('!');
};
