import { CircularProgress, Stack } from "@mui/material";

const Loading = () => {
  return (
    <Stack height={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
