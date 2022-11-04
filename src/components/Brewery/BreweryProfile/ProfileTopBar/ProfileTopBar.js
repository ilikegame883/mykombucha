import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { Box, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { patchData } from "../../../../utils/fetchData";
import { AlertContext } from "../../../../stores/context/alert.context";
import { toggleSnackBar } from "../../../../stores/alert.actions";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProfileTopBar = () => {
  const { dispatch } = useContext(AlertContext);
  const { data: session } = useSession();

  const router = useRouter();
  const { slug } = router.query;

  //fetch brewery data clientside with SWR to show live updates when user favorites a brewery
  //fetch only when user is logged in
  const { data: singleBreweryData } = useSWR(
    session?.user ? `/api/breweries/${slug}` : null,
    fetcher
  );

  const checkUserFavoriteBrewery =
    session &&
    singleBreweryData &&
    singleBreweryData[0].favorite_list.includes(session.user._id);

  const handleClickFavorite = async () => {
    if (!session) {
      dispatch(
        toggleSnackBar(
          "error",
          "Login/Register to favorite this brewery!",
          true
        )
      );
      return;
    }

    const res = await patchData(`breweries/${slug}/users/favorite`, {
      user_id: session.user._id,
    });
    if (res?.msg) {
      mutate(`/api/breweries/${slug}`);
      dispatch(toggleSnackBar("success", res.msg, true));
    }
    if (res?.err) dispatch(toggleSnackBar("error", res.err, true));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1.5,
        bgcolor: "#F7F9FC",
      }}
    >
      <Link href={`/breweries/${slug}/corrections`}>
        <a style={{ maxHeight: 24 }}>
          <Tooltip title="Edit brewery info">
            <EditOutlinedIcon color="action" />
          </Tooltip>
        </a>
      </Link>

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
