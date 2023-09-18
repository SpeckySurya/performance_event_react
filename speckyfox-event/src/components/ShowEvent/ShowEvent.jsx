import React, { useEffect, useState } from "react";
import "../../responsive.css";
import "./ShowEvent.css";
import {
  Box,
  Stack,
  Typography,
  styled,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import dateFormatter, { isPastDateTime } from "../../utils/DateFormatter";
import { Link } from "react-router-dom";
import UpdateEvent from "../UpdateEvent/UpdateEvent";
import EventCard from "../EventCard/EventCard";

const ShowEvent = (props) => {
  const [eventEditing, setEventEditing] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [renderEvents, setRenderEvents] = useState([]);

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
                exclusive
                aria-label="Platform"
              >
                <ToggleButton
                  value="web"
                  onClick={() => setRenderEvents(upcomingEvents)}
                >
                  Upcoming
                </ToggleButton>
                <ToggleButton
                  value="android"
                  onClick={() => setRenderEvents(pastEvents)}
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
              renderEvents.map((event) => {
                return (
                  <>
                    <EventCard
                      key={event.events.id}
                      event={event}
                      isEventPage={props.isEventPage}
                      setLoading={props.setLoading}
                      setEventEditing={setEventEditing}
                      setEditEvent={setEditEvent}
                      setUpdateBread={props?.setUpdateBread}
                    />
                  </>
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
