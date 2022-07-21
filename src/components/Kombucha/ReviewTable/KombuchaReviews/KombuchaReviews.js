import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Typography, Box, CircularProgress, Divider } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import { patchData } from "../../../../utils/fetchData";
import ReviewCard from "../ReviewCard";

const KombuchaReviews = ({ kombuchaReviews }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const { id } = router.query;

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
    mutate(`/api/kombucha/${id}/reviews`);
    mutate(`/api/kombucha/${id}/reviews/top-review`);
  };

  if (!kombuchaReviews) return <CircularProgress color="primary" />;

  return (
    <>
      {kombuchaReviews.length ? (
        kombuchaReviews.map((r, idx) => (
          <Box key={idx}>
            <ReviewCard review={r} handleClickLikeIcon={handleClickLikeIcon} />
            {kombuchaReviews.length - 1 !== idx && <Divider sx={{ my: 1 }} />}
          </Box>
        ))
      ) : (
        <Box sx={{ mt: 2 }}>
          <FindInPageOutlinedIcon
            color="primary"
            sx={{ fontSize: 84, opacity: 0.3 }}
          />
          <Typography variant="body1" color="text.primary" mt={2}>
            There are no reviews yet. Click the Rate button to add a review!
          </Typography>
        </Box>
      )}
    </>
  );
};

export default KombuchaReviews;
