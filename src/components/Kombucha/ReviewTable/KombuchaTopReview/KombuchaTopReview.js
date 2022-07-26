import useSWR from "swr";
import { Typography, Box, CircularProgress } from "@mui/material";
import ReviewCard from "../ReviewCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

const KombuchaTopReview = ({ kombuchaId }) => {
  //load top review client side with useSWR
  const { data: topReview, error } = useSWR(
    `/api/kombucha/${kombuchaId}/reviews/top-review`,
    fetcher
  );
  const isTopReviewDataLoading = !error && !topReview;

  if (isTopReviewDataLoading) return <CircularProgress color="primary" />;

  return (
    <Box>
      {topReview.length ? (
        <ReviewCard review={topReview[0]} isTopReview={true} />
      ) : (
        <Typography variant="body2" color="text.primary" mt={1}>
          Top review has not yet been determined.
        </Typography>
      )}
    </Box>
  );
};

export default KombuchaTopReview;
