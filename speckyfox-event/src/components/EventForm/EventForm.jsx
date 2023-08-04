import React, { useState } from "react";
import "./EventForm.css";
import EventService from "../../services/EventService";
import { logDOM } from "@testing-library/react";
import { Alert, Box, CircularProgress } from "@mui/material";
import { error } from "jquery";
import { toDDMMYYYY } from "../../utils/DateFormatter";
import Duration from "../Duration/Duration";

const formDataDefault = {
  title: "",
  description: "",
  date: "",
  time: "",
  speakerName: "",
  speakerDesignation: "",
  meetingUrl: "",
  location: "",
  active: "",
};

const EventForm = () => {
  const [formData, setFormData] = useState(formDataDefault);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState({ hours: 0, minutes: 0 });

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (event) => {
    const value = toDDMMYYYY(event.target.value);
    setFormData({ ...formData, [event.target.name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const request = new FormData();
    request.append("profilePicture", selectedFile);
    Object.entries(formData).forEach(([key, val]) => {
      request.append(key, val);
    });
    request.append("date", toDDMMYYYY(formData.date));
    const eventService = new EventService();
    eventService
      .saveEvent(request)
      .then((response) => {
        setIsAlertVisible(true);
        setLoading(false);
        setFormData(formDataDefault);
      })
      .catch((error) => {
        alert("Something went wrong :" + error);
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleDateChange}
            data-date-format="YYYY MM DD"
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
          />
        </div>
        <Duration duration={duration} setDuration={setDuration} />
        <div className="form-group">
          <label htmlFor="speakerName">Speaker Name</label>
          <input
            type="text"
            id="speakerName"
            name="speakerName"
            placeholder="Speaker Name"
            value={formData.speakerName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="speakerDesignation">Speaker Designation</label>
          <input
            type="text"
            id="speakerDesignation"
            name="speakerDesignation"
            placeholder="Speaker Designation"
            value={formData.speakerDesignation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="speakerDesignation">Speaker Photo</label>
          <input
            type="file"
            id="speakerPhoto"
            name="profilePicture"
            placeholder="Speaker Photo"
            onChange={handleFileChange}
          />
        </div>
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="active">Active</label>
          <select name="active" id="active" onChange={handleChange}>
            <option selected value={"false"}>
              False
            </option>
            <option value={"true"}>True</option>
          </select>
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
