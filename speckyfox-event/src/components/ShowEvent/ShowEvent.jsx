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
/**
 *
 * This component is a ShowEvent it will show event Both Upcoming and Past.
 *
 * @returns ShowEvent
 */
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
      setRenderEvents(upcomingEvents);
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
        <>
          <div>
            <h2 className="upcomingblock">
              {" "}
              Upcoming <b className="eventscolur">Events</b>
            </h2>
            <div className="calenderwithline">
              <hr className="hrline" />
              <i className="bx bxs-calendar calenderstyle"></i>
              <hr className="hrline" />
            </div>
            <Box
              display="flex"
              justifyContent={"center"}
              flexWrap="wrap"
              float={"left"}
              padding={3}
            >
              {upcomingEvents.length === 0 ? (
                <Typography
                  sx={{
                    margin: "8% 2%",
                    opacity: "0.4",
                  }}
                  variant="h5"
                >
                  No Upcoming Events
                </Typography>
              ) : (
                <>
                  <>
                    {upcomingEvents.map((event) => (
                      <EventCard
                        key={event?.events?.id}
                        event={event}
                        isEventPage={props.isEventPage}
                        setLoading={props.setLoading}
                        setEventEditing={setEventEditing}
                        setEditEvent={setEditEvent}
                        setUpdateBread={props?.setUpdateBread}
                      />
                    ))}
                  </>
                </>
              )}
            </Box>
          </div>

          <div>
            <h2 className="pasteventblock">
              Past <b className="eventscolur">Events</b>
            </h2>{" "}
            <div className="calenderwithline">
              <hr className="hrline" />
              <i className="bx bxs-calendar calenderstyle"></i>
              <hr className="hrline" />
            </div>
            <Box
              display="flex"
              justifyContent={"center"}
              flexWrap="wrap"
              float={"left"}
              padding={3}
            >
              {pastEvents.length === 0 ? (
                <Typography
                  sx={{
                    margin: "12% 2%",
                    opacity: "0.4",
                  }}
                  variant="h4"
                >
                  No Past Events
                </Typography>
              ) : (
                <>
                  {pastEvents.map((event) => (
                    <EventCard
                      key={event?.events?.id}
                      event={event}
                      isEventPage={props.isEventPage}
                      setLoading={props.setLoading}
                      setEventEditing={setEventEditing}
                      setEditEvent={setEditEvent}
                      setUpdateBread={props?.setUpdateBread}
                    />
                  ))}
                </>
              )}
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowEvent;
