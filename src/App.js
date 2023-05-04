import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Main from "./screens/main/main";
import Explore from "./screens/explore/explore";
import MyList from "./screens/myList/myList";
import Login from "./screens/login/login";
import Register from "./screens/register/register";
import Profile from "./screens/profile/profile";
import Protected from "./utils/protected";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route
            path="profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="explore" element={<Explore />} />
          <Route path="myList" element={<MyList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
