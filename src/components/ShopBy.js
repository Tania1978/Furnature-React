import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import ProductListDisplay from "./ProductListDisplay";

class ShopBy extends React.Component {
  state = { menuList: [] };
  componentDidMount() {
    const list = this.getMenuList(this.props.filter);
    this.setState({ menuList: list });
  }
  getMenuList = (filter) => {
    const categories = [
      "Chairs",
      "Tables",
      "Couches",
      "Beds",
      "Various",
      "Cabinets",
    ];
    const materials = ["wood", "steel", "leather", "glass", "pvc", "fabric"];
    const styles = ["Contemporary", "Rustic", "Vintage", "Bohemian"];
    switch (filter) {
      case "category":
        return categories;
      case "materials":
        return materials;
      case "style":
        return styles;
    }
  };

  render() {
    const renderedList = this.state.menuList.map((item, index) => {
      return (
        <NavLink
          className="hover:no-underline hover:text-pink-700"
          to={`/shop/${this.props.filter}/${item}`}
          activeStyle={{ fontWeight: "bold" }}
        >
          {item.toUpperCase()}
        </NavLink>
      );
    });
    return (
      <div className="flex flex-row">
        <div className="flex flex-col ml-12 mt-12 text-3xl text-teal-800 font-mono">
          {renderedList}
        </div>
        <div className="ml-14 mt-14">
          <ProductListDisplay />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    filter: ownProps.match.params.filter,
  };
};
export default connect(mapStateToProps)(ShopBy);
