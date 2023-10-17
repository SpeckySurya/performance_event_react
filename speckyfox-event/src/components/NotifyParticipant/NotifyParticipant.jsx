import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  darken,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import CustomDialog from "../../dashboard-components/CustomDialogBox/CustomDialog";
import EventService from "../../services/EventService";
/**
 *
 * This component is a NotifyParticipant . it will send notification to participants.
 *
 * @returns NotifyParticipant
 */
const NotifyParticipant = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [events, setEvents] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const { context } = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [customDialog, setCustomDialog] = useState({
    open: false,
    action: null,
    title: "",
    content: "",
  });

  useEffect(() => {
    context.breadCrumb.updatePages([
      { name: "Events", route: () => navigate("/dashboard/events") },
      {
        name: "Notify Participant",
      },
    ]);
  }, []);

  useEffect(() => {
    const userList = location.state.event.events.users.map(
      (user) => `${user.firstName} ${user.lastName}`
    );
    setSelectedUsers(userList);
  }, []);

  const handleUserSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      const userList = location.state.event.events.users.map(
        (user) => `${user.firstName} ${user.lastName}`
      );
      setSelectedUsers(userList);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    const len = location.state.event.events.users.length;
    if (selectedUsers.length === 0) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
    if (selectedUsers.length === len && selectedUsers.length !== 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedUsers]);

  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  function handleNotify() {
    setCustomDialog({
      open: true,
      title: "Alert",
      content:
        'A reminder email will be send to every participant. Press "Yes" to continue !',
      action: () => {
        setLoading(true);
        const eventService = new EventService();
        eventService
          .notifyUsers(location.state.event.events.id)
          .then((response) => {
            setLoading(false);
            setIsAlertVisible(true);
          })
          .catch((error) => {
            setLoading(false);
            alert("Something went wrong on our end.");
          });
      },
    });
  }

  return (
    <Box p={3} maxWidth={600} margin="auto">
      <CustomDialog
        customDialog={customDialog}
        setCustomDialog={setCustomDialog}
      />
      <Typography variant="h5" py={2}>
        Notify Participants
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="select-event-label">Select Event</InputLabel>
        <Select
          labelId="select-event-label"
          label="Select Event"
          value={location.state.event.events.id}
          disabled
        >
          <MenuItem value={location.state.event.events.id}>
            {location.state.event.events.title}
          </MenuItem>
        </Select>
      </FormControl>

      <Box textAlign={"end"}>
        <Button
          sx={{
            height: "40px",
            ml: 2,
            mt: 3,
            background: "#947f2b",
            color: "white",
            ":hover": {
              background: darken("#947f2b", 0.2),
            },
          }}
          variant={btnDisabled ? "outlined" : "contained"}
          disabled={btnDisabled}
          onClick={handleNotify}
        >
          {loading ? (
            <CircularProgress style={{ color: "whitesmoke" }} size={24.5} />
          ) : (
            "Notify All"
          )}
        </Button>
      </Box>
      <Box mt={3}>
        {selectedUsers.length === 0 ? (
          <Typography>No participants belong to the selected event.</Typography>
        ) : (
          <Box maxHeight={280} overflow={"auto"}>
            {selectedUsers.map((user, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <Typography>
                  <strong>{index + 1}.</strong> &nbsp;{user}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {isAlertVisible && (
        <Alert style={{ margin: "5px 0" }} onClose={handleAlertClose}>
          Notified!
        </Alert>
      )}
    </Box>
  );
};

export default NotifyParticipant;
