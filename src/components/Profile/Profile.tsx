import useSWR from "swr";
import { Grid, Paper, CircularProgress } from "@mui/material";
import UserDetails from "./UserDetails";
import UserStats from "./UserStats";
import UserWishList from "./UserWishList";
import UserReviewTable from "./UserReviewTable";

const Profile = ({ userId }) => {
  const { data: userData, error } = useSWR(`/api/users/${userId}`);

  if (!userData || error) return <CircularProgress color="primary" />;
  return (
    <Grid container columnSpacing={1.5}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper sx={{ mb: 1.5 }} variant="outlined">
          <UserDetails userData={userData} />
          <UserStats userData={userData} />
        </Paper>
        <Paper
          sx={{ display: { xs: "block", md: "none" }, mb: 2 }}
          variant="outlined"
        >
          <UserWishList userId={userId} />
        </Paper>
        <UserReviewTable userData={userData} />
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        lg={3}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <Paper variant="outlined">
          <UserWishList userId={userId} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
