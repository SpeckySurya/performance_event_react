import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordService from "../../services/PasswordService";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
import MyContext from "../../context/MyContext";
/**
 *
 * This components AdminUpdatePassword Component it is used for Update the Password .
 *
 * @returns AdminUpdatePassword
 */
function AdminUpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { context } = useContext(MyContext);

  useEffect(() => {
    context.breadCrumb.updatePages([
      {
        name: "Change Password",
        route: () => navigate("/dashboard/change-password"),
      },
    ]);
  }, []);

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
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        setLoading(false);
        setSnackbar(
          <SnackbarComponent
            message={"Something wrong. Please recheck your current password"}
            severity={"error"}
          />
        );
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
      <form onSubmit={handleSubmit}>
        <div className="login-container" style={{ margin: "auto" }}>
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
          <button type="submit" className="flex-jcc-aic">
            {loading ? (
              <CircularProgress size={20} color={"error"} />
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
export default AdminUpdatePassword;
