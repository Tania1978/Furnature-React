import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";
import "./RegistrationForm.css";
import { register } from "../actions";
import { toast, ToastContainer } from "react-toastify";
import history from "../history";

const options = ["Ms", "Mrs", "Mr", "Dr", "Prof"];

class RegistrationForm extends React.Component {
  state = { isPasswordVisible: false };

  onSubmit = (formValues) => {
    this.props.register(formValues);
    if (this.props.message.success) {
      toast.success("Registration Successfull");
      setTimeout(() => {
        history.push("./loginform");
      }, 3000);
    }
  };

  togglePassword = () => {
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  };
  renderError = (meta) => {
    if (meta.touched && meta.error) {
      return <div>{meta.error}</div>;
    }
    return null;
  };
  renderInput = (formProps) => {
    console.log(formProps);
    return (
      <>
        <Col className="pr-20">
          <Form.Label htmlFor="inlineFormInputGroup">
            {formProps.label}
          </Form.Label>
          <InputGroup className="mb-2">
            {formProps.icon ? (
              <InputGroup.Text className="cursor-pointer">
                {" "}
                <i onClick={formProps.onClick} className={formProps.icon}></i>
              </InputGroup.Text>
            ) : null}
            <Form.Control
              {...formProps.input}
              id={formProps.id}
              placeholder={formProps.placeholder}
              type={formProps.type}
            />
            <Form.Control.Feedback
              type="invalid"
              className="text-pink-700 block"
            >
              {this.renderError(formProps.meta)}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
      </>
    );
  };

  renderSelect = (formProps) => {
    return (
      <Col>
        <Form.Group as={Col} controlId="formGridTitle">
          <Form.Label>{formProps.label}</Form.Label>
          <Form.Control
            as="select"
            {...formProps.input}
            onChange={(value) => formProps.input.onChange(value)}
            onBlur={() => formProps.input.onBlur(formProps.input.value)}
          >
            {" "}
            <option value="">Select Title</option>
            {options.map((val) => (
              <option value={val} key={val}>
                {val}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
    );
  };
  render() {
    return (
      <div className="regForm shadow-lg">
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Form.Row>
            <Field
              name="title"
              label="Title"
              component={this.renderSelect}
              id="title"
            />
            <Field
              name="firstName"
              type="text"
              placeholder="First Name"
              label="First Name"
              component={this.renderInput}
              id="firstName"
            />

            <Field
              name="lastName"
              type="text"
              placeholder="Last Name"
              label="Last Name"
              component={this.renderInput}
              id="lastName"
            />
          </Form.Row>
          <Form.Row>
            <Field
              name="username"
              type="text"
              placeholder="username"
              label="Username"
              component={this.renderInput}
              id="username"
            />
            <Field
              name="email"
              type="email"
              placeholder="email"
              label="Email Address"
              component={this.renderInput}
              id="email"
            />

            <Field
              name="phoneNumber"
              type="text"
              placeholder="include country code"
              label="Phone Number"
              component={this.renderInput}
              id="phoneNumber"
            />
          </Form.Row>
          <Form.Row>
            <Field
              name="password"
              type={this.state.isPasswordVisible ? "text" : "password"}
              placeholder="password"
              label="Password"
              component={this.renderInput}
              id="password"
              icon="bi bi-eye eye"
              onClick={this.togglePassword}
            />

            <Field
              name="password2"
              type={this.state.isPasswordVisible ? "text" : "password"}
              placeholder="Confirm"
              label="Confirm Password"
              component={this.renderInput}
              id="password2"
              icon="bi bi-eye eye"
              onClick={this.togglePassword}
            />
          </Form.Row>
          <div className="centre">
            <button className="formbtn" type="btn">
              Create My Account!
            </button>
          </div>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  };
};

const validate = (formValues) => {
  let errors = {};
  var phoneno = /^\+?([0-9]{2})\)?[-]?([0-9]{4})[-]?([0-9]{6})$/;
  if (!formValues.firstName || formValues.firstName.length < 2) {
    errors.firstName = "Required and must be minimum 2 characters";
  }
  if (!formValues.lastName || formValues.lastName.length < 2) {
    errors.lastName = "Required and must be minimum 2 characters";
  }
  if (!formValues.phoneNumber) {
    errors.phoneNumber = "Required";
  } else if (!formValues.phoneNumber.match(phoneno)) {
    errors.phoneNumber =
      "Include country code - Phone number should be have the format +XX-XXXX-XXXXXX";
  }

  if (!formValues.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (!formValues.password) {
    errors.password = "Required";
  }
  if (formValues.password !== formValues.password2) {
    errors.password2 = "Passwords dont match";
  }
  return errors;
};

RegistrationForm = connect(mapStateToProps, { register })(RegistrationForm);

export default reduxForm({
  form: "RegistrationForm",
  validate,
})(RegistrationForm);
