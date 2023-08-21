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
import { TbTargetArrow } from "react-icons/tb";
import dateFormatter, {
  convertTo12HourFormat,
} from "../../utils/DateFormatter";
import { Link } from "react-router-dom";
import UpdateEvent from "../UpdateEvent/UpdateEvent";
import Editbtn from "../Editbtn/Editbtn";

const EventCard = (props) => {
  const [eventEditing, setEventEditing] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [speaker, setSpeaker] = useState({});

  const BootstrapButton = styled(Button)({
    backgroundColor: "#ff970a",
    width: "100px",
    color: "white",
    "&:hover": {
      backgroundColor: "#f7542b",
    },
  });

  useEffect(() => {}, [props.events]);

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
        <UpdateEvent event={editEvent} setEventEditing={setEventEditing} />
      ) : (
        <Box
          display="flex"
          justifyContent={"center"}
          flexWrap="wrap"
          float={"left"}
          padding={3}
        >
          {props.events.map((event, k5) => {
            const formattedDate = dateFormatter(event.events.date);
            const formattedTime = convertTo12HourFormat(event.events.time);

            return (
              <Card
                key={k5}
                sx={{
                  paddingBottom: 5,
                  width: 380,
                  m: 2,
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={event.events.eventBanner}
                  alt="Event Banner"
                />
                {!props.isEventPage && (
                  <Editbtn
                    event={event}
                    setEditEvent={setEditEvent}
                    setEventEditing={setEventEditing}
                  />
                )}

                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography gutterBottom variant="h4" fontWeight={600}>
                    {event.events.title}
                  </Typography>
                  <Typography fontWeight={600} py={1}>
                    Agenda -
                  </Typography>
                  <Box fontSize={"5px"} marginBottom={3}>
                    {
                      <ul className="agenda-list">
                        {event.events.description.split(",").length < 2
                          ? event.events.description.split(",").map((e, k3) => (
                              <li key={k3}>
                                <span>{e}</span>
                              </li>
                            ))
                          : event.events.description.split(",").map((e, k4) => (
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
                        {formattedDate.day} {formattedDate.monthName}{" "}
                        {formattedDate.year}
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
                        {event?.speakerDetails?.name},{" "}
                        {event?.speakerDetails?.designation}
                      </Typography>
                    </Stack>
                  </Box>
                </CardContent>
                {props.isEventPage && (
                  <CardActions>
                    <BootstrapButton
                      sx={{
                        position: "absolute",
                        bottom: "2%",
                        right: "calc(50% - 50px)",
                      }}
                    >
                      <CustomLink to={`/${event.events.id}`}>
                        Register
                      </CustomLink>
                    </BootstrapButton>
                  </CardActions>
                )}
              </Card>
            );
          })}
        </Box>
      )}
    </div>
  );
};

export default EventCard;
