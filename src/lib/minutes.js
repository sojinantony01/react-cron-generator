import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default class Cron extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  onChange(e) {
    if ((e.target.value > 0 && e.target.value < 60) || e.target.value == '') {
      let val = ['0', '*', '*', '*', '*', '?', '*']

      if (e.target.value == '') {
        val[1] = '';
      } else {
        val[1] = `0/${e.target.value}`;
      }
      this.props.onChange(val)
    }
  }
  render() {
    this.state.value = this.props.value
    return (
      <Form className="mt-sm-1" inline>
        <FormGroup>
          <Label for="every">Every</Label>
          <Input
            id="every"
            className="mx-sm-1"
            placeholder="Minute value"
            type="Number"
            min={1}
            max={59}
            onChange={this.onChange.bind(this)} value={this.state.value[1].split('/')[1]}
          />
          <FormText color="muted">Must be integer value (1 - 59).</FormText>
        </FormGroup>
      </Form>
    );
  }
}
