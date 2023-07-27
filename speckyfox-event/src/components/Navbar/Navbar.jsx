import React from "react";
import logo from "./../../assets/logo.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a target="_blank" href="https://speckyfox.com/company">
            About
          </a>
        </li>
        <li>
          <a target="_blank" href="https://speckyfox.com/contact-us">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
