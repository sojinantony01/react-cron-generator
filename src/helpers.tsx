import moment from 'moment-timezone';
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
  onChange: (value: string[], timezone?: string) => void;
  defaultTimezone?: string;
}

export interface BaseTabState {
  value: string[];
  timezone?: string;
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
      timezone: this.props.defaultTimezone,
    });
  }

  notifyOnChange(value: string[], timezone?: string) {
    this.props.onChange(value, timezone);
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

export const timezoneToGMT = (timezone: string): number => {
  return parseInt(moment.tz(timezone).format('Z').split(':')[0]);
};

export const getDifferenceHourMinutesTzToTz = (tz1: string, tz2: string, hours: string, minutes: string) => {
  const diff = moment(moment().tz(tz2).format('YYYY-MM-DD HH:mm')).diff(moment(moment().tz(tz1).format('YYYY-MM-DD HH:mm')), 'hours');
  return moment(`${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`, 'HH:mm')
    .subtract(diff, 'hours')
    .format('HH:mm');
};
