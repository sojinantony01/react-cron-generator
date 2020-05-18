/// <reference types="react" />
import { BaseCronComponent, BaseTabProps, BaseTabState } from './helpers';
export declare const DEFAULT_VALUE: string[];
export declare const isHourly: (value: string[]) => boolean;
export default class extends BaseCronComponent<BaseTabProps, BaseTabState> {
  state: Readonly<BaseTabState>;
  constructor(props: BaseTabProps);
  onEveryHourChange(e: any): void;
  onAtHourChange(e: any): void;
  onAtMinuteChange(e: any): void;
  toggleEvery(every: boolean): void;
  render(): JSX.Element;
}
