import { getSession } from "next-auth/react";
import { Container, Box } from "@mui/material";
import { RegisterForm } from "../src/components/auth";
import { MainLayout } from "../src/components/Layout";

const Register = () => {
  return (
    <Box>
      <MainLayout justify="center" title="Register">
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "calc(100vh - 345px)",
          }}
        >
          <RegisterForm />
        </Container>
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
