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
    render(
      <YearlyCron onChange={onChange} value={defaultValue} translate={translate} disabled />,
    );
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
});
