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
          Reviews
        </Typography>
        <Typography
          variant={isSm ? "h3" : "h4"}
          fontWeight="800"
          color="text.primary"
          gutterBottom
        >
          Explore Top Rated Kombucha
        </Typography>
        <Typography variant={isSm ? "h6" : "subtitle1"} color="text.secondary">
          See top rated kombuchas from our community. Register to submit and
          share your own kombucha tastings.
        </Typography>
        <Typography
          variant={isSm ? "h6" : "subtitle1"}
          color="text.secondary"
        ></Typography>
      </Box>
      <TopKombuchaList kombuchaList={kombuchaList} />
    </Stack>
  );
};

export default ExploreSection;
