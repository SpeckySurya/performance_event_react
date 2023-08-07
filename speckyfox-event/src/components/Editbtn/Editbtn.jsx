import { Button } from "bootstrap";
import "./Editbtn.css";
import EventService from "../../services/EventService";
function Editbtn(props) {
  function fun1() {
    document.getElementById("frame1").classList.add("style");
    document.getElementById("frame1").style.visibility = "visible";
  }
  function remove() {
    document.getElementById("frame1").classList.remove("style");
    document.getElementById("frame1").style.visibility = "hidden";
  }

  function handleDelete() {
    const eventService = new EventService();
    eventService.deleteEvent(props.eventId);
  }

  function handleEdit() {
    props.setEventEditing(true);
    props.setEditEvent(props.event);
  }

  return (
    <>
      <div className="container">
        <div className="group-menu" onClick={fun1}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="frame1" id="frame1">
          <div className="info">
            <button className="editbtn" onClick={() => handleEdit()}>
              Edit
            </button>
          </div>
          <div className="info">
            <button className="editbtn" onClick={() => handleDelete()}>
              Delete
            </button>
          </div>
          <div className="info">
            <button className="editbtn">Active</button>
          </div>
          <div className="info">
            <button className="editbtn" onClick={remove}>
              Exit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Editbtn;
