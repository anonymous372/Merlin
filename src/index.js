import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import Explore from "./screens/explore/explore";
import MyList from "./screens/myList/myList";
import Login from "./screens/login/login";
import Navbar from "./components/Navbar/Navbar";
import Main from "./screens/main/main";
import Register from "./screens/register/register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="explore" element={<Explore />} />
      <Route path="myList" element={<MyList />} />
    </Routes>
  </BrowserRouter>
);
