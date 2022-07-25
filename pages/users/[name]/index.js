import Head from "next/head";
import { Container } from "@mui/material";
import { getData } from "../../../src/utils/fetchData";
import Profile from "../../../src/components/User/Profile";
import { MainLayout } from "../../../src/components/Layout";

const UserProfile = ({ userData }) => {
  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Profile userData={userData} />
        </Container>
      </MainLayout>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const [userData] = await getData("users", ctx.params.name);
  return {
    props: {
      userData,
    },
  };
}

export default UserProfile;
