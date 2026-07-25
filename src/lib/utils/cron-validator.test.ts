import { describe, it, expect } from 'vitest';
import { validateUnixCron, validateQuartzCron, validateCron } from './cron-validator';

// ─────────────────────────────────────────────────────────────────────────────
// validateUnixCron
// ─────────────────────────────────────────────────────────────────────────────
describe('validateUnixCron', () => {
  it('returns invalid for empty string', () => {
    expect(validateUnixCron('').isValid).toBe(false);
  });

  it('returns invalid for non-string', () => {
    expect(validateUnixCron(null as any).isValid).toBe(false);
  });

  it('returns invalid for wrong field count (4 fields)', () => {
    const r = validateUnixCron('* * * *');
    expect(r.isValid).toBe(false);
    expect(r.error).toMatch(/5 fields/);
  });

  it('returns invalid for wrong field count (6 fields)', () => {
    expect(validateUnixCron('* * * * * *').isValid).toBe(false);
  });

  it('accepts a valid all-wildcard expression', () => {
    expect(validateUnixCron('* * * * *')).toMatchObject({ isValid: true, format: 'unix' });
  });

  it('accepts a valid specific expression (5 4 * * 0)', () => {
    expect(validateUnixCron('5 4 * * 0')).toMatchObject({ isValid: true });
  });

  // Minute field
  it('rejects minute > 59', () => {
    const r = validateUnixCron('60 * * * *');
    expect(r.isValid).toBe(false);
    expect(r.error).toMatch(/minute/);
  });

  it('accepts minute as range (10-30)', () => {
    expect(validateUnixCron('10-30 * * * *').isValid).toBe(true);
  });

  it('accepts minute as step (*/5)', () => {
    expect(validateUnixCron('*/5 * * * *').isValid).toBe(true);
  });

  it('accepts minute as list (1,15,30)', () => {
    expect(validateUnixCron('1,15,30 * * * *').isValid).toBe(true);
  });

  it('rejects invalid minute list value (1,60,30)', () => {
    expect(validateUnixCron('1,60,30 * * * *').isValid).toBe(false);
  });

  // Hour field
  it('rejects hour > 23', () => {
    const r = validateUnixCron('* 24 * * *');
    expect(r.isValid).toBe(false);
    expect(r.error).toMatch(/hour/);
  });

  it('accepts hour range (8-18)', () => {
    expect(validateUnixCron('* 8-18 * * *').isValid).toBe(true);
  });

  // Day field
  it('rejects day 0', () => {
    const r = validateUnixCron('* * 0 * *');
    expect(r.isValid).toBe(false);
    expect(r.error).toMatch(/day/);
  });

  it('rejects day > 31', () => {
    expect(validateUnixCron('* * 32 * *').isValid).toBe(false);
  });

  it('accepts day 1-31', () => {
    expect(validateUnixCron('* * 15 * *').isValid).toBe(true);
  });

  // Month field
  it('rejects month 0', () => {
    expect(validateUnixCron('* * * 0 *').isValid).toBe(false);
  });

  it('rejects month > 12', () => {
    expect(validateUnixCron('* * * 13 *').isValid).toBe(false);
  });

  it('accepts month 1-12', () => {
    expect(validateUnixCron('* * * 6 *').isValid).toBe(true);
  });

  // Day-of-week field
  it('accepts DOW 0-7', () => {
    expect(validateUnixCron('* * * * 7').isValid).toBe(true);
    expect(validateUnixCron('* * * * 0').isValid).toBe(true);
  });

  it('rejects DOW > 7', () => {
    expect(validateUnixCron('* * * * 8').isValid).toBe(false);
  });

  // Step with invalid base
  it('rejects step with non-numeric base (e.g. abc/5)', () => {
    expect(validateUnixCron('abc/5 * * * *').isValid).toBe(false);
  });

  // Step with zero step
  it('rejects step value of 0 (*/0)', () => {
    expect(validateUnixCron('*/0 * * * *').isValid).toBe(false);
  });

  // Range errors
  it('rejects inverted range (50-10) in minute', () => {
    expect(validateUnixCron('50-10 * * * *').isValid).toBe(false);
  });

  it('rejects non-numeric range (a-b) in minute', () => {
    expect(validateUnixCron('a-b * * * *').isValid).toBe(false);
  });

  // Invalid plain value
  it('rejects non-numeric plain value', () => {
    expect(validateUnixCron('foo * * * *').isValid).toBe(false);
  });

  // List with range token
  it('accepts comma list containing ranges (1-5,10-15)', () => {
    expect(validateUnixCron('1-5,10-15 * * * *').isValid).toBe(true);
  });

  it('rejects comma list with out-of-range range token', () => {
    expect(validateUnixCron('1-5,10-65 * * * *').isValid).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// validateQuartzCron
// ─────────────────────────────────────────────────────────────────────────────
describe('validateQuartzCron', () => {
  it('returns invalid for empty string', () => {
    expect(validateQuartzCron('').isValid).toBe(false);
  });

  it('returns invalid for null', () => {
    expect(validateQuartzCron(null as any).isValid).toBe(false);
  });

  it('returns invalid for 5 fields', () => {
    const r = validateQuartzCron('* * * * *');
    expect(r.isValid).toBe(false);
    expect(r.error).toMatch(/6 or 7/);
  });

  it('accepts a valid 7-field expression', () => {
    expect(validateQuartzCron('0 0 8 ? * MON-FRI *')).toMatchObject({
      isValid: true,
      format: 'quartz',
    });
  });

  it('accepts a valid 6-field expression (no year)', () => {
    expect(validateQuartzCron('0 0 8 ? * MON-FRI')).toMatchObject({ isValid: true });
  });

  // Second field
  it('rejects second > 59', () => {
    expect(validateQuartzCron('60 * * * * ? *').isValid).toBe(false);
  });

  // Day field — Quartz special characters
  it('accepts L for last day of month', () => {
    expect(validateQuartzCron('0 0 0 L * ? *').isValid).toBe(true);
  });

  it('accepts LW for last weekday of month', () => {
    expect(validateQuartzCron('0 0 0 LW * ? *').isValid).toBe(true);
  });

  it('accepts L-n format (L-3)', () => {
    expect(validateQuartzCron('0 0 0 L-3 * ? *').isValid).toBe(true);
  });

  it('rejects L-0 (0 is not valid for L-n)', () => {
    expect(validateQuartzCron('0 0 0 L-0 * ? *').isValid).toBe(false);
  });

  it('rejects L-32 (too large for L-n)', () => {
    expect(validateQuartzCron('0 0 0 L-32 * ? *').isValid).toBe(false);
  });

  it('accepts nW format (15W)', () => {
    expect(validateQuartzCron('0 0 0 15W * ? *').isValid).toBe(true);
  });

  it('rejects 0W (day 0 is invalid for nW)', () => {
    expect(validateQuartzCron('0 0 0 0W * ? *').isValid).toBe(false);
  });

  it('rejects 32W (day 32 is invalid for nW)', () => {
    expect(validateQuartzCron('0 0 0 32W * ? *').isValid).toBe(false);
  });

  // Day-of-week field — Quartz special characters
  it('accepts named day (MON)', () => {
    expect(validateQuartzCron('0 0 0 ? * MON *').isValid).toBe(true);
  });

  it('accepts named day range (MON-FRI)', () => {
    expect(validateQuartzCron('0 0 0 ? * MON-FRI *').isValid).toBe(true);
  });

  it('accepts n#m format (2#3 = 3rd Tuesday)', () => {
    expect(validateQuartzCron('0 0 0 ? * 2#3 *').isValid).toBe(true);
  });

  it('rejects invalid n#m (day > 7)', () => {
    expect(validateQuartzCron('0 0 0 ? * 8#3 *').isValid).toBe(false);
  });

  it('rejects invalid n#m (occurrence > 5)', () => {
    expect(validateQuartzCron('0 0 0 ? * 2#6 *').isValid).toBe(false);
  });

  it('accepts nL format (6L = last Friday)', () => {
    expect(validateQuartzCron('0 0 0 ? * 6L *').isValid).toBe(true);
  });

  it('rejects invalid nL (day 0 is out of Quartz DOW range 1-7)', () => {
    expect(validateQuartzCron('0 0 0 ? * 0L *').isValid).toBe(false);
  });

  it('rejects invalid nL (day 8 is out of Quartz DOW range)', () => {
    expect(validateQuartzCron('0 0 0 ? * 8L *').isValid).toBe(false);
  });

  // DOW comma list with day names
  it('accepts comma list of day names (MON,WED,FRI)', () => {
    expect(validateQuartzCron('0 0 0 ? * MON,WED,FRI *').isValid).toBe(true);
  });

  it('accepts comma list with day-name ranges (MON-TUE,THU-FRI)', () => {
    expect(validateQuartzCron('0 0 0 ? * MON-TUE,THU-FRI *').isValid).toBe(true);
  });

  it('rejects invalid day name in comma list', () => {
    expect(validateQuartzCron('0 0 0 ? * MON,INVALID *').isValid).toBe(false);
  });

  // Year field (7th field)
  it('accepts valid year (2025)', () => {
    expect(validateQuartzCron('0 0 8 ? * MON 2025').isValid).toBe(true);
  });

  it('rejects year before 1970', () => {
    expect(validateQuartzCron('0 0 8 ? * MON 1969').isValid).toBe(false);
  });

  it('rejects year after 2099', () => {
    expect(validateQuartzCron('0 0 8 ? * MON 2100').isValid).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// validateCron (auto-detect)
// ─────────────────────────────────────────────────────────────────────────────
describe('validateCron', () => {
  it('returns invalid for empty string', () => {
    expect(validateCron('').isValid).toBe(false);
  });

  it('returns invalid for null', () => {
    expect(validateCron(null as any).isValid).toBe(false);
  });

  it('auto-detects and validates a 5-field Unix expression', () => {
    expect(validateCron('5 4 * * 0')).toMatchObject({ isValid: true, format: 'unix' });
  });

  it('auto-detects and validates a 7-field Quartz expression', () => {
    expect(validateCron('0 0 8 ? * MON-FRI *')).toMatchObject({ isValid: true, format: 'quartz' });
  });

  it('auto-detects and validates a 6-field Quartz expression', () => {
    expect(validateCron('0 0 8 ? * MON-FRI')).toMatchObject({ isValid: true, format: 'quartz' });
  });

  it('returns invalid for unsupported field count (3 fields)', () => {
    const r = validateCron('* * *');
    expect(r.isValid).toBe(false);
    expect(r.error).toMatch(/expected 5 \(Unix\) or 6-7 \(Quartz\)/);
  });

  it('returns invalid for unsupported field count (8 fields)', () => {
    expect(validateCron('0 0 0 ? * MON * extra').isValid).toBe(false);
  });

  it('returns error detail from field-level validation when invalid', () => {
    const r = validateCron('99 * * * *'); // minute 99 is invalid
    expect(r.isValid).toBe(false);
    expect(r.error).toBeTruthy();
  });
});


describe('validateQuartzCron — non-numeric, non-name token in DOW comma list', () => {
  it('rejects a DOW comma list containing a non-numeric, non-day-name token', () => {
    const r = validateQuartzCron('0 0 0 ? * 1,XYZ *');
    expect(r.isValid).toBe(false);
    expect(r.error).toMatch(/XYZ/);
  });
});
