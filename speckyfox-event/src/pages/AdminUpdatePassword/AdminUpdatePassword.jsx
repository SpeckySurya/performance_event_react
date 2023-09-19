import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SnackbarComponent from "../../components/SnackbarComponent/SnackbarComponent";
import PasswordService from "../../services/PasswordService";
import { Box, CircularProgress } from "@mui/material";

function AdminUpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setTimeout(() => setSnackbar(null), 3000);
  }, [snackbar]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (formData.newPassword !== formData.confirmPassword) {
      setSnackbar(
        <SnackbarComponent
          message={"New password and confirm password does not match"}
          severity={"error"}
        />
      );
      setLoading(false);
      return;
    }

    const passwordService = new PasswordService();
    passwordService
      .updatePassword(formData)
      .then((response) => {
        setLoading(false);
        setSnackbar(
          <SnackbarComponent
            message={"Password Updated"}
            severity={"success"}
          />
        );
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      })
      .catch((error) => {
        alert(error);
      });
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      {snackbar}
      <form>
        <div className="login-container">
          <h1>Update Password</h1>
          <div className="form-group">
            <label htmlFor="currentPassword">
              Current Password<span className="mandatory-field">*</span>
            </label>
            <input
              type="password"
              id="currentPassword"
              value={formData.currentPassword}
              name="currentPassword"
              onChange={handleChange}
              placeholder="Enter Current Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              New Password<span className="mandatory-field">*</span>
            </label>
            <input
              type="Password"
              id="newPassword"
              value={formData.newPassword}
              name="newPassword"
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password<span className="mandatory-field">*</span>
            </label>
            <input
              type="Password"
              id="confirmPassword"
              value={formData.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <button onClick={handleSubmit} className="flex-jcc-aic">
            {loading ? (
              <CircularProgress size={20} color={"error"} />
            ) : (
              "Update Password"
            )}
          </button>
          {/* <Box textAlign={"end"}>
            <Link to={"/dashboard"} className="no-anchor-style">
              Go back
            </Link>
          </Box> */}
        </div>
      </form>
    </>
  );
}
export default AdminUpdatePassword;
