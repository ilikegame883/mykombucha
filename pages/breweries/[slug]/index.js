import { Box, Container, Grid, Paper, Divider } from "@mui/material";
import { default as BreweryModel } from "../../../src/models/breweryModel";
import { getData } from "../../../src/utils/fetchData";
import {
  BreweryProductTable,
  TopRaters,
} from "../../../src/components/Brewery";
import BreweryProfile from "../../../src/components/Brewery/BreweryProfile";
import { MainLayout } from "../../../src/components/Layout";
import ProfileTopBar from "../../../src/components/Brewery/BreweryProfile/ProfileTopBar";
import connectDB from "../../../src/lib/connectDB";

const Brewery = ({ singleBreweryData, topRaters }) => {
  return (
    <MainLayout title={`${singleBreweryData.name} Brewery`}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={9}>
            <Paper sx={{ mb: 1.5 }}>
              <ProfileTopBar />
              <Divider />
              <BreweryProfile singleBreweryData={singleBreweryData} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={3} sx={{ mb: { xs: 2 } }}>
            <Paper>
              <TopRaters topRaters={topRaters} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 1.5 }}>
              <BreweryProductTable singleBreweryData={singleBreweryData} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export async function getStaticPaths() {
  await connectDB();
  const slugList = await BreweryModel.distinct("slug");
  const params = slugList.map((slug) => ({ params: { slug } }));

  return {
    fallback: false,
    paths: params,
  };
}

export async function getStaticProps({ params }) {
  const [singleBreweryData] = await getData("breweries", params.slug);
  const topRaters = await getData(`breweries/${params.slug}/top-users`);

  return {
    props: { singleBreweryData, topRaters },
    revalidate: 5,
  };
}
export default Brewery;
