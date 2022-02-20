import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import GlobalStyles from "./styles/global-styles";
import { store } from './app/store';

var mountNode = document.getElementById("popup");
ReactDOM.render(
  <>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </>,
  mountNode
);
