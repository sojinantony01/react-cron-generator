import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('./utils/cron-converter', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils/cron-converter')>();
  return {
    ...actual,
    quartzToUnix: vi.fn(() => {
      throw new Error('mocked quartzToUnix failure');
    }),
  };
});

import Cron from './cron';

describe('Cron — recovers when quartzToUnix throws during output conversion', () => {
  it('renders and logs an error instead of crashing', () => {
    const onChange = vi.fn();
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Cron
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
        isUnix={true}
      />,
    );

    expect(screen.getByText('Minutes')).toBeInTheDocument();

    expect(consoleError).toHaveBeenCalledWith(
      'Error converting Quartz to Unix:',
      expect.any(Error),
    );

    consoleError.mockRestore();
  });
});
