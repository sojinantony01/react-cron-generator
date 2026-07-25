import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

    it('routes "every weekday" expression to Daily tab, not Weekly', async () => {
      const onChange = vi.fn();
      render(
        <Cron
          value="0 0 00 ? * MON-FRI *"
          onChange={onChange}
          showResultText={false}
          showResultCron={false}
        />,
      );
      await waitFor(() => {
        expect(screen.getByLabelText('Select Daily tab')).toHaveClass('active');
        expect(screen.getByLabelText('Select Weekly tab')).not.toHaveClass('active');
      });
    });

    it('routes an unrecognised cron pattern to Custom tab', async () => {
      const onChange = vi.fn();
      render(
        <Cron
          value="0 0 9-17 * * ? *"
          onChange={onChange}
          showResultText={false}
          showResultCron={false}
        />,
      );
      await waitFor(() => {
        expect(screen.getByLabelText('Select Custom tab')).toHaveClass('active');
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
        Minutes: 'Minutos',
        Hourly: 'Por hora',
        Daily: 'Diario',
        Weekly: 'Semanal',
        Monthly: 'Mensual',
        Custom: 'Personalizado',
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

      expect(screen.getByText('Minutos')).toBeInTheDocument();
      expect(screen.getByText('Por hora')).toBeInTheDocument();
      expect(screen.getByText('Diario')).toBeInTheDocument();
      expect(screen.getByText('Semanal')).toBeInTheDocument();
      expect(screen.getByText('Mensual')).toBeInTheDocument();
      expect(screen.getByText('Personalizado')).toBeInTheDocument();

      expect(screen.queryByText('Minutes')).not.toBeInTheDocument();
      expect(screen.queryByText('Hourly')).not.toBeInTheDocument();
    });

    it('should fallback to key when translation not found', () => {
      const onChange = vi.fn();
      const partialTranslations: Record<string, string> = {
        Minutes: 'Minutos',
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

      expect(screen.getByText('Minutos')).toBeInTheDocument();
      expect(screen.getByText('Hourly')).toBeInTheDocument();
      expect(screen.getByText('Daily')).toBeInTheDocument();
    });

    it('should throw error when translateFn returns non-string', () => {
      const onChange = vi.fn();
      const badTranslateFn = () => 123 as any;

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
        Minutes: 'Minutes',
        Hourly: 'Horaire',
        Daily: 'Quotidien',
        Weekly: 'Hebdomadaire',
        Monthly: 'Mensuel',
        Custom: 'Personnalisé',
        Every: 'Chaque',
        'minute(s)': 'minute(s)',
        hour: 'heure',
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
        <Cron onChange={onChange} showResultText={true} showResultCron={false} options={options} />,
      );

      expect(screen.getByText('Minutes')).toBeInTheDocument();
      expect(screen.getByText('Hourly')).toBeInTheDocument();
      expect(screen.getByText('Daily')).toBeInTheDocument();

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
        <Cron onChange={onChange} showResultText={true} showResultCron={false} options={options} />,
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
        <Cron onChange={onChange} showResultText={true} showResultCron={false} options={options} />,
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
        <Cron onChange={onChange} showResultText={true} showResultCron={false} options={options} />,
      );

      const tabs = screen.getAllByRole('button');
      expect(tabs).toHaveLength(2);
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

      expect(screen.getByText('Minutes')).toBeInTheDocument();
      expect(screen.getByText('Hourly')).toBeInTheDocument();
      expect(screen.getByText('Daily')).toBeInTheDocument();
      expect(screen.getByText('Weekly')).toBeInTheDocument();
      expect(screen.getByText('Monthly')).toBeInTheDocument();
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });
  });

  describe('Unix Format Initialization with Values', () => {
    it('should initialize with Unix format value without console errors', () => {
      const onChange = vi.fn();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

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
      expect(consoleError).not.toHaveBeenCalled();
      expect(consoleWarn).not.toHaveBeenCalled();

      consoleError.mockRestore();
      consoleWarn.mockRestore();
    });

    it('should initialize with hourly Unix format value', () => {
      const onChange = vi.fn();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Cron
          value="0 * * * *"
          onChange={onChange}
          showResultText={false}
          showResultCron={true}
          isUnix={true}
        />,
      );

      expect(screen.getByText('0 * * * *')).toBeInTheDocument();
      expect(consoleError).not.toHaveBeenCalled();

      consoleError.mockRestore();
    });

    it('should initialize with daily Unix format value', () => {
      const onChange = vi.fn();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Cron
          value="0 0 * * *"
          onChange={onChange}
          showResultText={false}
          showResultCron={true}
          isUnix={true}
        />,
      );

      expect(screen.getByText('0 0 * * *')).toBeInTheDocument();
      expect(consoleError).not.toHaveBeenCalled();

      consoleError.mockRestore();
    });

    it('should initialize with weekly Unix format value', () => {
      const onChange = vi.fn();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Cron
          value="0 0 * * 1"
          onChange={onChange}
          showResultText={false}
          showResultCron={true}
          isUnix={true}
        />,
      );

      expect(screen.getByText('0 0 * * 1')).toBeInTheDocument();
      expect(consoleError).not.toHaveBeenCalled();

      consoleError.mockRestore();
    });

    it('should initialize with monthly Unix format value', () => {
      const onChange = vi.fn();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Cron
          value="0 0 1 * *"
          onChange={onChange}
          showResultText={false}
          showResultCron={true}
          isUnix={true}
        />,
      );

      expect(screen.getByText('0 0 1 * *')).toBeInTheDocument();
      expect(consoleError).not.toHaveBeenCalled();

      consoleError.mockRestore();
    });

    it('should handle complex Unix cron expressions', () => {
      const onChange = vi.fn();
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Cron
          value="*/15 2-5 * * 1-5"
          onChange={onChange}
          showResultText={false}
          showResultCron={true}
          isUnix={true}
        />,
      );

      expect(screen.getByText('*/15 2-5 * * 1-5')).toBeInTheDocument();
      expect(consoleError).not.toHaveBeenCalled();

      consoleError.mockRestore();
    });

    it('should convert Unix to Quartz internally and back to Unix for display', () => {
      const onChange = vi.fn();

      render(
        <Cron
          value="*/5 * * * *"
          onChange={onChange}
          showResultText={true}
          showResultCron={true}
          isUnix={true}
        />,
      );

      expect(screen.getByText('*/5 * * * *')).toBeInTheDocument();
      expect(screen.getByText(/every 5 minutes/i)).toBeInTheDocument();
    });

    it('should handle onChange callback with Unix format', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Cron
          value="*/5 * * * *"
          onChange={onChange}
          showResultText={false}
          showResultCron={true}
          isUnix={true}
        />,
      );

      const hourlyTab = screen.getByLabelText('Select Hourly tab');
      await user.click(hourlyTab);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled();
        const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
        expect(lastCall[0].split(' ').length).toBe(5);
      });
    });

    it('should work with custom headers and translations', () => {
      const onChange = vi.fn();
      const options = {
        headers: ['MINUTES' as const, 'DAILY' as const],
      };
      const translations: Record<string, string> = {
        Minutes: 'Minutos',
        Daily: 'Diario',
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

describe('Cron Component - Issue #90: Custom tab auto-selection', () => {
  it('should select Custom tab when value cannot be parsed by any structured tab', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 3,8,13,18,23,28,33 * * * * *"
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
      />,
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Select Custom tab')).toHaveClass('active');
    });
  });

  it('should fill the Custom tab input with the unrecognised expression', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 3,8,13,18,23,28,33 * * * * *"
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
      />,
    );

    await waitFor(() => {
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('0 3,8,13,18,23,28,33 * * * * *');
    });
  });

  it('should not select Minutes tab for an expression with comma-separated minutes', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 3,8,13,18,23,28,33 * * * * *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
      />,
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Select Minutes tab')).not.toHaveClass('active');
      expect(screen.getByLabelText('Select Custom tab')).toHaveClass('active');
    });
  });
});

