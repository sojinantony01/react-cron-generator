import React from 'react';
interface CustomCronProp {
    onChange(e: string[]): void;
    value: string[];
    translate(e: string): string;
}
declare const CustomCron: React.FunctionComponent<CustomCronProp>;
export default CustomCron;
