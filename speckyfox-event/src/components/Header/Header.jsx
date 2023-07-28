import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-top">
        <div className="social-links">
          <ul>
            <li className="linkedin">
              <a
                target="_blank"
                href="https://www.linkedin.com/company/speckyfox1/"
              >
                <i class="bx bxl-linkedin"></i>
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
