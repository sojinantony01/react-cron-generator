import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';

import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX, DAY_OF_MONTH_POSITION_INDEX } from './const';
import { BaseCronComponent, BaseTabProps, replaceElemAtPos, BaseTabState, DIGIT_REGEXP, DAY_OF_WEEK_REGEXP } from './helpers';

export const DEFAULT_VALUE = ['0', '0', '*', '*', '*'];

export type MonthlyEvery = '1' | '2' | '3' | '4';

const isEveryDay = (value: string[]) => {
  return (
    new RegExp(DIGIT_REGEXP).exec(value[MINUTE_POSITION_INDEX]) !== null &&
    new RegExp(DIGIT_REGEXP).exec(value[HOUR_POSITION_INDEX]) !== null &&
    value[DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
    new RegExp(DAY_OF_WEEK_REGEXP).exec(value[DAY_OF_WEEK_POSITION_INDEX]) === null
  );
};

const isAtDayHour = (value: string[]) => {
  return (
    new RegExp(DIGIT_REGEXP).exec(value[MINUTE_POSITION_INDEX]) !== null &&
    new RegExp(DIGIT_REGEXP).exec(value[HOUR_POSITION_INDEX]) !== null &&
    value[DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
    new RegExp(DAY_OF_WEEK_REGEXP).exec(value[DAY_OF_WEEK_POSITION_INDEX]) !== null
  );
};

export const isMonthly = (value: string[]) => {
  return isEveryDay(value) || isAtDayHour(value);
};

export default class extends BaseCronComponent<BaseTabProps, MonthlyTabState> {
  state: Readonly<MonthlyTabState> = {
    value: DEFAULT_VALUE,
    every: '1',
  };

  constructor(props: BaseTabProps) {
    super(props, DEFAULT_VALUE);
  }

  shouldComponentUpdate(nextProps: BaseTabProps, nextState: MonthlyTabState) {
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

  onDayChange(e: any) {
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

  protected onAtHourChange(e: any) {
    const value = replaceElemAtPos(this.state.value, HOUR_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }

  protected onAtMinuteChange(e: any) {
    const value = replaceElemAtPos(this.state.value, MINUTE_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value);
  }

  protected toggleEvery(every: MonthlyEvery) {
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
    return (
      <Form className="mt-sm-1 justify-content-center align-items-center panel-row" inline>
        <div>
          <Row className="mt-sm-1">
            <Col>
              <Form inline>
                <FormGroup>
                  <Label className="mr-sm-1">
                    <CustomInput
                      id="variant-selector-day"
                      type="radio"
                      name="variantSelector"
                      value="1"
                      checked={this.state.every === '1'}
                      onChange={(e) => this.toggleEvery.bind(this)('1')}
                    />
                    Day of every month
                  </Label>
                  <Input
                    className="mr-sm-1"
                    readOnly={this.state.every !== '1'}
                    type="number"
                    min={1}
                    max={31}
                    value={
                      this.state.value[DAY_OF_MONTH_POSITION_INDEX].includes('/') ? this.state.value[DAY_OF_MONTH_POSITION_INDEX].split('/')[1] : ''
                    }
                    onChange={(e) => this.onDayChange.bind(this)(e)}
                  />
                  <FormText color="muted">Must be integer value (1 - 31).</FormText>
                </FormGroup>
              </Form>
            </Col>
          </Row>
          {/* <Row className="mt-sm-1">
          <Col>
            <Form inline>
              <FormGroup>
                <Label>
                  <CustomInput
                    id="variant-selector-last-day"
                    type="radio"
                    name="variantSelector"
                    value="2"
                    checked={this.state.every === '2'}
                    onChange={(e) => this.toggleEvery.bind(this)('2')}
                    // onChange={(e) => {
                    //   this.setState({ every: e.target.value });
                    //   this.props.onChange([
                    //     '0',
                    //     this.state.value[1] === '*' ? '0' : this.state.value[1],
                    //     this.state.value[2] === '*' ? '0' : this.state.value[2],
                    //     'L',
                    //     '*',
                    //     '?',
                    //   ]);
                    // }}
                  />
                  Last day of every month
                </Label>
              </FormGroup>
            </Form>
          </Col>
        </Row> */}
          {/* <Row className="mt-sm-1">
          <Col>
            <Form inline>
              <FormGroup>
                <Label>
                  <CustomInput
                    id="variant-selector-last-week-day"
                    type="radio"
                    name="variantSelector"
                    value="3"
                    checked={this.state.every === '3'}
                    onChange={(e) => this.toggleEvery.bind(this)('3')}
                    // onChange={(e) => {
                    //   this.setState({ every: e.target.value });
                    //   this.props.onChange([
                    //     '0',
                    //     this.state.value[1] === '*' ? '0' : this.state.value[1],
                    //     this.state.value[2] === '*' ? '0' : this.state.value[2],
                    //     'LW',
                    //     '*',
                    //     '?',
                    //   ]);
                    // }}
                  />
                  Last weekday of every month
                </Label>
              </FormGroup>
            </Form>
          </Col>
        </Row> */}
          {/* <Row className="mt-sm-1">
          <Col>
            <Form inline>
              <FormGroup>
                <Label className="mr-sm-1">
                  <CustomInput
                    id="variant-selector-before-end-month"
                    type="radio"
                    name="variantSelector"
                    value="4"
                    checked={this.state.every === '4'}
                    // onChange={(e) => {
                    //   this.setState({ every: e.target.value });
                    //   this.props.onChange([
                    //     '0',
                    //     this.state.value[1] === '*' ? '0' : this.state.value[1],
                    //     this.state.value[2] === '*' ? '0' : this.state.value[2],
                    //     `L-${1}`,
                    //     '*',
                    //     '?',
                    //   ]);
                    // }}
                  />
                  Day(s) before the end of the month
                </Label>
                <Input
                  className="mr-sm-1"
                  readOnly={this.state.every !== '4'}
                  type="number"
                  min={1}
                  max={31}
                  value={this.state.value[3].split('-')[1]}
                  onChange={(e) => this.onLastDayChange.bind(this)(e)}
                />
                <FormText color="muted">Must be integer value (1 - 31).</FormText>
              </FormGroup>
            </Form>
          </Col>
        </Row> */}
          <Row className="mt-sm-1">
            <Col>
              <Form inline>
                <FormGroup>
                  <Label className="mr-sm-1">Start time</Label>
                  <Input
                    className="mr-sm-1 hours"
                    type="select"
                    min={0}
                    max={23}
                    value={this.state.value[HOUR_POSITION_INDEX]}
                    onChange={(e) => this.onAtHourChange.bind(this)(e)}
                  >
                    {this.makeHoursOptions()}
                  </Input>
                  <Input
                    className="minutes"
                    type="select"
                    min={0}
                    max={59}
                    value={this.state.value[MINUTE_POSITION_INDEX]}
                    onChange={(e) => this.onAtMinuteChange.bind(this)(e)}
                  >
                    {this.makeMinutesOptions()}
                  </Input>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export interface MonthlyTabState extends BaseTabState {
  every: MonthlyEvery;
}
