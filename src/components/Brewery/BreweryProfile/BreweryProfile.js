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

  const { name, type, city, country, description, image, product_type, urls } =
    singleBreweryData;
  return (
    <Box>
      <Box p={2.5}>
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Box
            component="img"
            alt={name}
            src={getCloudinaryUrl(image)}
            width={80}
            height={80}
            mr={{ xs: 0, sm: 2 }}
            mb={{ xs: 1, sm: 0 }}
          />
          <Stack justifyContent="center">
            <Typography
              variant={isSm ? "h5" : "h6"}
              fontWeight="700"
            >{`${name} Brewing Company`}</Typography>
            <Box
              display="flex"
              alignItems="flex-end"
              flexWrap="wrap"
              mb={{ xs: 0.5, sm: 0.25 }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight="500"
                mr={1}
              >
                {type}
              </Typography>
              <CustomChips type={product_type} />
            </Box>
            <Typography variant="caption" color="text.primary">
              {city}, {country}
            </Typography>
            <SocialIcons urls={urls} />
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
