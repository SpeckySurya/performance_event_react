import React, { useEffect, useState } from "react";
import EventForm from "../EventForm/EventForm";
import "./UpdateEvent.css";
import dateFormatter, {
  convertTo12HourFormat,
} from "../../utils/DateFormatter";
import SpeakerService from "../../services/SpeakerService";

const UpdateEvent = (props) => {
  const [speakers, setSpeakers] = useState([]);
  function getDate() {
    const dateObj = dateFormatter(props.event.events.date);
    return `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
  }

  useEffect(() => {
    const speakerService = new SpeakerService();
    speakerService.getAllSpeakers().then((response) => {
      setSpeakers(response.data);
    });
  }, []);

  console.log(props.event);

  function getEventData() {
    return {
      eventId: props.event.events.id,
      title: props.event.events.title,
      description: props.event.events.description,
      date: getDate(),
      time: props.event.events.time.split(" ")[0],
      speakerId: props.event.speakerDetails.id,
      meetingUrl: props.event.events.meetingUrl,
      location: props.event.events.location,
      active: props.event.events.active,
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
  }

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
        speakers={speakers}
        formTitle="Update"
      />
    </div>
  );
};

export default UpdateEvent;
