import "./styles.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function Login() {
  const onLoginSubmit = async (event) => {
    event.preventDefault();
    const baseUrl = "https://merlin-backend.herokuapp.com/";
    const url = baseUrl + "api/login";
    const loginDetails = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    // Login User
    const resp = await axios.post(url, loginDetails);
    // console.log(resp);
    if (!resp.error) {
      localStorage.setItem("token", resp.data.data.token);
      localStorage.setItem("userData", resp.data.data.username);
      // Open /products route
      window.open("/", "_self");
    } else {
      console.log("Error in Signing in");
    }
  };

  return (
    <Container>
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
