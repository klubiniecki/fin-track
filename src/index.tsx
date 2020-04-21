import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { CssBaseline } from "@material-ui/core";
import Router from "./components/Router/Router";

ReactDOM.render(
  <CssBaseline>
    <Router />
  </CssBaseline>,
  document.getElementById("root")
);

serviceWorker.register();
