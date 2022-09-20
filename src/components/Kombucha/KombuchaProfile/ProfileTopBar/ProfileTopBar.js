import React, { useContext } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { Box, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import moment from "moment";
import { patchData } from "../../../../utils/fetchData";
import { AlertContext } from "../../../../stores/context/alert.context";
import { toggleSnackBar } from "../../../../stores/actions";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProfileTopBar = ({ kombuchaId }) => {
  const { dispatch } = useContext(AlertContext);
  const { data: session } = useSession();

  //SWR is used here to show live updates to the user when they add a kombucha to wish list
  const { data: kombuchaData } = useSWR(
    //only fetch if session exists
    session?.user ? `/api/kombucha/${kombuchaId}` : null,
    fetcher
  );

  //check if user in session has already added kombucha to wish list
  //every kombucha document contains wish_list array field
  const checkUserSessionWishList =
    session &&
    kombuchaData &&
    kombuchaData[0].wish_list_users.find(
      ({ username }) => username === session.user.username
    );

  //add kombucha to user's wish list
  const handleClickAddIcon = async () => {
    if (!session) {
      dispatch(
        toggleSnackBar(
          "error",
          "Login/Register to add to your wish list!",
          true
        )
      );
      return;
    }
    const res = await patchData(`users/${session.user.username}/wish-list`, {
      kombucha_id: kombuchaId,
      date: moment().format("YYYY/MM/DD"),
    });

    if (res?.msg) {
      mutate(`/api/kombucha/${kombuchaId}`);
      dispatch(toggleSnackBar("success", res.msg, true));
    }
    if (res?.err) dispatch(toggleSnackBar("error", res.err, true));
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
          {checkUserSessionWishList && (
            <Typography component="span" sx={{ fontSize: 12 }}>
              This item is in your wish list
            </Typography>
          )}
          <Tooltip
            title={
              checkUserSessionWishList
                ? "Remove from wish list"
                : "Add to wish list"
            }
          >
            <IconButton sx={{ padding: 0 }} onClick={handleClickAddIcon}>
              {checkUserSessionWishList ? (
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
