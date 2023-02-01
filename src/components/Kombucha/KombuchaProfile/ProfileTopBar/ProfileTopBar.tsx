import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { patchData } from "../../../../utils/fetch-utils";
import { useSetSnackbar } from "../../../../utils/hooks/useSnackbar";

//TODO: add in type guard for wish_list in interface
const ProfileTopBar = ({ kombuchaId }) => {
  const setSnackbar = useSetSnackbar();
  const router = useRouter();
  const { data: session, status } = useSession();

  const { data: wish_list, error } = useSWR(
    session?.user ? `/api/users/${session.user.id}/wish-list` : null
  );

  if (status === "loading" && wish_list === undefined)
    return <CircularProgress />;
  //fetch kombuchaData clientside with SWR to show live updates when user clicks add to favorites button
  //fetch only when user is logged in
  //TODO: rename to addedToWishList
  const checkUserWishList = () => {
    if (!session || !Array.isArray(wish_list)) return false;
    if (
      wish_list.find(({ kombucha_id: kombucha }) => kombucha._id === kombuchaId)
    ) {
      return true;
    } else return false;
  };

  const handleClickAddIcon = async () => {
    if (!session) {
      setSnackbar("Please login to use this feature", "error");
      return;
    }
    if (!session?.user.username) {
      router.push("/username");
      return;
    }
    const action = checkUserWishList() ? "remove" : "add";
    const res = await patchData(
      `users/${session.user.id}/wish-list?action=${action}`,
      {
        kombucha_id: kombuchaId,
        add_date: Date.now(),
      }
    );

    if (res?.msg) {
      mutate(`/api/users/${session.user.id}/wish-list`);
      setSnackbar(res.msg, "success");
    }
    if (res?.err) setSnackbar(res.err, "error");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.5,
          bgcolor: "#F7F9FC",
        }}
      >
        <Link href={`/kombucha/${kombuchaId}/corrections`}>
          <a style={{ maxHeight: 24 }}>
            <Tooltip title="Edit product info">
              <EditOutlinedIcon color="action" />
            </Tooltip>
          </a>
        </Link>

        <Stack direction="row" alignItems="center" spacing={2}>
          {checkUserWishList() && (
            <Typography component="span" sx={{ fontSize: 12 }}>
              This item is in your wish list
            </Typography>
          )}
          <Tooltip
            title={
              checkUserWishList() ? "Remove from wish list" : "Add to wish list"
            }
          >
            <IconButton sx={{ padding: 0 }} onClick={handleClickAddIcon}>
              {checkUserWishList() ? (
                <AddCircleIcon color="primary" />
              ) : (
                <AddCircleOutlineIcon color="primary" />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </>
  );
};

export default ProfileTopBar;
