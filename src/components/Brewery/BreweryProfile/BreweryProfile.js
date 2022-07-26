import {
  Box,
  Typography,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import HorizontalStats from "./HorizontalStats";
import RevealText from "../../RevealText";
import CustomChips from "../../../components/CustomChips";
import SocialIcons from "./SocialIcons";
import getCloudinaryUrl from "../../../utils/getCloudinaryUrl";

const BreweryProfile = ({ singleBreweryData }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const { name, type, city, country, description, image, product_type } =
    singleBreweryData;

  return (
    <Box>
      <Box p={2.5}>
        <Box
          display="flex"
          alignItems={{ sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Box
            component="img"
            alt={name}
            src={getCloudinaryUrl(image)}
            width={100}
            height={100}
            mr={{ xs: 0, sm: 2 }}
            mb={{ xs: 1, sm: 0 }}
          />
          <Stack justifyContent="center" pl={1}>
            <Typography
              variant={isSm ? "h5" : "h6"}
              fontWeight="700"
            >{`${name} Brewing Company`}</Typography>
            <Box display="flex" alignItems="center" flexWrap="wrap" mb={0.5}>
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight="600"
                mr={1}
              >
                {type}
              </Typography>
              <CustomChips type={product_type} />
            </Box>
            <Typography variant="caption" color="text.primary">
              {city}, {country}
            </Typography>
            <SocialIcons />
          </Stack>
        </Box>
      </Box>
      <Divider />

      <HorizontalStats singleBreweryData={singleBreweryData} />
      <Divider />

      <Box px={3} py={2}>
        <RevealText text={description} maxLength={250} />
      </Box>
    </Box>
  );
};

export default BreweryProfile;
