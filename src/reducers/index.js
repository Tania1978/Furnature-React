import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import LoginReducer from "./LoginReducer";
import { reducer as formReducer } from "redux-form";
import { ProductsReducer } from "./ProductsReducer";
import { CartReducer } from "./CartReducer";
import SuccessErrorReducer from "./SuccessErrorReducer";
import AddressReducer from "./AddressReducer";
import OrdersReducer from "./OrdersReducer";

export default combineReducers({
  auth: AuthReducer,
  user: LoginReducer,
  form: formReducer,
  products: ProductsReducer,
  cart: CartReducer,
  message: SuccessErrorReducer,
  addresses: AddressReducer,
  userOrders: OrdersReducer,
});
