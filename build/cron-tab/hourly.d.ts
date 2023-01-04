import { FunctionComponent } from 'react';
interface HourlyCronProp {
    onChange(e?: string[]): void;
    value: string[];
    translate(e: string): string;
}
declare const HourlyCron: FunctionComponent<HourlyCronProp>;
export default HourlyCron;
