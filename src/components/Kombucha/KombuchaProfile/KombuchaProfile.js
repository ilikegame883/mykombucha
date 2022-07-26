import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  Rating,
  Typography,
  Divider,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import HorizontalStats from "./HorizontalStats";
import PublicIcon from "@mui/icons-material/Public";
import getCloudinaryUrl from "../../../utils/getCloudinaryUrl";
import CustomChips from "../../CustomChips";

const KombuchaProfile = ({ kombuchaData }) => {
  const router = useRouter();

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const {
    brewery_name,
    product_type,
    name,
    served_in,
    ABV,
    wish_list_users,
    _id,
    avg,
    image,
    brewery_slug,
    description,
    flavor,
  } = kombuchaData;

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
            mb={{ xs: 2, sm: 0 }}
            mr={{ xs: 0, sm: 2 }}
          />
          <Stack justifyContent="center">
            <Box display="flex" alignItems="center" flexWrap="wrap">
              <Typography variant="h5" fontWeight="700" mr={1}>
                {name}
              </Typography>
              <CustomChips type={product_type} />
            </Box>

            <Link href={`/breweries/${brewery_slug}`} passHref>
              <Typography
                variant={isSm ? "h6" : "body1"}
                component="a"
                color="text.secondary"
                fontWeight="500"
                mb={0.25}
              >{`${brewery_name} Brewing Company`}</Typography>
            </Link>
            <Box display="flex">
              {Boolean(avg) && (
                <Box display="flex" alignItems="center" mr={1}>
                  <Rating
                    name="kombucha-rating"
                    precision={0.25}
                    value={avg}
                    readOnly
                    size="small"
                  />
                  <Typography
                    variant="body1"
                    color="text.primary"
                    fontWeight="600"
                    ml={0.5}
                  >
                    ({avg.toFixed(2)})
                  </Typography>
                </Box>
              )}

              <IconButton sx={{ p: 0 }}>
                <PublicIcon />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Divider />
      <HorizontalStats served_in={served_in} ABV={ABV} flavor={flavor} />
      <Divider />
      <Box px={{ xs: 2, sm: 3 }} py={2}>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </>
  );
};

export default KombuchaProfile;
