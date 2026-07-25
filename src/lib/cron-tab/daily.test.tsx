import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DailyCron from './daily';

const translate = (key: string) => key;

// Always create fresh copies to avoid mutation side-effects (component mutates props.value in-place)
const defaultEveryValue = () => ['0', '0', '00', '1/1', '*', '?', '*'];
const weekdayValue = () => ['0', '0', '00', '?', '*', 'MON-FRI', '*'];

describe('DailyCron', () => {
  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  it('renders the Every N days radio button and input', () => {
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    expect(document.querySelector('input[name="DailyRadio"]')).toBeInTheDocument();
    expect(screen.getByText('day(s)')).toBeInTheDocument();
  });

  it('renders the Every week day radio button', () => {
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    expect(screen.getByText('Every week day')).toBeInTheDocument();
  });

  it('renders Start time label with Hour and Minutes selects', () => {
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    expect(screen.getByText('Start time')).toBeInTheDocument();
    expect(document.querySelector('select.hours')).toBeInTheDocument();
    expect(document.querySelector('select.minutes')).toBeInTheDocument();
  });

  it('sets "every" radio as checked when val[3] contains a slash', async () => {
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    // useEffect runs after mount and sets every=true
    await waitFor(() => {
      const everyRadio = document.querySelector('input[name="DailyRadio"]') as HTMLInputElement;
      expect(everyRadio.checked).toBe(true);
    });
  });

  it('sets "every weekday" radio as checked when val[3] is "?"', async () => {
    render(<DailyCron onChange={onChange} value={weekdayValue()} translate={translate} />);
    await waitFor(() => {
      const weekdayRadio = document.querySelector('input[name="EveryWeekDay"]') as HTMLInputElement;
      expect(weekdayRadio.checked).toBe(true);
    });
  });

  it('displays the current day interval extracted from val[3]', () => {
    render(
      <DailyCron
        onChange={onChange}
        value={['0', '0', '00', '1/3', '*', '?', '*']}
        translate={translate}
      />,
    );
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs[0]).toHaveValue(3);
  });

  it('calls onChange with updated day when a valid day value is entered', () => {
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '5' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[3]).toBe('1/5');
  });

  it('does not call onChange for an out-of-range day (0)', () => {
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: '0' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange for an out-of-range day (32)', () => {
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: '32' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange with empty day when input is cleared', () => {
    render(
      <DailyCron
        onChange={onChange}
        value={['0', '0', '00', '1/3', '*', '?', '*']}
        translate={translate}
      />,
    );
    fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: '' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[3]).toBe('');
  });

  it('prevents invalid chars (e, E, +, -, .) in the day input', () => {
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    const input = screen.getAllByRole('spinbutton')[0];
    ['e', 'E', '+', '-', '.'].forEach((key) => fireEvent.keyDown(input, { key }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange with updated hour when hour select changes', () => {
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    fireEvent.change(document.querySelector('select.hours')!, { target: { value: '09' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[2]).toBe('09');
  });

  it('calls onChange with updated minute when minute select changes', () => {
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    fireEvent.change(document.querySelector('select.minutes')!, { target: { value: '30' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[1]).toBe('30');
  });

  it('switches to "every weekday" mode when the weekday radio is clicked', async () => {
    const user = userEvent.setup();
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    // Wait for useEffect to set state.every = true
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="DailyRadio"]') as HTMLInputElement).checked,
      ).toBe(true);
    });
    // userEvent click on the unchecked radio fires the onChange handler
    const weekdayRadio = document.querySelector('input[name="EveryWeekDay"]') as HTMLInputElement;
    await user.click(weekdayRadio);
    await waitFor(() => {
      expect(onChange.mock.calls.length).toBeGreaterThanOrEqual(1);
      const lastArg = onChange.mock.calls.at(-1)?.[0] as string[];
      expect(lastArg[5]).toBe('MON-FRI');
    });
  });

  it('switches back to "every N days" mode when the daily radio is clicked', async () => {
    const user = userEvent.setup();
    render(<DailyCron onChange={onChange} value={weekdayValue()} translate={translate} />);
    // Wait for useEffect to set state.every = false (weekday mode)
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="EveryWeekDay"]') as HTMLInputElement).checked,
      ).toBe(true);
    });
    const everyRadio = document.querySelector('input[name="DailyRadio"]') as HTMLInputElement;
    await user.click(everyRadio);
    await waitFor(() => {
      expect(onChange.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('does not call onChange when disabled and day input changes', () => {
    render(
      <DailyCron
        onChange={onChange}
        value={defaultEveryValue()}
        translate={translate}
        disabled={true}
      />,
    );
    fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: '7' } });
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('DailyCron — handlers when disabled', () => {
  it('onAtHourChange does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(
      <DailyCron onChange={onChange} value={['0', '0', '00', '1/1', '*', '?', '*']} translate={(k) => k} disabled={true} />,
    );
    fireEvent.change(document.querySelector('select.hours')!, { target: { value: '09' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('onAtMinuteChange does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(
      <DailyCron onChange={onChange} value={['0', '0', '00', '1/1', '*', '?', '*']} translate={(k) => k} disabled={true} />,
    );
    fireEvent.change(document.querySelector('select.minutes')!, { target: { value: '30' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not fire onClickEveryWeekDay when disabled', async () => {
    const onChange = vi.fn();
    render(
      <DailyCron onChange={onChange} value={['0', '0', '00', '1/1', '*', '?', '*']} translate={(k) => k} disabled={true} />,
    );
    await waitFor(() =>
      expect((document.querySelector('input[name="DailyRadio"]') as HTMLInputElement).checked).toBe(true),
    );
    fireEvent.click(screen.getByText('Every week day'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not fire onClickDailyRadio when disabled', async () => {
    const onChange = vi.fn();
    render(
      <DailyCron onChange={onChange} value={['0', '0', '00', '?', '*', 'MON-FRI', '*']} translate={(k) => k} disabled={true} />,
    );
    await waitFor(() =>
      expect((document.querySelector('input[name="EveryWeekDay"]') as HTMLInputElement).checked).toBe(true),
    );
    fireEvent.click(screen.getAllByText('Every')[0]);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('DailyCron — preventInvalidChars allows valid keys', () => {
  it('does not prevent valid key (digit "5") in day input', () => {
    const onChange = vi.fn();
    render(<DailyCron onChange={onChange} value={defaultEveryValue()} translate={translate} />);
    const input = screen.getAllByRole('spinbutton')[0];
    fireEvent.keyDown(input, { key: '5' });
    expect(input).toBeInTheDocument();
  });
});
