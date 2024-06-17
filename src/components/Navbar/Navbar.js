// import { NavDropdown, Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoTriangleDown } from "react-icons/go";

function Navbar1() {
  const userData = localStorage.getItem("userData");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeDropdown = () => {
    setIsMenuOpen(false);
  };

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
      <div className="w-full h-14 bg-merlin">
        <div className="h-full py-3 px-8 mx-auto xl:max-w-screen-2xl max-w-screen-lg w-full text-white flex justify-between items-center">
          {/* Left */}
          <div className="flex gap-5 items-center">
            {/* Home */}
            <div className="text-xl">
              <Link to="/">Merlin</Link>
            </div>
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
            <div className="hidden md:block">
              <AuthFloatingDropdown
                userData={userData}
                closeDropdown={closeDropdown}
              />
            </div>
            {/* Dropdown Button */}
            <div
              className="block md:hidden rounded border-[2px] border-transparent transition duration-300 hover:border-gray-400 p-1 hover:cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <GiHamburgerMenu className="h-6 w-6" />
            </div>
          </div>
        </div>
        {/* Dropdown menu */}
        {isMenuOpen && (
          <div className="grow_animation w-full h-auto flex md:hidden">
            <div
              className={`bg-merlin py-2 px-8 mx-auto xl:max-w-screen-2xl max-w-screen-lg w-full text-white flex justify-between items-center`}
            >
              <div className="flex items-start flex-col gap-3 pl-2 pb-2 w-100">
                <Link to="/explore" onClick={closeDropdown}>
                  Explore
                </Link>
                <Link to="/myList" onClick={closeDropdown}>
                  My List
                </Link>
                <Link to="/users" onClick={closeDropdown}>
                  Users
                </Link>
                {/* Login/SignUp or Logout */}
                <AuthDropdown
                  closeDropdown={closeDropdown}
                  userData={userData}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const AuthDropdown = ({ closeDropdown, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => {
    if (userData) {
      localStorage.clear();
    }
    setIsOpen(false);
    closeDropdown();
  };
  const handleOpen = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };
  return (
    <div className="w-100">
      <div
        className="flex gap-2 w-fit items-center cursor-pointer"
        onClick={handleOpen}
      >
        {userData != null
          ? userData.charAt(0).toUpperCase() + userData.slice(1, 10)
          : "Login/Sign Up"}
        <GoTriangleDown />
      </div>
      {isOpen && (
        <div className="mt-2 flex flex-col gap-1 rounded font-semibold text-gray-800 w-100 bg-white p-2">
          {userData != null ? (
            <Link to="/" onClick={close}>
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={close}>
                Login
              </Link>
              <Link to="/register" onClick={close}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const AuthFloatingDropdown = ({ closeDropdown, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => {
    setIsOpen(false);
    closeDropdown();
    if (userData) {
      localStorage.clear();
      window.location.href = "/";
    }
  };
  const handleOpen = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };
  return (
    <div className="relative">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={handleOpen}
      >
        {userData != null
          ? userData.charAt(0).toUpperCase() + userData.slice(1, 10)
          : "Login/Sign Up"}
        <GoTriangleDown />
      </div>
      {isOpen && (
        <div className="z-50 top-[100%] right-0 w-32 mt-2 z-100 absolute white border flex flex-col gap-1 rounded font-semibold text-gray-800 p-2">
          {userData != null ? (
            <Link to="/" onClick={close}>
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={close}>
                Login
              </Link>
              <Link to="/register" onClick={close}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar1;
