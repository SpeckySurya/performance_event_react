import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = ({ customDialog, setCustomDialog }) => {
  const handleClose = () => {
    setCustomDialog({
      ...customDialog,
      open: false,
    });
  };

  const handleSubmit = () => {
    customDialog.action();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={customDialog?.open}
        keepMounted
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{customDialog?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {customDialog?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>No</Button>
          <Button onClick={() => handleSubmit()}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
