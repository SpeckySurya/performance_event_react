import React from "react";
import "./LinkExpired.css";
import { Link } from "react-router-dom";

const LinkExpired = () => {
  return (
    <div class="expired">
      <div class="message">
        <h1>Oops, this link is expired</h1>
        <p>This URL is not valid anymore.</p>
        <Link to={"/"}>Go to Speckyfox Events</Link>
      </div>
    </div>
  );
};

export default LinkExpired;
