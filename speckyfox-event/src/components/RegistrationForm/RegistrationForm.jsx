import React, { useState } from "react";
import "./RegistrationForm.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import RegistrationService from "../../services/RegistrationService";
import { CircularProgress, LinearProgress, Stack } from "@mui/material";

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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form field changes
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
    }
    console.log(formData);
  };

  // Handle form submission
  const handleSubmit = (event) => {
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

    obj
      .saveUser(formData)
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
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
      {/* <div className="form-group">
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
      </div> */}

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
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handlePhoneChange}
          type="number"
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
          Note : All <span className="marks"> * </span> field should be required
        </p>
      </span>
      <button type="submit" className="flex-jcc-aic">
        {loading ? (
          <CircularProgress size={24.5} style={{ color: "white" }} />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default RegistrationForm;
