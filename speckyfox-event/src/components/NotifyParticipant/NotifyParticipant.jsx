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
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import EventService from "../../services/EventService";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

const NotifyParticipant = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [events, setEvents] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const { context } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    context.breadCrumb.updatePages([
      { name: "Events", route: () => navigate("/dashboard/events") },
      {
        name: "Notify Participant",
        route: () => navigate("/dashboard/events/notify-participant"),
      },
    ]);
  }, []);

  useEffect(() => {
    const eventService = new EventService();
    eventService.getAllEvents().then((response) => {
      const currentDate = new Date();
      const upcomingEvents = response.data.filter((event) => {
        const eventDate = new Date(event.events.date);
        return eventDate > currentDate;
      });
      setEvents(upcomingEvents);
    });
  }, []);

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    if (eventId === -1) {
      setSelectedEvent(eventId);
      setSelectedUsers([]);
      setBtnDisabled(true);
      return;
    }
    setSelectedEvent(eventId);
    const obj = events.filter((event) => event.events.id === eventId)[0];
    const userList = obj.events.users.map(
      (user) => `${user.firstName} ${user.lastName}`
    );
    setSelectedUsers(userList);
    setBtnDisabled(false);
  };

  const handleUserSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      const obj = events.filter(
        (event) => event.events.id === selectedEvent
      )[0];
      const userList = obj.events.users.map(
        (user) => `${user.firstName} ${user.lastName}`
      );
      setSelectedUsers(userList);
    }
    setSelectAll(!selectAll);
  };

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
          value={selectedEvent}
          onChange={handleEventChange}
        >
          <MenuItem value={-1}>
            <Typography fontStyle={"italic"}>None</Typography>
          </MenuItem>
          {events.map((event) => (
            <MenuItem key={event.events.id} value={event.events.id}>
              {event.events.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box textAlign={"end"}>
        <Button
          variant={btnDisabled ? "outlined" : "contained"}
          disabled={btnDisabled}
          onClick={handleUserSelectAll}
          sx={{ ml: 2, mt: 3 }}
        >
          {selectAll ? "Deselect All" : "Select All"}
        </Button>
        <Button
          sx={{ ml: 2, mt: 3 }}
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
