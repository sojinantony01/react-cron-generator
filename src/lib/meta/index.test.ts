import { describe, it, expect } from 'vitest';
import { loadHeaders, HEADER, metadata } from './index';

describe('metadata', () => {
  it('exports all 6 tab metadata entries', () => {
    expect(metadata).toHaveLength(6);
  });

  it('includes correct initial cron for Minutes tab', () => {
    const m = metadata.find((t) => t.name === 'Minutes')!;
    expect(m.initialCron).toEqual(['0', '0/1', '*', '*', '*', '?', '*']);
  });

  it('includes correct initial cron for Hourly tab', () => {
    const m = metadata.find((t) => t.name === 'Hourly')!;
    expect(m.initialCron).toEqual(['0', '0', '00', '1/1', '*', '?', '*']);
  });

  it('includes correct initial cron for Weekly tab', () => {
    const m = metadata.find((t) => t.name === 'Weekly')!;
    expect(m.initialCron).toEqual(['0', '0', '00', '?', '*', '*', '*']);
  });

  it('includes correct initial cron for Monthly tab', () => {
    const m = metadata.find((t) => t.name === 'Monthly')!;
    expect(m.initialCron).toEqual(['0', '0', '00', '1', '1/1', '?', '*']);
  });
});

describe('loadHeaders', () => {
  it('returns all 6 default tabs when called with no options', () => {
    const headers = loadHeaders();
    expect(headers).toEqual(['Minutes', 'Hourly', 'Daily', 'Weekly', 'Monthly', 'Custom']);
  });

  it('returns filtered tabs when a subset of valid headers is provided', () => {
    const headers = loadHeaders({ headers: ['DAILY', 'WEEKLY'] });
    expect(headers).toEqual(['Daily', 'Weekly']);
  });

  it('returns a single-item array for a single header', () => {
    const headers = loadHeaders({ headers: ['CUSTOM'] });
    expect(headers).toEqual(['Custom']);
  });

  it('deduplicates headers when the same key appears twice', () => {
    const headers = loadHeaders({ headers: ['DAILY', 'DAILY', 'WEEKLY'] });
    expect(headers).toEqual(['Daily', 'Weekly']);
  });

  it('throws when options.headers is an empty array', () => {
    expect(() => loadHeaders({ headers: [] })).toThrow('Atleast one header is required.');
  });

  it('throws for an unknown header key', () => {
    expect(() => loadHeaders({ headers: ['UNKNOWN' as any] })).toThrow('Invalid header UNKNOWN');
  });

  it('returns all default tabs when options is provided without a headers key', () => {
    // options object exists but has no "headers" property
    const headers = loadHeaders({} as any);
    expect(headers).toEqual(['Minutes', 'Hourly', 'Daily', 'Weekly', 'Monthly', 'Custom']);
  });

  it('HEADER constant contains all six keys', () => {
    expect(Object.keys(HEADER)).toEqual([
      'MINUTES',
      'HOURLY',
      'DAILY',
      'WEEKLY',
      'MONTHLY',
      'CUSTOM',
    ]);
  });
});
