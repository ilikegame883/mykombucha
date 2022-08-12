import Head from "next/head";
import { unstable_getServerSession } from "next-auth/next";
import { Container } from "@mui/material";
import { getData } from "../../../src/utils/fetchData";
import Profile from "../../../src/components/User/Profile";
import { MainLayout } from "../../../src/components/Layout";
import { authOptions } from "../../api/auth/[...nextauth]";

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

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const [userData] = await getData("users", context.params.name);
  return {
    props: {
      userData,
      session,
    },
  };
}

export default UserProfile;
