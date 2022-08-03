import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  AppBar,
  Container,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import AlertToast from "../../AlertToast";

const MainLayout = ({
  bgcolor = "#FAFAFA",
  position = "sticky",
  title,
  children,
}) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const router = useRouter();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  const meta = {
    title: "myKombucha - Online Kombucha Resource and Community",
    description:
      "Find top rated kombuchas from users all around the world, submit your own ratings and more!",
    image: "/static/images/meta-image.png",
    type: "website",
  };

  return (
    <Box
      //sticky footer
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Head>
        <title>{title || meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={`https://mykombucha.net${router.asPath}`} />
        <meta
          property="og:url"
          content={`https://mykombucha.net${router.asPath}`}
        />
        <meta property="og:title" content={title || meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:site_name" content="myKombucha" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:site" content="" /> */}
        <meta name="twitter:title" content={title || meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <AlertToast />
      <AppBar
        position={position}
        width={1}
        sx={{
          backgroundColor: bgcolor,
          top: 0,
          borderBottom: `0.5px solid ${theme.palette.divider}`,
        }}
        elevation={0}
      >
        <Container maxWidth="lg">
          <Topbar onSidebarOpen={handleSidebarOpen} />
        </Container>
      </AppBar>

      <Sidebar onClose={handleSidebarClose} open={open} variant="temporary" />
      <Box component="main" flexGrow={1}>
        {children}
      </Box>
      <Divider />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Footer />
      </Container>
    </Box>
  );
};

export default MainLayout;
