import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordService from "../../services/PasswordService";

/**
 *
 * This page show the forget password form
 *
 * @returns Forget password component
 */

function Forgotpassword() {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialog, setDialog] = useState({ dialogMsg: "", title: "" });
  const navigate = useNavigate();
  const handleClose = () => {
    setOpenDialog(false);
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const formData = new FormData();
    formData.append("email", email);
    const passwordService = new PasswordService();
    passwordService
      .sendResetPwdEmail({ email: email })
      .then((response) => {
        setLoading(false);
        setDialog({
          dialogMsg: "A reset email has sent to your email id.",
          title: "Success",
        });
        setOpenDialog(true);
      })
      .catch((error) => {
        setDialog({
          dialogMsg: "Unable to send reset password email. Please try later !",
          title: "Error",
        });
        setOpenDialog(true);
      });
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialog.dialogMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div className="login-container">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              Enter Email Id<span className="mandatory-field">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" className="flex-jcc-aic">
            {loading ? <CircularProgress size={20} color={"error"} /> : "Send"}
          </button>
          <Link to="/login" className="forgot_password-back">
            Back to login page
          </Link>
        </form>
      </div>
    </>
  );
}

export default Forgotpassword;
