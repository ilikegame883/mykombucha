import Link from "next/link";
import { Typography } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";

const ReviewNotFound = ({ searchUserReview, userReviews }) => {
  if (userReviews.length === 0)
    return (
      <>
        <FindInPageOutlinedIcon
          color="primary"
          sx={{ fontSize: 84, opacity: 0.3 }}
        />
        <Typography variant="body1" fontWeight="medium" mb={1}>
          You have no reviews
        </Typography>
        <Typography variant="body2">
          Click{" "}
          <Link href="/kombucha/explore/recent/1" passHref>
            <Typography
              variant="body2"
              component="a"
              color="secondary"
              fontWeight="500"
            >
              here
            </Typography>
          </Link>{" "}
          to explore kombuchas and add your first review!
        </Typography>
      </>
    );
  return (
    <>
      <Typography variant="body1" fontWeight="medium" mb={1}>
        Not found
      </Typography>
      <Typography variant="body2">
        No results found for <b>{`"${searchUserReview}"`}</b>. Try checking for
        typos or using complete words.
      </Typography>
    </>
  );
};

export default ReviewNotFound;
