import { useContext } from "react";
import { Routes } from "react-router-dom";
import "./App.css";
import "./responsive.css";

import { Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import MyContext from "./context/MyContext";
import AuthRoutes from "./routes/AuthRoutes";
import UnAuthRoutes from "./routes/UnauthRoutes";
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
      <ToastContainer position="bottom-right" newestOnTop />
    </SnackbarProvider>
  );
}

export default App;
