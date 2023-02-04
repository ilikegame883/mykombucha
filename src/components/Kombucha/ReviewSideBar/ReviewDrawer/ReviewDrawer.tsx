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
import { postData } from "../../../../utils/fetch-utils";
import RatingSlider from "./RatingSlider";
import useLocalStorage from "../../../../utils/hooks/useLocalStorage";
import { useSetSnackbar } from "../../../../utils/hooks/useSnackbar";

interface UserReview {
  rating: number | string;
  comment: string;
  kombucha: {
    data: string;
    brewery_name: string;
    brewery_slug: string;
  };
  served_in: string;
  review_author: { data: string };
}
const ReviewDrawer = ({ singleKombuchaData, toggleDrawer }) => {
  const { brewery_slug, brewery_name } = singleKombuchaData;
  const setSnackbar = useSetSnackbar();

  const theme = useTheme();

  const { data: session } = useSession();

  const [error, setError] = useState(false);
  const [userComment, setUserComment] = useLocalStorage(singleKombuchaData._id);
  const [userReview, setUserReview] = useState<UserReview>({
    rating: 0,
    comment: userComment,
    kombucha: {
      data: singleKombuchaData._id,
      brewery_name,
      brewery_slug,
    },
    served_in: null,
    review_author: { data: session.user.id },
  });

  const handleSliderChange = (e: Event, newValue: number) => {
    setUserReview((state) => ({
      ...state,
      rating: newValue === 0 ? "No Rating" : (newValue as number),
    }));
    setError(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserComment(e.target.value);
    setUserReview((state) => ({ ...state, comment: e.target.value }));
    setError(false);
  };

  const handleServedInClick = (item: string) => {
    setUserReview((state) => ({ ...state, served_in: item }));
    setError(false);
  };

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { rating, served_in, comment } = userReview;
    const invalidRating = rating === 0 || rating === "No Rating" ? true : false;

    if (invalidRating || !served_in || +comment.length < 8) {
      setError(true);
      return;
    }
    const res = await postData(
      `kombucha/${singleKombuchaData._id}/reviews`,
      userReview
    );

    if (res?.msg) {
      setSnackbar(res.msg, "success");
      mutate(`/api/kombucha/${singleKombuchaData._id}/reviews`);
      setUserComment("");
      toggleDrawer(e);
    }
    if (res?.err) setSnackbar(res.err, "error");
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
          error={error}
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
            value={userReview.rating as number}
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
            id="kombucha-review"
            placeholder="Share your experience with this kombucha."
            required
            multiline
            fullWidth
            rows={8}
            variant="outlined"
            value={userComment}
            onChange={handleCommentChange}
            type="text"
            error={userComment.length <= 8 && error}
            helperText={
              userComment.length <= 8 && error
                ? "Please write at least 8 characters."
                : ""
            }
            FormHelperTextProps={{ sx: { marginLeft: "0px" } }}
          />
        </Box>
        <Typography
          variant="h6"
          color={!userReview.served_in && error ? "error" : "text.primary"}
        >
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
          <FormHelperText error sx={{ fontWeight: "600", fontSize: ".85em" }}>
            Please complete all fields.
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
};

export default ReviewDrawer;
