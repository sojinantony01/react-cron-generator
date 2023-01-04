import { FunctionComponent } from 'react';
interface MonthlyCronProp {
    onChange(e?: string[]): void;
    value: string[];
    translate(e: string): string;
}
declare const MonthlyCron: FunctionComponent<MonthlyCronProp>;
export default MonthlyCron;
