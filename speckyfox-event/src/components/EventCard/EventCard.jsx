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
  CardActions,
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
import "react-multi-carousel/lib/styles.css";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import "../../assets/banner.png";
import "../../responsive.css";
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

import "./EventCard.css";
/**
 *
 * This component EventCard Component Related to card Api data is placed over card is here .
 *
 * @returns EventCard
 */

const EventCard = (props) => {
  const [active, setActive] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [open, setOpen] = useState(false);
  const [userMail, setUserMail] = useState("");
  const [play, setPlay] = useState(false);
  const [eventData, setEventData] = useState({});
  const [countdown, setCountdown] = useState("");
  const [watchedvideo, setWatchVideo] = useState(false);
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
        setWatchVideo(true);
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

  return (
    <>
      {snackbar}
      {play && (
        <Box
          ref={videoPlayerRef}
          sx={{
            position: "fixed",
            top: "20%",
            zIndex: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            width: "100%",
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

      <div className="parentscuntaner">
        <div className="imageContainer">
          <img src={props.event.events.eventBanner} alt="err" />
        </div>
        <div className="dataContainer">
          <h4>{props.event.events.title}</h4>
          <div className="leftrightsidecuntaner">
            <div className="LeftSideData">
              {" "}
              {props.isEventPage && (
                <CardActions>
                  {isOutdated ? (
                    <Button
                      sx={{
                        backgroundColor: "gray",
                        cursor: "default",
                        color: "lightgray",
                        borderRadius: "20px",
                        marginBottom: "12px",
                        fontSize: "12px",
                        width: "100px",
                        top: "20%",

                        "&:hover": { backgroundColor: "gray" },
                      }}
                    >
                      Expired
                    </Button>
                  ) : (
                    <CustomLink to={`/${props.event.events.id}`}>
                      <BootstrapButton
                        sx={{
                          top: "20%",
                          width: "100px",
                          borderRadius: "20px",
                          marginBottom: "12px",
                          fontSize: "12px",
                          backgroundColor: "#ffbe0a",
                        }}
                      >
                        Register
                      </BootstrapButton>
                    </CustomLink>
                  )}
                </CardActions>
              )}
            </div>

            <div className="RightSideData">
              {" "}
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
              <Stack direction="row" alignItems="center">
                <Typography
                  color="#FFBE0A"
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
              </Stack>
            </div>
          </div>
          <div className="discruption">
            <Typography fontWeight={600} py={0} mt={-1}>
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
          </div>
          <div className="bottomdiv">
            <>
              <Box
                className="margintopforui"
                sx={{ mt: "100 ", justifyContent: "space-between" }}
              >
                <Stack direction="row" alignItems="center">
                  <Typography color="#FFBE0A" marginX={1} fontSize={18}>
                    <i className="bx bx-time"></i>
                  </Typography>
                  <Typography fontSize={12}>{formattedTime}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <Typography color="#FFBE0A" marginX={1} fontSize={18}>
                    <i className="bx bx-microphone"></i>
                  </Typography>
                  <Typography fontSize={12}>
                    {props.event?.events.speaker?.name},{" "}
                    {props.event?.events.speaker?.designation}
                  </Typography>
                </Stack>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: "3%",
                  px: "3%",
                }}
              >
                {isOutdated && (
                  <div className="watchvideobutton">
                    {watchedvideo ? (
                      <button
                        className="AvalablevideoButton"
                        title="Play recorded video"
                        onClick={handlePlayVideo}
                      >
                        Watch Video
                      </button>
                    ) : (
                      <button
                        className="PastVideoButton"
                        title="Play recorded video"
                        onClick={handlePlayVideo}
                      >
                        Watch Video
                      </button>
                    )}
                  </div>
                )}

                {props.isEventPage && isOutdated ? (
                  <div className="downloadedPPTBox">
                    <button
                      title="Download PPT"
                      className="downloadPPTbutton"
                      onClick={() => setOpen(true)}
                    >
                      Download PDF
                    </button>
                  </div>
                ) : null}
              </Box>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
