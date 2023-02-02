/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import {
  Container,
  Box,
  Card,
  Button,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import { getData, patchData } from "../src/utils/fetch-utils";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { updateSession } from "../src/utils/api-utils";
import { useSetSnackbar } from "../src/utils/hooks/useSnackbar";

interface UsernameProps {
  session: Session;
}

//username page after user sign up with google/facebook provider

const Username = ({ session }: UsernameProps) => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const setSnackbar = useSetSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmitUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await patchData(`users/${session?.user.id}`, { username });
    if (res?.msg) {
      // await getData("auth/session?update"); //update session
      // const event = new Event("visibilitychange");
      // document.dispatchEvent(event);
      await updateSession();
      router.replace("/");
    }
    if (res?.err) return setSnackbar(res.err, "error");
  };

  return (
    <Box
      minHeight="calc(100vh - 210px)"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      bgcolor="alternate.main"
    >
      <Container maxWidth="xs">
        <Card sx={{ p: { xs: 2 }, bgcolor: "#FAFAFA" }} elevation={0}>
          <Box mb={2} textAlign="center">
            <Typography
              sx={{
                textTransform: "uppercase",
              }}
              gutterBottom
              color="primary"
              fontWeight="700"
            >
              myKombucha
            </Typography>
            <Typography
              variant="h4"
              mb={1}
              sx={{
                fontWeight: 700,
              }}
            >
              Create Username
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create a username to complete your registration
            </Typography>
          </Box>
          <form onSubmit={handleSubmitUsername}>
            <Stack spacing={1.5} mb={3}>
              <TextField
                label="Username"
                required
                variant="outlined"
                name="username"
                size="small"
                fullWidth
                value={username}
                onChange={handleChange}
                inputProps={{ minLength: 4, maxLength: 15 }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions(context.req)
  );
  if (!session || session.user?.username) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: { session: session } };
};

export default Username;
