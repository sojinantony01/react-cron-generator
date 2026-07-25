import { describe, it, expect } from 'vitest';
import { unixToQuartz, quartzToUnix, detectCronFormat } from './cron-converter';

// ─────────────────────────────────────────────────────────────────────────────
// unixToQuartz
// ─────────────────────────────────────────────────────────────────────────────
describe('unixToQuartz', () => {
  it('throws on fewer than 5 fields', () => {
    expect(() => unixToQuartz('* * * *')).toThrow(
      'Invalid Unix cron expression. Expected 5 fields.',
    );
  });

  it('throws on more than 5 fields', () => {
    expect(() => unixToQuartz('0 * * * * *')).toThrow(
      'Invalid Unix cron expression. Expected 5 fields.',
    );
  });

  it('converts a basic every-minute expression (* * * * *)', () => {
    // Both day and dayOfWeek are * → dayOfWeek becomes ?
    expect(unixToQuartz('* * * * *')).toBe('0 * * * * ? *');
  });

  it('converts a specific minute/hour expression (5 8 * * *)', () => {
    expect(unixToQuartz('5 8 * * *')).toBe('0 5 8 * * ? *');
  });

  it('sets day to ? when day-of-week is specified (0 0 * * 1)', () => {
    // Unix DOW 1 = Monday → Quartz MON
    const result = unixToQuartz('0 0 * * 1');
    const parts = result.split(' ');
    expect(parts[3]).toBe('?'); // day field
    expect(parts[5]).toBe('MON');
  });

  it('sets day-of-week to ? when specific day-of-month is given (0 6 15 * *)', () => {
    const result = unixToQuartz('0 6 15 * *');
    const parts = result.split(' ');
    expect(parts[3]).toBe('15');
    expect(parts[5]).toBe('?');
  });

  it('converts Unix DOW 0 (Sunday) to Quartz SUN', () => {
    const result = unixToQuartz('0 0 * * 0');
    expect(result.split(' ')[5]).toBe('SUN');
  });

  it('converts Unix DOW 7 (also Sunday) to Quartz SUN', () => {
    const result = unixToQuartz('0 0 * * 7');
    expect(result.split(' ')[5]).toBe('SUN');
  });

  it('converts a Unix DOW range (1-5 = MON-FRI)', () => {
    const result = unixToQuartz('0 0 * * 1-5');
    expect(result.split(' ')[5]).toBe('MON-FRI');
  });

  it('converts a Unix DOW list (1,3,5)', () => {
    const result = unixToQuartz('0 0 * * 1,3,5');
    expect(result.split(' ')[5]).toBe('MON,WED,FRI');
  });

  it('converts a Unix DOW step value (*/2)', () => {
    const result = unixToQuartz('0 0 * * */2');
    expect(result.split(' ')[5]).toBe('*/2');
  });

  it('converts a Unix DOW step value with base (1/2)', () => {
    const result = unixToQuartz('0 0 * * 1/2');
    expect(result.split(' ')[5]).toBe('MON/2');
  });

  it('includes second (0) and year (*) fields in output', () => {
    const result = unixToQuartz('30 4 1 1 *');
    expect(result.startsWith('0 ')).toBe(true);
    expect(result.endsWith(' *')).toBe(true);
  });

  it('handles bang-separated DOW list (using ! separator)', () => {
    // Internal format uses ! as separator for multi-day
    const result = unixToQuartz('0 0 * * 1!3');
    expect(result.split(' ')[5]).toBe('MON!WED');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// quartzToUnix
// ─────────────────────────────────────────────────────────────────────────────
describe('quartzToUnix', () => {
  it('throws on fewer than 7 fields', () => {
    expect(() => quartzToUnix('0 * * * * ?')).toThrow(
      'Invalid Quartz cron expression. Expected 7 fields.',
    );
  });

  it('throws on more than 7 fields', () => {
    expect(() => quartzToUnix('0 * * * * ? * extra')).toThrow(
      'Invalid Quartz cron expression. Expected 7 fields.',
    );
  });

  it('converts a basic Quartz expression (0 * * * * ? *)', () => {
    // day=* and DOW=? → both become *
    expect(quartzToUnix('0 * * * * ? *')).toBe('* * * * *');
  });

  it('converts Quartz with specific DOW (0 0 8 ? * MON *)', () => {
    const result = quartzToUnix('0 0 8 ? * MON *');
    const parts = result.split(' ');
    expect(parts[4]).toBe('1'); // MON → Unix 1
    expect(parts[2]).toBe('*'); // day becomes *
  });

  it('converts Quartz DOW range (MON-FRI) to Unix (1-5)', () => {
    const result = quartzToUnix('0 0 0 ? * MON-FRI *');
    expect(result.split(' ')[4]).toBe('1-5');
  });

  it('converts Quartz SUN to Unix 0', () => {
    const result = quartzToUnix('0 0 0 ? * SUN *');
    expect(result.split(' ')[4]).toBe('0');
  });

  it('converts Quartz SAT to Unix 6', () => {
    const result = quartzToUnix('0 0 0 ? * SAT *');
    expect(result.split(' ')[4]).toBe('6');
  });

  it('converts Quartz with specific day-of-month (0 0 6 15 * ? *)', () => {
    const result = quartzToUnix('0 0 6 15 * ? *');
    const parts = result.split(' ');
    expect(parts[2]).toBe('15'); // day retained
    expect(parts[4]).toBe('*'); // DOW is *
  });

  it('handles Quartz DOW * and day ? (both become *)', () => {
    const result = quartzToUnix('0 30 8 ? * * *');
    const parts = result.split(' ');
    expect(parts[2]).toBe('*');
    expect(parts[4]).toBe('*');
  });

  it('converts Quartz numeric DOW (1 = Sunday in Quartz) to Unix 0', () => {
    const result = quartzToUnix('0 0 0 ? * 1 *');
    expect(result.split(' ')[4]).toBe('0');
  });

  it('converts Quartz DOW list (MON,WED,FRI) to Unix (1,3,5)', () => {
    const result = quartzToUnix('0 0 0 ? * MON,WED,FRI *');
    expect(result.split(' ')[4]).toBe('1,3,5');
  });

  it('converts Quartz DOW step (*/2) to Unix (*/2)', () => {
    const result = quartzToUnix('0 0 0 ? * */2 *');
    expect(result.split(' ')[4]).toBe('*/2');
  });

  it('round-trips Unix → Quartz → Unix', () => {
    const unix = '5 8 * * 1-5';
    expect(quartzToUnix(unixToQuartz(unix))).toBe(unix);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// detectCronFormat
// ─────────────────────────────────────────────────────────────────────────────
describe('detectCronFormat', () => {
  it('detects 5-field expression as unix', () => {
    expect(detectCronFormat('* * * * *')).toBe('unix');
  });

  it('detects 7-field expression as quartz', () => {
    expect(detectCronFormat('0 * * * * ? *')).toBe('quartz');
  });

  it('detects 6-field expression as quartz', () => {
    expect(detectCronFormat('0 * * * * ?')).toBe('quartz');
  });

  it('returns unknown for 4 fields', () => {
    expect(detectCronFormat('* * * *')).toBe('unknown');
  });

  it('returns unknown for 8 fields', () => {
    expect(detectCronFormat('0 * * * * ? * extra')).toBe('unknown');
  });

  it('returns unknown for empty string', () => {
    expect(detectCronFormat('')).toBe('unknown');
  });

  it('handles leading/trailing whitespace', () => {
    expect(detectCronFormat('  * * * * *  ')).toBe('unix');
  });

  it('handles extra internal spaces', () => {
    expect(detectCronFormat('0  *  *  *  *  ?  *')).toBe('quartz');
  });
});

describe('quartzToUnix — DOW step with named-day base', () => {
  it('converts Quartz DOW step with named base (MON/2) to Unix (1/2)', () => {
    const result = quartzToUnix('0 0 0 ? * MON/2 *');
    expect(result.split(' ')[4]).toBe('1/2');
  });

  it('converts Quartz DOW step with numeric base (2/2) to Unix (1/2)', () => {
    const result = quartzToUnix('0 0 0 ? * 2/2 *');
    expect(result.split(' ')[4]).toBe('1/2');
  });
});

describe('unixToQuartz — unknown DOW passthrough', () => {
  it('passes through an unknown DOW token unchanged', () => {
    const result = unixToQuartz('0 0 * * ABC');
    expect(result.split(' ')[5]).toBe('ABC');
  });
});

describe('quartzToUnix — DOW with ! separator', () => {
  it('converts a bang-separated Quartz DOW list to a comma-separated Unix list', () => {
    const result = quartzToUnix('0 0 0 ? * MON!WED *');
    expect(result.split(' ')[4]).toBe('1,3');
  });
});

describe('quartzToUnix — unknown Quartz DOW passthrough', () => {
  it('passes through an unknown Quartz DOW token unchanged', () => {
    const result = quartzToUnix('0 0 0 ? * XYZ *');
    expect(result.split(' ')[4]).toBe('XYZ');
  });
});
