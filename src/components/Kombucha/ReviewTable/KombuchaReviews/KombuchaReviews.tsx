import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import ReviewCard from "../ReviewCard";
import { ReviewData } from "../../../../types/api";

interface KombuchaReviewsProps {
  kombuchaId: string;
  reviews: ReviewData[];
}
const KombuchaReviews = ({ kombuchaId, reviews }: KombuchaReviewsProps) => {
  return (
    <>
      {!!reviews.length ? (
        reviews.map((r, idx) => (
          <React.Fragment key={idx}>
            <ReviewCard review={r} kombuchaId={kombuchaId} />
            {reviews.length - 1 !== idx && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))
      ) : (
        <Box mt={2} display="flex" alignItems="center">
          <FindInPageOutlinedIcon
            color="primary"
            sx={{ fontSize: 80, opacity: 0.3 }}
          />
          <Typography variant="body1" color="text.primary" ml={2}>
            There are no reviews yet. Click the Rate button to add a review!
          </Typography>
        </Box>
      )}
    </>
  );
};

export default KombuchaReviews;
