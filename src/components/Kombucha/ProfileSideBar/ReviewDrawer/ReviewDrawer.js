import React, { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { mutate } from "swr";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { postData } from "../../../../utils/fetchData";
import RatingSlider from "./RatingSlider";
import { AlertContext } from "../../../../stores/context/alert.context";
import { toggleSnackBar } from "../../../../stores/alert.actions";

const ReviewDrawer = ({ singleKombuchaData, toggleDrawer }) => {
  const { brewery_slug, brewery_name } = singleKombuchaData;
  const { dispatch } = useContext(AlertContext);

  const theme = useTheme();

  const { data: session } = useSession();

  const [error, setError] = useState(false);
  const [userReview, setUserReview] = useState({
    rating: 0,
    comment: "",
    product: singleKombuchaData._id,
    brewery_slug: brewery_slug,
    brewery_name: brewery_name,
    served_in: "",
    user: session.user._id,
    username: session.user.username,
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
    e.preventDefault();
    const { rating, served_in, comment } = userReview;

    if (!rating > 0 || !served_in || +comment.length <= 10) {
      setError(true);
      return;
    }
    const res = await postData("/reviews", userReview);

    if (res?.msg) {
      dispatch(toggleSnackBar("success", res.msg, true));
      mutate(`/api/kombucha/${singleKombuchaData._id}/reviews`);
      toggleDrawer(e);
    }
    if (res?.err) dispatch(toggleSnackBar("error", res.err, true));
  };

  return (
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
          sx={{ color: "common.white", "&:hover": { color: "common.white" } }}
          onClick={toggleDrawer}
        >
          <CloseIcon />
        </IconButton>
        <Typography color="primary.contrastText">Submit a review</Typography>
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
          <Typography variant="h6" color="text.primary" gutterBottom>
            Your Review:
          </Typography>
          <TextField
            id="review-comments"
            placeholder="Share your experience with this kombucha."
            required
            multiline
            fullWidth
            rows={8}
            variant="outlined"
            value={userReview.comment}
            onChange={handleCommentChange}
            type="text"
          />
          <FormHelperText error={error}>
            Must be at least 10 characters in length.
          </FormHelperText>
        </Box>
        <Typography variant="h6" color="text.primary">
          Served in:
        </Typography>
        <Stack direction="row" spacing={1} marginTop={1}>
          {["Bottle", "Can", "Draft", "Other"].map((item) => (
            <Box
              key={item}
              onClick={() => handleServedInClick(item)}
              sx={{
                width: 1,
                borderRadius: 2,
                p: 1,
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
        <Button
          variant="contained"
          fullWidth
          type="submit"
          size="large"
          sx={{ mt: 3 }}
        >
          Submit Review
        </Button>
        {error && (
          <FormHelperText error sx={{ fontWeight: "600" }}>
            Please complete all fields.
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
};

export default ReviewDrawer;
