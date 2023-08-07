import React, { useEffect, useState } from "react";
import EventForm from "../EventForm/EventForm";
import "./UpdateEvent.css";
import dateFormatter, {
  convertTo12HourFormat,
} from "../../utils/DateFormatter";

const UpdateEvent = (props) => {
  function getDate() {
    const dateObj = dateFormatter(props.event.date);
    return `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
  }

  function getEventData() {
    return {
      title: props.event.title,
      description: props.event.description,
      date: getDate(),
      time: props.event.time.split(" ")[0],
      speakerName: props.event.speakerName,
      speakerDesignation: props.event.speakerDesignation,
      meetingUrl: props.event.meetingUrl,
      location: props.event.location,
      active: props.event.active,
    };
  }

  function handleBackButton() {
    props.setEventEditing(false);
  }

  const eventDuration = { hours: 0, minutes: 15 };
  return (
    <div className="update-event-container">
      <div className="back-btn-div">
        <i
          class="bx bx-arrow-back back-btn"
          onClick={() => handleBackButton()}
        ></i>
      </div>
      <EventForm
        formDataDefault={getEventData()}
        eventDuration={eventDuration}
        formTitle="Update an Event"
      />
    </div>
  );
};

export default UpdateEvent;
