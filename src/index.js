import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App";
import "./index.css";

const app = (
  <Router>
    <ToastContainer />
    <App />
  </Router>
);

ReactDOM.render(app, document.getElementById("root"));
