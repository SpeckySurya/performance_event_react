import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button, // Use MUI's Button instead of Bootstrap's
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PasswordService from "../../services/PasswordService";

function Forgotpassword() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialog, setDialog] = useState({ dialogMsg: "", title: "" });
  const navigate = useNavigate();
  const handleClose = () => {
    setOpenDialog(false);
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value; // Get the value of the email input field
    const formData = new FormData();
    formData.append("email", email);
    const passwordService = new PasswordService();
    passwordService
      .sendResetPwdEmail({ email: email })
      .then((response) => {
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
        open={openDialog} // Changed variable name to openDialog
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
            Send
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
