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
} from "@mui/material";
import EventService from "../../services/EventService";
import { event } from "jquery";

const NotifyParticipant = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [events, setEvents] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    const eventService = new EventService();
    eventService.getAllEvents().then((response) => setEvents(response.data));
    events[selectedEvent - 1]?.users?.length > 0
      ? setBtnDisabled(false)
      : setBtnDisabled(true);
  }, [selectedEvent]);

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    setSelectedEvent(eventId);
    const obj = events.filter((event) => event.id === eventId)[0];
    const userList = obj.users.map(
      (user) => `${user.firstName} ${user.lastName}`
    );
    setSelectedUsers(userList);
  };

  const handleUserSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      const obj = events.filter((event) => event.id === selectedEvent)[0];
      const userList = obj.users.map(
        (user) => `${user.firstName} ${user.lastName}`
      );
      setSelectedUsers(userList);
    }
    setSelectAll(!selectAll);
  };

  const setUsersUsingEvent = (events) => {};

  const handleNotify = () => {
    const eventService = new EventService();
    eventService
      .notifyUsers(selectedEvent)
      .then((response) => {
        if (response.data) {
          alert("Reminder email sent !");
        } else {
          alert("Something wrong in our end.");
        }
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
          {events.map((event) => (
            <MenuItem key={event.id} value={event.id}>
              {event.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box textAlign={"end"}>
        <Button
          // variant={btnDisabled}
          variant={btnDisabled ? "outlined" : "contained"}
          //  variant="contained"
          disabled={btnDisabled ? true : false}
          onClick={handleUserSelectAll}
          sx={{ ml: 2, mt: 3 }}
        >
          {selectAll ? "Deselect All" : "Select All"}
        </Button>
        <Button
          sx={{ ml: 2, mt: 3 }}
          variant={btnDisabled ? "outlined" : "contained"}
          disabled={btnDisabled ? true : false}
          onClick={() => handleNotify()}
        >
          Notify
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
    </Box>
  );
};

export default NotifyParticipant;
