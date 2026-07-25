import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('./utils/cron-converter', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils/cron-converter')>();
  let callCount = 0;
  return {
    ...actual,
    unixToQuartz: vi.fn((...args: Parameters<typeof actual.unixToQuartz>) => {
      callCount++;
      if (callCount === 1) {
        throw new Error('mocked unixToQuartz failure');
      }
      return actual.unixToQuartz(...args);
    }),
  };
});

import Cron from './cron';

describe('Cron — recovers when unixToQuartz throws on a Unix value', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders and logs an error instead of crashing', () => {
    const onChange = vi.fn();
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Cron
        value="*/5 * * * *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
        isUnix={true}
      />,
    );

    expect(screen.getByText('Minutes')).toBeInTheDocument();

    expect(consoleError).toHaveBeenCalledWith(
      'Error: converting Unix to Quartz:',
      expect.any(Error),
    );

    consoleError.mockRestore();
  });
});
