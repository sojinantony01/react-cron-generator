import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

var Cron = /*#__PURE__*/function (_Component) {
  _inherits(Cron, _Component);

  function Cron(props) {
    var _this;

    _classCallCheck(this, Cron);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cron).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(Cron, [{
    key: "onChange",
    value: function onChange(e) {
      if (e.target.value > 0 && e.target.value < 60 || e.target.value == '') {
        var val = ['0', '*', '*', '*', '*', '?', '*'];

        if (e.target.value == '') {
          val[1] = '';
        } else {
          val[1] = "0/".concat(e.target.value);
        }

        this.props.onChange(val);
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.state.value = this.props.value;
      return React.createElement(Form, {
        className: "mt-sm-1",
        inline: true
      }, React.createElement(FormGroup, null, React.createElement(Label, {
        for: "every"
      }, "Every"), React.createElement(Input, {
        id: "every",
        className: "mx-sm-1",
        placeholder: "Minute value",
        type: "Number",
        min: 1,
        max: 59,
        onChange: this.onChange.bind(this),
        value: this.state.value[1].split('/')[1]
      }), React.createElement(FormText, {
        color: "muted"
      }, "Must be integer value (1 - 59).")));
    }
  }]);

  return Cron;
}(Component);

export { Cron as default };