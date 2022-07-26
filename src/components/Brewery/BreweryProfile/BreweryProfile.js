import React, { useState, useEffect } from "react";
import { mutate } from "swr";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HorizontalStats from "./HorizontalStats";
import { patchData } from "../../../utils/fetchData";
import AlertToast from "../../AlertToast";
import RevealText from "../../RevealText";
import CustomChips from "../../../components/CustomChips";
import SocialIcons from "./SocialIcons";
import getCloudinaryUrl from "../../../utils/getCloudinaryUrl";

const BreweryProfile = ({ breweryData, session }) => {
  const router = useRouter();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

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

  const [favoriteGivenByUser, setFavoriteGivenByUser] = useState(false);

  useEffect(() => {
    if (session) {
      const findUserInFavoriteList = favorite_list.includes(session.user._id);
      findUserInFavoriteList && setFavoriteGivenByUser(true);
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
    setFavoriteGivenByUser(!favoriteGivenByUser);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.5,
        }}
      >
        <Box>
          <Tooltip title="Edit brewery info">
            <IconButton sx={{ padding: 0 }}>
              <EditOutlinedIcon color="action" />
            </IconButton>
          </Tooltip>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="caption" color="text.primary" fontWeight="500">
            {favoriteGivenByUser && "You favorited this brewery"}
          </Typography>
          <Tooltip
            title={
              favoriteGivenByUser
                ? "Remove from favorites"
                : "Favorite this Brewery"
            }
          >
            <IconButton sx={{ padding: 0 }} onClick={handleClickFavorite}>
              {favoriteGivenByUser ? (
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

      <HorizontalStats breweryData={breweryData} />
      <Divider />

      <Box px={3} py={2}>
        <RevealText text={description} maxLength={250} />
      </Box>
    </>
  );
};

export default BreweryProfile;
