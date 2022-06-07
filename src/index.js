import React from "react";
import ReactDOM from "react-dom";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import "./index.css";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// import Explore from "./screens/explore/explore";
// import MyList from "./screens/myList/myList";
// import Login from "./screens/login/login";
// import Navbar from "./components/Navbar/Navbar";
// import Main from "./screens/main/main";
// import Register from "./screens/register/register";

import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

// Old School
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

//   <BrowserRouter>
//     <Navbar />
//     <Routes>
//       <Route exact path="/" element={<Main />} />
//       <Route path="register" element={<Register />} />
//       <Route path="login" element={<Login />} />
//       <Route path="explore" element={<Explore />} />
//       <Route path="myList" element={<MyList />} />
//     </Routes>
//   </BrowserRouter>
// <HashRouter>
//   <Navbar />
//   <Route exact path="/" component={Main} />
//   <Route exact path="register" component={Register} />
//   <Route exact path="login" component={Login} />
//   <Route exact path="explore" component={Explore} />
//   <Route exact path="myList" component={MyList} />
// </HashRouter>
// );
