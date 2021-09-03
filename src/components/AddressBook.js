import React from "react";
import { getAddresses } from "../actions/addressActions";
import { Form, Col } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { addAddress, deleteAddress } from "../actions/addressActions";
import AddressForm from "./AddressForm";

class AddressBook extends React.Component {
  state = { showForm: false, showMessage: false };
  componentDidMount() {
    this.props.getAddresses();
  }

  // onSubmit = (formValues) => {
  //   this.props.addAddress(formValues);
  //   setTimeout(() => {
  //     if (this.props.message.success !== "") {
  //     }
  //   });
  // };

  // renderInput = (formProps) => {
  //   return (
  //     <Form.Group as={Col} controlId="formGridFirst">
  //       <Form.Label>{formProps.label}</Form.Label>
  //       <Form.Control
  //         {...formProps.input}
  //         name={formProps.name}
  //         type={formProps.type}
  //         defaultValue={formProps.defaultValue}
  //         placeholder={formProps.placeholder}
  //       />
  //     </Form.Group>
  //   );
  // };

  // renderCheckBox = (formProps) => {
  //   return (
  //     <Form.Group className="mb-3" controlId="formBasicCheckbox">
  //       <Form.Check
  //         type="checkbox"
  //         label={formProps.label}
  //         name={formProps.name}
  //       />
  //     </Form.Group>
  //   );
  // };

  showForm = () => {
    this.setState({ showForm: true });
  };

  // getAddressId = (formValues) => {
  //   console.log(this.props.addresses);
  //   console.log(this.props.formValues);
  //   let address = this.props.addresses.find(
  //     ({ streetName }) => streetName === formValues.streetName
  //     // houseNumber === formValues.houseNumber &&
  //     // postalCode === formValues.postalCode &&
  //     // city === formValues.city
  //   );
  //   console.log(address);
  //   return address;
  // };

  addAddress = (formValues, shipping, billing) => {
    this.props.addAddress(formValues, shipping, billing);
    this.setState({ showForm: false });
  };

  deleteAddress = (id) => {
    this.props.deleteAddress(id);
  };

  displayNewForm = () => {
    return (
      <AddressForm
        form="address-new"
        streetName="Street name"
        houseNumber="Number"
        city="city"
        postalCode="Postal Code"
        country="Country"
        buttonText="Add"
        onSubmit={this.addAddress}
      />
    );
  };

  render() {
    const newForm = this.displayNewForm();
    let renderedAddresses = [];
    if (this.props.addresses.length > 0) {
      renderedAddresses = this.props.addresses.map((item, index) => {
        return (
          <div className="shadow-lg w-1/5 p-5 m-5 text-xs" key={index}>
            <AddressForm
              form={`address-${item.id}`}
              streetName={item.streetName}
              houseNumber={item.houseNumber}
              postalCode={item.postalCode}
              city={item.city}
              country={item.country}
              buttonText="Delete"
              billing={item.billing}
              shipping={item.shipping}
              id={item.id}
              onSubmit={() =>this.deleteAddress(item.id)}
            />
          </div>
        );
      });
    }
    return (
      <div>
        <div className="text-center">
          <button
            className="bg-pink-700 text-white w-60 rounded-sm transform transition delay-200 hover:scale-125"
            onClick={this.showForm}
          >
            Add New Address
          </button>
          <div className="w-3/5 text-center text-pink-700 ml-80 p-10">
          {" "}
          {this.props.message.success}
        </div>
        </div>
        <div className="flex flex-row flex-wrap">
          {renderedAddresses}
          {this.state.showForm ? (
            <div className="shadow-lg w-1/5 p-5 m-5 text-xs">{newForm}</div>
          ) : null}
        </div>
     
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    addresses: state.addresses,
    message: state.message,
  };
};

export default connect(mapStateToProps, {
  getAddresses,
  addAddress,
  deleteAddress,
})(
  reduxForm({
    fields: ["text"],
  })(AddressBook)
);
