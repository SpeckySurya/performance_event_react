import React, { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import { Header } from "../../components/Header/Header";
import EventService from "../../services/EventService";
import Footer from "../../components/Footer/Footer";
import { LinearProgress } from "@mui/material";
import SpeakerService from "../../services/SpeakerService";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eventService = new EventService();
    eventService.getAllActiveEvents().then((response) => {
      setLoading(false);
      console.log(response.data);
      setEvents(response.data);
    });
  }, []);

  // function findSpeaker() {
  //   events.map((event) => {
  //     event["speaker"] = speakers.find((speaker) => speaker.id === event.id);
  //   });
  //   console.log(speakers);
  //   console.log(events);
  //   return events;
  // }

  return loading ? (
    <LinearProgress color="error" />
  ) : (
    <div>
      <Header />
      <EventCard events={events} isEventPage={true} />
      <Footer />
    </div>
  );
};

export default EventPage;
