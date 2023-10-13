import React, { useEffect, useState } from "react";
import SpeakerService from "../../services/SpeakerService";
import dateFormatter from "../../utils/DateFormatter";
import EventForm from "../EventForm/EventForm";
import "./UpdateEvent.css";
/**
 *
 * This component is a UpdateEvent . Event can be Updated throw this component.
 *
 * @returns UpdateEvent
 */
const UpdateEvent = (props) => {
  const [speakers, setSpeakers] = useState([]);
  function getDate() {
    const dateObj = dateFormatter(props.event.events.date);
    return `${dateObj.year}-${Number(dateObj.month) + 1 < 10 ? "0" : ""}${
      Number(dateObj.month) + 1
    }-${dateObj.day}`;
  }

  useEffect(() => {
    const speakerService = new SpeakerService();
    speakerService.getAllSpeakers().then((response) => {
      setSpeakers(response.data);
    });
  }, []);

  function getEventData() {
    return {
      eventId: props.event.events.id,
      title: props.event.events.title,
      description: props.event.events.description,
      date: getDate(),
      time: props.event.events.time.split(" ")[0],
      speakerId: props.event.events.speaker.id,
      meetingUrl: props.event.events.meetingUrl,
      location: props.event.events.location,
      active: props.event.events.active,
      banner: props.event.events.eventBanner,
      duration: {
        hours: Number(props.event.events.duration.split(":")[0]),
        minutes: Number(props.event.events.duration.split(":")[1]),
      },
      contactTo: props.event.events.contactTo,
      acceptRegistration: props.event.events.acceptRegistration,
    };
  }

  function handleBackButton() {
    props.setEventEditing(false);
    props.setUpdate(true);
  }

  return (
    <div className="update-event-container">
      <div className="back-btn-div">
        <i
          className="bx bx-arrow-back back-btn"
          onClick={() => handleBackButton()}
        ></i>
      </div>
      <EventForm
        formDataDefault={getEventData()}
        speakers={speakers}
        formTitle="Update"
        setEventEditing={props.setEventEditing}
        handleBackButton={handleBackButton}
      />
    </div>
  );
};

export default UpdateEvent;
