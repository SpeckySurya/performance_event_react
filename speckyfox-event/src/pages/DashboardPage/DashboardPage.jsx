import React, { useEffect, useState } from "react";
import EventForm from "../../components/EventForm/EventForm";
import "./DashboardPage.css";
import NotifyParticipant from "../../components/NotifyParticipant/NotifyParticipant";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Box, Stack } from "@mui/material";
import EventCard from "../../components/EventCard/EventCard";
import EventService from "../../services/EventService";
import HomePageConfiguration from "../../components/HomePageConfiguration/HomePageConfiguration";

const formDataDefault = {
  title: "",
  description: "",
  date: "",
  time: "",
  eventBanner: "",
  meetingUrl: "",
  location: "",
  active: false,
  activeHomePage: false,
};

const eventDuration = { hours: 0, minutes: 15 };

export const DashboardPage = () => {
  const [selected, setSelected] = useState("show");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventService = new EventService();
    eventService.getAllEvents().then((response) => {
      setEvents(response.data);
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
            eventDuration={eventDuration}
            formTitle="Create an Event"
          />
        );
      case "show":
        return <EventCard events={events} isEventPage={false} />;
      case "homeConfig":
        return <HomePageConfiguration />;
      case "notify":
        return <NotifyParticipant events={events} />;
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
