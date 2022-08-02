import { Typography, Box, useMediaQuery, Grid, useTheme } from "@mui/material";
import TopKombuchaList from "./TopKombuchaList";

const Discover = ({ kombuchaList }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"), {});

  return (
    <Grid container alignItems="center">
      <Grid item xs={12} md={6} align="left">
        <Box mb={5}>
          <Box display="flex" justifyContent="flex-start" mb={1}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Box key={item} color={theme.palette.secondary.main}>
                <svg
                  width={20}
                  height={20}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </Box>
            ))}
          </Box>
          <Typography
            variant={isSm ? "h3" : "h4"}
            fontWeight="700"
            color="text.primary"
            gutterBottom
          >
            Discover Top Rated Kombucha
          </Typography>
          <Typography
            variant={isSm ? "h6" : "subtitle1"}
            color="text.secondary"
          >
            See top rated kombuchas from our community. {isSm && <br />}{" "}
            Register to rate and share your own kombucha experience.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} align="center">
        <TopKombuchaList kombuchaList={kombuchaList} />
      </Grid>
    </Grid>
  );
};

export default Discover;
