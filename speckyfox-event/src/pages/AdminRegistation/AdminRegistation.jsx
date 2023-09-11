import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PasswordService from "../../services/PasswordService";
import SnackbarComponent from "../../components/SnackbarComponent/SnackbarComponent";
import RegistrationService from "../../services/RegistrationService";
import { Link } from "react-router-dom";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CircularProgress } from "@mui/material";

function AdminRegistration() {
  const [loading, setLoading] = useState(false);
  const data = { email: "", password: "", confirmPassword: "", role: "" };
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const passwordService = new PasswordService();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    } else {
      passwordService
        .getAdminRoles()
        .then((res) => {
          setSelectedRole(res[0]);
          setRoles(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setSnackbar(null), 3000);
  }, [snackbar]);

  const [inputData, setInputData] = useState(data);

  const handleData = (e) => {
    if (e.target.name === "role") {
      setSelectedRole(e.target.value);
    }
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputData.password !== inputData.confirmPassword) {
      setSnackbar(
        <SnackbarComponent
          message={"New password and confirm password do not match"}
          severity={"error"}
        />
      );
      return;
    }
    const registrationService = new RegistrationService();
    registrationService
      .newAdminRegistration(inputData)
      .then((response) => {
        setLoading(false);
        setSnackbar(
          <SnackbarComponent message={response.data} severity={"success"} />
        );
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="login-container">
        {snackbar}
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
              placeholder="Email"
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
          <div className="form-group">
            <label htmlFor="confirmPassword">
              Role<span className="mandatory-field">*</span>
            </label>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="role">Role</InputLabel>
                <Select
                  labelId="role"
                  label="Role"
                  id="demo-simple-select"
                  value={selectedRole}
                  name="role"
                  onChange={handleData}
                >
                  {roles.map((role, index) => (
                    <MenuItem key={index} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <button type="submit" className="flex-jcc-aic">
            {loading ? (
              <CircularProgress size={20} color={"error"} />
            ) : (
              "Register"
            )}
          </button>
        </form>
        <Box textAlign={"end"}>
          <Link to={"/dashboard"} className="no-anchor-style">
            Go back
          </Link>
        </Box>
      </div>
    </>
  );
}

export default AdminRegistration;
