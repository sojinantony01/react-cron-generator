/// <reference types="react" />
import { BaseCronComponent, BaseTabProps, BaseTabState } from './helpers';
export declare const DEFAULT_VALUE: string[];
export declare const isMonthly: (value: string[]) => boolean;
export default class extends BaseCronComponent<BaseTabProps, BaseTabState> {
    state: Readonly<BaseTabState>;
    constructor(props: BaseTabProps);
    onDayChange(e: any): void;
    protected onAtHourChange(e: any): void;
    protected onAtMinuteChange(e: any): void;
    protected onTimezoneChange(timezone: string): void;
    render(): JSX.Element;
}
