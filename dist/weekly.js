import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX, DAY_OF_MONTH_POSITION_INDEX } from './const';
import { replaceElemAtPos, BaseCronComponent, DIGIT_REGEXP, DAY_OF_WEEK_REGEXP } from './helpers';
export const DEFAULT_VALUE = ['0', '0', '*', '*', 'MON,TUE,WED,THU,FRI'];
export const isWeekly = (value) => {
  return (
    new RegExp(DIGIT_REGEXP).exec(value[MINUTE_POSITION_INDEX]) !== null &&
    new RegExp(DIGIT_REGEXP).exec(value[HOUR_POSITION_INDEX]) !== null &&
    value[DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
    new RegExp(DAY_OF_WEEK_REGEXP).exec(value[DAY_OF_WEEK_POSITION_INDEX]) !== null
  );
};
export default class extends BaseCronComponent {
  constructor(props) {
    super(props, DEFAULT_VALUE);
    this.state = {
      value: DEFAULT_VALUE,
    };
  }
  onDaySelection(e) {
    const isChecked = e.target.checked;
    const selectedDay = e.target.value;
    let currentDaysOfWeek = this.state.value[DAY_OF_WEEK_POSITION_INDEX] === '*' ? [] : this.state.value[DAY_OF_WEEK_POSITION_INDEX].split(',');
    // Cleanup
    currentDaysOfWeek = currentDaysOfWeek.filter((d) => !!d && d !== selectedDay);
    if (isChecked) {
      // Add selected day
      currentDaysOfWeek.push(selectedDay);
    }
    // console.log(`currentDaysOfWeek => ${currentDaysOfWeek}`);
    const value = replaceElemAtPos(this.state.value, DAY_OF_WEEK_POSITION_INDEX, currentDaysOfWeek.toString());
    this.setState({ value });
    this.notifyOnChange(value);
  }
  onAtHourChange(e) {
    const value = replaceElemAtPos(this.state.value, HOUR_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }
  onAtMinuteChange(e) {
    const value = replaceElemAtPos(this.state.value, MINUTE_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }
  render() {
    return React.createElement(
      Form,
      { className: 'mt-sm-1 justify-content-center align-items-center panel-row', inline: true },
      React.createElement(
        'div',
        null,
        React.createElement(
          Row,
          { className: 'mt-sm-1' },
          React.createElement(
            Container,
            null,
            React.createElement(
              Row,
              null,
              React.createElement(
                Col,
                { className: 'col-6' },
                React.createElement(CustomInput, {
                  id: 'checkbox-monday',
                  type: 'checkbox',
                  value: 'MON',
                  label: 'Monday',
                  onChange: (e) => this.onDaySelection.bind(this)(e),
                  checked: this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('MON'),
                }),
                React.createElement(CustomInput, {
                  id: 'checkbox-wednesday',
                  type: 'checkbox',
                  value: 'WED',
                  label: 'Wednesday',
                  onChange: (e) => this.onDaySelection.bind(this)(e),
                  checked: this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('WED'),
                }),
                React.createElement(CustomInput, {
                  id: 'checkbox-friday',
                  type: 'checkbox',
                  value: 'FRI',
                  label: 'Friday',
                  onChange: (e) => this.onDaySelection.bind(this)(e),
                  checked: this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('FRI'),
                }),
                React.createElement(CustomInput, {
                  id: 'checkbox-sunday',
                  type: 'checkbox',
                  value: 'SUN',
                  label: 'Sunday',
                  onChange: (e) => this.onDaySelection.bind(this)(e),
                  checked: this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('SUN'),
                }),
              ),
              React.createElement(
                Col,
                { className: 'col-6' },
                React.createElement(
                  'div',
                  { className: 'text_align_left' },
                  React.createElement(CustomInput, {
                    id: 'checkbox-tuesday',
                    type: 'checkbox',
                    value: 'TUE',
                    label: 'Tuesday',
                    onChange: (e) => this.onDaySelection.bind(this)(e),
                    checked: this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('TUE'),
                  }),
                  React.createElement(CustomInput, {
                    id: 'checkbox-thursday',
                    type: 'checkbox',
                    value: 'THU',
                    label: 'Thursday',
                    onChange: (e) => this.onDaySelection.bind(this)(e),
                    checked: this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('THU'),
                  }),
                  React.createElement(CustomInput, {
                    id: 'checkbox-saturday',
                    type: 'checkbox',
                    value: 'SAT',
                    label: 'Saturday',
                    onChange: (e) => this.onDaySelection.bind(this)(e),
                    checked: this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('SAT'),
                  }),
                ),
              ),
            ),
          ),
        ),
        React.createElement(
          Row,
          { className: 'mt-sm-1' },
          React.createElement(
            Col,
            null,
            React.createElement(
              Form,
              { inline: true },
              React.createElement(
                FormGroup,
                null,
                React.createElement(Label, { className: 'mr-sm-1' }, 'Start time'),
                React.createElement(
                  Input,
                  {
                    className: 'mr-sm-1 hours',
                    type: 'select',
                    min: 0,
                    max: 23,
                    value: this.state.value[HOUR_POSITION_INDEX],
                    onChange: (e) => this.onAtHourChange.bind(this)(e),
                  },
                  this.makeHoursOptions(),
                ),
                React.createElement(
                  Input,
                  {
                    className: 'minutes',
                    type: 'select',
                    min: 0,
                    max: 59,
                    value: this.state.value[MINUTE_POSITION_INDEX],
                    onChange: (e) => this.onAtMinuteChange.bind(this)(e),
                  },
                  this.makeMinutesOptions(),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
//# sourceMappingURL=weekly.js.map
