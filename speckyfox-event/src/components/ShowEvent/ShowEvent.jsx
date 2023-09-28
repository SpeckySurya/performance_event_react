import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../responsive.css";
import "./ShowEvent.css";

import { Link } from "react-router-dom";
import dateFormatter, { isPastDateTime } from "../../utils/DateFormatter";
import EventCard from "../EventCard/EventCard";
import UpdateEvent from "../UpdateEvent/UpdateEvent";

const ShowEvent = (props) => {
  const [eventEditing, setEventEditing] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [renderEvents, setRenderEvents] = useState([]);
  const [alignment, setAlignment] = React.useState("web");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
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

    if (props.isEventPage) {
      setRenderEvents(upcomingEventsFilter);
    } else {
      setRenderEvents(props.events);
    }
  }, [props.events, props.isEventPage]);

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
            {props.isEventPage ? (
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                aria-label="Platform"
                onChange={handleAlignment}
              >
                <ToggleButton
                  value="web"
                  onClick={() => setRenderEvents(upcomingEvents)}
                  sx={{ width: 100 }}
                >
                  Upcoming
                </ToggleButton>
                <ToggleButton
                  value="android"
                  onClick={() => setRenderEvents(pastEvents)}
                  sx={{ width: 100 }}
                >
                  Past
                </ToggleButton>
              </ToggleButtonGroup>
            ) : null}
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
              renderEvents.map((event) => (
                <EventCard
                  key={event.events.id}
                  event={event}
                  isEventPage={props.isEventPage}
                  setLoading={props.setLoading}
                  setEventEditing={setEventEditing}
                  setEditEvent={setEditEvent}
                  setUpdateBread={props?.setUpdateBread}
                />
              ))
            )}
          </Box>
        </div>
      )}
    </div>
  );
};

export default ShowEvent;
