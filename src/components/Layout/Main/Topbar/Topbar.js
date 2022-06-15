import React from "react";
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
  //Another alternative is to pass session from parent?
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const { data: userData, error } = useSWR(
    session ? `/api/user/${session.user.username}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );
  const userSessionAvatar = userData ? userData[0].avatar : "";

  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isAuthPage =
    router.pathname === "/signin" && router.pathname === "/register";

  return (
    <Toolbar
      sx={{ justifyContent: "space-between", height: 70 }}
      disableGutters
    >
      <Box
        component="a"
        href="/"
        title="home"
        width={{ xs: 160, md: 220 }}
        height={1}
      >
        <Box
          component={"img"}
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
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
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
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            sx: {
              overflow: "visible",
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
          <Link href="/breweries/explore/list/1" passHref>
            <MenuItem component="a">
              <ListItemIcon>
                <WarehouseOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Breweries</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/kombucha/explore/recent/1" passHref>
            <MenuItem component="a">
              <ListItemIcon>
                <LocalDrinkOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Kombucha</ListItemText>
            </MenuItem>
          </Link>
        </Menu>

        {!session && !loading && !isAuthPage && (
          <>
            <Box display="flex">
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ my: 0.5, bgcolor: "secondary" }}
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
        {session && <UserMenuDropDown userSessionAvatar={userSessionAvatar} />}
      </Stack>

      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        {!session ? (
          <Button
            onClick={() => onSidebarOpen()}
            aria-label="Menu"
            variant="outlined"
            sx={{
              borderRadius: 2,
              minWidth: "auto",
              // padding: 1,
              borderColor: "#fff",
              color: "#fff",
            }}
          >
            <MenuIcon />
          </Button>
        ) : (
          <IconButton onClick={() => onSidebarOpen()} aria-label="Menu">
            <Avatar
              src={userSessionAvatar}
              alt="mobile user avatar menu"
              sx={{ width: 35, height: 35, border: "1px solid #000000" }}
            />
          </IconButton>
        )}
      </Box>
    </Toolbar>
  );
};

export default Topbar;
