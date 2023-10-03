import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import "./responsive.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ManageAdmin from "./components/ManageAdmin/ManageAdmin";
import DashboardPage2 from "./pages/DashboardPage2/DashboardPage2";
import DashboardEventView from "./dashboard-components/DashboardEventView/DashboardEventView";
import MyContextProvider from "./context/MyContextProvider";
import NotifyParticipant from "./components/NotifyParticipant/NotifyParticipant";
import ManageUser from "./components/ManageUser/ManageUser";
import UploadVideoAndPdf from "./components/UploadVideoAndPdf/UploadVideoAndPdf";
import { Box } from "@mui/material";
import MyContext from "./context/MyContext";
import CreateEventForm from "./dashboard-components/CreateEventForm/CreateEventForm";
function App() {
  const { context } = useContext(MyContext);
  return (
    <>
      <Box
        className={"pop-up-background"}
        display={context.popUpBackground.popUpBackgroundVisible}
      ></Box>
      <Routes>
        <Route path="dashboard" element={<DashboardPage2 />}>
          <Route path="events" element={<DashboardEventView />} />
          <Route path="users" element={<ManageAdmin />} />
          <Route
            path="events/notify-participant"
            element={<NotifyParticipant />}
          />
          <Route path="events/manage-participant" element={<ManageUser />} />
          <Route
            path="events/upload-event-data"
            element={<UploadVideoAndPdf />}
          />
          <Route path="events/create-event" element={<CreateEventForm />} />
        </Route>
        <Route path="login" element={<Login />} />
        {/* <Route path="/" element={<DashboardEventView />} /> */}
        {/* <Route exact path="/" element={<EventPage />} />
        <Route path="/:param" element={<HomePage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
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
        <Route path="/privacy" element={<PrivacyPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
