import useSWR from "swr";
import Kombucha from "../../../src/models/kombuchaModel";
import { Container, Grid, Paper, Typography, Divider } from "@mui/material";
import { getData } from "../../../src/utils/fetchData";
import connectDB from "../../../src/lib/connectDB";
import KombuchaProfile from "../../../src/components/Kombucha/KombuchaProfile";
import ReviewSideBar from "../../../src/components/Kombucha/ReviewSideBar";
import {
  KombuchaReviews,
  KombuchaTopReview,
} from "../../../src/components/Kombucha/ReviewTable";
import { MainLayout } from "../../../src/components/Layout";
import ProfileTopBar from "../../../src/components/Kombucha/KombuchaProfile/ProfileTopBar";

const fetcher = (url) => fetch(url).then((res) => res.json());

const KombuchaPage = ({ singleKombuchaData, kombuchaId }) => {
  //load reviews, client side with useSWR
  const { data: kombuchaReviews, error } = useSWR(
    `/api/kombucha/${kombuchaId}/reviews`,
    fetcher
  );
  const isReviewDataLoading = !error && !kombuchaReviews;

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={9}>
            <Paper sx={{ mb: 1.5 }} variant="outlined">
              <ProfileTopBar kombuchaId={kombuchaId} />
              <Divider />
              <KombuchaProfile singleKombuchaData={singleKombuchaData} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={3} mb={1.5}>
            <ReviewSideBar
              singleKombuchaData={singleKombuchaData}
              kombuchaReviews={kombuchaReviews}
              isReviewDataLoading={isReviewDataLoading}
            />
          </Grid>

          <Grid item xs={12} md={9} mb={1.5}>
            <Paper sx={{ p: 3 }} variant="outlined">
              <Typography variant="h6" color="text.primary" fontWeight="600">
                Top Review
              </Typography>
              <KombuchaTopReview kombuchaId={kombuchaId} />
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
                Reviews ({!isReviewDataLoading && kombuchaReviews.length})
              </Typography>
              <KombuchaReviews
                kombuchaReviews={kombuchaReviews}
                isReviewDataLoading={isReviewDataLoading}
                kombuchaId={kombuchaId}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export async function getStaticPaths() {
  await connectDB();

  const idList = await Kombucha.distinct("_id");
  const params = idList.map((id) => ({ params: { id: id.toString() } }));

  return {
    fallback: false,
    paths: params,
  };
}
export async function getStaticProps({ params }) {
  const [singleKombuchaData] = await getData("kombucha", params.id);
  return {
    props: {
      singleKombuchaData,
      kombuchaId: params.id,
    },
    revalidate: 1,
  };
}

export default KombuchaPage;
