import { Box, CircularProgress } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      sx={{
        transform: "translate(-50%,-50%)",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoadingIndicator;
