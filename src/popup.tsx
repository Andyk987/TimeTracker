import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import GlobalStyles from "./styles/global-styles";

var mountNode = document.getElementById("popup");
ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  mountNode
);
