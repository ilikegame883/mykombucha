import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Typography,
  Stack,
  Button,
  Tooltip,
  IconButton,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import UserStats from "./UserStats/UserStats";

const UserInfo = ({ userData, userReviews }) => {
  const { username, createdAt, avatar, city, country, bio } = userData;
  const { data: session } = useSession();
  const router = useRouter();

  const { name } = router.query;

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
          <Typography variant="caption">
            Member Since:{" "}
            <b>{createdAt.slice(0, createdAt.lastIndexOf("T"))}</b>
          </Typography>
        </Stack>
        <Stack spacing={2}>
          {session && session.user.username === name ? (
            <Typography variant="caption" color="text.primary" fontWeight="500">
              Account Settings
              <Link
                href={`/user/${session.user.username}/general-settings`}
                passHref
              >
                <IconButton sx={{ padding: 0, pl: 1 }} component="a">
                  <Tooltip title="Go to Account Settings">
                    <SettingsIcon color="info" />
                  </Tooltip>
                </IconButton>
              </Link>
            </Typography>
          ) : (
            <MessageOutlinedIcon color="primary" />
          )}
        </Stack>
      </Box>

      <Divider />
      <Box display="flex" alignItems="center" p={2}>
        <Box>
          <Avatar
            src={avatar}
            alt={`${username}'s photo`}
            sx={{ height: { xs: 100, sm: 120 }, width: { xs: 100, sm: 120 } }}
          />
        </Box>
        <Box pl={{ xs: 2, sm: 3 }}>
          <Stack justifyContent="center">
            <Typography variant="h4" fontWeight="700">
              {username}
            </Typography>

            <Typography variant="body1" mb={1}>
              {city}, {country}
              <LocationOnOutlinedIcon
                color="disabled"
                fontSize="small"
                sx={{ verticalAlign: "text-bottom" }}
              />
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              {bio}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Divider />
      <UserStats userData={userData} userReviews={userReviews} />
    </>
  );
};

export default UserInfo;
