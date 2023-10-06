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
import AdminRegistration from "./components/AdminRegistation/AdminRegistation";
import ShowSpeaker from "./components/ShowSpeaker/ShowSpeaker";
import ManageSpeaker from "./components/ManageSpeaker/ManageSpeaker";
import EditEventForm from "./dashboard-components/EditEventForm/EditEventForm";
import AdminUpdatePassword from "./components/AdminUpdatePassword/AdminUpdatePassword";
import HomePageConfiguration from "./components/HomePageConfiguration/HomePageConfiguration";
import CreateSpeakerForm from "./dashboard-components/CreateSpeakerForm/CreateSpeakerForm";
import EditSpeakerForm from "./dashboard-components/EditSpeakerForm/EditSpeakerForm";
import EventPage from "./pages/EventPage/EventPage";
import HomePage from "./pages/HomePage/HomePage";
import ThankYouPage from "./pages/ThanksYouPage/ThankYouPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import LinkExpired from "./pages/LinkExpired/LinkExpired";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage";
import PrivacyPage from "./pages/PrivacyPage/PrivacyPage";
import AuthRoutes from "./routes/AuthRoutes";
import UnAuthRoutes from "./routes/UnauthRoutes";
import { SnackbarProvider } from "material-ui-snackbar-provider";
function App() {
  const { context } = useContext(MyContext);
  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <Box
        className={"pop-up-background"}
        display={context.popUpBackground.popUpBackgroundVisible}
      ></Box>
      <Routes>
        {AuthRoutes}
        {UnAuthRoutes}
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
