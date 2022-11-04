import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import {
  Box,
  Divider,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import * as yup from "yup";
import { patchData } from "../../../utils/fetchData";
import { AlertContext } from "../../../stores/context/alert.context";
import { toggleAlert } from "../../../stores/alert.actions";
import ToastAlert from "../../ToastAlert";
import { countries } from "country-data-list";

const validationSchema = yup.object({
  city: yup.string().trim().max(20, "Please enter a valid city"),
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

  function inputNotChanged(values) {
    //check if profile input fields has not been changed
    let inputNotChanged;
    for (const prop in values) {
      if (values[prop] === initialValues[prop]) {
        inputNotChanged = true;
      } else {
        inputNotChanged = false;
        break;
      }
    }
    return inputNotChanged;
  }

  const onSubmit = async (values) => {
    if (inputNotChanged(values)) {
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
      <Box pb={3}>
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
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
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
              select
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
              SelectProps={{
                MenuProps: {
                  sx: { maxHeight: 200 },
                  PaperProps: { sx: { width: 200 } },
                },
              }}
            >
              {countries.all.map(({ name }) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
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
              <ToastAlert />
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
