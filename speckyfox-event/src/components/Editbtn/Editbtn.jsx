import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EventService from "../../services/EventService";

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 40;

export default function Editbtn(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleItemClick = (option) => {
    switch (option) {
      case "Edit": {
        props.setEventEditing(true);
        props.setEditEvent(props.event);
        break;
      }
      case "Delete": {
        alert("Do you really want to delete " + props.event.events.id);
        const choice = prompt("Do you really want to delete");
        if (choice) {
          const eventService = new EventService();
          eventService
            .deleteEvent(props.event.events.id)
            .then((response) => {
              if (response) {
                alert(props.event.events.title + " deleted succesfully !");
              } else {
                alert("Something went wrong !");
              }
            })
            .catch((error) => {
              alert(error);
            });
        }
        break;
      }
    }
  };

  return (
    <div>
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
    </div>
  );
}
