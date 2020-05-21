import { Component } from 'react';
export declare const DIGIT_REGEXP: RegExp;
export declare const DAY_OF_WEEK_REGEXP: RegExp;
/**
 * Replace an array element with certain value in selected position.
 * Note! Returns new array with replaced element.
 * @param {*} array Original array to replace items in
 * @param {*} position Position to replace item in
 * @param {*} replacement The replacement
 */
export declare const replaceElemAtPos: (array: string[], position: number, replacement: string) => string[];
export declare const isDigit: (value: string) => boolean;
export interface BaseTabProps {
    value: string[];
    onChange: (value: string[]) => void;
}
export interface BaseTabState {
    value: string[];
}
export declare class BaseCronComponent<P extends BaseTabProps, S extends BaseTabState> extends Component<P, S> {
    protected readonly defaultValue: string[];
    constructor(props: P, defaultValue: string[]);
    shouldComponentUpdate(nextProps: BaseTabProps, nextState: BaseTabState): boolean;
    componentDidUpdate(): void;
    notifyOnChange(value: string[]): void;
    makeHoursOptions(): JSX.Element[];
    makeMinutesOptions(): JSX.Element[];
}
