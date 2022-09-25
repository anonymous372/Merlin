import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./styles.css";

function Login() {
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const msgText = failure ? "Login Failed" : "Logging you in...";
  const msgClass = failure ? "message failed" : "message";

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    const baseUrl = "https://merlin-backend.herokuapp.com/";
    const url = baseUrl + "api/login";
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
      <h1 className="text-center">Login</h1>
      <Row className="justify-content-center">
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
      </Row>
    </Container>
  );
}

export default Login;
