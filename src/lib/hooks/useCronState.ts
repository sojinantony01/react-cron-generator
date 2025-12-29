/**
 * Custom hook for managing cron component state
 * Fixes React Hook dependency warnings and centralizes state logic
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { quartzToUnix, unixToQuartz, detectCronFormat } from '../utils/cron-converter';
import { validateCron } from '../utils/cron-validator';

export interface CronState {
  selectedPeriod: string;
  value: string;
  isUnix: boolean;
}

export interface UseCronStateOptions {
  initialValue?: string;
  isUnix?: boolean;
  onChange?: (value: string) => void;
  onError?: (error: string) => void;
}

export interface UseCronStateReturn {
  state: CronState;
  setValue: (value: string) => void;
  setSelectedPeriod: (period: string) => void;
  updateValue: (newValue: string) => void;
  isValidExpression: boolean;
  validationError?: string;
}

/**
 * Custom hook for managing cron state with validation and format conversion
 */
export function useCronState(options: UseCronStateOptions = {}): UseCronStateReturn {
  const {
    initialValue = '0 0/5 * * * ? *',
    isUnix = false,
    onChange,
    onError,
  } = options;

  // Use ref to track if this is the initial mount
  const isInitialMount = useRef(true);
  const onChangeRef = useRef(onChange);
  const onErrorRef = useRef(onError);

  // Update refs when callbacks change
  useEffect(() => {
    onChangeRef.current = onChange;
    onErrorRef.current = onError;
  }, [onChange, onError]);

  // Initialize state
  const [state, setState] = useState<CronState>(() => {
    let processedValue = initialValue;

    // Convert initial value if needed
    if (isUnix && initialValue) {
      const format = detectCronFormat(initialValue);
      if (format === 'quartz') {
        try {
          processedValue = quartzToUnix(initialValue);
        } catch (error) {
          console.warn('Failed to convert initial Quartz value to Unix:', error);
        }
      }
    }

    return {
      selectedPeriod: 'minutes',
      value: processedValue,
      isUnix,
    };
  });

  // Validate current value
  const validation = validateCron(state.value);
  const isValidExpression = validation.isValid;
  const validationError = validation.error;

  /**
   * Set the cron value with format conversion if needed
   */
  const setValue = useCallback((newValue: string) => {
    if (!newValue) {
      setState(prev => ({ ...prev, value: '' }));
      return;
    }

    let processedValue = newValue;

    try {
      // Convert between formats if needed
      if (state.isUnix) {
        const format = detectCronFormat(newValue);
        if (format === 'quartz') {
          processedValue = quartzToUnix(newValue);
        }
      } else {
        const format = detectCronFormat(newValue);
        if (format === 'unix') {
          processedValue = unixToQuartz(newValue);
        }
      }

      setState(prev => ({ ...prev, value: processedValue }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid cron expression';
      console.error('Error setting cron value:', errorMessage);
      if (onErrorRef.current) {
        onErrorRef.current(errorMessage);
      }
      // Still update state with original value to show error
      setState(prev => ({ ...prev, value: newValue }));
    }
  }, [state.isUnix]);

  /**
   * Set the selected period (tab)
   */
  const setSelectedPeriod = useCallback((period: string) => {
    setState(prev => ({ ...prev, selectedPeriod: period }));
  }, []);

  /**
   * Update value directly (used by child components)
   */
  const updateValue = useCallback((newValue: string) => {
    setState(prev => ({ ...prev, value: newValue }));
  }, []);

  /**
   * Notify parent of value changes (skip initial mount)
   */
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (onChangeRef.current && state.value) {
      // Validate before calling onChange
      const validation = validateCron(state.value);
      if (validation.isValid) {
        onChangeRef.current(state.value);
      } else if (onErrorRef.current) {
        onErrorRef.current(validation.error || 'Invalid cron expression');
      }
    }
  }, [state.value]);

  /**
   * Handle format changes (isUnix prop change)
   */
  useEffect(() => {
    if (state.isUnix !== isUnix && state.value) {
      try {
        let convertedValue = state.value;
        
        if (isUnix) {
          // Converting to Unix
          const format = detectCronFormat(state.value);
          if (format === 'quartz') {
            convertedValue = quartzToUnix(state.value);
          }
        } else {
          // Converting to Quartz
          const format = detectCronFormat(state.value);
          if (format === 'unix') {
            convertedValue = unixToQuartz(state.value);
          }
        }

        setState(prev => ({ ...prev, value: convertedValue, isUnix }));
      } catch (error) {
        console.error('Error converting cron format:', error);
        setState(prev => ({ ...prev, isUnix }));
      }
    } else if (state.isUnix !== isUnix) {
      setState(prev => ({ ...prev, isUnix }));
    }
  }, [isUnix, state.isUnix, state.value]);

  return {
    state,
    setValue,
    setSelectedPeriod,
    updateValue,
    isValidExpression,
    validationError,
  };
}


