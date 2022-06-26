import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
  Rating,
  IconButton,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import getUserBadge from "../../../../utils/getUserBadge";

const ReviewCard = ({ review, handleClickLikeIcon, topReview }) => {
  const { data: session } = useSession();

  const thumbsUpClickedByUser =
    session && review.likes.includes(session.user._id);

  const disableThumbsUp = session && session.user_id === review._id;
  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem
          sx={{ flexDirection: "column", py: 1 }}
          alignItems="flex-start"
        >
          <Box sx={{ display: "flex", alignItems: "center" }} mb={2}>
            <ListItemAvatar sx={{ mt: 0, width: 60, height: 60 }}>
              <Avatar
                src={review.review_by.avatar}
                alt={review.username}
                sx={{ width: "100%", height: "100%" }}
              />
            </ListItemAvatar>
            <ListItemText
              sx={{ ml: 1.5, mt: 0 }}
              primary={
                <Box display="flex">
                  <Link href={`/users/${review.username}`} passHref>
                    <Typography
                      variant="h6"
                      fontWeight="500"
                      component="a"
                      color="text.primary"
                      sx={{ textDecoration: "none" }}
                    >
                      {review.username}
                    </Typography>
                  </Link>
                  <Box alignSelf="flex-end">
                    {
                      getUserBadge(review.review_by.review_total, "text-bottom")
                        .value
                    }
                  </Box>
                </Box>
              }
              secondary={
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ lineHeight: 1 }}
                >
                  City, Country
                </Typography>
              }
            />
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Rating
              name="user-rating"
              precision={0.25}
              value={review.rating}
              readOnly
            />
            <Typography
              variant="body1"
              color="text.secondary"
              component="span"
              ml={0.5}
            >
              ({review.rating.toFixed(2)})
            </Typography>
          </Box>
          <Typography variant="body2" mb={2}>
            {review.comment}
          </Typography>
          <Typography variant="caption" mb={1}>
            Review Date:{" "}
            {review.createdAt.slice(0, review.createdAt.lastIndexOf("T"))}{" "}
            <Typography
              component="span"
              variant="caption"
              py={0.5}
              px={1}
              ml={0.5}
              bgcolor="#F5F5F5"
              sx={{ borderRadius: 1.5 }}
            >
              {review.served_in}
            </Typography>
          </Typography>
          <Box display="flex" alignItems="center">
            {!topReview && (
              <IconButton
                disableRipple
                sx={{
                  borderRadius: 2,
                  px: 1,
                  py: 0.5,
                  bgcolor: thumbsUpClickedByUser ? "primary.main" : "inherit",
                }}
                disabled={disableThumbsUp}
                onClick={() => handleClickLikeIcon(review._id)}
              >
                <ThumbUpOutlinedIcon sx={{ fontSize: 14 }} />
                <Typography
                  variant="body2"
                  color="text.primary"
                  component="span"
                  pl={1}
                >
                  {review.like_count}
                </Typography>
              </IconButton>
            )}
          </Box>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

export default ReviewCard;
