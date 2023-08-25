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
            return (
              <EventCard
                event={event}
                isEventPage={props.isEventPage}
                setLoading={props.setLoading}
                setEventEditing={setEventEditing}
                setEditEvent={setEditEvent}
              />
              // <Card
              //   key={k5}
              //   sx={{
              //     paddingBottom: 5,
              //     width: 380,
              //     m: 2,
              //     position: "relative",
              //   }}
              // >
              //   <Stack
              //     left={20}
              //     top={20}
              //     spacing={1}
              //     direction={"row"}
              //     alignItems={"center"}
              //     position={"absolute"}
              //     sx={{ cursor: "pointer" }}
              //     onClick={() => handleEventStatus(event.events)}
              //   >
              //     {event.events.active ? (
              //       <ToggleOnOutlinedIcon
              //         sx={{ fontSize: "30px", color: "green" }}
              //       />
              //     ) : (
              //       <ToggleOffOutlinedIcon
              //         sx={{ fontSize: "30px", color: "red" }}
              //       />
              //     )}
              //     <Typography>
              //       {event.events.active ? "Active" : "Inactive"}
              //     </Typography>
              //   </Stack>
              //   <CardMedia
              //     component="img"
              //     height="200"
              //     image={event.events.eventBanner}
              //     alt="Event Banner"
              //   />
              //   {!props.isEventPage && (
              //     <Box>
              //       <Editbtn
              //         setLoading={props.setLoading}
              //         event={event}
              //         setEditEvent={setEditEvent}
              //         setEventEditing={setEventEditing}
              //       />
              //     </Box>
              //   )}

              //   <CardContent sx={{ flex: "1 0 auto" }}>
              //     <Typography gutterBottom variant="h4" fontWeight={600}>
              //       {event.events.title}
              //     </Typography>
              //     <Typography fontWeight={600} py={1}>
              //       Agenda -
              //     </Typography>
              //     <Box fontSize={"5px"} marginBottom={3}>
              //       {
              //         <ul className="agenda-list">
              //           {event.events.description.split(",").length < 2
              //             ? event.events.description.split(",").map((e, k3) => (
              //                 <li key={k3}>
              //                   <span>{e}</span>
              //                 </li>
              //               ))
              //             : event.events.description.split(",").map((e, k4) => (
              //                 <li key={k4} style={{ fontSize: "10px" }}>
              //                   <TbTargetArrow className="agenda-icon" />
              //                   <span>{e}</span>
              //                 </li>
              //               ))}
              //         </ul>
              //       }
              //     </Box>
              //     <Box sx={{ mt: "auto" }}>
              //       <Stack direction="row" alignItems="center">
              //         <Typography color="#f37d47" marginX={1} fontSize={18}>
              //           <i className="bx bxs-calendar"></i>
              //         </Typography>
              //         <Typography>
              //           {formattedDate.day} {formattedDate.monthName}{" "}
              //           {formattedDate.year}
              //         </Typography>
              //       </Stack>
              //       <Stack direction="row" alignItems="center">
              //         <Typography color="#f37d47" marginX={1} fontSize={18}>
              //           <i className="bx bx-time"></i>
              //         </Typography>
              //         <Typography>{formattedTime}</Typography>
              //       </Stack>
              //       <Stack direction="row" alignItems="center">
              //         <Typography color="#f37d47" marginX={1} fontSize={18}>
              //           <i className="bx bx-microphone"></i>
              //         </Typography>
              //         <Typography>
              //           {event?.events.speaker?.name},{" "}
              //           {event?.events.speaker?.designation}
              //         </Typography>
              //       </Stack>
              //     </Box>
              //   </CardContent>
              //   {props.isEventPage && (
              //     <CardActions>
              //       {isOutdated ? (
              //         <Button
              //           sx={{
              //             backgroundColor: "gray",
              //             cursor: "default",
              //             color: "lightgray",
              //             position: "absolute",
              //             bottom: "2%",
              //             paddingX: "20px",
              //             right: "calc(50% - 50px)",
              //             "&:hover": { backgroundColor: "gray" },
              //           }}
              //         >
              //           Expired
              //         </Button>
              //       ) : (
              //         <BootstrapButton
              //           sx={{
              //             position: "absolute",
              //             bottom: "2%",
              //             right: "calc(50% - 50px)",
              //           }}
              //         >
              //           <CustomLink to={`/${event.events.id}`}>
              //             Register
              //           </CustomLink>
              //         </BootstrapButton>
              //       )}
              //     </CardActions>
              //   )}
              // </Card>
            );
          })}
        </Box>
      )}
    </div>
  );
};

export default ShowEvent;
