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
    _this.onAtHourChange = _this.onAtHourChange.bind(_assertThisInitialized(_this));
    _this.onAtMinuteChange = _this.onAtMinuteChange.bind(_assertThisInitialized(_this));
    _this.onCheck = _this.onCheck.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Cron, [{
    key: "onAtHourChange",
    value: function onAtHourChange(e) {
      var val = this.state.value;
      val[0] = '0';
      val[2] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "onAtMinuteChange",
    value: function onAtMinuteChange(e) {
      var val = this.state.value;
      val[0] = '0';
      val[1] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "onCheck",
    value: function onCheck(e) {
      var val = this.state.value;
      val[0] = '0';

      if (e.target.checked) {
        val[2] = "".concat(val[2]).split('/').length > 1 ? '0' : val[2].toString();
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
          val[5].splice(val[5].indexOf(e.target.value), 1);
          val[5] = val[5].toString().replace(/,/g, '!');
        } else {
          val[5] = '*';
        }
      }

      this.props.onChange(val);
    }
  }, {
    key: "render",
    value: function render() {
      this.state.value = this.props.value;
      return React.createElement(Container, null, React.createElement(Row, {
        className: "mt-sm-1"
      }, React.createElement(Container, null, React.createElement(Row, null, React.createElement(Col, {
        className: "col-6"
      }, React.createElement(CustomInput, {
        id: "checkbox-monday",
        type: "checkbox",
        value: "MON",
        label: "Monday",
        onChange: this.onCheck,
        checked: this.state.value[5].search('MON') !== -1 ? true : false
      }), React.createElement(CustomInput, {
        id: "checkbox-wednesday",
        type: "checkbox",
        value: "WED",
        label: "Wednesday",
        onChange: this.onCheck,
        checked: this.state.value[5].search('WED') !== -1 ? true : false
      }), React.createElement(CustomInput, {
        id: "checkbox-friday",
        type: "checkbox",
        value: "FRI",
        label: "Friday",
        onChange: this.onCheck,
        checked: this.state.value[5].search('FRI') !== -1 ? true : false
      }), React.createElement(CustomInput, {
        id: "checkbox-sunday",
        type: "checkbox",
        value: "SUN",
        label: "Sunday",
        onChange: this.onCheck,
        checked: this.state.value[5].search('SUN') !== -1 ? true : false
      })), React.createElement(Col, {
        className: "col-6"
      }, React.createElement("div", {
        className: "text_align_left"
      }, React.createElement(CustomInput, {
        id: "checkbox-tuesday",
        type: "checkbox",
        value: "TUE",
        label: "Tuesday",
        onChange: this.onCheck,
        checked: this.state.value[5].search('TUE') !== -1 ? true : false
      }), React.createElement(CustomInput, {
        id: "checkbox-thursday",
        type: "checkbox",
        value: "THU",
        label: "Thursday",
        onChange: this.onCheck,
        checked: this.state.value[5].search('THU') !== -1 ? true : false
      }), React.createElement(CustomInput, {
        id: "checkbox-saturday",
        type: "checkbox",
        value: "SAT",
        label: "Saturday",
        onChange: this.onCheck,
        checked: this.state.value[5].search('SAT') !== -1 ? true : false
      })))))), React.createElement(Row, {
        className: "mt-sm-1"
      }, React.createElement(Col, null, React.createElement(Form, {
        inline: true
      }, React.createElement(FormGroup, null, React.createElement(Label, {
        className: "mr-sm-1"
      }, "Start time"), React.createElement(Input, {
        className: "mr-sm-1 hours",
        type: "select",
        min: 0,
        max: 23,
        value: this.state.value[2],
        onChange: this.onAtHourChange
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
      }, "23")), React.createElement(Input, {
        className: "minutes",
        type: "select",
        min: 0,
        max: 59,
        value: this.state.value[1],
        onChange: this.onAtMinuteChange
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
      }, "59")))))));
    }
  }]);

  return Cron;
}(Component);

export { Cron as default };