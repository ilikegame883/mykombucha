import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { getData } from "../../../src/utils/fetch-utils";
import connectDB from "../../../src/lib/connectDB";
import Kombucha from "../../../src/models/kombuchaModel";
import KombuchaProfile from "../../../src/components/Kombucha/KombuchaProfile";
import ReviewSideBar from "../../../src/components/Kombucha/ReviewSideBar";
import {
  KombuchaReviews,
  KombuchaTopReview,
} from "../../../src/components/Kombucha/ReviewTable";
import { MainLayout } from "../../../src/components/Layout";
import ProfileTopBar from "../../../src/components/Kombucha/KombuchaProfile/ProfileTopBar";
import useSWR from "swr";
import { KombuchaData } from "../../../src/types/api";

interface KombuchaPageProps {
  singleKombuchaData: KombuchaData;
}

//TODO: Why is singleKombuchaData returned as array from getStaticProps in production?
const KombuchaPage = ({ singleKombuchaData }: KombuchaPageProps) => {
  const _id = singleKombuchaData?._id as string;

  const { data: reviews } = useSWR(`/api/kombucha/${_id}/reviews`);

  const router = useRouter();

  if (router.isFallback) {
    return <CircularProgress />;
  }
  if (!reviews) return <CircularProgress />;

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={9}>
            <Paper sx={{ mb: 1.5 }} variant="outlined">
              <ProfileTopBar kombuchaId={_id} />
              <Divider />
              <KombuchaProfile singleKombuchaData={singleKombuchaData} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={3} mb={1.5}>
            <ReviewSideBar
              singleKombuchaData={singleKombuchaData}
              reviews={reviews}
            />
          </Grid>

          <Grid item xs={12} md={9} mb={1.5}>
            <Paper sx={{ p: 3 }} variant="outlined">
              <Typography variant="h6" color="text.primary" fontWeight="600">
                Top Review
              </Typography>
              <KombuchaTopReview kombuchaId={_id} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper sx={{ px: 3, pt: 3, pb: 2 }} variant="outlined">
              <Typography
                variant="h6"
                color="text.primary"
                fontWeight="600"
                gutterBottom
              >
                Reviews ({reviews?.length || 0})
              </Typography>
              <KombuchaReviews kombuchaId={_id} reviews={reviews} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

//fetch and pre-render kombucha profile data at build time
export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();

  const idList = await Kombucha.distinct("_id");
  const params = idList.map((id) => ({ params: { id: id.toString() } }));

  return {
    fallback: true,
    paths: params,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const res = await getData(`kombucha/${id}`);
  const singleKombuchaData = Array.isArray(res) ? res[0] : res;

  return {
    props: {
      singleKombuchaData,
    },
    revalidate: 10,
  };
};

export default KombuchaPage;
