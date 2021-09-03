import "bootstrap/dist/css/bootstrap.min.css";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem("state");
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();

//configureStore automatically sets up the Redux DevTools Extension for you,
//automatically turns on the thunk middleware, and also makes it very easy
//to add additional store enhancers if desired.
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
  reducer: reducers,
  preloadedState: persistedStore,
});

//Adds a change listener. It will be called any time an action is dispatched,
//and some part of the state tree may potentially have changed.
store.subscribe(() => {
  saveToLocalStorage({
    user: store.getState().user,
    cart: store.getState().cart,
    products: store.getState().products,
    message: store.getState().message,
  });
});

export default store;
