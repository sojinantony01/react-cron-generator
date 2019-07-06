import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
    _this.state = {
      hour: 0,
      minute: 0
    };
    _this.onDayChange = _this.onDayChange.bind(_assertThisInitialized(_this));
    _this.onLastDayChange = _this.onLastDayChange.bind(_assertThisInitialized(_this));
    _this.onAtHourChange = _this.onAtHourChange.bind(_assertThisInitialized(_this));
    _this.onAtMinuteChange = _this.onAtMinuteChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Cron, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.state.value = this.props.value;

      if (this.state.value[3] === 'L') {
        this.state.every = "2";
      } else if (this.state.value[3] === 'LW') {
        this.state.every = "3";
      } else if (this.state.value[3].startsWith('L')) {
        this.state.every = "4";
      } else {
        this.state.every = "1";
      }
    }
  }, {
    key: "onDayChange",
    value: function onDayChange(e) {
      if (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31 || e.target.value == "") {
        var val = ['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], this.state.value[3], '1/1', '?', '*'];
        val[3] = "".concat(e.target.value);
        this.props.onChange(val);
      }
    }
  }, {
    key: "onLastDayChange",
    value: function onLastDayChange(e) {
      if (parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31 || e.target.value == "") {
        var val = ['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], this.state.value[3], '1/1', '?', '*'];

        if (e.target.value == '') {
          val[3] = '';
        } else {
          val[3] = "L-".concat(e.target.value);
        }

        this.props.onChange(val);
      }
    }
  }, {
    key: "onAtHourChange",
    value: function onAtHourChange(e) {
      var val = this.state.value;
      val[2] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "onAtMinuteChange",
    value: function onAtMinuteChange(e) {
      var val = this.state.value;
      val[1] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.state.value = this.props.value;
      return React.createElement("div", {
        className: "tab-pane"
      }, React.createElement("div", {
        className: "well well-small"
      }, React.createElement("input", {
        type: "radio",
        onChange: function onChange(e) {
          _this2.setState({
            every: e.target.value
          });

          _this2.props.onChange(['0', _this2.state.value[1] === '*' ? '0' : _this2.state.value[1], _this2.state.value[2] === '*' ? '0' : _this2.state.value[2], '1', '1/1', '?', '*']);
        },
        value: "1",
        name: "MonthlyRadio",
        checked: this.state.every === "1" ? true : false
      }), "\xA0Day\xA0", React.createElement("input", {
        readOnly: this.state.every !== "1",
        type: "number",
        value: this.state.value[3],
        onChange: this.onDayChange
      }), "\xA0of every month(s)"), React.createElement("div", {
        className: "well well-small"
      }, React.createElement("input", {
        onChange: function onChange(e) {
          _this2.setState({
            every: e.target.value
          });

          _this2.props.onChange(['0', _this2.state.value[1] === '*' ? '0' : _this2.state.value[1], _this2.state.value[2] === '*' ? '0' : _this2.state.value[2], 'L', '*', '?', '*']);
        },
        type: "radio",
        value: "2",
        name: "DailyRadio",
        checked: this.state.every === "2" ? true : false
      }), "\xA0 Last day of every month \xA0"), React.createElement("div", {
        className: "well well-small"
      }, React.createElement("input", {
        onChange: function onChange(e) {
          _this2.setState({
            every: e.target.value
          });

          _this2.props.onChange(['0', _this2.state.value[1] === '*' ? '0' : _this2.state.value[1], _this2.state.value[2] === '*' ? '0' : _this2.state.value[2], 'LW', '*', '?', '*']);
        },
        type: "radio",
        value: "3",
        name: "DailyRadio",
        checked: this.state.every === "3" ? true : false
      }), "\xA0 On the last weekday of every month \xA0"), React.createElement("div", {
        className: "well well-small"
      }, React.createElement("input", {
        type: "radio",
        onChange: function onChange(e) {
          _this2.setState({
            every: e.target.value
          });

          _this2.props.onChange(['0', _this2.state.value[1] === '*' ? '0' : _this2.state.value[1], _this2.state.value[2] === '*' ? '0' : _this2.state.value[2], "L-".concat(1), '*', '?', '*']);
        },
        value: "4",
        name: "MonthlyRadio",
        checked: this.state.every === "4" ? true : false
      }), React.createElement("input", {
        readOnly: this.state.every !== "4",
        type: "number",
        value: this.state.value[3].split('-')[1],
        onChange: this.onLastDayChange
      }), "\xA0day(s) before the end of the month"), "\xA0 Start time \xA0", React.createElement("select", {
        className: "hours",
        onChange: this.onAtHourChange,
        value: this.state.value[2]
      }, React.createElement("option", {
        value: "0"
      }, "00"), React.createElement("option", {
        value: "1"
      }, "01"), React.createElement("option", {
        value: "2"
      }, "02"), React.createElement("option", {
        value: "3"
      }, "03"), React.createElement("option", {
        value: "4"
      }, "04"), React.createElement("option", {
        value: "5"
      }, "05"), React.createElement("option", {
        value: "6"
      }, "06"), React.createElement("option", {
        value: "7"
      }, "07"), React.createElement("option", {
        value: "8"
      }, "08"), React.createElement("option", {
        value: "9"
      }, "09"), React.createElement("option", {
        value: "10"
      }, "10"), React.createElement("option", {
        value: "11"
      }, "11"), React.createElement("option", {
        value: "12"
      }, "12"), React.createElement("option", {
        value: "13"
      }, "13"), React.createElement("option", {
        value: "14"
      }, "14"), React.createElement("option", {
        value: "15"
      }, "15"), React.createElement("option", {
        value: "16"
      }, "16"), React.createElement("option", {
        value: "17"
      }, "17"), React.createElement("option", {
        value: "18"
      }, "18"), React.createElement("option", {
        value: "19"
      }, "19"), React.createElement("option", {
        value: "20"
      }, "20"), React.createElement("option", {
        value: "21"
      }, "21"), React.createElement("option", {
        value: "22"
      }, "22"), React.createElement("option", {
        value: "23"
      }, "23")), React.createElement("select", _defineProperty({
        value: "DailyMinutes",
        className: "minutes",
        onChange: this.onAtMinuteChange
      }, "value", this.state.value[1]), React.createElement("option", {
        value: "0"
      }, "00"), React.createElement("option", {
        value: "1"
      }, "01"), React.createElement("option", {
        value: "2"
      }, "02"), React.createElement("option", {
        value: "3"
      }, "03"), React.createElement("option", {
        value: "4"
      }, "04"), React.createElement("option", {
        value: "5"
      }, "05"), React.createElement("option", {
        value: "6"
      }, "06"), React.createElement("option", {
        value: "7"
      }, "07"), React.createElement("option", {
        value: "8"
      }, "08"), React.createElement("option", {
        value: "9"
      }, "09"), React.createElement("option", {
        value: "10"
      }, "10"), React.createElement("option", {
        value: "11"
      }, "11"), React.createElement("option", {
        value: "12"
      }, "12"), React.createElement("option", {
        value: "13"
      }, "13"), React.createElement("option", {
        value: "14"
      }, "14"), React.createElement("option", {
        value: "15"
      }, "15"), React.createElement("option", {
        value: "16"
      }, "16"), React.createElement("option", {
        value: "17"
      }, "17"), React.createElement("option", {
        value: "18"
      }, "18"), React.createElement("option", {
        value: "19"
      }, "19"), React.createElement("option", {
        value: "20"
      }, "20"), React.createElement("option", {
        value: "21"
      }, "21"), React.createElement("option", {
        value: "22"
      }, "22"), React.createElement("option", {
        value: "23"
      }, "23"), React.createElement("option", {
        value: "24"
      }, "24"), React.createElement("option", {
        value: "25"
      }, "25"), React.createElement("option", {
        value: "26"
      }, "26"), React.createElement("option", {
        value: "27"
      }, "27"), React.createElement("option", {
        value: "28"
      }, "28"), React.createElement("option", {
        value: "29"
      }, "29"), React.createElement("option", {
        value: "30"
      }, "30"), React.createElement("option", {
        value: "31"
      }, "31"), React.createElement("option", {
        value: "32"
      }, "32"), React.createElement("option", {
        value: "33"
      }, "33"), React.createElement("option", {
        value: "34"
      }, "34"), React.createElement("option", {
        value: "35"
      }, "35"), React.createElement("option", {
        value: "36"
      }, "36"), React.createElement("option", {
        value: "37"
      }, "37"), React.createElement("option", {
        value: "38"
      }, "38"), React.createElement("option", {
        value: "39"
      }, "39"), React.createElement("option", {
        value: "40"
      }, "40"), React.createElement("option", {
        value: "41"
      }, "41"), React.createElement("option", {
        value: "42"
      }, "42"), React.createElement("option", {
        value: "43"
      }, "43"), React.createElement("option", {
        value: "44"
      }, "44"), React.createElement("option", {
        value: "45"
      }, "45"), React.createElement("option", {
        value: "46"
      }, "46"), React.createElement("option", {
        value: "47"
      }, "47"), React.createElement("option", {
        value: "48"
      }, "48"), React.createElement("option", {
        value: "49"
      }, "49"), React.createElement("option", {
        value: "50"
      }, "50"), React.createElement("option", {
        value: "51"
      }, "51"), React.createElement("option", {
        value: "52"
      }, "52"), React.createElement("option", {
        value: "53"
      }, "53"), React.createElement("option", {
        value: "54"
      }, "54"), React.createElement("option", {
        value: "55"
      }, "55"), React.createElement("option", {
        value: "56"
      }, "56"), React.createElement("option", {
        value: "57"
      }, "57"), React.createElement("option", {
        value: "58"
      }, "58"), React.createElement("option", {
        value: "59"
      }, "59")));
    }
  }]);

  return Cron;
}(Component);

export { Cron as default };