import React from "react";
import "./ShowEvent.css";

const ShowEvent = () => {
  return (
    <div className="show-event-container">
      {eventsData.map((event, index) => (
        <div key={index} className="event">
          <h2>{event.title}</h2>
          <p>
            <strong>Date:</strong> {event.date}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
          <p>
            <strong>Speaker:</strong> {event.speakerName} (
            {event.speakerDesignation})
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <a href={event.meetingUrl} target="_blank" rel="noopener noreferrer">
            Join Meeting
          </a>
        </div>
      ))}
    </div>
  );
};

export default ShowEvent;
