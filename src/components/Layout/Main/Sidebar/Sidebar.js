import Link from "next/link";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import {
  Drawer,
  Divider,
  Box,
  Button,
  Typography,
  Stack,
} from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

const sideBarLinks = [
  {
    groupTitle: "Explore",
    id: "explore",
    displayInSideBar: true,
    pages: [
      {
        title: "Breweries",
        href: "/breweries/explore/list/1",
        icon: <WarehouseOutlinedIcon />,
      },
      {
        title: "Kombucha",
        href: "/kombucha/explore/recent/1",
        icon: <LocalDrinkOutlinedIcon />,
      },
      {
        title: "Local",
        href: "/",
        icon: <LocationOnOutlinedIcon />,
      },
      {
        title: "Search",
        href: "/search/kombucha",
        icon: <SearchIcon />,
      },
    ],
  },
  {
    groupTitle: "Account",
    id: "account",
    displayInSideBar: false,

    pages: [
      {
        title: "My Profile",
        href: "/",
        icon: <AccountBoxOutlinedIcon />,
      },
      {
        title: "My Lists ",
        href: "/",
        icon: <ListAltIcon />,
      },
      {
        title: "Settings",
        href: `/general-settings`,
        icon: <SettingsOutlinedIcon />,
      },
    ],
  },
  {
    groupTitle: "Site",
    id: "site",
    displayInSideBar: true,

    pages: [
      {
        title: "About",
        href: "/about",
        icon: <AccountBoxOutlinedIcon />,
      },
      {
        title: "Contact",
        href: "/",
        icon: <ListAltIcon />,
      },
    ],
  },
];
const Sidebar = ({ open, variant, onClose }) => {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const getUserSessionLinks = (href) => {
    if (!loading) {
      return `/user/${session.user.username}${href}`;
    }
  };

  const showUserAccountGroup = (displayInSideBar) => {
    if (!loading && session) {
      return true;
    }
    return displayInSideBar;
  };

  return (
    <Drawer
      anchor="left"
      onClose={() => onClose()}
      open={open}
      variant={variant}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: 256,
          height: { xs: "100%" },
          background: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }} p={2}>
        <Box mb={2}>
          {session && (
            <>
              <Typography variant="h6" color="secondary">
                Welcome back
              </Typography>
              <Typography variant="h6" color="text.primary" fontWeight="700">
                {session.user.username}!
              </Typography>
            </>
          )}
        </Box>
        {sideBarLinks.map(
          (item, i) =>
            showUserAccountGroup(item.displayInSideBar) && (
              <Box key={i} mb={3}>
                <Typography
                  variant="caption"
                  color="secondary"
                  sx={{
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: 1,
                    display: "block",
                  }}
                >
                  {item.groupTitle}
                </Typography>
                <Box>
                  {item.pages.map((p, i) => (
                    <Box marginBottom={1 / 2} key={i}>
                      <Button
                        component={"a"}
                        href={
                          item.id === "account"
                            ? getUserSessionLinks(p.href)
                            : p.href
                        }
                        fullWidth
                        sx={{
                          justifyContent: "flex-start",
                          color: "text.primary",
                        }}
                        startIcon={p.icon || null}
                      >
                        {p.title}
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Box>
            )
        )}
        <Divider sx={{ mb: 3, borderColor: theme.palette.primary.main }} />
        <Box>
          {!session && (
            <Box display="flex" justifyContent="space-evenly">
              <Box>
                <Link href="/signin" passHref>
                  <Button
                    variant="outlined"
                    size="large"
                    color="secondary"
                    sx={{ fontWeight: 700 }}
                  >
                    Login
                  </Button>
                </Link>
              </Box>
              <Box>
                <Link href="/register" passHref>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                      px: 4,
                      color: "common.white",
                    }}
                  >
                    Join
                  </Button>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {session && (
        <Box p={2}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            component="a"
            href="/signout"
            startIcon={<ExitToAppOutlinedIcon />}
          >
            Logout
          </Button>
        </Box>
      )}
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
