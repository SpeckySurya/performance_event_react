import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PageviewIcon from "@mui/icons-material/Pageview";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { Box, ToggleButton, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useContext, useEffect, useRef, useState } from "react";
import { TbTargetArrow } from "react-icons/tb";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BrushIcon from "@mui/icons-material/Brush";
import dateFormatter, {
  addTime,
  convertTo12HourFormat,
  isPastDateTime,
} from "../../utils/DateFormatter";
import "./DashboardEventCard.css";
import EventService from "../../services/EventService";
import SnackbarComponent from "../../components/SnackbarComponent/SnackbarComponent";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import ContentService from "../../services/ContentService";
import MyContext from "../../context/MyContext";
import PopupAlert from "../../components/PopupAlert/PopupAlert";
import {
  findEmailFromToken,
  findRoleFromToken,
} from "../../utils/TokenDecoder";
import { useSnackbar } from "material-ui-snackbar-provider";
import upcomingGif from "../../assets/upcoming.gif";
import Role from "../../utils/Role";
import CustomDialog from "../CustomDialogBox/CustomDialog";

const EventPaper = styled(Paper)(() => ({
  width: 400,
  height: 300,
  minHeight: 300,
  border: "solid 1px whitesmoke",
  borderRadius: 10,
  boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
  background: "whitesmoke",
  position: "relative",
}));

const CustomPaper = styled(Paper)(() => ({
  width: "50%",
  padding: 10,
  border: "1px #F5F5F5 solid",
}));
const CustomPaper2 = styled(Paper)(() => ({
  padding: 10,
  border: "1px #F5F5F5 solid",
  width: 100,
}));

const snackbarMsg = "Not allowed !";

