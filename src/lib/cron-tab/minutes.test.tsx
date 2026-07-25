import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MinutesCron from './minutes';

const translate = (key: string) => key;

describe('MinutesCron', () => {
  it('renders the interval input and labels', () => {
    render(
      <MinutesCron
        onChange={vi.fn()}
        value={['0', '0/1', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    // 'Every' and 'minute(s)' are bare text nodes inside the .well div
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(document.querySelector('.well')).toHaveTextContent('Every');
    expect(document.querySelector('.well')).toHaveTextContent('minute(s)');
  });

  it('displays the current interval value from props', () => {
    render(
      <MinutesCron
        onChange={vi.fn()}
        value={['0', '0/5', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    expect(screen.getByRole('spinbutton')).toHaveValue(5);
  });

  it('displays empty value when no slash in value[1]', () => {
    render(
      <MinutesCron
        onChange={vi.fn()}
        value={['0', '*', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    // value[1].split('/')[1] is undefined → input value is undefined/empty
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('calls onChange with correct value when a valid interval is entered', () => {
    const onChange = vi.fn();
    render(
      <MinutesCron
        onChange={onChange}
        value={['0', '0/1', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '15' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    expect(arg[1]).toBe('0/15');
  });

  it('calls onChange with * when input is cleared (empty string)', () => {
    const onChange = vi.fn();
    render(
      <MinutesCron
        onChange={onChange}
        value={['0', '0/5', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '' } });
    expect(onChange).toHaveBeenCalledOnce();
    const arg = onChange.mock.calls[0][0] as string[];
    // Empty value → val[1] stays as '*' (default)
    expect(arg[1]).toBe('*');
  });

  it('does NOT call onChange when value is 0 (invalid — must be > 0)', () => {
    const onChange = vi.fn();
    render(
      <MinutesCron
        onChange={onChange}
        value={['0', '0/5', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '0' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does NOT call onChange when value is 60 (out of range)', () => {
    const onChange = vi.fn();
    render(
      <MinutesCron
        onChange={onChange}
        value={['0', '0/5', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '60' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does NOT call onChange when disabled', () => {
    const onChange = vi.fn();
    render(
      <MinutesCron
        onChange={onChange}
        value={['0', '0/5', '*', '*', '*', '?', '*']}
        translate={translate}
        disabled={true}
      />,
    );
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '15' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('prevents invalid chars (e, E, +, -, .) via onKeyDown', () => {
    const onChange = vi.fn();
    render(
      <MinutesCron
        onChange={onChange}
        value={['0', '0/5', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    const input = screen.getByRole('spinbutton');
    const prevented: string[] = [];
    input.addEventListener(
      'keydown',
      (e) => {
            setTimeout(() => {
          if (e.defaultPrevented) prevented.push(e.key);
        }, 0);
      },
      true,
    );
    ['e', 'E', '+', '-', '.'].forEach((key) => {
      fireEvent.keyDown(input, { key });
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <MinutesCron
        onChange={vi.fn()}
        value={['0', '0/5', '*', '*', '*', '?', '*']}
        translate={translate}
        disabled={true}
      />,
    );
    expect(screen.getByRole('spinbutton')).toBeDisabled();
  });
});

describe('MinutesCron — preventInvalidChars allows valid keys', () => {
  it('does not prevent valid key (digit "3") in the interval input', () => {
    render(
      <MinutesCron onChange={vi.fn()} value={['0', '0/5', '*', '*', '*', '?', '*']} translate={translate} />,
    );
    const input = screen.getByRole('spinbutton');
    fireEvent.keyDown(input, { key: '3' });
    expect(input).toBeInTheDocument();
  });
});
