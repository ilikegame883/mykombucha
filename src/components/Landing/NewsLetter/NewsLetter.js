import {
  Container,
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
      <Box sx={{ textAlign: alignPosition }} pb={4}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Subscribe to our newsletter
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Be among the firsts to know about our upcoming news and updates.
        </Typography>
      </Box>
      <Container maxWidth="sm">
        <Box
          component={"form"}
          noValidate
          autoComplete="off"
          sx={{
            "& .MuiInputBase-input.MuiOutlinedInput-input": {
              bgcolor: "background.paper",
            },
          }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretched", sm: "flex-start" }}
            mb={3}
          >
            <Box
              flex={"1 1 auto"}
              component={TextField}
              label="Enter your email"
              variant="outlined"
              disabled
              color="primary"
              mb={{ xs: 2, sm: 0 }}
            />
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ py: { xs: 2, sm: 0 }, ml: { sm: 1.5 }, height: 54 }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Stack>
  );
};

export default NewsLetter;
