import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Box,
  Typography,
  Stack,
  Tooltip,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import UserStats from "./UserStats/UserStats";
import getCloudinaryUrl from "../../../../utils/getCloudinaryUrl";

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
          p: 1.5,
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
                href={`/users/${session.user.username}/general-settings`}
                passHref
              >
                <IconButton sx={{ p: 0, pl: 1 }} component="a">
                  <Tooltip title="Go to Account Settings">
                    <SettingsIcon color="info" />
                  </Tooltip>
                </IconButton>
              </Link>
            </Typography>
          ) : (
            <IconButton sx={{ p: 0 }}>
              <Tooltip title="Send Message: Coming Soon">
                <MessageOutlinedIcon color="primary" />
              </Tooltip>
            </IconButton>
          )}
        </Stack>
      </Box>

      <Divider />
      <Box display="flex" alignItems="center" p={2.5}>
        <Box>
          <Avatar
            src={getCloudinaryUrl(avatar)}
            alt={`${username}'s photo`}
            sx={{ height: { xs: 80, sm: 80 }, width: { xs: 80, sm: 80 } }}
          />
        </Box>
        <Box ml={2}>
          <Stack justifyContent="center">
            <Typography variant="h5" fontWeight="700">
              {username}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {city}, {country}
              <LocationOnOutlinedIcon
                color="disabled"
                fontSize="small"
                sx={{ verticalAlign: "sub" }}
              />
            </Typography>
            <Typography
              variant="caption"
              color="text.primary"
              sx={{ fontStyle: "italic" }}
            >
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
