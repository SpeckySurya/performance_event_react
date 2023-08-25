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
import PopupAlert from "./components/PopupAlert/PopupAlert";
import SnackbarComponent from "./components/SnackbarComponent/SnackbarComponent";
import TableComponent from "./components/TableComponent/TableComponent";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

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
        <Route path="/pagenotfound" element={<PageNotFound />} />
      </Routes>
    </MyContext.Provider>
  );
}

export default App;
