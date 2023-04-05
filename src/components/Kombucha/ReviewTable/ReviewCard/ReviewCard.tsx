import React, { useState, memo, useMemo, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Avatar, Typography, Box, Rating, IconButton } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import getUserBadge from "../../../UserBadge";
import UserComment from "./UserComment";
import { patchData } from "../../../../utils/fetch-utils";
import { mutate } from "swr";
import { useSetSnackbar } from "../../../../utils/hooks/useSnackbar";
import { ReviewData, UserData } from "../../../../types/api";

interface ReviewCardProps {
  review: ReviewData;
  isTopReview?: boolean;
  kombuchaId: string;
}

//TODO: Finish review comment feature
const ReviewCard = ({
  review,
  isTopReview = null,
  kombuchaId,
}: ReviewCardProps) => {
  const [openComment, setOpenComment] = useState(false);
  const setSnackbar = useSetSnackbar();
  const router = useRouter();

  const { data: session } = useSession();
  const review_author = review.review_author.data;

  //check if user has liked review
  const likedBySessionUser = useMemo(() => {
    return session && review.likes.includes(session.user.id);
  }, [session, review]);

  //disable like button for user's own review
  const disableLikeBtn = useMemo(() => {
    return session && session.user.id === review_author._id;
  }, [session, review_author]);

  const handleClickLikeIcon = async (reviewId) => {
    if (!session) {
      router.push("/signin");
      return;
    }
    if (!session?.user.username) {
      router.push("/username");
      return;
    }
    //update user's liked reviews - add/remove reviewId from reviews liked list
    //use SWR mutate to show updated like count
    const res = await patchData(`reviews/${reviewId}/like`, {
      user: session.user.id,
    });
    if (res.msg) {
      mutate(`/api/kombucha/${kombuchaId}/reviews`);
      mutate(`/api/kombucha/${kombuchaId}/reviews/top-review`);
    }
    if (res?.err) return setSnackbar(res.err, "error");
  };

  const handleOpenComment = () => {
    setOpenComment(true);
  };

  const handleCloseComment = () => {
    setOpenComment(false);
  };

  return (
    <Box py={2.5}>
      {/* Dialog for user comments on kombucha review */}
      {/* <UserComment
        openComment={openComment}
        handleCloseComment={handleCloseComment}
        review={review}
      /> */}

      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Box display="flex" alignItems="center">
          <Avatar
            src={review_author.profile.image}
            alt={review_author.username}
            sx={{ width: 40, height: 40 }}
          />
          <Box ml={1}>
            <Link href={`/users/${review_author._id}`} passHref>
              <Typography
                variant="h6"
                fontWeight="600"
                component="a"
                color="text.primary"
                lineHeight={1.35}
              >
                {review_author.username}
              </Typography>
            </Link>
            {getUserBadge(review_author.review_total, "sub").value}

            <Typography variant="caption" component="p" color="text.secondary">
              {review_author.profile?.city ?? "City,"}{" "}
              {review_author.profile?.country ?? "Country"}
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
