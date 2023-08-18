import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import EventService from "../../services/EventService";
import { event } from "jquery";

const NotifyParticipant = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [events, setEvents] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // console.log(selectedEvent);

  useEffect(() => {
    const eventService = new EventService();
    eventService.getAllEvents().then((response) => {
      setEvents(response.data);
    });
  }, [selectedEvent]);

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
      const userList = obj.users.map(
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
        alert("Something wrong in our end.");
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
          // variant={btnDisabled}
          variant={btnDisabled ? "outlined" : "contained"}
          //  variant="contained"
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
          onClick={() => handleNotify()}
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
        <Alert
          style={{ margin: "5px 0" }}
          onClose={() => {
            handleAlertClose();
          }}
        >
          Notified !
        </Alert>
      )}
    </Box>
  );
};

export default NotifyParticipant;
