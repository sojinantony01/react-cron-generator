import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX, DAY_OF_MONTH_POSITION_INDEX, MONTH_POSITION_INDEX } from './const';
import { BaseCronComponent, BaseTabProps, replaceElemAtPos, BaseTabState, isDigit } from './helpers';
import { TzDropdown } from './tzDropdown';

export const DEFAULT_VALUE = ['0', '0', '1', '*', '*'];

export const isMonthly = (value: string[]) => {
  return (
    isDigit(value[MINUTE_POSITION_INDEX]) &&
    isDigit(value[HOUR_POSITION_INDEX]) &&
    isDigit(value[DAY_OF_MONTH_POSITION_INDEX]) &&
    value[MONTH_POSITION_INDEX] === '*' &&
    value[DAY_OF_WEEK_POSITION_INDEX] === '*'
  );
};

export default class extends BaseCronComponent<BaseTabProps, BaseTabState> {
  state: Readonly<BaseTabState> = {
    value: DEFAULT_VALUE,
  };

  constructor(props: BaseTabProps) {
    super(props, DEFAULT_VALUE);
  }

  onDayChange(e: any) {
    if ((e.target.value > 0 && e.target.value <= 31) || e.target.value !== '') {
      const value = replaceElemAtPos(this.state.value, DAY_OF_MONTH_POSITION_INDEX, e.target.value);
      this.setState({ value });
      this.notifyOnChange(value, this.state.timezone);
    }
  }

  protected onAtHourChange(e: any) {
    const value = replaceElemAtPos(this.state.value, HOUR_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value, this.state.timezone);
  }

  protected onAtMinuteChange(e: any) {
    const value = replaceElemAtPos(this.state.value, MINUTE_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value, this.state.timezone);
  }

  protected onTimezoneChange(timezone: string) {
    this.setState({ timezone });
    this.notifyOnChange(this.state.value, timezone);
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
                  Day of every month{' '}
                  <Input
                    className="mr-sm-1"
                    type="number"
                    min={1}
                    max={31}
                    value={isDigit(this.state.value[DAY_OF_MONTH_POSITION_INDEX]) ? parseInt(this.state.value[DAY_OF_MONTH_POSITION_INDEX]) : ''}
                    onChange={(e) => this.onDayChange.bind(this)(e)}
                  />
                  <FormText color="muted">Must be integer value (1 - 31).</FormText>
                </FormGroup>
              </Form>
            </Col>
          </Row>
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
                  <TzDropdown defaultValue={this.state.timezone} id="monthly-dropdown" onChange={this.onTimezoneChange.bind(this)} />
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}
