import { useEffect, useState } from "react";

import "../../responsive.css";
import "./EventCard.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Button,
  styled,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Snackbar,
} from "@mui/material";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import { TbTargetArrow } from "react-icons/tb";
import { Link } from "react-router-dom";
import Editbtn from "../Editbtn/Editbtn";
import OpenModel from "../OpenModel/OpenModel";
import ContentService from "../../services/ContentService";
import dateFormatter, {
  addTime,
  convertTo12HourFormat,
  isPastDateTime,
} from "../../utils/DateFormatter";
import EventService from "../../services/EventService";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";

const EventCard = (props) => {
  const [active, setActive] = useState(props.event.events.active);
  const [snackbar, setSnackbar] = useState(null);
  const [open, setOpen] = useState(false);
  const [userMail, setUserMail] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setSnackbar(null);
    }, 3000);
  }, [snackbar]);
  const BootstrapButton = styled(Button)({
    backgroundColor: "#ff970a",
    width: "80%",
    color: "white",
    "&:hover": {
      backgroundColor: "#f7542b",
    },
  });

  const CustomLink = styled(Link)(({ theme }) => ({
    color: "#ffffff",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  }));

  function debounce(func, delay) {
    let timeoutId;

    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  function downloadedPpt() {
    console.log(props.event.events.id, userMail);
    const data = {
      email: userMail,
      eventId: props.event.events.id,
    };
    const contentService = new ContentService();
    contentService
      .downloadPpt(data)
      .then((res) =>
        setSnackbar(
          <SnackbarComponent
            message="You will quickly receive the PPT"
            severity={"success"}
          />
        )
      )
      .catch((err) =>
        setSnackbar(
          <SnackbarComponent message="PPT not available." severity={"error"} />
        )
      );
    setOpen(false);
  }

  function updateEventStatus(eventId, data) {
    const eventService = new EventService();
    eventService
      .updateEvent(eventId, data)
      .then((response) => {
        setSnackbar(
          <SnackbarComponent
            message="Event status changed !"
            severity="success"
          />
        );
      })
      .catch((error) => {
        setSnackbar(
          <SnackbarComponent message="Something went wrong" severity="error" />
        );
      });
  }

  function handleEventStatus(event) {
    setActive(!active);
    console.log(event);
  }

  const formattedDate = dateFormatter(props.event.events.date);
  const startTime = convertTo12HourFormat(props.event.events.time);
  const endTime = addTime(startTime, props.event.events.duration);
  const formattedTime = `${
    startTime[1] === ":" ? "0" + startTime : startTime
  } to ${endTime}`;

  const isOutdated = isPastDateTime(formattedDate, props.event.events.time);

  return (
    <>
      {snackbar}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Email Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            PPT will be sent on this Email Address
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="usersEmail"
            name="usersEmail"
            label="Email Address"
            type="email"
            value={userMail}
            fullWidth
            required
            variant="standard"
            onChange={(e) => setUserMail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={downloadedPpt}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Card
        className="cardeffect"
        sx={{
          paddingBottom: 6,
          width: 350,
          my: 0.8,
          mx: 2,
          position: "relative",
        }}
      >
        {!props.isEventPage && (
          <Stack
            left={120}
            bottom={20}
            spacing={1}
            direction={"row"}
            alignItems={"center"}
            position={"absolute"}
            sx={{ cursor: "pointer" }}
            onClick={() => handleEventStatus(props.event.events)}
          >
            {active ? (
              <ToggleOnOutlinedIcon sx={{ fontSize: "30px", color: "green" }} />
            ) : (
              <ToggleOffOutlinedIcon sx={{ fontSize: "30px", color: "red" }} />
            )}
            <Typography>{active ? "Active" : "Inactive"}</Typography>
          </Stack>
        )}
        {isOutdated ? "" : <button className="viewbtn">Live</button>}
        <CardMedia
          component="img"
          height="180"
          image={props.event.events.eventBanner}
          alt="Event Banner"
        />
        {!props.isEventPage && (
          <Box>
            <Editbtn
              setLoading={props.setLoading}
              event={props.event}
              setEditEvent={props.setEditEvent}
              setEventEditing={props.setEventEditing}
              setUpdateBread={props?.setUpdateBread}
            />
          </Box>
        )}
        {isOutdated ? (
          <Button className="downloadbutton" onClick={() => setOpen(true)}>
            <FileDownloadIcon />
          </Button>
        ) : null}
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography gutterBottom variant="h6" fontWeight={600}>
            {props.event.events.title}
          </Typography>
          <Typography fontWeight={600} py={1} mt={-1}>
            Agenda -
          </Typography>

          <Box fontSize={"5px"} marginBottom={3}>
            {
              <ul className="agenda-list">
                {props.event.events.description.split(",").length < 2
                  ? props.event.events.description.split(",").map((e, k3) => (
                      <li key={k3}>
                        <span>{e}</span>
                      </li>
                    ))
                  : props.event.events.description.split(",").map((e, k4) => (
                      <li key={k4} style={{ fontSize: "10px" }}>
                        <TbTargetArrow className="agenda-icon" />
                        <span>{e}</span>
                      </li>
                    ))}
              </ul>
            }
          </Box>
          <Box className="margintopforui" sx={{ mt: "100 " }}>
            <Stack direction="row" alignItems="center">
              <Typography
                color="#f37d47"
                marginX={1}
                marginY={-1}
                fontSize={18}
              >
                <i className="bx bxs-calendar"></i>
              </Typography>
              <Typography>
                {formattedDate.day} {formattedDate.monthName}{" "}
                {formattedDate.year}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography color="#f37d47" marginX={1} fontSize={18}>
                <i className="bx bx-time"></i>
              </Typography>
              <Typography>{formattedTime}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography color="#f37d47" marginX={1} fontSize={18}>
                <i className="bx bx-microphone"></i>
              </Typography>
              <Typography>
                {props.event?.events.speaker?.name},{" "}
                {props.event?.events.speaker?.designation}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
        {props.isEventPage && (
          <CardActions>
            {isOutdated ? (
              <Button
                sx={{
                  backgroundColor: "gray",
                  cursor: "default",
                  color: "lightgray",
                  position: "absolute",
                  width: "80%",
                  bottom: "4.5%",
                  // paddingX: "20px",
                  right: "calc(25% - 50px)",
                  "&:hover": { backgroundColor: "gray" },
                }}
              >
                Expired
              </Button>
            ) : (
              <BootstrapButton
                sx={{
                  position: "absolute",
                  bottom: "2%",
                  right: "calc(25% - 50px)",
                  marginBottom: "12px",
                }}
              >
                <CustomLink to={`/${props.event.events.id}`}>
                  Register
                </CustomLink>
              </BootstrapButton>
            )}
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default EventCard;
