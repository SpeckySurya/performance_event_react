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
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { background } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { ClassNames } from "@emotion/react";

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
  const [cookies, setCookie] = useCookies(["cookiesConsent"]);
  const givenCookesConcept = () => {
    setCookie("cookiesConsent", true, { path: "/" });
    setOpen(false);
  };
  useEffect(() => {
    const handleClickOpen = () => {
      setOpen(true);
    };
  }, []);
  setTimeout(() => {
    setOpen(false);
  }, 5000);

  const handleClose = () => {
    setOpen(false);
  };
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
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <div className={ClassNames.cookiesConsent}>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Accept Cookes
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={givenCookesConcept}>
              Accept
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
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
    </>
  );
};
export default EventPage;
