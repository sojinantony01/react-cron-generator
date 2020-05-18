'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.isWeekly = exports.DEFAULT_VALUE = void 0;
const react_1 = __importDefault(require('react'));
const reactstrap_1 = require('reactstrap');
const const_1 = require('./const');
const helpers_1 = require('./helpers');
exports.DEFAULT_VALUE = ['0', '0', '*', '*', 'MON,TUE,WED,THU,FRI'];
exports.isWeekly = (value) => {
  return (
    new RegExp(helpers_1.DIGIT_REGEXP).exec(value[const_1.MINUTE_POSITION_INDEX]) !== null &&
    new RegExp(helpers_1.DIGIT_REGEXP).exec(value[const_1.HOUR_POSITION_INDEX]) !== null &&
    value[const_1.DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
    new RegExp(helpers_1.DAY_OF_WEEK_REGEXP).exec(value[const_1.DAY_OF_WEEK_POSITION_INDEX]) !== null
  );
};
class default_1 extends helpers_1.BaseCronComponent {
  constructor(props) {
    super(props, exports.DEFAULT_VALUE);
    this.state = {
      value: exports.DEFAULT_VALUE,
    };
  }
  onDaySelection(e) {
    const isChecked = e.target.checked;
    const selectedDay = e.target.value;
    let currentDaysOfWeek =
      this.state.value[const_1.DAY_OF_WEEK_POSITION_INDEX] === '*' ? [] : this.state.value[const_1.DAY_OF_WEEK_POSITION_INDEX].split(',');
    // Cleanup
    currentDaysOfWeek = currentDaysOfWeek.filter((d) => !!d && d !== selectedDay);
    if (isChecked) {
      // Add selected day
      currentDaysOfWeek.push(selectedDay);
    }
    // console.log(`currentDaysOfWeek => ${currentDaysOfWeek}`);
    const value = helpers_1.replaceElemAtPos(this.state.value, const_1.DAY_OF_WEEK_POSITION_INDEX, currentDaysOfWeek.toString());
    this.setState({ value });
    this.notifyOnChange(value);
  }
  onAtHourChange(e) {
    const value = helpers_1.replaceElemAtPos(this.state.value, const_1.HOUR_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }
  onAtMinuteChange(e) {
    const value = helpers_1.replaceElemAtPos(this.state.value, const_1.MINUTE_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }
  render() {
    return react_1.default.createElement(
      reactstrap_1.Form,
      { className: 'mt-sm-1 justify-content-center align-items-center panel-row', inline: true },
      react_1.default.createElement(
        'div',
        null,
        react_1.default.createElement(
          reactstrap_1.Row,
          { className: 'mt-sm-1' },
          react_1.default.createElement(
            reactstrap_1.Container,
            null,
            react_1.default.createElement(
              reactstrap_1.Row,
              null,
              react_1.default.createElement(
                reactstrap_1.Col,
                { className: 'col-6' },
                react_1.default.createElement(reactstrap_1.CustomInput, {
                  id: 'checkbox-monday',
                  type: 'checkbox',
                  value: 'MON',
                  label: 'Monday',
                  onChange: (e) => this.onDaySelection.bind(this)(e),
                  checked: this.state.value[const_1.DAY_OF_WEEK_POSITION_INDEX].includes('MON'),
                }),
                react_1.default.createElement(reactstrap_1.CustomInput, {
                  id: 'checkbox-wednesday',
                  type: 'checkbox',
                  value: 'WED',
                  label: 'Wednesday',
                  onChange: (e) => this.onDaySelection.bind(this)(e),
                  checked: this.state.value[const_1.DAY_OF_WEEK_POSITION_INDEX].includes('WED'),
                }),
                react_1.default.createElement(reactstrap_1.CustomInput, {
                  id: 'checkbox-friday',
                  type: 'checkbox',
                  value: 'FRI',
                  label: 'Friday',
                  onChange: (e) => this.onDaySelection.bind(this)(e),
                  checked: this.state.value[const_1.DAY_OF_WEEK_POSITION_INDEX].includes('FRI'),
                }),
                react_1.default.createElement(reactstrap_1.CustomInput, {
                  id: 'checkbox-sunday',
                  type: 'checkbox',
                  value: 'SUN',
                  label: 'Sunday',
                  onChange: (e) => this.onDaySelection.bind(this)(e),
                  checked: this.state.value[const_1.DAY_OF_WEEK_POSITION_INDEX].includes('SUN'),
                }),
              ),
              react_1.default.createElement(
                reactstrap_1.Col,
                { className: 'col-6' },
                react_1.default.createElement(
                  'div',
                  { className: 'text_align_left' },
                  react_1.default.createElement(reactstrap_1.CustomInput, {
                    id: 'checkbox-tuesday',
                    type: 'checkbox',
                    value: 'TUE',
                    label: 'Tuesday',
                    onChange: (e) => this.onDaySelection.bind(this)(e),
                    checked: this.state.value[const_1.DAY_OF_WEEK_POSITION_INDEX].includes('TUE'),
                  }),
                  react_1.default.createElement(reactstrap_1.CustomInput, {
                    id: 'checkbox-thursday',
                    type: 'checkbox',
                    value: 'THU',
                    label: 'Thursday',
                    onChange: (e) => this.onDaySelection.bind(this)(e),
                    checked: this.state.value[const_1.DAY_OF_WEEK_POSITION_INDEX].includes('THU'),
                  }),
                  react_1.default.createElement(reactstrap_1.CustomInput, {
                    id: 'checkbox-saturday',
                    type: 'checkbox',
                    value: 'SAT',
                    label: 'Saturday',
                    onChange: (e) => this.onDaySelection.bind(this)(e),
                    checked: this.state.value[const_1.DAY_OF_WEEK_POSITION_INDEX].includes('SAT'),
                  }),
                ),
              ),
            ),
          ),
        ),
        react_1.default.createElement(
          reactstrap_1.Row,
          { className: 'mt-sm-1' },
          react_1.default.createElement(
            reactstrap_1.Col,
            null,
            react_1.default.createElement(
              reactstrap_1.Form,
              { inline: true },
              react_1.default.createElement(
                reactstrap_1.FormGroup,
                null,
                react_1.default.createElement(reactstrap_1.Label, { className: 'mr-sm-1' }, 'Start time'),
                react_1.default.createElement(
                  reactstrap_1.Input,
                  {
                    className: 'mr-sm-1 hours',
                    type: 'select',
                    min: 0,
                    max: 23,
                    value: this.state.value[const_1.HOUR_POSITION_INDEX],
                    onChange: (e) => this.onAtHourChange.bind(this)(e),
                  },
                  this.makeHoursOptions(),
                ),
                react_1.default.createElement(
                  reactstrap_1.Input,
                  {
                    className: 'minutes',
                    type: 'select',
                    min: 0,
                    max: 59,
                    value: this.state.value[const_1.MINUTE_POSITION_INDEX],
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
exports.default = default_1;
//# sourceMappingURL=weekly.js.map
