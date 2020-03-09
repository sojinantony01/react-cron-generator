import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';


export default class Cron extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.onHourChange = this.onHourChange.bind(this);
    this.onAtHourChange = this.onAtHourChange.bind(this);
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
  }
  componentWillMount() {
    this.state.value = this.props.value;
    if (this.state.value[2].split('/')[1] || this.state.value[2] === '*') {
      this.state.every = true;
    }
  }
  onHourChange(e) {
    if (this.state.every && ((e.target.value > 0 && e.target.value < 24) || e.target.value == '')) {
      let val = ['0', '0', '*', '*', '*', '?', '*'];
      if (e.target.value == '') {
        val[2] = '';
      } else {
        val[2] = `0/${e.target.value}`;
      }
      val[3] = '1/1';
      this.props.onChange(val)
    }
  }
  onAtHourChange(e) {
    let val = ['0', this.state.value[1], '*', '*', '*', '?', '*']
    val[2] = `${e.target.value}`;
    val[3] = '1/1'
    this.props.onChange(val)
  }
  onAtMinuteChange(e) {
    let val = ['0', '*', this.state.value[2], '*', '*', '?', '*']
    val[1] = `${e.target.value}`;
    val[3] = '1/1'
    this.props.onChange(val)
  }


  render() {
    this.state.value = this.props.value
    return (
      <Container>
        <Row className="mt-sm-1">
          <Col className="col-6">
            <Form inline>
              <FormGroup>
                <Label for="every">
                  <CustomInput
                    id="variant-selector-every"
                    type="radio"
                    name="variantSelector"
                    checked={this.state.every ? true : false}
                    onClick={(e) => { this.setState({ every: true }); this.props.onChange(['0', '0', '0/1', '1/1', '*', '?', '*']) }}
                  />
                  Every
                    </Label>
                <Input
                  id="every"
                  className="mx-sm-1"
                  type="Number"
                  disabled={this.state.every ? false : true}
                  min={1}
                  max={23}
                  value={this.state.value[2].split('/')[1] ? this.state.value[2].split('/')[1] : ''}
                  onChange={this.onHourChange}
                />
                <FormText color="muted">Must be integer value (1 - 23).</FormText>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row className="mt-sm-1">
          <Col className="col-6">
            <Form inline>
              <FormGroup>
                <Label for="at" className="mr-sm-1">
                  <CustomInput
                    id="variant-selector-at"
                    type="radio"
                    name="variantSelector"
                    checked={this.state.every ? false : true}
                    onClick={(e) => { this.setState({ every: false }); this.props.onChange() }}
                  />
                  At
                    </Label>
                <Input
                  className="mr-sm-1 hours"
                  type="select"
                  disabled={this.state.every ? true : false}
                  onChange={this.onAtHourChange} value={this.state.value[2]}
                >
                  {this.getHours()}
                </Input>
                <Input
                  type="select"
                  className="mr-sm-1 minutes"
                  disabled={this.state.every ? true : false}
                  onChange={this.onAtMinuteChange}
                  value={this.state.value[1]}
                >
                  {this.getMinutes()}
                </Input>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
  getHours() {
    let hours = []
    for (let i = 0; i < 24; i++) {
      hours.push(<option value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>)
    }
    return hours;
  }
  getMinutes() {
    let minutes = []
    for (let i = 0; i < 60; i++) {
      minutes.push(<option value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>)
    }
    return minutes;
  }

}

