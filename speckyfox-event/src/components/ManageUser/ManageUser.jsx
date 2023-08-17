import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ManageUser = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const usersByEvent = (event) => {
    return event.events.users.map((user) => {
      console.log(user);
      let obj = {};
      obj["id"] = user.id;
      obj["name"] = user.firstName;
      obj["email"] = user.email;
      return obj;
    });
  };

  const handleEventChange = (e) => {
    const event = e.target.value;
    setSelectedEvent(event);
    setUsers(usersByEvent(event) || []);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box py={10}>
      <FormControl>
        <InputLabel>Event</InputLabel>
        <Select
          sx={{
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
      <TextField
        label="Search User"
        variant="outlined"
        size="small"
        sx={{ margin: "10px 10px 10px 0" }}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageUser;
