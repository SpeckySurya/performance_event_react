import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PasswordService from "../../services/PasswordService";
import { CircularProgress } from "@mui/material";

function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const { token } = useParams();
  const navigate = useNavigate();
  const passwordService = new PasswordService();

  useEffect(() => {
    console.log(token);
    passwordService
      .validateResetPwdLink(token)
      .then((response) => {
        console.log(response.data);
        if (!response.data) {
          navigate("/forgot-password");
        }
      })
      .catch((error) => {
        navigate("/");
      });
  }, []);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  // Check if passwords match and update the state accordingly
  const passwordsMatch = formData.newPassword === formData.confirmPassword;

  function handleResetPwdClick() {
    // Check if passwords match before proceeding
    setLoading(true);
    if (!passwordsMatch) {
      alert("Passwords do not match");
      return;
    }

    passwordService
      .resetPassword(formData, token.replaceAll("-", "."))
      .then((response) => {
        if (true) {
          navigate("/login");
        }
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }

  return (
    <>
      <div className="login-container">
        <h1>Update Password</h1>
        <div className="form-group">
          <label htmlFor="password">
            New Password<span className="mandatory-field">*</span>
          </label>
          <input
            type="password"
            value={formData.newPassword}
            id="newPassword"
            name="newPassword"
            placeholder="Enter new password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Confirm Password<span className="mandatory-field">*</span>
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            onChange={handleChange}
            required
            style={{
              borderColor: !passwordsMatch ? "red" : "", // Apply red border if passwords don't match
            }}
          />
        </div>

        <button onClick={handleResetPwdClick} className="flex-jcc-aic">
          {loading ? (
            <CircularProgress size={20} color={"error"} />
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </>
  );
}

export default UpdatePassword;
