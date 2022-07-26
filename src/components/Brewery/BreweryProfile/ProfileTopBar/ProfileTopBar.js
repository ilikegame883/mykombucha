import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { Box, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { patchData } from "../../../../utils/fetchData";
import { AlertContext } from "../../../../stores/context/alert.context";
import { toggleToast } from "../../../../stores/actions";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProfileTopBar = () => {
  const { dispatch } = useContext(AlertContext);
  const { data: session } = useSession();

  const router = useRouter();
  const { slug } = router.query;

  const { data: singleBreweryData, error } = useSWR(
    session?.user ? `/api/breweries/${slug}` : null,
    fetcher
  );

  //check if user in session has already added gave favorite to brewery
  //each brewery document contains favorite_list array field
  const checkUserFavoriteBrewery =
    session &&
    singleBreweryData &&
    singleBreweryData[0].favorite_list.includes(session.user._id);

  const handleClickFavorite = async () => {
    if (!session) {
      router.push("/signin");
      return;
    }

    const res = await patchData(`breweries/${slug}/favorite`, {
      user_id: session.user._id,
    });
    if (res?.msg) {
      mutate(`/api/breweries/${slug}`);
    }
    if (res?.err) dispatch(toggleToast("error", res.err, true));
  };

  return (
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
          {checkUserFavoriteBrewery && "You favorited this brewery"}
        </Typography>
        <Tooltip
          title={
            checkUserFavoriteBrewery
              ? "Remove from favorites"
              : "Favorite this Brewery"
          }
        >
          <IconButton sx={{ padding: 0 }} onClick={handleClickFavorite}>
            {checkUserFavoriteBrewery ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderIcon color="primary" />
            )}
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default ProfileTopBar;
