import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';

export default class Cron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minute: 0
    };

    this.onDayChange = this.onDayChange.bind(this);
    this.onAtHourChange = this.onAtHourChange.bind(this);
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
  }
  componentWillMount() {
    this.state.value = this.props.value;
    if (this.state.value[3] === '?') {
      this.state.every = false;
    } else {
      this.state.every = true;
    }
  }
  onDayChange(e) {
    if ((e.target.value > 0 && e.target.value < 32) || e.target.value == '') {
      let val = ['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], '*', '*', '?', '*'];
      if (e.target.value == '') {
        val[3] = '';
      } else {
        val[3] = `1/${e.target.value}`;
      }
      this.props.onChange(val)
    }

  }
  onAtHourChange(e) {
    let val = this.state.value;
    val[2] = `${e.target.value}`;
    this.props.onChange(val)
  }
  onAtMinuteChange(e) {
    let val = this.state.value;
    val[1] = `${e.target.value}`;
    this.props.onChange(val)
  }
  render() {
    this.state.value = this.props.value;
    return (
      <Container>
        <Row className="mt-sm-1">
          <Col>
            <Form inline>
              <FormGroup>
                <Label for="every">
                  <CustomInput
                    id="variant-selector-every"
                    type="radio"
                    name="variantSelector"
                    checked={this.state.every ? true : false}
                    onClick={(e) => { this.setState({ every: true }); this.props.onChange() }}
                  />
                  Every
                </Label>
                <Input
                  type="Number"
                  className="mx-sm-1"
                  disabled={this.state.every ? false : true}
                  min={1}
                  max={31}
                  value={this.state.value[3].split('/')[1] ? this.state.value[3].split('/')[1] : ''}
                  onChange={this.onDayChange}
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
                <Label for="every-week-day" className="mr-sm-1">
                  <CustomInput
                    id="variant-selector-every-week-day"
                    type="radio"
                    name="variantSelector"
                    checked={this.state.every ? false : true}
                    onClick={(e) => { this.setState({ every: false }); this.props.onChange(['0', this.state.value[1], this.state.value[2], '?', '*', 'MON-FRI', '*']) }}
                  />
                  Every Mon - Fri at
                </Label>
                <Input
                  id="DailyHours"
                  className="mr-sm-1 hours"
                  type="select"
                  disabled={this.state.every ? true : false}
                  onChange={this.onAtHourChange} value={this.state.value[2]}
                >
                  <option id="0">00</option>
                  <option id="1">01</option>
                  <option id="2">02</option>
                  <option id="3">03</option>
                  <option id="4">04</option>
                  <option id="5">05</option>
                  <option id="6">06</option>
                  <option id="7">07</option>
                  <option id="8">08</option>
                  <option id="9">09</option>
                  <option id="10">10</option>
                  <option id="11">11</option>
                  <option id="12">12</option>
                  <option id="13">13</option>
                  <option id="14">14</option>
                  <option id="15">15</option>
                  <option id="16">16</option>
                  <option id="17">17</option>
                  <option id="18">18</option>
                  <option id="19">19</option>
                  <option id="20">20</option>
                  <option id="21">21</option>
                  <option id="22">22</option>
                  <option id="23">23</option>
                </Input>
                <Input
                  id="DailyMinutes"
                  className="mr-sm-1 minutes"
                  type="select"
                  disabled={this.state.every ? true : false}
                  onChange={this.onAtMinuteChange}
                  value={this.state.value[1]}
                >
                  <option id="0">00</option>
                  <option id="1">01</option>
                  <option id="2">02</option>
                  <option id="3">03</option>
                  <option id="4">04</option>
                  <option id="5">05</option>
                  <option id="6">06</option>
                  <option id="7">07</option>
                  <option id="8">08</option>
                  <option id="9">09</option>
                  <option id="10">10</option>
                  <option id="11">11</option>
                  <option id="12">12</option>
                  <option id="13">13</option>
                  <option id="14">14</option>
                  <option id="15">15</option>
                  <option id="16">16</option>
                  <option id="17">17</option>
                  <option id="18">18</option>
                  <option id="19">19</option>
                  <option id="20">20</option>
                  <option id="21">21</option>
                  <option id="22">22</option>
                  <option id="23">23</option>
                  <option id="24">24</option>
                  <option id="25">25</option>
                  <option id="26">26</option>
                  <option id="27">27</option>
                  <option id="28">28</option>
                  <option id="29">29</option>
                  <option id="30">30</option>
                  <option id="31">31</option>
                  <option id="32">32</option>
                  <option id="33">33</option>
                  <option id="34">34</option>
                  <option id="35">35</option>
                  <option id="36">36</option>
                  <option id="37">37</option>
                  <option id="38">38</option>
                  <option id="39">39</option>
                  <option id="40">40</option>
                  <option id="41">41</option>
                  <option id="42">42</option>
                  <option id="43">43</option>
                  <option id="44">44</option>
                  <option id="45">45</option>
                  <option id="46">46</option>
                  <option id="47">47</option>
                  <option id="48">48</option>
                  <option id="49">49</option>
                  <option id="50">50</option>
                  <option id="51">51</option>
                  <option id="52">52</option>
                  <option id="53">53</option>
                  <option id="54">54</option>
                  <option id="55">55</option>
                  <option id="56">56</option>
                  <option id="57">57</option>
                  <option id="58">58</option>
                  <option id="59">59</option>
                </Input>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}