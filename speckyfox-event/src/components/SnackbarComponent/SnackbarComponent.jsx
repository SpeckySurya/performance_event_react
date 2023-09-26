import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

/**
 *
 * Usage :
 *
 * const [snackbar, setSnackbar] = useState(null);
 * 
 * {snackbar}
 * 
 * setSnackbar(<SnackbarComponent message="Event deleted" severity="success" />);
 * 
 *  useEffect(() => {
      setTimeout(() => {
        setSnackbar(null);
      }, 3000);
    }, [snackbar]);
 *
 *
 */

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = ({ message, severity }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarComponent;
