import React, { useContext } from "react";
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
import ToastAlert from "../../../components/ToastAlert";

const validationSchema = yup.object({
  currentPassword: yup.string().required("Please specify your password"),
  newPassword: yup
    .string()
    .required("Please specify your new password")
    .min(7, "The password should have at minimum length of 7"),
  repeatPassword: yup
    .string()
    .required("Please specify your repeat new password")
    .min(7, "The password should have at minimum length of 7"),
});

const Security = ({ provider }) => {
  const disablePassword = provider === "google";

  const { dispatch } = useContext(AlertContext);
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  };

  const onSubmit = async (values, resetForm) => {
    if (values.newPassword !== values.repeatPassword) {
      dispatch(
        toggleAlert("error", "New password does not match repeat password")
      );
      return;
    }

    const url = `auth/password`;
    const res = await patchData(url, values);
    if (res?.msg) {
      dispatch(toggleAlert("success", res.msg));
      resetForm.resetForm();
      return;
    }
    if (res?.err) {
      dispatch(toggleAlert("error", res.err));
      resetForm.resetForm();
      return;
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <>
      <Box>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent={"space-between"}
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Typography variant="h6" fontWeight="700" gutterBottom>
            Change your password
          </Typography>
        </Box>
        <Box pb={4}>
          <Divider />
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight="600" mb={1}>
                Current password
              </Typography>
              <TextField
                disabled={disablePassword}
                variant="outlined"
                name={"currentPassword"}
                type={"password"}
                fullWidth
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight="600" mb={1}>
                New password
              </Typography>
              <TextField
                disabled={disablePassword}
                variant="outlined"
                name={"newPassword"}
                type={"password"}
                fullWidth
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight="600" mb={1}>
                Repeat new password
              </Typography>
              <TextField
                disabled={disablePassword}
                variant="outlined"
                name={"repeatPassword"}
                type={"password"}
                fullWidth
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.repeatPassword &&
                  Boolean(formik.errors.repeatPassword)
                }
                helperText={
                  formik.touched.repeatPassword && formik.errors.repeatPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item container xs={12}>
              {!disablePassword ? (
                <Box>
                  <ToastAlert />
                  <Button
                    size="large"
                    variant="contained"
                    type="submit"
                    color="secondary"
                  >
                    Submit
                  </Button>
                </Box>
              ) : (
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  color="error"
                  mb={1}
                >
                  {`Signed in with ${provider}.`}
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Security;
