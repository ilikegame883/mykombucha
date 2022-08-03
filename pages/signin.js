import { getSession, getProviders } from "next-auth/react";
import { Box } from "@mui/material";
import { SigninForm } from "../src/components/Forms";
import { MainLayout } from "../src/components/Layout";

const Signin = ({ providers }) => {
  return (
    <Box>
      <MainLayout title="Login">
        <Box
          py={5}
          display="flex"
          alignItems="center"
          sx={{ minHeight: "calc(100vh - 345px)" }}
        >
          <SigninForm providers={providers} />
        </Box>
      </MainLayout>
    </Box>
  );
};

export async function getServerSideProps({ req }) {
  const providers = await getProviders();
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: { providers, session } };
}
export default Signin;
