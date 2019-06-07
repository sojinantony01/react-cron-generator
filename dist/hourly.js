import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';

var Cron =
/*#__PURE__*/
function (_Component) {
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
      if (this.state.every) {
        var val = ['0', '0', '*', '*', '*', '?', '*'];
        val[2] = "0/".concat(e.target.value);
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
      return React.createElement("div", {
        className: "tab-content"
      }, React.createElement("div", {
        className: "tab-pane active"
      }, React.createElement("div", {
        className: "well well-small"
      }, React.createElement("input", {
        type: "radio",
        onClick: function onClick(e) {
          _this2.setState({
            every: true
          });

          _this2.props.onChange();
        },
        checked: this.state.every ? true : false
      }), React.createElement("span", null, "\xA0Every \xA0"), React.createElement("input", {
        disabled: this.state.every ? false : true,
        type: "Number",
        onChange: this.onHourChange,
        value: this.state.value[2].split('/')[1] ? this.state.value[2].split('/')[1] : ''
      }), React.createElement("span", null, "\xA0hour(s)\xA0")), React.createElement("div", {
        className: "container-fluid"
      }, React.createElement("div", {
        className: "well row well-small "
      }, React.createElement("div", {
        className: "col-md-offset-2 col-md-6 "
      }, React.createElement("input", {
        type: "radio",
        onClick: function onClick(e) {
          _this2.setState({
            every: false
          });

          _this2.props.onChange();
        },
        checked: this.state.every ? false : true
      }), React.createElement("span", {
        className: ""
      }, "\xA0At\xA0"), React.createElement("select", {
        className: "hours",
        disabled: this.state.every ? true : false,
        onChange: this.onAtHourChange,
        value: this.state.value[2]
      }, this.getHours()), React.createElement("select", {
        className: "minutes",
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