import React, { useContext } from "react";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { Typography, Box, CircularProgress, Divider } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import { patchData } from "../../../../utils/fetchData";
import ReviewCard from "../ReviewCard";
import { AlertContext } from "../../../../stores/context/alert.context";
import { toggleToast } from "../../../../stores/actions";

const KombuchaReviews = ({ kombuchaReviews, kombuchaId, isValidating }) => {
  const { dispatch } = useContext(AlertContext);

  const { data: session } = useSession();

  const handleClickLikeIcon = async (reviewId) => {
    if (!session) {
      dispatch(toggleToast("error", "Log in to like a review!", true));
      return;
    }
    //when user in session clicks review like button,
    //add/remove review id to from their like list
    //use useSWR mutate to show a live update of like button
    await patchData(`reviews/${reviewId}/like`, { user: session.user._id });
    mutate(`/api/kombucha/${kombuchaId}/reviews`);
    mutate(`/api/kombucha/${kombuchaId}/reviews/top-review`);
  };

  if (isValidating) return <CircularProgress color="primary" />;

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
