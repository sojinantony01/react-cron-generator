import { describe, it, expect } from 'vitest';
import {
  compressWeekdays,
  expandWeekdays,
  compressMonthDays,
  expandMonthDays,
} from './range-compressor';

describe('compressWeekdays', () => {
  it('returns * for empty array', () => {
    expect(compressWeekdays([])).toBe('*');
  });

  it('returns single day unchanged', () => {
    expect(compressWeekdays(['MON'])).toBe('MON');
  });

  it('compresses consecutive days to a range', () => {
    expect(compressWeekdays(['MON', 'TUE', 'WED', 'THU'])).toBe('MON-THU');
  });

  it('compresses Mon-Fri to MON-FRI', () => {
    expect(compressWeekdays(['MON', 'TUE', 'WED', 'THU', 'FRI'])).toBe('MON-FRI');
  });

  it('compresses all 7 days', () => {
    expect(compressWeekdays(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])).toBe('SUN-SAT');
  });

  it('keeps non-consecutive days separate with !', () => {
    expect(compressWeekdays(['MON', 'WED', 'FRI'])).toBe('MON!WED!FRI');
  });

  it('non-consecutive selection with two possible sub-ranges keeps insertion order without compressing sub-runs', () => {
    // MON,TUE,THU,FRI are two separate consecutive sub-runs but not a single run —
    // insertion order is preserved with no range notation (matching Cypress constraint)
    expect(compressWeekdays(['MON', 'TUE', 'THU', 'FRI'])).toBe('MON!TUE!THU!FRI');
  });

  it('sorts days before compressing regardless of input order', () => {
    expect(compressWeekdays(['THU', 'MON', 'WED', 'TUE'])).toBe('MON-THU');
  });

  it('weekend days are not a range (SUN is index 0, SAT is index 6 — not adjacent)', () => {
    // SAT+SUN are not adjacent in the WEEK_DAYS array so they stay separated in insertion order
    expect(compressWeekdays(['SAT', 'SUN'])).toBe('SAT!SUN');
  });
});

describe('expandWeekdays', () => {
  it('returns empty array for *', () => {
    expect(expandWeekdays('*')).toEqual([]);
  });

  it('returns empty array for ?', () => {
    expect(expandWeekdays('?')).toEqual([]);
  });

  it('returns single day as array', () => {
    expect(expandWeekdays('MON')).toEqual(['MON']);
  });

  it('expands MON-THU range', () => {
    expect(expandWeekdays('MON-THU')).toEqual(['MON', 'TUE', 'WED', 'THU']);
  });

  it('expands MON-FRI range', () => {
    expect(expandWeekdays('MON-FRI')).toEqual(['MON', 'TUE', 'WED', 'THU', 'FRI']);
  });

  it('expands bang-separated list without ranges', () => {
    expect(expandWeekdays('MON!WED!FRI')).toEqual(['MON', 'WED', 'FRI']);
  });

  it('expands mixed ranges and individual days', () => {
    expect(expandWeekdays('MON-TUE!THU-FRI')).toEqual(['MON', 'TUE', 'THU', 'FRI']);
  });

  it('round-trips through compress then expand', () => {
    const days = ['MON', 'TUE', 'WED', 'THU'];
    expect(expandWeekdays(compressWeekdays(days))).toEqual(days);
  });
});

describe('compressMonthDays', () => {
  it('returns empty string for empty array', () => {
    expect(compressMonthDays([])).toBe('');
  });

  it('returns single day as string', () => {
    expect(compressMonthDays(['5'])).toBe('5');
  });

  it('compresses consecutive days to a range', () => {
    expect(compressMonthDays(['1', '2', '3', '4'])).toBe('1-4');
  });

  it('keeps non-consecutive days separate', () => {
    expect(compressMonthDays(['1', '3', '5'])).toBe('1!3!5');
  });

  it('non-consecutive selection with two possible sub-runs keeps insertion order without range notation', () => {
    // 1,2,3,5,6 are two sub-runs but not a single consecutive run —
    // days are kept in original insertion order with no range notation (matching Cypress constraint)
    expect(compressMonthDays(['1', '2', '3', '5', '6'])).toBe('1!2!3!5!6');
  });

  it('sorts numerically before compressing', () => {
    expect(compressMonthDays(['4', '2', '3', '1'])).toBe('1-4');
  });

  it('compresses full month range', () => {
    const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
    expect(compressMonthDays(days)).toBe('1-31');
  });
});

describe('expandWeekdays — non-weekday range fallback', () => {
  it('keeps a numeric-only range as-is when neither endpoint is a weekday name', () => {
    expect(expandWeekdays('1-5')).toEqual(['1-5']);
  });

  it('keeps an unknown range as-is', () => {
    expect(expandWeekdays('ABC-XYZ')).toEqual(['ABC-XYZ']);
  });
});

describe('expandMonthDays — non-numeric range fallback', () => {
  it('keeps a non-numeric range part as-is', () => {
    expect(expandMonthDays('L-3')).toEqual(['L-3']);
  });

  it('handles a bang-list where one segment is a non-numeric range', () => {
    expect(expandMonthDays('5!L-3!10')).toEqual(['5', 'L-3', '10']);
  });
});

describe('expandMonthDays — edge cases', () => {
  it('returns [] for empty string', () => {
    expect(expandMonthDays('')).toEqual([]);
  });

  it('skips empty parts from double-bang input', () => {
    expect(expandMonthDays('5!!10')).toEqual(['5', '10']);
  });
});
