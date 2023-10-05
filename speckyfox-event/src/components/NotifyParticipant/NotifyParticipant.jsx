import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  darken,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import EventService from "../../services/EventService";
import MyContext from "../../context/MyContext";
import { useLocation, useNavigate } from "react-router-dom";

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

  const handleNotify = () => {
    setLoading(true);
    const eventService = new EventService();
    eventService
      .notifyUsers(selectedEvent)
      .then((response) => {
        setLoading(false);
        setIsAlertVisible(true);
      })
      .catch((error) => {
        setLoading(false);
        alert("Something went wrong on our end.");
      });
  };

  return (
    <Box p={3} maxWidth={600} margin="auto">
      <Typography variant="h5" py={2}>
        Notify Participants
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="select-event-label">Select Event</InputLabel>
        <Select
          labelId="select-event-label"
          label="Select Event"
          value={location.state.event.events.id}
        >
          <MenuItem value={location.state.event.events.id}>
            {location.state.event.events.title}
          </MenuItem>
        </Select>
      </FormControl>

      <Box textAlign={"end"}>
        <Button
          variant={"contained"}
          onClick={handleUserSelectAll}
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
        >
          {selectAll ? "Deselect All" : "Select All"}
        </Button>
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
            "Notify"
          )}
        </Button>
      </Box>
      <Box mt={3}>
        {selectedUsers.length === 0 ? (
          <Typography>No participants belong to the selected event.</Typography>
        ) : (
          <Box maxHeight={300} overflow={"scroll"}>
            {selectedUsers.map((user, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <Checkbox
                  checked={selectedUsers.includes(user)}
                  onChange={() => {
                    setSelectedUsers((prevUsers) =>
                      prevUsers.includes(user)
                        ? prevUsers.filter((u) => u !== user)
                        : [...prevUsers, user]
                    );
                  }}
                  sx={{ mr: 1 }}
                />
                <Typography>{user}</Typography>
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
