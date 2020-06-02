import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import ScrollToTop from "./components/scroll_to_top_handler.js";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

sessionStorage.setItem("local-ip", "192.168.1.9"); //Put in your local IP address here

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
