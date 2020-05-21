import React, { Component } from 'react';

export const DIGIT_REGEXP = /^\d+$/i;
export const DAY_OF_WEEK_REGEXP = /^(mon|tue|wed|thu|fri|sat|sun|,)+$/gi;

/**
 * Replace an array element with certain value in selected position.
 * Note! Returns new array with replaced element.
 * @param {*} array Original array to replace items in
 * @param {*} position Position to replace item in
 * @param {*} replacement The replacement
 */
export const replaceElemAtPos = (array: string[], position: number, replacement: string) => {
  return array ? array.map((elem, index) => (index === position ? replacement : elem)) : array;
};

export const isDigit = (value: string) => new RegExp(DIGIT_REGEXP).exec(value) !== null;

export interface BaseTabProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export interface BaseTabState {
  value: string[];
}

export class BaseCronComponent<P extends BaseTabProps, S extends BaseTabState> extends Component<P, S> {
  constructor(props: P, protected readonly defaultValue: string[]) {
    super(props);
  }

  shouldComponentUpdate(nextProps: BaseTabProps, nextState: BaseTabState) {
    return nextProps.value !== nextState.value || this.state.value !== nextState.value;
  }

  componentDidUpdate() {
    this.setState({
      value: this.props.value,
    });
  }

  notifyOnChange(value: string[]) {
    this.props.onChange(value);
  }

  makeHoursOptions() {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(<option value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>);
    }
    return hours;
  }

  makeMinutesOptions() {
    const minutes = [];
    for (let i = 0; i < 60; i++) {
      minutes.push(<option value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>);
    }
    return minutes;
  }
}
