import React from "react";
import Readmore from "../Readmore/Readmore";
import "./About.css";

export const About = (props) => {
  return (
    <div className="aboutpage-container">
      <div className="about-header">ABOUT SPEAKER</div>
      <div className="top">
        <div className="speaker-photo">
          <div className="backshape"></div>
          <div className="imgcirclediv">
            <img
              className="imgcircle"
              src={props.speaker.picture}
              alt="speaker photo"
            />
          </div>
        </div>
        <div className="about-body">
          <Readmore speaker={props.speaker} />
        </div>
      </div>
    </div>
  );
};
