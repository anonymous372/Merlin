import { useState } from "react";
import "./styles.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { BASE_API_URL } from "../../constant";

function Register() {
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const msgText = failure ? "Sign Up Failed" : "Registering your account...";
  const msgClass = failure ? "message failed" : "message";

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    if (event.target.password.value != event.target.c_password.value) {
      window.open("/", "_self");
      return;
    }
    const url = BASE_API_URL + "api/register";
    const registerDetails = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    // Register User
    try {
      setLoading(true);
      const resp = await axios.post(url, registerDetails);
      setLoading(false);
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("userData", resp.data.username);
      window.open("/", "_self");
    } catch (error) {
      setFailure(true);
      setTimeout(() => {
        setLoading(false);
        setFailure(false);
      }, 1500);
      console.log("Error in Sign Up", error);
    }
  };
  return (
    <Container>
      {loading && <h4 className={msgClass}>{msgText}</h4>}
      <h1 className="text-center">Register</h1>
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={6} xl={4}>
          <Form onSubmit={onRegisterSubmit}>
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="c_password"
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

export default Register;
