import React, { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  TextField,
  Button,
  FormHelperText,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { postData } from "../../../utils/fetch-utils";
import { useSetSnackbar } from "../../../utils/hooks/useSnackbar";

const CHECKBOX = {
  kombucha: [
    "Kombucha Name",
    "Brewery",
    "Flavor",
    "ABV",
    "Description",
    "Other",
  ],
  brewery: [
    "Brewery Name",
    "Brewery Type",
    "Location",
    "Styles Offered",
    "Description",
    "Other",
  ],
};
interface CorrectionValues {
  checked: string[];
  correction: string;
  email: string;
  name: string;
  type: string;
}
const CorrectionForm = ({ name, type }) => {
  const [error, setError] = useState(false);
  const setSnackbar = useSetSnackbar();

  const CHECKBOX_LIST = CHECKBOX[type]; //type = "kombucha"/"brewery"

  const initialValues = {
    checked: [],
    correction: "",
    email: "",
    name,
    type,
  };

  const onSubmit = async (
    values: CorrectionValues,
    resetForm: FormikHelpers<CorrectionValues>
  ) => {
    if (values.checked.length === 0) {
      setError(true);
      return;
    }
    const res = await postData("mail", values);
    if (res?.msg) {
      resetForm.resetForm();
      setSnackbar(res.msg, "success");
    }
    if (res?.err) setSnackbar(res.err, "error");
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mb={4}>
        <Typography variant="body1" color="text.primary" fontWeight="700">
          Select Correction:
        </Typography>
        <FormControl component="fieldset" variant="standard" fullWidth>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                {CHECKBOX_LIST.slice(0, 3).map((item: string) => (
                  <Box key={item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => [
                            formik.handleChange(e),
                            setError(false),
                          ]}
                          name="checked"
                          value={item}
                          //checked prop required to uncheck all boxes after submittal
                          //formik resetForm() resets to initial values but does not uncheck boxes
                          //another option is to use Formik MUI (https://stackworx.github.io/formik-mui/docs/api/mui/)
                          checked={formik.values.checked.includes(item)}
                        />
                      }
                      label={item === "Name" ? `Kombucha ${item}` : item}
                    />
                  </Box>
                ))}
              </FormGroup>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormGroup>
                {CHECKBOX_LIST.slice(3).map((item: string) => (
                  <Box key={item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => [
                            formik.handleChange(e),
                            setError(false),
                          ]}
                          name="checked"
                          value={item}
                          checked={formik.values.checked.includes(item)}
                        />
                      }
                      label={item}
                    />
                  </Box>
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </FormControl>
        {error && (
          <FormHelperText error>Please select a correction</FormHelperText>
        )}
      </Box>
      <Box mb={4}>
        <Typography
          variant="body1"
          color="text.primary"
          fontWeight="700"
          gutterBottom
        >
          Please describe your correction:
        </Typography>
        <TextField
          variant="outlined"
          value={formik.values.correction}
          onChange={formik.handleChange}
          name="correction"
          multiline
          rows={5}
          fullWidth
          required
        />
      </Box>
      <Box mb={4}>
        <Typography
          variant="body1"
          color="text.primary"
          fontWeight="700"
          gutterBottom
        >
          Your e-mail if we need to reach you:
        </Typography>

        <TextField
          required
          size="small"
          variant="outlined"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          InputProps={{
            sx: { pl: 1.25 },
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </form>
  );
};

export default CorrectionForm;
