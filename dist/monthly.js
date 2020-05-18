import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX, DAY_OF_MONTH_POSITION_INDEX } from './const';
import { BaseCronComponent, replaceElemAtPos, DIGIT_REGEXP, DAY_OF_WEEK_REGEXP } from './helpers';
export const DEFAULT_VALUE = ['0', '0', '*', '*', '*'];
const isEveryDay = (value) => {
  return (
    new RegExp(DIGIT_REGEXP).exec(value[MINUTE_POSITION_INDEX]) !== null &&
    new RegExp(DIGIT_REGEXP).exec(value[HOUR_POSITION_INDEX]) !== null &&
    value[DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
    new RegExp(DAY_OF_WEEK_REGEXP).exec(value[DAY_OF_WEEK_POSITION_INDEX]) === null
  );
};
const isAtDayHour = (value) => {
  return (
    new RegExp(DIGIT_REGEXP).exec(value[MINUTE_POSITION_INDEX]) !== null &&
    new RegExp(DIGIT_REGEXP).exec(value[HOUR_POSITION_INDEX]) !== null &&
    value[DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
    new RegExp(DAY_OF_WEEK_REGEXP).exec(value[DAY_OF_WEEK_POSITION_INDEX]) !== null
  );
};
export const isMonthly = (value) => {
  return isEveryDay(value) || isAtDayHour(value);
};
export default class extends BaseCronComponent {
  constructor(props) {
    super(props, DEFAULT_VALUE);
    this.state = {
      value: DEFAULT_VALUE,
      every: '1',
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.every !== nextState.every || super.shouldComponentUpdate(nextProps, nextState);
  }
  // componentWillMount() {
  //   this.state.value = this.props.value;
  //   if (this.state.value[3] === 'L') {
  //     this.state.every = '2';
  //   } else if (this.state.value[3] === 'LW') {
  //     this.state.every = '3';
  //   } else if (this.state.value[3].startsWith('L')) {
  //     this.state.every = '4';
  //   } else {
  //     this.state.every = '1';
  //   }
  // }
  onDayChange(e) {
    if ((e.target.value > 0 && e.target.value <= 31) || e.target.value == '') {
      const value = replaceElemAtPos(this.state.value, DAY_OF_MONTH_POSITION_INDEX, e.target.value === '' ? '*' : `*/${e.target.value}`);
      this.setState({ value });
      this.notifyOnChange(value);
    }
  }
  // onLastDayChange(e: any) {
  //   // if ((parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31) || e.target.value == '') {
  //   //   const val = [
  //   //     '0',
  //   //     this.state.value[1] === '*' ? '0' : this.state.value[1],
  //   //     this.state.value[2] === '*' ? '0' : this.state.value[2],
  //   //     this.state.value[3],
  //   //     '1/1',
  //   //     '?',
  //   //   ];
  //   //   if (e.target.value == '') {
  //   //     val[3] = '';
  //   //   } else {
  //   //     val[3] = `L-${e.target.value}`;
  //   //   }
  //   //   this.props.onChange(val);
  //   // }
  // }
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
  toggleEvery(every) {
    // const value = every ? DEFAULT_VALUE : replaceElemAtPos(DEFAULT_VALUE, DAY_OF_WEEK_POSITION_INDEX, 'MON-FRI');
    let value = DEFAULT_VALUE;
    if (every === '1') {
      value = replaceElemAtPos(DEFAULT_VALUE, DAY_OF_MONTH_POSITION_INDEX, '*');
      // } else if (every === '2') {
      //   value = replaceElemAtPos(DEFAULT_VALUE, DAY_POSITION_INDEX, 'L');
      // } else if (every === '3') {
      //   value = replaceElemAtPos(DEFAULT_VALUE, DAY_POSITION_INDEX, 'L');
    } else if (every === '4') {
      value = replaceElemAtPos(DEFAULT_VALUE, DAY_OF_MONTH_POSITION_INDEX, 'L');
    }
    this.setState({
      every,
      value,
    });
    this.notifyOnChange(value);
  }
  render() {
    // this.state.value = this.props.value;
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
            Col,
            null,
            React.createElement(
              Form,
              { inline: true },
              React.createElement(
                FormGroup,
                null,
                React.createElement(
                  Label,
                  { className: 'mr-sm-1' },
                  React.createElement(CustomInput, {
                    id: 'variant-selector-day',
                    type: 'radio',
                    name: 'variantSelector',
                    value: '1',
                    checked: this.state.every === '1',
                    onChange: (e) => this.toggleEvery.bind(this)('1'),
                  }),
                  'Day of every month',
                ),
                React.createElement(Input, {
                  className: 'mr-sm-1',
                  readOnly: this.state.every !== '1',
                  type: 'number',
                  min: 1,
                  max: 31,
                  value: this.state.value[DAY_OF_MONTH_POSITION_INDEX].includes('/')
                    ? this.state.value[DAY_OF_MONTH_POSITION_INDEX].split('/')[1]
                    : '',
                  onChange: (e) => this.onDayChange.bind(this)(e),
                }),
                React.createElement(FormText, { color: 'muted' }, 'Must be integer value (1 - 31).'),
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
//# sourceMappingURL=monthly.js.map
