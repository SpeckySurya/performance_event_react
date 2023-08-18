import React, { useEffect, useState } from "react";
import "./EventForm.css";
import EventService from "../../services/EventService";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { toDDMMYYYY } from "../../utils/DateFormatter";
import Duration from "../Duration/Duration";

const EventForm = (props) => {
  const [formData, setFormData] = useState(props.formDataDefault);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(props.formDataDefault.duration);

  console.log(props.formDataDefault, props.eventDuration);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (event) => {
    const value = toDDMMYYYY(event.target.value);
    setFormData({ ...formData, [event.target.name]: value });
  };

  const handleSubmit = (event) => {
    console.log(props.formDataDefault);
    console.log(formData);
    event.preventDefault();
    setLoading(true);
    const request = new FormData();
    request.append("eventBanner", selectedFile);
    Object.entries(formData).forEach(([key, val]) => {
      request.append(key, val);
    });
    request.delete("duration");
    request.append(
      "duration",
      `${formData.duration.hours}:${formData.duration.minutes}`
    );
    // request.append("date", toDDMMYYYY(formData.date));
    for (const entry of request.entries()) {
      console.log(entry[0], entry[1]);
    }
    const eventService = new EventService();
    if (props.formTitle === "Update") {
      eventService
        .updateEvent(formData.eventId, request)
        .then((response) => {
          setIsAlertVisible(true);
          setLoading(false);
          setFormData(props.formDataDefault);
        })
        .catch((error) => {
          alert("Something went wrong :" + error);
        });
    } else {
      eventService
        .saveEvent(request)
        .then((response) => {
          setIsAlertVisible(true);
          setLoading(false);
          setFormData(props.formDataDefault);
        })
        .catch((error) => {
          alert("Something went wrong :" + error);
        });
    }
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
      <h1>{props.formTitle} an Event</h1>
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
            onChange={handleDateChange}
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
            type="text"
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
          <select name="active" id="active" onChange={handleChange} required>
            <option selected value={"false"}>
              False
            </option>
            <option value={"true"}>True</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="activeHomePage">
            Active Registration for Homepage
          </label>
          <select
            name="activeHomePage"
            id="activeHomePage"
            onChange={handleChange}
            required
          >
            <option selected value={"false"}>
              False
            </option>
            <option value={"true"}>True</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="eventBanner">Event Banner</label>
          <input
            type="file"
            id="eventBanner"
            name="eventBanner"
            placeholder="Event Banner"
            onChange={handleFileChange}
            required
          />
          <Typography fontSize={10}>Max file size : 2 MB</Typography>
        </div>
        <div className="form-group">
          <label htmlFor="speakerId">Speaker</label>
          <select
            name="speakerId"
            id="speakerId"
            onChange={handleChange}
            required
          >
            <option selected value="" disabled>
              Speaker name
            </option>
            {props.speakers.map((speaker) => (
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
            Event created successfully !
          </Alert>
        )}
      </Box>
    </div>
  );
};

export default EventForm;
