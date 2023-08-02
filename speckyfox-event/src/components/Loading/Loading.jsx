import { CircularProgress, Stack } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Stack height={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
