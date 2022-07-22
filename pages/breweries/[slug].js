import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { Box, Container, Grid, Paper, CircularProgress } from "@mui/material";
import { getData } from "../../src/utils/fetchData";
import { BreweryProductTable, TopRaters } from "../../src/components/Brewery";
import BreweryProfile from "../../src/components/Brewery/BreweryProfile";
import { MainLayout } from "../../src/components/Layout";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Brewery = ({ topRaters, session }) => {
  //Client fetch for SINGLEBREWERYDATA??
  const router = useRouter();
  const { slug } = router.query;

  const { data: singleBreweryData, error } = useSWR(
    `/api/breweries/${slug}`,
    fetcher
  );

  if (!singleBreweryData) return <CircularProgress color="primary" />;

  return (
    <>
      <Head>
        <title>{singleBreweryData[0].name}</title>
      </Head>
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} md={9}>
              <Paper sx={{ mb: 1.5 }}>
                <BreweryProfile
                  breweryData={singleBreweryData[0]}
                  session={session}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={3} sx={{ mb: { xs: 2 } }}>
              <Paper>
                <TopRaters topRaters={topRaters} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={9}>
              <Box sx={{ mb: 1.5 }}>
                <BreweryProductTable
                  breweryData={singleBreweryData[0]}
                  session={session}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </MainLayout>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  // const [singleBreweryData] = await getData("brewery", ctx.params.slug);
  const topRaters = await getData(`breweries/${ctx.params.slug}/top-users`);

  return {
    props: {
      session,
      // singleBreweryData,
      topRaters,
    },
  };
}

export default Brewery;
