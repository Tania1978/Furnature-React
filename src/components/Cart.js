import React from "react";
import Modal from "./Modal";
import { connect } from "react-redux";
import {
  getCart,
  addProductToCart,
  removeProductFromCart,
} from "../actions/cartActions";
import history from "../history";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = { isOpen: true };
  }

  onBodyClick = (event) => {
    if (this.myRef.current.contains(event.target)) {
      return;
    }
    this.setState({ isOpen: false });
  };

  componentDidMount() {
    this.props.getCart();
    document.getElementById("root").addEventListener("click", this.onBodyClick);
  }

  componentWillUnmount() {
    document
      .getElementById("root")
      .removeEventListener("click", this.onBodyClick);
  }
  onClose = () => {
    this.props.onClose();
  };
  checkOutCart = () => {
    history.push(`/users/${this.props.user.id}/orderReview`);
  };

  addProductToCart = (id, price) => {
    this.props.addProductToCart(id, price);
  };
  removeProductFromCart = (id, price) => {
    this.props.removeProductFromCart(id, price);
  };

  renderActions = () => {
    return (
      <div className="text-center">
        <button
          onClick={this.onClose}
          className="border-1 rounded-sm py-2 bg-teal-700 w-20 text-white m-2"
        >
          Close
        </button>
        <button
          onClick={this.checkOutCart}
          className="border-1 rounded-sm py-2 bg-pink-700 w-20 text-white"
        >
          Check out
        </button>
        <button
          onClick={this.deleteCart}
          className="border-1 rounded-sm py-2 bg-gray-700 w-20 text-white m-2"
        >
          Delete
        </button>
      </div>
    );
  };

  renderEmptyCartActions = () => {
    return (
      <div className="text-center">
        <button
          onClick={this.onClose}
          className="border-1 rounded-sm py-2 bg-teal-700 w-20 text-white m-2"
        >
          Close
        </button>
      </div>
    );
  };

  renderEmptyCart = () => {
    return <div> Your cart is Empty!</div>;
  };

  renderContent = () => {
    const renderedList = this.props.cart.map((item) => {
      return (
        <>
          {item[6] > 0 ? (
            <div className="flex flex-row border-b-2 border-gray-500">
              <div className="ml-1 flex flex-col">
                <div className="w-24 h-24 mt-3">
                  <img className="w-20 h-24" src={item[2]} />
                </div>
                <div className="ml-3">
                  <button
                    onClick={() => this.addProductToCart(item[9], item[5])}
                    className="border-2 hover:bg-gray-700 hover:text-white border-gray-700 bg-gray-200 rounded-sm px-1.5 m-2 text-lg font-bold"
                  >
                    +
                  </button>
                  <button
                    onClick={() => this.removeProductFromCart(item[9], item[5])}
                    className="border-2 border-gray-700 hover:bg-gray-700 hover:text-white bg-gray-200 rounded-sm px-2 text-lg font-bold"
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="mt-3 ml-4 flex flex-col">
                <div className="font-bold">{item[3]}</div>
                <div>{item[4]}</div>

                <div
                  className="font-bold ml\ mr5
          '"
                >
                  Price {item[5]}€{" "}
                </div>
                <div className="font-bold">{`Quantity: ${item[6]}`}</div>
              </div>
            </div>
          ) : null}
        </>
      );
    });

    return (
      <div className="felx flex-col">
        <div className="border-1 bg-white flex flex-col ">{renderedList}</div>
        <div className="text-right mr-2 font-bold">
          {`Total: ${this.props.cart[0][8]} Euros`}{" "}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div ref={this.myRef}>
        {this.state.isOpen ? (
          <Modal
            title="Your Shopping Bag"
            content={
              this.props.cart.length > 0
                ? this.renderContent
                : this.renderEmptyCart
            }
            actions={
              this.props.cart.length > 0
                ? this.renderActions
                : this.renderEmptyCartActions
            }
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    product: state.products,
  };
};

export default connect(mapStateToProps, {
  getCart,
  addProductToCart,
  removeProductFromCart,
})(Cart);
