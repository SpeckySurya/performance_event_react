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

const ShowEvent = (props) => {
  const [eventEditing, setEventEditing] = useState(false);
  const [pastEvents, setPastEvents] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  const BootstrapButton = styled(Button)({
    backgroundColor: "#ff970a",
    width: "100px",
    color: "white",
    "&:hover": {
      backgroundColor: "#f7542b",
    },
  });

  const CustomLink = styled(Link)(({ theme }) => ({
    color: "#ffffff",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  }));

  function handleEventStatus(event) {
    console.log(event);
  }

  return (
    <div className="event-card-container">
      <Stack
        direction={"row"}
        spacing={0}
        alignItems={"center"}
        justifyContent={"center"}
        marginY={1}
      >
        <Button color="success" onClick={() => setPastEvents(false)}>
          Upcoming
        </Button>
        <Button color="secondary" onClick={() => setPastEvents(true)}>
          Past
        </Button>
      </Stack>
      {eventEditing ? (
        <UpdateEvent
          event={editEvent}
          setUpdate={props.setUpdate}
          setEventEditing={setEventEditing}
        />
      ) : (
        <Box
          display="flex"
          justifyContent={"center"}
          flexWrap="wrap"
          float={"left"}
          padding={3}
        >
          {props.events.map((event) => {
            return pastEvents
              ? isPastDateTime(
                  dateFormatter(event.events.date),
                  event.events.time
                ) && (
                  <EventCard
                    event={event}
                    isEventPage={props.isEventPage}
                    setLoading={props.setLoading}
                    setEventEditing={setEventEditing}
                    setEditEvent={setEditEvent}
                  />
                )
              : !isPastDateTime(
                  dateFormatter(event.events.date),
                  event.events.time
                ) && (
                  <EventCard
                    event={event}
                    isEventPage={props.isEventPage}
                    setLoading={props.setLoading}
                    setEventEditing={setEventEditing}
                    setEditEvent={setEditEvent}
                  />
                );
          })}
        </Box>
      )}
    </div>
  );
};

export default ShowEvent;
