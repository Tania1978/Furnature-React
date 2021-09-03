import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Fragment } from "react";
import { signIn, signOut, logOut } from "../actions";
import { getCart } from "../actions/cartActions";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import Cart from "./Cart";
import history from "../history";

class Header extends React.Component {
  state = { isOpen: false, quantity: 0 };

  componentDidMount() {
    if (this.props.user.jwtToken) {
      this.props.getCart();
    }
  }

  handleLogOut = () => {
    localStorage.clear();
    this.props.signOut();
    this.props.logOut();
    history.push("/");
  };

  toggleCart = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  onClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <>
        <Navbar
          collapseOnSelect
          className="navcustom"
          expand="lg"
          variant="light"
        >
          <Navbar.Brand href="#">
            <img src="/images/brandname.png" alt="" id="brand" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav justify fill className="navcustom">
              <NavLink
                exact
                to="/"
                activeStyle={{ color: "rgb(240, 21, 94)" }}
                className="nav-link"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                activeStyle={{ color: "rgb(240, 21, 94)" }}
                className="nav-link"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                activeStyle={{ color: "rgb(240, 21, 94)" }}
                className="nav-link"
              >
                Contact Us
              </NavLink>

              <NavDropdown title="Shop" id="collasible-nav-dropdown">
                <NavDropdown.Item as={NavLink} exact to="/shop/category">
                  By Category
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} exact to="/shop/style">
                  By Style
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} exact to="/shop/materials">
                  By Material
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} exact to="/shop/allProducts">
                  All Products
                </NavDropdown.Item>
              </NavDropdown>

              {Object.keys(this.props.user).length != 0 ? (
                <Fragment>
                  <NavDropdown
                    title={this.props.user.firstName}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      as={NavLink}
                      exact
                      to={`/users/${this.props.user.id}`}
                    >
                      Personal Info
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      exact
                      to={`/users/${this.props.user.id}/addresses`}
                    >
                      Address Book
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      exact
                      to={`/users/${this.props.user.id}/orders`}
                    >
                      History
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.handleLogOut} href="">
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link
                    to=""
                    activeStyle={{ color: "rgb(240, 21, 94)" }}
                    className="nav-link"
                  >
                    {" "}
                    <i
                      className="bi bi-handbag"
                      onClick={this.toggleCart}
                    ></i>{" "}
                    <span id="cart-quantity">{this.props.cartQuantity}</span>
                  </Nav.Link>

                  {/* <NavLink
                    to=""
                    activeStyle={{ color: "rgb(240, 21, 94)" }}
                    className="nav-link"
                  >
                    Administration
                  </NavLink> */}

                  {/* <NavLink
                    to="/cart"
                    activeStyle={{ color: "rgb(240, 21, 94)" }}
                    className="nav-link"
                  >
                    Customer View
                  </NavLink> */}
                </Fragment>
              ) : (
                <NavLink
                  to="/loginform"
                  activeStyle={{ color: "rgb(240, 21, 94)" }}
                  className="nav-link"
                >
                  Sign In / Sign Up
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.state.isOpen ? <Cart onClose={this.onClose} /> : null}
      </>
    );
  }
}
const getTotalCartQuantity = (cart) => {
  let cartQuantity = 0;
  cart.map((item) => {
    cartQuantity += item[6];
  });

  return cartQuantity;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isSignedIn: state.auth.isSignedIn,
    cart: state.cart,
    cartQuantity: getTotalCartQuantity(state.cart),
  };
};

export default withRouter(
  connect(mapStateToProps, { signIn, signOut, logOut, getCart })(Header)
);
