import { NavDropdown, Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar1() {
  const userData = localStorage.getItem("userData");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    // <Navbar
    //   variant="dark"
    //   style={{ backgroundColor: "#293462", color: "white" }}
    //   expand="lg"
    // >
    //   <Container>
    //     <Navbar.Brand>
    //       <Link to="/" className="navLink">
    //         Merlin
    //       </Link>
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         {/* <Nav.Link> */}
    //         <Link to="/explore" className="navLink p-2">
    //           Explore
    //         </Link>
    //         <Link to="/myList" className="navLink p-2">
    //           My List
    //         </Link>
    //         <Link to="/users" className="navLink p-2">
    //           Users
    //         </Link>
    //       </Nav>
    //       <Nav>
    //         <NavDropdown
    //           title={
    //             userData != null
    //               ? userData.charAt(0).toUpperCase() + userData.slice(1, 10)
    //               : "Login/Sign Up"
    //           }
    //           style={{ paddingLeft: "8px" }}
    //           align="end"
    //           id="basic-nav-dropdown"
    //         >
    //           {userData != null ? (
    //             <>
    //               <NavDropdown.Item
    //                 href="/profile"
    //                 style={{
    //                   marginBottom: "5px",
    //                 }}
    //               >
    //                 Profile
    //               </NavDropdown.Item>
    //               <NavDropdown.Item
    //                 href="/"
    //                 onClick={() => {
    //                   localStorage.clear();
    //                 }}
    //               >
    //                 Logout
    //               </NavDropdown.Item>
    //             </>
    //           ) : (
    //             <div>
    //               <NavDropdown.Item href="/login">Login</NavDropdown.Item>
    //               <NavDropdown.Item href="/register">Sign Up</NavDropdown.Item>
    //             </div>
    //           )}
    //           {/* <NavDropdown.Item href="/login">Login</NavDropdown.Item>
    //           <NavDropdown.Item href="/register">Sign Up</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item
    //             href="/"
    //             onClick={() => {
    //               localStorage.clear();
    //             }}
    //           >
    //             Logout
    //           </NavDropdown.Item> */}
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <>
      <div className="w-full h-auto bg-merlin">
        <div className="h-full py-3 px-8 mx-auto xl:max-w-screen-2xl max-w-screen-lg w-full text-white flex justify-between items-center">
          {/* Left */}
          <div className="flex gap-5">
            {/* Home */}
            <div className="text-xl">Merlin</div>
            {/* Other Links */}
            <div className="hidden md:flex gap-3">
              <Link to="/explore">Explore</Link>
              <Link to="/myList">My List</Link>
              <Link to="/users">Users</Link>
            </div>
          </div>
          {/* Right */}
          <div>
            {/* Profile */}
            <div className="hidden md:block">Nelson🔻</div>
            {/* Dropdown Button */}
            <div
              className="block md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <GiHamburgerMenu />
            </div>
          </div>
        </div>
        {/* Dropdown menu */}
        {isMenuOpen && (
          <div className="grow_animation w-full h-auto flex md:hidden">
            <div
              className={`bg-merlin py-2 px-8 mx-auto xl:max-w-screen-2xl max-w-screen-lg w-full text-white flex justify-between items-center`}
            >
              <div className="flex items-start flex-col gap-3 pl-2">
                <Link to="/explore">Explore</Link>
                <Link to="/myList">My List</Link>
                <Link to="/users">Users</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar1;
