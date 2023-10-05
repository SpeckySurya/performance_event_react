import { LinearProgress } from "@mui/material";
import "./EventPage.css";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import ShowEvent from "../../components/ShowEvent/ShowEvent";
import EventService from "../../services/EventService";
import HomeConfigService from "../../services/HomeConfigService";
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
