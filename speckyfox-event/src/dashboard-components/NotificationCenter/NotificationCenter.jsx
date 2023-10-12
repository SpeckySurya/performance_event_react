import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Badge,
  Box,
  Button,
  Fade,
  IconButton,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import EventService from "../../services/EventService";
import CustomDialog from "../CustomDialogBox/CustomDialog";
import { toast } from "react-toastify";

const types = ["success", "info", "warning", "error"];

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const notificationCenterRef = useRef(null);
  const [event, setEvent] = useState({});
  const [badgeCounter, setBadgeCounter] = useState(0);
  const [customDialog, setCustomDialog] = useState({
    open: false,
    action: null,
    title: "",
    content: "",
  });
  const toastMe = () => toast("Reminder emails sent successfully!");

  const upcomingEvent = () => {
    const eventService = new EventService();
    eventService
      .getUpcomingEvent()
      .then((response) => {
        setEvent(response.data);
        setBadgeCounter(1);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    upcomingEvent();
  }, []);

  const toggleNotificationCenter = (event) => {
    setBadgeCounter(0);
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e) => {
    if (
      notificationCenterRef.current &&
      !notificationCenterRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  function handleNotify() {
    setCustomDialog({
      open: true,
      title: "Alert",
      content:
        'A reminder email will be send to every participant. Press "Yes" to continue !',
      action: () => {
        const eventService = new EventService();
        eventService
          .notifyUsers(event.id)
          .then((response) => {
            toastMe();
          })
          .catch((error) => {
            alert("Something went wrong on our end.");
          });
      },
    });
  }

  return (
    <Box sx={{ margin: "8px" }}>
      <CustomDialog
        customDialog={customDialog}
        setCustomDialog={setCustomDialog}
      />
      <IconButton
        size="large"
        onClick={toggleNotificationCenter}
        ref={notificationCenterRef}
      >
        <Badge badgeContent={badgeCounter} color="error">
          <NotificationsIcon style={{ color: "lightgray" }} />
        </Badge>
      </IconButton>
      <Popper
        sx={{ zIndex: 999999, p: "0 20px", maxWidth: "320px" }}
        open={isOpen}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              borderRadius={2}
              overflow={"hidden"}
              boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
            >
              <Box
                sx={{
                  backgroundColor: "#FBE7C6",
                  padding: "8px 50px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #fff2bf",
                }}
              >
                <Typography
                  variant="h6"
                  color="#473800"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  Notification Center
                </Typography>
              </Box>
              <Stack
                sx={{
                  padding: "12px",
                  background: "#fffbef",
                  overflowY: "auto",
                }}
                spacing={2}
              >
                <Typography
                  sx={{
                    backgroundColor: "white",
                    p: 1,
                    borderRadius: 1,
                    border: "1px dashed crimson",
                    fontSize: 14,
                  }}
                >
                  Hii Admin,{" "}
                  <Link
                    className="no-anchor-style"
                    to={`/${event?.id}`}
                    target="_blank"
                  >
                    <strong>
                      {event?.title?.length > 20
                        ? event?.title.substring(0, 20).concat("...")
                        : event?.title}
                    </strong>{" "}
                  </Link>
                  event is going to be live shortly. Please remind participants
                  <Stack alignItems={"end"}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ my: 1 }}
                      onClick={handleNotify}
                    >
                      Notify
                    </Button>
                  </Stack>
                </Typography>
              </Stack>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
