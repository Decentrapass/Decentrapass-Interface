import React from "react";
import ReactDOM from "react-dom";

// STYLES
import "./styles/index.scss";
import "./styles/reset.scss";

// REDUX
import { Provider } from "react-redux";
import store from "./state/store";

// COMPONENTS
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
