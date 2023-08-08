import { useContext, useEffect, useState } from "react";
import { About } from "../../components/About/About";
import { Banner } from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import "./HomePage.css";
import EventService from "../../services/EventService";
import { LinearProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const HomePage = () => {
  const eventId = 1;
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const { param } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(param) && isNaN(parseFloat(param))) {
      navigate("/pagenotfound");
    }
    let eventService = new EventService();
    eventService
      .getEvent(param)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        navigate("/pagenotfound");
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
        <About event={event} />
      </div>
      <div className="footer-div">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
