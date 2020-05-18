import React, { Component } from 'react';
import { Form } from 'reactstrap';

export const DEFAULT_VALUE = [];

export default class Cron extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Form className="mt-sm-1 justify-content-center align-items-center panel-row" inline>
        <div>yearly</div>
      </Form>
    );
  }
}
