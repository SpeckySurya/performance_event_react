import React, { useState } from "react";
import "./RegistrationForm.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import RegistrationService from "../../services/RegistrationService";
import { Stack } from "@mui/material";

const RegistrationForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    designation: "",
    mobileNumber: "",
    email: "",
    ptNeeded: false,
    anyPtToolUsed: false,
    eventId: 1,
  });

  const [responseMsg, sertResponseMsg] = useState("");

  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    let obj = new RegistrationService();
    obj
      .saveUser(formData)
      .then((response) => {
        if (response.status == 200) {
          navigate("/thankyou");
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        navigate("/error", { state: error.response.data.message });
      });
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">
          First Name<span className="mark">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">
          Last Name<span className="mark">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="companyName">
          Company<span className="mark">*</span>
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
        <label htmlFor="designation">
          Designation<span className="mark">*</span>
        </label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="mobileNumber">
          Phone<span className="mark">*</span>
        </label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.phone}
          onChange={handleChange}
          minLength={10}
          maxLength={13}
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
        <Stack direction={"row"}>
          <input
            type="checkbox"
            name="ptNeeded"
            checked={formData.needHelp}
            onChange={handleChange}
          />
          <label>
            Do you need any help in Performance Testing?
            <span className="marks">*</span>
          </label>
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
            <span className="marks">*</span>
          </label>
        </Stack>
      </div>
      <span className="msg">
        <p className="note">Note : </p>
        <p className="notemsg">
          All ( <span className="marks">*</span> ) field should be required
        </p>
      </span>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
