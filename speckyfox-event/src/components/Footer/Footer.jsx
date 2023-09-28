import { Box, Stack, Typography } from "@mui/material";
import "./Footer.css";
import { Link } from "react-router-dom";
function Footer({ homeConfig }) {
  return (
    <div className="footer">
      <Typography color={"white"}>{homeConfig.footerText}</Typography>
      <Stack p={1} spacing={2} direction={"row"}>
        <Typography>
          <Link className="no-anchor-style-white" to={"/privacy"}>
            Privacy
          </Link>
        </Typography>
        <Typography>|</Typography>
        <Typography>
          <Link className="no-anchor-style-white" to={"/t-and-c"}>
            Terms & Conditions
          </Link>
        </Typography>
      </Stack>
    </div>
  );
}
export default Footer;
