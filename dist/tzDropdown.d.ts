import { Component } from 'react';
interface TzDropdownState {
    isOpen: boolean;
}
export interface TzDropdownProps {
    id: string;
    onChange: (tz: string) => void;
    defaultValue?: string;
    disabled?: boolean;
}
export declare class TzDropdown extends Component<TzDropdownProps, TzDropdownState> {
    state: Readonly<TzDropdownState>;
    protected toggle: () => void;
    render(): JSX.Element;
}
export {};
