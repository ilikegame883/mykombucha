import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { Box, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import moment from "moment";
import AlertToast from "../../../AlertToast";
import { patchData } from "../../../../utils/fetchData";
import { AlertContext } from "../../../../stores/context/alert.context";
import { toggleToast } from "../../../../stores/actions";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProfileTopBar = ({ kombuchaId }) => {
  const { dispatch } = useContext(AlertContext);
  const { data: session } = useSession();

  const router = useRouter();

  const { data: kombuchaData } = useSWR(
    session?.user ? `/api/kombucha/${kombuchaId}` : null,
    fetcher
  );

  //check if user in session has already added kombucha to wish list
  //each kombucha document contains wish_list array field
  const checkUserSessionWishList =
    session &&
    kombuchaData &&
    kombuchaData[0].wish_list_users.find(
      ({ username }) => username === session.user.username
    );

  const handleClickAddIcon = async () => {
    if (!session) {
      router.push("/signin");
      return;
    }
    const res = await patchData(`users/${session.user.username}/wish-list`, {
      kombucha_id: kombuchaId,
      date: moment().format("YYYY/MM/DD"),
    });

    if (res?.msg) {
      mutate(`/api/kombucha/${kombuchaId}`);
      dispatch(toggleToast("success", res.msg, true));
    }
    if (res?.err) dispatch(toggleToast("error", res.err, true));
  };

  return (
    <>
      <AlertToast />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.5,
        }}
      >
        <Stack direction="row" alignItems="center">
          <Link href={`/kombucha/${kombuchaId}/corrections`}>
            <a style={{ maxHeight: 24 }}>
              <Tooltip title="Edit product info">
                <EditOutlinedIcon color="action" />
              </Tooltip>
            </a>
          </Link>
        </Stack>
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
