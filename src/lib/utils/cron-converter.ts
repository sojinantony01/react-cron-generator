/**
 * Utility functions to convert between Unix (5 fields) and Quartz (7 fields) cron formats
 * 
 * Unix format: minute hour day month day-of-week
 * Quartz format: second minute hour day month day-of-week year
 */

/**
 * Convert Unix cron (5 fields) to Quartz cron (7 fields)
 * @param unixCron - Unix cron expression (e.g., "star/5 * * * *")
 * @returns Quartz cron expression (e.g., "0 0/5 * * * ? *")
 */
export const unixToQuartz = (unixCron: string): string => {
  const parts = unixCron.trim().split(/\s+/);
  
  if (parts.length !== 5) {
    throw new Error('Invalid Unix cron expression. Expected 5 fields.');
  }

  const [minute, hour, day, month, dayOfWeek] = parts;

  // Unix uses 0-6 (Sunday=0) or 0-7 (Sunday=0 or 7)
  // Quartz uses 1-7 (Sunday=1) or SUN-SAT
  // Also, Unix uses * for both day and dayOfWeek, Quartz uses ? for one of them
  
  let quartzDay = day;
  let quartzDayOfWeek = dayOfWeek;

  // Convert day of week from Unix to Quartz format
  if (dayOfWeek !== '*') {
    // If day of week is specified, day should be ?
    quartzDay = '?';
    quartzDayOfWeek = convertUnixDayOfWeekToQuartz(dayOfWeek);
  } else if (day !== '*') {
    // If day is specified, day of week should be ?
    quartzDayOfWeek = '?';
  } else {
    // Both are *, set day of week to ?
    quartzDayOfWeek = '?';
  }

  // Quartz format: second minute hour day month day-of-week year
  return `0 ${minute} ${hour} ${quartzDay} ${month} ${quartzDayOfWeek} *`;
};

/**
 * Convert Quartz cron (7 fields) to Unix cron (5 fields)
 * @param quartzCron - Quartz cron expression (e.g., "0 0/5 * * * ? *")
 * @returns Unix cron expression (e.g., "star/5 * * * *")
 */
export const quartzToUnix = (quartzCron: string): string => {
  const parts = quartzCron.trim().split(/\s+/);
  
  if (parts.length !== 7) {
    throw new Error('Invalid Quartz cron expression. Expected 7 fields.');
  }

  const [, minute, hour, day, month, dayOfWeek] = parts;

  // Convert day of week from Quartz to Unix format
  let unixDayOfWeek = dayOfWeek;
  let unixDay = day;

  if (dayOfWeek !== '?' && dayOfWeek !== '*') {
    unixDayOfWeek = convertQuartzDayOfWeekToUnix(dayOfWeek);
    unixDay = '*';
  } else if (day !== '?' && day !== '*') {
    unixDayOfWeek = '*';
  } else {
    // Both are ? or *, default to *
    unixDay = '*';
    unixDayOfWeek = '*';
  }

  // Unix format: minute hour day month day-of-week
  return `${minute} ${hour} ${unixDay} ${month} ${unixDayOfWeek}`;
};

/**
 * Convert Unix day of week (0-6 or 0-7, where 0=Sunday) to Quartz format (1-7 or SUN-SAT, where 1=Sunday)
 */
const convertUnixDayOfWeekToQuartz = (unixDow: string): string => {
  // Handle ranges and lists
  if (unixDow.includes('-')) {
    const parts = unixDow.split('-');
    return parts.map(p => convertSingleUnixDayToQuartz(p)).join('-');
  }
  
  if (unixDow.includes(',')) {
    const parts = unixDow.split(',');
    return parts.map(p => convertSingleUnixDayToQuartz(p)).join(',');
  }

  if (unixDow.includes('/')) {
    const [range, step] = unixDow.split('/');
    if (range === '*') {
      return `*/${step}`;
    }
    return `${convertUnixDayOfWeekToQuartz(range)}/${step}`;
  }

  return convertSingleUnixDayToQuartz(unixDow);
};

/**
 * Convert a single Unix day number to Quartz format
 */
const convertSingleUnixDayToQuartz = (day: string): string => {
  const dayMap: { [key: string]: string } = {
    '0': 'SUN',
    '1': 'MON',
    '2': 'TUE',
    '3': 'WED',
    '4': 'THU',
    '5': 'FRI',
    '6': 'SAT',
    '7': 'SUN', // Unix allows 7 for Sunday
  };

  return dayMap[day] || day;
};

/**
 * Convert Quartz day of week (1-7 or SUN-SAT, where 1=Sunday) to Unix format (0-6, where 0=Sunday)
 */
const convertQuartzDayOfWeekToUnix = (quartzDow: string): string => {
  // Handle ranges and lists
  if (quartzDow.includes('-')) {
    const parts = quartzDow.split('-');
    return parts.map(p => convertSingleQuartzDayToUnix(p)).join('-');
  }
  
  if (quartzDow.includes(',') || quartzDow.includes('!')) {
    const separator = quartzDow.includes('!') ? '!' : ',';
    const parts = quartzDow.split(separator);
    return parts.map(p => convertSingleQuartzDayToUnix(p)).join(',');
  }

  if (quartzDow.includes('/')) {
    const [range, step] = quartzDow.split('/');
    if (range === '*') {
      return `*/${step}`;
    }
    return `${convertQuartzDayOfWeekToUnix(range)}/${step}`;
  }

  return convertSingleQuartzDayToUnix(quartzDow);
};

/**
 * Convert a single Quartz day to Unix format
 */
const convertSingleQuartzDayToUnix = (day: string): string => {
  const dayMap: { [key: string]: string } = {
    'SUN': '0',
    'MON': '1',
    'TUE': '2',
    'WED': '3',
    'THU': '4',
    'FRI': '5',
    'SAT': '6',
    '1': '0', // Quartz Sunday
    '2': '1',
    '3': '2',
    '4': '3',
    '5': '4',
    '6': '5',
    '7': '6',
  };

  return dayMap[day] || day;
};

/**
 * Detect if a cron expression is Unix or Quartz format
 * @param cron - Cron expression
 * @returns 'unix' | 'quartz' | 'unknown'
 */
export const detectCronFormat = (cron: string): 'unix' | 'quartz' | 'unknown' => {
  const parts = cron.trim().split(/\s+/);
  
  if (parts.length === 5) {
    return 'unix';
  } else if (parts.length === 7) {
    return 'quartz';
  } else if (parts.length === 6) {
    // Could be either format without year/second
    // Assume Quartz (6 fields = second minute hour day month day-of-week)
    return 'quartz';
  }
  
  return 'unknown';
};


