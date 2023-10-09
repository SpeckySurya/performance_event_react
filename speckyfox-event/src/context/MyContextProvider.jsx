import React, { useState } from "react";
import MyContext from "./MyContext";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function MyContextProvider({ children }) {
  const [pages, setPages] = useState([
    { name: "Home", icon: <HomeIcon fontSize="small" /> },
  ]);
  const [popUpBackgroundVisible, setPopUpBackgroundVisible] = useState("none");
  const [eventFilter, setEventFilter] = useState("all");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const updatePages = (newValue) => {
    setPages([
      {
        name: "Home",
        icon: <HomeIcon fontSize="small" />,
        route: () => navigate("/dashboard/events"),
      },
      ...newValue,
    ]);
  };

  return (
    <MyContext.Provider
      value={{
        context: {
          breadCrumb: { pages, updatePages },
          popUpBackground: {
            popUpBackgroundVisible,
            setPopUpBackgroundVisible,
          },
          eventFilter: {
            eventFilter,
            setEventFilter,
          },
          events: {
            events,
            setEvents,
          },
        },
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyContextProvider;
