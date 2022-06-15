import Head from "next/head";
import useSWR from "swr";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { getData } from "../../../src/utils/fetchData";
import Layout from "../../../src/components/Layout";
import Profile from "../../../src/components/User/Profile";

const fetcher = (url) => fetch(url).then((res) => res.json());

const UserProfile = ({ userData }) => {
  const router = useRouter();
  const { name } = router.query;

  //to show a live update of user review list when a review is deleted,
  //load user reviews from client side with useSWR,
  const { data: userReviews } = useSWR(`/api/users/${name}/reviews`, fetcher, {
    revalidateOnFocus: false,
  });

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <Layout>
        <Container maxWidth="xl" sx={{ py: 5 }}>
          <Profile userData={userData} userReviews={userReviews} name={name} />
        </Container>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const [userData] = await getData("users", ctx.params.name);

  //fetch reviews by userName
  // const userReviews = await getData("user", `${ctx.params.name}/reviews`);

  //protect account settings and delete review button from server side
  const session = await getSession(ctx);
  return {
    props: {
      userData,
      session,
      // userReviews,
    },
  };
}

export default UserProfile;
