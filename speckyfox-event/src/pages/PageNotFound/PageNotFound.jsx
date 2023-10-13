import { Box } from "@mui/material";

/**
 *
 * This page shows a static content to indicate page not found. We can use this page when user requesting page that doesn't exist.
 *
 * @returns Page Not Found component
 */

const PageNotFound = () => {
  return (
    <Box textAlign={"center"}>
      <h1>404</h1>
      <h3>Page not found !</h3>
    </Box>
  );
};

export default PageNotFound;
