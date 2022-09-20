import React from "react";
import Link from "next/link";
import {
  Box,
  Rating,
  Typography,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import HorizontalStats from "./HorizontalStats";
import PublicIcon from "@mui/icons-material/Public";
import getCloudinaryUrl from "../../../utils/getCloudinaryUrl";

const KombuchaProfile = ({ singleKombuchaData }) => {
  const {
    brewery_name,
    product_type,
    name,
    served_in,
    ABV,
    avg,
    image,
    brewery_slug,
    description,
    flavor,
  } = singleKombuchaData;

  return (
    <>
      <Box p={2.5}>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
          <Box
            component="img"
            alt={name}
            src={getCloudinaryUrl(image)}
            width={100}
            height={100}
            mb={{ xs: 1, sm: 0 }}
            mr={{ xs: 0, sm: 2 }}
          />
          <Stack justifyContent="center">
            <Typography variant="h5" fontWeight="700">
              {name}
            </Typography>
            <Box mb={0.25}>
              <Link href={`/breweries/${brewery_slug}`} passHref>
                <Typography
                  variant="body1"
                  component="a"
                  color="text.secondary"
                  fontWeight="500"
                  gutterBottom
                >{`${brewery_name} Brewing Company`}</Typography>
              </Link>
            </Box>
            <Box display="flex">
              <Box display="flex" alignItems="center">
                <Rating
                  name="kombucha-rating"
                  precision={0.25}
                  value={Boolean(avg) ? avg : 0}
                  readOnly
                  size="small"
                />
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight="600"
                  ml={0.5}
                >
                  {Boolean(avg) && `(${avg.toFixed(2)})`}
                </Typography>
              </Box>

              <IconButton sx={{ p: 0, ml: 0.5 }}>
                <PublicIcon fontSize="small" />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Divider />
      <HorizontalStats served_in={served_in} ABV={ABV} style={product_type} />
      <Divider />
      <Box px={{ xs: 2, sm: 3 }} py={2}>
        <Typography variant="body2" gutterBottom>
          <b>Flavor</b>: {flavor.map((f) => f).join(", ")}
        </Typography>
        <Typography variant="body2">
          <b>Description:</b> {description}
        </Typography>
      </Box>
    </>
  );
};

export default KombuchaProfile;
