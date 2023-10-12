import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordService from "../services/PasswordService";
import Skeleton from "@mui/material/Skeleton";
import Login from "../pages/Login/Login";

const AuthGaurd = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, [component]);

  const checkToken = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const passwordService = new PasswordService();
        passwordService
          .validateResetPwdLink(token)
          .then((response) => {
            if (response.data) {
              setStatus(true);
            } else {
              navigate(`/login`);
            }
          })
          .catch((error) => {
            navigate("/error");
          });
      } else {
        navigate(`/login`);
      }
    } catch (error) {
      navigate(`/login`);
    }
  };

  return status ? (
    <React.Fragment>{component}</React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default AuthGaurd;
