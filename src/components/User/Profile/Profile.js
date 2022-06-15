import { Grid, Paper, CircularProgress } from "@mui/material";
import UserInfo from "./UserInfo";
import UserWishList from "./UserWishList";
import UserReviewTable from "./UserReviewTable";

const Profile = ({ userData, userReviews, name }) => {
  const { wish_list } = userData;

  return (
    <>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ mb: 2.5 }}>
            <UserInfo userData={userData} userReviews={userReviews} />
          </Paper>
          <Paper sx={{ display: { xs: "block", md: "none" } }}>
            <UserWishList wishList={wish_list} name={name} />
          </Paper>
          {userReviews ? (
            <UserReviewTable userReviews={userReviews} />
          ) : (
            <CircularProgress color="primary" />
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Paper>
            <UserWishList wishList={wish_list} name={name} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
