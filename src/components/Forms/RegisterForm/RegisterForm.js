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
import { postData } from "../../../utils/fetchData";
import { Container } from "@mui/material";
import { AlertContext } from "../../../stores/context/alert.context";
import GoogleIcon from "@mui/icons-material/Google";
import setToggleSnackBar from "../../../utils/setToggleSnackBar";

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

const RegisterForm = () => {
  const { dispatch } = useContext(AlertContext);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    cf_password: "",
  };

  const onSubmit = async (values) => {
    const res = await postData("auth/register", values);
    if (res?.msg) {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: `${window.location.origin}`,
      });
      dispatch(setToggleSnackBar("fetch-success", res.msg));

      if (res?.err) dispatch(setToggleSnackBar("fetch-error", res.err));
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
                fontWeight: 500,
                borderColor: "#CACACA",
                textTransform: "none",
              }}
            >
              Sign up with Google
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
                  underline="none"
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
