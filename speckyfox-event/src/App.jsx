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
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Forgotpassword from "./pages/Login/Forgotpassword";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import AdminUpdatePassword from "./components/AdminUpdatePassword/AdminUpdatePassword";
import AdminRegistration from "./components/AdminRegistation/AdminRegistation";
import LinkExpired from "./pages/LinkExpired/LinkExpired";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage";
import PrivacyPage from "./pages/PrivacyPage/PrivacyPage";
function App() {
  const [sharedState, setSharedState] = useState({
    admin: false,
  });

  return (
    <MyContext.Provider value={{ sharedState, setSharedState }}>
      <Routes>
        <Route exact path="/" element={<EventPage />} />
        <Route path="/:param" element={<HomePage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/pagenotfound" element={<PageNotFound />} />

        <Route path="/admin-registation" element={<AdminRegistration />} />
        <Route
          path="/admin-update-password"
          element={<AdminUpdatePassword />}
        />

        <Route path="/forgot-password/:token" element={<UpdatePassword />} />
        <Route path="/link-expired" element={<LinkExpired />} />
        <Route path="/t-and-c" element={<TermsAndConditionsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </MyContext.Provider>
  );
}

export default App;