describe('Cron Component - onValueChange empty value fallback', () => {
  it('resets to daily default when a tab component calls onChange with undefined', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Cron onChange={onChange} showResultText={false} showResultCron={true} />);

    const dailyTab = screen.getByLabelText('Select Daily tab');
    await user.click(dailyTab);
    await waitFor(() => expect(dailyTab).toHaveClass('active'));

    await waitFor(() =>
      expect((document.querySelector('input[name="DailyRadio"]') as HTMLInputElement).checked).toBe(
        true,
      ),
    );

    fireEvent.click(screen.getByText('Every week day'));
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    onChange.mockClear();

    fireEvent.click(screen.getAllByText('Every')[0]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });
});

describe('Cron Component - onHeaderChange callback', () => {
  it('calls onHeaderChange when tab is switched', async () => {
    const onChange = vi.fn();
    const onHeaderChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Cron
        onChange={onChange}
        onHeaderChange={onHeaderChange}
        showResultText={false}
        showResultCron={false}
      />,
    );
    const hourlyTab = screen.getByLabelText('Select Hourly tab');
    await user.click(hourlyTab);
    await waitFor(() => {
      expect(onHeaderChange).toHaveBeenCalledWith('Hourly');
    });
  });

  it('calls onHeaderChange with each tab name as tabs change', async () => {
    const onChange = vi.fn();
    const onHeaderChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Cron
        onChange={onChange}
        onHeaderChange={onHeaderChange}
        showResultText={false}
        showResultCron={false}
      />,
    );
    await user.click(screen.getByLabelText('Select Weekly tab'));
    await waitFor(() => expect(onHeaderChange).toHaveBeenCalledWith('Weekly'));

    await user.click(screen.getByLabelText('Select Monthly tab'));
    await waitFor(() => expect(onHeaderChange).toHaveBeenCalledWith('Monthly'));
  });
});

