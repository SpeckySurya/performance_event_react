import "./About.css";
/**
 *
 * This components show About speaker section details . related to speaker
 *
 * @returns About component
 */
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
              src={props.event.speaker.picture}
              alt="speaker photo"
            />
          </div>
        </div>
        <div className="about-body" style={{ fontSize: "15px" }}>
          {props.event.speaker?.aboutSpeaker}
        </div>
      </div>
    </div>
  );
};
