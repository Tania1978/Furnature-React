import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import { Router} from "react-router-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import history from "./history";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
