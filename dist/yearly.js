import React, { Component } from 'react';
import { Form } from 'reactstrap';
export const DEFAULT_VALUE = [];
export default class Cron extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return React.createElement(
      Form,
      { className: 'mt-sm-1 justify-content-center align-items-center panel-row', inline: true },
      React.createElement('div', null, 'yearly'),
    );
  }
}
//# sourceMappingURL=yearly.js.map
