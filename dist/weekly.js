"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Cron extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onAtHourChange = this.onAtHourChange.bind(this);
    this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onAtHourChange(e) {
    let val = this.state.value;
    val[0] = '0';
    val[2] = `${e.target.value}`;
    this.props.onChange(val);
  }

  onAtMinuteChange(e) {
    let val = this.state.value;
    val[0] = '0';
    val[1] = `${e.target.value}`;
    this.props.onChange(val);
  }

  onCheck(e) {
    let val = this.state.value;
    val[0] = '0';

    if (e.target.checked) {
      val[2] = `${val[2]}`.split('/').length > 1 ? '0' : val[2].toString();
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

  render() {
    this.state.value = this.props.value;
    return _react.default.createElement(_reactstrap.Container, null, _react.default.createElement(_reactstrap.Row, {
      className: "mt-sm-1"
    }, _react.default.createElement(_reactstrap.Container, null, _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, {
      className: "col-6"
    }, _react.default.createElement(_reactstrap.CustomInput, {
      id: "checkbox-monday",
      type: "checkbox",
      value: "MON",
      label: "Monday",
      onChange: this.onCheck,
      checked: this.state.value[5].search('MON') !== -1 ? true : false
    }), _react.default.createElement(_reactstrap.CustomInput, {
      id: "checkbox-wednesday",
      type: "checkbox",
      value: "WED",
      label: "Wednesday",
      onChange: this.onCheck,
      checked: this.state.value[5].search('WED') !== -1 ? true : false
    }), _react.default.createElement(_reactstrap.CustomInput, {
      id: "checkbox-friday",
      type: "checkbox",
      value: "FRI",
      label: "Friday",
      onChange: this.onCheck,
      checked: this.state.value[5].search('FRI') !== -1 ? true : false
    }), _react.default.createElement(_reactstrap.CustomInput, {
      id: "checkbox-sunday",
      type: "checkbox",
      value: "SUN",
      label: "Sunday",
      onChange: this.onCheck,
      checked: this.state.value[5].search('SUN') !== -1 ? true : false
    })), _react.default.createElement(_reactstrap.Col, {
      className: "col-6"
    }, _react.default.createElement("div", {
      className: "text_align_left"
    }, _react.default.createElement(_reactstrap.CustomInput, {
      id: "checkbox-tuesday",
      type: "checkbox",
      value: "TUE",
      label: "Tuesday",
      onChange: this.onCheck,
      checked: this.state.value[5].search('TUE') !== -1 ? true : false
    }), _react.default.createElement(_reactstrap.CustomInput, {
      id: "checkbox-thursday",
      type: "checkbox",
      value: "THU",
      label: "Thursday",
      onChange: this.onCheck,
      checked: this.state.value[5].search('THU') !== -1 ? true : false
    }), _react.default.createElement(_reactstrap.CustomInput, {
      id: "checkbox-saturday",
      type: "checkbox",
      value: "SAT",
      label: "Saturday",
      onChange: this.onCheck,
      checked: this.state.value[5].search('SAT') !== -1 ? true : false
    })))))), _react.default.createElement(_reactstrap.Row, {
      className: "mt-sm-1"
    }, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Form, {
      inline: true
    }, _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, {
      className: "mr-sm-1"
    }, "Start time"), _react.default.createElement(_reactstrap.Input, {
      className: "mr-sm-1 hours",
      type: "select",
      min: 0,
      max: 23,
      value: this.state.value[2],
      onChange: this.onAtHourChange
    }, _react.default.createElement("option", {
      value: "0"
    }, "00"), _react.default.createElement("option", {
      value: "1"
    }, "01"), _react.default.createElement("option", {
      value: "2"
    }, "02"), _react.default.createElement("option", {
      value: "3"
    }, "03"), _react.default.createElement("option", {
      value: "4"
    }, "04"), _react.default.createElement("option", {
      value: "5"
    }, "05"), _react.default.createElement("option", {
      value: "6"
    }, "06"), _react.default.createElement("option", {
      value: "7"
    }, "07"), _react.default.createElement("option", {
      value: "8"
    }, "08"), _react.default.createElement("option", {
      value: "9"
    }, "09"), _react.default.createElement("option", {
      value: "10"
    }, "10"), _react.default.createElement("option", {
      value: "11"
    }, "11"), _react.default.createElement("option", {
      value: "12"
    }, "12"), _react.default.createElement("option", {
      value: "13"
    }, "13"), _react.default.createElement("option", {
      value: "14"
    }, "14"), _react.default.createElement("option", {
      value: "15"
    }, "15"), _react.default.createElement("option", {
      value: "16"
    }, "16"), _react.default.createElement("option", {
      value: "17"
    }, "17"), _react.default.createElement("option", {
      value: "18"
    }, "18"), _react.default.createElement("option", {
      value: "19"
    }, "19"), _react.default.createElement("option", {
      value: "20"
    }, "20"), _react.default.createElement("option", {
      value: "21"
    }, "21"), _react.default.createElement("option", {
      value: "22"
    }, "22"), _react.default.createElement("option", {
      value: "23"
    }, "23")), _react.default.createElement(_reactstrap.Input, {
      className: "minutes",
      type: "select",
      min: 0,
      max: 59,
      value: this.state.value[1],
      onChange: this.onAtMinuteChange
    }, _react.default.createElement("option", {
      value: "0"
    }, "00"), _react.default.createElement("option", {
      value: "1"
    }, "01"), _react.default.createElement("option", {
      value: "2"
    }, "02"), _react.default.createElement("option", {
      value: "3"
    }, "03"), _react.default.createElement("option", {
      value: "4"
    }, "04"), _react.default.createElement("option", {
      value: "5"
    }, "05"), _react.default.createElement("option", {
      value: "6"
    }, "06"), _react.default.createElement("option", {
      value: "7"
    }, "07"), _react.default.createElement("option", {
      value: "8"
    }, "08"), _react.default.createElement("option", {
      value: "9"
    }, "09"), _react.default.createElement("option", {
      value: "10"
    }, "10"), _react.default.createElement("option", {
      value: "11"
    }, "11"), _react.default.createElement("option", {
      value: "12"
    }, "12"), _react.default.createElement("option", {
      value: "13"
    }, "13"), _react.default.createElement("option", {
      value: "14"
    }, "14"), _react.default.createElement("option", {
      value: "15"
    }, "15"), _react.default.createElement("option", {
      value: "16"
    }, "16"), _react.default.createElement("option", {
      value: "17"
    }, "17"), _react.default.createElement("option", {
      value: "18"
    }, "18"), _react.default.createElement("option", {
      value: "19"
    }, "19"), _react.default.createElement("option", {
      value: "20"
    }, "20"), _react.default.createElement("option", {
      value: "21"
    }, "21"), _react.default.createElement("option", {
      value: "22"
    }, "22"), _react.default.createElement("option", {
      value: "23"
    }, "23"), _react.default.createElement("option", {
      value: "24"
    }, "24"), _react.default.createElement("option", {
      value: "25"
    }, "25"), _react.default.createElement("option", {
      value: "26"
    }, "26"), _react.default.createElement("option", {
      value: "27"
    }, "27"), _react.default.createElement("option", {
      value: "28"
    }, "28"), _react.default.createElement("option", {
      value: "29"
    }, "29"), _react.default.createElement("option", {
      value: "30"
    }, "30"), _react.default.createElement("option", {
      value: "31"
    }, "31"), _react.default.createElement("option", {
      value: "32"
    }, "32"), _react.default.createElement("option", {
      value: "33"
    }, "33"), _react.default.createElement("option", {
      value: "34"
    }, "34"), _react.default.createElement("option", {
      value: "35"
    }, "35"), _react.default.createElement("option", {
      value: "36"
    }, "36"), _react.default.createElement("option", {
      value: "37"
    }, "37"), _react.default.createElement("option", {
      value: "38"
    }, "38"), _react.default.createElement("option", {
      value: "39"
    }, "39"), _react.default.createElement("option", {
      value: "40"
    }, "40"), _react.default.createElement("option", {
      value: "41"
    }, "41"), _react.default.createElement("option", {
      value: "42"
    }, "42"), _react.default.createElement("option", {
      value: "43"
    }, "43"), _react.default.createElement("option", {
      value: "44"
    }, "44"), _react.default.createElement("option", {
      value: "45"
    }, "45"), _react.default.createElement("option", {
      value: "46"
    }, "46"), _react.default.createElement("option", {
      value: "47"
    }, "47"), _react.default.createElement("option", {
      value: "48"
    }, "48"), _react.default.createElement("option", {
      value: "49"
    }, "49"), _react.default.createElement("option", {
      value: "50"
    }, "50"), _react.default.createElement("option", {
      value: "51"
    }, "51"), _react.default.createElement("option", {
      value: "52"
    }, "52"), _react.default.createElement("option", {
      value: "53"
    }, "53"), _react.default.createElement("option", {
      value: "54"
    }, "54"), _react.default.createElement("option", {
      value: "55"
    }, "55"), _react.default.createElement("option", {
      value: "56"
    }, "56"), _react.default.createElement("option", {
      value: "57"
    }, "57"), _react.default.createElement("option", {
      value: "58"
    }, "58"), _react.default.createElement("option", {
      value: "59"
    }, "59")))))));
  }

}

exports.default = Cron;