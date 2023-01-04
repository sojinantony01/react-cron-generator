import React from 'react';
import { HeaderKeyType } from './meta';
import './cron-builder.css';
interface CronProp {
    value?: string;
    onChange(val: string, text: string): void;
    showResultText: boolean;
    showResultCron: boolean;
    translateFn?(key: string): string;
    locale?: string;
    options?: {
        headers: HeaderKeyType[];
    };
}
declare const Cron: React.FunctionComponent<CronProp>;
export default Cron;
