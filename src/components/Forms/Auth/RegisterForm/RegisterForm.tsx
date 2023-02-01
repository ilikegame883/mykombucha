import React, { useContext } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Divider,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { postData } from "../../../../utils/fetch-utils";
import { useSetSnackbar } from "../../../../utils/hooks/useSnackbar";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  cf_password: string;
}

const validationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, "Username must be longer than 3 characters")
    .max(15, "Please enter a valid username")
    .required("Please specify your username")
    .matches(
      /^[a-zA-Z0-9._]+$/,
      "Username cannot contain white space and/or special character"
    ),
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
  cf_password: yup
    .string()
    .trim()
    .required("Please specify your password")
    .min(7, "The password should have at minimum length of 7"),
});

//TODO: set up facebook signup
const RegisterForm = () => {
  const setSnackbar = useSetSnackbar();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    cf_password: "",
  };

  const onSubmit = async (values: RegisterFormValues) => {
    const res = await postData("users", values);
    if (res?.msg) {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
      setSnackbar(res.msg, "success");

      if (res?.err) setSnackbar(res.err, "error");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container maxWidth="xs" sx={{ px: { xs: 3 } }}>
      <Box mb={2}>
        <Typography variant="h4" fontWeight="700">
          Create Account
        </Typography>
        <Typography color="text.primary" variant="subtitle1">
          Sign up to access all features!
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1.5}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              startIcon={
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/static/images/google_icon.svg" alt="google" />
              }
              onClick={() => signIn("google", { callbackUrl: "/username" })}
              sx={{
                color: "text.primary",
                fontWeight: 500,
                borderColor: "#CACACA",
              }}
            >
              Sign up with Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled
              size="large"
              variant="outlined"
              fullWidth
              startIcon={
                <FacebookIcon
                  sx={{ color: "info.main", width: 25, height: 25 }}
                />
              }
              onClick={() => signIn("facebook", { callbackUrl: "/username" })}
              sx={{
                color: "text.primary",
                fontWeight: 500,
                borderColor: "#CACACA",
              }}
            >
              Sign up with Facebook
            </Button>
          </Grid>
          <Grid item xs={12} mt={1} mb={1}>
            <Divider>
              <Typography color="text.primary" variant="body1" fontWeight={500}>
                or
              </Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              label="Username *"
              variant="outlined"
              name="username"
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              label="Email *"
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
            <TextField
              size="small"
              label="Password *"
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
          <Grid item xs={12}>
            <TextField
              size="small"
              label="Confirm Password *"
              variant="outlined"
              name="cf_password"
              type="password"
              fullWidth
              value={formik.values.cf_password}
              onChange={formik.handleChange}
              error={
                formik.touched.cf_password && Boolean(formik.errors.cf_password)
              }
              helperText={
                formik.touched.cf_password && formik.errors.cf_password
              }
            />
          </Grid>
          <Grid item xs={12} my={1}>
            <Divider />
          </Grid>
          <Grid item container xs={12}>
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              fullWidth
            >
              Create Account
            </Button>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="subtitle1">
              Already have an account?{" "}
              <Link href="/signin" passHref>
                <Typography
                  component="a"
                  variant="subtitle1"
                  color="secondary"
                  fontWeight="700"
                >
                  Login
                </Typography>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterForm;
