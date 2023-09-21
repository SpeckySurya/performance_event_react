import React, { useEffect, useState } from "react";
import "./login.css";
import Forgotpassword from "./Forgotpassword";
import { useNavigate } from "react-router-dom";
import LoginService from "./../../services/LoginService";
import { CircularProgress } from "@mui/material";
import { tokenExpireTimer } from "../../utils/Constant";
import { Link } from "react-router-dom";
import SnackbarComponent from "../../components/SnackbarComponent/SnackbarComponent";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      setSnackbar(null);
    }, 3000);
  }, [snackbar]);

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
          setSnackbar(
            <SnackbarComponent message="Wrong credentials" severity="error" />
          );
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
      {snackbar}
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
