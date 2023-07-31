import React, { useState } from "react";
import "./EventForm.css";
import EventService from "../../services/EventService";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    speakerName: "",
    speakerDesignation: "",
    meetingUrl: "",
    location: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const request = new FormData();
    request.append("speakerPhoto", selectedFile);
    Object.entries(formData).forEach(([key, val]) => {
      request.append(key, val);
    });
    const eventService = new EventService();
    eventService.saveEvent(request);
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
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
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
            name="speakerPhoto"
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
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
