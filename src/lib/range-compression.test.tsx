/**
 * Component-level tests for range compression behaviour (issue #27).
 *
 * These tests drive the Cron component the same way a user would — by
 * clicking checkboxes on the Weekly tab and clicking days on the Monthly
 * multi-day picker — and then assert that the cron string emitted via
 * `onChange` uses compressed range notation (e.g. MON-THU) rather than
 * listing every day individually (MON,TUE,WED,THU).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Cron from './cron';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Navigate to the Weekly tab and return the userEvent instance. */
async function openWeeklyTab() {
  const user = userEvent.setup();
  const weeklyTab = screen.getByLabelText('Select Weekly tab');
  await user.click(weeklyTab);
  await waitFor(() => expect(weeklyTab).toHaveClass('active'));
  return user;
}

/** Navigate to the Monthly tab and return the userEvent instance. */
async function openMonthlyTab() {
  const user = userEvent.setup();
  const monthlyTab = screen.getByLabelText('Select Monthly tab');
  await user.click(monthlyTab);
  await waitFor(() => expect(monthlyTab).toHaveClass('active'));
  return user;
}

/** Extract just the day-of-week field (index 5) from a 7-field Quartz string. */
function dowField(cronStr: string) {
  return cronStr.trim().split(/\s+/)[5];
}

/** Extract just the day-of-month field (index 3) from a 7-field Quartz string. */
function domField(cronStr: string) {
  return cronStr.trim().split(/\s+/)[3];
}

// ---------------------------------------------------------------------------
// Weekly tab — range compression
// ---------------------------------------------------------------------------

