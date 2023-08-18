import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const AdminHeader = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    {
      text: "Show Events",
      icon: <HomeOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("show");
        setOpen(false);
      },
    },
    {
      text: "Create Event",
      icon: <AddCircleOutlineOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("create");
        setOpen(false);
      },
    },

    {
      text: "Home Configration",
      icon: <AssuredWorkloadOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("homeConfig");
        setOpen(false);
      },
    },
    {
      text: "Show Speaker",
      icon: <PeopleAltOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("showSpeaker");
        setOpen(false);
      },
    },
    {
      text: "Manage Speaker",
      icon: <PeopleAltOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("manageSpeaker");
        setOpen(false);
      },
    },

    {
      text: "Notify User",
      icon: <NotificationsActiveOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("notify");
        setOpen(false);
      },
    },
    {
      text: "Manage User",
      icon: <ManageAccountsIcon />,
      onClick: () => {
        props.handleSidebar("manageUser");
        setOpen(false);
      },
    },
    { text: "Logout", icon: <ExitToAppIcon />, onClick: handleLogout },
  ];

  const list = () => (
    <List>
      {menuItems.map((item) => (
        <ListItem
          sx={{ cursor: "pointer" }}
          key={item.text}
          onClick={item.onClick}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <AppBar position="fixed" sx={{ zIndex: 5, bgcolor: "#322653" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Event Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default AdminHeader;
