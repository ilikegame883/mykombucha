import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

//Show account avatar icon drop down menu when user is logged in//
const UserMenuDropDown = ({ userSessionAvatar }) => {
  //get sesion to generate user account related links in drop down
  const { data: session } = useSession();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Tooltip title="Account menu">
        <IconButton onClick={handleClick}>
          <Avatar
            src={userSessionAvatar}
            alt="top bar avatar"
            sx={{ width: 45, height: 45, border: "1px solid #fff" }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock={true}
      >
        <Link href={`/user/${session.user.username}`} passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <AccountBoxOutlinedIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
        </Link>
        <Link href="/" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <ListAltIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            <ListItemText>My Lists</ListItemText>
          </MenuItem>
        </Link>
        <Link href={`/user/${session.user.username}/general-settings`} passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            <ListItemText>Account Settings</ListItemText>
          </MenuItem>
        </Link>

        <MenuItem
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}`,
            })
          }
        >
          <ListItemIcon>
            <ExitToAppOutlinedIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenuDropDown;
