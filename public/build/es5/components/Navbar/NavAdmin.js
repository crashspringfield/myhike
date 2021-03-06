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
var connect = require("react-redux").connect;
var Modal = _interopRequire(require("react-modal"));

var APIManager = require("../../utils").APIManager;
var actions = _interopRequire(require("../../actions"));

var _User = require("../User");

var Login = _User.Login;
var Register = _User.Register;
var NavAdmin = (function (Component) {
  function NavAdmin() {
    _classCallCheck(this, NavAdmin);

    _get(Object.getPrototypeOf(NavAdmin.prototype), "constructor", this).call(this);
    this.state = {
      modalIsOpen: false,
      isLogin: false,
      isRegister: false
    };
    this.openLogin = this.openLogin.bind(this);
    this.openRegister = this.openRegister.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  _inherits(NavAdmin, Component);

  _prototypeProperties(NavAdmin, null, {
    openLogin: {
      value: function openLogin() {
        this.setState({
          modalIsOpen: true,
          isLogin: true
        });
      },
      writable: true,
      configurable: true
    },
    openRegister: {
      value: function openRegister() {
        this.setState({
          modalIsOpen: true,
          isRegister: true
        });
      },
      writable: true,
      configurable: true
    },
    closeModal: {
      value: function closeModal() {
        this.setState({
          modalIsOpen: false,
          isLogin: false,
          isRegister: false
        });
        this.props.displayError("");
      },
      writable: true,
      configurable: true
    },
    login: {
      value: function login(credentials) {
        this.props.currentUserReceived(credentials);
        this.setState({
          modalIsOpen: false
        });
      },
      writable: true,
      configurable: true
    },
    logout: {
      value: function logout(event) {
        event.preventDefault();
        this.props.logoutUser(null);
      },
      writable: true,
      configurable: true
    },
    renderModalHeader: {
      value: function renderModalHeader() {
        return React.createElement(
          "div",
          { className: "modal-header" },
          React.createElement(
            "span",
            { className: "modal-title" },
            this.state.isRegister ? "Register" : "Login"
          ),
          React.createElement("span", { onClick: this.closeModal, className: "x-button" })
        );
      },
      writable: true,
      configurable: true
    },
    renderModalType: {
      value: function renderModalType() {
        var _this = this;
        if (this.state.isRegister) {
          return React.createElement(
            "div",
            { className: "modal-register" },
            React.createElement(Register, { onClose: this.closeModal })
          );
        } else if (this.state.isLogin) {
          return React.createElement(
            "div",
            { className: "modal-login" },
            React.createElement(Login, { onLogin: this.login.bind(this),
              displayError: function (error) {
                return _this.props.displayError(error);
              },
              error: this.props.error
            })
          );
        }
      },
      writable: true,
      configurable: true
    },
    renderIfNoUser: {
      value: function renderIfNoUser() {
        return React.createElement(
          "ul",
          { className: "nav navbar-nav navbar-right" },
          React.createElement(
            "li",
            null,
            React.createElement(
              Link,
              { to: "/create-hike" },
              "Create Hike"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { onClick: this.openLogin, className: "nav-link" },
              "Login"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { onClick: this.openRegister, className: "nav-link" },
              "Register"
            )
          )
        );
      },
      writable: true,
      configurable: true
    },
    renderIfUser: {
      value: function renderIfUser() {
        return React.createElement(
          "ul",
          { className: "nav navbar-nav navbar-right" },
          React.createElement(
            "li",
            null,
            React.createElement(
              Link,
              { to: "/create-hike" },
              "Create Hike"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              Link,
              { to: "/currentuser" },
              "Account"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { onClick: this.logout.bind(this), className: "nav-link" },
              "Log out"
            )
          )
        );
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "nav-admin" },
          this.props.user ? this.renderIfUser() : this.renderIfNoUser(),
          React.createElement(
            Modal,
            {
              className: "account-modal",
              overlayClassName: "account-modal-overlay",
              isOpen: this.state.modalIsOpen,
              onAfterOpen: this.afterOpenModal,
              onRequestClose: this.closeModal,
              contentLabel: "account modal"
            },
            this.renderModalHeader(),
            React.createElement(
              "div",
              { className: "modal-body" },
              this.renderModalType()
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return NavAdmin;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user,
    error: state.message.error
  };
};

var dispatchToProps = function (dispatch) {
  return {
    currentUserReceived: function (user) {
      return dispatch(actions.currentUserReceived(user));
    },
    displayError: function (error) {
      return dispatch(actions.displayError(error));
    },
    logoutUser: function (user) {
      return dispatch(actions.logoutUser(user));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(NavAdmin);