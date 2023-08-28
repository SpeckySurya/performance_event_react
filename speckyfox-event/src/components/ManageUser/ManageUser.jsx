import React, { useRef, useState } from "react";
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
  const tableRef = useRef(null);

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
