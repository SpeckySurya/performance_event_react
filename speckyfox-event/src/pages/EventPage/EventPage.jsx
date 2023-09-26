import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import EventService from "../../services/EventService";
import Footer from "../../components/Footer/Footer";
import { LinearProgress } from "@mui/material";
import HomeConfigService from "../../services/HomeConfigService";
import ShowEvent from "../../components/ShowEvent/ShowEvent";
const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homeConfig, setHomeConfig] = useState({});

  useEffect(() => {
    const eventService = new EventService();
    eventService.getAllActiveEvents().then((response) => {
      setLoading(false);
      setEvents(response.data);
    });
    const homeConfiService = new HomeConfigService();
    homeConfiService.getHomeConfig().then((response) => {
      setHomeConfig(response.data);
    });
  }, []);

  return loading ? (
    <LinearProgress color="error" />
  ) : (
    <div className="event-page-container">
      <Header homeConfig={homeConfig} />
      <ShowEvent events={events} isEventPage={true} />
      <Footer homeConfig={homeConfig} />
    </div>
  );
};

export default EventPage;
