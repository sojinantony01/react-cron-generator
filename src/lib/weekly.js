import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';

export default class Cron extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onAtHourChange = this.onAtHourChange.bind(this);
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }


  onAtHourChange(e) {
    let val = this.state.value;
    val[0] = '0';
    val[2] = `${e.target.value}`;
    this.props.onChange(val)
  }
  onAtMinuteChange(e) {
    let val = this.state.value;
    val[0] = '0';
    val[1] = `${e.target.value}`;
    this.props.onChange(val)
  }

  onCheck(e) {
    let val = this.state.value;
    val[0] = '0';
    if (e.target.checked) {
      val[2] = (`${val[2]}`.split('/').length > 1) ? '0' : val[2].toString();
      val[3] = '?';
      val[4] = '*';
      if (val[5] === '*' || val[5] === '?' || val[5] === 'MON-FRI') {
        val[5] = e.target.value;
      } else {
        val[5] = val[5] + '!' + e.target.value;
      }
    } else {
      val[5] = val[5].split('!');
      if (val[5].length > 1) {
        val[5].splice(val[5].indexOf(e.target.value), 1)
        val[5] = val[5].toString().replace(/,/g, '!')
      } else {
        val[5] = '*';
      }
    }

    this.props.onChange(val)
  }
  render() {
    this.state.value = this.props.value;
    return (
      <Container>
        <Row className="mt-sm-1">
          <Container>
            <Row>
              <Col className="col-6">
                <CustomInput id="checkbox-monday" type="checkbox" value="MON" label="Monday" onChange={this.onCheck} checked={(this.state.value[5].search('MON') !== -1) ? true : false} />
                <CustomInput id="checkbox-wednesday" type="checkbox" value="WED" label="Wednesday" onChange={this.onCheck} checked={this.state.value[5].search('WED') !== -1 ? true : false} />
                <CustomInput id="checkbox-friday" type="checkbox" value="FRI" label="Friday" onChange={this.onCheck} checked={(this.state.value[5].search('FRI') !== -1) ? true : false} />
                <CustomInput id="checkbox-sunday" type="checkbox" value="SUN" label="Sunday" onChange={this.onCheck} checked={this.state.value[5].search('SUN') !== -1 ? true : false} />
              </Col>
              <Col className="col-6">
                <div className="text_align_left">
                  <CustomInput id="checkbox-tuesday" type="checkbox" value="TUE" label="Tuesday" onChange={this.onCheck} checked={this.state.value[5].search('TUE') !== -1 ? true : false} />
                  <CustomInput id="checkbox-thursday" type="checkbox" value="THU" label="Thursday" onChange={this.onCheck} checked={this.state.value[5].search('THU') !== -1 ? true : false} />
                  <CustomInput id="checkbox-saturday" type="checkbox" value="SAT" label="Saturday" onChange={this.onCheck} checked={this.state.value[5].search('SAT') !== -1 ? true : false} />
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
                  value={this.state.value[2]}
                  onChange={this.onAtHourChange}
                >
                  <option value="0">00</option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                </Input>
                <Input
                  className="minutes"
                  type="select"
                  min={0}
                  max={59}
                  value={this.state.value[1]}
                  onChange={this.onAtMinuteChange}
                >
                  <option value="0">00</option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                </Input>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

