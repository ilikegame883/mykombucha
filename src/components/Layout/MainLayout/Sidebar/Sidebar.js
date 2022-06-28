import Link from "next/link";
import { Drawer, Divider, Box, Button, Typography } from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
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
        href: "/local",
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
        href: "/",
        icon: <AccountBoxOutlinedIcon />,
      },
      {
        title: "Contact",
        href: "/contact",
        icon: <ListAltIcon />,
      },
    ],
  },
];

const Sidebar = ({ open, variant, onClose, session, loading }) => {
  const theme = useTheme();

  const showUserAccountGroup = (displayInSideBar) => {
    if (!loading && session) {
      return true;
    }
    return displayInSideBar;
  };

  const getUserSessionLinks = (href) => {
    if (!loading && session) {
      return `/users/${session.user.username}${href}`;
    }
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
      <Box sx={{ flexGrow: 1 }} pt={2} px={2}>
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            component="img"
            src="/static/favicons/android-chrome-192x192.png"
            alt="nav-sidebar-menu-logo"
            width={60}
            height={60}
          />
          {session && (
            <Box ml={2}>
              <Typography variant="h6" color="secondary">
                Welcome back
              </Typography>
              <Typography
                variant="h6"
                component="p"
                color="text.primary"
                fontWeight="700"
                align="center"
              >
                {session.user.username}!
              </Typography>
            </Box>
          )}
        </Box>
        {sideBarLinks.map(
          (item, i) =>
            showUserAccountGroup(item.displayInSideBar) && (
              <Box key={i} mb={3}>
                <Typography
                  variant="body2"
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
                          textTransform: "capitalize",
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
        <Divider sx={{ my: 3 }} />
        <Box>
          {!session && (
            <Box>
              <Box mb={2}>
                <Link href="/signin" passHref>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    sx={{ fontWeight: 700 }}
                  >
                    Login
                  </Button>
                </Link>
              </Box>
              <Link href="/register" passHref>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{
                    color: "common.white",
                  }}
                >
                  Join
                </Button>
              </Link>
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

export default Sidebar;