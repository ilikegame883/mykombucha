import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import UserMenuDropDown from "./UserMenuDropDown";
import SearchBar from "../SearchBar/SearchBar";

const StyledNavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
})) as unknown as typeof Button;

interface TopbarProps {
  onSidebarOpen: () => void;
}
const Topbar = ({ onSidebarOpen }: TopbarProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      disableGutters
      sx={{
        justifyContent: "space-between",
        my: { xs: 0.5, sm: 0 },
      }}
    >
      <Link href="/" passHref>
        <Box display="flex" alignItems="center" component="a">
          <Box
            component="img"
            src="/static/favicons/android-chrome-192x192.png"
            height={30}
            width={30}
          />
          <Typography
            variant="h6"
            color="text.primary"
            fontWeight="700"
            ml={0.75}
          >
            myKombucha
          </Typography>
        </Box>
      </Link>
      <Box flex={1} ml={1}>
        {router.pathname !== "/search/[category]" && <SearchBar />}
      </Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <StyledNavButton
          disableRipple
          LinkComponent={Link}
          component="a"
          href="/local"
        >
          Local
        </StyledNavButton>
        <StyledNavButton
          disableRipple
          id="expore-menu"
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
          sx={{ "& span": { fontWeight: "500" } }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          disableScrollLock={true}
        >
          <MenuItem
            LinkComponent={Link}
            component="a"
            href="/breweries/explore/list/1"
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
          <MenuItem
            LinkComponent={Link}
            component="a"
            href="/kombucha/explore/recent/1"
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
          <MenuItem
            LinkComponent={Link}
            component="a"
            href="/search/kombucha"
            sx={{
              "& .MuiListItemIcon-root": {
                minWidth: 30,
              },
            }}
          >
            <ListItemIcon>
              <SearchIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            <ListItemText>Search</ListItemText>
          </MenuItem>
        </Menu>

        {!session && !isLoading ? (
          <>
            <Box display="flex">
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ my: 0.75, bgcolor: "text.secondary" }}
              />
            </Box>
            <Stack direction="row" spacing={1}>
              <StyledNavButton
                disableRipple
                LinkComponent={Link}
                component="a"
                href="/signin"
              >
                Login
              </StyledNavButton>
              <Button
                LinkComponent={Link}
                component="a"
                href="/signup"
                disableRipple
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: 600,
                  borderRadius: 5,
                  px: 3.5,
                  color: "text.primary",
                }}
              >
                Join
              </Button>
            </Stack>
          </>
        ) : null}

        {session && (
          <UserMenuDropDown
            image={session.user.image}
            userId={session.user.id}
          />
        )}
      </Stack>
      {/* For mobile view */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        {!session && !isLoading && (
          <>
            <Button
              LinkComponent={Link}
              component="a"
              href="/signin"
              variant="contained"
              disableRipple
              size="small"
              color="primary"
              sx={{
                borderRadius: 5,
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Login
            </Button>
            <Button
              onClick={onSidebarOpen}
              aria-label="Menu"
              sx={{
                color: "text.primary",
                borderRadius: 2,
                minWidth: "auto",
                ml: 0.5,
              }}
            >
              <MenuIcon />
            </Button>
          </>
        )}
        {session && (
          <IconButton onClick={onSidebarOpen} aria-label="Menu">
            <Avatar
              src={session.user.image}
              alt="mobile user menu"
              sx={{ width: 40, height: 40, border: "0.5px solid black" }}
            />
          </IconButton>
        )}
      </Box>
    </Toolbar>
  );
};

export default Topbar;
