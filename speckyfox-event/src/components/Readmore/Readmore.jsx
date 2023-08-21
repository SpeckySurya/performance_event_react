import { useEffect } from "react";
import { useState } from "react";
import "./Readmore.css";

function Readmore(props) {
  const [check, setcheck] = useState(true);

  useEffect(() => {
    console.log(props.speaker);
  }, [props.speaker]);
  function funreadmoreorless() {
    setcheck(!check);
  }
  return (
    <div className="textcontainer">
      <input type="checkbox" id="check" />
      <p>
        {props.speaker?.aboutSpeaker?.length <= 100
          ? props.speaker?.aboutSpeaker
          : props.speaker?.aboutSpeaker?.substring(0, 101)}
      </p>
      <div className="content">
        <p>{props.speaker?.aboutSpeaker?.substring(101)}</p>
      </div>
      {props.speaker?.aboutSpeaker?.length <= 100 ? null : (
        <div>
          <label htmlFor="check" onClick={funreadmoreorless} className="more">
            {check ? <p>Read More...</p> : <p>Read Less...</p>}
          </label>
        </div>
      )}
    </div>
  );
}
export default Readmore;
