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
      render(
        <Cron onChange={onChange} showResultText={true} showResultCron={false} isUnix={true} />,
      );

      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });

    it('should render with 6-field Quartz format', () => {
      const onChange = vi.fn();
      render(
        <Cron
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          use6FieldQuartz={true}
        />,
      );

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
    render(
      <Cron
        value="*/5 * * * *"
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
        isUnix={true}
      />,
    );

    expect(screen.getByText('*/5 * * * *')).toBeInTheDocument();
  });

  it('should display cron value when provided (Quartz format)', () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 0/5 * * * ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
      />,
    );

    expect(screen.getByText('0 0/5 * * * ? *')).toBeInTheDocument();
  });

  describe('Format Support', () => {
    it('should support Unix format (5 fields)', () => {
      const onChange = vi.fn();
      render(
        <Cron
          value="*/5 * * * *"
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          isUnix={true}
        />,
      );

      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });

    it('should support Quartz 7-field format', () => {
      const onChange = vi.fn();
      render(
        <Cron
          value="0 0/5 * * * ? *"
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
        />,
      );

      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });

    it('should support Quartz 6-field format', () => {
      const onChange = vi.fn();
      render(
        <Cron
          value="0 0 12 * * ?"
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          use6FieldQuartz={true}
        />,
      );

      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });
  });

  describe('Quartz Special Characters', () => {
    it('should handle L (last day) character', () => {
      const onChange = vi.fn();
      render(
        <Cron
          value="0 0 12 L * ? *"
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
        />,
      );

      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });

    it('should handle LW (last weekday) character', () => {
      const onChange = vi.fn();
      render(
        <Cron
          value="0 0 12 LW * ? *"
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
        />,
      );

      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });

    it('should handle L-n (days before end) pattern', () => {
      const onChange = vi.fn();
      render(
        <Cron
          value="0 0 12 L-3 * ? *"
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
        />,
      );

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
        render(
          <Cron
            onChange={onChange}
            showResultText={true}
            showResultCron={false}
            isUnix={true}
            use6FieldQuartz={true}
          />,
        );
      }).toThrow('Cannot use both isUnix and use6FieldQuartz props together');
    });
  });

  describe('Disabled State', () => {
    it('should render in disabled state', () => {
      const onChange = vi.fn();
      render(
        <Cron onChange={onChange} showResultText={true} showResultCron={false} disabled={true} />,
      );

      expect(screen.getByText('Minutes')).toBeInTheDocument();
    });
  });
});

describe('Cron Component - Translation', () => {
  describe('Custom Translation Function', () => {
    it('should use custom translateFn when provided', () => {
      const onChange = vi.fn();
      const customTranslations: Record<string, string> = {
        'Minutes': 'Minutos',
        'Hourly': 'Por hora',
        'Daily': 'Diario',
        'Weekly': 'Semanal',
        'Monthly': 'Mensual',
        'Custom': 'Personalizado',
      };

      const translateFn = (key: string) => customTranslations[key] || key;

      render(
        <Cron
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          translateFn={translateFn}
          locale="es"
        />,
      );

      // Check that custom translations are used
      expect(screen.getByText('Minutos')).toBeInTheDocument();
      expect(screen.getByText('Por hora')).toBeInTheDocument();
      expect(screen.getByText('Diario')).toBeInTheDocument();
      expect(screen.getByText('Semanal')).toBeInTheDocument();
      expect(screen.getByText('Mensual')).toBeInTheDocument();
      expect(screen.getByText('Personalizado')).toBeInTheDocument();

      // Original English text should not be present
      expect(screen.queryByText('Minutes')).not.toBeInTheDocument();
      expect(screen.queryByText('Hourly')).not.toBeInTheDocument();
    });

    it('should fallback to key when translation not found', () => {
      const onChange = vi.fn();
      const partialTranslations: Record<string, string> = {
        'Minutes': 'Minutos',
      };

      const translateFn = (key: string) => partialTranslations[key] || key;

      render(
        <Cron
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          translateFn={translateFn}
        />,
      );

      // Translated key
      expect(screen.getByText('Minutos')).toBeInTheDocument();
      
      // Untranslated keys should fallback to original
      expect(screen.getByText('Hourly')).toBeInTheDocument();
      expect(screen.getByText('Daily')).toBeInTheDocument();
    });

    it('should throw error when translateFn returns non-string', () => {
      const onChange = vi.fn();
      const badTranslateFn = () => 123 as any; // Returns number instead of string

      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <Cron
            onChange={onChange}
            showResultText={true}
            showResultCron={false}
            translateFn={badTranslateFn}
          />,
        );
      }).toThrow('translateFn expects a string translation');

      consoleError.mockRestore();
    });

    it('should use default translations when translateFn not provided', () => {
      const onChange = vi.fn();
      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} />);

      // Default English translations
      expect(screen.getByText('Minutes')).toBeInTheDocument();
      expect(screen.getByText('Hourly')).toBeInTheDocument();
      expect(screen.getByText('Daily')).toBeInTheDocument();
      expect(screen.getByText('Weekly')).toBeInTheDocument();
      expect(screen.getByText('Monthly')).toBeInTheDocument();
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });

    it('should handle French translations', () => {
      const onChange = vi.fn();
      const frenchTranslations: Record<string, string> = {
        'Minutes': 'Minutes',
        'Hourly': 'Horaire',
        'Daily': 'Quotidien',
        'Weekly': 'Hebdomadaire',
        'Monthly': 'Mensuel',
        'Custom': 'Personnalisé',
        'Every': 'Chaque',
        'minute(s)': 'minute(s)',
        'hour': 'heure',
      };

      const translateFn = (key: string) => frenchTranslations[key] || key;

      render(
        <Cron
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          translateFn={translateFn}
          locale="fr"
        />,
      );

      expect(screen.getByText('Horaire')).toBeInTheDocument();
      expect(screen.getByText('Quotidien')).toBeInTheDocument();
      expect(screen.getByText('Hebdomadaire')).toBeInTheDocument();
      expect(screen.getByText('Mensuel')).toBeInTheDocument();
      expect(screen.getByText('Personnalisé')).toBeInTheDocument();
    });

    it('should warn when locale not set with translateFn', () => {
      const onChange = vi.fn();
      const translateFn = (key: string) => key;
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <Cron
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          translateFn={translateFn}
          // locale not provided
        />,
      );

      expect(consoleWarn).toHaveBeenCalledWith(
        'Warning !!! locale not set while using translateFn',
      );

      consoleWarn.mockRestore();
    });
  });
});

