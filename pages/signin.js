import { getSession } from "next-auth/react";
import { Box } from "@mui/material";
import Layout from "../src/components/Layout";
import { SigninForm } from "../src/components/auth";

const Signin = () => {
  return (
    <Box>
      <Layout title="Login">
        <Box
          display="flex"
          alignItems="center"
          sx={{ minHeight: "calc(100vh - 345px)" }}
        >
          <SigninForm />
        </Box>
      </Layout>
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
