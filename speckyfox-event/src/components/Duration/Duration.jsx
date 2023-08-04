import { Box, Stack } from "@mui/material";
import React, { useState } from "react";

const Duration = (props) => {
  const hours = [0, 1, 2, 3, 4, 5, 6];
  const minutes = [0, 15, 30, 45];

  const handleChange = (event) => {
    let { name, value } = event.target;
    props.setDuration({ ...props.duration, [name]: value });
  };

  return (
    <div className="form-group">
      <Stack>
        <label htmlFor="duration">Duration</label>
        <Box id="duration" className="flex">
          <select name="hours" id="hours" onChange={handleChange}>
            {hours.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
          <select name="minutes" id="minutes" onChange={handleChange}>
            {minutes.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </Box>
      </Stack>
    </div>
  );
};

export default Duration;
