import React, { useState } from "react";
import "./RegistrationForm.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import RegistrationService from "../../services/RegistrationService";

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
      .then((response) => navigate("/thankyou"))
      .catch((error) => navigate("/error"));
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
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
        <label htmlFor="lastName">Last Name</label>
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
        <label htmlFor="companyName">Company</label>
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
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="mobileNumber">Phone</label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
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
        <label>Do you need any help in Performance Testing?</label>
        <input
          type="checkbox"
          name="ptNeeded"
          checked={formData.needHelp}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>
          Have you used any tool or did Performance Testing in the past?
        </label>
        <input
          type="checkbox"
          name="anyPtToolUsed"
          checked={formData.usedTool}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
