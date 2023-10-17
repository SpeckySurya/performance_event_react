import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import EventForm from "../../components/EventForm/EventForm";
import NotifyParticipant from "../../components/NotifyParticipant/NotifyParticipant";
import UploadVideoAndPdf from "../../components/UploadVideoAndPdf/UploadVideoAndPdf";
import "./DashboardPage.css";

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
import { useNavigate } from "react-router-dom";
import AdminRegistration from "../../components/AdminRegistation/AdminRegistation";
import AdminUpdatePassword from "../../components/AdminUpdatePassword/AdminUpdatePassword";
import HomePageConfiguration from "../../components/HomePageConfiguration/HomePageConfiguration";
import ManageAdmin from "../../components/ManageAdmin/ManageAdmin";
import ManageSpeaker from "../../components/ManageSpeaker/ManageSpeaker";
import ManageUser from "../../components/ManageUser/ManageUser";
import ShowEvent from "../../components/ShowEvent/ShowEvent";
import ShowSpeaker from "../../components/ShowSpeaker/ShowSpeaker";
import EventService from "../../services/EventService";
import SpeakerService from "../../services/SpeakerService";
import {
  alertBeforeExpireTime,
  expireTime,
  stopTimer,
} from "../../utils/Constant";
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

const speakerInitialValue = {
  twitterUrl: "",
  name: "",
  designation: "",
  linkdinUrl: "",
  aboutSpeaker: "",
  email: "",
  youtubeUrl: "",
};

export const DashboardPage = () => {
  const [selected, setSelected] = useState("show");
  const [events, setEvents] = useState([]);
  const [updateSpeaker, setUpdateSpeaker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speakers, setSpeakers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateBread, setUpdateBread] = useState(false);

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
      setUpdateBread(false);
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
    show: updateBread ? "Show Event / Update Event" : "Show Event",
    homeConfig: "Home Configuration",
    manageSpeaker: "Create Speaker",
    notify: "Notify Participant",
    manageUser: "Manage User",
    showSpeaker: "Show Speaker",
    AdminUpdatePassword: "Change Password",
    UploadVideoAndPdf: "Upload Files",
    AdminRegistration: "User Registration",
    manageAdmin: "Manage Users & Roles",
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
            setUpdateBread={setUpdateBread}
            isEventPage={false}
          />
        );
      case "homeConfig":
        return <HomePageConfiguration />;
      case "manageSpeaker":
        return (
          <ManageSpeaker
            title="Create"
            setSelected={setSelected}
            speakerInitialValue={speakerInitialValue}
          />
        );
      case "notify":
        return <NotifyParticipant events={events} />;
      case "manageUser":
        return <ManageUser events={events} />;
      case "showSpeaker":
        return (
          <ShowSpeaker
            updateSpeaker={updateSpeaker}
            setSelected={setSelected}
            setUpdateSpeaker={setUpdateSpeaker}
            speakerInitialValue={speakerInitialValue}
          />
        );
      case "UploadVideoAndPdf":
        return <UploadVideoAndPdf />;
      case "AdminUpdatePassword":
        return <AdminUpdatePassword />;
      case "AdminRegistration":
        return <AdminRegistration setSelected={setSelected} />;
      case "manageAdmin":
        return <ManageAdmin />;
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
          Dashboard / {breadCrump[selected]}
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
