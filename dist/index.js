import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import cronstrue from 'cronstrue';
import Minutes from './minutes';
import Daily from './daily';
import Hourly from './hourly';
import Weekly from './weekly';
import Monthly from './monthly';
import Yearly from './yearly'; // import './cron-builder.css';

var tabs = ['Minutes', 'Hourly', 'Daily', 'Weekly', 'Monthly']; //,'Yearly'

var Cron =
/*#__PURE__*/
function (_Component) {
  _inherits(Cron, _Component);

  function Cron(props) {
    var _this;

    _classCallCheck(this, Cron);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cron).call(this, props));
    _this.state = {//    selectedTab: tabs[0],
    };
    return _this;
  }

  _createClass(Cron, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (!this.props.value || this.props.value.split(' ').length !== 7) {
        this.state.value = ['0', '0', '00', '1/1', '*', '?', '*'];
        this.state.selectedTab = tabs[0];
        this.parentChange(this.state.value);
      } else {
        this.state.value = this.props.value.replace(/,/g, '!').split(' ');
      }

      var val = this.state.value;

      if (val[1].search('/') !== -1 && val[2] == '*' && val[3] == '1/1') {
        this.state.selectedTab = tabs[0];
      } else if (val[3] == '1/1') {
        this.state.selectedTab = tabs[1];
      } else if (val[3].search('/') !== -1 || val[5] == 'MON-FRI') {
        this.state.selectedTab = tabs[2];
      } else if (val[3] === '?') {
        this.state.selectedTab = tabs[3];
      } else if (val[3].startsWith('L') || val[4] === '1/1') {
        this.state.selectedTab = tabs[4];
      } else {
        this.state.selectedTab = tabs[0];
      }
    }
  }, {
    key: "defaultValue",
    value: function defaultValue(tab) {
      // switch(tab) {
      //     case tabs[0] : 
      //         return   ['0','0/1','*','*','*','?','*']
      //         break;
      //     case tabs[1] : 
      //         return   ['0','0','00','1/1','*','?','*']
      //         break;
      //     case tabs[2] : 
      //         return   ['0','0','00','1/1','*','?','*']
      //         break;
      //     case tabs[3] : 
      //         return   ['0','0','00','?','*','*','*']
      //         break;
      //     case tabs[4] : 
      //         return   ['0','0','00','1','1/1','?','*']
      //         break;
      //     case tabs[5] : 
      //         return   ['0','0','00','1','1/1','?','*']
      //         break;
      //     default: 
      //         return
      // }
      return ['0', '0/1', '*', '*', '*', '?', '*'];
    }
  }, {
    key: "tabChanged",
    value: function tabChanged(tab) {
      this.setState({
        selectedTab: tab,
        value: this.state.value
      });
      this.parentChange(this.state.value);
    }
  }, {
    key: "getHeaders",
    value: function getHeaders() {
      var _this2 = this;

      return tabs.map(function (d) {
        return React.createElement("li", {
          className: _this2.state.selectedTab === d ? 'active' : ''
        }, React.createElement("a", {
          onClick: _this2.tabChanged.bind(_this2, d)
        }, d));
      });
    }
  }, {
    key: "onValueChange",
    value: function onValueChange(val) {
      if (val && val.length) {
        console.log("IF E GIRDI", val);
        this.setState({
          value: val
        });
      } else {
        this.setState({
          value: ['0', '0', '00', '1/1', '*', '?', '*']
        });
        val = ['0', '0', '00', '1/1', '*', '?', '*'];
      }

      this.parentChange(val);
    }
  }, {
    key: "parentChange",
    value: function parentChange(val) {
      var newVal = '';
      newVal = val.toString().replace(/,/g, ' ');
      newVal = newVal.replace(/!/g, ',');
      console.log(newVal);
      this.props.onChange(newVal);
    }
  }, {
    key: "getVal",
    value: function getVal() {
      var val = cronstrue.toString(this.state.value.toString().replace(/,/g, ' ').replace(/!/g, ','));

      if (val.search('undefined') === -1) {
        return val;
      }

      return '-';
    }
  }, {
    key: "getComponent",
    value: function getComponent(tab) {
      switch (tab) {
        case tabs[0]:
          return React.createElement(Minutes, {
            value: this.state.value,
            onChange: this.onValueChange.bind(this)
          });
          break;

        case tabs[1]:
          console.log("HOURLY VALUE:", this.state.value);
          return React.createElement(Hourly, {
            value: this.state.value,
            onChange: this.onValueChange.bind(this)
          });
          break;

        case tabs[2]:
          return React.createElement(Daily, {
            value: this.state.value,
            onChange: this.onValueChange.bind(this)
          });
          break;

        case tabs[3]:
          return React.createElement(Weekly, {
            value: this.state.value,
            onChange: this.onValueChange.bind(this)
          });
          break;

        case tabs[4]:
          return React.createElement(Monthly, {
            value: this.state.value,
            onChange: this.onValueChange.bind(this)
          });
          break;

        case tabs[5]:
          return React.createElement(Yearly, {
            value: this.state.value,
            onChange: this.onValueChange.bind(this)
          });
          break;

        default:
          return;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "cron_builder"
      }, React.createElement("ul", {
        className: "nav nav-tabs"
      }, this.getHeaders()), React.createElement("div", {
        className: "cron_builder_bordering"
      }, this.getComponent(this.state.selectedTab)), this.props.showResultText && React.createElement("div", {
        className: "cron-builder-bg"
      }, this.getVal()), this.props.showResultCron && React.createElement("div", {
        className: "cron-builder-bg"
      }, this.state.value.toString().replace(/,/g, ' ').replace(/!/g, ',')));
    }
  }]);

  return Cron;
}(Component);

export { Cron as default };