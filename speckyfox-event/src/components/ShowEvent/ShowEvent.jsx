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

const ShowEvent = (props) => {
  const [eventEditing, setEventEditing] = useState(false);
  const [pastEvents, setPastEvents] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [showToggle, SetShowToggle] = useState();

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
                <ToggleButton value="web" onClick={() => setPastEvents(false)}>
                  Upcoming
                </ToggleButton>
                <ToggleButton
                  value="android"
                  onClick={() => setPastEvents(true)}
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
            {props.isEventPage
              ? props.events.map((event) => {
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
                })
              : props.events.map((event) => (
                  <EventCard
                    event={event}
                    isEventPage={props.isEventPage}
                    setLoading={props.setLoading}
                    setEventEditing={setEventEditing}
                    setEditEvent={setEditEvent}
                    setUpdateBread={props?.setUpdateBread}
                  />
                ))}
          </Box>
        </div>
      )}
    </div>
  );
};

export default ShowEvent;
