import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventHomePage from "./pages/EventHomePage/EventHomePage";
import ThankYouPage from "./pages/ThanksYouPage/ThankYouPage";
import "./App.css";
import "./responsive.css";
import Login from "./pages/Login/Login";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" Component={EventHomePage} />
      <Route path="/thankyou" Component={ThankYouPage} />
      <Route path="/login" Component={Login} />
      <Route path="/dashboard" Component={DashboardPage} />
      <Route path="/error" Component={ErrorPage} />
    </Routes>
  );
}

export default App;
