import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Cron from './cron';

describe('Cron Component - Basic Functionality', () => {
  describe('Component Rendering', () => {
    it('should render with default values', () => {
      const onChange = vi.fn();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
      expect(screen.getByText('Hourly')).toBeInTheDocument();
      expect(screen.getByText('Daily')).toBeInTheDocument();
      expect(screen.getByText('Weekly')).toBeInTheDocument();
      expect(screen.getByText('Monthly')).toBeInTheDocument();
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });

    it('should render with Unix format', () => {
      const onChange = vi.fn();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} isUnix={true} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });

    it('should render with 6-field Quartz format', () => {
      const onChange = vi.fn();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} use6FieldQuartz={true} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });
  });

  describe('Tab Interaction', () => {
    it('should switch tabs when clicked', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} />);
      
      const hourlyTab = screen.getByLabelText('Select Hourly tab');
      await user.click(hourlyTab);
      
      await waitFor(() => {
        expect(hourlyTab).toHaveClass('active');
      });
    });

    it('should switch to Daily tab', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} />);
      
      const dailyTab = screen.getByLabelText('Select Daily tab');
      await user.click(dailyTab);
      
      await waitFor(() => {
        expect(dailyTab).toHaveClass('active');
      });
    });

    it('should switch to Weekly tab', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} />);
      
      const weeklyTab = screen.getByLabelText('Select Weekly tab');
      await user.click(weeklyTab);
      
      await waitFor(() => {
        expect(weeklyTab).toHaveClass('active');
      });
    });

    it('should switch to Monthly tab', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} />);
      
      const monthlyTab = screen.getByLabelText('Select Monthly tab');
      await user.click(monthlyTab);
      
      await waitFor(() => {
        expect(monthlyTab).toHaveClass('active');
      });
    });

    it('should switch to Custom tab', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} />);
      
      const customTab = screen.getByLabelText('Select Custom tab');
      await user.click(customTab);
      
      await waitFor(() => {
        expect(customTab).toHaveClass('active');
      });
    });
  });

  describe('Cron Value Changes', () => {
    it('should call onChange when value changes', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} />);
      
      const hourlyTab = screen.getByLabelText('Select Hourly tab');
      await user.click(hourlyTab);
      
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });
    });
  });
    it('should display cron value when provided (Unix format)', () => {
      const onChange = vi.fn();
      render(<Cron value="*/5 * * * *" onChange={onChange} showResultText={false} showResultCron={true} isUnix={true} />);
      
      expect(screen.getByText('*/5 * * * *')).toBeInTheDocument();
    });

    it('should display cron value when provided (Quartz format)', () => {
      const onChange = vi.fn();
      render(<Cron value="0 0/5 * * * ? *" onChange={onChange} showResultText={false} showResultCron={true} />);
      
      expect(screen.getByText('0 0/5 * * * ? *')).toBeInTheDocument();
    });



  describe('Format Support', () => {
    it('should support Unix format (5 fields)', () => {
      const onChange = vi.fn();
      render(<Cron value="*/5 * * * *" onChange={onChange} showResultText={true} showResultCron={false} isUnix={true} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });

    it('should support Quartz 7-field format', () => {
      const onChange = vi.fn();
      render(<Cron value="0 0/5 * * * ? *" onChange={onChange} showResultText={true} showResultCron={false} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });


    it('should support Quartz 6-field format', () => {
      const onChange = vi.fn();
      render(<Cron value="0 0 12 * * ?" onChange={onChange} showResultText={true} showResultCron={false} use6FieldQuartz={true} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });
  });

  describe('Quartz Special Characters', () => {
    it('should handle L (last day) character', () => {
      const onChange = vi.fn();
      render(<Cron value="0 0 12 L * ? *" onChange={onChange} showResultText={true} showResultCron={false} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });

    it('should handle LW (last weekday) character', () => {
      const onChange = vi.fn();
      render(<Cron value="0 0 12 LW * ? *" onChange={onChange} showResultText={true} showResultCron={false} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });

    it('should handle L-n (days before end) pattern', () => {
      const onChange = vi.fn();
      render(<Cron value="0 0 12 L-3 * ? *" onChange={onChange} showResultText={true} showResultCron={false} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty value', () => {
      const onChange = vi.fn();
      render(<Cron value="" onChange={onChange} showResultText={true} showResultCron={false} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });

    it('should handle undefined value', () => {
      const onChange = vi.fn();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });

    it('should throw error when both isUnix and use6FieldQuartz are true', () => {
      const onChange = vi.fn();
      
      expect(() => {
        render(<Cron onChange={onChange} showResultText={true} showResultCron={false} isUnix={true} use6FieldQuartz={true} />);
      }).toThrow('Cannot use both isUnix and use6FieldQuartz props together');
    });
  });

  describe('Disabled State', () => {
    it('should render in disabled state', () => {
      const onChange = vi.fn();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} disabled={true} />);
      
      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });
  });
});


