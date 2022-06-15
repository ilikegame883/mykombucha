import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import moment from "moment";
import {
  Box,
  Rating,
  Typography,
  Divider,
  Stack,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { patchData } from "../../../utils/fetchData";
import { AlertContext } from "../../../stores/context/alert.context";
import { toggleToast } from "../../../stores/actions";
import AlertToast from "../../AlertToast";

const KombuchaProfile = ({ kombuchaData }) => {
  const router = useRouter();
  const { dispatch } = useContext(AlertContext);
  const { data: session } = useSession();

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

      <Grid container alignItems="center" p={2}>
        <Grid
          item
          md={2}
          align="center"
          mb={{ xs: 1, md: 0 }}
          sx={{ position: "relative", width: 120, height: 120 }}
        >
          <Image src={image} alt={name} layout="fill" objectFit="contain" />
        </Grid>

        <Grid item md={10}>
          <Stack justifyContent="center" mb={2}>
            <Box display="flex" alignItems="center">
              <Typography variant="h4" fontWeight="bold">
                {name}
              </Typography>
              {Boolean(avg) && (
                <>
                  <Rating
                    name="kombucha-rating"
                    precision={0.25}
                    value={avg}
                    readOnly
                    sx={{ ml: 1 }}
                  />
                  <Typography
                    variant="body1"
                    component="span"
                    color="text.secondary"
                  >
                    ({avg.toFixed(2)})
                  </Typography>
                </>
              )}
            </Box>
            <Box>
              <Link href={`/breweries/${brewery_slug}`} passHref>
                <Typography
                  variant="h6"
                  component="a"
                  color="text.secondary"
                  sx={{ textDecoration: "none" }}
                >{`${brewery_name} Brewing Company`}</Typography>
              </Link>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Typography
              variant="caption"
              py={0.5}
              px={1}
              ml={0.5}
              bgcolor="#F5F5F5"
              sx={{ borderRadius: 1.5 }}
            >
              {served_in}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography
              variant="caption"
              py={0.5}
              px={1}
              ml={0.5}
              bgcolor="#FAAF00"
              sx={{ borderRadius: 1.5 }}
            >
              {category}
            </Typography>
            <Divider orientation="vertical" flexItem />

            <Typography variant="body1" fontWeight="bold">
              {ABV} ABV
            </Typography>
          </Stack>
        </Grid>

        <Box p={2}>
          <Typography variant="body2">
            Coors Light is Coors Brewing Companys largest-selling brand and the
            fourth best-selling beer in the U.S. Introduced in 1978, Coors Light
            has been a favorite in delivering the ultimate in cold refreshment
            for more than 25 years.
          </Typography>
        </Box>
      </Grid>
      <AlertToast />
    </>
  );
};

export default KombuchaProfile;
