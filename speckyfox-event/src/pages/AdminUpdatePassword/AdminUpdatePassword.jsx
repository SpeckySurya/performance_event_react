import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminUpdatePassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="login-container">
        <h1>Update Password</h1>
        <form>
          <div className="form-group">
            <label htmlFor="currentPassword">
              Current Password<span className="mandatory-field">*</span>
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
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
              name="newPassword"
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Confirm Password<span className="mandatory-field">*</span>
            </label>
            <input
              type="Password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="confirm your password"
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
        </form>
      </div>
    </>
  );
}
export default AdminUpdatePassword;
