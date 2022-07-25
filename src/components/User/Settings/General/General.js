import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { patchData } from "../../../../utils/fetchData";
import { AlertContext } from "../../../../stores/context/alert.context";
import { toggleAlert } from "../../../../stores/actions";
import AlertSnackBar from "../../../AlertSnackBar";

const validationSchema = yup.object({
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
  city: yup.string().trim().max(25, "Please enter a valid city"),
  country: yup.string().trim().max(25, "Please enter a valid country"),
});

const General = ({ userData }) => {
  const { dispatch } = useContext(AlertContext);

  const router = useRouter();

  const { firstname, lastname, email, username, city, country, bio } = userData;

  //prefill current user info
  const initialValues = {
    username,
    firstname,
    lastname,
    email,
    city,
    country,
    bio,
  };

  const onSubmit = async (values) => {
    //check for new input value
    let sameInputValue;

    for (const prop in values) {
      if (values[prop] === initialValues[prop]) {
        sameInputValue = true;
      } else {
        sameInputValue = false;
        break;
      }
    }

    if (sameInputValue) {
      dispatch(toggleAlert("error", "No fields have been changed"));
    } else {
      try {
        const url = `user/${username}`;
        await patchData(url, values);
        dispatch(toggleAlert("success", "Changes Saved!"));

        //refresh page to show updated value
        router.replace(`${router.asPath}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <div>
      <Typography variant="h6" gutterBottom fontWeight="700">
        Edit Profile
      </Typography>
      <Box pb={4}>
        <Divider />
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant={"subtitle2"}
              sx={{ marginBottom: 2 }}
              fontWeight="700"
            >
              Username
            </Typography>
            <TextField
              variant="outlined"
              name="username"
              fullWidth
              value={formik.values.username}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant={"subtitle2"}
              sx={{ marginBottom: 2 }}
              fontWeight="700"
            >
              E-mail
            </Typography>
            <TextField
              variant="outlined"
              name="email"
              fullWidth
              value={formik.values.email}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant={"subtitle2"}
              sx={{ marginBottom: 2 }}
              fontWeight="700"
            >
              First Name*
            </Typography>
            <TextField
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
          <Grid item xs={12} sm={6}>
            <Typography
              variant={"subtitle2"}
              sx={{ marginBottom: 2 }}
              fontWeight="700"
            >
              Last Name*
            </Typography>
            <TextField
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
            <Typography
              variant={"subtitle2"}
              sx={{ marginBottom: 2 }}
              fontWeight="700"
            >
              City
            </Typography>
            <TextField
              variant="outlined"
              name="city"
              fullWidth
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.city)}
              helperText={formik.touched.lastname && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant={"subtitle2"}
              sx={{ marginBottom: 2 }}
              fontWeight="700"
            >
              Country
            </Typography>
            <TextField
              variant="outlined"
              name="country"
              fullWidth
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.country)}
              helperText={formik.touched.lastname && formik.errors.country}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant={"subtitle2"}
              sx={{ marginBottom: 2 }}
              fontWeight="700"
            >
              Bio
            </Typography>
            <TextField
              variant="outlined"
              value={formik.values.bio}
              onChange={formik.handleChange}
              name={"bio"}
              multiline
              rows={5}
              fullWidth
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
          <Grid item container xs={12}>
            <Box>
              <AlertSnackBar />
              <Button
                size="large"
                variant="contained"
                type="submit"
                color="secondary"
              >
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default General;
