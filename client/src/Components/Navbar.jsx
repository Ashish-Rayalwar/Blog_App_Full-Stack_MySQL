import React, { useContext } from "react";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  let userName;
  if (currentUser) {
    userName = JSON.parse(currentUser)[0].username;
  }
  console.log(userName);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser ? userName : null}</span>

          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <span>
              {" "}
              <Link className="link" to="/login">
                Login
              </Link>{" "}
            </span>
          )}

          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
