import { ChangeEvent, FunctionComponent } from 'react';
interface MinutesSelectProp {
    disabled?: boolean;
    onChange(event: ChangeEvent<HTMLSelectElement>): void;
    value: string;
}
declare const MinutesSelect: FunctionComponent<MinutesSelectProp>;
export default MinutesSelect;
