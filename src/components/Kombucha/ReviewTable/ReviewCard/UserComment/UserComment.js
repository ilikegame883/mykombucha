import React from "react";
import Link from "next/link";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  FormHelperText,
  IconButton,
  Paper,
  Rating,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import getUserBadge from "../../../../../utils/getUserBadge";
import CommentCard from "./CommentCard";

const UserComment = ({ openComment, handleCloseComment, review }) => {
  return (
    <React.Fragment>
      <Dialog
        open={openComment}
        onClose={handleCloseComment}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { backgroundColor: "#FAFAFA" } }}
      >
        <AppBar sx={{ position: "relative" }} elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseComment}
              aria-label="close"
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography
              sx={{ ml: 1, flex: 1 }}
              variant="h6"
              component="div"
              fontWeight="600"
            >
              Go Back
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Paper sx={{ p: 3 }} elevation={0} variant="outlined">
            <Box display="flex" alignItems="center" flexWrap="wrap">
              <Box display="flex" alignItems="center">
                <Avatar
                  src={review.review_by.avatar.image}
                  alt={review.review_by.username}
                  sx={{ width: 40, height: 40 }}
                />
                <Box ml={1}>
                  <Link href={`/users/${review.review_by.username}`} passHref>
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      component="a"
                      color="text.primary"
                      lineHeight={1.35}
                    >
                      {review.review_by.username}
                    </Typography>
                  </Link>
                  {getUserBadge(review.review_by.review_total, "sub").value}

                  <Typography
                    variant="caption"
                    component="p"
                    color="text.secondary"
                  >
                    {review.review_by.city
                      ? `${review.review_by.city}, `
                      : "City, "}
                    {review.review_by.country
                      ? `${review.review_by.country}`
                      : "State"}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" my={2}>
              <Rating
                name="user-rating"
                precision={0.25}
                value={review.rating}
                size="small"
                readOnly
              />
              <Typography
                variant="body2"
                color="text.primary"
                fontWeight="600"
                component="span"
                ml={0.5}
              >
                ({review.rating.toFixed(2)})
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                color="text.primary"
                mb={{ xs: 2, sm: 3 }}
              >
                {review.comment}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box>
                <Typography
                  component="span"
                  variant="caption"
                  py={0.5}
                  px={1}
                  bgcolor="#F5F5F5"
                  fontWeight="500"
                  sx={{ borderRadius: 1.5 }}
                >
                  {review.served_in}
                </Typography>
                <Typography variant="caption" ml={0.5}>
                  {review.createdAt.slice(0, review.createdAt.lastIndexOf("T"))}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper sx={{ px: 3, pt: 3, pb: 2, my: 2 }} variant="outlined">
            <Typography
              variant="h6"
              color="text.primary"
              fontWeight="600"
              gutterBottom
            >
              0 Comments
            </Typography>
            <CommentCard />
          </Paper>
          <Paper sx={{ px: 3, pt: 3, pb: 2 }} variant="outlined">
            <Typography
              variant="h6"
              color="text.primary"
              fontWeight="600"
              mb={1.5}
            >
              Add Comment{" "}
            </Typography>
            <Box mb={3}>
              <TextField
                id="user-review-comment"
                placeholder="Type your comment here"
                required
                multiline
                fullWidth
                rows={8}
                type="text"
                sx={{ backgroundColor: "#FAFAFA" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormHelperText error sx={{ fontWeight: "600" }}>
                Please sign in or register to comment this review.
              </FormHelperText>
              <Button variant="contained" type="submit" disabled>
                Submit
              </Button>
            </Box>
          </Paper>
        </Container>
      </Dialog>
    </React.Fragment>
  );
};

export default UserComment;
