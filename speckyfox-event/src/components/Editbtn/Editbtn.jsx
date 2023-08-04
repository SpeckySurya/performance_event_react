import { Button } from "bootstrap";
import "./Editbtn.css";
function Editbtn() {
  function fun1() {
    document.getElementById("frame1").classList.add("style");
    document.getElementById("frame1").style.visibility = "visible";
  }
  function remove() {
    document.getElementById("frame1").classList.remove("style");
    document.getElementById("frame1").style.visibility = "hidden";
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
            <button className="editbtn">Edit</button>
          </div>
          <div className="info">
            <button className="editbtn">Delete</button>
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
