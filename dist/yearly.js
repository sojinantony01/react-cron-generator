import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';

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
    key: "render",
    value: function render() {
      return React.createElement("div", null, "yearly");
    }
  }]);

  return Cron;
}(Component);

export { Cron as default };