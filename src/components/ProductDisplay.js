import React from "react";
import { connect } from "react-redux";
import { addProductToCart, getCart } from "../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "../history";

class ProductDisplay extends React.Component {
  addProductToCart = (id, price) => {
    if (!this.props.user.jwtToken) {
      toast.error("You need to sign in in order to Shop!");
      setTimeout(() => {
        history.push("/loginform");
      }, 3000);
    } else {
      this.props.addProductToCart(id, price);
    }
  };
  renderProduct = (item) => {
    return (
      <div className="grid grid-flow-col grid-cols-2 grid-rows-1 border border-gray-400 rounded-sm h-52 bg-gray-100">
        <div className="mt-2">
          <img
            className="mt-2 ml-2 h-4/5 w-auto transform transition duration-700 hover:scale-125"
            src={item.productImagePaths[0]}
          />
        </div>
        <div className="flex flex-col justify-center items-center text-center relative">
          <div className="absolute top-5">
            <div className="font-bold text-xl font-mono">{item.name}</div>
            <div className="text-md">{item.sku}</div>
            <div className="font-bold text-md">{item.description}</div>
            <div>{`${parseFloat(item.price)}€`}</div>
          </div>
          <div className="absolute bottom-5 z-10">
            {item.stock > 0 ? (
              <button
                onClick={() => this.addProductToCart(item.id, item.price)}
                className="border-1 rounded-sm bg-teal-700 text-white p-2 hover:bg-pink-700"
              >
                Buy It!
              </button>
            ) : (
              <div className="text-pink-700 font-bold">Sold Out!</div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  };
  render() {
    const renderedProd = this.renderProduct(this.props.item);
    return <div>{renderedProd}</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    cart: state.cart,
    item: ownProps.item,
  };
};

export default connect(mapStateToProps, { addProductToCart, getCart })(
  ProductDisplay
);
