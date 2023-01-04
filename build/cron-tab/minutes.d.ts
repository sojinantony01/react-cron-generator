import { FunctionComponent } from 'react';
interface MinutesCronProp {
    onChange(e: string[]): void;
    value: string[];
    translate(e: string): string;
}
declare const MinutesCron: FunctionComponent<MinutesCronProp>;
export default MinutesCron;
