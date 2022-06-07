import "./styles.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div id="navbar">
      <Container>
        <Row>
          <Col xs={3} sm={3} md={6} lg={6} xl={8}>
            <Link to="/" style={{ borderBottom: "2px solid white" }}>
              Merlin
            </Link>
            {/* <a href="/" className="left">
              Merlin
            </a> */}
          </Col>

          <Col xs={5} sm={5} md={3} lg={3} xl={2}>
            <Row>
              <Col>
                <Link to="/explore">Explore</Link>

                {/* <a href="/explore">Explore</a> */}
              </Col>
              <Col>
                <Link to="/myList">My List</Link>
                {/* <a href="/myList">My List</a> */}
              </Col>
            </Row>
          </Col>
          <Col xs={4} sm={4} md={3} lg={3} xl={2}>
            <Dropdown className="auth">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Login/Sign Up
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* <Container>
                  <Link to="/login">Login</Link>
                </Container>
                <Container>
                  <Link to="/register">Register</Link>
                </Container>
                <Container>
                  <Link
                    to="/"
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    Logout
                  </Link>
                </Container> */}

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
