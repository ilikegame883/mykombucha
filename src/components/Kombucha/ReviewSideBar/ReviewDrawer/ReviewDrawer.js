import React, { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { postData } from "../../../../utils/fetchData";
import RatingSlider from "./RatingSlider";
import CommentBox from "./CommentBox";
import { AlertContext } from "../../../../stores/context/alert.context";
import AlertToast from "../../../AlertToast";
import { toggleToast } from "../../../../stores/actions";

const ReviewDrawer = ({ singleKombuchaData, toggleDrawer }) => {
  const { brewery_name } = singleKombuchaData;
  const { dispatch } = useContext(AlertContext);

  const theme = useTheme();

  const { data: session } = useSession();

  const [error, setError] = useState(false);
  const [userReview, setUserReview] = useState({
    rating: 0,
    comment: "",
    product: singleKombuchaData._id,
    brewery: brewery_name,
    served_in: "",
    user: session.user._id,
    username: session.user.username,
    userAvatar: session.user.avatar,
  });

  const handleSliderChange = (event, newValue) => {
    setUserReview((state) => ({
      ...state,
      rating: newValue === 0 ? "No Rating" : newValue,
    }));
    setError(false);
  };

  const handleCommentChange = (event) => {
    setUserReview((state) => ({ ...state, comment: event.target.value }));
    setError(false);
  };

  const handleServedInClick = (item) => {
    setUserReview((state) => ({ ...state, served_in: item }));
    setError(false);
  };

  const handleSubmitReview = async (e) => {
    const { rating, served_in, comment } = userReview;

    if (!rating > 0 || !served_in || +comment <= 10) {
      e.preventDefault();
      setError(true);
      return;
    }
    //dont need e prevent default
    const res = await postData("/reviews", userReview);

    if (res?.msg) {
      dispatch(toggleToast("success", res.msg, true));
      toggleDrawer(e);
    }
    if (res?.err) dispatch(toggleToast("error", res.err, true));
  };

  return (
    <>
      <AlertToast />
      <Box sx={{ maxWidth: 600, width: "100vw" }}>
        <Box
          sx={{
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            aria-label="close"
            sx={{ color: "primary.contrastText" }}
            onClick={toggleDrawer}
          >
            <CloseIcon />
          </IconButton>
          <Typography color="primary.contrastText">
            Submit your review
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmitReview} p={3}>
          <RatingSlider
            rating={userReview.rating}
            handleSliderChange={handleSliderChange}
          />
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              height: 30,
            }}
            mb={3}
          >
            <Rating
              name="read-only"
              precision={0.25}
              value={userReview.rating}
              readOnly
            />
            <Typography
              variant="body1"
              color="text.secondary"
              component="div"
              fontWeight="700"
            >
              {userReview.rating} / 5
            </Typography>
          </Box>
          <Divider sx={{ my: 3 }} />

          <Box mb={3}>
            <Typography variant="h6" color="primary.dark" gutterBottom>
              Your Review:
            </Typography>
            <CommentBox
              comment={userReview.comment}
              handleChange={handleCommentChange}
            />
          </Box>
          <Typography variant="h6" color="primary.dark">
            Served in:
          </Typography>
          <Stack direction="row" spacing={1} marginTop={1}>
            {["Can", "Bottle", "Draft", "Other"].map((item) => (
              <Box
                key={item}
                onClick={() => handleServedInClick(item)}
                sx={{
                  width: 1,
                  borderRadius: 2,
                  padding: 1,
                  border: `2px solid ${
                    userReview.served_in === item
                      ? theme.palette.primary.main
                      : theme.palette.divider
                  }`,
                  cursor: "pointer",
                }}
              >
                <Typography align={"center"}>{item}</Typography>
              </Box>
            ))}
          </Stack>
          <Button variant="contained" fullWidth sx={{ mt: 3 }} type="submit">
            Submit Review
          </Button>
          {error && (
            <FormHelperText error>Please fill in all fields</FormHelperText>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ReviewDrawer;
