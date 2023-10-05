import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./CustomSearchField.css";

const CustomSearchField = () => {
  return (
    <div className="search-box">
      <button className="btn-search">
        <SearchIcon sx={{ fontSize: 25 }} className="fas fa-search" />
      </button>
      <input
        type="text"
        className="input-search"
        placeholder="Type to Search..."
      />
    </div>
  );
};

export default CustomSearchField;
