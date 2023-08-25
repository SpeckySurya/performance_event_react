import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Stack,
} from "@mui/material";
import TableComponent from "../TableComponent/TableComponent";

const ManageUser = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const usersByEvent = (event) => {
    return event.events.users.map((user) => {
      let obj = {};
      obj["id"] = user.id;
      obj["name"] = user.firstName;
      obj["email"] = user.email;
      return obj;
    });
  };

  console.log(events[0].events.users);

  const handleEventChange = (e) => {
    const event = e.target.value;
    setSelectedEvent(event);
    setUsers(usersByEvent(event) || []);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box py={10}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FormControl>
          <InputLabel>Event</InputLabel>
          <Select
            sx={{
              border: "1px #1976d2 solid",
              height: "40px",
              minWidth: "100px",
              maxWidth: "250px",
              margin: "10px 10px 10px 0",
            }}
            value={selectedEvent}
            onChange={handleEventChange}
            label="Event"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {events.map((event) => (
              <MenuItem key={event.events.id} value={event}>
                {event.events.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={{ height: "40px" }} variant="outlined">
          Export
        </Button>
      </Stack>
      <TableComponent rowData={selectedEvent?.events?.users} />
    </Box>
  );
};

export default ManageUser;
