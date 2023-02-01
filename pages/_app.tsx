import * as React from "react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Head from "next/head";
import mailgo from "mailgo";
import NextNProgress from "nextjs-progressbar";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { SWRConfig } from "swr";
import { SnackbarProvider } from "../src/stores/context/Snackbar.context";
import SnackbarAlert from "../src/components/Alerts/SnackbarAlert";
import "/src/styles/globals.css";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  React.useEffect(() => {
    mailgo({ showFooter: false });
  }, []);
  // const AnyComponent = Component as any;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <GoogleAnalytics trackPageViews />
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <NextNProgress color={theme.palette.primary.main} />
          <SWRConfig
            value={{
              fetcher: (url) => fetch(url).then((res) => res.json()),
            }}
          >
            <SnackbarProvider>
              <Component {...pageProps} />
              <SnackbarAlert />
            </SnackbarProvider>
          </SWRConfig>
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
}

export default MyApp;
