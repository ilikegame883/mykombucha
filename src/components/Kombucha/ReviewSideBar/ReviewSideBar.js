import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Typography,
  Button,
  Drawer,
  CircularProgress,
} from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useSession } from "next-auth/react";
import ReviewDrawer from "./ReviewDrawer";

const StatItem = ({ kombuchaData }) => {
  const { review_count } = kombuchaData;

  return (
    <>
      <Grid item xs={6}>
        <Paper variant="outlined" sx={{ py: 1, textAlign: "center" }}>
          <Box sx={{ mb: 0.5 }}>
            <RateReviewIcon sx={{ color: "secondary.main" }} />
          </Box>
          <Typography variant="h6">{review_count}</Typography>
          <Typography variant="body2">Total Reviews</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper variant="outlined" sx={{ py: 1, textAlign: "center" }}>
          <Box sx={{ mb: 0.5 }}>
            <StarsIcon sx={{ color: "#FAAF00" }} />
          </Box>
          <Typography variant="h6">#</Typography>
          <Typography variant="body2">Rank</Typography>
        </Paper>
      </Grid>
    </>
  );
};

const ReviewSideBar = ({ kombuchaReviews, kombuchaData }) => {
  const [state, setState] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (!session) {
      router.push("/signin");
    } else {
      setState(!state);
    }
  };

  //get required data with swr?
  //check if user already reviewed kombucha

  const findUserReview =
    session &&
    kombuchaReviews &&
    kombuchaReviews.find(({ user }) => {
      const { _id: userFromSession } = session.user;
      return user === userFromSession;
    });

  if (!kombuchaReviews) return <CircularProgress color="primary" />;

  return (
    <>
      <Card>
        <CardContent sx={{ p: 2.5 }}>
          <Grid container spacing={1} mb={2}>
            <StatItem kombuchaData={kombuchaData} />
          </Grid>
          {findUserReview ? (
            <>
              <Typography variant="body1" color="text.primary" align="center">
                Your reviewed this Kombucha
              </Typography>

              <Typography
                variant="body1"
                color="text.primary"
                align="center"
                fontWeight="bold"
              >
                Your Rating: {findUserReview.rating}
              </Typography>
              <Typography
                variant="caption"
                color="text.primary"
                component="div"
                align="center"
              >
                {findUserReview.createdAt.slice(
                  0,
                  findUserReview.createdAt.lastIndexOf("T")
                )}
              </Typography>
            </>
          ) : (
            <Button
              size="medium"
              variant="contained"
              startIcon={<RateReviewIcon />}
              onClick={toggleDrawer}
              sx={{
                width: "100%",
                borderRadius: 10,
                py: 1,
              }}
            >
              Rate this Kombucha
            </Button>
          )}
        </CardContent>
      </Card>
      <Drawer anchor="right" open={state} onClose={toggleDrawer}>
        <ReviewDrawer kombuchaData={kombuchaData} toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default ReviewSideBar;
