import React, { useState, useEffect } from "react";
import { mutate } from "swr";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HorizontalStats from "./HorizontalStats";
import SocialIcons from "./SocialIcons";
import { patchData } from "../../../utils/fetchData";
import AlertToast from "../../AlertToast";
import RevealText from "../../RevealText";
import ProductTypeChips from "./ProductTypeChips";

const BreweryProfile = ({ breweryData, session }) => {
  const router = useRouter();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const {
    slug,
    name,
    type,
    city,
    country,
    description,
    favorite_list,
    image,
    product_type,
  } = breweryData;

  const [addToList, setAddToList] = useState(false);

  useEffect(() => {
    if (session) {
      const userInFavoriteList = favorite_list.includes(session.user._id);
      userInFavoriteList && setAddToList(true);
    }
    return;
  }, []);

  const handleClickFavorite = async () => {
    if (!session) {
      router.push("/signin");
      return;
    }

    await patchData(`breweries/${slug}/favorite`, {
      user_id: session.user._id,
    });
    mutate(`/api/breweries/${slug}`);
    setAddToList(!addToList);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Edit brewery info">
            <IconButton sx={{ padding: 0 }}>
              <EditOutlinedIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="caption" color="text.primary" fontWeight="500">
            {addToList && "You favorited this brewery"}
          </Typography>
          <Tooltip
            title={
              addToList ? "Remove from favorites" : "Favorite this Brewery"
            }
          >
            <IconButton sx={{ padding: 0 }} onClick={handleClickFavorite}>
              {addToList ? (
                <FavoriteIcon color="primary" />
              ) : (
                <FavoriteBorderIcon color="primary" />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      <AlertToast />
      <Divider />
      <Grid container alignItems="center" py={2} px={3}>
        <Grid
          item
          xs={12}
          md={2}
          mr={{ xs: 2, md: 0 }}
          mb={{ xs: 1, md: 0 }}
          align={isMd ? "center" : "left"}
        >
          <Image src={image} alt="name" width="110" height="110" />
        </Grid>

        <Grid item md={10}>
          <Stack justifyContent="center" pl={1}>
            <Typography
              variant="h5"
              fontWeight="bold"
            >{`${name} Brewing Company`}</Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="text.primary" fontWeight="600">
                {type}
              </Typography>
              <ProductTypeChips list={product_type} />
            </Box>
            <Typography variant="caption">
              {city}, {country}
            </Typography>
          </Stack>
          <SocialIcons />
        </Grid>
      </Grid>

      <Divider />

      <HorizontalStats breweryData={breweryData} />
      <Divider />

      <Box px={4} py={2}>
        <RevealText text={description} maxLength={250} />
      </Box>
    </>
  );
};

export default BreweryProfile;
