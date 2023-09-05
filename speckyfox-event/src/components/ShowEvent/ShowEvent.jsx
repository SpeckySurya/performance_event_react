import React, { useEffect, useState } from "react";
import "../../responsive.css";
import "./ShowEvent.css";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Button,
  styled,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import { TbTargetArrow } from "react-icons/tb";
import dateFormatter, {
  addTime,
  convertTo12HourFormat,
  isPastDateTime,
} from "../../utils/DateFormatter";
import { Link } from "react-router-dom";
import UpdateEvent from "../UpdateEvent/UpdateEvent";
import Editbtn from "../Editbtn/Editbtn";
import EventCard from "../EventCard/EventCard";
import { render } from "@testing-library/react";

const ShowEvent = (props) => {
  const [eventEditing, setEventEditing] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [renderEvents, setRenderEvents] = useState([]);

  const BootstrapButton = styled(Button)({
    backgroundColor: "#ff970a",
    width: "100px",
    color: "white",
    "&:hover": {
      backgroundColor: "#f7542b",
    },
  });

  useEffect(() => {
    const pastEventsFilter = props.events.filter((event) =>
      isPastDateTime(dateFormatter(event.events.date), event.events.time)
    );
    setPastEvents(pastEventsFilter);
    const upcomingEventsFilter = props.events.filter(
      (event) =>
        !isPastDateTime(dateFormatter(event.events.date), event.events.time)
    );
    setUpcomingEvents(upcomingEventsFilter);
  }, []);

  const CustomLink = styled(Link)(({ theme }) => ({
    color: "#ffffff",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  }));

  return (
    <div className="event-card-container">
      {eventEditing ? (
        <UpdateEvent
          event={editEvent}
          setUpdate={props.setUpdate}
          setEventEditing={setEventEditing}
        />
      ) : (
        <div>
          <Stack
            direction={"row"}
            spacing={0}
            alignItems={"center"}
            justifyContent={"center"}
            marginY={1}
          >
            <Button
              sx={{ width: "100px" }}
              variant="outlined"
              color="success"
              onClick={() => setRenderEvents(upcomingEvents)}
            >
              Upcoming
            </Button>
            <Button
              sx={{ width: "100px" }}
              variant="outlined"
              color="secondary"
              onClick={() => setRenderEvents(pastEvents)}
            >
              Past
            </Button>
          </Stack>
          <Box
            display="flex"
            justifyContent={"center"}
            flexWrap="wrap"
            float={"left"}
            padding={3}
          >
            {renderEvents.length === 0 ? (
              <Typography variant="h4">No Events</Typography>
            ) : (
              renderEvents.map((event) => {
                return (
                  <EventCard
                    event={event}
                    isEventPage={props.isEventPage}
                    setLoading={props.setLoading}
                    setEventEditing={setEventEditing}
                    setEditEvent={setEditEvent}
                  />
                );
              })
            )}
          </Box>
        </div>
      )}
    </div>
  );
};

export default ShowEvent;
