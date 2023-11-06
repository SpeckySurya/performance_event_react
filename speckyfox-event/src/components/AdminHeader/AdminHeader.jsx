import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import "./AdminHeader.css";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useNavigate } from "react-router-dom";
import { findRoleFromToken } from "../../utils/TokenDecoder";
/**
 *
 * This components AdminHeader Component it is basicley a sideBar when admin login in application
 *
 * @returns AdminHeader
 */
const AdminHeader = (props) => {
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [, setMenuItem] = useState("Show Events");
  const navigate = useNavigate();

  useEffect(() => {
    const role = findRoleFromToken();
    switch (role) {
      case "SUPER_ADMIN": {
        setMenuItems([
          ...menuItemsForAdmin,
          ...menuItemsForEditor,
          ...commonMenuItems,
        ]);
        break;
      }
      case "ADMIN": {
        setMenuItems([
          ...menuItemsForAdmin,
          ...menuItemsForEditor,
          ...commonMenuItems,
        ]);
        break;
      }
      case "EDITOR": {
        setMenuItems([...menuItemsForEditor, ...commonMenuItems]);
        break;
      }
      case "VIEWER": {
        setMenuItems([...commonMenuItems]);
        break;
      }
    }
  }, []);

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
    navigate("/login");
  };

  const commonMenuItems = [
    {
      text: "Show Events",
      icon: <HomeOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("show");
        setOpen(false);
        setMenuItem("Show Events");
      },
    },
    {
      text: "Show Speaker",
      icon: <PeopleAltOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("showSpeaker");
        setOpen(false);
        setMenuItem("Show Speaker");
      },
    },
    {
      text: "View Participant",
      icon: <VisibilityOffOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("manageUser");
        setOpen(false);
        setMenuItem("View Participant");
      },
    },
    {
      text: "Change Password",
      icon: <ChangeCircleOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("AdminUpdatePassword");
        setOpen(false);
        setMenuItem("Change Password");
      },
    },
    { text: "Logout", icon: <ExitToAppIcon />, onClick: handleLogout },
  ];

  const menuItemsForEditor = [
    {
      text: "Home Configuration",
      icon: <AssuredWorkloadOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("homeConfig");
        setOpen(false);
        setMenuItem("Home Configuration");
      },
    },
  ];

  const menuItemsForAdmin = [
    {
      text: "Create Event",
      icon: <AddCircleOutlineOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("create");
        setOpen(false);
        setMenuItem("Create Event");
      },
    },
    {
      text: "Create Speaker",
      icon: <PersonAddAltOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("manageSpeaker");
        setOpen(false);
        setMenuItem("Create Speaker");
      },
    },
    {
      text: "Upload Files",
      icon: <VideoLibraryOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("UploadVideoAndPdf");
        setOpen(false);
      },
    },
    {
      text: "Notify Participant",
      icon: <NotificationsActiveOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("notify");
        setOpen(false);
        setMenuItem("Notify Participant");
      },
    },
    {
      text: "User Registration",
      icon: <AppRegistrationIcon />,
      onClick: () => {
        props.handleSidebar("AdminRegistration");
        setOpen(false);
        setMenuItem("Admin Registration");
      },
    },
    {
      text: "Manage Users & Role",
      icon: <ManageAccountsOutlinedIcon />,
      onClick: () => {
        props.handleSidebar("manageAdmin");
        setOpen(false);
        setMenuItem("Manage Admin");
      },
    },
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
