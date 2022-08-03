import { getSession } from "next-auth/react";
import { Box } from "@mui/material";
import { RegisterForm } from "../src/components/Forms";
import { MainLayout } from "../src/components/Layout";

const Register = () => {
  return (
    <Box>
      <MainLayout title="Register">
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

export default Register;
