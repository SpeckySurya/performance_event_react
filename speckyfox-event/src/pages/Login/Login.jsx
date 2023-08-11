import React, { useContext, useState } from "react";
import "./login.css";

import { useNavigate } from "react-router-dom";
import LoginService from "./../../services/LoginService";
import MyContext from "../../context";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setSharedState } = useContext(MyContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const loginService = new LoginService();
    loginService
      .adminLogin(formData)
      .then((response) => {
        setSharedState({ admin: true });
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            Email<span className="mandatory-field">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password<span className="mandatory-field">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="flex-jcc-aic">
          {loading ? <CircularProgress size={20} color={"error"} /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
