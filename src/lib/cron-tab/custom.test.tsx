import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomCron from './custom';

const translate = (key: string) => key;

describe('CustomCron', () => {
  it('renders the expression label and text input', () => {
    render(
      <CustomCron
        onChange={vi.fn()}
        value={['0', '0', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    expect(screen.getByText('Expression')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays the current cron value (internal ! → , and array → space-joined)', () => {
    render(
      <CustomCron
        onChange={vi.fn()}
        value={['0', '0', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    expect(screen.getByRole('textbox')).toHaveValue('0 0 * * * ? *');
  });

  it('converts ! back to , for display', () => {
    render(
      <CustomCron
        onChange={vi.fn()}
        value={['0', '0', '*', '*', 'MON!WED', '?', '*']}
        translate={translate}
      />,
    );
    expect(screen.getByRole('textbox')).toHaveValue('0 0 * * MON,WED ? *');
  });

  it('calls onChange with space-split array when user types a new expression', () => {
    const onChange = vi.fn();
    render(
      <CustomCron
        onChange={onChange}
        value={['0', '0', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '5 4 * * 1' } });
    expect(onChange).toHaveBeenCalledWith(['5', '4', '*', '*', '1']);
  });

  it('converts commas to ! in the emitted array', () => {
    const onChange = vi.fn();
    render(
      <CustomCron
        onChange={onChange}
        value={['0', '0', '*', '*', '*', '?', '*']}
        translate={translate}
      />,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '0 0 * * MON,WED' } });
    expect(onChange).toHaveBeenCalledWith(['0', '0', '*', '*', 'MON!WED']);
  });

  it('does NOT call onChange when disabled', () => {
    const onChange = vi.fn();
    render(
      <CustomCron
        onChange={onChange}
        value={['0', '0', '*', '*', '*', '?', '*']}
        translate={translate}
        disabled={true}
      />,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '5 4 * * 1' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <CustomCron
        onChange={vi.fn()}
        value={['*', '*', '*', '*', '*', '*', '*']}
        translate={translate}
        disabled={true}
      />,
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
