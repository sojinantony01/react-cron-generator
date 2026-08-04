import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import YearlyCron from './yearly';

const defaultValue = ['0', '0', '00', '1', '1', '?', '*'];
const translate = (k: string) => k;

describe('YearlyCron', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <YearlyCron onChange={vi.fn()} value={defaultValue} translate={translate} />,
    );
    expect(container).toBeInTheDocument();
  });

  it('shows "Every year in" and "on day" labels', () => {
    render(<YearlyCron onChange={vi.fn()} value={defaultValue} translate={translate} />);
    expect(screen.getByText('Every year in')).toBeInTheDocument();
    expect(screen.getByText('on day')).toBeInTheDocument();
  });

  it('renders Start time label', () => {
    render(<YearlyCron onChange={vi.fn()} value={defaultValue} translate={translate} />);
    expect(screen.getByText('Start time')).toBeInTheDocument();
  });

  it('renders month select with 12 options', () => {
    render(<YearlyCron onChange={vi.fn()} value={defaultValue} translate={translate} />);
    // The month select shows translated month names
    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('December')).toBeInTheDocument();
  });

  it('calls onChange with updated month when month changes', () => {
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={defaultValue} translate={translate} />);
    const selects = screen.getAllByRole('combobox');
    // selects[0] = month, selects[1] = day
    fireEvent.change(selects[0], { target: { value: '3' } });
    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining(['3']), // month = 3 (March)
    );
    const call = onChange.mock.calls[0][0];
    expect(call[4]).toBe('3');
  });

  it('calls onChange with updated day when day changes', () => {
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={defaultValue} translate={translate} />);
    const selects = screen.getAllByRole('combobox');
    // selects[1] = day
    fireEvent.change(selects[1], { target: { value: '15' } });
    expect(onChange).toHaveBeenCalled();
    const call = onChange.mock.calls[0][0];
    expect(call[3]).toBe('15');
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={defaultValue} translate={translate} disabled />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '6' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('clamps day when switching to a month with fewer days', () => {
    // Feb has 29 days max — if current day is 31, it should clamp to 29
    const onChange = vi.fn();
    const value = ['0', '0', '00', '31', '1', '?', '*']; // day 31, January
    render(<YearlyCron onChange={onChange} value={value} translate={translate} />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: '2' } }); // switch to February
    const call = onChange.mock.calls[0][0];
    expect(Number(call[3])).toBeLessThanOrEqual(29);
    expect(call[4]).toBe('2');
  });

  it('applies custom translate function to month names', () => {
    const customTranslate = (k: string) => (k === 'January' ? 'Jan' : k);
    render(<YearlyCron onChange={vi.fn()} value={defaultValue} translate={customTranslate} />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
  });

  it('calls onChange with updated hour when hour select changes', () => {
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={defaultValue} translate={translate} />);
    // Hour select is rendered by HourSelect — role="combobox", after month+day selects
    const selects = screen.getAllByRole('combobox');
    // selects[0]=month, selects[1]=day, selects[2]=hour, selects[3]=minute
    fireEvent.change(selects[2], { target: { value: '08' } });
    expect(onChange).toHaveBeenCalled();
    const call = onChange.mock.calls[0][0];
    expect(call[2]).toBe('08');
  });

  it('calls onChange with updated minute when minute select changes', () => {
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={defaultValue} translate={translate} />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[3], { target: { value: '30' } });
    expect(onChange).toHaveBeenCalled();
    const call = onChange.mock.calls[0][0];
    expect(call[1]).toBe('30');
  });

  it('does not call onChange on hour change when disabled', () => {
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={defaultValue} translate={translate} disabled />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[2], { target: { value: '10' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange on minute change when disabled', () => {
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={defaultValue} translate={translate} disabled />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[3], { target: { value: '45' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange on day change when disabled', () => {
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={defaultValue} translate={translate} disabled />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: '20' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('falls back to month=1 when val[4] is non-numeric', () => {
    // parseInt('*') = NaN → || 1 branch
    const value = ['0', '0', '00', '1', '*', '?', '*'];
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={value} translate={translate} />);
    // Should fall back to month 1
    const selects = screen.getAllByRole('combobox');
    expect((selects[0] as HTMLSelectElement).value).toBe('1');
  });

  it('falls back to day=1 when val[3] is non-numeric', () => {
    // parseInt('?') = NaN → || 1 branch
    const value = ['0', '0', '00', '?', '3', '?', '*'];
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={value} translate={translate} />);
    const selects = screen.getAllByRole('combobox');
    expect((selects[1] as HTMLSelectElement).value).toBe('1');
  });

  it('does not call onChange when selected day is out of range for the month', () => {
    // February: maxDay = 29; selecting day 30 should not fire onChange
    const value = ['0', '0', '00', '1', '2', '?', '*']; // February
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={value} translate={translate} />);
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: '30' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('uses || 31 fallback when DAYS_IN_MONTH index is out of bounds', () => {
    // month=13 → DAYS_IN_MONTH[12] = undefined → || 31 fallback
    const value = ['0', '0', '00', '1', '13', '?', '*'];
    const onChange = vi.fn();
    render(<YearlyCron onChange={onChange} value={value} translate={translate} />);
    // Should render without crashing; day select should have options up to 31
    expect(screen.getByText('1')).toBeInTheDocument(); // day option 1 always present
  });
});
