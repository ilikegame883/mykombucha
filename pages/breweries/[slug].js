import Head from "next/head";
import { useSession } from "next-auth/react";
import { Box, Container, Grid, Paper } from "@mui/material";
import { getData } from "../../src/utils/fetchData";
import { default as BreweryModel } from "../../src/models/breweryModel";
import { BreweryProductTable, TopRaters } from "../../src/components/Brewery";
import BreweryProfile from "../../src/components/Brewery/BreweryProfile";
import { MainLayout } from "../../src/components/Layout";
import connectDB from "../../src/lib/connectDB";

const Brewery = ({ singleBreweryData, slug }) => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>{singleBreweryData.name}</title>
      </Head>
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} md={9}>
              <Paper sx={{ mb: 1.5 }}>
                <BreweryProfile
                  breweryData={singleBreweryData}
                  session={session}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={3} sx={{ mb: { xs: 2 } }}>
              <Paper>
                <TopRaters slug={slug} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={9}>
              <Box sx={{ mb: 1.5 }}>
                <BreweryProductTable
                  breweryData={singleBreweryData}
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

export async function getStaticPaths() {
  await connectDB();

  const brewerySlugList = await BreweryModel.distinct("slug");
  const params = brewerySlugList.map((slug) => ({ params: { slug } }));

  return {
    fallback: false,
    paths: params,
  };
}
export async function getStaticProps({ params }) {
  const [singleBreweryData] = await getData(`breweries`, params.slug);
  return {
    props: {
      singleBreweryData,
      slug: params.slug,
    },
    revalidate: 45,
  };
}

export default Brewery;
