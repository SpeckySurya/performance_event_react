import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventService from "../../services/EventService";
import { toDDMMYYYY } from "../../utils/DateFormatter";
import "./CreateEventForm.css";
import Duration from "../../components/Duration/Duration";
import SpeakerService from "../../services/SpeakerService";
import SnackbarComponent from "../../components/SnackbarComponent/SnackbarComponent";
import MyContext from "../../context/MyContext";

const formDataDefault = {
  title: "",
  description: "",
  time: "",
  meetingUrl: "",
  location: "",
  date: "",
  active: false,
  acceptRegistration: false,
  contactTo: "",
  speakerId: 0,
  duration: { hours: 0, minutes: 0 },
};

export default function CreateEventForm() {
  const [formData, setFormData] = useState(formDataDefault);
  const [selectedFile, setSelectedFile] = useState(null);
  const [speakerSelect, setSpeakerSelect] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState(null);
  const [currentSpeaker, setCurrentSpeaker] = useState("Select Speaker");
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(formDataDefault.duration);
  const [speakers, setSpeakers] = useState([]);
  const handleChange = (event) => {
    if (event.target.name === "speakerId") {
      setSpeakerSelect(event.target.value);
    }
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const { context } = useContext(MyContext);

  function initialSetup() {
    const speakerService = new SpeakerService();
    speakerService.getAllSpeakers().then((response) => {
      setSpeakers(response.data);
    });
  }

  useEffect(() => {
    initialSetup();
    context.breadCrumb.updatePages([
      { name: "Events", route: () => navigate("/dashboard/events") },
      {
        name: "Create Event",
      },
    ]);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const request = new FormData();
    request.append("eventBanner", selectedFile);
    Object.entries(formData).forEach(([key, val]) => {
      request.append(key, val);
    });

    request.delete("duration");
    request.append("duration", `${duration.hours}:${duration.minutes}`);
    request.delete("date");
    request.append("date", toDDMMYYYY(formData.date));

    const eventService = new EventService();
    eventService
      .saveEvent(request)
      .then((response) => {
        setIsAlertVisible(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/dashboard/events");
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        setSnackbar(
          <SnackbarComponent message="Something went wrong" severity="error" />
        );
      });
  };

  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="event-form-container">
      <h1>Create an Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            step={1}
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <Duration duration={duration} setDuration={setDuration} />

        <div className="form-group">
          <label htmlFor="meetingUrl">Meeting URL</label>
          <input
            type="url"
            id="meetingUrl"
            name="meetingUrl"
            placeholder="Meeting URL"
            value={formData.meetingUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="active">Active</label>
          <select
            name="active"
            value={formData.active}
            id="active"
            onChange={handleChange}
            required
          >
            <option value={"false"}>False</option>
            <option value={"true"}>True</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="acceptRegistration">
            Active Registration for Homepage
          </label>
          <select
            name="acceptRegistration"
            id="acceptRegistration"
            value={formData.acceptRegistration}
            onChange={handleChange}
            required
          >
            <option value={"false"}>False</option>
            <option value={"true"}>True</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="eventBanner">Event Banner</label>
          <Typography fontSize={10}>Max file size : 2 MB</Typography>
          <input
            type="file"
            id="eventBanner"
            name="eventBanner"
            placeholder="Event Banner"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="speakerId">Speaker</label>
          <select
            name="speakerId"
            id="speakerId"
            onChange={handleChange}
            value={speakerSelect}
            required
          >
            <option disabled value="">
              Select speaker
            </option>
            {speakers.map((speaker) => (
              <option key={speaker.id} value={speaker.id}>
                {speaker.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contactTo">Contact</label>
          <input
            id="contactTo"
            name="contactTo"
            placeholder="Contact To"
            value={formData.contactTo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="flex-jcc-aic">
          {loading ? (
            <CircularProgress size={20} color={"error"} />
          ) : (
            "Create Event"
          )}
        </button>
      </form>
      <Box py={2}>
        {isAlertVisible && (
          <Alert
            onClose={() => {
              handleAlertClose();
            }}
          >
            Event Created Successfully !
          </Alert>
        )}
      </Box>
      {snackbar}
    </div>
  );
}
