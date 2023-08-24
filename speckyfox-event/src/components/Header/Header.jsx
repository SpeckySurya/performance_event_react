import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";
import { MdOutlinePermPhoneMsg } from "react-icons/md";

export const Header = ({ homeConfig }) => {
  return (
    <div className="header-container">
      <Navbar homeConfig={homeConfig} />
    </div>
  );
};
