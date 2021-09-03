import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login, signIn } from "../actions";
import history from "../history";
import { toast, ToastContainer } from "react-toastify";

class ForgotPassForm extends React.Component {
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
        <Form.Control.Feedback type="invalid" className="text-pink-700 block">
          {this.renderError(formProps.meta)}
        </Form.Control.Feedback>
      </div>
    );
  };

  render() {
    return (
      <div className="w-2/5 mx-auto">
        <Form
          className="shadow-lg p-8 mt-28"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="password"
            icon="bi bi-eye eye"
            label="Password"
            placeholder="password"
            type={this.state.passwordShown ? "text" : "password"}
            component={this.renderInput}
            onClick={this.togglePassword}
          />
          <Field
            name="password2"
            icon="bi bi-eye eye"
            label="Confirm password"
            placeholder="confirm password"
            type={this.state.passwordShown ? "text" : "password"}
            component={this.renderInput}
            onClick={this.togglePassword}
          />

          <div className="text-center">
            <button
              className="bg-pink-700 mt-10 h-10 hover:bg-pink-500 text-white rounded-sm w-40"
              type="submit"
            >
              Update
            </button>
          </div>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.password) {
    errors.password = "Please enter you password";
  }
  if (!formValues.password2) {
    errors.password2 = "Please confirm your password";
  }

  if (formValues.password !== formValues.password2) {
    errors.password2 = "Passwords Dont match";
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

ForgotPassForm = connect(mapStateToProps, { login, signIn })(ForgotPassForm);

export default reduxForm({
  form: "ForgotPassForm",
  validate,
})(ForgotPassForm);
