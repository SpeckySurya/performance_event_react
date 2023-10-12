import { LinearProgress } from "@mui/material";
import "./EventPage.css";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import ShowEvent from "../../components/ShowEvent/ShowEvent";
import EventService from "../../services/EventService";
import HomeConfigService from "../../services/HomeConfigService";
import RecentEventService from "../../services/RecentEventService";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-multi-carousel";
import banner from "../../assets/banner.png";
import banner23 from "../../assets/banner23.png";
import banner22 from "../../assets/banner22.png";
import { color } from "framer-motion";
const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homeConfig, setHomeConfig] = useState({});
  const [recentEvent, setRecentEvent] = useState([]);
  const recentEventService = new RecentEventService();
  const responsive = {
    desktop: {
      breakpoint: { max: 40000, min: 900 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 900, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    recentEventService
      .getRecentEvent()
      .then((res) => {
        setRecentEvent(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
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
  console.log(recentEvent);
  return loading ? (
    <LinearProgress color="error" />
  ) : (
    <div className="event-page-container">
      <Header homeConfig={homeConfig} />
      <div className="recentImagecuntaner">
        <img className="recentBannerImage" src={banner22} alt="error" />
        <div className="recentSpeckyfoxText">
          <h1 className="recentwebinar">Webinar</h1>
          <h3 className="recentSpeckyfoxTech2">SpeckyFox Technologies</h3>
        </div>
      </div>
      <ShowEvent events={events} isEventPage={true} />
      <Footer homeConfig={homeConfig} />
    </div>
  );
};
export default EventPage;
