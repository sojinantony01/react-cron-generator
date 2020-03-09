import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';

var Cron = /*#__PURE__*/function (_Component) {
  _inherits(Cron, _Component);

  function Cron(props) {
    var _this;

    _classCallCheck(this, Cron);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cron).call(this, props));
    _this.state = {};
    _this.onHourChange = _this.onHourChange.bind(_assertThisInitialized(_this));
    _this.onAtHourChange = _this.onAtHourChange.bind(_assertThisInitialized(_this));
    _this.onAtMinuteChange = _this.onAtMinuteChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Cron, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.state.value = this.props.value;

      if (this.state.value[2].split('/')[1] || this.state.value[2] === '*') {
        this.state.every = true;
      }
    }
  }, {
    key: "onHourChange",
    value: function onHourChange(e) {
      if (this.state.every && (e.target.value > 0 && e.target.value < 24 || e.target.value == '')) {
        var val = ['0', '0', '*', '*', '*', '?', '*'];

        if (e.target.value == '') {
          val[2] = '';
        } else {
          val[2] = "0/".concat(e.target.value);
        }

        val[3] = '1/1';
        this.props.onChange(val);
      }
    }
  }, {
    key: "onAtHourChange",
    value: function onAtHourChange(e) {
      var val = ['0', this.state.value[1], '*', '*', '*', '?', '*'];
      val[2] = "".concat(e.target.value);
      val[3] = '1/1';
      this.props.onChange(val);
    }
  }, {
    key: "onAtMinuteChange",
    value: function onAtMinuteChange(e) {
      var val = ['0', '*', this.state.value[2], '*', '*', '?', '*'];
      val[1] = "".concat(e.target.value);
      val[3] = '1/1';
      this.props.onChange(val);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.state.value = this.props.value;
      return React.createElement(Container, null, React.createElement(Row, {
        className: "mt-sm-1"
      }, React.createElement(Col, {
        className: "col-6"
      }, React.createElement(Form, {
        inline: true
      }, React.createElement(FormGroup, null, React.createElement(Label, {
        for: "every"
      }, React.createElement(CustomInput, {
        id: "variant-selector-every",
        type: "radio",
        name: "variantSelector",
        checked: this.state.every ? true : false,
        onClick: function onClick(e) {
          _this2.setState({
            every: true
          });

          _this2.props.onChange(['0', '0', '0/1', '1/1', '*', '?', '*']);
        }
      }), "Every"), React.createElement(Input, {
        id: "every",
        className: "mx-sm-1",
        type: "Number",
        disabled: this.state.every ? false : true,
        min: 1,
        max: 23,
        value: this.state.value[2].split('/')[1] ? this.state.value[2].split('/')[1] : '',
        onChange: this.onHourChange
      }), React.createElement(FormText, {
        color: "muted"
      }, "Must be integer value (1 - 23)."))))), React.createElement(Row, {
        className: "mt-sm-1"
      }, React.createElement(Col, {
        className: "col-6"
      }, React.createElement(Form, {
        inline: true
      }, React.createElement(FormGroup, null, React.createElement(Label, {
        for: "at",
        className: "mr-sm-1"
      }, React.createElement(CustomInput, {
        id: "variant-selector-at",
        type: "radio",
        name: "variantSelector",
        checked: this.state.every ? false : true,
        onClick: function onClick(e) {
          _this2.setState({
            every: false
          });

          _this2.props.onChange();
        }
      }), "At"), React.createElement(Input, {
        className: "mr-sm-1 hours",
        type: "select",
        disabled: this.state.every ? true : false,
        onChange: this.onAtHourChange,
        value: this.state.value[2]
      }, this.getHours()), React.createElement(Input, {
        type: "select",
        className: "mr-sm-1 minutes",
        disabled: this.state.every ? true : false,
        onChange: this.onAtMinuteChange,
        value: this.state.value[1]
      }, this.getMinutes()))))));
    }
  }, {
    key: "getHours",
    value: function getHours() {
      var hours = [];

      for (var i = 0; i < 24; i++) {
        hours.push(React.createElement("option", {
          value: i < 10 ? "0".concat(i) : i
        }, i < 10 ? "0".concat(i) : i));
      }

      return hours;
    }
  }, {
    key: "getMinutes",
    value: function getMinutes() {
      var minutes = [];

      for (var i = 0; i < 60; i++) {
        minutes.push(React.createElement("option", {
          value: i < 10 ? "0".concat(i) : i
        }, i < 10 ? "0".concat(i) : i));
      }

      return minutes;
    }
  }]);

  return Cron;
}(Component);

export { Cron as default };