describe('Weekly tab — range compression', () => {
  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  it('emits a single day name when only one day is checked', async () => {
    render(<Cron onChange={onChange} showResultText={false} showResultCron={true} />);
    const user = await openWeeklyTab();

    await user.click(screen.getByRole('checkbox', { name: /monday/i }));

    await waitFor(() => {
      const lastCall = onChange.mock.calls.at(-1)?.[0] as string;
      expect(dowField(lastCall)).toBe('MON');
    });
  });

  it('compresses two consecutive days to a range (MON–TUE → MON-TUE)', async () => {
    render(<Cron onChange={onChange} showResultText={false} showResultCron={true} />);
    const user = await openWeeklyTab();

    await user.click(screen.getByRole('checkbox', { name: /monday/i }));
    await user.click(screen.getByRole('checkbox', { name: /tuesday/i }));

    await waitFor(() => {
      const lastCall = onChange.mock.calls.at(-1)?.[0] as string;
      expect(dowField(lastCall)).toBe('MON-TUE');
    });
  });

  it('compresses Mon–Thu (4 consecutive days) to MON-THU', async () => {
    render(<Cron onChange={onChange} showResultText={false} showResultCron={true} />);
    const user = await openWeeklyTab();

    await user.click(screen.getByRole('checkbox', { name: /monday/i }));
    await user.click(screen.getByRole('checkbox', { name: /tuesday/i }));
    await user.click(screen.getByRole('checkbox', { name: /wednesday/i }));
    await user.click(screen.getByRole('checkbox', { name: /thursday/i }));

    await waitFor(() => {
      const lastCall = onChange.mock.calls.at(-1)?.[0] as string;
      expect(dowField(lastCall)).toBe('MON-THU');
    });
  });

  it('compresses Mon–Fri (5 consecutive weekdays) to MON-FRI', async () => {
    render(<Cron onChange={onChange} showResultText={false} showResultCron={true} />);
    const user = await openWeeklyTab();

    await user.click(screen.getByRole('checkbox', { name: /monday/i }));
    await user.click(screen.getByRole('checkbox', { name: /tuesday/i }));
    await user.click(screen.getByRole('checkbox', { name: /wednesday/i }));
    await user.click(screen.getByRole('checkbox', { name: /thursday/i }));
    await user.click(screen.getByRole('checkbox', { name: /friday/i }));

    await waitFor(() => {
      const lastCall = onChange.mock.calls.at(-1)?.[0] as string;
      expect(dowField(lastCall)).toBe('MON-FRI');
    });
  });

  it('does NOT compress non-consecutive days (MON, WED, FRI stay comma-separated)', async () => {
    render(<Cron onChange={onChange} showResultText={false} showResultCron={true} />);
    const user = await openWeeklyTab();

    await user.click(screen.getByRole('checkbox', { name: /monday/i }));
    await user.click(screen.getByRole('checkbox', { name: /wednesday/i }));
    await user.click(screen.getByRole('checkbox', { name: /friday/i }));

    await waitFor(() => {
      const lastCall = onChange.mock.calls.at(-1)?.[0] as string;
      // Internal separator is ! which becomes , in the output cron string
      expect(dowField(lastCall)).toBe('MON,WED,FRI');
    });
  });

  it('splits into two separate ranges when there is a gap (MON-TUE and THU-FRI)', async () => {
    render(<Cron onChange={onChange} showResultText={false} showResultCron={true} />);
    const user = await openWeeklyTab();

    await user.click(screen.getByRole('checkbox', { name: /monday/i }));
    await user.click(screen.getByRole('checkbox', { name: /tuesday/i }));
    await user.click(screen.getByRole('checkbox', { name: /thursday/i }));
    await user.click(screen.getByRole('checkbox', { name: /friday/i }));

    await waitFor(() => {
      const cronDisplay = screen.getByLabelText('Cron expression');
      expect(cronDisplay.textContent).toContain('MON-TUE,THU-FRI');
    });
  });

  it('reverts to a single day after unchecking reduces to one (MON-TUE → uncheck TUE → MON)', async () => {
    render(<Cron onChange={onChange} showResultText={false} showResultCron={true} />);
    const user = await openWeeklyTab();

    // Select two consecutive days
    await user.click(screen.getByRole('checkbox', { name: /monday/i }));
    await user.click(screen.getByRole('checkbox', { name: /tuesday/i }));
    // Uncheck one
    await user.click(screen.getByRole('checkbox', { name: /tuesday/i }));

    await waitFor(() => {
      const lastCall = onChange.mock.calls.at(-1)?.[0] as string;
      expect(dowField(lastCall)).toBe('MON');
    });
  });

  it('correctly unchecks a day from inside an existing range (MON-THU → uncheck WED → MON-TUE,THU)', async () => {
    render(<Cron onChange={onChange} showResultText={false} showResultCron={true} />);
    const user = await openWeeklyTab();

    await user.click(screen.getByRole('checkbox', { name: /monday/i }));
    await user.click(screen.getByRole('checkbox', { name: /tuesday/i }));
    await user.click(screen.getByRole('checkbox', { name: /wednesday/i }));
    await user.click(screen.getByRole('checkbox', { name: /thursday/i }));

    // Uncheck Wednesday — splits the range
    await user.click(screen.getByRole('checkbox', { name: /wednesday/i }));

    await waitFor(() => {
      const cronDisplay = screen.getByLabelText('Cron expression');
      expect(cronDisplay.textContent).toContain('MON-TUE,THU');
    });
  });

  it('emits * when the last checked day is unchecked', async () => {
    render(<Cron onChange={onChange} showResultText={false} showResultCron={true} />);
    const user = await openWeeklyTab();

    await user.click(screen.getByRole('checkbox', { name: /monday/i }));
    await user.click(screen.getByRole('checkbox', { name: /monday/i })); // uncheck

    await waitFor(() => {
      const lastCall = onChange.mock.calls.at(-1)?.[0] as string;
      expect(dowField(lastCall)).toBe('*');
    });
  });

  // ------------------------------------------------------------------
  // Checkbox state — reading back a range value from props
  // ------------------------------------------------------------------

  it('checks the correct boxes when initialized with a range value (MON-WED)', async () => {
    render(
      <Cron
        value="0 0 0 ? * MON-WED *"
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
      />,
    );
    const user = await openWeeklyTab();

    await waitFor(() => {
      expect(screen.getByRole('checkbox', { name: /monday/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /tuesday/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /wednesday/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /thursday/i })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: /friday/i })).not.toBeChecked();
    });
  });

  it('checks the correct boxes when initialized with MON-FRI (via value prop only, no tab click)', async () => {
    // NOTE: cron.tsx routes "MON-FRI" in val[5] to the Daily tab, so we use
    // a value that lands directly on Weekly (val[3]==='?') with a different range.
    // For MON-FRI specifically we render with options restricted to WEEKLY only
    // so the tab routing always selects Weekly.
    render(
      <Cron
        value="0 0 0 ? * MON-FRI *"
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
        options={{ headers: ['WEEKLY'] }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByRole('checkbox', { name: /monday/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /tuesday/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /wednesday/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /thursday/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /friday/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /saturday/i })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: /sunday/i })).not.toBeChecked();
    });
  });

  // ------------------------------------------------------------------
  // Display cron string uses range notation
  // ------------------------------------------------------------------

  it('shows the compressed range in the displayed cron expression', async () => {
    render(<Cron onChange={onChange} showResultText={false} showResultCron={true} />);
    const user = await openWeeklyTab();

    await user.click(screen.getByRole('checkbox', { name: /monday/i }));
    await user.click(screen.getByRole('checkbox', { name: /tuesday/i }));
    await user.click(screen.getByRole('checkbox', { name: /wednesday/i }));

    await waitFor(() => {
      const cronDisplay = screen.getByLabelText('Cron expression');
      expect(cronDisplay.textContent).toContain('MON-WED');
    });
  });

  // ------------------------------------------------------------------
  // Unix mode — range still emitted correctly
  // ------------------------------------------------------------------

  it('emits a range in Unix mode (MON-WED becomes 1-3 in Unix day-of-week)', async () => {
    render(
      <Cron onChange={onChange} showResultText={false} showResultCron={true} isUnix={true} />,
    );
    const user = await openWeeklyTab();

    await user.click(screen.getByRole('checkbox', { name: /monday/i }));
    await user.click(screen.getByRole('checkbox', { name: /tuesday/i }));
    await user.click(screen.getByRole('checkbox', { name: /wednesday/i }));

    await waitFor(() => {
      const lastCall = onChange.mock.calls.at(-1)?.[0] as string;
      // Unix format: minute hour dom month dow  — dow is the 5th field (index 4)
      const parts = lastCall.trim().split(/\s+/);
      expect(parts[4]).toBe('1-3');
    });
  });

  // ------------------------------------------------------------------
  // Disabled state — clicks have no effect
  // ------------------------------------------------------------------

  it('does not change the cron value when the component is disabled', async () => {
    // Use WEEKLY-only header so the tab is immediately active without a click.
    // Pass a valid weekly cron value so the Weekly content renders synchronously.
    render(
      <Cron
        value="0 0 0 ? * MON *"
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
        disabled={true}
        options={{ headers: ['WEEKLY'] }}
      />,
    );
    const user = userEvent.setup();

    // Wait for the checkbox to appear, then clear the initial onChange call
    const monCheckbox = await screen.findByRole('checkbox', { name: /monday/i });
    onChange.mockClear();

    expect(monCheckbox).toBeDisabled();
    await user.click(monCheckbox);

    // onChange should not have been called after the disabled click
    expect(onChange).not.toHaveBeenCalled();
  });
});


