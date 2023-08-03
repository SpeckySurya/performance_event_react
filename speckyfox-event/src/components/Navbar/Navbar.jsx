import React from "react";
import logo from "./../../assets/logo.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material";
import { BsFacebook, BsYoutube, BsTwitter, BsLinkedin } from "react-icons/bs";
import { BiSolidContact } from "react-icons/bi";
import { FaGlobeAmericas } from "react-icons/fa";

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
            <a
              className="no-anchor-style"
              target="_blank"
              href="https://www.linkedin.com/company/speckyfox1/mycompany/"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="no-anchor-style"
              target="_blank"
              href="https://twitter.com/SpeckyFox"
            >
              Twiter
            </a>
          </li>
          <li>
            <a
              className="no-anchor-style"
              target="_blank"
              href="https://www.facebook.com/SpeckyFox/"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              className="no-anchor-style"
              target="_blank"
              href="https://www.youtube.com/@speckyfoxtechnologiesindia4213"
            >
              Youtube
            </a>
          </li>
          <li className="website">
            <a
              className="no-anchor-style"
              target="_blank"
              href="https://www.speckyfox.com"
            >
              Website
            </a>
          </li>
          <li className="contact">
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
        <Link to="/" className="logo">
          <img src={logo} />
        </Link>
        <div className="nav-hamburger" onClick={handleHamburgerClick}>
          <i className="bx bx-menu"></i>
        </div>
        <ul className="nav-links">
          <li>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/speckyfox1/mycompany/"
            >
              <BsLinkedin />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://twitter.com/SpeckyFox">
              <BsTwitter />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.facebook.com/SpeckyFox/">
              <BsFacebook />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.youtube.com/@speckyfoxtechnologiesindia4213"
            >
              <BsYoutube />
            </a>
          </li>
          <li className="website">
            <a target="_blank" href="https://www.speckyfox.com">
              <i class="bx bx-globe"></i>
              {/* <FaGlobeAmericas /> */}
            </a>
          </li>
          <li className="linkedin">
            <a target="_blank" href="https://speckyfox.com/contact-us">
              <i className="bx bbxl-linkedin">{/* <BiSolidContact /> */}</i>
              <i class="bx bxs-phone"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
