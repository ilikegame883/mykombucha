import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import moment from "moment";
import {
  Box,
  Rating,
  Typography,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { patchData } from "../../../utils/fetchData";
import { AlertContext } from "../../../stores/context/alert.context";
import { toggleToast } from "../../../stores/actions";
import AlertToast from "../../AlertToast";
import HorizontalStats from "./HorizontalStats";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PublicIcon from "@mui/icons-material/Public";

const KombuchaProfile = ({ kombuchaData }) => {
  const router = useRouter();
  const { dispatch } = useContext(AlertContext);
  const { data: session } = useSession();

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const {
    brewery_name,
    category,
    name,
    served_in,
    ABV,
    wish_list_users,
    _id,
    avg,
    image,
    brewery_slug,
    description,
  } = kombuchaData;

  const [addToList, setAddToList] = useState(false);

  useEffect(() => {
    if (session) {
      const usernameSession = session.user.username || null;
      wish_list_users.forEach(
        (list) => list.username === usernameSession && setAddToList(true)
      );
    }
    return;
  }, []);

  const handleClickAddIcon = async () => {
    if (!session) {
      router.push("/signin");
      return;
    }
    const res = await patchData(`users/${session.user.username}/wish-list`, {
      kombucha_id: _id,
      date: moment().format("YYYY/MM/DD"),
    });
    if (res?.msg) {
      setAddToList(!addToList);
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
          p: 2,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Edit product info">
            <IconButton sx={{ padding: 0 }}>
              <EditOutlinedIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          {addToList && (
            <Typography component="span" sx={{ fontSize: 12 }}>
              This item is in your wish list
            </Typography>
          )}
          <Tooltip
            title={addToList ? "Remove from wish list" : "Add to wish list"}
          >
            <IconButton sx={{ padding: 0 }} onClick={handleClickAddIcon}>
              {addToList ? (
                <AddCircleIcon color="primary" />
              ) : (
                <AddCircleOutlineIcon color="primary" />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Divider />

      <Box px={3} py={3}>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
          <Box
            component="img"
            alt={name}
            src={image}
            width={110}
            height={110}
            mb={{ xs: 2, sm: 0 }}
            mr={{ xs: 0, sm: 2 }}
          />
          <Stack justifyContent="center">
            <Box display="flex" alignItems="center">
              <Typography variant={isSm ? "h4" : "h5"} fontWeight="700" mr={1}>
                {name}
              </Typography>
              {Boolean(avg) && (
                <>
                  <Rating
                    name="kombucha-rating"
                    precision={0.25}
                    value={avg}
                    readOnly
                  />
                  <Typography
                    variant="body1"
                    component="span"
                    color="text.secondary"
                    fontWeight="700"
                    ml={0.5}
                  >
                    ({avg.toFixed(2)})
                  </Typography>
                </>
              )}
            </Box>

            <Link href={`/breweries/${brewery_slug}`} passHref>
              <Typography
                variant="h6"
                component="a"
                color="text.secondary"
                fontWeight="600"
                gutterBottom
              >{`${brewery_name} Brewing Company`}</Typography>
            </Link>
            <Box>
              <Chip
                label={category}
                color="primary"
                size="small"
                sx={{ mr: 1 }}
              />

              <IconButton sx={{ p: 0 }}>
                <PublicIcon />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Divider />
      <HorizontalStats served_in={served_in} ABV={ABV} />
      <Divider />
      <Box px={4} py={2}>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </>
  );
};

export default KombuchaProfile;
