import { CircularProgress, Stack } from "@mui/material";
/**
 *
 * This component is a Loading it will genrate circular loading
 *
 * @returns Loading
 */
const Loading = () => {
  return (
    <Stack height={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
