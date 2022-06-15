import { getSession } from "next-auth/react";
import { Container, Box } from "@mui/material";
import Layout from "../src/components/Layout";
import { RegisterForm } from "../src/components/auth";

const Register = () => {
  return (
    <Box>
      <Layout justify="center" title="Register">
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

export default Register;
