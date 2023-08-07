import { useContext, useEffect, useState } from "react";
import { About } from "../../components/About/About";
import { Banner } from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import "./HomePage.css";
import EventService from "../../services/EventService";
import { LinearProgress } from "@mui/material";

const HomePage = () => {
  const eventId = 1;
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let eventService = new EventService();
    eventService.getEvent(eventId).then((response) => {
      setEvent(response.data);
      console.log(response.data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <LinearProgress color={"error"} />
  ) : (
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

export default HomePage;
