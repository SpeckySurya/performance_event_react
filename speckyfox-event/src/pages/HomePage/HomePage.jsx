import { useContext, useEffect, useState } from "react";
import { About } from "../../components/About/About";
import { Banner } from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import "./HomePage.css";
import EventService from "../../services/EventService";
import { LinearProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SpeakerService from "../../services/SpeakerService";
import HomeConfigService from "../../services/HomeConfigService";

const HomePage = () => {
  const [event, setEvent] = useState({});
  const [speaker, setSpeaker] = useState({});
  const [homeConfig, setHomeConfig] = useState({});
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
        console.log(response.data);
        setLoading(false);
        const speakerService = new SpeakerService();
        speakerService
          .getSpeakerByEventId(response.data.id)
          .then((response) => {
            setSpeaker(response.data);
          });
      })
      .catch((error) => {
        navigate("/pagenotfound");
      });

    const homeConfiService = new HomeConfigService();
    homeConfiService.getHomeConfig().then((response) => {
      setHomeConfig(response.data);
    });
  }, []);

  return loading ? (
    <LinearProgress color={"error"} />
  ) : (
    <div className="eventHome">
      <div className="header-div">
        <Header homeConfig={homeConfig} />
      </div>
      <div className="banner-div">
        <Banner event={event} speaker={speaker}></Banner>
      </div>
      <div className="about-speaker-div">
        <About speaker={speaker} />
      </div>
      <div className="footer-div">
        <Footer homeConfig={homeConfig} />
      </div>
    </div>
  );
};

export default HomePage;
