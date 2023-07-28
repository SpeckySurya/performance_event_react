import React from "react";
import logo from "./../../assets/logo.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material";

const Navbar = () => {
  function handleHamburgerClick() {
    const mobNavbar = document.querySelector(".mob-navbar");
    if (mobNavbar.hasAttribute("style")) {
      mobNavbar.removeAttribute("style");
    } else {
      mobNavbar.setAttribute("style", "left:calc(-60%)");
    }
  }

  const CustomLink = styled(Link)(({ theme }) => ({
    color: "#ffffff",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  }));

  return (
    <div className="nav-container">
      <nav className="mob-navbar" style={{ left: "calc(-60%)" }}>
        <ul className="mob-nav-links">
          <li>
            <CustomLink to="/">Home</CustomLink>
          </li>
          <li>
            <CustomLink to="/events">Events</CustomLink>
          </li>
          <li>
            <a
              className="no-anchor-style"
              target="_blank"
              href="https://speckyfox.com/company"
            >
              About
            </a>
          </li>
          <li>
            <a
              className="no-anchor-style"
              target="_blank"
              href="https://speckyfox.com/contact-us"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="nav-hamburger" onClick={handleHamburgerClick}>
          <i class="bx bx-menu"></i>
        </div>
        <ul className="nav-links">
          <li>
            <CustomLink to="/">Home</CustomLink>
          </li>
          <li>
            <CustomLink to="/events">Events</CustomLink>
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
    </div>
  );
};

export default Navbar;
