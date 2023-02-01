import Head from "next/head";
import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import { Container } from "@mui/material";
import Profile from "../../../src/components/Profile";
import { MainLayout } from "../../../src/components/Layout";
import { authOptions } from "../../api/auth/[...nextauth]";

const ProfilePage = ({ id }: { id: string }) => {
  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <MainLayout title="profile page">
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Profile userId={id} />
        </Container>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //get session in server side gives immediate access to user session data for all components rendered on this page
  //including all the MainLayout in _app.tsx

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions(context.req)
  );
  // const userData = await getData("users", session.user.id);
  //get userId from query not from session
  //user profile page to be shown to all users
  const { id } = context.query;
  return {
    props: {
      session,
      id,
    },
  };
};

export default ProfilePage;
