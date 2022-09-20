import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, Typography, Box, Rating, IconButton } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import getUserBadge from "../../../../utils/getUserBadge";

//Single review item
const ReviewCard = ({ review, handleClickLikeIcon, isTopReview }) => {
  const { data: session } = useSession();

  const checkIfUserLikedReview =
    session && review.likes.includes(session.user._id);

  //disable like button for user's own review
  const disableLikeBtn = session && session.user._id === review.review_by._id;

  return (
    <Box py={2.5}>
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

            <Typography variant="caption" component="p" color="text.secondary">
              {review.review_by.city ? `${review.review_by.city}, ` : "City, "}
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
              color: checkIfUserLikedReview ? "secondary.main" : "inherit",
            }}
            disabled={disableLikeBtn}
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
            fontWeight="500"
            sx={{ borderRadius: 1.5 }}
          >
            {review.served_in}
          </Typography>
          <Typography variant="caption" ml={1}>
            {review.createdAt.slice(0, review.createdAt.lastIndexOf("T"))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewCard;
