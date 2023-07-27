import React from "react";
import banner from "./../../assets/banner.png";
import speakerImg from "./../../assets/speaker-at-banner.png";
import "./Banner.css";
import "./BannerResponsive.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

export const Banner = () => {
  return (
    <div className="banner flex-jcsb">
      <section className="left flex">
        <div className="event-details flex">
          <div className="event-title">
            <p className="title">
              <header>LIVE WEBINAR</header>
              <div>Stepping stones for performance testing</div>
            </p>
          </div>
          <div className="other-details">
            <p className="date-container flex-aic">
              <div className="icon">
                <i className="bx bx-calendar"></i>
              </div>
              <div className="date">
                <div className="day">Friday</div>
                <div className="full-date">08 June 2025</div>
              </div>
            </p>
            <p className="time-container flex-aic">
              <div className="icon">
                <i className="bx bx-time-five bx-spin"></i>
              </div>
              <div className="time">10.00 AM</div>
            </p>
            <p className="location-container flex-aic">
              <div className="icon">
                <i className="bx bxs-map"></i>
              </div>
              <div className="location">Thailand</div>
            </p>
            <div className="live-streaming-txt">
              <p>Live Streaming</p>
            </div>
          </div>
        </div>
        <div className="speaker-details flex-jcc-aic">
          <section className="speaker-img">
            <img src={speakerImg} alt="speaker image" />
          </section>
          <section className="speaker-name">
            Abhishek Aggarwal
            <br />( Speaker )
          </section>
        </div>
      </section>
      <section className="right">
        <RegistrationForm />
      </section>
    </div>
  );
};
