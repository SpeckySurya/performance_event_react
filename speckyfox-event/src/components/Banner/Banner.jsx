import React, { useEffect, useState } from "react";
import banner from "./../../assets/banner.png";
import speakerImg from "./../../assets/speaker-at-banner.png";
import "./Banner.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import dateFormatter, {
  convertTo12HourFormat,
} from "../../utils/DateFormatter";

export const Banner = (props) => {
  const [formattedDate, setFormattedDate] = useState({});
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    setFormattedDate(dateFormatter(props.event.date));
    setFormattedTime(convertTo12HourFormat(props.event.time));
  }, [props.event]);

  return (
    <div className="banner flex-jcsb">
      <section className="left flex">
        <div className="event-details flex">
          <div className="event-title">
            <div className="title">
              <header>{props.event.title}</header>
              <div>{props.event.description}</div>
            </div>
          </div>
          <div className="other-details">
            <div className="date-container flex-aic">
              <div className="icon">
                <i className="bx bx-calendar"></i>
              </div>
              <div className="date">
                <div className="day">{formattedDate.dayOfWeekName}</div>
                <div className="full-date">
                  {formattedDate.day} {formattedDate.monthName}{" "}
                  {formattedDate.year}
                </div>
              </div>
            </div>
            <div className="time-container flex-aic">
              <div className="icon">
                <i className="bx bx-time-five bx-spin"></i>
              </div>
              <div className="time">{formattedTime}</div>
            </div>
            <div className="location-container flex-aic">
              <div className="icon">
                <i class="bx bx-broadcast"></i>
              </div>
              <div className="location">Online</div>
            </div>
            <div className="location-container flex-aic">
              <div className="icon">
                <i class="bx bx-envelope"></i>
              </div>
              <div className="email">
                <a
                  className="no-anchor-style"
                  href="mailto:sales@speckyfox.com"
                >
                  Any Queries
                </a>
              </div>
            </div>
            <div className="live-streaming-txt">
              <p>Live Webinar</p>
            </div>
          </div>
        </div>
        <div className="speaker-details flex">
          <section className="speaker-img">
            <img src={speakerImg} alt="speaker image" />
          </section>
          <section className="speaker-name">
            <div style={{ whiteSpace: "nowrap" }}>
              {props.event.speakerName} - {props.event.speakerDesignation}
            </div>
            <p>( Speaker )</p>
          </section>
        </div>
      </section>
      <section className="right">
        <RegistrationForm />
      </section>
    </div>
  );
};
