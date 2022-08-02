import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  Box,
  Toolbar,
  Button,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserMenuDropDown from "./UserMenuDropDown";
import SearchBar from "../SearchBar.js/SearchBar";
import HeroSearchBar from "../../../Landing/Hero/HeroSearchBar";

const StyledNavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Topbar = ({ onSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();
  //when user decides to update the avatar picture on general settings page,
  //userdata is fetched clientside for live update of avatar photo on the topbar
  //use avatar does not update user session object, only after logging back in
  //use avatar picture from user collection
  //fetch only when user is in session
  const { data: userData } = useSWR(
    session?.user ? `/api/users/${session.user.username}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const userSessionAvatar = userData && userData[0].avatar;

  const isAuthPage =
    router.pathname === "/signin" || router.pathname === "/register";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        justifyContent: "space-between",
        my: { xs: 0.75, sm: 0.25 },
      }}
      disableGutters
    >
      <Box
        component="a"
        href="/"
        title="home"
        mr={0.5}
        width={{ xs: 180, sm: 200 }}
      >
        <Box
          component="img"
          src="https://res.cloudinary.com/jjo/image/upload/v1651018664/myKombucha/Logo/topbar-logo_ha3vu9.svg"
          height={1}
          width={1}
        />
      </Box>
      {router.pathname !== "/search/[category]" && <SearchBar />}
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Link href="/local" passHref>
          <StyledNavButton variant="text" disableRipple>
            Local
          </StyledNavButton>
        </Link>
        <StyledNavButton
          id="basic-button"
          aria-controls={open ? "expore-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={
            <ExpandMoreIcon
              sx={{
                transform: open ? "rotate(180deg)" : "none",
              }}
            />
          }
          sx={{
            "& span": { marginLeft: "2px" },
          }}
        >
          Explore
        </StyledNavButton>

        <Menu
          id="expore-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "expore-button",
          }}
          PaperProps={{
            sx: {
              overflow: "visible",
              "&:before": {
                //arrow styles
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 10,
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
          <Link href="/breweries/explore/list/1" passHref>
            <MenuItem
              component="a"
              sx={{
                "& .MuiListItemIcon-root": {
                  minWidth: 30,
                },
              }}
            >
              <ListItemIcon>
                <WarehouseOutlinedIcon fontSize="small" color="secondary" />
              </ListItemIcon>
              <ListItemText>Breweries</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/kombucha/explore/recent/1" passHref>
            <MenuItem
              component="a"
              sx={{
                "& .MuiListItemIcon-root": {
                  minWidth: 30,
                },
              }}
            >
              <ListItemIcon>
                <LocalDrinkOutlinedIcon fontSize="small" color="secondary" />
              </ListItemIcon>
              <ListItemText>Kombucha</ListItemText>
            </MenuItem>
          </Link>
        </Menu>

        {!session && !loading && !isAuthPage && (
          //if not in session and not on sign in or register page
          <>
            <Box display="flex">
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ my: 0.5, bgcolor: "text.primary" }}
              />
            </Box>
            <Stack direction="row" spacing={2}>
              <Link href="/signin" passHref>
                <StyledNavButton disableRipple>Login</StyledNavButton>
              </Link>
              <Link href="/register" passHref>
                <Button
                  disableRipple
                  variant="contained"
                  color="secondary"
                  sx={{
                    px: 3,
                    color: "common.white",
                  }}
                >
                  Join
                </Button>
              </Link>
            </Stack>
          </>
        )}

        {session && userData && (
          <UserMenuDropDown
            userSessionAvatar={userSessionAvatar}
            username={session.user.username}
          />
        )}
      </Stack>
      {/* For mobile view */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        {!session && !loading && (
          <>
            <Link href="/signin" passHref>
              <Button
                variant="outlined"
                disableRipple
                size="small"
                color="secondary"
                sx={{
                  fontWeight: 700,
                }}
              >
                Login
              </Button>
            </Link>
            <Button
              onClick={() => onSidebarOpen()}
              aria-label="Menu"
              color="secondary"
              sx={{
                borderRadius: 2,
                minWidth: "auto",
                ml: 0.5,
              }}
            >
              <MenuIcon />
            </Button>
          </>
        )}

        {session && userData && (
          <IconButton onClick={() => onSidebarOpen()} aria-label="Menu">
            <Avatar
              src={userSessionAvatar}
              alt="mobile user avatar menu"
              sx={{ width: 40, height: 40, border: "1px solid #fff" }}
            />
          </IconButton>
        )}
      </Box>
    </Toolbar>
  );
};

export default Topbar;
