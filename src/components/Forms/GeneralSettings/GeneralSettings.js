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
import { patchData } from "../../../utils/fetchData";
import { AlertContext } from "../../../stores/context/alert.context";
import { toggleAlert } from "../../../stores/actions";
import AlertSnackBar from "../../AlertSnackBar";

const validationSchema = yup.object({
  city: yup.string().trim().max(20, "Please enter a valid city"),
  country: yup.string().trim().max(20, "Please enter a valid country"),
});

const GeneralSettings = ({ userData }) => {
  const { dispatch } = useContext(AlertContext);

  const router = useRouter();

  const { email, username, city, country, bio } = userData;

  //prefill current user info
  const initialValues = {
    username,
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
      return;
    }
    const res = await patchData(`users/${username}`, values);

    if (res?.msg) {
      dispatch(toggleAlert("success", res.msg));
      //refresh page to show updated value
      router.replace(`${router.asPath}`);
    }
    if (res?.err) {
      dispatch(toggleAlert("error", res.err));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <div>
      <Typography variant="h6" gutterBottom fontWeight="600">
        Edit Profile
      </Typography>
      <Box pb={4}>
        <Divider />
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" fontWeight="600" mb={1}>
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
            <Typography variant="subtitle2" fontWeight="600" mb={1}>
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
            <Typography variant="subtitle2" fontWeight="600" mb={1}>
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
            <Typography variant="subtitle2" fontWeight="600" mb={1}>
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
            <Typography variant="subtitle2" fontWeight="600" mb={1}>
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

export default GeneralSettings;
