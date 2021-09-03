import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../actions/productsActions";
import { getCart } from "../actions/cartActions";
import { withRouter } from "react-router";
import ProductDisplay from "./ProductDisplay";

class ProductListDisplay extends React.Component {
  state = { productList: [] };
  componentDidMount() {
    if (this.props.products.length === 0) {
      this.props.getProducts();
    }

    if (this.props.user.jwtToken) {
      this.props.getCart();
    }

    const words = window.location.pathname.split("/");
    if (words[3]) {
      this.setState({ productList: this.getProductList(words[2], words[3]) });
    } else if (words[2] === "allProducts") {
      this.setState({ productList: this.props.products });
    }
  }

  productHasMaterial = (product, type) => {
    for (let i = 0; i < product.materials.length; i++) {
      if (product.materials[i].name === type) {
        console.log(type);
        return true;
      }
    }
    return false;
  };

  getProductList = (filter, type) => {
    const list = [];
    this.props.products.forEach((product) => {
      if (
        product[`${filter}`] === type ||
        this.productHasMaterial(product, type)
      ) {
        list.push(product);
      }
    });
    return list;
  };

  render() {
    const renderedList = this.state.productList.map((product) => {
      return <ProductDisplay item={product} />;
    });
    return (
      <div>
        <div className="grid grid-cols-3 gap-3">{renderedList}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    cart: state.cart,
    user: state.user,
  };
};

export default withRouter(
  connect(mapStateToProps, { getProducts, getCart })(ProductListDisplay)
);
