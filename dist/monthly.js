'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.isMonthly = exports.DEFAULT_VALUE = void 0;
const react_1 = __importDefault(require('react'));
const reactstrap_1 = require('reactstrap');
const const_1 = require('./const');
const helpers_1 = require('./helpers');
exports.DEFAULT_VALUE = ['0', '0', '*', '*', '*'];
const isEveryDay = (value) => {
  return (
    new RegExp(helpers_1.DIGIT_REGEXP).exec(value[const_1.MINUTE_POSITION_INDEX]) !== null &&
    new RegExp(helpers_1.DIGIT_REGEXP).exec(value[const_1.HOUR_POSITION_INDEX]) !== null &&
    value[const_1.DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
    new RegExp(helpers_1.DAY_OF_WEEK_REGEXP).exec(value[const_1.DAY_OF_WEEK_POSITION_INDEX]) === null
  );
};
const isAtDayHour = (value) => {
  return (
    new RegExp(helpers_1.DIGIT_REGEXP).exec(value[const_1.MINUTE_POSITION_INDEX]) !== null &&
    new RegExp(helpers_1.DIGIT_REGEXP).exec(value[const_1.HOUR_POSITION_INDEX]) !== null &&
    value[const_1.DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
    new RegExp(helpers_1.DAY_OF_WEEK_REGEXP).exec(value[const_1.DAY_OF_WEEK_POSITION_INDEX]) !== null
  );
};
exports.isMonthly = (value) => {
  return isEveryDay(value) || isAtDayHour(value);
};
class default_1 extends helpers_1.BaseCronComponent {
  constructor(props) {
    super(props, exports.DEFAULT_VALUE);
    this.state = {
      value: exports.DEFAULT_VALUE,
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
      const value = helpers_1.replaceElemAtPos(
        this.state.value,
        const_1.DAY_OF_MONTH_POSITION_INDEX,
        e.target.value === '' ? '*' : `*/${e.target.value}`,
      );
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
    const value = helpers_1.replaceElemAtPos(this.state.value, const_1.HOUR_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }
  onAtMinuteChange(e) {
    const value = helpers_1.replaceElemAtPos(this.state.value, const_1.MINUTE_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }
  toggleEvery(every) {
    // const value = every ? DEFAULT_VALUE : replaceElemAtPos(DEFAULT_VALUE, DAY_OF_WEEK_POSITION_INDEX, 'MON-FRI');
    let value = exports.DEFAULT_VALUE;
    if (every === '1') {
      value = helpers_1.replaceElemAtPos(exports.DEFAULT_VALUE, const_1.DAY_OF_MONTH_POSITION_INDEX, '*');
      // } else if (every === '2') {
      //   value = replaceElemAtPos(DEFAULT_VALUE, DAY_POSITION_INDEX, 'L');
      // } else if (every === '3') {
      //   value = replaceElemAtPos(DEFAULT_VALUE, DAY_POSITION_INDEX, 'L');
    } else if (every === '4') {
      value = helpers_1.replaceElemAtPos(exports.DEFAULT_VALUE, const_1.DAY_OF_MONTH_POSITION_INDEX, 'L');
    }
    this.setState({
      every,
      value,
    });
    this.notifyOnChange(value);
  }
  render() {
    // this.state.value = this.props.value;
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
            reactstrap_1.Col,
            null,
            react_1.default.createElement(
              reactstrap_1.Form,
              { inline: true },
              react_1.default.createElement(
                reactstrap_1.FormGroup,
                null,
                react_1.default.createElement(
                  reactstrap_1.Label,
                  { className: 'mr-sm-1' },
                  react_1.default.createElement(reactstrap_1.CustomInput, {
                    id: 'variant-selector-day',
                    type: 'radio',
                    name: 'variantSelector',
                    value: '1',
                    checked: this.state.every === '1',
                    onChange: (e) => this.toggleEvery.bind(this)('1'),
                  }),
                  'Day of every month',
                ),
                react_1.default.createElement(reactstrap_1.Input, {
                  className: 'mr-sm-1',
                  readOnly: this.state.every !== '1',
                  type: 'number',
                  min: 1,
                  max: 31,
                  value: this.state.value[const_1.DAY_OF_MONTH_POSITION_INDEX].includes('/')
                    ? this.state.value[const_1.DAY_OF_MONTH_POSITION_INDEX].split('/')[1]
                    : '',
                  onChange: (e) => this.onDayChange.bind(this)(e),
                }),
                react_1.default.createElement(reactstrap_1.FormText, { color: 'muted' }, 'Must be integer value (1 - 31).'),
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
//# sourceMappingURL=monthly.js.map
