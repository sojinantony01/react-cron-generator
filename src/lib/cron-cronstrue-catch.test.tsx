import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('cronstrue/i18n', () => ({
  default: {
    toString: vi.fn(() => {
      throw new Error('mocked cronstrue failure');
    }),
  },
}));

import Cron from './cron';

describe('Cron — recovers when cronstrue throws during human-readable text generation', () => {
  it('renders and logs a warning instead of crashing', () => {
    const onChange = vi.fn();
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Cron onChange={onChange} showResultText={true} showResultCron={false} />);

    expect(screen.getByText('Minutes')).toBeInTheDocument();

    expect(consoleWarn).toHaveBeenCalledWith('Failed to parse cron expression:', expect.any(Error));

    consoleWarn.mockRestore();
  });
});
