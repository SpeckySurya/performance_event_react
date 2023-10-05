import { Box, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import EventService from "../../services/EventService";
import DashboardEventCard from "../DashboardEventCard/DashboardEventCard";
import "./DashboardEventView.css";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import SnackbarComponent from "../../components/SnackbarComponent/SnackbarComponent";
import ContentService from "../../services/ContentService";

export default function DashboardEventView() {
  const [events, setEvents] = useState([]);
  const { context } = useContext(MyContext);
  const navigate = useNavigate();

  const initialSetup = () => {
    const eventService = new EventService();
    eventService.getAllEvents().then((response) => {
      setEvents(response.data);
    });
  };

  useEffect(() => {
    context.breadCrumb.updatePages([
      { name: "Events", route: () => navigate("/dashboard/events") },
    ]);
    initialSetup();
  }, []);

  return (
    <Stack direction="row" flexWrap={"wrap"} justifyContent={"center"}>
      {events.map((event, index) => (
        <DashboardEventCard
          key={index}
          event={event}
          initialSetup={initialSetup}
        />
      ))}
    </Stack>
  );
}
