import React, { useEffect, useState } from "react";
import "../../responsive.css";
import "./EventCard.css";
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
import { Link } from "react-router-dom";
import Editbtn from "../Editbtn/Editbtn";
import dateFormatter, {
  addTime,
  convertTo12HourFormat,
  isPastDateTime,
} from "../../utils/DateFormatter";
import EventService from "../../services/EventService";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
const EventCard = (props) => {
  const [active, setActive] = useState(props.event.events.active);

  const BootstrapButton = styled(Button)({
    backgroundColor: "#ff970a",
    width: "80%",
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

  function debounce(func, delay) {
    let timeoutId;

    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  function updateEventStatus(eventId, data) {
    const eventService = new EventService();
    eventService
      .updateEvent(eventId, data)
      .then((response) => {
        setSnackbar(
          <SnackbarComponent
            message="Event status changed !"
            severity="success"
          />
        );
      })
      .catch((error) => {
        setSnackbar(
          <SnackbarComponent message="Something went wrong" severity="error" />
        );
      });
  }

  function handleEventStatus(event) {
    setActive(!active);
    console.log(event);
  }

  const formattedDate = dateFormatter(props.event.events.date);
  const startTime = convertTo12HourFormat(props.event.events.time);
  const endTime = addTime(startTime, props.event.events.duration);
  const formattedTime = `${
    startTime[1] === ":" ? "0" + startTime : startTime
  } to ${endTime}`;

  const isOutdated = isPastDateTime(formattedDate, props.event.events.time);

  return (
    <Card
      sx={{
        paddingBottom: 6,
        width: 350,
        m: 2,
        position: "relative",
      }}
    >
      {!props.isEventPage && (
        <Stack
          left={20}
          top={20}
          spacing={1}
          direction={"row"}
          alignItems={"center"}
          position={"absolute"}
          sx={{ cursor: "pointer" }}
          onClick={() => handleEventStatus(props.event.events)}
        >
          {active ? (
            <ToggleOnOutlinedIcon sx={{ fontSize: "30px", color: "green" }} />
          ) : (
            <ToggleOffOutlinedIcon sx={{ fontSize: "30px", color: "red" }} />
          )}
          <Typography>{active ? "Active" : "Inactive"}</Typography>
        </Stack>
      )}
      <CardMedia
        component="img"
        height="200"
        image={props.event.events.eventBanner}
        alt="Event Banner"
      />
      {!props.isEventPage && (
        <Box>
          <Editbtn
            setLoading={props.setLoading}
            event={props.event}
            setEditEvent={props.setEditEvent}
            setEventEditing={props.setEventEditing}
          />
        </Box>
      )}

      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography gutterBottom variant="h4" fontWeight={600}>
          {props.event.events.title}
        </Typography>
        <Typography fontWeight={600} py={1}>
          Agenda -
        </Typography>
        <Box fontSize={"5px"} marginBottom={3}>
          {
            <ul className="agenda-list">
              {props.event.events.description.split(",").length < 2
                ? props.event.events.description.split(",").map((e, k3) => (
                    <li key={k3}>
                      <span>{e}</span>
                    </li>
                  ))
                : props.event.events.description.split(",").map((e, k4) => (
                    <li key={k4} style={{ fontSize: "10px" }}>
                      <TbTargetArrow className="agenda-icon" />
                      <span>{e}</span>
                    </li>
                  ))}
            </ul>
          }
        </Box>
        <Box sx={{ mt: "auto" }}>
          <Stack direction="row" alignItems="center">
            <Typography color="#f37d47" marginX={1} fontSize={18}>
              <i className="bx bxs-calendar"></i>
            </Typography>
            <Typography>
              {formattedDate.day} {formattedDate.monthName} {formattedDate.year}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography color="#f37d47" marginX={1} fontSize={18}>
              <i className="bx bx-time"></i>
            </Typography>
            <Typography>{formattedTime}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography color="#f37d47" marginX={1} fontSize={18}>
              <i className="bx bx-microphone"></i>
            </Typography>
            <Typography>
              {props.event?.events.speaker?.name},{" "}
              {props.event?.events.speaker?.designation}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
      {props.isEventPage && (
        <CardActions>
          {isOutdated ? (
            <Button
              sx={{
                backgroundColor: "gray",
                cursor: "default",
                color: "lightgray",
                position: "absolute",
                bottom: "2%",
                paddingX: "20px",
                right: "calc(25% - 50px)",
                "&:hover": { backgroundColor: "gray" },
              }}
            >
              Expired
            </Button>
          ) : (
            <BootstrapButton
              sx={{
                position: "absolute",
                bottom: "2%",
                right: "calc(25% - 50px)",
                marginBottom: "12px",
              }}
            >
              <CustomLink to={`/${props.event.events.id}`}>Register</CustomLink>
            </BootstrapButton>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default EventCard;
