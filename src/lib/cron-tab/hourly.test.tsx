import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HourlyCron from './hourly';

const translate = (key: string) => key;

// Factory functions — component mutates props.value in-place, so always create fresh copies
const everyHourValue = () => ['0', '0', '0/1', '1/1', '*', '?', '*'];
const specificHourValue = () => ['0', '30', '8', '1/1', '*', '?', '*'];

describe('HourlyCron', () => {
  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  it('renders both radio options', () => {
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    expect(screen.getByText('Every')).toBeInTheDocument();
    expect(screen.getByText(/hour/i)).toBeInTheDocument();
    expect(screen.getByText(/minute\(s\)/i)).toBeInTheDocument();
    expect(screen.getByText('At')).toBeInTheDocument();
  });

  it('renders hour and minute selects', () => {
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    expect(document.querySelector('select.hours')).toBeInTheDocument();
    expect(document.querySelector('select.minutes')).toBeInTheDocument();
  });

  it('checks the "Every" radio when val[2] has a slash (every-hour mode)', async () => {
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    await waitFor(() => {
      const radio = document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });
  });

  it('checks the "At" radio when val[2] is a plain hour (specific-hour mode)', async () => {
    render(<HourlyCron onChange={onChange} value={specificHourValue()} translate={translate} />);
    await waitFor(() => {
      const radio = document.querySelector(
        'input[name="EverySpecificHour"]',
      ) as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });
  });

  it('checks the "Every" radio when val[2] is * (wildcard)', async () => {
    render(
      <HourlyCron
        onChange={onChange}
        value={['0', '0', '*', '1/1', '*', '?', '*']}
        translate={translate}
      />,
    );
    await waitFor(() => {
      const radio = document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });
  });

  it('displays the current hour interval from val[2]', async () => {
    render(
      <HourlyCron
        onChange={onChange}
        value={['0', '0', '0/3', '1/1', '*', '?', '*']}
        translate={translate}
      />,
    );
    await waitFor(() => {
      const inputs = document.querySelectorAll('input[type="Number"]');
      expect((inputs[0] as HTMLInputElement).value).toBe('3');
    });
  });

  it('calls onChange with updated hour interval when valid (1-23)', async () => {
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    await waitFor(() => {
      const radio = document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });
    const inputs = document.querySelectorAll('input[type="Number"]');
    fireEvent.change(inputs[0], { target: { value: '4' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[2]).toBe('0/4');
  });

  it('does not call onChange for hour interval 0 (invalid)', async () => {
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement).checked,
      ).toBe(true);
    });
    fireEvent.change(document.querySelectorAll('input[type="Number"]')[0], {
      target: { value: '0' },
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange for hour interval 24 (out of range)', async () => {
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    await waitFor(() => {
      expect(
        (document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement).checked,
      ).toBe(true);
    });
    fireEvent.change(document.querySelectorAll('input[type="Number"]')[0], {
      target: { value: '24' },
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('clears the hour interval when input is emptied', async () => {
    render(
      <HourlyCron
        onChange={onChange}
        value={['0', '0', '0/3', '1/1', '*', '?', '*']}
        translate={translate}
      />,
    );
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.change(document.querySelectorAll('input[type="Number"]')[0], {
      target: { value: '' },
    });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[2]).toBe('');
  });

  it('calls onChange with updated minute when valid (1-59)', async () => {
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    const inputs = document.querySelectorAll('input[type="Number"]');
    fireEvent.change(inputs[1], { target: { value: '15' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[1]).toBe('15');
  });

  it('does not call onChange for minute 0 in every-mode', async () => {
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.change(document.querySelectorAll('input[type="Number"]')[1], {
      target: { value: '0' },
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange with updated hour from the At hour select', () => {
    render(<HourlyCron onChange={onChange} value={specificHourValue()} translate={translate} />);
    fireEvent.change(document.querySelector('select.hours')!, { target: { value: '14' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[2]).toBe('14');
  });

  it('calls onChange with updated minute from the At minute select', () => {
    render(<HourlyCron onChange={onChange} value={specificHourValue()} translate={translate} />);
    fireEvent.change(document.querySelector('select.minutes')!, { target: { value: '45' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[1]).toBe('45');
  });

  it('switches to every-hour mode when EveryHourMinute radio clicked (from specific-hour mode)', async () => {
    render(<HourlyCron onChange={onChange} value={specificHourValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="EverySpecificHour"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    const everyRadio = document.querySelector('input[name="EveryHourMinute"]')!;
    fireEvent.click(everyRadio);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce();
      const arg = onChange.mock.calls[0][0] as string[];
      expect(arg[2]).toBe('0/1');
    });
  });

  it('switches to specific-hour mode when EverySpecificHour radio clicked (from every-hour mode)', async () => {
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    fireEvent.click(document.querySelector('input[name="EverySpecificHour"]')!);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange.mock.calls[0][0]).toBeUndefined();
    });
  });

  it('does not call onChange when disabled and hour select changes', () => {
    render(
      <HourlyCron
        onChange={onChange}
        value={specificHourValue()}
        translate={translate}
        disabled={true}
      />,
    );
    fireEvent.change(document.querySelector('select.hours')!, { target: { value: '10' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled and minute select changes', () => {
    render(
      <HourlyCron
        onChange={onChange}
        value={specificHourValue()}
        translate={translate}
        disabled={true}
      />,
    );
    fireEvent.change(document.querySelector('select.minutes')!, { target: { value: '15' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('prevents invalid chars in the number inputs', () => {
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    const input = document.querySelectorAll('input[type="Number"]')[0];
    ['e', 'E', '+', '-', '.'].forEach((key) => fireEvent.keyDown(input, { key }));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('HourlyCron — onMinuteChange does not fire when state.every is false', () => {
  it('does not call onChange when changing minute input in specific-hour mode', () => {
    const onChange = vi.fn();
    render(<HourlyCron onChange={onChange} value={specificHourValue()} translate={(k) => k} />);
    const inputs = document.querySelectorAll('input[type="Number"]');
    fireEvent.change(inputs[1], { target: { value: '15' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange for minute input when disabled', () => {
    const onChange = vi.fn();
    render(
      <HourlyCron onChange={onChange} value={everyHourValue()} translate={(k) => k} disabled={true} />,
    );
    const minuteInput = document.querySelectorAll('input[type="Number"]')[1] as HTMLInputElement;
    minuteInput.removeAttribute('disabled');
    fireEvent.change(minuteInput, { target: { value: '15' } });
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('HourlyCron — radio click handlers when disabled', () => {
  it('does not fire when disabled and "Every" radio is clicked', async () => {
    const onChange = vi.fn();
    render(
      <HourlyCron onChange={onChange} value={['0', '30', '8', '1/1', '*', '?', '*']} translate={(k) => k} disabled={true} />,
    );
    await waitFor(() =>
      expect((document.querySelector('input[name="EverySpecificHour"]') as HTMLInputElement).checked).toBe(true),
    );
    fireEvent.click(document.querySelector('input[name="EveryHourMinute"]')!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not fire when disabled and "At" radio is clicked', async () => {
    const onChange = vi.fn();
    render(
      <HourlyCron onChange={onChange} value={['0', '0', '0/1', '1/1', '*', '?', '*']} translate={(k) => k} disabled={true} />,
    );
    await waitFor(() =>
      expect((document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement).checked).toBe(true),
    );
    fireEvent.click(document.querySelector('input[name="EverySpecificHour"]')!);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('HourlyCron — preventInvalidChars allows valid keys', () => {
  it('does not prevent valid key in hour input', () => {
    const onChange = vi.fn();
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    const input = document.querySelectorAll('input[type="Number"]')[0];
    fireEvent.keyDown(input, { key: '1' });
    expect(input).toBeInTheDocument();
  });

  it('does not prevent valid key in minute input', () => {
    const onChange = vi.fn();
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    const inputs = document.querySelectorAll('input[type="Number"]');
    fireEvent.keyDown(inputs[1], { key: '5' });
    expect(inputs[1]).toBeInTheDocument();
  });
});

describe('HourlyCron — onMinuteChange disabled guard via direct invocation', () => {
  it('does not call onChange when disabled (direct handler invocation)', async () => {
    const onChange = vi.fn();
    render(
      <HourlyCron
        onChange={onChange}
        value={['0', '0', '0/1', '1/1', '*', '?', '*']}
        translate={(k) => k}
        disabled={true}
      />,
    );
    await waitFor(() => {
      const radio = document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });
    const inputs = document.querySelectorAll('input[type="Number"]');
    const minuteInput = inputs[1] as HTMLElement;
    const propKey = Object.keys(minuteInput).find((k) => k.startsWith('__reactProps'));
    if (propKey) {
      (minuteInput as any)[propKey].onChange({ target: { value: '15' } });
    }
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('HourlyCron — onMinuteChange out-of-range value', () => {
  it('does not call onChange when minute value is 60 or above', async () => {
    const onChange = vi.fn();
    render(<HourlyCron onChange={onChange} value={everyHourValue()} translate={translate} />);
    await waitFor(() =>
      expect(
        (document.querySelector('input[name="EveryHourMinute"]') as HTMLInputElement).checked,
      ).toBe(true),
    );
    const inputs = document.querySelectorAll('input[type="Number"]');
    fireEvent.change(inputs[1], { target: { value: '60' } });
    expect(onChange).not.toHaveBeenCalled();
  });
});