// ---------------------------------------------------------------------------
// Monthly tab — range compression for multi-day selection
//
// These tests verify compressMonthDays via the Cron component by providing a
// comma-list value prop that contains consecutive days. The component runs
// compressMonthDays on the parsed list and emits the compressed form via onChange.
// ---------------------------------------------------------------------------

describe('Monthly tab — range compression for multi-day picker', () => {
  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  it('compresses consecutive month days to a range when initialized from a value prop (10-12)', () => {
    render(
      <Cron
        value="0 0 0 10,11,12 1/1 ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
        options={{ headers: ['MONTHLY'] }}
      />,
    );

    // The component emits the compressed cron immediately on mount
    expect(onChange).toHaveBeenCalled();
    const emittedCron = onChange.mock.calls.at(-1)?.[0] as string;
    expect(domField(emittedCron)).toBe('10-12');
  });

  it('leaves non-consecutive days as comma-separated (5,10,15 stays 5,10,15)', () => {
    render(
      <Cron
        value="0 0 0 5,10,15 1/1 ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
        options={{ headers: ['MONTHLY'] }}
      />,
    );

    expect(onChange).toHaveBeenCalled();
    const emittedCron = onChange.mock.calls.at(-1)?.[0] as string;
    expect(domField(emittedCron)).toBe('5,10,15');
  });

  it('produces two separate ranges for two runs of consecutive days (1-3 and 10-11)', () => {
    render(
      <Cron
        value="0 0 0 1,2,3,10,11 1/1 ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
        options={{ headers: ['MONTHLY'] }}
      />,
    );

    expect(onChange).toHaveBeenCalled();
    const emittedCron = onChange.mock.calls.at(-1)?.[0] as string;
    expect(domField(emittedCron)).toBe('1-3,10-11');
  });
});
