import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

// Silence console.log from the Cron onChange handler
beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('App', () => {
  // ── Rendering ──────────────────────────────────────────────────────────────

  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('Cron Expression Generator')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<App />);
    expect(
      screen.getByText('Create cron schedules easily - Supports Unix & Quartz formats'),
    ).toBeInTheDocument();
  });

  it('renders the Unix format checkbox unchecked by default', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('renders the "Quartz (7 fields)" format info when Unix is off', () => {
    render(<App />);
    expect(document.querySelector('.format-info')!.textContent).toMatch(/Quartz \(7 fields\)/);
  });

  it('renders the Cron component (Minutes tab visible by default)', () => {
    render(<App />);
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Hourly')).toBeInTheDocument();
    expect(screen.getByText('Daily')).toBeInTheDocument();
  });

  it('renders the info sections', () => {
    render(<App />);
    expect(screen.getByText('What is a Cron Expression?')).toBeInTheDocument();
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    expect(screen.getByText('Common Use Cases')).toBeInTheDocument();
  });

  it('renders the footer with GitHub and npm links', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/sojinantony01/react-cron-generator',
    );
    expect(screen.getByRole('link', { name: /npm/i })).toHaveAttribute(
      'href',
      'https://www.npmjs.com/package/react-cron-generator',
    );
  });

  // ── Unix format toggle ─────────────────────────────────────────────────────

  it('switches to Unix (5 fields) format info when the checkbox is checked', async () => {
    const user = userEvent.setup();
    render(<App />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    await waitFor(() => {
      // The format-info div now shows Unix format
      expect(document.querySelector('.format-info')!.textContent).toMatch(/Unix \(5 fields\)/);
    });
  });

  it('updates the example text to Unix format when checked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('checkbox'));
    await waitFor(() => {
      expect(document.querySelector('.format-info')!.textContent).toMatch(/\*\/5 \* \* \* \*/);
    });
  });

  it('toggles back to Quartz format info when checkbox is unchecked', async () => {
    const user = userEvent.setup();
    render(<App />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    await user.click(checkbox);
    await waitFor(() => {
      expect(document.querySelector('.format-info')!.textContent).toMatch(/Quartz \(7 fields\)/);
    });
  });

  // ── Cron onChange callback ─────────────────────────────────────────────────

  it('stores the cron value in state when the Cron component fires onChange', async () => {
    const user = userEvent.setup();
    render(<App />);
    // Switching to the Hourly tab fires onChange with the initial hourly cron
    const hourlyTab = screen.getByLabelText('Select Hourly tab');
    await user.click(hourlyTab);
    // The displayed cron expression should update
    await waitFor(() => {
      const cronDisplay = screen.getByLabelText('Cron expression');
      expect(cronDisplay.textContent).toBeTruthy();
    });
  });

  it('fires console.log with the cron value when cron changes', async () => {
    const user = userEvent.setup();
    render(<App />);
    const hourlyTab = screen.getByLabelText('Select Hourly tab');
    await user.click(hourlyTab);
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Cron value:', expect.any(String));
    });
  });
});
