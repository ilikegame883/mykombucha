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
import AlertSnackBar from "../../AlertSnackBar";
import { Container } from "@mui/material";

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
    // e.preventDefault();
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
    <Container maxWidth="xs">
      <Box mb={3}>
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            src="/static/favicons/android-chrome-192x192.png"
            width={40}
            height={40}
          />
          <Typography variant="h4" color="text.primary" fontWeight="700" ml={1}>
            Login
          </Typography>
        </Box>
        <Typography color="text.secondary" variant="subtitle1">
          Login to your myKombucha account
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              color="text.primary"
              mb={1}
              fontWeight="600"
            >
              Enter your email
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              name="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              fontWeight="600"
              color="text.primary"
              mb={1}
            >
              Enter your password
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              name="password"
              type="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item container xs={12}>
            <AlertSnackBar />
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretched", sm: "center" }}
              justifyContent="space-between"
              width={1}
            >
              <Box marginBottom={{ xs: 2, sm: 0 }}>
                <Typography variant="subtitle1">
                  {`Don't have an account yet?`}{" "}
                  <Link href="/register" passHref>
                    <Typography
                      component="a"
                      variant="subtitle1"
                      color="primary.dark"
                      underline="none"
                      fontWeight="700"
                    >
                      Sign up
                    </Typography>
                  </Link>
                </Typography>
              </Box>
              <Button variant="contained" type="submit" color="secondary">
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SigninForm;
