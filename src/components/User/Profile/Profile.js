import useSWR from "swr";
import { useRouter } from "next/router";
import { Grid, Paper, CircularProgress } from "@mui/material";
import UserInfo from "./UserInfo";
import UserWishList from "./UserWishList";
import UserReviewTable from "./UserReviewTable";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Profile = ({ userData }) => {
  const { wish_list } = userData;

  const router = useRouter();
  const { name } = router.query;

  //to show a live update of user review list when a review is deleted,
  //load user reviews from client side with useSWR,
  const { data: userReviews } = useSWR(`/api/users/${name}/reviews`, fetcher, {
    revalidateOnFocus: false,
  });

  return (
    <Grid container columnSpacing={1.5}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper sx={{ mb: 1.5 }} variant="outlined">
          <UserInfo userData={userData} userReviews={userReviews} name={name} />
        </Paper>
        <Paper sx={{ display: { xs: "block", md: "none" } }}>
          <UserWishList wishList={wish_list} />
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
          <UserWishList wishList={wish_list} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
