import useSWR from "swr";
import { Typography, Box, CircularProgress } from "@mui/material";
import ReviewCard from "../ReviewCard";

const KombuchaTopReview = ({ kombuchaId }) => {
  //load top review client side with SWR
  const { data: topReview } = useSWR(
    `/api/kombucha/${kombuchaId}/reviews/top-review`
  );

  if (!topReview) return <CircularProgress color="primary" />;

  return (
    <Box>
      {topReview.length ? (
        <ReviewCard
          review={topReview[0]}
          isTopReview={true}
          kombuchaId={kombuchaId}
        />
      ) : (
        <Typography variant="body2" color="text.primary" mt={1}>
          Top review has not yet been determined.
        </Typography>
      )}
    </Box>
  );
};

export default KombuchaTopReview;
