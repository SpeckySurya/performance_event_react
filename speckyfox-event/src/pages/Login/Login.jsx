import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenExpireTimer } from "../../utils/Constant";
import LoginService from "./../../services/LoginService";
import "./login.css";

/**
 *
 * This page show a login form to login in the admin dashboard
 *
 * @returns Login Component
 */

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const toLogin = () => navigate("/login");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const loginService = new LoginService();
    loginService
      .adminLogin(formData)
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        tokenExpireTimer(toLogin);
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setMessage("Wrong Credentials !");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        }
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleForgotPassword = () => {
    setForgotPasswordVisible(!forgotPasswordVisible);
  };

  return (
    <>
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
          <Typography fontSize={14} color={"red"}>
            {message}
          </Typography>
          <Link
            to="/forgot-password"
            className="forgot_password"
            onClick={toggleForgotPassword}
          >
            Forgot Password
          </Link>

          <button type="submit" className="flex-jcc-aic">
            {loading ? <CircularProgress size={20} color={"error"} /> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
