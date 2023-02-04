import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";

import { Box } from "@mui/material";
import { SigninForm } from "../src/components/Forms";
import { MainLayout } from "../src/components/Layout";

const Signin = () => {
  return (
    <Box>
      <MainLayout title="Login">
        <Box
          py={5}
          display="flex"
          alignItems="center"
          sx={{ minHeight: "calc(100vh - 345px)" }}
        >
          <SigninForm />
        </Box>
      </MainLayout>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions(context.req)
  );
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: { session: session } };
};

export default Signin;
