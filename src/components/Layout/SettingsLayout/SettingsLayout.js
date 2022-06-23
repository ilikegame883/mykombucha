import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Grid,
  ListItem,
  List,
  Card,
  Box,
  Typography,
  Avatar,
  Divider,
  useMediaQuery,
} from "@mui/material";
import EditProfilePicPopup from "./EditProfilePicPopup";

const pages = [
  {
    id: "general",
    href: "/general-settings",
    title: "General",
  },
  {
    id: "security",
    href: "/security-settings",
    title: "Security",
  },
];

//layout for settings pages and edit profile picture functionality
const SettingsLayout = ({ children, userData }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const { username, avatar } = userData;

  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(window && window.location ? window.location.pathname : "");
  }, []);

  return (
    <Box>
      <Box bgcolor={"primary.main"} py={15}>
        <Container>
          <Typography
            variant={isSm ? "h3" : "h4"}
            fontWeight="700"
            gutterBottom
            sx={{ color: "common.white" }}
          >
            Account settings
          </Typography>
          <Typography variant="h6" sx={{ color: "common.white" }}>
            Change your account information
          </Typography>
        </Container>
      </Box>
      <Container sx={{ pt: "0 !important", mt: -10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ boxShadow: 3, pt: 3 }}>
              <Box display="flex" justifyContent="center" mb={1}>
                <Box position="relative">
                  <Avatar src={avatar} sx={{ width: 150, height: 150 }} />

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -5,
                      right: 2,
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      boxShadow: 3,
                    }}
                  >
                    <EditProfilePicPopup
                      username={username}
                      currentPhoto={avatar}
                    />
                  </Box>
                </Box>
              </Box>
              <Typography
                variant="h6"
                align="center"
                fontWeight="500"
                gutterBottom
                sx={{ textTransform: "capitalize" }}
              >
                {username}
              </Typography>
              <Divider />

              <List
                disablePadding
                sx={{
                  display: { xs: "inline-flex", md: "flex" },
                  flexDirection: { xs: "row", md: "column" },
                  overflow: "auto",
                  flexWrap: "nowrap",
                  width: "100%",
                  paddingY: { xs: 3, md: 2 },
                  paddingX: { xs: 4, md: 0 },
                }}
              >
                {pages.map((item) => (
                  <ListItem
                    key={item.id}
                    component={"a"}
                    href={`/users/${username}${item.href}`}
                    disableGutters
                    sx={{
                      marginRight: { xs: 2, md: 0 },
                      flex: 0,
                      paddingX: { xs: 0, md: 3 },
                      borderLeft: {
                        xs: "none",
                        md: "2px solid transparent",
                      },
                      borderBottom: {
                        xs: "2px solid transparent",
                        md: "none",
                      },
                      borderColor: {
                        xs:
                          activeLink === `/users/${username}${item.href}`
                            ? theme.palette.primary.main
                            : "transparent",
                        md:
                          activeLink === `/users/${username}${item.href}`
                            ? theme.palette.primary.main
                            : "transparent",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      noWrap
                      color={
                        activeLink === `/users/${username}${item.href}`
                          ? "text.primary"
                          : "text.secondary"
                      }
                      fontWeight={
                        activeLink === `/users/${username}${item.href}`
                          ? 700
                          : 400
                      }
                    >
                      {item.title}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card sx={{ boxShadow: 3, padding: 4 }}>{children}</Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SettingsLayout;
