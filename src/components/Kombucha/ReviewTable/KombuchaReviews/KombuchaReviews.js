import React from "react";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { Typography, Box, CircularProgress, Divider } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import { patchData } from "../../../../utils/fetchData";
import ReviewCard from "../ReviewCard";

const KombuchaReviews = ({
  kombuchaReviews,
  isReviewDataLoading,
  kombuchaId,
}) => {
  const { data: session } = useSession();

  const handleClickLikeIcon = async (reviewId) => {
    if (!session) {
      //prevent user from liking own review
      //log in or create an account to like reviews!
      //popup
      return;
    }
    //when user in session clicks on review like button
    //add review id to user like list or
    //remove review id from list if user removes their like
    //use useSWR mutate for live update
    await patchData(`reviews/${reviewId}/like`, { user: session.user._id });
    mutate(`/api/kombucha/${kombuchaId}/reviews`);
    mutate(`/api/kombucha/${kombuchaId}/reviews/top-review`);
  };

  if (isReviewDataLoading) return <CircularProgress color="primary" />;

  return (
    <>
      {kombuchaReviews.length ? (
        kombuchaReviews.map((r, idx) => (
          <React.Fragment key={idx}>
            <ReviewCard review={r} handleClickLikeIcon={handleClickLikeIcon} />
            {kombuchaReviews.length - 1 !== idx && <Divider sx={{ my: 1 }} />}
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