describe('Cron Component - getComponent renders all tab types', () => {
  const tabs = ['MINUTES', 'HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM'] as const;
  tabs.forEach((tab) => {
    it(`renders the ${tab} tab component content`, async () => {
      const onChange = vi.fn();
      render(
        <Cron
          onChange={onChange}
          showResultText={false}
          showResultCron={false}
          options={{ headers: [tab] }}
        />,
      );
      await waitFor(() => {
        const panel = document.querySelector('.cron_builder_bordering');
        expect(panel).toBeTruthy();
        expect(panel!.children.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('Cron Component - setValue fallback to first header', () => {
  it('falls back to first available header when matched tab is not in headers list', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 0/5 * 1/1 * ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
        options={{ headers: ['DAILY'] }}
      />,
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Select Daily tab')).toHaveClass('active');
    });
  });

  it('falls back to first header when no pattern matches and Custom is not available', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 3,8,13 * * * ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
        options={{ headers: ['DAILY'] }}
      />,
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Select Daily tab')).toHaveClass('active');
    });
  });
});

describe('Cron Component - Daily tab matched by N-day interval', () => {
  it('selects Daily tab when value has a day interval greater than 1', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 0 00 1/2 * ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
      />,
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Select Daily tab')).toHaveClass('active');
    });
  });
});

describe('Cron Component - auto-converts a 5-field value when isUnix=false', () => {
  it('renders without error when a 5-field Unix value is passed with isUnix=false', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 0 * * 1"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
        isUnix={false}
      />,
    );
    await waitFor(() => {
      expect(document.querySelector('.cron_builder')).toBeInTheDocument();
    });
  });
});

describe('Cron Component - defaultTab prop', () => {
  it('honours defaultTab when the target tab is in the available headers', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 0/5 * 1/1 * ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
        defaultTab="WEEKLY"
        options={{ headers: ['MINUTES', 'WEEKLY'] }}
      />,
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Select Weekly tab')).toHaveClass('active');
      expect(screen.getByLabelText('Select Minutes tab')).not.toHaveClass('active');
    });
  });

  it('falls back to auto-detected tab when defaultTab target is not in available headers', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 0/5 * 1/1 * ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
        defaultTab="WEEKLY"
        options={{ headers: ['MINUTES', 'DAILY'] }}
      />,
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Select Minutes tab')).toHaveClass('active');
    });
  });

  it('uses defaultTab to override auto-detection to a different available tab', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 0/5 * 1/1 * ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
        defaultTab="DAILY"
        options={{ headers: ['MINUTES', 'DAILY'] }}
      />,
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Select Daily tab')).toHaveClass('active');
    });
  });
});

describe('Cron Component - use6FieldQuartz output', () => {
  it('does not strip the year field when it is not "*"', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 0 12 * * ? 2024"
        onChange={onChange}
        showResultText={false}
        showResultCron={true}
        use6FieldQuartz={true}
      />,
    );
    await waitFor(() => {
      expect(document.querySelector('.cron_builder')).toBeInTheDocument();
    });
    expect(onChange).toHaveBeenCalled();
  });
});

describe('Cron Component - month-day bang-separated value edge cases', () => {
  it('does not compress when only one day in a bang-separated value', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 0 12 5! 1/1 ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
      />,
    );
    await waitFor(() => {
      expect(document.querySelector('.cron_builder')).toBeInTheDocument();
    });
  });

  it('does not compress when bang-separated days contain non-numeric values', async () => {
    const onChange = vi.fn();
    render(
      <Cron
        value="0 0 12 5!abc 1/1 ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
      />,
    );
    await waitFor(() => {
      expect(document.querySelector('.cron_builder')).toBeInTheDocument();
    });
  });
});

describe('Cron Component - isUnix prop change', () => {
  it('fires onChange when isUnix prop changes from false to true', async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Cron
        value="0 0/5 * 1/1 * ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
        isUnix={false}
      />,
    );
    onChange.mockClear();

    rerender(
      <Cron
        value="0 0/5 * 1/1 * ? *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
        isUnix={true}
      />,
    );

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
      expect(lastCall[0].split(' ').length).toBe(5);
    });
  });

  it('fires onChange when isUnix prop changes from true to false', async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Cron
        value="*/5 * * * *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
        isUnix={true}
      />,
    );
    onChange.mockClear();

    rerender(
      <Cron
        value="*/5 * * * *"
        onChange={onChange}
        showResultText={false}
        showResultCron={false}
        isUnix={false}
      />,
    );

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
      expect(lastCall[0].split(' ').length).toBe(7);
    });
  });
});
