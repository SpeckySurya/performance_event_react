import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ThankYouPage from "./pages/ThanksYouPage/ThankYouPage";
import Readmore from "./components/Readmore/Readmore";
import "./App.css";
import "./responsive.css";
import Login from "./pages/Login/Login";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import EventPage from "./pages/EventPage/EventPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" Component={HomePage} />
      <Route path="/events" Component={EventPage} />
      <Route path="/thankyou" Component={ThankYouPage} />
      <Route path="/login" Component={Login} />
      <Route path="/dashboard" Component={DashboardPage} />
      <Route path="/error" Component={ErrorPage} />
    </Routes>
  );
}

export default App;
