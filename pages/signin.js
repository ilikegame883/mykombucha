import { getSession } from "next-auth/react";
import { Box } from "@mui/material";
import { SigninForm } from "../src/components/auth";
import { MainLayout } from "../src/components/Layout";

const Signin = () => {
  return (
    <Box>
      <MainLayout title="Login">
        <Box
          py={10}
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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
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
