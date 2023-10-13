import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EventService from "../../services/EventService";
import dateFormatter, { toDDMMYYYY } from "../../utils/DateFormatter";
import Duration from "../../components/Duration/Duration";
import SpeakerService from "../../services/SpeakerService";
import SnackbarComponent from "../../components/SnackbarComponent/SnackbarComponent";
import MyContext from "../../context/MyContext";

/**
 *
 * Used to display a form to edit event.
 *
 * @returns Edit event Form Component
 */

export default function EditEventForm() {
  const location = useLocation();

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
        name: "Edit Event",
      },
    ]);
  }, []);

  function getDate() {
    const dateObj = dateFormatter(location?.state?.event?.events?.date);
    return `${dateObj.year}-${Number(dateObj.month) + 1 < 10 ? "0" : ""}${
      Number(dateObj.month) + 1
    }-${dateObj.day}`;
  }

  const formDataDefault = {
    eventId: location?.state?.event?.events?.id,
    title: location?.state?.event?.events?.title,
    description: location?.state?.event?.events?.description,
    date: getDate(),
    time: location?.state?.event?.events?.time?.split(" ")[0],
    speakerId: location?.state?.event?.events?.speaker?.id,
    meetingUrl: location?.state?.event?.events?.meetingUrl,
    location: location?.state?.event?.events?.location,
    active: location?.state?.event?.events?.active,
    banner: location?.state?.event?.events?.eventBanner,
    duration: {
      hours: Number(location?.state?.event?.events?.duration?.split(":")[0]),
      minutes: Number(location?.state?.event?.events?.duration?.split(":")[1]),
    },
    contactTo: location?.state?.event?.events?.contactTo,
    acceptRegistration: location?.state?.event?.events?.acceptRegistration,
  };

  const [formData, setFormData] = useState(formDataDefault);
  const [selectedFile, setSelectedFile] = useState(null);
  const [speakerSelect, setSpeakerSelect] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState(null);
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
      .updateEvent(formData.eventId, request)
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
          <SnackbarComponent
            message="Something went wrong"
            severity="success"
          />
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
      <h1>Edit Event</h1>
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
          <img
            style={{ width: "100px", margin: "10px" }}
            src={formDataDefault.banner}
          />
        </div>
        <div className="form-group">
          <label htmlFor="speakerId">Speaker</label>
          <select
            name="speakerId"
            id="speakerId"
            onChange={handleChange}
            value={formDataDefault.speakerId}
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
            "Update Event"
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
            Event Updated Successfully !
          </Alert>
        )}
      </Box>
      {snackbar}
    </div>
  );
}
