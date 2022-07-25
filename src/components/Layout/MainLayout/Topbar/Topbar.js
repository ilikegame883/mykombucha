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
import MenuIcon from "@mui/icons-material/Menu";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserMenuDropDown from "./UserMenuDropDown";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Topbar = ({ onSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();
  //when user decides to update the avatar picture on settings page,
  //userdata is fetched clientside to display a live update of avatar photo on the topbar
  const { data: userData } = useSWR(
    session?.user && `/api/users/${session.user.username}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  const userSessionAvatar = userData ? userData[0].avatar : "";

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
      }}
      disableGutters
    >
      <Box
        component="a"
        href="/"
        title="home"
        pt={0.75}
        width={{ xs: 180, sm: 200, md: 220 }}
      >
        <Box
          component="img"
          src={
            router.pathname === "/"
              ? "https://res.cloudinary.com/jjo/image/upload/v1651018045/myKombucha/Logo/topbar-neg_ovtkl1.svg"
              : "https://res.cloudinary.com/jjo/image/upload/v1651109316/myKombucha/Logo/nav-logo-negative_aslqfl.svg"
          }
          height={1}
          width={1}
        />
      </Box>

      <Stack
        direction="row"
        spacing={2}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Link href="/search/kombucha" passHref>
          <Button
            variant="text"
            disableRipple
            sx={{
              color: "common.white",
              fontWeight: 700,
              "&:hover": { bgcolor: "transparent", color: "secondary.main" },
            }}
            component="a"
          >
            Search
          </Button>
        </Link>
        <Link href="/local" passHref>
          <Button
            variant="text"
            disableRipple
            sx={{
              color: "common.white",
              fontWeight: 700,
              "&:hover": { bgcolor: "transparent", color: "secondary.main" },
            }}
          >
            Local
          </Button>
        </Link>

        <Button
          id="basic-button"
          aria-controls={open ? "expore-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={
            <ExpandMoreIcon
              sx={{
                transform: open ? "rotate(180deg)" : "none",
                color: "common.white",
              }}
            />
          }
          sx={{
            "&:hover": { bgcolor: "transparent", color: "secondary.main" },
            color: "common.white",
            "& span": { marginLeft: "4px" },
            fontWeight: 700,
          }}
        >
          Explore
        </Button>

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
                sx={{ my: 0.5, bgcolor: "common.white" }}
              />
            </Box>
            <Stack direction="row" spacing={2}>
              <Link href="/signin" passHref>
                <Button
                  disableRipple
                  sx={{
                    color: "common.white",
                    fontWeight: "500",
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button
                  disableRipple
                  variant="contained"
                  color="secondary"
                  sx={{
                    px: 4,
                    color: "common.white",
                  }}
                >
                  Join
                </Button>
              </Link>
            </Stack>
          </>
        )}

        {session && (
          <UserMenuDropDown
            userSessionAvatar={userSessionAvatar}
            username={session.user.username}
          />
        )}
      </Stack>

      {/* For mobile view */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        {!session && !loading ? (
          <>
            <Link href="/signin" passHref>
              <Button
                variant="outlined"
                disableRipple
                sx={{
                  color: "common.white",
                  fontWeight: "500",
                  border: "1px solid #fff",
                }}
              >
                Login
              </Button>
            </Link>
            <Button
              onClick={() => onSidebarOpen()}
              aria-label="Menu"
              sx={{
                borderRadius: 2,
                minWidth: "auto",
                color: "#fff",
                ml: 0.5,
              }}
            >
              <MenuIcon />
            </Button>
          </>
        ) : (
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
