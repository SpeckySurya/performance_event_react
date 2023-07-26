import React from "react";
import "./ShowEvent.css";

const eventsData = [
  {
    title: "Event 1",
    description: "Description of Event 1",
    date: "2023-07-26T07:45:29.088Z",
    time: "2023-07-26T07:45:29.088Z",
    speakerName: "Speaker 1",
    speakerDesignation: "Speaker Designation 1",
    meetingUrl: "https://example.com/meeting1",
    location: "Event Location 1",
  },
  {
    title: "Event 1",
    description: "Description of Event 1",
    date: "2023-07-26T07:45:29.088Z",
    time: "2023-07-26T07:45:29.088Z",
    speakerName: "Speaker 1",
    speakerDesignation: "Speaker Designation 1",
    meetingUrl: "https://example.com/meeting1",
    location: "Event Location 1",
  },
  {
    title: "Event 1",
    description: "Description of Event 1",
    date: "2023-07-26T07:45:29.088Z",
    time: "2023-07-26T07:45:29.088Z",
    speakerName: "Speaker 1",
    speakerDesignation: "Speaker Designation 1",
    meetingUrl: "https://example.com/meeting1",
    location: "Event Location 1",
  },
  // Add more events here...
];

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
