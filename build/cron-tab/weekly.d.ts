import { FunctionComponent } from 'react';
interface WeeklyCronProp {
    onChange(e?: string[]): void;
    value: string[];
    translate(e: string): string;
}
declare const WeeklyCron: FunctionComponent<WeeklyCronProp>;
export default WeeklyCron;
