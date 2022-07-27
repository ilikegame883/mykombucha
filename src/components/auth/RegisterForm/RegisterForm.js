import { signIn } from "next-auth/react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { postData } from "../../../utils/fetchData";
import { Container } from "@mui/material";

const validationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, "Username must be longer than 3 characters")
    .max(12, "Please enter a valid username")
    .required("Please specify your username")
    .matches(
      /^[a-zA-Z0-9@]+$/,
      "This field cannot contain white space and special character"
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
  const initialValues = {
    username: "",
    email: "",
    password: "",
    cf_password: "",
  };

  const onSubmit = async (values) => {
    try {
      await postData("auth/register", values);
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: `${window.location.origin}`,
      });
    } catch (err) {
      console.log("loc: catch register handleSubmit" + err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Container maxWidth="xs">
      <Box mb={3}>
        <Typography variant="h4" fontWeight="700">
          Create an Account
        </Typography>
        <Typography color="text.secondary" variant="subtitle1">
          Sign up to access all of myKombucha features!
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" mb={1} fontWeight="600">
              Enter a username
            </Typography>
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
            <Typography variant="body1" mb={1} fontWeight="600">
              Enter your email
            </Typography>
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
            <Typography variant="body1" mb={1} fontWeight="600">
              Enter password
            </Typography>
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
            <Typography variant="body1" mb={1} fontWeight="600">
              Confirm password
            </Typography>
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
                  color="primary.dark"
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
