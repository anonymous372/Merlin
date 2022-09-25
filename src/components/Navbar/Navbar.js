import { NavDropdown, Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

function Navbar1() {
  const userData = localStorage.getItem("userData");
  return (
    <Navbar
      variant="dark"
      style={{ backgroundColor: "#293462", color: "white" }}
      expand="lg"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navLink">
            Merlin
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link> */}
            <Link to="/explore" className="navLink p-2">
              Explore
            </Link>
            {/* </Nav.Link> */}
            {/* <Nav.Link> */}
            <Link to="/myList" className="navLink p-2">
              My List
            </Link>
            {/* </Nav.Link> */}
          </Nav>
          <Nav>
            <NavDropdown
              title={
                userData != null
                  ? userData.charAt(0).toUpperCase() + userData.slice(1, 6)
                  : "Login/Sign Up"
              }
              style={{ paddingLeft: "8px" }}
              align="end"
              id="basic-nav-dropdown"
            >
              {userData != null ? (
                <NavDropdown.Item
                  href="/"
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              ) : (
                <div>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/register">Sign Up</NavDropdown.Item>
                </div>
              )}
              {/* <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Sign Up</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                Logout
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;
