import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import PasswordService from "../../services/PasswordService";

function AdminRegistration() {
  const [loading, setLoading] = useState(false);
  const data = { email: "", password: "", confirmPassword: "", role: "" };
  const [selectedRole, setSelectedRole] = useState("");
  const [age, setAge] = useState([]);
  const passwordService = new PasswordService();

  useEffect(() => {
    passwordService
      .getAdminRoles()
      .then((res) => {
        setSelectedRole(res[0]);
        setAge(res.data);

        console.log(res);
        // Set a default role if needed
      })
      .catch((ale) => alert(ale));
  }, []);

  const [inputData, setInputData] = useState(data);

  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputData); // Display input data in the console
  };

  return (
    <div className="login-container">
      <h1>Admin Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            Email<span className="mandatory-field">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputData.email}
            onChange={handleData}
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
            placeholder="Enter password"
            value={inputData.password}
            onChange={handleData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">
            Confirm Password<span className="mandatory-field">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            value={inputData.confirmPassword}
            onChange={handleData}
            required
          />
        </div>
        <Box sx={{ minWidth: 120, marginBottom: 5 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedRole}
              name="role"
              label="Role"
              onChange={handleData}
            >
              {age.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
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
  );
}

export default AdminRegistration;
