import { Box, Button, Stack, Typography, darken } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import TableComponent from "../TableComponent/TableComponent";
/**
 *
 * This component is a ManageUser . can view the participent and also downloaded the List of participent.
 *
 * @returns ManageUser
 */
const ManageUser = () => {
  const tableRef = useRef(null);
  const { context } = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    context.breadCrumb.updatePages([
      { name: "Events", route: () => navigate("/dashboard/events") },
      {
        name: "Manage Participant",
      },
    ]);
  }, []);

  function handleClick() {
    if (tableRef.current) {
      tableRef.current.onBtnExport();
    }
  }

  return (
    <Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontWeight={600}>{location.state.events.title}</Typography>
        <Button
          onClick={handleClick}
          sx={{
            height: "40px",
            my: 2,
            background: "#947f2b",
            color: "white",
            ":hover": {
              background: darken("#947f2b", 0.2),
            },
          }}
          variant="outlined"
        >
          Export
        </Button>
      </Stack>
      <TableComponent ref={tableRef} rowData={location.state?.events?.users} />
    </Box>
  );
};

export default ManageUser;
