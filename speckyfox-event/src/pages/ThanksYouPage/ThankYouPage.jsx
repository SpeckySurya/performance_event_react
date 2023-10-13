import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Thanksimg from "../../assets/Thanksimg.jpg";
import "./style.css";

/**
 *
 * Shows a thank message
 *
 * @returns Thank You Page Component
 */

export default function ThankYouPage() {
  return (
    <div className="tahnkyoucartctr">
      <Typography
        letter-spacing={2}
        fontSize={"3rem"}
        fontWeight="600"
        fontFamily="Barlow"
        color="#82A7F7"
        paddingTop="25px"
        align="center"
      >
        Thank You !
      </Typography>
      <Typography
        align="center"
        color="#5d729f"
        fontWeight={600}
        fontSize={20}
        fontFamily="'Open Sans',sans-serif"
        line-height="1.6"
        margin="31px auto 0"
      >
        Thank you so much for register with the event
      </Typography>
      <Typography textAlign={"center"}>
        <Button
          style={{
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "4px",
            borderStyle: "none",
            alignSelf: "center",
            margin: " 52px auto 0",
            padding: "20px 77px",
            backgroundColor: "#fb6f6e",
          }}
        >
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            Go To HomePage
          </Link>
        </Button>
      </Typography>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <img src={Thanksimg} alt="error" width="720px" height="331px" />
      </Stack>
    </div>
  );
}
