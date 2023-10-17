import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React from "react";

const Duration = (props) => {
  const hours = [0, 1, 2, 3, 4, 5, 6];
  const minutes = [0, 15, 30, 45];

  const handleChange = (event) => {
    let { name, value } = event.target;
    props.setDuration({ ...props.duration, [name]: value });
  };

  return (
    <div className="form-group">
      <label htmlFor="duration">Duration</label>
      <Stack spacing={1} direction={"row"} alignItems={"center"}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Hours</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name="hours"
            id="hours"
            value={props.duration.hours}
            label="Hours"
            onChange={handleChange}
            required
          >
            {hours.map((e) => (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Minutes</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name="minutes"
            id="minutes"
            value={props.duration.minutes}
            label="Minutes"
            onChange={handleChange}
            required
          >
            {minutes.map((e) => (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
};

export default Duration;
