/// <reference types="react" />
import { BaseCronComponent, BaseTabProps, BaseTabState } from './helpers';
export declare const DEFAULT_VALUE: string[];
export declare const isDaily: (value: string[]) => boolean;
export default class extends BaseCronComponent<BaseTabProps, BaseTabState> {
  state: Readonly<BaseTabState>;
  constructor(props: BaseTabProps);
  protected onEveryDayChange(e: any): void;
  protected onAtHourChange(e: any): void;
  protected onAtMinuteChange(e: any): void;
  protected toggleEvery(every: boolean): void;
  render(): JSX.Element;
}
