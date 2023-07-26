import React, { useState } from "react";
import { Header } from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import EventForm from "../../components/EventForm/EventForm";
import "./DashboardPage.css";
import NotifyParticipant from "../../components/NotifyParticipant/NotifyParticipant";
import ShowEvent from "../../components/ShowEvent/ShowEvent";

export const DashboardPage = () => {
  const [selected, setSelected] = useState("create");

  function handleSidebar(data) {
    setSelected(data);
  }

  function menuComponentFinder() {
    switch (selected) {
      case "create":
        return <EventForm />;
      case "show":
        return <ShowEvent />;
      case "notify":
        return <NotifyParticipant />;
      default:
        return null;
    }
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-body flex">
        <div className="sidebar">
          <ul>
            <li onClick={() => handleSidebar("create")}>Create Event</li>
            <li onClick={() => handleSidebar("show")}>Show Events</li>
            <li onClick={() => handleSidebar("notify")}>Notify</li>
          </ul>
        </div>
        <div className="sidebar-content">{menuComponentFinder()}</div>
      </div>
    </>
  );
};
