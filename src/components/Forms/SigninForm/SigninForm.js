import React, { useContext } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AlertContext } from "../../../stores/context/alert.context";
import { toggleAlert } from "../../../stores/actions";
import ToastAlert from "../../ToastAlert";
import { Container, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required."),
  password: yup
    .string()
    .trim()
    .required("Please specify your password")
    .min(7, "The password should have at minimum length of 7"),
});

const SigninForm = () => {
  const { dispatch } = useContext(AlertContext);
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    //if redirect false, signIn returns an object with
    // error: string | undefined // Error code based on the type of error
    // status: number // HTTP status code
    // ok: boolean // `true` if the signin was successful
    // url: string | null // `null` if there was an error, otherwise URL to redirected to

    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });
    if (res?.error) dispatch(toggleAlert("error", res.error));
    if (res.url) router.push(res.url);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Container maxWidth="xs" sx={{ px: { xs: 3 } }}>
      <Box mb={3}>
        <Typography variant="h4" color="text.primary" fontWeight="700">
          Sign in
        </Typography>
        <Typography color="text.primary" variant="subtitle1">
          Sign in to your myKombucha account
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              startIcon={<GoogleIcon sx={{ color: "info.main" }} />}
              onClick={() => signIn("google", { callbackUrl: "/" })}
              sx={{
                height: 50,
                color: "text.primary",
                borderColor: "#CACACA",
                textTransform: "none",
              }}
            >
              Sign in with Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography color="text.secondary" variant="body1">
                or
              </Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="E-mail *"
              name="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password *"
              name="password"
              type="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12} my={1}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              fullWidth
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={12}>
            <ToastAlert />
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretched", sm: "center" }}
              justifyContent="space-between"
              width={1}
            >
              <Box mb={{ xs: 2, sm: 0 }}>
                <Typography variant="subtitle1">
                  {`Don't have an account yet?`}{" "}
                  <Link href="/register" passHref>
                    <Typography
                      component="a"
                      variant="subtitle1"
                      color="secondary"
                      fontWeight="700"
                    >
                      Sign up
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SigninForm;
