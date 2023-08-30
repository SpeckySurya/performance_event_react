import React, { useEffect, useState } from "react";
import EventForm from "../../components/EventForm/EventForm";
import "./DashboardPage.css";
import NotifyParticipant from "../../components/NotifyParticipant/NotifyParticipant";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Typography,
} from "@mui/material";
import EventCard from "../../components/EventCard/EventCard";
import EventService from "../../services/EventService";
import HomePageConfiguration from "../../components/HomePageConfiguration/HomePageConfiguration";
import ManageSpeaker from "../../components/ManageSpeaker/ManageSpeaker";
import ManageUser from "../../components/ManageUser/ManageUser";
import { useNavigate } from "react-router-dom";
import SpeakerService from "../../services/SpeakerService";
import ShowSpeaker from "../../components/ShowSpeaker/ShowSpeaker";
import {
  alertBeforeExpireTime,
  expireTime,
  stopTimer,
} from "../../utils/Constant";
import { TbRuler2Off } from "react-icons/tb";
import ShowEvent from "../../components/ShowEvent/ShowEvent";

const formDataDefault = {
  title: "",
  description: "",
  time: "",
  meetingUrl: "",
  location: "",
  date: "",
  active: false,
  acceptRegistration: false,
  contactTo: "",
  speakerId: 0,
  duration: { hours: 0, minutes: 0 },
};

export const DashboardPage = () => {
  const [selected, setSelected] = useState("show");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [speakers, setSpeakers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const initialSetup = () => {
    const eventService = new EventService();
    eventService.getAllEvents().then((response) => {
      setEvents(response.data);
      setLoading(false);
    });
    const speakerService = new SpeakerService();
    speakerService.getAllSpeakers().then((response) => {
      setSpeakers(response.data);
    });
  };

  useEffect(() => {
    setLoading(true);
    initialSetup();
  }, []);

  useEffect(() => {
    if (selected === "show" || update) {
      initialSetup();
      setUpdate(false);
    }
  }, [selected, update]);

  useEffect(() => {
    setTimeout(() => setOpen(true), expireTime() - alertBeforeExpireTime());
    if (sessionStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, []);

  function handleSidebar(data) {
    setSelected(data);
  }

  const breadCrump = {
    create: "Create Event",
    show: "Show Event",
    homeConfig: "Home Configuration",
    manageSpeaker: "Manage Speaker",
    notify: "Notify Participant",
    manageUser: "Manage User",
    showSpeaker: "Show Speaker",
  };

  function menuComponentFinder() {
    switch (selected) {
      case "create":
        return (
          <EventForm
            formDataDefault={formDataDefault}
            speakers={speakers}
            setSelected={setSelected}
            formTitle="Create"
          />
        );
      case "show":
        events.map((event) => {
          event["speaker"] = speakers.find(
            (speaker) => speaker.id === event.id
          );
        });
        return (
          <ShowEvent
            setLoading={setLoading}
            events={events}
            setUpdate={setUpdate}
            isEventPage={false}
          />
        );
      case "homeConfig":
        return <HomePageConfiguration />;
      case "manageSpeaker":
        return <ManageSpeaker />;
      case "notify":
        return <NotifyParticipant events={events} />;
      case "manageUser":
        return <ManageUser events={events} />;
      case "showSpeaker":
        return <ShowSpeaker />;
      default:
        return null;
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginAgain = () => {
    sessionStorage.removeItem("token");
    stopTimer();
    navigate("/login");
  };

  return (
    <>
      {loading && <LinearProgress color="error" sx={{ zIndex: 10 }} />}
      <AdminHeader handleSidebar={handleSidebar} />
      <Box paddingY={10} paddingX={3}>
        <Typography fontWeight={"bolder"}>
          Home / {breadCrump[selected]}
        </Typography>
        <Box margin={"auto"}>{menuComponentFinder()}</Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alert !</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will be automatically logout in 5 minutes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginAgain}>Login Again</Button>
          <Button onClick={handleClose} autoFocus>
            Stay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
