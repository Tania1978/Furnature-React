import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import "./LoginForm.css";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import GoogleAuth from "./GoogleAuth";
import { connect } from "react-redux";
import { login, signIn } from "../actions";
import history from '../history'
import { toast, ToastContainer } from "react-toastify";

class LoginForm extends React.Component {
  state = { passwordShown: false };

  renderError = (meta) => {
    if (meta.touched && meta.error) {
      return <div>{meta.error}</div>;
    }
    return null;
  };

  togglePassword = () => {
    this.setState({ passwordShown: this.state.passwordShown ? false : true });
  };

  onSubmit = ({ username, password }) => {
    this.props.login(username, password);
    setTimeout(() => {
      if (this.props.message.error !== "") {
        console.log(this.props.message);
        toast.error(`${this.props.message.error}`);
      }
      if (this.props.user.jwtToken) {
        this.props.signIn();
        history.push("/");
      }
    }, 1000);
  };

  renderInput = (formProps) => {
    const errorClass = `${
      formProps.meta.error && formProps.meta.touched ? "errorField" : ""
    }`;

    return (
      <div>
        <Form.Label>{formProps.label}</Form.Label>
        <InputGroup {...formProps.input} className={errorClass}>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <i onClick={formProps.onClick} className={formProps.icon}></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type={formProps.type}
            placeholder={formProps.placeholder}
          />
        </InputGroup>
        <Form.Control.Feedback
          type="invalid"
          style={{ display: "block", color: "rgb(240, 21, 94)" }}
        >
          {this.renderError(formProps.meta)}
        </Form.Control.Feedback>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Form
          className="loginForm shadow-lg"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="username"
            label="Username"
            placeholder="username"
            type="text"
            icon="bi bi-person-fill"
            component={this.renderInput}
          />
          <Field
            name="password"
            icon="bi bi-eye eye"
            label="Password"
            placeholder="password"
            type={this.state.passwordShown ? "text" : "password"}
            component={this.renderInput}
            onClick={this.togglePassword}
          />

          <Form.Group controlId="formBasicCheckbox"></Form.Group>
          <div className="centre">
            <button className="formbtn" type="btn">
              Sign in
            </button>
            <br />
            <NavLink
              exact
              to="/forgotPass"
              activeStyle={{ color: "rgb(240, 21, 94)" }}
              className="forgotPass"
            >
              Forgot Password?
            </NavLink>
            <NavLink
              to="/registrationform"
              activeStyle={{ color: "rgb(240, 21, 94)" }}
              className="registerLink"
            >
              Dont have an Acount? Register
            </NavLink>
            <br />
            <GoogleAuth className="nav-link" />
          </div>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.username) {
    errors.username = "Please enter you username";
  }
  if (!formValues.password) {
    errors.password = "Please enter you password";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isSignedIn: state.auth.isSignedIn,
    message: state.message,
  };
};

LoginForm = connect(mapStateToProps, { login, signIn })(LoginForm);

export default reduxForm({
  form: "LoginForm",
  validate,
})(LoginForm);
