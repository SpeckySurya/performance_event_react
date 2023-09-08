import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button, // Use MUI's Button instead of Bootstrap's
} from "@mui/material";
import { Link } from "react-router-dom";

function Forgotpassword() {
  const [openDialog, setOpenDialog] = useState(false); // Changed variable name to openDialog
  const [popUpMsg, setPopUpMsg] = useState(""); // Changed variable name to setPopUpMsg

  const handleClose = () => {
    setOpenDialog(false); // Changed variable name to setOpenDialog
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value; // Get the value of the email input field
    setPopUpMsg(email);
    setOpenDialog(true);
  };

  return (
    <>
      <Dialog
        open={openDialog} // Changed variable name to openDialog
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {popUpMsg} {/* Display the popUpMsg inside the dialog */}
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
