import { Box, Typography } from "@mui/material";
import "./Footer.css";
import { Link } from "react-router-dom";
function Footer({ homeConfig }) {
  return (
    <div className="footer">
      <Typography>{homeConfig.footerText}</Typography>
    </div>
  );
}
export default Footer;
