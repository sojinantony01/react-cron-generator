import { FunctionComponent } from 'react';
interface DailyCronProp {
    onChange(e?: string[]): void;
    value: string[];
    translate(e: string): string;
}
declare const DailyCron: FunctionComponent<DailyCronProp>;
export default DailyCron;
