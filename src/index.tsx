import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { CssBaseline } from "@material-ui/core";
import App from "./components/App/App";

ReactDOM.render(
  <CssBaseline>
    <App />
  </CssBaseline>,
  document.getElementById("root")
);

serviceWorker.register();
