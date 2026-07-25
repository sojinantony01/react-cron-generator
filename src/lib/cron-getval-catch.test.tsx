import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('./utils/cron-converter', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils/cron-converter')>();
  return {
    ...actual,
    unixToQuartz: vi.fn(() => {
      throw new Error('mocked unixToQuartz failure (always)');
    }),
  };
});

import Cron from './cron';

describe('Cron — recovers when unixToQuartz throws in the display path', () => {
  it('renders and logs a warning instead of crashing', () => {
    const onChange = vi.fn();
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <Cron
        value="*/5 * * * *"
        onChange={onChange}
        showResultText={true}
        showResultCron={false}
        isUnix={true}
      />,
    );

    expect(screen.getByText('Minutes')).toBeInTheDocument();

    expect(consoleWarn).toHaveBeenCalledWith(
      'Failed to convert Unix to Quartz for parsing:',
      expect.any(Error),
    );

    consoleError.mockRestore();
    consoleWarn.mockRestore();
  });
});
