import React from "react";
import { Form, Col } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Field, reduxForm } from "redux-form";

class AddressForm extends React.Component {
  state = { isBilling: false, isShipping: false };
  setInitialValues = (formProps) => {
    return {
      streetName: formProps.palceho,
    };
  };
  renderInput = (formProps) => {
    console.log(formProps);
    return (
      <Form.Group as={Col} controlId="formGridFirst">
        <Form.Label>{formProps.label}</Form.Label>
        <Form.Control
          {...formProps.input}
          name={formProps.name}
          type={formProps.type}
          placeholder={formProps.placeholder}
          className="text-xs"
        />
      </Form.Group>
    );
  };

  renderCheckBox = (formProps) => {
    console.log(formProps);
    return (
      <Form.Group className="mb-3" controlId={formProps.id}>
        <Form.Check
          type="checkbox"
          label={formProps.label}
          name={formProps.name}
          defaultChecked={formProps.checked}
          onChange={this.handleChange}
        />
      </Form.Group>
    );
  };

  onSubmit = (formValues) => {
    if (this.props.buttonText === "Add") {
      const billing = this.state.isBilling ? "billing" : "";
      const shipping = this.state.isShipping ? "shipping" : "";
      this.props.onSubmit(formValues, shipping, billing);
    }
    if (this.props.buttonText === "Delete") {
      this.props.onSubmit(this.props.id);
    }
  };

  handleChange = (event) => {
    if (event.target.id === "shipping") {
      this.setState({ isShipping: !this.state.isShipping });
    }
    if (event.target.id === "billing") {
      this.setState({ isBilling: !this.state.isBilling });
    }
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Form.Row>
          <Field
            name="streetName"
            label="Street Name"
            placeholder={this.props.streetName}
            type="text"
            component={this.renderInput}
          />
          <Field
            name="houseNumber"
            label="Number"
            placeholder={this.props.houseNumber}
            type="text"
            type="text"
            component={this.renderInput}
          />
        </Form.Row>
        <Form.Row>
          <Field
            name="city"
            label="City"
            placeholder={this.props.city}
            type="text"
            type="text"
            component={this.renderInput}
          />
          <Field
            name="postalCode"
            label="Postal Code"
            placeholder={this.props.postalCode}
            type="text"
            type="text"
            component={this.renderInput}
          />
        </Form.Row>
        <Form.Row>
          <Field
            name="country"
            label="Country"
            placeholder={this.props.country}
            type="text"
            type="text"
            component={this.renderInput}
          />
        </Form.Row>
        <Field
          name="shipping"
          component={this.renderCheckBox}
          label="Shipping"
          checked={this.props.shipping === true ? "checked" : ""}
          id="shipping"
        />
        <Field
          name="billing"
          label="Billing"
          component={this.renderCheckBox}
          checked={this.props.billing === true ? "checked" : ""}
          id="billing"
        />
        <div className="text-center">
          <button
            type="submit"
            className="bg-gray-700 text-white rounded-sm w-20 m-2 hover:bg-teal-700"
          >
            {this.props.buttonText}
          </button>
        </div>
      </Form>
    );
  }
}

export default reduxForm({})(AddressForm);
