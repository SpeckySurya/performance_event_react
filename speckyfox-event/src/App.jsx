import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ThankYouPage from "./pages/ThanksYouPage/ThankYouPage";
import "./App.css";
import "./responsive.css";
import Login from "./pages/Login/Login";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import EventPage from "./pages/EventPage/EventPage";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import MyContext from "./context";

function App() {
  const [sharedState, setSharedState] = useState({ admin: false });
  return (
    <MyContext.Provider value={{ sharedState, setSharedState }}>
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route path="/events" Component={EventPage} />
        <Route path="/thankyou" Component={ThankYouPage} />
        <Route path="/login" Component={Login} />
        <Route
          path="/dashboard"
          Component={sharedState.admin ? DashboardPage : Login}
        />
        <Route path="/error" Component={ErrorPage} />
      </Routes>
    </MyContext.Provider>
  );
}

export default App;
