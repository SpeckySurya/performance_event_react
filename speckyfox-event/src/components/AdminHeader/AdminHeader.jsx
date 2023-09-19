import { useEffect, useState } from "react";
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
  Link,
  Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import "./AdminHeader.css";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { findRoleFromToken } from "../../utils/TokenDecoder";

const AdminHeader = (props) => {
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [menuItem, setMenuItem] = useState("Show Events");
  const navigate = useNavigate();

  useEffect(() => {
    const role = findRoleFromToken();
    switch (role) {
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
    navigate("/");
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
      icon: <ChangeCircleIcon />,
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
      text: "Admin Registration",
      icon: <AppRegistrationIcon />,
      onClick: () => navigate("/admin-registation"),
    },
  ];

  // const menuItems = [
  //   {
  //     text: "Show Events",
  //     icon: <HomeOutlinedIcon />,
  //     onClick: () => {
  //       props.handleSidebar("show");
  //       setOpen(false);
  //       setMenuItem("Show Events");
  //     },
  //   },
  //   {
  //     text: "Create Event",
  //     icon: <AddCircleOutlineOutlinedIcon />,
  //     onClick: () => {
  //       props.handleSidebar("create");
  //       setOpen(false);
  //       setMenuItem("Create Event");
  //     },
  //   },

  //   {
  //     text: "Home Configuration",
  //     icon: <AssuredWorkloadOutlinedIcon />,
  //     onClick: () => {
  //       props.handleSidebar("homeConfig");
  //       setOpen(false);
  //       setMenuItem("Home Configuration");
  //     },
  //   },
  //   {
  //     text: "Show Speaker",
  //     icon: <PeopleAltOutlinedIcon />,
  //     onClick: () => {
  //       props.handleSidebar("showSpeaker");
  //       setOpen(false);
  //       setMenuItem("Show Speaker");
  //     },
  //   },
  //   {
  //     text: "Create Speaker",
  //     icon: <PersonAddAltOutlinedIcon />,
  //     onClick: () => {
  //       props.handleSidebar("manageSpeaker");
  //       setOpen(false);
  //       setMenuItem("Create Speaker");
  //     },
  //   },

  //   {
  //     text: "Notify Participant",
  //     icon: <NotificationsActiveOutlinedIcon />,
  //     onClick: () => {
  //       props.handleSidebar("notify");
  //       setOpen(false);
  //       setMenuItem("Notify Participant");
  //     },
  //   },
  //   {
  //     text: "View Participant",
  //     icon: <VisibilityOffOutlinedIcon />,
  //     onClick: () => {
  //       props.handleSidebar("manageUser");
  //       setOpen(false);
  //       setMenuItem("View Participant");
  //     },
  //   },
  //   {
  //     text: "Upload Files",
  //     icon: <VideoLibraryOutlinedIcon />,
  //     onClick: () => {
  //       props.handleSidebar("UploadVideoAndPdf");
  //       setOpen(false);
  //     },
  //   },
  //   { text: "Logout", icon: <ExitToAppIcon />, onClick: handleLogout },
  // ];

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
