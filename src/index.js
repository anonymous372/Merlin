import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import "./index.css";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import store from "./store/index";
import { Provider } from "react-redux";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Old School
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
