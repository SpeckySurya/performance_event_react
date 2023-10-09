import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
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
import Role from "../../utils/Role";
import { findRoleFromToken } from "../../utils/TokenDecoder";
import { useSnackbar } from "material-ui-snackbar-provider";

const drawerWidth = 240;

const redirectToEvent = [
  "/dashboard",
  "/dashboard/events/manage-participant",
  "/dashboard/events/notify-participant",
  "/dashboard/events/edit-event",
  "/dashboard/events/upload-event-data",
];

const redirectToSpeaker = ["/dashboard/speakers/edit-speaker"];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

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
  const role = findRoleFromToken();

  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { context } = useContext(MyContext);
  const SnackbarProvider = useSnackbar();

  const [alignment, setAlignment] = useState("all");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
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
      action: () => navigate("/dashboard/speakers"),
    },
    {
      title: "Users",
      icon: <AdminPanelSettingsIcon />,
      action: () => navigate("/dashboard/users"),
    },
    {
      title: "Home Configuration",
      icon: <OtherHousesIcon />,
      action: () => navigate("/dashboard/home-configuration"),
    },
  ];

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      navigate("/login");
    }
    if (
      redirectToEvent.includes(location.pathname) ||
      location.pathname.includes("/dashboard")
    ) {
      navigate("/dashboard/events");
    } else if (redirectToSpeaker.includes(location.pathname)) {
      navigate("/dashboard/speakers");
    } else {
      navigate(location.pathname);
    }
  }, []);

  const addButtonTitle = () => {
    switch (location.pathname) {
      case "/dashboard/events": {
        return "Add new event";
      }
      case "/dashboard/users": {
        return "Add new user";
      }
      case "/dashboard/speakers": {
        return "Add new speaker";
      }
    }
  };

  function handleAddIconClick(e) {
    if (role === Role.VIEWER || role === Role.EDITOR) {
      SnackbarProvider.showMessage("Not allowed !");
      return;
    }
    if (location.pathname.includes("/dashboard/events")) {
      navigate("/dashboard/events/create-event");
    } else if (location.pathname.includes("/dashboard/users")) {
      navigate("/dashboard/users/user-registration");
    } else if (location.pathname.includes("/dashboard/speakers")) {
      navigate("/dashboard/speakers/create-speaker");
    }
  }

  function handleEventFilter(filter) {
    context.eventFilter.setEventFilter(filter);
  }

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
                <Box>{/* <CustomSearchField /> */}</Box>
                {location.pathname.includes("/dashboard/events") && (
                  <StyledToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                  >
                    <ToggleButton
                      value="all"
                      onClick={() => handleEventFilter("all")}
                    >
                      <Typography fontSize={13} color={"rgb(148,127,43)"}>
                        All
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      value="past"
                      onClick={() => handleEventFilter("past")}
                    >
                      <Typography fontSize={13} color={"rgb(148,127,43)"}>
                        Past
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      value="upcoming"
                      onClick={() => handleEventFilter("upcoming")}
                    >
                      <Typography fontSize={13} color={"rgb(148,127,43)"}>
                        Upcoming
                      </Typography>
                    </ToggleButton>
                  </StyledToggleButtonGroup>
                )}
                <Tooltip
                  title={addButtonTitle()}
                  sx={{
                    cursor:
                      role === Role.VIEWER || role === Role.EDITOR
                        ? "default"
                        : "pointer",
                  }}
                >
                  <Box
                    className={"add-icon-style"}
                    onClick={handleAddIconClick}
                  >
                    <AddIcon />
                  </Box>
                </Tooltip>
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
