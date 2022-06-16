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

const validationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(2, "Username must be longer than 2 characters")
    .max(20, "Please enter a valid username")
    .required("Please specify your username"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required."),
  firstname: yup
    .string()
    .trim()
    .min(2, "Please enter a valid name")
    .max(25, "Please enter a valid name")
    .required("Please specify your first name"),
  lastname: yup
    .string()
    .trim()
    .min(2, "Please enter a valid name")
    .max(25, "Please enter a valid name")
    .required("Please specify your last name"),
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
    firstname: "",
    lastname: "",
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
    <Box py={5}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="700">
          Create an Account
        </Typography>
        <Typography color="text.secondary" variant="subtitle1">
          Register to access all myKombucha features!
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <Typography variant="body1" mb={1.5} fontWeight="600">
              First Name
            </Typography>
            <TextField
              size="small"
              label="First Name *"
              variant="outlined"
              name="firstname"
              fullWidth
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
              helperText={formik.touched.firstname && formik.errors.firstname}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant="body1" mb={1.5} fontWeight="700">
              Last Name
            </Typography>
            <TextField
              size="small"
              label="Last Name *"
              variant="outlined"
              name="lastname"
              fullWidth
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" mb={1.5} fontWeight="600">
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
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" mb={1.5} fontWeight="600">
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
            <Typography variant="body1" mb={1.5} fontWeight="600">
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
            <Typography variant="body1" mb={1.5} fontWeight="600">
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
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretched", sm: "center" }}
              justifyContent="space-between"
              width={1}
              maxWidth={600}
              margin="0 auto"
            >
              <Box marginBottom={{ xs: 2, sm: 0 }}>
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
              </Box>
              <Button
                size="large"
                variant="contained"
                type="submit"
                color="secondary"
              >
                Create Account
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegisterForm;
