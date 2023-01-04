import Custom from '../cron-tab/custom';
export type HeaderKeyType = "MINUTES" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "CUSTOM";
export type HeaderValType = "Minutes" | "Hourly" | "Daily" | "Weekly" | "Monthly" | "Custom";
interface HeadersKeyInterface {
    MINUTES: 'MINUTES';
    HOURLY: 'HOURLY';
    DAILY: 'DAILY';
    WEEKLY: 'WEEKLY';
    MONTHLY: 'MONTHLY';
    CUSTOM: 'CUSTOM';
}
export declare const HEADER: HeadersKeyInterface;
interface MetadataInterface {
    component: typeof Custom;
    name: HeaderValType;
    initialCron: string[];
}
export declare const metadata: MetadataInterface[];
/**
 * Validate and load headers
 * @param {*} options
 */
export declare const loadHeaders: (options?: {
    headers: HeaderKeyType[];
}) => HeaderValType[];
export {};
