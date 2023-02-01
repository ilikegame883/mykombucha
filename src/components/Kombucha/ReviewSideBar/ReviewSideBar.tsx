import React, { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
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
} from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ReviewDrawer from "./ReviewDrawer";
import { useSetSnackbar } from "../../../utils/hooks/useSnackbar";

//Right side column for kombucha user based stats (reviews, rank, etc...)
//TODO: add rank logic

const ReviewSideBar = ({ singleKombuchaData, reviews }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const setSnackbar = useSetSnackbar();
  const router = useRouter();

  const { data: session } = useSession();
  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    if (!session) {
      setSnackbar("Please login to use this feature", "error");
      return;
    }
    if (!session?.user.username) {
      router.push("/username");
      return;
    }
    setOpenDrawer(!openDrawer);
  };

  //check if logged in user has already reviewed this kombucha
  const findUserSessionReview = useMemo(() => {
    if (session && reviews) {
      return reviews.find(
        ({ review_author }) => review_author.data === session.user.id
      );
    }
  }, [session, reviews]);

  return (
    <>
      <Card variant="outlined">
        <CardContent sx={{ p: 2.5 }}>
          <Grid container spacing={1} mb={2}>
            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ py: 1, textAlign: "center" }}>
                <Box>
                  <RateReviewIcon sx={{ color: "secondary.main" }} />
                </Box>
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight="600"
                >
                  {reviews?.length || 0}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  fontWeight="500"
                >
                  Total Reviews
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ py: 1, textAlign: "center" }}>
                <Box>
                  <StarsIcon sx={{ color: "#FAAF00" }} />
                </Box>
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight="600"
                >
                  #
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  fontWeight="500"
                >
                  Rank
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          {findUserSessionReview ? (
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
                Your Rating: {findUserSessionReview.rating}
              </Typography>
              <Typography
                variant="caption"
                color="text.primary"
                component="div"
                align="center"
              >
                {findUserSessionReview.createdAt.slice(
                  0,
                  findUserSessionReview.createdAt.lastIndexOf("T")
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
              }}
            >
              Rate Kombucha
            </Button>
          )}
        </CardContent>
      </Card>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
        <ReviewDrawer
          singleKombuchaData={singleKombuchaData}
          toggleDrawer={toggleDrawer}
        />
      </Drawer>
    </>
  );
};

export default ReviewSideBar;
