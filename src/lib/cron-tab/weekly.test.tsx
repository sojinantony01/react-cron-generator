import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import WeeklyCron from './weekly';

const translate = (key: string) => key;

// Factory functions — component mutates props.value in-place, so always create fresh copies
const defaultValue = () => ['0', '0', '00', '?', '*', '*', '*'];
const monValue = () => ['0', '0', '00', '?', '*', 'MON', '*'];
const rangeValue = () => ['0', '0', '00', '?', '*', 'MON-WED', '*'];

describe('WeeklyCron', () => {
  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  it('renders all 7 day checkboxes', () => {
    render(<WeeklyCron onChange={onChange} value={defaultValue()} translate={translate} />);
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(
      (day) => {
        expect(screen.getByLabelText(day)).toBeInTheDocument();
      },
    );
  });

  it('renders Start time label with Hour and Minutes selects', () => {
    render(<WeeklyCron onChange={onChange} value={defaultValue()} translate={translate} />);
    expect(screen.getByText('Start time')).toBeInTheDocument();
    expect(document.querySelector('select.hours')).toBeInTheDocument();
    expect(document.querySelector('select.minutes')).toBeInTheDocument();
  });

  it('checks Monday when val[5] is "MON"', async () => {
    render(<WeeklyCron onChange={onChange} value={monValue()} translate={translate} />);
    await waitFor(() => {
      expect(screen.getByLabelText('Monday')).toBeChecked();
      expect(screen.getByLabelText('Tuesday')).not.toBeChecked();
    });
  });

  it('checks Mon, Tue, Wed when val[5] is "MON-WED"', async () => {
    render(<WeeklyCron onChange={onChange} value={rangeValue()} translate={translate} />);
    await waitFor(() => {
      expect(screen.getByLabelText('Monday')).toBeChecked();
      expect(screen.getByLabelText('Tuesday')).toBeChecked();
      expect(screen.getByLabelText('Wednesday')).toBeChecked();
      expect(screen.getByLabelText('Thursday')).not.toBeChecked();
    });
  });

  it('checks no boxes when val[5] is "*"', () => {
    render(<WeeklyCron onChange={onChange} value={defaultValue()} translate={translate} />);
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(
      (day) => {
        expect(screen.getByLabelText(day)).not.toBeChecked();
      },
    );
  });

  it('calls onChange with the checked day added to val[5]', async () => {
    const user = userEvent.setup();
    render(<WeeklyCron onChange={onChange} value={defaultValue()} translate={translate} />);
    await user.click(screen.getByLabelText('Monday'));
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[5]).toContain('MON');
  });

  it('sets val[3] to "?" when a day is checked', async () => {
    const user = userEvent.setup();
    render(<WeeklyCron onChange={onChange} value={defaultValue()} translate={translate} />);
    await user.click(screen.getByLabelText('Friday'));
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[3]).toBe('?');
  });

  it('removes day from val[5] when unchecked', async () => {
    const user = userEvent.setup();
    render(<WeeklyCron onChange={onChange} value={monValue()} translate={translate} />);
    await user.click(screen.getByLabelText('Monday'));
    expect(onChange).toHaveBeenCalled();
    const arg = onChange.mock.calls.at(-1)![0] as string[];
    expect(arg[5]).toBe('*');
  });

  it('keeps remaining days when one of multiple days is unchecked', async () => {
    const user = userEvent.setup();
    render(<WeeklyCron onChange={onChange} value={rangeValue()} translate={translate} />);
    await user.click(screen.getByLabelText('Wednesday'));
    expect(onChange).toHaveBeenCalled();
    const arg = onChange.mock.calls.at(-1)![0] as string[];
    expect(arg[5]).not.toContain('WED');
    expect(arg[5]).toContain('MON');
    expect(arg[5]).toContain('TUE');
  });

  it('compresses consecutive days to a range (MON + TUE → MON-TUE)', async () => {
    const user = userEvent.setup();
    render(<WeeklyCron onChange={onChange} value={monValue()} translate={translate} />);
    await user.click(screen.getByLabelText('Tuesday'));
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[5]).toBe('MON-TUE');
  });

  it('calls onChange with updated hour when hour select changes', () => {
    render(<WeeklyCron onChange={onChange} value={monValue()} translate={translate} />);
    fireEvent.change(document.querySelector('select.hours')!, { target: { value: '10' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[2]).toBe('10');
  });

  it('calls onChange with updated minute when minute select changes', () => {
    render(<WeeklyCron onChange={onChange} value={monValue()} translate={translate} />);
    fireEvent.change(document.querySelector('select.minutes')!, { target: { value: '45' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[1]).toBe('45');
  });

  it('all checkboxes are disabled when disabled prop is true', () => {
    render(
      <WeeklyCron onChange={onChange} value={defaultValue()} translate={translate} disabled={true} />,
    );
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(
      (day) => {
        expect(screen.getByLabelText(day)).toBeDisabled();
      },
    );
  });

  it('does not call onChange when disabled and a checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(
      <WeeklyCron onChange={onChange} value={defaultValue()} translate={translate} disabled={true} />,
    );
    await user.click(screen.getByLabelText('Monday'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled and hour select changes', () => {
    render(
      <WeeklyCron onChange={onChange} value={monValue()} translate={translate} disabled={true} />,
    );
    fireEvent.change(document.querySelector('select.hours')!, { target: { value: '10' } });
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('WeeklyCron — minute select when disabled', () => {
  it('does not call onChange when disabled and minute select changes', () => {
    const onChange = vi.fn();
    render(
      <WeeklyCron onChange={onChange} value={['0', '0', '00', '?', '*', 'MON', '*']} translate={(k) => k} disabled={true} />,
    );
    fireEvent.change(document.querySelector('select.minutes')!, { target: { value: '30' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders all checkboxes as disabled when disabled=true', () => {
    const onChange = vi.fn();
    render(
      <WeeklyCron onChange={onChange} value={['0', '0', '00', '?', '*', '*', '*']} translate={(k) => k} disabled={true} />,
    );
    expect(screen.getByLabelText('Monday')).toBeDisabled();
    expect(screen.getByLabelText('Wednesday')).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('WeeklyCron — onDayChecked resets step-format val[2] to "0"', () => {
  it('resets val[2] to "0" when it contains a "/"', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <WeeklyCron
        onChange={onChange}
        value={['0', '0', '0/3', '?', '*', '*', '*']}
        translate={(k) => k}
      />,
    );
    await user.click(screen.getByLabelText('Monday'));
    const arg = onChange.mock.calls.at(-1)![0] as string[];
    expect(arg[2]).toBe('0');
  });
});

describe('WeeklyCron — onCheck disabled guard via direct invocation', () => {
  it('does not call onChange when disabled (direct handler invocation)', () => {
    const onChange = vi.fn();
    render(
      <WeeklyCron
        onChange={onChange}
        value={['0', '0', '00', '?', '*', '*', '*']}
        translate={(k) => k}
        disabled={true}
      />,
    );
    const checkbox = document.querySelector('#mon-checkbox') as HTMLElement;
    const propKey = Object.keys(checkbox).find((k) => k.startsWith('__reactProps'));
    if (propKey) {
      (checkbox as any)[propKey].onChange({ target: { checked: true, value: 'MON' } });
    }
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('WeeklyCron — onDayChecked skips duplicate day', () => {
  it('does not add a day twice when it is already in val[5]', () => {
    const onChange = vi.fn();
    render(
      <WeeklyCron
        onChange={onChange}
        value={['0', '0', '00', '?', '*', 'MON', '*']}
        translate={(k) => k}
      />,
    );
    const checkbox = document.querySelector('#mon-checkbox') as HTMLElement;
    const propKey = Object.keys(checkbox).find((k) => k.startsWith('__reactProps'));
    if (propKey) {
      (checkbox as any)[propKey].onChange({ target: { checked: true, value: 'MON' } });
    }
    expect(onChange).toHaveBeenCalled();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[5]).toBe('MON');
  });
});
