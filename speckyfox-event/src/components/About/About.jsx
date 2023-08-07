import React from "react";
import Readmore from "../Readmore/Readmore";
import "./About.css";
import speaker from "./../../assets/speaker.png";

export const About = () => {
  return (
    <div className="aboutpage-container">
      <div className="about-header">ABOUT SPEAKER</div>
      <div className="top">
        <div className="speaker-photo">
          <div className="backshape"></div>
          <div className="imgcirclediv">
            <img
              className="imgcircle"
              src="https://peroformenceeventbucket.s3.amazonaws.com/speaker.png"
              alt="speaker photo"
            />
          </div>
          <strong className="botmphoto">Abhishek Aggarwal</strong>
        </div>
        <div className="about-body">
          <Readmore />
        </div>
      </div>
    </div>
  );
};
