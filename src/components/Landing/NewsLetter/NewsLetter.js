import {
  Button,
  Typography,
  TextField,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";

const NewsLetter = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid container alignItems="center">
      <Grid item xs={12} md={8}>
        <Box mb={5} textAlign="left">
          <Typography
            variant="h6"
            color="secondary"
            fontWeight="700"
            gutterBottom
          >
            Newsletter
          </Typography>
          <Typography
            variant={isSm ? "h3" : "h4"}
            fontWeight="700"
            gutterBottom
          >
            Subscribe to our Newsletter
          </Typography>
          <Typography
            variant={isSm ? "h6" : "subtitle1"}
            color="text.secondary"
          >
            Be among the firsts to know about our upcoming news and updates.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box component="form">
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="flex-start"
            width={1}
          >
            <Box
              fullWidth
              component={TextField}
              label="Enter your email"
              variant="outlined"
              disabled
              color="primary"
              pb={{ xs: 1, sm: 0 }}
              sx={{ width: 1, maxWidth: 400 }}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ px: 3, py: { xs: 1, sm: 0 }, ml: { sm: 1 } }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NewsLetter;
