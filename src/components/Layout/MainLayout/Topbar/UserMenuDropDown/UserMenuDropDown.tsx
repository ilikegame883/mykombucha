import React, { useState } from "react";
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
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

interface UserMenuDropDownProps {
  image: string;
  userId: string;
}

//When user is logged in, show user avatar drop down menu
const UserMenuDropDown = ({ image, userId }: UserMenuDropDownProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
            src={image}
            imgProps={{ referrerPolicy: "no-referrer" }}
            alt="account menu button"
            sx={{ width: 40, height: 40, border: "0.5px solid black" }}
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
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        sx={{ "& span": { fontWeight: "500" } }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock={true}
      >
        <MenuItem LinkComponent={Link} component="a" href={`/users/${userId}`}>
          <ListItemIcon>
            <AccountBoxOutlinedIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem
          LinkComponent={Link}
          component="a"
          href={`/users/${userId}/settings`}
        >
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>

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
