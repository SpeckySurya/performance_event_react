import React, { useEffect, useState } from "react";
import EventForm from "../../components/EventForm/EventForm";
import "./DashboardPage.css";
import NotifyParticipant from "../../components/NotifyParticipant/NotifyParticipant";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Box, Stack } from "@mui/material";
import EventCard from "../../components/EventCard/EventCard";
import EventService from "../../services/EventService";
import HomePageConfiguration from "../../components/HomePageConfiguration/HomePageConfiguration";
import ManageSpeaker from "../../components/ManageSpeaker/ManageSpeaker";
import ManageUser from "../../components/ManageUser/ManageUser";
import { useNavigate } from "react-router-dom";
import SpeakerService from "../../services/SpeakerService";
import ShowSpeaker from "../../components/ShowSpeaker/ShowSpeaker";

const formDataDefault = {
  title: "",
  description: "",
  time: "",
  meetingUrl: "",
  location: "",
  active: false,
  activeHomePage: false,
  contactTo: "",
  speakerId: 0,
  duration: { hours: 0, minutes: 0 },
};

export const DashboardPage = () => {
  const [selected, setSelected] = useState("show");
  const [events, setEvents] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      navigate("/login");
    }
    const eventService = new EventService();
    eventService.getAllEvents().then((response) => {
      setEvents(response.data);
    });
    const speakerService = new SpeakerService();
    speakerService.getAllSpeakers().then((response) => {
      setSpeakers(response.data);
    });
  }, []);

  function handleSidebar(data) {
    setSelected(data);
  }

  function menuComponentFinder() {
    switch (selected) {
      case "create":
        return (
          <EventForm
            formDataDefault={formDataDefault}
            speakers={speakers}
            formTitle="Create an Event"
          />
        );
      case "show":
        events.map((event) => {
          event["speaker"] = speakers.find(
            (speaker) => speaker.id === event.id
          );
        });
        return <EventCard events={events} isEventPage={false} />;
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

  return (
    <>
      <AdminHeader handleSidebar={handleSidebar} />
      <Box padding={5}>
        <Box margin={"auto"}>{menuComponentFinder()}</Box>
      </Box>
    </>
  );
};
