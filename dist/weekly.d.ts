/// <reference types="react" />
import { BaseCronComponent, BaseTabProps, BaseTabState } from './helpers';
export declare const DEFAULT_VALUE: string[];
export declare const isWeekly: (value: string[]) => boolean;
export default class extends BaseCronComponent<BaseTabProps, BaseTabState> {
    state: Readonly<BaseTabState>;
    constructor(props: BaseTabProps);
    onDaySelection(e: any): void;
    onAtHourChange(e: any): void;
    onAtMinuteChange(e: any): void;
    protected onTimezoneChange(timezone: string): void;
    render(): JSX.Element;
}
