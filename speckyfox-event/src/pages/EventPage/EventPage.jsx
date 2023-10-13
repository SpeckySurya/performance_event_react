import { ClassNames } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { LinearProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner22 from "../../assets/banner22.png";
import Footer from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import ShowEvent from "../../components/ShowEvent/ShowEvent";
import EventService from "../../services/EventService";
import HomeConfigService from "../../services/HomeConfigService";
import RecentEventService from "../../services/RecentEventService";
import "./EventPage.css";
import CookieConsent from "../../components/CookieConsent/CookieConsent";
import { useContext, useRef } from "react";
import MyContext from "../../context/MyContext";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

//
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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
          <img className="recentBannerImage" src={banner22} alt="error" />
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

              // transform: "rotate(15deg)",
            }}
            className={"BannerButtonatDown"}
          >
            <Typography
              // p={1}
              pt={1}
              color={"blue"}
              onClick={handleRegisterButtonClick}
              fontSize={25}
            >
              <KeyboardDoubleArrowDownIcon className="iconclass" />
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
