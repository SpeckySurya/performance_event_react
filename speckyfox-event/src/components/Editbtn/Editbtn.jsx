import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EventService from "../../services/EventService";
import React, { useEffect, useState } from "react";
import PopupAlert from "../PopupAlert/PopupAlert";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
import { CircularProgress, LinearProgress } from "@mui/material";

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 40;

export default function Editbtn(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialog, setDialog] = useState({ open: false, action: null });
  const [snackbar, setSnackbar] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    handleClose();
    if (dialog.action === "Yes") {
      props.setLoading(true);
      const eventService = new EventService();
      eventService
        .deleteEvent(props.event.events.id)
        .then((response) => {
          if (response) {
            setSnackbar(
              <SnackbarComponent message="Event deleted" severity="success" />
            );
          } else {
            setSnackbar(
              <SnackbarComponent message="Event not deleted" severity="error" />
            );
          }
          props.setLoading(false);
        })
        .catch((error) => {
          setSnackbar(
            <SnackbarComponent
              message="Something went wrong"
              severity="error"
            />
          );
          props.setLoading(false);
        });
    }
  }, [dialog]);

  const handleItemClick = (option) => {
    switch (option) {
      case "Edit": {
        props.setEventEditing(true);
        props.setEditEvent(props.event);
        break;
      }
      case "Delete": {
        setDialog({ ...dialog, open: true });
        break;
      }
    }
  };

  return (
    <div>
      <PopupAlert
        control={{
          dialog: dialog,
          setDialog: (dialog) => setDialog({ ...dialog, open: open }),
        }}
        title="Alert"
        content={"Do you really want to delete ?"}
        action={{ first: "Yes", second: "No" }}
      />
      <IconButton
        sx={{
          color: "white",
          top: "-167px",
          float: "right",
          "& svg": {
            fontSize: "35px",
          },
        }}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        sx={{
          "& .MuiPaper-root": {
            translate: "-80% 0",
          },
        }}
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "12ch",
            margin: "5px",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => handleItemClick(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {snackbar}
    </div>
  );
}
