import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DaySelect from './index';

describe('DaySelect — single mode', () => {
  it('renders the input trigger', () => {
    render(<DaySelect onChange={vi.fn()} value="5" />);
    expect(document.querySelector('input.dropbtn')).toBeInTheDocument();
  });

  it('displays the current value in the input', () => {
    render(<DaySelect onChange={vi.fn()} value="10" />);
    expect((document.querySelector('input.dropbtn') as HTMLInputElement).value).toBe('10');
  });

  it('shows empty input when value is empty string', () => {
    render(<DaySelect onChange={vi.fn()} value="" />);
    expect((document.querySelector('input.dropbtn') as HTMLInputElement).value).toBe('');
  });

  it('does not show dropdown by default', () => {
    render(<DaySelect onChange={vi.fn()} value="" />);
    expect(document.querySelector('.dropdown-content')).not.toBeInTheDocument();
  });

  it('shows dropdown when input is clicked', () => {
    render(<DaySelect onChange={vi.fn()} value="" />);
    fireEvent.click(document.querySelector('input.dropbtn')!);
    expect(document.querySelector('.dropdown-content')).toBeInTheDocument();
  });

  it('renders 31 day options in the dropdown', () => {
    render(<DaySelect onChange={vi.fn()} value="" />);
    fireEvent.click(document.querySelector('input.dropbtn')!);
    const items = document.querySelectorAll('.dropdown-item');
    expect(items).toHaveLength(31);
  });

  it('calls onChange with the clicked day value (single mode)', () => {
    const onChange = vi.fn();
    render(<DaySelect onChange={onChange} value="" />);
    fireEvent.click(document.querySelector('input.dropbtn')!);
    const items = document.querySelectorAll('.dropdown-item');
    fireEvent.click(items[4]); // "5"
    expect(onChange).toHaveBeenCalledWith('5');
  });

  it('calls onChange with null when the same day is clicked again (deselect in single mode)', () => {
    const onChange = vi.fn();
    render(<DaySelect onChange={onChange} value="5" />);
    fireEvent.click(document.querySelector('input.dropbtn')!);
    const items = document.querySelectorAll('.dropdown-item');
    fireEvent.click(items[4]); // "5" again → deselect
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('marks the currently selected day with dropdown-item-selected class', () => {
    render(<DaySelect onChange={vi.fn()} value="3" />);
    fireEvent.click(document.querySelector('input.dropbtn')!);
    const items = document.querySelectorAll('.dropdown-item');
    expect(items[2]).toHaveClass('dropdown-item-selected'); // "3" → index 2
    expect(items[0]).not.toHaveClass('dropdown-item-selected');
  });

  it('does not fire onChange when disabled and an item is clicked', () => {
    const onChange = vi.fn();
    render(<DaySelect onChange={onChange} value="" disabled={true} />);
    fireEvent.click(document.querySelector('input.dropbtn')!);
    const items = document.querySelectorAll('.dropdown-item');
    if (items.length) fireEvent.click(items[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<DaySelect onChange={vi.fn()} value="" disabled={true} />);
    expect(document.querySelector('input.dropbtn')).toBeDisabled();
  });

  it('calls onFocus when input is clicked and onFocus prop is provided', () => {
    const onFocus = vi.fn();
    render(<DaySelect onChange={vi.fn()} value="" onFocus={onFocus} />);
    fireEvent.click(document.querySelector('input.dropbtn')!);
    expect(onFocus).toHaveBeenCalledOnce();
  });

  it('hides dropdown when clicking outside the component', async () => {
    render(
      <div>
        <DaySelect onChange={vi.fn()} value="" />
        <button data-testid="outside">outside</button>
      </div>,
    );
    fireEvent.click(document.querySelector('input.dropbtn')!);
    expect(document.querySelector('.dropdown-content')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    await waitFor(() => {
      expect(document.querySelector('.dropdown-content')).not.toBeInTheDocument();
    });
  });
});

describe('DaySelect — multi mode', () => {
  it('displays joined values in the input', () => {
    render(<DaySelect multi onChange={vi.fn()} value={['5', '10', '15']} />);
    expect((document.querySelector('input.dropbtn') as HTMLInputElement).value).toBe('5,10,15');
  });

  it('shows empty input when value array is empty', () => {
    render(<DaySelect multi onChange={vi.fn()} value={[]} />);
    expect((document.querySelector('input.dropbtn') as HTMLInputElement).value).toBe('');
  });

  it('adds a day to the selection when an unchecked day is clicked', () => {
    const onChange = vi.fn();
    render(<DaySelect multi onChange={onChange} value={['5']} />);
    fireEvent.click(document.querySelector('input.dropbtn')!);
    fireEvent.click(document.querySelectorAll('.dropdown-item')[9]); // "10"
    expect(onChange).toHaveBeenCalledWith(expect.arrayContaining(['5', '10']));
  });

  it('removes a day from the selection when an already-selected day is clicked', () => {
    const onChange = vi.fn();
    render(<DaySelect multi onChange={onChange} value={['5', '10']} />);
    fireEvent.click(document.querySelector('input.dropbtn')!);
    fireEvent.click(document.querySelectorAll('.dropdown-item')[4]); // "5" → remove
    const result = onChange.mock.calls[0][0] as string[];
    expect(result).not.toContain('5');
    expect(result).toContain('10');
  });

  it('marks all selected days with dropdown-item-selected class', () => {
    render(<DaySelect multi onChange={vi.fn()} value={['1', '3', '5']} />);
    fireEvent.click(document.querySelector('input.dropbtn')!);
    const items = document.querySelectorAll('.dropdown-item');
    expect(items[0]).toHaveClass('dropdown-item-selected'); // "1"
    expect(items[2]).toHaveClass('dropdown-item-selected'); // "3"
    expect(items[4]).toHaveClass('dropdown-item-selected'); // "5"
    expect(items[1]).not.toHaveClass('dropdown-item-selected'); // "2"
  });

  it('does not fire onChange when disabled in multi mode', () => {
    const onChange = vi.fn();
    render(<DaySelect multi onChange={onChange} value={[]} disabled={true} />);
    fireEvent.click(document.querySelector('input.dropbtn')!);
    const items = document.querySelectorAll('.dropdown-item');
    if (items.length) fireEvent.click(items[0]);
    expect(onChange).not.toHaveBeenCalled();
  });
});

// Cover the branch where show=true but the click is *inside* the component (ref.current.contains = true).
// In this case the `if` body does NOT run — the dropdown stays visible.
describe('DaySelect — handleClickOutside', () => {
  it('keeps the dropdown open when mousedown occurs inside the component', async () => {
    render(
      <div>
        <DaySelect onChange={vi.fn()} value="" />
        <button data-testid="outside">outside</button>
      </div>,
    );
    // Open the dropdown
    fireEvent.click(document.querySelector('input.dropbtn')!);
    expect(document.querySelector('.dropdown-content')).toBeInTheDocument();

    // Mousedown *inside* the component — ref.current.contains(event.target) is true
    // so setShow(false) is NOT called → dropdown stays open
    fireEvent.mouseDown(document.querySelector('input.dropbtn')!);
    await waitFor(() => {
      expect(document.querySelector('.dropdown-content')).toBeInTheDocument();
    });
  });

  it('does nothing when mousedown occurs outside and show is already false', () => {
    render(
      <div>
        <DaySelect onChange={vi.fn()} value="" />
        <button data-testid="outside2">outside</button>
      </div>,
    );
    // Do NOT open the dropdown — show=false
    // Mousedown outside triggers handleClickOutside but the if-guard is false → no state change
    fireEvent.mouseDown(screen.getByTestId('outside2'));
    // Component stays intact — no error thrown
    expect(document.querySelector('input.dropbtn')).toBeInTheDocument();
  });
});
