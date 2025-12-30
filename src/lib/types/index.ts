/**
 * Type definitions for the Cron Builder library
 * Provides comprehensive type safety across the application
 */

/**
 * Cron format types
 */
export type CronFormat = 'unix' | 'quartz';

/**
 * Cron field positions for Quartz format (7 fields)
 * 0: second, 1: minute, 2: hour, 3: day, 4: month, 5: day-of-week, 6: year
 */
export type QuartzCronFields = [string, string, string, string, string, string, string];

/**
 * Cron field positions for Unix format (5 fields)
 * 0: minute, 1: hour, 2: day, 3: month, 4: day-of-week
 */
export type UnixCronFields = [string, string, string, string, string];

/**
 * Generic cron value array
 */
export type CronValue = string[];

/**
 * Header/Tab types for the cron builder
 */
export type HeaderType =
  | 'minutes'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'custom';

/**
 * Translation function type
 */
export type TranslateFn = (key: string) => string;

/**
 * Change handler for cron value updates
 */
export type CronChangeHandler = (value: string, humanReadable: string) => void;

/**
 * Error handler for cron operations
 */
export type CronErrorHandler = (error: string) => void;

/**
 * Props for the main Cron component
 */
export interface CronProps {
  /**
   * Current cron expression value
   */
  value?: string;

  /**
   * Callback fired when cron value changes
   * @param value - The new cron expression
   * @param text - Human-readable description of the cron expression
   */
  onChange: CronChangeHandler;

  /**
   * Whether to show human-readable text below the builder
   * @default false
   */
  showResultText: boolean;

  /**
   * Whether to show the cron expression below the builder
   * @default false
   */
  showResultCron: boolean;

  /**
   * Custom translation function for internationalization
   * @param key - Translation key
   * @returns Translated string
   */
  translateFn?: TranslateFn;

  /**
   * Locale for cronstrue library (human-readable descriptions)
   * @default 'en'
   */
  locale?: string;

  /**
   * Configuration options for available tabs/headers
   */
  options?: {
    headers: HeaderType[];
  };

  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to use Unix format (5 fields) instead of Quartz (7 fields)
   * @default false
   */
  isUnix?: boolean;
}

/**
 * Props for cron tab components
 */
export interface CronTabProps {
  /**
   * Callback fired when value changes
   */
  onChange: (value?: CronValue) => void;

  /**
   * Current cron value array
   */
  value: CronValue;

  /**
   * Translation function
   */
  translate: TranslateFn;

  /**
   * Whether the component is disabled
   */
  disabled?: boolean;

  /**
   * Whether using Unix format
   */
  isUnix?: boolean;
}

/**
 * Validation result for cron expressions
 */
export interface CronValidationResult {
  /**
   * Whether the cron expression is valid
   */
  isValid: boolean;

  /**
   * Error message if validation failed
   */
  error?: string;

  /**
   * Detected format of the cron expression
   */
  format?: CronFormat;
}

/**
 * Options for cron state hook
 */
export interface CronStateOptions {
  /**
   * Initial cron value
   */
  initialValue?: string;

  /**
   * Whether to use Unix format
   */
  isUnix?: boolean;

  /**
   * Change handler
   */
  onChange?: (value: string) => void;

  /**
   * Error handler
   */
  onError?: CronErrorHandler;
}

/**
 * Return type for cron state hook
 */
export interface CronStateReturn {
  /**
   * Current state
   */
  state: {
    selectedPeriod: string;
    value: string;
    isUnix: boolean;
  };

  /**
   * Set cron value
   */
  setValue: (value: string) => void;

  /**
   * Set selected period/tab
   */
  setSelectedPeriod: (period: string) => void;

  /**
   * Update value directly
   */
  updateValue: (newValue: string) => void;

  /**
   * Whether current expression is valid
   */
  isValidExpression: boolean;

  /**
   * Validation error message if any
   */
  validationError?: string;
}

/**
 * Options for translation hook
 */
export interface TranslationOptions {
  /**
   * Locale code
   */
  locale?: string;

  /**
   * Custom translation function
   */
  translateFn?: TranslateFn;
}

/**
 * Return type for translation hook
 */
export interface TranslationReturn {
  /**
   * Translation function
   */
  translate: TranslateFn;

  /**
   * Current locale
   */
  locale: string;
}
