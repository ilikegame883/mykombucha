import React, { useContext, useCallback, memo } from "react";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import { Typography, Box, Divider } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import { patchData } from "../../../../utils/fetchData";
import ReviewCard from "../ReviewCard";
import { AlertContext } from "../../../../stores/context/alert.context";
import setToggleSnackBar from "../../../../utils/setToggleSnackBar";

const KombuchaReviews = ({ kombuchaReviews, kombuchaId }) => {
  const { dispatch } = useContext(AlertContext);
  const { data: session } = useSession();

  //useCallback here to prevent re-rendering <ReviewCard /> when AlertContext changes
  const handleClickLikeIcon = useCallback(async (reviewId) => {
    if (!session) {
      dispatch(setToggleSnackBar("login"));
      return;
    }
    //update user's liked reviews - add/remove reviewId from reviews liked list
    //use SWR mutate to show updated like count
    await patchData(`reviews/${reviewId}/like`, { user: session.user._id });
    mutate(`/api/kombucha/${kombuchaId}/reviews`);
    mutate(`/api/kombucha/${kombuchaId}/reviews/top-review`);
  }, []);

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
