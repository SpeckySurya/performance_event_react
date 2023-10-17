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

/**
 * 
 * This is custom dialog to use this follow the below steps :
 * 
 * Step 1 : Create a state
 * const [customDialog, setCustomDialog] = useState({open: false, action: null, title: "", content: ""});
 * 
 * Step 2 : Click handler
 * 
 *  function handleDownloadPPt() {
        setCustomDialog({
          open: true,
          title: "Alert",
          content:
            'PPT will send to your registered email. Press "Yes" to continue !',
          action: ()=> {},
        });
    }
 * 
 * @param {customDialog is an object contains dialog title, description and action callback function} param0 
 * @returns 
 */

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
