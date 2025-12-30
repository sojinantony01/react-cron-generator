/**
 * Cron validation utilities
 * Provides validation for both Unix (5-field) and Quartz (7-field) cron expressions
 */

import { CronValidationResult } from '../types';

/**
 * Validates a Unix cron expression (5 fields)
 * Format: minute hour day month day-of-week
 */
export function validateUnixCron(expression: string): CronValidationResult {
  if (!expression || typeof expression !== 'string') {
    return { isValid: false, error: 'Expression must be a non-empty string' };
  }

  const trimmed = expression.trim();
  const parts = trimmed.split(/\s+/);

  if (parts.length !== 5) {
    return {
      isValid: false,
      error: `Unix cron must have 5 fields, got ${parts.length}`,
    };
  }

  const [minute, hour, day, month, dayOfWeek] = parts;

  // Validate each field
  const validations = [
    { field: minute, name: 'minute', min: 0, max: 59 },
    { field: hour, name: 'hour', min: 0, max: 23 },
    { field: day, name: 'day', min: 1, max: 31 },
    { field: month, name: 'month', min: 1, max: 12 },
    { field: dayOfWeek, name: 'day-of-week', min: 0, max: 7 },
  ];

  for (const validation of validations) {
    const result = validateCronField(
      validation.field,
      validation.name,
      validation.min,
      validation.max,
    );
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true, format: 'unix' };
}

/**
 * Validates a Quartz cron expression (6 or 7 fields)
 * Format: second minute hour day month day-of-week [year]
 */
export function validateQuartzCron(expression: string): CronValidationResult {
  if (!expression || typeof expression !== 'string') {
    return { isValid: false, error: 'Expression must be a non-empty string' };
  }

  const trimmed = expression.trim();
  const parts = trimmed.split(/\s+/);

  if (parts.length !== 6 && parts.length !== 7) {
    return {
      isValid: false,
      error: `Quartz cron must have 6 or 7 fields, got ${parts.length}`,
    };
  }

  const [second, minute, hour, day, month, dayOfWeek, year] = parts;

  // Validate each field
  const validations = [
    { field: second, name: 'second', min: 0, max: 59 },
    { field: minute, name: 'minute', min: 0, max: 59 },
    { field: hour, name: 'hour', min: 0, max: 23 },
    { field: day, name: 'day', min: 1, max: 31 },
    { field: month, name: 'month', min: 1, max: 12 },
    { field: dayOfWeek, name: 'day-of-week', min: 0, max: 7 },
  ];

  if (year) {
    validations.push({ field: year, name: 'year', min: 1970, max: 2099 });
  }

  for (const validation of validations) {
    const result = validateCronField(
      validation.field,
      validation.name,
      validation.min,
      validation.max,
    );
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true, format: 'quartz' };
}

/**
 * Validates a single cron field
 */
function validateCronField(
  field: string,
  name: string,
  min: number,
  max: number,
): CronValidationResult {
  if (!field) {
    return { isValid: false, error: `${name} field is required` };
  }

  // Allow wildcards
  if (field === '*' || field === '?') {
    return { isValid: true };
  }

  // Allow Quartz-specific special characters for day field
  if (name === 'day') {
    // L = last day of month
    if (field === 'L') {
      return { isValid: true };
    }
    // LW = last weekday of month
    if (field === 'LW') {
      return { isValid: true };
    }
    // L-n = n days before end of month (e.g., L-3)
    if (field.startsWith('L-')) {
      const daysBeforeEnd = Number(field.substring(2));
      if (!isNaN(daysBeforeEnd) && daysBeforeEnd > 0 && daysBeforeEnd <= 31) {
        return { isValid: true };
      }
      return { isValid: false, error: `Invalid L-n value in ${name}: ${field}` };
    }
    // nW = nearest weekday to day n (e.g., 15W)
    if (field.endsWith('W')) {
      const dayNum = Number(field.slice(0, -1));
      if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 31) {
        return { isValid: true };
      }
      return { isValid: false, error: `Invalid nW value in ${name}: ${field}` };
    }
  }

  // Allow Quartz-specific special characters for day-of-week field
  if (name === 'day-of-week') {
    // n#m = mth occurrence of day n (e.g., 2#3 = 3rd Tuesday)
    if (field.includes('#')) {
      const [day, occurrence] = field.split('#').map(Number);
      if (
        !isNaN(day) &&
        !isNaN(occurrence) &&
        day >= 1 &&
        day <= 7 &&
        occurrence >= 1 &&
        occurrence <= 5
      ) {
        return { isValid: true };
      }
      return { isValid: false, error: `Invalid n#m value in ${name}: ${field}` };
    }
    // nL = last occurrence of day n (e.g., 6L = last Friday)
    if (field.endsWith('L')) {
      const dayNum = Number(field.slice(0, -1));
      if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 7) {
        return { isValid: true };
      }
      return { isValid: false, error: `Invalid nL value in ${name}: ${field}` };
    }
  }

  // Allow ranges (e.g., 1-5)
  if (field.includes('-') && !field.startsWith('L-')) {
    const [start, end] = field.split('-').map(Number);
    if (isNaN(start) || isNaN(end)) {
      return { isValid: false, error: `Invalid range in ${name}: ${field}` };
    }
    if (start < min || end > max || start > end) {
      return {
        isValid: false,
        error: `Range ${field} in ${name} must be between ${min}-${max}`,
      };
    }
    return { isValid: true };
  }

  // Allow step values (e.g., */5, 0/15)
  if (field.includes('/')) {
    const [base, step] = field.split('/');
    const stepNum = Number(step);
    if (isNaN(stepNum) || stepNum <= 0) {
      return { isValid: false, error: `Invalid step value in ${name}: ${field}` };
    }
    if (base !== '*' && base !== '0') {
      const baseNum = Number(base);
      if (isNaN(baseNum) || baseNum < min || baseNum > max) {
        return {
          isValid: false,
          error: `Base value ${base} in ${name} must be between ${min}-${max}`,
        };
      }
    }
    return { isValid: true };
  }

  // Allow lists (e.g., 1,2,3)
  if (field.includes(',')) {
    const values = field.split(',').map(Number);
    for (const value of values) {
      if (isNaN(value) || value < min || value > max) {
        return {
          isValid: false,
          error: `Value ${value} in ${name} must be between ${min}-${max}`,
        };
      }
    }
    return { isValid: true };
  }

  // Single numeric value
  const value = Number(field);
  if (isNaN(value)) {
    return { isValid: false, error: `Invalid value in ${name}: ${field}` };
  }
  if (value < min || value > max) {
    return {
      isValid: false,
      error: `Value ${value} in ${name} must be between ${min}-${max}`,
    };
  }

  return { isValid: true };
}

/**
 * Auto-detects and validates a cron expression
 */
export function validateCron(expression: string): CronValidationResult {
  if (!expression || typeof expression !== 'string') {
    return { isValid: false, error: 'Expression must be a non-empty string' };
  }

  const trimmed = expression.trim();
  const fieldCount = trimmed.split(/\s+/).length;

  if (fieldCount === 5) {
    return validateUnixCron(trimmed);
  } else if (fieldCount === 6 || fieldCount === 7) {
    return validateQuartzCron(trimmed);
  } else {
    return {
      isValid: false,
      error: `Invalid cron expression: expected 5 (Unix) or 6-7 (Quartz) fields, got ${fieldCount}`,
    };
  }
}

/**
 * Checks if a cron expression is valid (simple boolean check)
 */
export function isValidCron(expression: string): boolean {
  return validateCron(expression).isValid;
}
