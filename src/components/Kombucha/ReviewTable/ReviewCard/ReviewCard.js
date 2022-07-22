import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, Typography, Box, Rating, IconButton } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import getUserBadge from "../../../../utils/getUserBadge";

const ReviewCard = ({ review, handleClickLikeIcon, isTopReview }) => {
  const { data: session } = useSession();

  const thumbsUpClickedByUser =
    session && review.likes.includes(session.user._id);

  const disableThumbsUp = session && session.user_id === review._id;
  return (
    <Box py={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        mb={2}
      >
        <Box display="inline-flex">
          <Avatar
            src={review.review_by.avatar}
            alt={review.username}
            sx={{ width: 50, height: 50 }}
          />
          <Box ml={1.5}>
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
            {getUserBadge(review.review_by.review_total, "sub").value}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1 }}
            >
              City, Country
            </Typography>
          </Box>
        </Box>
        <Box display="inline-flex" alignItems="center">
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
            component="span"
            ml={0.5}
          >
            ({review.rating.toFixed(2)})
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="body2" color="text.primary" mb={{ xs: 2, sm: 3 }}>
          {review.comment}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        {!isTopReview && (
          <IconButton
            disableRipple
            sx={{
              p: 0,
              color: thumbsUpClickedByUser ? "secondary.main" : "inherit",
            }}
            disabled={disableThumbsUp}
            onClick={() => handleClickLikeIcon(review._id)}
          >
            <ThumbUpOutlinedIcon sx={{ fontSize: 14 }} />
            <Typography
              variant="caption"
              color="text.primary"
              fontWeight="600"
              pl={1}
            >
              {review.like_count}
            </Typography>
          </IconButton>
        )}
        <Box pt={{ xs: 1, sm: 0 }}>
          <Typography
            component="span"
            variant="caption"
            py={0.5}
            px={1}
            bgcolor="#F5F5F5"
            sx={{ borderRadius: 1.5 }}
          >
            {review.served_in}
          </Typography>
          <Typography variant="caption" ml={1}>
            Review Date:{" "}
            {review.createdAt.slice(0, review.createdAt.lastIndexOf("T"))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewCard;
