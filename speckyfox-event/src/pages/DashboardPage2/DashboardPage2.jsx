import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../dashboard-components/BreadCrumb";
import CustomSearchField from "../../dashboard-components/CustomSearchField/CustomSearchField";
import DashboardAppBar from "../../dashboard-components/DashboardAppBar";
import EventService from "../../services/EventService";
import SpeakerService from "../../services/SpeakerService";
import MyContext from "../../context/MyContext";
import AddIcon from "@mui/icons-material/Add";
import "./DashboardPage2.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DashboardPage2() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { context, updateContext } = useContext(MyContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      title: "Events",
      icon: <CalendarMonthIcon />,
      action: () => navigate("/dashboard/events"),
    },
    {
      title: "Speakers",
      icon: <HeadsetMicIcon />,
      action: () => navigate("/dashboard/events"),
    },
    {
      title: "Users",
      icon: <AdminPanelSettingsIcon />,
      action: () => navigate("/dashboard/users"),
    },
    {
      title: "Home Configuration",
      icon: <OtherHousesIcon />,
      action: () => navigate("/dashboard/events"),
    },
  ];

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      navigate("/login");
    }
    navigate(location.pathname);
  }, []);

  const initialSetup = () => {
    const eventService = new EventService();
    eventService.getAllEvents().then((response) => {
      setEvents(response.data);
    });
    const speakerService = new SpeakerService();
    speakerService.getAllSpeakers().then((response) => {
      setSpeakers(response.data);
    });
  };

  useEffect(() => {
    initialSetup();
  }, []);

  function handleAddIconClick(e) {
    navigate("/dashboard/events/create-event");
  }

  console.log(context);

  return (
    <Box
      position={"relative"}
      sx={{ backgroundColor: "#f3f0e8", height: "100vh" }}
    >
      <DashboardAppBar setOpen={setOpen} open={open} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "whitesmoke",
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.title} onClick={item.action} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Stack spacing={2}>
            <Stack
              direction={"row"}
              sx={{
                backgroundColor: "whitesmoke",
                borderRadius: 5,
                height: "8vh",
                px: 2,
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
              }}
            >
              <Breadcrumb pages={context.breadCrumb.pages} />
              <Stack
                spacing={2}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Box>
                  <CustomSearchField />
                </Box>
                <Box className={"add-icon-style"} onClick={handleAddIconClick}>
                  <AddIcon />
                </Box>
              </Stack>
            </Stack>
            <Box p={1} className={"custom-scroll"} height={"74vh"}>
              <Outlet />
            </Box>
          </Stack>
        </Main>
      </Box>
    </Box>
  );
}
