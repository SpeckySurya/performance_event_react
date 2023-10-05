import { useEffect, useRef, useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import "../../responsive.css";
import "./EventCard.css";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import "../../assets/banner.png";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { TbTargetArrow } from "react-icons/tb";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import ContentService from "../../services/ContentService";
import EventService from "../../services/EventService";
import dateFormatter, {
  addTime,
  convertTo12HourFormat,
  isPastDateTime,
} from "../../utils/DateFormatter";
import ShortDateFormatter, {
  addTimes,
  convertTo12HourFormats,
  isPastDateTimes,
} from "../../utils/ShortDataFormatter";
import { findRoleFromToken } from "../../utils/TokenDecoder";
import Editbtn from "../Editbtn/Editbtn";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
const EventCard = (props) => {
  const [active, setActive] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [open, setOpen] = useState(false);
  const [userMail, setUserMail] = useState("");
  const [play, setPlay] = useState(false);
  const [eventData, setEventData] = useState({});
  const [countdown, setCountdown] = useState("");
  const videoPlayerRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (videoPlayerRef.current && !videoPlayerRef.current.contains(e.target)) {
      setPlay(false);
    }
  };
  useEffect(() => {
    setActive(props.event.events.active);
  }, [props.event]);
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [play]);
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

  function downloadedPpt() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userMail.trim() || !emailRegex.test(userMail)) {
      setSnackbar(
        <SnackbarComponent
          message="Please enter a valid email address."
          severity={"error"}
        />
      );
      return;
    }
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

  function handleEventStatus(event) {
    const eventService = new EventService();
    eventService
      .setActiveOrInactive(event.id, { active: !active })
      .then((response) => {
        setActive(!active);
      })
      .catch((error) => {
        setSnackbar(
          <SnackbarComponent message="Action Restricted !" severity={"error"} />
        );
      });
  }

  function handlePlayVideo() {
    const contentService = new ContentService();
    contentService
      .getEventDataInfo(props.event.events.id)
      .then((response) => {
        setEventData(response.data);
        setPlay(true);
      })
      .catch((error) => {
        setSnackbar(
          <SnackbarComponent
            message="Video not available !"
            severity={"error"}
          />
        );
      });
  }

  const formattedDate = dateFormatter(props.event.events.date);
  const shortdata = ShortDateFormatter(props.event.events.date);

  const startTime = convertTo12HourFormat(props.event.events.time);
  const endTime = addTime(startTime, props.event.events.duration);
  const formattedTime = `${
    startTime[1] === ":" ? "0" + startTime : startTime
  } to ${endTime}`;

  const isOutdated = isPastDateTime(formattedDate, props.event.events.time);

  const EventDate = props.event.events.date;
  const parsedDate = new Date(EventDate);

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth();
  const day = parsedDate.getDate();
  const EventTime = props.event.events.time;

  const timeComponents = EventTime.split(":");

  if (timeComponents.length >= 3) {
    const hours = parseInt(timeComponents[0]);
    const minutes = parseInt(timeComponents[1]);
    const seconds = parseFloat(timeComponents[2]);

    parsedDate.setHours(hours);
    parsedDate.setMinutes(minutes);
    parsedDate.setSeconds(seconds);
  }

  const currentDateTime = new Date();

  const currentTime = new Date();
  const timeDifference = parsedDate - currentTime;
  const eventDate = new Date(props.event.events.date);
  const eventTime = props.event.events.time;

  // Combine the date and time to create the eventDateTime
  const eventDateTime = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate(),
    parseInt(eventTime.split(":")[0], 10),
    parseInt(eventTime.split(":")[1], 10),
    0
  );
  function updateCountdown() {
    const timeDifference = eventDateTime - new Date();

    if (timeDifference <= 0) {
      setCountdown("Event has started.");
      clearInterval(countdownInterval);
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      setCountdown(countdownText); // Update the countdown state
    }
  }

  useEffect(() => {
    updateCountdown();
  }, []);

  const countdownInterval = setInterval(updateCountdown, 1000);

  return (
    <>
      {snackbar}
      {play && (
        <Box
          ref={videoPlayerRef}
          sx={{
            position: "fixed",
            zIndex: 5,
          }}
        >
          <ReactPlayer url={eventData.video} controls />
        </Box>
      )}
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
      <div className="parantcontainer">
        <div className="container">
          <div className="box">
            <div className="imgBx">
              <img src={props.event.events.eventBanner} alt="err" />
            </div>
            {isOutdated ? (
              ""
            ) : (
              <div className="countdown">
                <h6>{countdown}</h6>
              </div>
            )}

            <div className="dateovercard">
              {" "}
              <h6> {formattedDate.day} </h6>
              <h5>{shortdata.monthName}</h5>
            </div>
            <div className="content">
              <h4>{props.event.events.title}</h4>
              <Typography fontWeight={600} py={1} mt={-1}>
                Agenda -
              </Typography>
              <Box fontSize={"5px"} marginBottom={3}>
                {
                  <ul className="agenda-list">
                    {props.event.events.description.split(",").length < 2
                      ? props.event.events.description
                          .split(",")
                          .map((e, k3) => (
                            <li key={k3}>
                              <span>{e}</span>
                            </li>
                          ))
                      : props.event.events.description
                          .split(",")
                          .map((e, k4) => (
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
            </div>
            <div className="databottomcard">
              {props.isEventPage && isOutdated ? (
                <>
                  <Button
                    title="Download PPT"
                    className="downloadbutton"
                    onClick={() => setOpen(true)}
                  >
                    <FileDownloadIcon />
                    <Typography
                      sx={{ fontSize: 10 }}
                      className="downloadedppttext"
                    >
                      Download PPT
                    </Typography>
                  </Button>
                </>
              ) : null}
              {isOutdated && (
                <Box title="Watch recording" onClick={handlePlayVideo}>
                  <PlayCircleFilledIcon
                    sx={{
                      position: "absolute",
                      opacity: "0.7",
                      top: "14%",
                      left: "28%",
                      fontSize: "40px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              )}
              <div className="dateinsidedatabottomcard">
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
                      <ToggleOnOutlinedIcon
                        sx={{ fontSize: "30px", color: "green" }}
                      />
                    ) : (
                      <ToggleOffOutlinedIcon
                        sx={{ fontSize: "30px", color: "red" }}
                      />
                    )}
                    <Typography>{active ? "Active" : "Inactive"}</Typography>
                  </Stack>
                )}
                {/* <Stack direction="row" alignItems="center" marginBottom={4}>
                  <Typography
                    color="#f37d47"
                    marginX={1}
                    marginY={1}
                    fontSize={20}
                  >
                    <i className="bx bxs-calendar"></i>
                  </Typography>
                  <Typography>
                    {formattedDate.day} {formattedDate.monthName}{" "}
                    {formattedDate.year}
                  </Typography>
                </Stack> */}
              </div>

              <div className="registerinsidedatabottomcard">
                {!props.isEventPage && findRoleFromToken() !== "VIEWER" && (
                  <Box
                    className="editbutton"
                    sx={{ position: "absolute", top: "8%" }}
                  >
                    <Editbtn
                      setLoading={props.setLoading}
                      event={props.event}
                      setEditEvent={props.setEditEvent}
                      setEventEditing={props.setEventEditing}
                      setUpdateBread={props?.setUpdateBread}
                    />
                  </Box>
                )}
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
                          bottom: "15%",
                          right: "calc(25% - 50px)",
                          "&:hover": { backgroundColor: "gray" },
                        }}
                      >
                        Expired
                      </Button>
                    ) : (
                      <CustomLink to={`/${props.event.events.id}`}>
                        <BootstrapButton
                          sx={{
                            position: "absolute",
                            bottom: "20%",
                            right: "calc(25% - 50px)",
                            marginBottom: "12px",
                          }}
                        >
                          Register
                        </BootstrapButton>
                      </CustomLink>
                    )}
                  </CardActions>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
