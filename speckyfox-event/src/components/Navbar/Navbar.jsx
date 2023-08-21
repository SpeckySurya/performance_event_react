import { useRef } from "react";
import logo from "./../../assets/logo.png";
import "./Navbar.css";

import { BsFacebook, BsYoutube, BsTwitter, BsLinkedin } from "react-icons/bs";

import { useState } from "react";
import { useEffect } from "react";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav-container" ref={menuRef}>
      {menuOpen ? (
        <nav className="mob-navbar">
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
      ) : (
        ""
      )}
      <nav className="navbar" ref={buttonRef}>
        <div className="logo">
          <img src={logo} />
        </div>
        <div
          className="nav-hamburger"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
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
              <i className="bx bx-globe"></i>
            </a>
          </li>

          <li className="linkedin">
            <a target="_blank" href="https://speckyfox.com/contact-us">
              <i className="bx bbxl-linkedin"></i>
              <i className="bx bxs-phone"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
