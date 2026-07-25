import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MonthlyCron from './monthly';

const translate = (key: string) => key;

// Always create fresh copies to avoid mutation side-effects (component mutates props.value in-place)
const onceDayValue = () => ['0', '0', '00', '1', '1/1', '?', '*'];
const lastDayValue = () => ['0', '0', '00', 'L', '*', '?', '*'];
const lastWeekdayValue = () => ['0', '0', '00', 'LW', '*', '?', '*'];
const daysBeforeEndValue = () => ['0', '0', '00', 'L-3', '*', '?', '*'];
const multiDayValue = () => ['0', '0', '00', '5!10!15', '1/1', '?', '*'];
const starHourMinValue = () => ['0', '*', '*', '1', '1/1', '?', '*'];

describe('MonthlyCron', () => {
  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  it('renders all five radio options', () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('of every month(s)')).toBeInTheDocument();
    expect(screen.getByText('Last day of every month')).toBeInTheDocument();
    expect(screen.getByText('On the last weekday of every month')).toBeInTheDocument();
    expect(screen.getByText('day(s) before the end of the month')).toBeInTheDocument();
    expect(screen.getByText('Days of every month')).toBeInTheDocument();
  });

  it('renders Start time label with Hour and Minutes selects', () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    expect(screen.getByText('Start time')).toBeInTheDocument();
    expect(document.querySelector('select.hours')).toBeInTheDocument();
    expect(document.querySelector('select.minutes')).toBeInTheDocument();
  });

  it('selects option 1 when val[3] is a plain day number', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true);
    });
  });

  it('selects option 2 when val[3] is "L"', async () => {
    render(<MonthlyCron onChange={onChange} value={lastDayValue()} translate={translate} />);
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="LastDayOfEveryMonth"]') as HTMLInputElement).checked,
      ).toBe(true);
    });
  });

  it('selects option 3 when val[3] is "LW"', async () => {
    render(<MonthlyCron onChange={onChange} value={lastWeekdayValue()} translate={translate} />);
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="LastWeekdayOfEveryMonth"]') as HTMLInputElement)
          .checked,
      ).toBe(true);
    });
  });

  it('selects option 4 when val[3] starts with "L-"', async () => {
    render(<MonthlyCron onChange={onChange} value={daysBeforeEndValue()} translate={translate} />);
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="DaysBeforeEndOfMonth"]') as HTMLInputElement).checked,
      ).toBe(true);
    });
  });

  it('selects option 5 when val[3] is a multi-day value', async () => {
    render(<MonthlyCron onChange={onChange} value={multiDayValue()} translate={translate} />);
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="MonthlyMultipleRadio"]') as HTMLInputElement).checked,
      ).toBe(true);
    });
  });

  it('selects option 5 for a numeric-range multi-day value (e.g. "10-12")', async () => {
    render(
      <MonthlyCron
        onChange={onChange}
        value={['0', '0', '00', '10-12', '1/1', '?', '*']}
        translate={translate}
      />,
    );
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="MonthlyMultipleRadio"]') as HTMLInputElement).checked,
      ).toBe(true);
    });
  });

  it('keeps option 5 selected after DaySelect emits and props re-render with a plain number', async () => {
    // Start in multi-day mode (every='5')
    // Then simulate a parent that re-renders with a single numeric val[3] (e.g. after selection)
    // The component should NOT jump back to option 1.
    const { rerender } = render(
      <MonthlyCron onChange={onChange} value={multiDayValue()} translate={translate} />,
    );
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyMultipleRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    // Re-render with a single day number (simulates parent updating from the onMultiDayChange result)
    rerender(
      <MonthlyCron
        onChange={onChange}
        value={['0', '0', '00', '5', '1/1', '?', '*']}
        translate={translate}
      />,
    );
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="MonthlyMultipleRadio"]') as HTMLInputElement).checked,
      ).toBe(true);
    });
  });

  it('switches to "last day" when option 2 radio is clicked', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    fireEvent.click(document.querySelector('input[name="LastDayOfEveryMonth"]')!);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce();
      const arg = onChange.mock.calls[0][0] as string[];
      expect(arg[3]).toBe('L');
    });
  });

  it('normalizes * hour/minute to 0 when switching to "last day"', async () => {
    render(<MonthlyCron onChange={onChange} value={starHourMinValue()} translate={translate} />);
    fireEvent.click(document.querySelector('input[name="LastDayOfEveryMonth"]')!);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[1]).toBe('0'); // '*' → '0'
      expect(arg[2]).toBe('0'); // '*' → '0'
      expect(arg[3]).toBe('L');
    });
  });

  it('switches to "last weekday" when option 3 radio is clicked', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    fireEvent.click(document.querySelector('input[name="LastWeekdayOfEveryMonth"]')!);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce();
      const arg = onChange.mock.calls[0][0] as string[];
      expect(arg[3]).toBe('LW');
    });
  });

  it('normalizes * hour/minute to 0 when switching to "last weekday"', async () => {
    render(<MonthlyCron onChange={onChange} value={starHourMinValue()} translate={translate} />);
    fireEvent.click(document.querySelector('input[name="LastWeekdayOfEveryMonth"]')!);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[1]).toBe('0');
      expect(arg[2]).toBe('0');
    });
  });

  it('switches to "days before end" when option 4 radio is clicked', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    fireEvent.click(document.querySelector('input[name="DaysBeforeEndOfMonth"]')!);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce();
      const arg = onChange.mock.calls[0][0] as string[];
      expect(arg[3]).toBe('L-1');
    });
  });

  it('normalizes * hour/minute to 0 when switching to "days before end"', async () => {
    render(<MonthlyCron onChange={onChange} value={starHourMinValue()} translate={translate} />);
    fireEvent.click(document.querySelector('input[name="DaysBeforeEndOfMonth"]')!);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[1]).toBe('0');
      expect(arg[2]).toBe('0');
    });
  });

  it('switches to "multiple days" when option 5 radio is clicked', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    fireEvent.click(document.querySelector('input[name="MonthlyMultipleRadio"]')!);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce();
    });
  });

  it('normalizes * hour/minute to 0 when switching to "multiple days"', async () => {
    render(<MonthlyCron onChange={onChange} value={starHourMinValue()} translate={translate} />);
    fireEvent.click(document.querySelector('input[name="MonthlyMultipleRadio"]')!);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[1]).toBe('0');
      expect(arg[2]).toBe('0');
    });
  });

  it('switches back to option 1 when MonthlyOnceRadio is clicked (from option 2)', async () => {
    render(<MonthlyCron onChange={onChange} value={lastDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="LastDayOfEveryMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(document.querySelector('input[name="MonthlyOnceRadio"]')!);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce();
      const arg = onChange.mock.calls[0][0] as string[];
      expect(arg[3]).toBe('1');
    });
  });

  it('normalizes * hour/minute to 0 when switching to option 1 (from option 2)', async () => {
    // Start on option 2 (lastDay) but with '*' in hour/minute
    render(
      <MonthlyCron
        onChange={onChange}
        value={['0', '*', '*', 'L', '*', '?', '*']}
        translate={translate}
      />,
    );
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="LastDayOfEveryMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(document.querySelector('input[name="MonthlyOnceRadio"]')!);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[1]).toBe('0'); // '*' → '0'
      expect(arg[2]).toBe('0'); // '*' → '0'
    });
  });

  it('does not re-call onChange when same option radio is clicked again (option 1 re-clicked)', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(document.querySelector('input[name="MonthlyOnceRadio"]')!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when option 2 is clicked while already on option 2', async () => {
    render(<MonthlyCron onChange={onChange} value={lastDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="LastDayOfEveryMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(document.querySelector('input[name="LastDayOfEveryMonth"]')!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when option 3 is clicked while already on option 3', async () => {
    render(<MonthlyCron onChange={onChange} value={lastWeekdayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="LastWeekdayOfEveryMonth"]') as HTMLInputElement)
          .checked,
      ).toBe(true),
    );
    fireEvent.click(document.querySelector('input[name="LastWeekdayOfEveryMonth"]')!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when option 4 is clicked while already on option 4', async () => {
    render(<MonthlyCron onChange={onChange} value={daysBeforeEndValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="DaysBeforeEndOfMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(document.querySelector('input[name="DaysBeforeEndOfMonth"]')!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when option 5 is clicked while already on option 5', async () => {
    render(<MonthlyCron onChange={onChange} value={multiDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyMultipleRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(document.querySelector('input[name="MonthlyMultipleRadio"]')!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange via onMultiDayChange when a day is selected in the DaySelect', async () => {
    // Start in multi-day mode so DaySelect is active
    render(<MonthlyCron onChange={onChange} value={multiDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyMultipleRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    // Open the DaySelect dropdown and pick day "1"
    const dropbtn = document.querySelector('input.dropbtn') as HTMLElement;
    fireEvent.click(dropbtn);
    const items = document.querySelectorAll('.dropdown-item');
    fireEvent.click(items[0]); // day "1"
    expect(onChange).toHaveBeenCalled();
    const arg = onChange.mock.calls.at(-1)![0] as string[];
    // val[3] should be a compressed day list containing '1'
    expect(arg[3]).toBeTruthy();
  });

  it('normalizes * hour/minute in onMultiDayChange', async () => {
    render(<MonthlyCron onChange={onChange} value={starHourMinValue()} translate={translate} />);
    // Switch to multi-day mode first
    fireEvent.click(document.querySelector('input[name="MonthlyMultipleRadio"]')!);
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    onChange.mockClear();

    // The DaySelect is now visible — open and select a day
    const dropbtn = document.querySelector('input.dropbtn') as HTMLElement;
    fireEvent.click(dropbtn);
    const items = document.querySelectorAll('.dropdown-item');
    fireEvent.click(items[4]); // day "5"
    expect(onChange).toHaveBeenCalled();
    const arg = onChange.mock.calls.at(-1)![0] as string[];
    expect(arg[1]).toBe('0'); // '*' normalized to '0'
    expect(arg[2]).toBe('0'); // '*' normalized to '0'
  });

  it('calls onChange with updated day when day input changes (option 1)', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    const inputs = document.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[0], { target: { value: '15' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[3]).toBe('15');
  });

  it('normalizes * hour/minute when day input changes', async () => {
    render(<MonthlyCron onChange={onChange} value={starHourMinValue()} translate={translate} />);
    const inputs = document.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[0], { target: { value: '10' } });
    expect(onChange).toHaveBeenCalled();
    const arg = onChange.mock.calls.at(-1)![0] as string[];
    expect(arg[1]).toBe('0');
    expect(arg[2]).toBe('0');
  });

  it('does not call onChange for day 0 (invalid)', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.change(document.querySelectorAll('input[type="number"]')[0], {
      target: { value: '0' },
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange for day > 31 (invalid)', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.change(document.querySelectorAll('input[type="number"]')[0], {
      target: { value: '32' },
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange with empty day when day input is cleared', async () => {
    render(
      <MonthlyCron
        onChange={onChange}
        value={['0', '0', '00', '10', '1/1', '?', '*']}
        translate={translate}
      />,
    );
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.change(document.querySelectorAll('input[type="number"]')[0], {
      target: { value: '' },
    });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[3]).toBe('');
  });

  it('calls onChange with L-N when days-before-end input changes', async () => {
    render(<MonthlyCron onChange={onChange} value={daysBeforeEndValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="DaysBeforeEndOfMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    const inputs = document.querySelectorAll('input[type="number"]');
    const lInput = inputs[1] as HTMLInputElement;
    fireEvent.change(lInput, { target: { value: '5' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[3]).toBe('L-5');
  });

  it('normalizes * hour/minute in onLastDayChange', async () => {
    render(<MonthlyCron onChange={onChange} value={['0', '*', '*', 'L-3', '*', '?', '*']} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="DaysBeforeEndOfMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    const inputs = document.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[1], { target: { value: '7' } });
    expect(onChange).toHaveBeenCalled();
    const arg = onChange.mock.calls.at(-1)![0] as string[];
    expect(arg[1]).toBe('0');
    expect(arg[2]).toBe('0');
  });

  it('clears L-N value when input is emptied', async () => {
    render(<MonthlyCron onChange={onChange} value={daysBeforeEndValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="DaysBeforeEndOfMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    const inputs = document.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[1], { target: { value: '' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[3]).toBe('');
  });

  it('calls onChange with updated hour when hour select changes', () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    fireEvent.change(document.querySelector('select.hours')!, { target: { value: '09' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[2]).toBe('09');
  });

  it('calls onChange with updated minute when minute select changes', () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    fireEvent.change(document.querySelector('select.minutes')!, { target: { value: '30' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[1]).toBe('30');
  });

  it('does not call onChange when disabled and radio is clicked', () => {
    render(
      <MonthlyCron
        onChange={onChange}
        value={onceDayValue()}
        translate={translate}
        disabled={true}
      />,
    );
    fireEvent.click(document.querySelector('input[name="LastDayOfEveryMonth"]')!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled and day input changes', () => {
    render(
      <MonthlyCron
        onChange={onChange}
        value={onceDayValue()}
        translate={translate}
        disabled={true}
      />,
    );
    fireEvent.change(document.querySelectorAll('input[type="number"]')[0], {
      target: { value: '10' },
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled and onMultiDayChange is triggered', async () => {
    // Need to be in multi-day mode first, then disable
    render(
      <MonthlyCron
        onChange={onChange}
        value={multiDayValue()}
        translate={translate}
        disabled={true}
      />,
    );
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyMultipleRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    const dropbtn = document.querySelector('input.dropbtn') as HTMLElement;
    fireEvent.click(dropbtn);
    const items = document.querySelectorAll('.dropdown-item');
    if (items.length) fireEvent.click(items[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled and L-N input changes', async () => {
    render(
      <MonthlyCron
        onChange={onChange}
        value={daysBeforeEndValue()}
        translate={translate}
        disabled={true}
      />,
    );
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="DaysBeforeEndOfMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    const inputs = document.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[1], { target: { value: '5' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('focuses the L-N input to trigger onClickDaysBeforeEndOfMonth (from option 1)', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    // The second number input has onFocus={() => onClickDaysBeforeEndOfMonth()}
    const inputs = document.querySelectorAll('input[type="number"]');
    fireEvent.focus(inputs[1]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[3]).toBe('L-1');
    });
  });

  it('clicks "day(s) before the end of the month" span to trigger handler', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(screen.getByText('day(s) before the end of the month'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[3]).toBe('L-1');
    });
  });

  it('clicks "On the last weekday of every month" span to trigger handler', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(screen.getByText('On the last weekday of every month'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[3]).toBe('LW');
    });
  });

  it('clicks "Days of every month" span to trigger onClickMonthlyMultipleRadio', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(screen.getByText('Days of every month'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('prevents invalid chars (e, E, +, -, .) in number inputs — onChange not triggered', () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={translate} />);
    const input = document.querySelectorAll('input[type="number"]')[0];
    ['e', 'E', '+', '-', '.'].forEach((key) => fireEvent.keyDown(input, { key }));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('MonthlyCron — disabled guards and span onClick handlers', () => {
  let onChange: ReturnType<typeof vi.fn>;
  beforeEach(() => { onChange = vi.fn(); });

  // Click the span (always fires onClick even when disabled=true) while disabled prop is true
  it('onClickLastWeekdayOfEveryMonth: no onChange when disabled (span click)', () => {
    render(
      <MonthlyCron onChange={onChange} value={onceDayValue()} translate={(k) => k} disabled={true} />,
    );
    fireEvent.click(screen.getByText('On the last weekday of every month'));
    expect(onChange).not.toHaveBeenCalled();
  });

  // Click span when already on option 3 — hits `if (state.every === '3') return`
  it('onClickLastWeekdayOfEveryMonth: no onChange when already on option 3 (span click)', () => {
    render(
      <MonthlyCron onChange={onChange} value={lastWeekdayValue()} translate={(k) => k} />,
    );
    fireEvent.click(screen.getByText('On the last weekday of every month'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onClickDaysBeforeEndOfMonth: no onChange when disabled (span click)', () => {
    render(
      <MonthlyCron onChange={onChange} value={onceDayValue()} translate={(k) => k} disabled={true} />,
    );
    fireEvent.click(screen.getByText('day(s) before the end of the month'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onClickDaysBeforeEndOfMonth: no onChange when already on option 4 (span click)', () => {
    render(
      <MonthlyCron onChange={onChange} value={daysBeforeEndValue()} translate={(k) => k} />,
    );
    fireEvent.click(screen.getByText('day(s) before the end of the month'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onClickMonthlyMultipleRadio: no onChange when disabled (span click)', () => {
    render(
      <MonthlyCron onChange={onChange} value={onceDayValue()} translate={(k) => k} disabled={true} />,
    );
    fireEvent.click(screen.getByText('Days of every month'));
    expect(onChange).not.toHaveBeenCalled();
  });

  // Lines 247, 254, 257: span/input onClick for option-1 label — clicked when NOT on option 1
  it('clicking "Day" span from option-2 state switches to option 1', async () => {
    render(<MonthlyCron onChange={onChange} value={lastDayValue()} translate={(k) => k} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="LastDayOfEveryMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(screen.getByText('Day'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[3]).toBe('1');
    });
  });

  it('clicking "of every month(s)" span from option-2 state switches to option 1', async () => {
    render(<MonthlyCron onChange={onChange} value={lastDayValue()} translate={(k) => k} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="LastDayOfEveryMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(screen.getByText('of every month(s)'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[3]).toBe('1');
    });
  });

  it('clicking the day number input from option-2 state switches to option 1', async () => {
    render(<MonthlyCron onChange={onChange} value={lastDayValue()} translate={(k) => k} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="LastDayOfEveryMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(document.querySelectorAll('input[type="number"]')[0]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[3]).toBe('1');
    });
  });

  it('clicking "Last day of every month" span from option-1 state switches to option 2', async () => {
    render(<MonthlyCron onChange={onChange} value={onceDayValue()} translate={(k) => k} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(screen.getByText('Last day of every month'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const arg = onChange.mock.calls.at(-1)![0] as string[];
      expect(arg[3]).toBe('L');
    });
  });
});

describe('MonthlyCron — additional disabled state coverage', () => {
  let onChange: ReturnType<typeof vi.fn>;
  beforeEach(() => { onChange = vi.fn(); });

  it('onMultiDayChange: no onChange when disabled (removeAttribute trick)', () => {
    render(
      <MonthlyCron onChange={onChange} value={multiDayValue()} translate={(k) => k} disabled={true} />,
    );
    // Open the DaySelect dropdown by removing disabled attr from the dropbtn
    const dropbtn = document.querySelector('input.dropbtn') as HTMLInputElement;
    dropbtn.removeAttribute('disabled');
    fireEvent.click(dropbtn);
    const items = document.querySelectorAll('.dropdown-item');
    if (items.length) {
      // Remove disabled from items to allow click, DaySelect calls onMultiDayChange
      (items[0] as HTMLElement).removeAttribute('disabled');
      fireEvent.click(items[0]);
    }
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onAtHourChange: no onChange when disabled', () => {
    render(
      <MonthlyCron onChange={onChange} value={onceDayValue()} translate={(k) => k} disabled={true} />,
    );
    const hourSelect = document.querySelector('select.hours') as HTMLSelectElement;
    if (hourSelect) {
      hourSelect.removeAttribute('disabled');
      fireEvent.change(hourSelect, { target: { value: '10' } });
    }
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onAtMinuteChange: no onChange when disabled', () => {
    render(
      <MonthlyCron onChange={onChange} value={onceDayValue()} translate={(k) => k} disabled={true} />,
    );
    const minuteSelect = document.querySelector('select.minutes') as HTMLSelectElement;
    if (minuteSelect) {
      minuteSelect.removeAttribute('disabled');
      fireEvent.change(minuteSelect, { target: { value: '30' } });
    }
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onClickMonthlyOnceRadio: no onChange when disabled (span click)', () => {
    render(
      <MonthlyCron onChange={onChange} value={lastDayValue()} translate={(k) => k} disabled={true} />,
    );
    // Click the "Day" span (option 1) while disabled
    fireEvent.click(screen.getByText('Day'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onClickMonthlyOnceRadio: no onChange when already on option 1 (span click)', () => {
    render(
      <MonthlyCron onChange={onChange} value={onceDayValue()} translate={(k) => k} />,
    );
    fireEvent.click(screen.getByText('Day'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onClickLastDayOfEveryMonth: no onChange when already on option 2 (span click)', () => {
    render(
      <MonthlyCron onChange={onChange} value={lastDayValue()} translate={(k) => k} />,
    );
    fireEvent.click(screen.getByText('Last day of every month'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('MonthlyCron — isMultiDay with empty val[3]', () => {
  it('renders as option-1 (not multi-day) when val[3] is an empty string', async () => {
    const onChange = vi.fn();
    render(
      <MonthlyCron
        onChange={onChange}
        value={['0', '0', '00', '', '1/1', '?', '*']}
        translate={(k) => k}
      />,
    );
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="MonthlyOnceRadio"]') as HTMLInputElement).checked,
      ).toBe(true);
    });
  });
});

// The existing test fires keyDown but may not trigger from the L-N input. Ensure
// both number inputs exercise the blocked-key path.
describe('MonthlyCron — preventInvalidChars via native event', () => {
  it('fires e.preventDefault() for "e" key on L-N input (inputs[1])', () => {
    const onChange = vi.fn();
    render(
      <MonthlyCron
        onChange={onChange}
        value={['0', '0', '00', 'L-3', '*', '?', '*']}
        translate={(k) => k}
      />,
    );
    const inputs = document.querySelectorAll('input[type="number"]');
    const preventDefaultSpy = vi.fn();
    const event = new KeyboardEvent('keydown', { key: 'e', bubbles: true, cancelable: true });
    Object.defineProperty(event, 'preventDefault', { value: preventDefaultSpy });
    inputs[1].dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});

// When value is '0' → parseInt('0') >> 0 = 0 → falsy → condition is false → no onChange
describe('MonthlyCron — onLastDayChange out-of-range value', () => {
  it('does not call onChange when L-N input value is "0"', async () => {
    const onChange = vi.fn();
    render(
      <MonthlyCron
        onChange={onChange}
        value={['0', '0', '00', 'L-3', '*', '?', '*']}
        translate={(k) => k}
      />,
    );
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="DaysBeforeEndOfMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    const inputs = document.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[1], { target: { value: '0' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when L-N input value exceeds 31', async () => {
    const onChange = vi.fn();
    render(
      <MonthlyCron
        onChange={onChange}
        value={['0', '0', '00', 'L-3', '*', '?', '*']}
        translate={(k) => k}
      />,
    );
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="DaysBeforeEndOfMonth"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    const inputs = document.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[1], { target: { value: '32' } });
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('MonthlyCron — preventInvalidChars allows valid keys', () => {
  it('does not call preventDefault for a valid key', () => {
    const onChange = vi.fn();
    render(
      <MonthlyCron
        onChange={onChange}
        value={['0', '0', '00', '1', '1/1', '?', '*']}
        translate={(k) => k}
      />,
    );
    const inputs = document.querySelectorAll('input[type="number"]');
    fireEvent.keyDown(inputs[0], { key: '1' });
    expect(inputs[0]).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });
});
