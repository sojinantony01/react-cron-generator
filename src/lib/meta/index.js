import Minutes from '../cron-tab/minutes';
import Daily from '../cron-tab/daily';
import Hourly from '../cron-tab/hourly';
import Weekly from '../cron-tab/weekly';
import Monthly from '../cron-tab/monthly';
import Custom from '../cron-tab/custom';

export const HEADER = {
    MINUTES: 'MINUTES',
    HOURLY: 'HOURLY',
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTHLY',
    CUSTOM: 'CUSTOM'
};

const HEADER_VALUES = {
    MINUTES: 'Minutes',
    HOURLY: 'Hourly',
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
    CUSTOM: 'Custom'
};

const defaultTabs = [HEADER_VALUES.MINUTES, HEADER_VALUES.HOURLY, HEADER_VALUES.DAILY, HEADER_VALUES.WEEKLY, HEADER_VALUES.MONTHLY, HEADER_VALUES.CUSTOM];

export const metadata = [{
    'componentName': 'MinutesCron',
    component: Minutes,
    initialCron: ['0', '0/1', '*', '*', '*', '?', '*']
}, {
    'componentName': 'HourlyCron',
    component: Hourly,
    initialCron: ['0', '0', '00', '1/1', '*', '?', '*']
}, {
    'componentName': 'DailyCron',
    component: Daily,
    initialCron: ['0', '0', '00', '*', '*', '?', '*']
}, {
    'componentName': 'WeeklyCron',
    component: Weekly,
    initialCron: ['0', '0', '00', '?', '*', '*', '*']
}, {
    'componentName': 'MonthlyCron',
    component: Monthly,
    initialCron: ['0', '0', '00', '1', '1/1', '?', '*']
}, {
    'componentName': 'CustomCron',
    component: Custom,
    initialCron: ['*', '*', '*', '*', '*', '*', '*']
}];

const validateHeaders = (headers) => {
    const validatedHeaders = [];
    headers.forEach(header => {
        if (!HEADER_VALUES[header]) {
            throw new Error('Invalid header ' + header);
            // Avoid duplicates
        } else if (validatedHeaders.indexOf(HEADER_VALUES[header]) === -1) {
            validatedHeaders.push(HEADER_VALUES[header]);
        }
    });
    return validatedHeaders;
}

/**
 * Validate and load headers
 * @param {*} options
 */
export const loadHeaders = (options) => {
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
