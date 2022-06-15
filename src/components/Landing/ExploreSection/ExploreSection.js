import { Stack, Typography, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TopKombuchaList from "./TopKombuchaList";

const ExploreSection = ({ kombuchaList }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"), {
    defaultMatches: true,
  });
  const alignPosition = isSm ? "center" : "left";

  return (
    <Stack alignItems="center">
      <Box mb={5} textAlign={alignPosition}>
        <Typography
          variant="h6"
          color="secondary"
          fontWeight="700"
          gutterBottom
        >
          Review
        </Typography>
        <Typography
          variant="h3"
          fontWeight="800"
          color="text.primary"
          gutterBottom
        >
          Explore Top Rated Kombucha
        </Typography>
        <Typography variant="h6" color="text.secondary">
          See top rated kombuchas from our growing community.
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Share your own experiences with all the different types of kombucha
          {` you've`} tried.
        </Typography>
      </Box>
      <TopKombuchaList kombuchaList={kombuchaList} />
    </Stack>
  );
};

export default ExploreSection;
