import useSWR from "swr";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { getData } from "../../src/utils/fetchData";
import KombuchaProfile from "../../src/components/Kombucha/KombuchaProfile";
import KombuchaSideBar from "../../src/components/Kombucha/ReviewSideBar";
import {
  KombuchaTopReview,
  KombuchaReviews,
} from "../../src/components/Kombucha/ReviewTable";
import { MainLayout } from "../../src/components/Layout";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Kombucha = ({ singleKombuchaData }) => {
  const { review_count } = singleKombuchaData;

  const router = useRouter();
  const { id } = router.query;

  //load reviews, client side with useSWR
  const { data: kombuchaReviews, error } = useSWR(
    `/api/kombucha/${id}/reviews`,
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
            <KombuchaSideBar
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

export async function getServerSideProps(ctx) {
  //fetch kombucha profile data serverside
  const [singleKombuchaData] = await getData("kombucha", ctx.params.id);
  // const kombuchaReviews = await getData(`kombucha/${ctx.params.id}`, "reviews");
  const session = await getSession(ctx);
  return {
    props: {
      singleKombuchaData,
      session,
      // kombuchaReviews,
    },
  };
}

export default Kombucha;
