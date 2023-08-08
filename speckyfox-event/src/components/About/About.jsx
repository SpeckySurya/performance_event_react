import React from "react";
import Readmore from "../Readmore/Readmore";
import "./About.css";
import speaker from "./../../assets/speaker.png";

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
              // src="https://peroformenceeventbucket.s3.amazonaws.com/speaker.png"
              src={props.event.profilePicture}
              alt="speaker photo"
            />
          </div>
          <strong className="botmphoto">{props.event.speakerName}</strong>
        </div>
        <div className="about-body">
          <Readmore event={props.event} />
        </div>
      </div>
    </div>
  );
};
