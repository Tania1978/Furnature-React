import React from "react";
import { connect } from "react-redux";
import { Form, Col } from "react-bootstrap";
import { updateUser } from "../actions/usersActions";
import { Field, reduxForm } from "redux-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "../history";

class UserInfo extends React.Component {

  onSubmit = (formValues) => {
    if (
      JSON.stringify(this.props.initialValues) === JSON.stringify(formValues)
    ) {
      toast.info("No Fields Updated");
    } else {
      this.props.updateUser(formValues);
      setTimeout(() => {
        this.props.message.success !== ""
          ? toast.success(this.props.message.success)
          : toast.error(this.props.message.error);
      }, 1000);

      setTimeout(() => {
        history.push("/");
      }, 5000);
    }
  };

  renderInput = (formProps) => {
    return (
      <Form.Group as={Col} controlId="formGridFirst">
        <Form.Label>{formProps.label}</Form.Label>
        <Form.Control
          {...formProps.input}
          name={formProps.name}
          type={formProps.type}
          defaultValue={formProps.defaultValue}
          placeholder={formProps.placeholder}
        />
      </Form.Group>
    );
  };

  renderDropDown = (formProps) => {
    return (
      <Form.Group as={Col} controlId="formGridTitle">
        <Form.Label>{formProps.label}</Form.Label>
        <Form.Control {...formProps.input} name={formProps.name} as="select">
          <option value="" selected>
            {this.props.user.title}
          </option>
          <option value="Mr.">Mr.</option>
          <option value="Mrs.">Mrs.</option>
          <option value="Ms.">Ms.</option>
          <option value="Dr.">Dr.</option>
          <option value="Prof.">Prof.</option>
        </Form.Control>
      </Form.Group>
    );
  };
  render() {
    return (
      <div className="regForm shadow-lg">
        <Form
          className="UserInfo"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Form.Row>
            <Field
              name="title"
              type="text"
              defaultValue={this.props.user.title}
              component={this.renderDropDown}
            />
            <Field
              name="firstName"
              type="text"
              defaultValue={this.props.user.firstName}
              placeholder={this.props.user.firstName}
              component={this.renderInput}
            />

            <Field
              name="lastName"
              type="text"
              // defaultValue={this.props.user.lastName}
              placeholder={this.props.user.lastName}
              component={this.renderInput}
            />
          </Form.Row>
          <Form.Row>
            <Field
              name="username"
              type="text"
              //defaultValue={this.props.user.username}
              placeholder={this.props.user.username}
              component={this.renderInput}
            />

            <Field
              name="email"
              type="email"
              //   defaultValue={this.props.user.email}
              placeholder={this.props.user.email}
              component={this.renderInput}
            />

            <Field
              name="phoneNumber"
              type="text"
              //defaultValue={this.props.user.phoneNumber}
              placeholder={this.props.user.phoneNumber}
              component={this.renderInput}
            />
          </Form.Row>

          <div className="centre">
            <button onClick={this.updateUser} className="formbtn" type="btn">
              Update My Info
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
    user: state.user,
    message: state.message,
    initialValues: {
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      username: state.user.username,
      email: state.user.email,
      phoneNumber: state.user.phoneNumber,
      title: state.user.title,
    },
  };
};

const validate = (formValues, props) => {
  console.log(props.initialValues);
  console.log(formValues);
  let errors = [];

  return errors;
};

export default connect(mapStateToProps, { updateUser })(
  reduxForm({
    form: "UserInfo",
    validate,
    enableReinitialize: true,
  })(UserInfo)
);
