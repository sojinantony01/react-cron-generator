import Minutes from '../cron-tab/minutes';
import Daily from '../cron-tab/daily';
import Hourly from '../cron-tab/hourly';
import Weekly from '../cron-tab/weekly';
import Monthly from '../cron-tab/monthly';

export const HEADER = {
    MINUTES: 'MINUTES',
    HOURLY: 'HOURLY',
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTHLY'
};

const HEADER_VALUES = {
    MINUTES: 'Minutes',
    HOURLY: 'Hourly',
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly'
};

const defaultTabs = [HEADER_VALUES.MINUTES, HEADER_VALUES.HOURLY, HEADER_VALUES.DAILY, HEADER_VALUES.WEEKLY, HEADER_VALUES.MONTHLY];

export const metadata = [{
    component: Minutes,
    initialCron: ['0','0/1','*','*','*','?','*']
}, {
    component: Hourly,
    initialCron: ['0','0','00','1/1','*','?','*']
}, {
    component: Daily,
    initialCron: ['0','0','00','1/1','*','?','*']
}, {
    component: Weekly,
    initialCron: ['0','0','00','?','*','*','*']
}, {
    component: Monthly,
    initialCron: ['0','0','00','1','1/1','?','*']
}];

const validateHeaders = (headers) => {
    const validatedHeaders = [];
    headers.forEach(header => {
        if(!HEADER_VALUES[header]) {
            throw new Error('Invalid header ' + header);
            // Avoid duplicates
        } else if(validatedHeaders.indexOf(HEADER_VALUES[header]) === -1) {
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
    if(options) {
        if(options.headers) {
            if(!options.headers.length) {
                throw new Error('Atleast one header is required.');
            }
            return validateHeaders(options.headers);
        }
    }
    return defaultTabs;
};

/**
 * Validate and load enable_monthly_options
 * @param {*} options
 */
export const loadMonthlyOptions = (options) => {
    if(options) {
        if(options.hasOwnProperty('enable_monthly_options')) {
            if(typeof options.enable_monthly_options !== "boolean") {
                throw new Error('enable_monthly_options must be true or false.');
            }
            return options.enable_monthly_options;
        }
    }
    return true;
};

/**
 * Validate and load enable_daily_options
 * @param {*} options
 */
export const loadDailyOptions = (options) => {
    if(options) {
        if(options.hasOwnProperty('enable_daily_options')) {
            if(typeof options.enable_daily_options !== "boolean") {
                throw new Error('enable_daily_options must be true or false.');
            }
            return options.enable_daily_options;
        }
    }
    return true;
};
