import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginForm from "./LoginForm";
import UserInfo from "./UserInfo";
import ForgotPassForm from "./ForgotPassForm";
import RegistrationForm from "./RegistrationForm";
import ShopBy from "./ShopBy";
import ProductListDisplay from "./ProductListDisplay";
import OrderReview from "./OrderReview";
import PayPalSuccess from "./PayPalSuccess";
import AddressBook from "./AddressBook";
import Orders from "./Orders";


export default function Body() {
  return (
    <Switch>
      <Route exact path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/paypalsuccess"} component={PayPalSuccess} />
      <Route exact path={"/shop/allProducts"} component={ProductListDisplay} />
      <Route exact path={"/users/:id/orderReview"} component={OrderReview} />
      <Route exact path={"/users/:id/orders"} component={Orders} />
      <Route exact path={"/users/:id/addresses"} component={AddressBook} />
      <Route
        path="/shop/:filter"
        component={(props) => (
          <ShopBy {...props} key={window.location.pathname} />
        )}
      />

      <Route exact path={"/loginform"} component={LoginForm} />
      <Route exact path={"/users/:id"} component={UserInfo} />
      <Route exact path={"/forgotPass"} component={ForgotPassForm} />
      <Route exact path={"/registrationform"} component={RegistrationForm} />
    </Switch>
  );
}
