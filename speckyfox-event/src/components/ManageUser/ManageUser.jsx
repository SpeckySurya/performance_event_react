import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import MyContext from "../../context/MyContext";
import EventService from "../../services/EventService";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const tableRef = useRef(null);
  const { context } = useContext(MyContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const initialSetup = () => {
    const eventService = new EventService();
    eventService.getAllEvents().then((response) => {
      setEvents(response.data);
    });
  };

  useEffect(() => {
    initialSetup();
    context.breadCrumb.updatePages([
      { name: "Events", route: () => navigate("/dashboard/events") },
      {
        name: "Manage Participant",
        route: () => navigate("/dashboard/events/manage-participant"),
      },
    ]);
  });

  const handleEventChange = (e) => {
    const event = e.target.value;
    setSelectedEvent(event);
  };
  function handleClick() {
    if (tableRef.current) {
      tableRef.current.onBtnExport();
    }
  }

  return (
    <Box>
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
        <Button
          onClick={handleClick}
          sx={{ height: "40px" }}
          variant="outlined"
        >
          Export
        </Button>
      </Stack>
      <TableComponent ref={tableRef} rowData={selectedEvent?.events?.users} />
    </Box>
  );
};

export default ManageUser;
