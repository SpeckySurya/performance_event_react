import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminRegistration() {
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className="login-container">
        <h1>Admin Registration</h1>
        <form>
          <div className="form-group">
            <label htmlFor="email">
              Email<span className="mandatory-field">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password<span className="mandatory-field">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              required
            />
          </div>

          <Box sx={{ minWidth: 120, marginBottom: 5 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <button type="submit" className="flex-jcc-aic">
            {loading ? (
              <CircularProgress size={20} color={"error"} />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminRegistration;
