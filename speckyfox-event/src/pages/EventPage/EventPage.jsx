import React, { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import { Header } from "../../components/Header/Header";
import EventService from "../../services/EventService";
import Footer from "../../components/Footer/Footer";

const EventPage = () => {
  let [events, setEvents] = useState([]);

  useEffect(() => {
    const eventService = new EventService();
    eventService.getAllEvents().then((response) => setEvents(response.data));
  }, []);
  return (
    <div>
      <Header />
      <EventCard events={events} />
      <Footer />
    </div>
  );
};

export default EventPage;
