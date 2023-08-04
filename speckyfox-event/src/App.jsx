import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ThankYouPage from "./pages/ThanksYouPage/ThankYouPage";
import "./App.css";
import "./responsive.css";
import Login from "./pages/Login/Login";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import EventPage from "./pages/EventPage/EventPage";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import MyContext from "./context";
import Editbtn from "./components/Editbtn/Editbtn";

function App() {
  const [sharedState, setSharedState] = useState({
    admin: false,
  });
  return (
    <MyContext.Provider value={{ sharedState, setSharedState }}>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={sharedState.admin ? <DashboardPage /> : <Login />}
        />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </MyContext.Provider>
  );
}

export default App;
