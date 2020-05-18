/// <reference types="react" />
import { BaseTabProps, BaseTabState, BaseCronComponent } from './helpers';
export declare const DEFAULT_VALUE: string[];
export declare const isMinutes: (value: string[]) => boolean;
export default class extends BaseCronComponent<BaseTabProps, BaseTabState> {
  state: Readonly<BaseTabState>;
  constructor(props: BaseTabProps);
  onEveryMinuteChange(e: any): void;
  render(): JSX.Element;
}
