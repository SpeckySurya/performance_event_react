import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectAutoWidth() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: 1 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Event</InputLabel>
        <Select
          sx={{ width: 1 }}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value={10}>First Event</MenuItem>
          <MenuItem value={21}>Secound Event</MenuItem>
          <MenuItem value={22}>Third Event</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
