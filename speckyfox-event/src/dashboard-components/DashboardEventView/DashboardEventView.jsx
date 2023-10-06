import { CircularProgress, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import EventService from "../../services/EventService";
import DashboardEventCard from "../DashboardEventCard/DashboardEventCard";
import "./DashboardEventView.css";
import dateFormatter, { isPastDateTime } from "../../utils/DateFormatter";

export default function DashboardEventView() {
  const [events, setEvents] = useState([]);
  const { context } = useContext(MyContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function filterEvents(data) {
    if (context.eventFilter.eventFilter === "past") {
      setEvents(
        data.filter((item) => {
          const formattedDate = dateFormatter(item.events.date);
          return isPastDateTime(formattedDate, item.events.time);
        })
      );
    } else if (context.eventFilter.eventFilter === "upcoming") {
      setEvents(
        data.filter((item) => {
          const formattedDate = dateFormatter(item.events.date);
          return !isPastDateTime(formattedDate, item.events.time);
        })
      );
    } else {
      setEvents(data);
    }
  }

  const initialSetup = () => {
    const eventService = new EventService();
    eventService
      .getAllEvents()
      .then((response) => {
        filterEvents(response.data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    context.breadCrumb.updatePages([
      { name: "Events", route: () => navigate("/dashboard/events") },
    ]);
    initialSetup();
  }, [context.eventFilter.eventFilter]);

  return (
    <Stack direction="row" flexWrap={"wrap"} justifyContent={"center"}>
      {loading ? (
        <CircularProgress sx={{ color: "lightgray" }} />
      ) : (
        events.map((event, index) => (
          <DashboardEventCard
            key={index}
            event={event}
            initialSetup={initialSetup}
          />
        ))
      )}
    </Stack>
  );
}