export default function DashboardEventCard({ event, initialSetup }) {
  const role = findRoleFromToken();

  const formattedDate = dateFormatter(event.events.date);
  const isOutdated = isPastDateTime(formattedDate, event.events.time);
  const startTime = convertTo12HourFormat(event.events.time);
  const endTime = addTime(startTime, event.events.duration);
  const [dialog, setDialog] = useState({
    open: false,
    action: null,
    title: "",
    content: "",
  });

  const formattedTime = `${
    startTime[1] === ":" ? "0" + startTime : startTime
  } to ${endTime}`;
  const [active, setActive] = useState(event.events.active);
  const [agendaVisible, setAgendaVisible] = useState("-65%");
  const [snackbar, setSnackbar] = useState(null);
  const [play, setPlay] = useState(false);
  const [eventData, setEventData] = useState({});
  const navigate = useNavigate();
  const videoPlayerRef = useRef(null);
  const { context } = useContext(MyContext);
  const SnackbarProvider = useSnackbar();
  const [customDialog, setCustomDialog] = useState({
    open: false,
    action: null,
    title: "",
    content: "",
  });

  function handleViewDescriptionClick(e) {
    e.stopPropagation();
    setAgendaVisible("0");
  }

  function handleEventPaperClick(e) {
    e.stopPropagation();
    setAgendaVisible("-65%");
  }

  function handleAgendaBoxClick(e) {
    e.stopPropagation();
  }

  function handleEventStatus(event) {
    if (role === Role.VIEWER) {
      SnackbarProvider.showMessage(snackbarMsg);
      return;
    }
    const eventService = new EventService();
    eventService
      .setActiveOrInactive(event.id, { active: !active })
      .then((response) => {
        setActive(!active);
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      setSnackbar(null);
    }, 3000);
  }, [snackbar]);

  function handlePlayVideo() {
    const contentService = new ContentService();
    contentService
      .getEventDataInfo(event.events.id)
      .then((response) => {
        setEventData(response.data);
        context.popUpBackground.setPopUpBackgroundVisible("default");
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

  const handleOutsideClick = (e) => {
    if (videoPlayerRef.current && !videoPlayerRef.current.contains(e.target)) {
      setPlay(false);
      context.popUpBackground.setPopUpBackgroundVisible("none");
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [play]);

  const handleEventEdit = () => {
    if (role === Role.VIEWER) {
      SnackbarProvider.showMessage(snackbarMsg);
      return;
    }
    navigate("/dashboard/events/edit-event", { state: { event: event } });
  };

  const handleEventDelete = () => {
    if (role === Role.VIEWER || role === Role.EDITOR) {
      SnackbarProvider.showMessage(snackbarMsg);
      return;
    }
    setDialog({
      ...dialog,
      open: true,
      title: "Alert",
      content: "Do you really want to delete ?",
    });
  };

  const handleUploadClick = () => {
    if (role === Role.VIEWER || role === Role.EDITOR) {
      SnackbarProvider.showMessage(snackbarMsg);
      return;
    }
    navigate("/dashboard/events/upload-event-data", {
      state: { event: event },
    });
  };

  function handleDownloadPPt() {
    setCustomDialog({
      open: true,
      title: "Alert",
      content:
        'PPT will send to your registered email. Press "Yes" to continue !',
      action: sentPPT,
    });
  }

  const handleNotifyParticipant = () => {
    if (role === Role.VIEWER) {
      SnackbarProvider.showMessage(snackbarMsg);
      return;
    }
    navigate("/dashboard/events/notify-participant", {
      state: { event: event },
    });
  };

  function sentPPT() {
    const data = {
      email: findEmailFromToken(),
      eventId: event.events.id,
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
  }

  useEffect(() => {
    if (dialog.action === "Yes") {
      const eventService = new EventService();
      eventService
        .deleteEvent(event.events.id)
        .then((response) => {
          if (response) {
            setSnackbar(
              <SnackbarComponent message="Event deleted" severity="success" />
            );
            initialSetup();
          } else {
            setSnackbar(
              <SnackbarComponent message="Event not deleted" severity="error" />
            );
          }
        })
        .catch((error) => {
          setSnackbar(
            <SnackbarComponent
              message="Something went wrong"
              severity="error"
            />
          );
        });
    }
  }, [dialog]);

  return (
    <Box m={1}>
      {snackbar}
      <CustomDialog
        customDialog={customDialog}
        setCustomDialog={setCustomDialog}
      />
      <PopupAlert
        control={{
          dialog: dialog,
          setDialog: (dialog) => setDialog({ ...dialog, open: false }),
        }}
        title={dialog.title}
        content={dialog.content}
        action={{ first: "Yes", second: "No" }}
      />
      {play && (
        <Box
          ref={videoPlayerRef}
          sx={{
            position: "fixed",
            zIndex: 999999,
            left: "calc(50% - 320px)",
            top: "calc(50vh - 180px)",
          }}
        >
          <ReactPlayer url={eventData.video} controls />
        </Box>
      )}
      <EventPaper
        onClick={handleEventPaperClick}
        variant="outlined"
        sx={{ overflow: "hidden" }}
      >
        <Box
          onClick={handleAgendaBoxClick}
          className="blur-box"
          sx={{ bottom: agendaVisible, zIndex: 99 }}
        >
          <Box className="agenda-admin-event custom-scroll">
            <Typography p={1} sx={{ fontWeight: 600 }}>
              Event Details
            </Typography>
            <Box>
              <Stack direction="row" alignItems="center">
                <Typography
                  color="#f37d47"
                  marginX={1}
                  marginY={-1}
                  fontSize={14}
                >
                  <i className="bx bxs-calendar"></i>
                </Typography>
                <Typography fontSize={14}>
                  {formattedDate.day} {formattedDate.monthName}{" "}
                  {formattedDate.year}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography color="#f37d47" marginX={1} fontSize={14}>
                  <i className="bx bx-time"></i>
                </Typography>
                <Typography fontSize={14}>{formattedTime}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography color="#f37d47" marginX={1} fontSize={14}>
                  <i className="bx bx-microphone"></i>
                </Typography>
                <Typography fontSize={14}>
                  {event?.events.speaker?.name},{" "}
                  {event?.events.speaker?.designation}
                </Typography>
              </Stack>
            </Box>
            <Typography p={1} sx={{ fontWeight: 600 }}>
              Agenda
            </Typography>
            <Box mx={2}>
              {
                <Stack>
                  {event.events.description.split(",").length < 2
                    ? event.events.description.split(",").map((e, k3) => (
                        <Typography key={k3} fontSize={14}>
                          <span>{e}</span>
                        </Typography>
                      ))
                    : event.events.description.split(",").map((e, k4) => (
                        <Typography key={k4} style={{ fontSize: "14px" }}>
                          <TbTargetArrow className="agenda-icon" />
                          <span>{e}</span>
                        </Typography>
                      ))}
                </Stack>
              }
            </Box>
          </Box>
        </Box>
        <Stack
          p={"20px"}
          height={"100%"}
          spacing={1}
          justifyContent={"space-between"}
        >
          <Stack spacing={1} direction={"row"} justifyContent={"space-between"}>
            <Stack spacing={2} width={"50%"}>
              <Stack>
                <Typography fontWeight={600}>{event.events.title}</Typography>
                <Stack
                  sx={{ cursor: "pointer" }}
                  spacing={"4px"}
                  direction={"row"}
                  alignItems={"center"}
                  onClick={handleViewDescriptionClick}
                >
                  <Typography
                    py={1}
                    sx={{ fontSize: "12px", fontStyle: "italic" }}
                  >
                    View Details
                  </Typography>
                  <KeyboardDoubleArrowRightIcon sx={{ fontSize: "12px" }} />
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ alignItems: "center" }}
              >
                <Typography width={"30%"} py={1} fontSize={12}>
                  Status
                </Typography>
                <Tooltip
                  title={"Click to " + (!active ? "Active" : "Inactive")}
                >
                  <ToggleButton
                    value="check"
                    sx={{
                      width: "70%",
                      height: 15,
                      cursor: role === Role.VIEWER ? "default" : "cursor",
                    }}
                    active={active}
                  >
                    <Stack
                      spacing={1}
                      direction={"row"}
                      onClick={() => handleEventStatus(event.events)}
                    >
                      <Typography fontSize={10}>
                        {active ? "Active" : "Inactive"}
                      </Typography>
                      {active ? (
                        <CheckIcon sx={{ fontSize: 16, color: "lightgreen" }} />
                      ) : (
                        <ClearIcon sx={{ fontSize: 16, color: "crimson" }} />
                      )}
                    </Stack>
                  </ToggleButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Stack spacing={1} width={"40%"} height={"180px"}>
              <Box variant="outlined" borderRadius={5} overflow={"hidden"}>
                <img
                  width={"100%"}
                  height={"100%"}
                  src={event.events.eventBanner}
                  alt="banner"
                />
              </Box>
              <Stack spacing={2} justifyContent={"end"} height={"100px"}>
                {!isOutdated ? (
                  <Stack spacing={"5px"} alignItems={"center"} height={"85%"}>
                    <img style={{ width: "80%" }} src={upcomingGif} />
                  </Stack>
                ) : (
                  <Stack spacing="5px">
                    <Tooltip title="Play recorded video">
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"end"}
                        spacing={1}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handlePlayVideo()}
                      >
                        <Typography
                          sx={{
                            borderRadius: 2,
                            fontSize: 10,
                            color: "#D80032",
                          }}
                        >
                          Watch Video
                        </Typography>
                        <PlayCircleFilledWhiteIcon
                          sx={{ color: "#D80032" }}
                          fontSize="10px"
                        />
                      </Stack>
                    </Tooltip>
                    <Tooltip title="Download event PPT">
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"end"}
                        spacing={1}
                        sx={{ cursor: "pointer" }}
                        onClick={handleDownloadPPt}
                      >
                        <Typography
                          sx={{
                            borderRadius: 2,
                            fontSize: 10,
                            color: "#219C90",
                          }}
                        >
                          Download PPT
                        </Typography>
                        <DownloadIcon
                          sx={{ color: "#219C90" }}
                          fontSize="10px"
                        />
                      </Stack>
                    </Tooltip>
                    <Tooltip title="Upload recorded video and PPT of event">
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"end"}
                        spacing={1}
                        sx={{
                          cursor: role === Role.VIEWER ? "default" : "pointer",
                        }}
                        onClick={handleUploadClick}
                      >
                        <Typography
                          sx={{
                            borderRadius: 2,
                            fontSize: 10,
                            color: "#A8DF8E",
                          }}
                        >
                          Upload
                        </Typography>
                        <CloudUploadIcon
                          sx={{ color: "#A8DF8E" }}
                          fontSize="10px"
                        />
                      </Stack>
                    </Tooltip>
                  </Stack>
                )}
                <Stack spacing={1} direction={"row"} justifyContent={"end"}>
                  <Tooltip title="Delete Event">
                    <Stack
                      onClick={handleEventDelete}
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 25,
                        height: 25,
                        borderRadius: "50%",
                        backgroundColor: "rgb(255,160,122, 0.5)",
                        cursor:
                          role === Role.VIEWER || role === Role.EDITOR
                            ? "default"
                            : "pointer",
                      }}
                    >
                      <DeleteForeverIcon
                        sx={{ fontSize: 20, color: "crimson" }}
                      />
                    </Stack>
                  </Tooltip>
                  <Tooltip title="Edit Event">
                    <Stack
                      onClick={handleEventEdit}
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 25,
                        height: 25,
                        borderRadius: "50%",
                        backgroundColor: "rgb(199, 234, 70, 0.5)",
                        cursor: role === Role.VIEWER ? "default" : "pointer",
                      }}
                    >
                      <BrushIcon sx={{ fontSize: 20, color: "#0B6623" }} />
                    </Stack>
                  </Tooltip>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            border={"1px #F5F5F5 solid"}
            borderRadius={2}
            direction={"row"}
            spacing={2}
          >
            <Stack
              justifyContent={"center"}
              direction={"row"}
              sx={{
                width: "50%",
              }}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  borderRadius: "50%",
                  height: 60,
                  width: 60,
                }}
              >
                <Typography fontWeight={600} fontSize={35}>
                  {event.events.users.length}
                </Typography>
                <Typography fontSize={12} whiteSpace={"nowrap"}>
                  Total Participant
                </Typography>
              </Stack>
            </Stack>
            <Stack
              justifyContent={"end"}
              alignItems={"center"}
              width={"50%"}
              spacing={1}
              direction={"row"}
            >
              <CustomPaper2
                variant="outlined"
                sx={{ backgroundColor: "#CBFFA9", cursor: "pointer" }}
                onClick={() =>
                  navigate("/dashboard/events/manage-participant", {
                    state: event,
                  })
                }
              >
                <Tooltip title="View registered participant">
                  <Stack alignItems={"center"} justifyContent={"center"}>
                    <PageviewIcon sx={{ color: "#8EAC50" }} />
                    <Typography
                      textAlign={"center"}
                      color={"#8EAC50"}
                      fontSize={10}
                    >
                      Participants
                    </Typography>
                  </Stack>
                </Tooltip>
              </CustomPaper2>
              {isOutdated && (
                <CustomPaper2
                  variant="outlined"
                  sx={{
                    backgroundColor: "#A6F6FF",
                    cursor: role === Role.VIEWER ? "default" : "pointer",
                  }}
                  onClick={handleNotifyParticipant}
                >
                  <Tooltip title="Send reminder email to participants">
                    <Stack alignItems={"center"} justifyContent={"center"}>
                      <NotificationsActiveIcon sx={{ color: "#6499E9" }} />
                      <Typography
                        textAlign={"center"}
                        color={"#6499E9"}
                        fontSize={10}
                      >
                        Notify
                      </Typography>
                    </Stack>
                  </Tooltip>
                </CustomPaper2>
              )}
            </Stack>
          </Stack>
        </Stack>
      </EventPaper>
    </Box>
  );
}
