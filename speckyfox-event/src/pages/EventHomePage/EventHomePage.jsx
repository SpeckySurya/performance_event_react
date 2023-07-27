import { useEffect, useState } from "react";
import { About } from "../../components/About/About";
import { Banner } from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import "./EventHomePage.css";
import EventService from "../../services/EventService";

const EventHomePage = () => {
  const eventId = 1;
  let [event, setEvent] = useState({});
  let [eventDate, setEventDate] = useState({});

  useEffect(() => {
    let eventService = new EventService();
    eventService.getEvent(eventId).then((response) => setEvent(response.data));
    setEventDate();
  }, []);

  return (
    <div className="eventHome">
      <div className="header-div">
        <Header />
      </div>
      <div className="banner-div">
        <Banner event={event}></Banner>
      </div>
      <div className="about-speaker-div">
        <About />
      </div>
      <div className="footer-div">
        <Footer />
      </div>
    </div>
  );
};

export default EventHomePage;
