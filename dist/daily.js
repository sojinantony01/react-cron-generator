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
    _this.onAtHourChange = _this.onAtHourChange.bind(_assertThisInitialized(_this));
    _this.onAtMinuteChange = _this.onAtMinuteChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Cron, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.state.value = this.props.value;

      if (this.state.value[3] === '?') {
        this.state.every = false;
      } else {
        this.state.every = true;
      }
    }
  }, {
    key: "onDayChange",
    value: function onDayChange(e) {
      if (e.target.value > 0 && e.target.value < 32 || e.target.value == '') {
        var val = ['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], '*', '*', '?', '*'];

        if (e.target.value == '') {
          val[3] = '';
        } else {
          val[3] = "1/".concat(e.target.value);
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
        onClick: function onClick(e) {
          _this2.setState({
            every: true
          });

          _this2.props.onChange();
        },
        value: "1",
        name: "DailyRadio",
        checked: this.state.every ? true : false
      }), "\xA0 Every \xA0", React.createElement("input", {
        disabled: this.state.every ? false : true,
        type: "Number",
        onChange: this.onDayChange,
        value: this.state.value[3].split('/')[1] ? this.state.value[3].split('/')[1] : ''
      }), "\xA0 day(s)"), React.createElement("div", {
        className: "well well-small"
      }, React.createElement("input", {
        onClick: function onClick(e) {
          _this2.setState({
            every: false
          });

          _this2.props.onChange(['0', _this2.state.value[1], _this2.state.value[2], '?', '*', 'MON-FRI', '*']);
        },
        type: "radio",
        value: "2",
        name: "DailyRadio",
        checked: this.state.every ? false : true
      }), "\xA0 Every week day\xA0"), "\xA0 Start time\xA0", React.createElement("select", {
        id: "DailyHours",
        className: "hours",
        onChange: this.onAtHourChange,
        value: this.state.value[2]
      }, React.createElement("option", {
        id: "0"
      }, "00"), React.createElement("option", {
        id: "1"
      }, "01"), React.createElement("option", {
        id: "2"
      }, "02"), React.createElement("option", {
        id: "3"
      }, "03"), React.createElement("option", {
        id: "4"
      }, "04"), React.createElement("option", {
        id: "5"
      }, "05"), React.createElement("option", {
        id: "6"
      }, "06"), React.createElement("option", {
        id: "7"
      }, "07"), React.createElement("option", {
        id: "8"
      }, "08"), React.createElement("option", {
        id: "9"
      }, "09"), React.createElement("option", {
        id: "10"
      }, "10"), React.createElement("option", {
        id: "11"
      }, "11"), React.createElement("option", {
        id: "12"
      }, "12"), React.createElement("option", {
        id: "13"
      }, "13"), React.createElement("option", {
        id: "14"
      }, "14"), React.createElement("option", {
        id: "15"
      }, "15"), React.createElement("option", {
        id: "16"
      }, "16"), React.createElement("option", {
        id: "17"
      }, "17"), React.createElement("option", {
        id: "18"
      }, "18"), React.createElement("option", {
        id: "19"
      }, "19"), React.createElement("option", {
        id: "20"
      }, "20"), React.createElement("option", {
        id: "21"
      }, "21"), React.createElement("option", {
        id: "22"
      }, "22"), React.createElement("option", {
        id: "23"
      }, "23")), React.createElement("select", {
        id: "DailyMinutes",
        className: "minutes",
        onChange: this.onAtMinuteChange,
        value: this.state.value[1]
      }, React.createElement("option", {
        id: "0"
      }, "00"), React.createElement("option", {
        id: "1"
      }, "01"), React.createElement("option", {
        id: "2"
      }, "02"), React.createElement("option", {
        id: "3"
      }, "03"), React.createElement("option", {
        id: "4"
      }, "04"), React.createElement("option", {
        id: "5"
      }, "05"), React.createElement("option", {
        id: "6"
      }, "06"), React.createElement("option", {
        id: "7"
      }, "07"), React.createElement("option", {
        id: "8"
      }, "08"), React.createElement("option", {
        id: "9"
      }, "09"), React.createElement("option", {
        id: "10"
      }, "10"), React.createElement("option", {
        id: "11"
      }, "11"), React.createElement("option", {
        id: "12"
      }, "12"), React.createElement("option", {
        id: "13"
      }, "13"), React.createElement("option", {
        id: "14"
      }, "14"), React.createElement("option", {
        id: "15"
      }, "15"), React.createElement("option", {
        id: "16"
      }, "16"), React.createElement("option", {
        id: "17"
      }, "17"), React.createElement("option", {
        id: "18"
      }, "18"), React.createElement("option", {
        id: "19"
      }, "19"), React.createElement("option", {
        id: "20"
      }, "20"), React.createElement("option", {
        id: "21"
      }, "21"), React.createElement("option", {
        id: "22"
      }, "22"), React.createElement("option", {
        id: "23"
      }, "23"), React.createElement("option", {
        id: "24"
      }, "24"), React.createElement("option", {
        id: "25"
      }, "25"), React.createElement("option", {
        id: "26"
      }, "26"), React.createElement("option", {
        id: "27"
      }, "27"), React.createElement("option", {
        id: "28"
      }, "28"), React.createElement("option", {
        id: "29"
      }, "29"), React.createElement("option", {
        id: "30"
      }, "30"), React.createElement("option", {
        id: "31"
      }, "31"), React.createElement("option", {
        id: "32"
      }, "32"), React.createElement("option", {
        id: "33"
      }, "33"), React.createElement("option", {
        id: "34"
      }, "34"), React.createElement("option", {
        id: "35"
      }, "35"), React.createElement("option", {
        id: "36"
      }, "36"), React.createElement("option", {
        id: "37"
      }, "37"), React.createElement("option", {
        id: "38"
      }, "38"), React.createElement("option", {
        id: "39"
      }, "39"), React.createElement("option", {
        id: "40"
      }, "40"), React.createElement("option", {
        id: "41"
      }, "41"), React.createElement("option", {
        id: "42"
      }, "42"), React.createElement("option", {
        id: "43"
      }, "43"), React.createElement("option", {
        id: "44"
      }, "44"), React.createElement("option", {
        id: "45"
      }, "45"), React.createElement("option", {
        id: "46"
      }, "46"), React.createElement("option", {
        id: "47"
      }, "47"), React.createElement("option", {
        id: "48"
      }, "48"), React.createElement("option", {
        id: "49"
      }, "49"), React.createElement("option", {
        id: "50"
      }, "50"), React.createElement("option", {
        id: "51"
      }, "51"), React.createElement("option", {
        id: "52"
      }, "52"), React.createElement("option", {
        id: "53"
      }, "53"), React.createElement("option", {
        id: "54"
      }, "54"), React.createElement("option", {
        id: "55"
      }, "55"), React.createElement("option", {
        id: "56"
      }, "56"), React.createElement("option", {
        id: "57"
      }, "57"), React.createElement("option", {
        id: "58"
      }, "58"), React.createElement("option", {
        id: "59"
      }, "59")));
    }
  }]);

  return Cron;
}(Component);

export { Cron as default };