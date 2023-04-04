import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  Box,
  Container,
  Grid,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  BreweryProductTable,
  TopRaters,
} from "../../../src/components/Brewery";
import { getData } from "../../../src/utils/fetch-utils";
import { default as BreweryModel } from "../../../src/models/breweryModel";
import BreweryProfile from "../../../src/components/Brewery/BreweryProfile";
import { MainLayout } from "../../../src/components/Layout";
import ProfileTopBar from "../../../src/components/Brewery/BreweryProfile/ProfileTopBar";
import connectDB from "../../../src/lib/connectDB";
import { BreweryData, TopRatersData } from "../../../src/types/api";
import {
  getBreweryById,
  getTopUsersByBrewery,
} from "../../../src/utils/db-utils";

interface BreweryProps {
  singleBreweryData: BreweryData;
  topRaters: TopRatersData[];
}

const Brewery = ({ singleBreweryData, topRaters }: BreweryProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <CircularProgress />;
  }
  return (
    <MainLayout title={`${singleBreweryData.name} Brewery`}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={9}>
            <Paper sx={{ mb: 1.5 }} variant="outlined">
              <ProfileTopBar slug={singleBreweryData.slug} />
              <Divider />
              <BreweryProfile singleBreweryData={singleBreweryData} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={3} sx={{ mb: { xs: 2 } }}>
            <Paper variant="outlined">
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

//fetch and pre-render brewery profile and top raters data at build time
export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();
  const slugList = await BreweryModel.distinct("slug");
  const params = slugList.map((slug) => ({ params: { slug } }));

  return {
    fallback: true,
    paths: params,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const parseAndStringify = (data: any) => {
    return JSON.parse(JSON.stringify(data));
  };

  const slug = params?.slug as string;
  const dataBreweryById = await getBreweryById(slug);
  const dataTopUsers = await getTopUsersByBrewery(slug);

  const [singleBreweryData] = parseAndStringify(dataBreweryById);
  const topRaters = parseAndStringify(dataTopUsers);

  return {
    props: { singleBreweryData, topRaters },
    revalidate: 60,
  };
};
export default Brewery;
