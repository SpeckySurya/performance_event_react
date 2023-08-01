import React, { useEffect, useState } from "react";
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
import banner from "./../../assets/card-bg.png";
import dateFormatter, {
  convertTo12HourFormat,
} from "../../utils/DateFormatter";
import { Link } from "react-router-dom";

const EventCard = (props) => {
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
      <Box display="flex" justifyContent={"center"} flexWrap="wrap" padding={3}>
        {props.events.map((event) => {
          const formattedDate = dateFormatter(event.date);
          const formattedTime = convertTo12HourFormat(event.time);
          return (
            <Card
              key={event.id}
              sx={{ paddingBottom: 5, width: 380, m: 2, position: "relative" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={banner}
                alt="Event Banner"
              />
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography gutterBottom variant="h4" fontWeight={600}>
                  {event.title}
                </Typography>
                <Typography marginBottom={3}>{event.description}</Typography>
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
                      {event.speakerName}, {event.speakerDesignation}
                    </Typography>
                  </Stack>
                </Box>
              </CardContent>
              <CardActions>
                <BootstrapButton
                  sx={{
                    position: "absolute",
                    bottom: "2%",
                    right: "calc(50% - 50px)",
                  }}
                >
                  <CustomLink to="/">Register</CustomLink>
                </BootstrapButton>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default EventCard;
