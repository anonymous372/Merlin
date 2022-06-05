import "./styles.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";

function Navbar() {
  return (
    <div id="navbar">
      <Container>
        <Row>
          <Col xs={3} sm={3} md={6} lg={6} xl={8}>
            <a href="/" className="left">
              Merlin
            </a>
          </Col>

          <Col xs={5} sm={5} md={3} lg={3} xl={2}>
            <Row>
              <Col>
                <a href="/explore">Explore</a>
              </Col>
              <Col>
                <a href="/myList">My List</a>
              </Col>
            </Row>
          </Col>
          <Col xs={4} sm={4} md={3} lg={3} xl={2}>
            <Dropdown className="auth">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Login/Sign Up
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
                <Dropdown.Item href="/register">Sign Up</Dropdown.Item>
                <Dropdown.Item
                  href="/"
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
      {/* </nav> */}
    </div>
  );
}

export default Navbar;
