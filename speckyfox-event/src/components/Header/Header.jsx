import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";
/**
 *
 * This component is a Header Component used show related to show Header details .
 *
 * @returns Header
 */
export const Header = ({ homeConfig }) => {
  return (
    <div className="header-container">
      <Navbar homeConfig={homeConfig} />
    </div>
  );
};
