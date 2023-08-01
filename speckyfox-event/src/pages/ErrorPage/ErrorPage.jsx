import { Typography, Button, Box, Stack } from "@mui/material";
import "./ErrorPage.css";
import Thanksimg from "../../assets/Thanksimg.jpg";
import err from "../../assets/errr.jpg";
import { Link, useLocation } from "react-router-dom";
export default function ErrorPage() {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="tahnkyoucartctr">
      <Typography
        letter-spacing={2}
        fontSize={"3rem"}
        fontWeight="600"
        fontFamily="Barlow"
        color="brown"
        paddingTop="25px"
        align="center"
      >
        Oops !
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
        {data != undefined || data != null
          ? data
          : "Something wrong in our end"}
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
            backgroundColor: "darkorange",
          }}
        >
          <Link
            style={{
              color: "white",

              textDecoration: "none",
            }}
            to="/"
          >
            Go To HomePage
          </Link>
        </Button>
      </Typography>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <img src={err} alt="error" width="30%" height="30%" />
      </Stack>
    </div>
  );
}