describe('Cron Component - Custom Headers', () => {
  describe('Options Prop - Custom Headers', () => {
    it('should render only specified headers', () => {
      const onChange = vi.fn();
      const options = {
        headers: ['MINUTES' as const, 'HOURLY' as const, 'DAILY' as const],
      };

      render(
        <Cron
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          options={options}
        />,
      );

      // Should show specified headers
      expect(screen.getByText('Minutes')).toBeInTheDocument();
      expect(screen.getByText('Hourly')).toBeInTheDocument();
      expect(screen.getByText('Daily')).toBeInTheDocument();

      // Should NOT show unspecified headers
      expect(screen.queryByText('Weekly')).not.toBeInTheDocument();
      expect(screen.queryByText('Monthly')).not.toBeInTheDocument();
      expect(screen.queryByText('Custom')).not.toBeInTheDocument();
    });

    it('should render single header', () => {
      const onChange = vi.fn();
      const options = {
        headers: ['CUSTOM' as const],
      };

      render(
        <Cron
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          options={options}
        />,
      );

      expect(screen.getByText('Custom')).toBeInTheDocument();
      expect(screen.queryByText('Minutes')).not.toBeInTheDocument();
      expect(screen.queryByText('Hourly')).not.toBeInTheDocument();
    });

    it('should handle headers in custom order', () => {
      const onChange = vi.fn();
      const options = {
        headers: ['MONTHLY' as const, 'WEEKLY' as const, 'MINUTES' as const],
      };

      render(
        <Cron
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          options={options}
        />,
      );

      const tabs = screen.getAllByRole('button');
      expect(tabs[0]).toHaveTextContent('Monthly');
      expect(tabs[1]).toHaveTextContent('Weekly');
      expect(tabs[2]).toHaveTextContent('Minutes');
    });

    it('should remove duplicate headers', () => {
      const onChange = vi.fn();
      const options = {
        headers: ['MINUTES' as const, 'MINUTES' as const, 'HOURLY' as const],
      };

      render(
        <Cron
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          options={options}
        />,
      );

      const tabs = screen.getAllByRole('button');
      expect(tabs).toHaveLength(2); // Only 2 unique headers
      expect(screen.getByText('Minutes')).toBeInTheDocument();
      expect(screen.getByText('Hourly')).toBeInTheDocument();
    });

    it('should throw error for empty headers array', () => {
      const onChange = vi.fn();
      const options = {
        headers: [] as any,
      };

      expect(() => {
        render(
          <Cron
            onChange={onChange}
            showResultText={true}
            showResultCron={false}
            options={options}
          />,
        );
      }).toThrow('Atleast one header is required.');
    });

    it('should throw error for invalid header', () => {
      const onChange = vi.fn();
      const options = {
        headers: ['INVALID_HEADER' as any],
      };

      expect(() => {
        render(
          <Cron
            onChange={onChange}
            showResultText={true}
            showResultCron={false}
            options={options}
          />,
        );
      }).toThrow('Invalid header INVALID_HEADER');
    });

    it('should render all headers when options not provided', () => {
      const onChange = vi.fn();

      render(<Cron onChange={onChange} showResultText={true} showResultCron={false} />);

      // All default headers should be present
      expect(screen.getByText('Minutes')).toBeInTheDocument();
      expect(screen.getByText('Hourly')).toBeInTheDocument();
      expect(screen.getByText('Daily')).toBeInTheDocument();
      expect(screen.getByText('Weekly')).toBeInTheDocument();
      expect(screen.getByText('Monthly')).toBeInTheDocument();
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });

    it('should work with custom headers and translations', () => {
      const onChange = vi.fn();
      const options = {
        headers: ['MINUTES' as const, 'DAILY' as const],
      };
      const translations: Record<string, string> = {
        'Minutes': 'Minutos',
        'Daily': 'Diario',
      };
      const translateFn = (key: string) => translations[key] || key;

      render(
        <Cron
          onChange={onChange}
          showResultText={true}
          showResultCron={false}
          options={options}
          translateFn={translateFn}
          locale="es"
        />,
      );

      expect(screen.getByText('Minutos')).toBeInTheDocument();
      expect(screen.getByText('Diario')).toBeInTheDocument();
      expect(screen.queryByText('Minutes')).not.toBeInTheDocument();
    });
  });
});
