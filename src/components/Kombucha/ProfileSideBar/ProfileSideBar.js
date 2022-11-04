import React, { useState, useContext } from "react";
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
import { useSession } from "next-auth/react";
import ReviewDrawer from "./ReviewDrawer";
import { AlertContext } from "../../../stores/context/alert.context";
import setToggleSnackBar from "../../../utils/setToggleSnackBar";

//Right side column for kombucha stats (reviews, rank, etc)
const StatItem = ({ kombuchaReviews }) => {
  return (
    <>
      <Grid item xs={6}>
        <Paper variant="outlined" sx={{ py: 1, textAlign: "center" }}>
          <Box>
            <RateReviewIcon sx={{ color: "secondary.main" }} />
          </Box>
          <Typography variant="body1" color="text.primary" fontWeight="600">
            {kombuchaReviews.length}
          </Typography>
          <Typography variant="body2" color="text.primary" fontWeight="500">
            Total Reviews
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper variant="outlined" sx={{ py: 1, textAlign: "center" }}>
          <Box>
            <StarsIcon sx={{ color: "#FAAF00" }} />
          </Box>
          <Typography variant="body1" color="text.primary" fontWeight="600">
            #
          </Typography>
          <Typography variant="body2" color="text.primary" fontWeight="500">
            Rank
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

const ProfileSideBar = ({ kombuchaReviews, singleKombuchaData }) => {
  const { dispatch } = useContext(AlertContext);

  const [openDrawer, setOpenDrawer] = useState(false);

  const { data: session } = useSession();

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (!session) {
      dispatch(setToggleSnackBar("login"));
    } else {
      setOpenDrawer(!openDrawer);
    }
  };

  const findUserSessionReview =
    session && kombuchaReviews.find(({ user }) => user === session.user._id);

  return (
    <>
      <Card variant="outlined">
        <CardContent sx={{ p: 2.5 }}>
          <Grid container spacing={1} mb={2}>
            <StatItem kombuchaReviews={kombuchaReviews} />
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

export default ProfileSideBar;
