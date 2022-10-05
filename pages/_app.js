import * as React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { AlertProvider } from "../src/stores/context/alert.context";
import mailgo from "mailgo";
import NextNProgress from "nextjs-progressbar";
import { GoogleAnalytics } from "nextjs-google-analytics";

import "/src/styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  React.useEffect(() => {
    mailgo({ showFooter: false });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <GoogleAnalytics trackPageViews />
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <NextNProgress color={theme.palette.primary.main} />

          <AlertProvider>
            <Component {...pageProps} />
          </AlertProvider>
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
