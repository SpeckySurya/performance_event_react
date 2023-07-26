import React, { useState } from "react";
import "./NotifyParticipant.css";

let participants = [];

const events = ["Event 1", "Event 2"];

const NotifyParticipant = () => {
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [notifyAll, setNotifyAll] = useState(false);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    return [
      "Participant 1",
      "Participant 2",
      "Participant 3",
      "Participant 4",
      // Add more participants as needed
    ];
  };

  const handleParticipantSelect = (event) => {
    const selectedParticipant = event.target.value;
    setSelectedParticipants((prevSelectedParticipants) =>
      prevSelectedParticipants.includes(selectedParticipant)
        ? prevSelectedParticipants.filter(
            (participant) => participant !== selectedParticipant
          )
        : [...prevSelectedParticipants, selectedParticipant]
    );
  };

  const handleNotifyClick = () => {
    // Replace this with your notify logic for selected participants
    console.log("Notifying selected participants:", selectedParticipants);
  };

  const handleNotifyAllClick = () => {
    // Replace this with your notify logic for all participants
    console.log("Notifying all participants");
    setNotifyAll(true);
  };

  return (
    <div className="notify-participant-container">
      <h2>Notify Participants</h2>
      <div className="dropdown-container">
        <select onChange={handleEventSelect} value="">
          <option value="" disabled hidden>
            Select Event
          </option>
          {events.map((event, index) => (
            <option key={index} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown-container">
        <select onChange={handleParticipantSelect} value="">
          <option value="" disabled hidden>
            Select Participant
          </option>
          {participants.map((participant, index) => (
            <option key={index} value={participant}>
              {participant}
            </option>
          ))}
        </select>
      </div>
      <div className="selected-participants">
        {selectedParticipants.length > 0 ? (
          <>
            <p>Selected Participants:</p>
            <ul>
              {selectedParticipants.map((participant, index) => (
                <li key={index}>{participant}</li>
              ))}
            </ul>
            <button onClick={handleNotifyClick}>Notify</button>
          </>
        ) : (
          <p>No participants selected.</p>
        )}
      </div>
      <div className="notify-all">
        <button onClick={handleNotifyAllClick}>Notify All</button>
      </div>
    </div>
  );
};

export default NotifyParticipant;
