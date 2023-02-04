import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { Box } from "@mui/material";
import { RegisterForm } from "../src/components/Forms";
import { MainLayout } from "../src/components/Layout";

const Signup = () => {
  return (
    <Box>
      <MainLayout title="SignUp">
        <Box
          py={5}
          display="flex"
          alignItems="center"
          sx={{
            minHeight: "calc(100vh - 345px)",
          }}
        >
          <RegisterForm />
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
  return { props: {} };
};

export default Signup;
