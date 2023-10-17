import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Footer.css";
/**
 *
 * This component is a Footer Component it will show footer details like privary and Terms & Conditions.
 *
 * @returns Footer
 */
function Footer({ homeConfig }) {
  return (
    <div className="footer">
      <Typography color={"white"}>{homeConfig.footerText}</Typography>
      <Stack p={1} spacing={2} direction={"row"}>
        <Typography>
          <Link
            className="no-anchor-style-white footerPrivacyText"
            to={"/PrivacyPolicy"}
          >
            Privacy
          </Link>
        </Typography>
        <Typography>|</Typography>
        <Typography>
          <Link
            className="no-anchor-style-white footerPrivacyText"
            to={"Terms&Conditions"}
          >
            Terms & Conditions
          </Link>
        </Typography>
      </Stack>
    </div>
  );
}
export default Footer;
