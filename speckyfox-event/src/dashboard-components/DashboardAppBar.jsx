import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { findEmailFromToken, findRoleFromToken } from "../utils/TokenDecoder";
import NotificationCenter from "./NotificationCenter/NotificationCenter";
import Role from "../utils/Role";

export default function DashboardAppBar({ setOpen, open }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const settings = [
    {
      title: "Change Password",
      action: () => navigate("/dashboard/change-password"),
    },
    {
      title: "Logout",
      action: () => {
        sessionStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const handleOpenNavMenu = (event) => {
    setOpen(!open);
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 9999, backgroundColor: "#735F32" }}>
      <Stack px={2}>
        <Toolbar disableGutters>
          <SpaceDashboardIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Link to={"/dashboard/events"} className="no-anchor-style-white">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DASHBOARD
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            &nbsp;
          </Box>

          <Stack direction={"row"} sx={{ flexGrow: 0 }}>
            {findRoleFromToken() === Role.SUPER_ADMIN && <NotificationCenter />}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{findRoleFromToken().charAt(0)}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", zIndex: 99999, maxWidth: 300 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Stack
                sx={{ justifyContent: "center", alignItems: "center", p: 1 }}
              >
                <Typography>Hello</Typography>
                <Typography
                  color={"black"}
                  fontSize={12}
                  sx={{
                    wordBreak: "break-word",
                  }}
                >
                  {findEmailFromToken()}
                </Typography>
              </Stack>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    fontSize={14}
                    border={"1px solid whitesmoke"}
                    padding={"5px 30px 5px 5px"}
                    borderRadius={2}
                    width={"100%"}
                    onClick={setting.action}
                  >
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Toolbar>
      </Stack>
    </AppBar>
  );
}
