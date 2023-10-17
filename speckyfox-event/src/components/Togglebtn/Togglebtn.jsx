import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import EventService from "../../services/EventService";
import EventCard from "../EventCard/EventCard";
import VideoCart from "../VideoCart/VideoCart";
import "./Togglebtn.css";

export default function Togglebtn() {
  const [opentogle, setopentogle] = useState(true);
  const [events, setEvents] = useState([]);
  const [alignment, setAlignment] = useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  useEffect(() => {
    const eventService = new EventService();
    eventService.getAllActiveEvents().then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <>
      <div style={{ border: "1px solid black" }} className="togglebtnstyle">
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton
            sx={{ color: "red", fontSize: 10, width: 100 }}
            value="web"
            onClick={() => setopentogle(true)}
          >
            Upcoming Event
          </ToggleButton>
          <ToggleButton value="past event" onClick={() => setopentogle(false)}>
            Past Event
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {opentogle ? (
        <EventCard events={events} isEventPage={true} />
      ) : (
        <VideoCart></VideoCart>
      )}
    </>
  );
}
