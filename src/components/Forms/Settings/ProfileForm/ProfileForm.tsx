import { mutate } from "swr";
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
import { countries } from "country-data-list";
import { patchData } from "../../../../utils/fetch-utils";
import { useSetSnackbar } from "../../../../utils/hooks/useSnackbar";

interface ProfileFormProps {
  userData: any;
}

interface ProfileFormValues {
  city: string;
  country: string;
  bio: string;
}
const validationSchema = yup.object({
  //TODO: update validation for city (no special char)
  city: yup.string().trim().max(20, "Please enter a valid city"),
});

const ProfileForm = ({ userData }: ProfileFormProps) => {
  const setSnackbar = useSetSnackbar();

  const { email, username, _id } = userData;
  const { city, country, bio } = userData?.profile;

  const initialValues: ProfileFormValues = {
    city: city || "",
    country: country || "",
    bio: bio || "",
  };

  //check if profile input fields has been changed
  function inputNotChanged(values: ProfileFormValues) {
    let inputNotChanged: boolean;
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

  const onSubmit = async (values: ProfileFormValues) => {
    const res = await patchData(`users/${_id}`, values);

    if (res?.msg) {
      mutate(`/api/users/${_id}`);
      setSnackbar(res.msg, "success");
    }
    if (res?.err) {
      setSnackbar(res.err, "error");
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
              value={username}
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
              value={email}
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
              // @ts-ignore
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
              // @ts-ignore
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
              <Button
                size="large"
                variant="contained"
                type="submit"
                color="secondary"
                disabled={inputNotChanged(formik.values)}
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

export default ProfileForm;
