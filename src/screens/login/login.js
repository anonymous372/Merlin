import { useRef, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./styles.css";
import { BASE_API_URL } from "../../constant";
import { Link } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameLabelRef = useRef(null);
  const passwordLabelRef = useRef(null);

  const msgText = failure ? "Login Failed" : "Logging you in...";
  const msgClass = failure ? "message failed" : "message";

  const handleLogin = async (event) => {
    event.preventDefault();
    event.preventDefault();
    const url = BASE_API_URL + "api/login";
    const loginDetails = {
      username,
      password,
    };
    // Login User
    try {
      setLoading(true);
      const resp = await axios.post(url, loginDetails);
      setLoading(false);

      localStorage.setItem("token", resp.data.data.token);
      localStorage.setItem("userData", resp.data.data.username);
      window.open("/", "_self");
    } catch (error) {
      setFailure(true);
      setTimeout(() => {
        setLoading(false);
        setFailure(false);
      }, 1500);
      console.log("Error in Login", error);
    }
  };

  const changeLabelColor = (ref) => {
    ref.current.classList.toggle("text-gray-500");
    ref.current.classList.toggle("text-blue-800");
  };

  // DEPRECATED
  const onLoginSubmit = async (event) => {
    event.preventDefault();
    const url = BASE_API_URL + "api/login";
    const loginDetails = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    // Login User
    try {
      setLoading(true);
      const resp = await axios.post(url, loginDetails);
      setLoading(false);

      localStorage.setItem("token", resp.data.data.token);
      localStorage.setItem("userData", resp.data.data.username);
      window.open("/", "_self");
    } catch (error) {
      setFailure(true);
      setTimeout(() => {
        setLoading(false);
        setFailure(false);
      }, 1500);
      console.log("Error in Login", error);
    }
  };

  return (
    <Container>
      {loading && <h4 className={msgClass}>{msgText}</h4>}
      <h2
        className="text-center pt-3 mb-10 text-3xl"
        style={{ color: "#3A5BA0", fontWeight: 700 }}
      >
        Login
      </h2>
      {/* Login Form */}
      <div className="mx-auto max-w-sm ">
        {/* Username */}
        <div className="relative w-full mb-6">
          <input
            type="text"
            onFocus={() => changeLabelColor(usernameLabelRef)}
            onBlur={() => changeLabelColor(usernameLabelRef)}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="tracking-wide border-2 border-gray-500 outline-blue-800 rounded-md w-full px-2 py-1 font-semibold"
          ></input>
          <div
            ref={usernameLabelRef}
            className="text-gray-500 absolute text-sm px-1 font-semibold top-0 left-3 bg-white -translate-y-1/2"
          >
            Username
          </div>
        </div>
        {/* Password */}
        <div className="relative w-full mb-6">
          <input
            type="password"
            value={password}
            onFocus={() => changeLabelColor(passwordLabelRef)}
            onBlur={() => changeLabelColor(passwordLabelRef)}
            onChange={(e) => setPassword(e.target.value)}
            className="tracking-wide border-2 border-gray-500 outline-blue-800 rounded-md w-full px-2 py-1"
          ></input>
          <div
            ref={passwordLabelRef}
            className="text-gray-500 absolute text-sm px-1 font-semibold top-0 left-3 bg-white -translate-y-1/2"
          >
            Password
          </div>
        </div>
        <div className="w-full mb-6">
          <button
            type="submit"
            onClick={handleLogin}
            className="tracking-wide active:scale-95 transition hover:bg-blue-700 bg-blue-800 text-white font-semibold rounded-md w-full px-2 py-1 text-lg"
          >
            Login
          </button>
        </div>
        <div className="text-center font-semibold mb-2 text-sm">OR</div>
        <div className="text-center">
          <Link
            to="/register"
            className="text-blue-800 font-semibold hover:border-b-2 transition border-blue-800"
          >
            New User ?{" "}
          </Link>
        </div>
      </div>
      {/* <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={6} xl={4}>
          <Form onSubmit={onLoginSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row> */}
    </Container>
  );
}

export default Login;
