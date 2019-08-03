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
    _this.onCheck = _this.onCheck.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Cron, [{
    key: "onCheck",
    value: function onCheck(e) {
      var val = this.state.value; //val[0] = '0';

      if (e.target.checked) {
        //val[2] = (`${val[2]}`.split('/').length > 1) ? '0' : val[2].toString(); 
        //val[3] = '?';
        //val[4] = '*';
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
      return React.createElement("div", {
        className: "container-fluid"
      }, React.createElement("div", {
        className: "well well-small row"
      }, React.createElement("div", {
        className: "span6 col-sm-6"
      }, React.createElement("div", {
        className: "text_align_left"
      }, React.createElement("input", {
        type: "checkbox",
        value: "MON",
        onChange: this.onCheck,
        checked: this.state.value[5].search('MON') !== -1 ? true : false
      }), "\xA0Monday", React.createElement("br", null), React.createElement("input", {
        type: "checkbox",
        value: "WED",
        onChange: this.onCheck,
        checked: this.state.value[5].search('WED') !== -1 ? true : false
      }), "\xA0Wednesday", React.createElement("br", null), React.createElement("input", {
        type: "checkbox",
        value: "FRI",
        onChange: this.onCheck,
        checked: this.state.value[5].search('FRI') !== -1 ? true : false
      }), "\xA0Friday", React.createElement("br", null), React.createElement("input", {
        type: "checkbox",
        value: "SUN",
        onChange: this.onCheck,
        checked: this.state.value[5].search('SUN') !== -1 ? true : false
      }), "\xA0Sunday")), React.createElement("div", {
        className: "span6 col-sm-6"
      }, React.createElement("div", {
        className: "text_align_left"
      }, React.createElement("input", {
        type: "checkbox",
        value: "TUE",
        onChange: this.onCheck,
        checked: this.state.value[5].search('TUE') !== -1 ? true : false
      }), "\xA0Tuesday", React.createElement("br", null), React.createElement("input", {
        type: "checkbox",
        value: "THU",
        onChange: this.onCheck,
        checked: this.state.value[5].search('THU') !== -1 ? true : false
      }), "\xA0Thursday", React.createElement("br", null), React.createElement("input", {
        type: "checkbox",
        value: "SAT",
        onChange: this.onCheck,
        checked: this.state.value[5].search('SAT') !== -1 ? true : false
      }), "\xA0Saturday"), React.createElement("br", null), React.createElement("br", null))));
    }
  }]);

  return Cron;
}(Component);

export { Cron as default };