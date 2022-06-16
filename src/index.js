import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import "./index.css";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// Old School
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
