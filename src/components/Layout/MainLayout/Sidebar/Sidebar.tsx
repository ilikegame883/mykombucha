import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Drawer,
  Divider,
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material/";
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
    groupTitle: "Site",
    id: "site",
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

const sideBarSessionLinks = [
  {
    groupTitle: "Account",
    id: "account",
    pages: [
      {
        title: "My Profile",
        href: "/",
        icon: <AccountBoxOutlinedIcon />,
      },
      // {
      //   title: "My Lists ",
      //   href: "/",
      //   icon: <ListAltIcon />,
      // },
      {
        title: "Settings",
        href: `/settings`,
        icon: <SettingsOutlinedIcon />,
      },
    ],
  },
];

//mobile nav drawer
const Sidebar = ({ open, variant, onClose }) => {
  const theme = useTheme();

  const { data: session, status } = useSession();
  const loading = status === "loading";

  const filterLinksBySession = () => {
    //include session links to sideBar menu list if user is logged in
    if (!loading && session) {
      return [...sideBarLinks, ...sideBarSessionLinks];
    }
    return sideBarLinks;
  };

  const getUserLinks = (href) => {
    if (!loading && session) {
      return `/users/${session.user.id}${href}`;
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
          maxWidth: 240,
          height: { xs: "100%" },
          background: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }} pt={2.5} px={2}>
        <Box display="flex" alignItems="center" mb={3}>
          <Box
            component="img"
            src="/static/favicons/android-chrome-192x192.png"
            alt="nav-sidebar-menu-logo"
            width={50}
            height={50}
          />
          {session && (
            <Box ml={1.5} sx={{ textAlign: "left" }}>
              <Typography variant="body1" color="secondary" fontWeight="600">
                Welcome back
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                fontWeight="600"
                pl={0.5}
              >
                {session.user.username}!
              </Typography>
            </Box>
          )}
        </Box>
        {filterLinksBySession().map((item, i) => (
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
                    component="a"
                    href={item.id === "account" ? getUserLinks(p.href) : p.href}
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
        ))}
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
              <Link href="/signup" passHref>
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
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}`,
              })
            }
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
