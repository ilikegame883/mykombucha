import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  Container,
  Divider,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useSetSnackbar } from "../../../../utils/hooks/useSnackbar";

interface SigninFormValues {
  email: string;
  password: string;
}

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

//TODO: set up facebook login
const SigninForm = () => {
  const setSnackbar = useSetSnackbar();
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: SigninFormValues) => {
    //if redirect = false, signIn returns an object with:
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
    if (res?.error) setSnackbar(res.error, "error");
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
              size="large"
              fullWidth
              startIcon={
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/static/images/google_icon.svg" alt="google" />
              }
              onClick={() => signIn("google", { callbackUrl: "/" })}
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
              <Typography color="text.secondary" variant="body1">
                or
              </Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
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
              size="small"
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
                  <Link href="/signup" passHref>
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
