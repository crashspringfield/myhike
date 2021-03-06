"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Link = require("react-router").Link;
var NavAdmin = require("../Navbar").NavAdmin;
var Navbar = (function (_React$Component) {
  function Navbar() {
    _classCallCheck(this, Navbar);

    _get(Object.getPrototypeOf(Navbar.prototype), "constructor", this).call(this);
    this.state = {};
  }

  _inherits(Navbar, _React$Component);

  _prototypeProperties(Navbar, null, {
    render: {
      value: function render() {
        return React.createElement(
          "nav",
          { className: "navbar navbar-inverse navbar-fixed-top" },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "navbar-header" },
              React.createElement(
                "button",
                { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#sm-collapse", "aria-expanded": "false" },
                React.createElement(
                  "span",
                  { className: "sr-only" },
                  "Toggle navigation"
                ),
                React.createElement("span", { className: "icon-bar" }),
                React.createElement("span", { className: "icon-bar" }),
                React.createElement("span", { className: "icon-bar" })
              ),
              React.createElement(
                "a",
                { className: "navbar-brand", href: "/" },
                "Home"
              )
            ),
            React.createElement(
              "div",
              { className: "collapse navbar-collapse", id: "sm-collapse" },
              React.createElement(
                "ul",
                { className: "nav navbar-nav" },
                React.createElement(
                  "li",
                  null,
                  React.createElement(
                    Link,
                    { to: "/about" },
                    "About"
                  )
                )
              ),
              React.createElement(NavAdmin, null)
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Navbar;
})(React.Component);

module.exports = Navbar;