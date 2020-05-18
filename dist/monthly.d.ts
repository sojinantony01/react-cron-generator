/// <reference types="react" />
import { BaseCronComponent, BaseTabProps, BaseTabState } from './helpers';
export declare const DEFAULT_VALUE: string[];
export declare type MonthlyEvery = '1' | '2' | '3' | '4';
export declare const isMonthly: (value: string[]) => boolean;
export default class extends BaseCronComponent<BaseTabProps, MonthlyTabState> {
  state: Readonly<MonthlyTabState>;
  constructor(props: BaseTabProps);
  shouldComponentUpdate(nextProps: BaseTabProps, nextState: MonthlyTabState): boolean;
  onDayChange(e: any): void;
  protected onAtHourChange(e: any): void;
  protected onAtMinuteChange(e: any): void;
  protected toggleEvery(every: MonthlyEvery): void;
  render(): JSX.Element;
}
export interface MonthlyTabState extends BaseTabState {
  every: MonthlyEvery;
}
