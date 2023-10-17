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
 * Usage :
 * 
 * Step 1 : Create a state
 * 
 * const [dialog, setDialog] = useState({ open: false, action: null });
 * 
 * Step 2 : Use the component
 * 
 *    <PopupAlert
        control={{
          dialog: dialog,
          setDialog: (dialog) => setDialog({ ...dialog, open: open }),
        }}
        title="Alert"
        content={"Do you really want to delete ?"}
        action={{ first: "Yes", second: "No" }}
      />
 * 
 * 
 * Step 3 : Call the function
 * 
    useEffect(() => {
      if (dialog.action === "Yes") {
        handleDelete();
      }
    }, [dialog]);
    
 * 
 * @param {*} props 
 * @returns 
 */

const PopupAlert = (props) => {
  const handleClose = (action) => {
    props?.control?.setDialog({
      ...props.control.dialog,
      action: action,
      open: false,
    });
  };
  return (
    <div>
      <Dialog
        open={props?.control?.dialog?.open}
        keepMounted
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(props?.action?.first)}>
            {props?.action?.first}
          </Button>
          <Button onClick={() => handleClose(props?.action?.second)}>
            {props?.action?.second}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopupAlert;
