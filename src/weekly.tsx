import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

import { MINUTE_POSITION_INDEX, HOUR_POSITION_INDEX, DAY_OF_WEEK_POSITION_INDEX, DAY_OF_MONTH_POSITION_INDEX } from './const';
import { replaceElemAtPos, BaseCronComponent, BaseTabProps, BaseTabState, DAY_OF_WEEK_REGEXP, isDigit } from './helpers';
import { TzDropdown } from './tzDropdown';

export const DEFAULT_VALUE = ['0', '0', '*', '*', 'MON,TUE,WED,THU,FRI'];

export const isWeekly = (value: string[]) => {
  return (
    isDigit(value[MINUTE_POSITION_INDEX]) &&
    isDigit(value[HOUR_POSITION_INDEX]) &&
    value[DAY_OF_MONTH_POSITION_INDEX].includes('*') &&
    new RegExp(DAY_OF_WEEK_REGEXP).exec(value[DAY_OF_WEEK_POSITION_INDEX]) !== null
  );
};

export default class extends BaseCronComponent<BaseTabProps, BaseTabState> {
  state: Readonly<BaseTabState> = {
    value: DEFAULT_VALUE,
  };

  constructor(props: BaseTabProps) {
    super(props, DEFAULT_VALUE);
  }

  onDaySelection(e: any) {
    const isChecked = e.target.checked;
    const selectedDay = e.target.value;
    let currentDaysOfWeek = this.state.value[DAY_OF_WEEK_POSITION_INDEX] === '*' ? [] : this.state.value[DAY_OF_WEEK_POSITION_INDEX].split(',');
    // Cleanup
    currentDaysOfWeek = currentDaysOfWeek.filter((d) => !!d && d !== selectedDay);
    if (isChecked) {
      // Add selected day
      currentDaysOfWeek.push(selectedDay);
    }
    const value = replaceElemAtPos(this.state.value, DAY_OF_WEEK_POSITION_INDEX, currentDaysOfWeek.toString());
    this.setState({ value });
    this.notifyOnChange(value, this.state.timezone);
  }

  onAtHourChange(e: any) {
    const value = replaceElemAtPos(this.state.value, HOUR_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value, this.state.timezone);
  }

  onAtMinuteChange(e: any) {
    const value = replaceElemAtPos(this.state.value, MINUTE_POSITION_INDEX, e.target.value);
    this.setState({ value });
    this.notifyOnChange(value, this.state.timezone);
  }

  protected onTimezoneChange(timezone: string) {
    this.setState({ timezone });
    this.notifyOnChange(this.state.value, timezone);
  }

  render() {
    return (
      <Form className="mt-sm-1 justify-content-center align-items-center panel-row" inline>
        <div>
          <Row className="mt-sm-1">
            <Container>
              <Row>
                <Col className="col-6">
                  <CustomInput
                    id="checkbox-monday"
                    type="checkbox"
                    value="MON"
                    label="Monday"
                    onChange={(e) => this.onDaySelection.bind(this)(e)}
                    checked={this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('MON')}
                  />
                  <CustomInput
                    id="checkbox-wednesday"
                    type="checkbox"
                    value="WED"
                    label="Wednesday"
                    onChange={(e) => this.onDaySelection.bind(this)(e)}
                    checked={this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('WED')}
                  />
                  <CustomInput
                    id="checkbox-friday"
                    type="checkbox"
                    value="FRI"
                    label="Friday"
                    onChange={(e) => this.onDaySelection.bind(this)(e)}
                    checked={this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('FRI')}
                  />
                  <CustomInput
                    id="checkbox-sunday"
                    type="checkbox"
                    value="SUN"
                    label="Sunday"
                    onChange={(e) => this.onDaySelection.bind(this)(e)}
                    checked={this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('SUN')}
                  />
                </Col>
                <Col className="col-6">
                  <div className="text_align_left">
                    <CustomInput
                      id="checkbox-tuesday"
                      type="checkbox"
                      value="TUE"
                      label="Tuesday"
                      onChange={(e) => this.onDaySelection.bind(this)(e)}
                      checked={this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('TUE')}
                    />
                    <CustomInput
                      id="checkbox-thursday"
                      type="checkbox"
                      value="THU"
                      label="Thursday"
                      onChange={(e) => this.onDaySelection.bind(this)(e)}
                      checked={this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('THU')}
                    />
                    <CustomInput
                      id="checkbox-saturday"
                      type="checkbox"
                      value="SAT"
                      label="Saturday"
                      onChange={(e) => this.onDaySelection.bind(this)(e)}
                      checked={this.state.value[DAY_OF_WEEK_POSITION_INDEX].includes('SAT')}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
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
                  <TzDropdown defaultValue={this.state.timezone} id="weekly-dropdown" onChange={this.onTimezoneChange.bind(this)} />
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}
