import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";
import { MdOutlinePermPhoneMsg } from "react-icons/md";

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-top">
        <div className="social-links">
          <ul>
            <li className="linkedin">
              <a target="_blank" href="https://speckyfox.com/contact-us">
                <i class="bx bbxl-linkedin">
                  <MdOutlinePermPhoneMsg />
                </i>
              </a>
            </li>
            <li className="website">
              <a target="_blank" href="https://www.speckyfox.com">
                <i class="bx bx-globe"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Navbar />
    </div>
  );
};
