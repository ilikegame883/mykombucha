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

interface UserDetailsProps {
  userData: any; //TODO: set types
}

//Top bar on profile page
const UserDetails = ({ userData }: UserDetailsProps) => {
  const { username, createdAt, profile, _id } = userData;
  const { data: session } = useSession();

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
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="caption">
            Member Since:{" "}
            <b>{createdAt.slice(0, createdAt.lastIndexOf("T"))}</b>
          </Typography>
        </Stack>
        <Box>
          {session?.user.id === _id ? (
            <Stack spacing={2}>
              <Typography
                variant="caption"
                color="text.primary"
                fontWeight="500"
              >
                Account Settings
                <Link href={`/users/${_id}/settings`} passHref>
                  <IconButton sx={{ p: 0, pl: 1 }} component="a">
                    <Tooltip title="Go to Account Settings">
                      <SettingsIcon color="info" />
                    </Tooltip>
                  </IconButton>
                </Link>
              </Typography>
            </Stack>
          ) : (
            <IconButton sx={{ p: 0 }}>
              <Tooltip title="Send Message: Coming Soon">
                <MessageOutlinedIcon color="primary" />
              </Tooltip>
            </IconButton>
          )}
        </Box>
      </Box>

      <Divider />
      <Box display="flex" alignItems="center" p={2.5}>
        <Box>
          <Avatar
            src={profile?.image}
            imgProps={{ referrerPolicy: "no-referrer" }}
            alt={`${username}'s photo`}
            sx={{ height: { xs: 80, sm: 80 }, width: { xs: 80, sm: 80 } }}
          />
        </Box>
        <Box ml={2}>
          <Stack justifyContent="center">
            <Typography variant="h5" color="text.primary" fontWeight="700">
              {username}
            </Typography>

            <Typography variant="body2" color="text.primary" mb={0.25}>
              {profile?.city && `${profile.city},`}{" "}
              {profile?.country && `${profile.country}`}
              <LocationOnOutlinedIcon
                color="disabled"
                fontSize="small"
                sx={{ verticalAlign: "middle" }}
              />
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              {profile?.bio
                ? `${profile.bio}`
                : session
                ? "Go to Account Settings to update your location & bio"
                : ""}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default UserDetails;
