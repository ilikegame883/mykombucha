import useSWR from "swr";
import Kombucha from "../../../src/models/kombuchaModel";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { getData } from "../../../src/utils/fetchData";
import KombuchaProfile from "../../../src/components/Kombucha/KombuchaProfile";
import ReviewSideBar from "../../../src/components/Kombucha/ReviewSideBar";
import {
  KombuchaReviews,
  KombuchaTopReview,
} from "../../../src/components/Kombucha/ReviewTable";
import { MainLayout } from "../../../src/components/Layout";
import connectDB from "../../../src/lib/connectDB";

const fetcher = (url) => fetch(url).then((res) => res.json());

const KombuchaPage = ({ singleKombuchaData, kombuchaId }) => {
  const { review_count } = singleKombuchaData;

  //load reviews, client side with useSWR
  const { data: kombuchaReviews, error } = useSWR(
    // `/api/kombucha/${id}/reviews`,
    `/api/kombucha/${kombuchaId}/reviews`,

    fetcher
  );

  return (
    <MainLayout>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={9}>
            <Paper sx={{ mb: 1.5 }}>
              <KombuchaProfile kombuchaData={singleKombuchaData} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={3} mb={1.5}>
            <ReviewSideBar
              kombuchaReviews={kombuchaReviews}
              kombuchaData={singleKombuchaData}
            />
          </Grid>

          <Grid item xs={12} md={9} mb={1.5}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" color="text.primary" fontWeight="medium">
                Top Review
              </Typography>
              <KombuchaTopReview />
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper sx={{ px: 3, pt: 3, pb: 2 }}>
              <Typography
                variant="h6"
                color="text.primary"
                fontWeight="medium"
                gutterBottom
              >
                Reviews ({review_count})
              </Typography>

              <KombuchaReviews kombuchaReviews={kombuchaReviews} />
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
  };
}

export default KombuchaPage;
