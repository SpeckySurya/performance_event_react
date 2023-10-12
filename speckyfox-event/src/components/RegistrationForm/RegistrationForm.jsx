import { Button, CircularProgress, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RegistrationService from "../../services/RegistrationService";
import "./RegistrationForm.css";

const RegistrationForm = ({ isOutdated }) => {
  const params = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "NA",
    designation: "",
    mobileNumber: "NA",
    email: "",
    ptNeeded: false,
    anyPtToolUsed: false,
    eventId: params.param,
  });
  const [loading, setLoading] = useState(false);
  const [mobNo, setMobNo] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;

    if (`${value}`.length > 12) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: prevFormData.mobileNumber,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      setMobNo(true);
    }
    if (`${value}`.length > 8) {
      setMobNo(false);
    }
  };

  const handleSubmit = (event) => {
    if (mobNo) {
      event.preventDefault();
      return;
    }
    setLoading(true);
    event.preventDefault();
    let obj = new RegistrationService();

    let firstName = formData.name;
    let lastName = "";
    if (formData.name.trim().includes(" ")) {
      firstName = formData.name.substring(0, formData.name.indexOf(" "));
      lastName = formData.name.substring(formData.name.indexOf(" ") + 1);
    }
    formData.firstName = firstName;
    formData.lastName = lastName;

    if (formData.designation === "") {
      formData.designation = "NA";
    }

    obj
      .saveUser(formData)
      .then((response) => {
        if (response.status == 200) {
          navigate("/thankyou");
        }
      })
      .catch((error) => {
        navigate("/error", { state: error.response.data.message });
      });
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-header-reg">Event Registration</div>
      <div className="form-group">
        <label htmlFor="name">
          Name<span className="mark">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">
          Email<span className="mark">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="companyName">
          Organization<span className="mark">*</span>
        </label>

        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="designation">Designation</label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <Stack direction={"row"}>
          <input
            type="checkbox"
            name="ptNeeded"
            checked={formData.needHelp}
            onChange={handleChange}
          />
          <label>Do you need any help in Performance Testing?</label>
        </Stack>
      </div>

      <div className="form-group">
        <Stack direction={"row"}>
          <input
            type="checkbox"
            name="anyPtToolUsed"
            checked={formData.usedTool}
            onChange={handleChange}
          />
          <label>
            Have you used any tool or did Performance Testing in the past?
          </label>
        </Stack>
      </div>
      <span className="msg">
        <p className="note">
          Note : All <span className="marks"> * </span> field are required
        </p>
      </span>
      {isOutdated ? (
        <Button style={{ backgroundColor: "lightgray" }} disabled>
          Register
        </Button>
      ) : (
        <button type="submit" className="flex-jcc-aic">
          {loading ? (
            <CircularProgress size={24.5} style={{ color: "white" }} />
          ) : (
            "Submit"
          )}
        </button>
      )}
    </form>
  );
};

export default RegistrationForm;
