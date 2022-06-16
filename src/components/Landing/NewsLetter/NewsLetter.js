import {
  Button,
  Typography,
  TextField,
  Box,
  useTheme,
  Stack,
  useMediaQuery,
} from "@mui/material";

const NewsLetter = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"), {
    defaultMatches: true,
  });

  const alignPosition = isSm ? "center" : "left";

  return (
    <Stack>
      <Box sx={{ textAlign: alignPosition }} mb={4}>
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Subscribe to our newsletter
        </Typography>
        <Typography variant={isSm ? "h6" : "subtitle1"} color="text.secondary">
          Be among the firsts to know about our upcoming news and updates.
        </Typography>
      </Box>
      <Box
        component={"form"}
        noValidate
        autoComplete="off"
        display="flex"
        justifyContent="center"
        sx={{
          "& .MuiInputBase-input.MuiOutlinedInput-input": {
            bgcolor: "background.paper",
          },
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          width={{ xs: 1, md: "50%" }}
        >
          <Box
            fullWidth
            component={TextField}
            label="Enter your email"
            variant="outlined"
            disabled
            color="primary"
            mb={{ xs: 2, sm: 0 }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ px: 4, py: { xs: 2, sm: 0 }, ml: { sm: 1.5 } }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default NewsLetter;
