import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { LinearProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CookieConsent from "../../components/CookieConsent/CookieConsent";
import Footer from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import ShowEvent from "../../components/ShowEvent/ShowEvent";
import MyContext from "../../context/MyContext";
import EventService from "../../services/EventService";
import HomeConfigService from "../../services/HomeConfigService";
import RecentEventService from "../../services/RecentEventService";
import "./EventPage.css";

/**
 *
 * This page use to show all the active upcoming and past events
 *
 * @returns Event page component
 */

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homeConfig, setHomeConfig] = useState({});
  const [recentEvent, setRecentEvent] = useState([]);
  const recentEventService = new RecentEventService();
  const [open, setOpen] = React.useState(true);
  const [showCrossWindow, setShowCrossWindow] = useState(true);
  const { context } = useContext(MyContext);
  const [animateRegisterButton, setAnimateRegisterButton] = useState(true);
  const registrationFormRef = useRef(null);
  const handleRegisterButtonClick = () => {
    if (registrationFormRef.current) {
      registrationFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setAnimateRegisterButton(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  return loading ? (
    <LinearProgress color="error" />
  ) : (
    <>
      <div className="event-page-container">
        <Header homeConfig={homeConfig} />
        <div className="recentImagecuntaner">
          <img
            className="recentBannerImage"
            src={homeConfig.banner}
            alt="error"
          />
          <div className="recentSpeckyfoxText">
            <h1 className="recentwebinar">Webinar</h1>
            <h3 className="recentSpeckyfoxTech2">SpeckyFox Technologies</h3>
          </div>
        </div>

        <section className="right" ref={registrationFormRef}>
          <ShowEvent events={events} isEventPage={true} />
        </section>
        {showCrossWindow ? (
          <div
            style={{
              textAlign: "center",
            }}
            className={"BannerButtonatDown"}
          >
            <Typography pt={1} onClick={handleRegisterButtonClick}>
              <KeyboardDoubleArrowDownIcon
                className="iconclass"
                style={{ fontSize: 40 }}
              />
              <Typography
                sx={{
                  letterSpacing: 2,
                  padding: 2,
                  color: "rgb(255, 255, 255, 0.4)",
                }}
              >
                Scroll To Events
              </Typography>
            </Typography>
          </div>
        ) : null}

        {!context.cookie && <CookieConsent />}

        <Footer homeConfig={homeConfig} />
      </div>
    </>
  );
};
export default EventPage;
