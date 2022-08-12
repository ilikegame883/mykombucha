import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
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

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
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
}
export default Signin;
