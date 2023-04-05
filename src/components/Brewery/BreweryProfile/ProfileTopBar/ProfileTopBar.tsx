import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { patchData } from "../../../../utils/fetch-utils";
import { useSetSnackbar } from "../../../../utils/hooks/useSnackbar";

const ProfileTopBar = ({ slug }) => {
  const setSnackbar = useSetSnackbar();
  const { data: session, status } = useSession();
  const router = useRouter();

  //fetch brewery's userFavoriteList clientside to show live updates when user favorites a brewery
  //fetch only when user is logged in
  const { data } = useSWR(
    session ? `/api/breweries/${slug}/users/favorite` : null
  );

  const checkUserFavoriteBrewery = useMemo(() => {
    if (!session) return false;
    return data?.favorite_list.includes(session.user.id);
  }, [data, session]);

  const handleClickFavorite = async () => {
    if (!session) {
      router.push("/signin");
      return;
    }

    if (!session?.user.username) {
      router.push("/username");
      return;
    }

    const res = await patchData(`breweries/${slug}/users/favorite`, {
      user_id: session.user.id,
    });
    if (res?.msg) {
      //TODO: double check if replace works with staticProps
      router.replace(router.asPath); //router.replace to trigger revalidation for favorite_count
      mutate(`/api/breweries/${slug}/users/favorite`); //mutate to update checkUserFavoriteBrewery
      setSnackbar(res.msg, "success");
    }
    if (res?.err) setSnackbar(res.err, "error");
  };

  if (status === "loading") return <CircularProgress />;
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

      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="caption" color="text.primary" fontWeight="600">
          {checkUserFavoriteBrewery
            ? "You favorited this brewery"
            : "Favorite this brewery"}
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
