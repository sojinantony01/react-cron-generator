import React, { ChangeEvent } from 'react';
interface HourSelectProp {
    disabled?: boolean;
    onChange(event: ChangeEvent<HTMLSelectElement>): void;
    value: string;
}
declare const HourSelect: React.FunctionComponent<HourSelectProp>;
export default HourSelect;
