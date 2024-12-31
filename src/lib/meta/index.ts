import Minutes from '../cron-tab/minutes';
import Daily from '../cron-tab/daily';
import Hourly from '../cron-tab/hourly';
import Weekly from '../cron-tab/weekly';
import Monthly from '../cron-tab/monthly';
import Custom from '../cron-tab/custom';

export type HeaderKeyType = 'MINUTES' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';
export type HeaderValType = 'Minutes' | 'Hourly' | 'Daily' | 'Weekly' | 'Monthly' | 'Custom';
interface HeadersKeyInterface {
  MINUTES: 'MINUTES';
  HOURLY: 'HOURLY';
  DAILY: 'DAILY';
  WEEKLY: 'WEEKLY';
  MONTHLY: 'MONTHLY';
  CUSTOM: 'CUSTOM';
}
interface HeadersInterface {
  MINUTES: 'Minutes';
  HOURLY: 'Hourly';
  DAILY: 'Daily';
  WEEKLY: 'Weekly';
  MONTHLY: 'Monthly';
  CUSTOM: 'Custom';
}
export const HEADER: HeadersKeyInterface = {
  MINUTES: 'MINUTES',
  HOURLY: 'HOURLY',
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  CUSTOM: 'CUSTOM',
};

const HEADER_VALUES: HeadersInterface = {
  MINUTES: 'Minutes',
  HOURLY: 'Hourly',
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  CUSTOM: 'Custom',
};

const defaultTabs: HeaderValType[] = [
  HEADER_VALUES.MINUTES,
  HEADER_VALUES.HOURLY,
  HEADER_VALUES.DAILY,
  HEADER_VALUES.WEEKLY,
  HEADER_VALUES.MONTHLY,
  HEADER_VALUES.CUSTOM,
];

interface MetadataInterface {
  component: typeof Custom;
  name: HeaderValType;
  initialCron: string[];
}

export const metadata: MetadataInterface[] = [
  {
    component: Minutes,
    name: HEADER_VALUES.MINUTES,
    initialCron: ['0', '0/1', '*', '*', '*', '?', '*'],
  },
  {
    component: Hourly,
    name: HEADER_VALUES.HOURLY,
    initialCron: ['0', '0', '00', '1/1', '*', '?', '*'],
  },
  {
    component: Daily,
    name: HEADER_VALUES.DAILY,
    initialCron: ['0', '0', '00', '1/1', '*', '?', '*'],
  },
  {
    component: Weekly,
    name: HEADER_VALUES.WEEKLY,
    initialCron: ['0', '0', '00', '?', '*', '*', '*'],
  },
  {
    component: Monthly,
    name: HEADER_VALUES.MONTHLY,
    initialCron: ['0', '0', '00', '1', '1/1', '?', '*'],
  },
  {
    component: Custom,
    name: HEADER_VALUES.CUSTOM,
    initialCron: ['*', '*', '*', '*', '*', '*', '*'],
  },
];

const validateHeaders = (headers: HeaderKeyType[]): HeaderValType[] => {
  const validatedHeaders: HeaderValType[] = [];
  headers.forEach((header) => {
    if (!HEADER_VALUES[header]) {
      throw new Error('Invalid header ' + header);
      // Avoid duplicates
    } else if (validatedHeaders.indexOf(HEADER_VALUES[header]) === -1) {
      validatedHeaders.push(HEADER_VALUES[header]);
    }
  });
  return validatedHeaders;
};

/**
 * Validate and load headers
 * @param {*} options
 */
export const loadHeaders = (options?: { headers: HeaderKeyType[] }): HeaderValType[] => {
  if (options) {
    if (options.headers) {
      if (!options.headers.length) {
        throw new Error('Atleast one header is required.');
      }
      return validateHeaders(options.headers);
    }
  }
  return defaultTabs;
};
