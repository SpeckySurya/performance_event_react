import { CircularProgress, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SnackbarComponent from "../../components/SnackbarComponent/SnackbarComponent";
import PasswordService from "../../services/PasswordService";

/**
 *
 * This page shows a form to update password using forget password link.
 *
 * @returns Update Password Component
 */

function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const { token } = useParams();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState(null);
  const passwordService = new PasswordService();

  useEffect(() => {
    passwordService
      .validateResetPwdLink(token)
      .then((response) => {
        if (!response.data) {
          navigate("/link-expired");
        }
      })
      .catch((error) => {
        navigate("/error");
      })
      .finally(() => setPageLoading(false));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSnackbar(null);
    }, 3000);
  }, [snackbar]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const passwordsMatch = formData.newPassword === formData.confirmPassword;

  function handleResetPwdClick(e) {
    e.preventDefault();
    setLoading(true);
    if (!passwordsMatch) {
      setSnackbar(
        <SnackbarComponent message="Passwords do not match" severity="error" />
      );
      setLoading(false);
      return;
    }

    const realToken = token.replaceAll("-dot-", ".");

    passwordService
      .resetPassword(formData, realToken)
      .then((response) => {
        setSnackbar(
          <SnackbarComponent
            message="Password changed. You will be redirect to login page in 3 seconds."
            severity="success"
          />
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        setLoading(false);
      })
      .catch((error) => {
        navigate("/error");
        setLoading(false);
      });
  }

  return (
    <>
      {snackbar}
      {pageLoading ? (
        <LinearProgress />
      ) : (
        <form onSubmit={(e) => handleResetPwdClick(e)}>
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
                  borderColor: !passwordsMatch ? "red" : "",
                }}
              />
            </div>

            <button type="submit" className="flex-jcc-aic">
              {loading ? (
                <CircularProgress size={20} color={"error"} />
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default UpdatePassword;
