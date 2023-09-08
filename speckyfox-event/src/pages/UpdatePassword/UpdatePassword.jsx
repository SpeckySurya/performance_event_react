import { useState } from "react";
function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="login-container">
        <h1>Update Password</h1>
        <form>
          <div className="form-group">
            <label htmlFor="email">
              OTP<span className="mandatory-field">*</span>
            </label>
            <input
              type="text"
              id="otptext"
              name="otptext"
              placeholder="Enter OTP"
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
export default UpdatePassword;
