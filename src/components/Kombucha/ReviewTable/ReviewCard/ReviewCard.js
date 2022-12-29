import React, { useState, memo, useMemo } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, Typography, Box, Rating, IconButton } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import getUserBadge from "../../../../utils/getUserBadge";
import UserComment from "./UserComment";

//Single review item
const ReviewCard = ({ review, handleClickLikeIcon, isTopReview }) => {
  const [openComment, setOpenComment] = useState(false);
  const { data: session } = useSession();

  const likedBySessionUser = useMemo(() => {
    session && review.likes.includes(session.user._id);
  }, [session, review]);

  //disable like button for user's own review
  const disableLikeBtn = useMemo(() => {
    session && session.user._id === review.review_by._id;
  }, [session, review]);

  const handleOpenComment = () => {
    setOpenComment(true);
  };

  const handleCloseComment = () => {
    setOpenComment(false);
  };

  return (
    <Box py={2.5}>
      {/* Dialog for user comments on kombucha review */}
      <UserComment
        openComment={openComment}
        handleCloseComment={handleCloseComment}
        review={review}
      />

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
          <Box>
            <IconButton
              disableRipple
              sx={{
                p: 0,
                color: likedBySessionUser ? "secondary.main" : "inherit",
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
            <IconButton
              disableRipple
              sx={{
                p: 0,
                ml: 2,
                color: likedBySessionUser ? "secondary.main" : "inherit",
              }}
              disabled={disableLikeBtn}
              onClick={handleOpenComment}
            >
              <ChatBubbleOutlineIcon sx={{ fontSize: 14 }} />
              <Typography
                variant="caption"
                color="text.primary"
                fontWeight="600"
                pl={0.75}
              >
                0
              </Typography>
            </IconButton>
          </Box>
        )}
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
    </Box>
  );
};

export default memo(ReviewCard);
