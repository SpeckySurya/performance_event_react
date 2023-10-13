import React from "react";
import "./CookieConsent.css";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
/**
 *
 * This component CookieConsent Component if someuser visit website first time it will genrated message related to Accept Cookies.
 *
 * @returns CookieConsent
 */
const CookieConsent = () => {
  const [open, setOpen] = useState("block");

  function handleCookieAccept() {
    setOpen("none");
    localStorage.setItem("cookie", true);
  }
  return (
    <Box className="cookie-consent" sx={{ display: open }}>
      <span>
        This site uses cookies to enhance user experience. see{" "}
        <Link to={"/privacy"} style={{ color: "blue", textDecoration: "none" }}>
          Privacy Policy
        </Link>
      </span>
      <div className="cookie-action-button">
        <button className="cookie-allow-button" onClick={handleCookieAccept}>
          Allow cookies
        </button>
      </div>
    </Box>
  );
};

export default CookieConsent;
