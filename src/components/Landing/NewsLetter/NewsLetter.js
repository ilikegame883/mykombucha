import React, { useState, useContext } from "react";
import {
  Button,
  Typography,
  TextField,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { putData } from "../../../utils/fetchData";
import { AlertContext } from "../../../stores/context/alert.context";
import setToggleSnackBar from "../../../utils/setToggleSnackBar";

const NewsLetter = () => {
  const [mail, setMail] = useState("");
  const { dispatch } = useContext(AlertContext);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const handleChange = (e) => {
    setMail(e.target.value);
  };

  const subscribeNewsletter = async (e) => {
    e.preventDefault();
    if (!mail) return;
    const res = await putData("newsletter", { mail });
    if (res?.msg) {
      dispatch(setToggleSnackBar("fetch-success", res.msg));
      setMail("");
    }
    if (res?.err) dispatch(setToggleSnackBar("fetch-error", res.err));
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Box mb={4} textAlign="left">
          <Typography
            variant="h6"
            color="secondary"
            fontWeight="700"
            gutterBottom
          >
            Newsletter
          </Typography>
          <Typography
            variant={isSm ? "h3" : "h4"}
            fontWeight="700"
            gutterBottom
          >
            Subscribe to our Newsletter
          </Typography>
          <Typography
            variant={isSm ? "h6" : "subtitle1"}
            color="text.secondary"
          >
            Be among the firsts to know about our upcoming news and updates.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={(e) => subscribeNewsletter(e)}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="flex-start"
            width={1}
          >
            <TextField
              fullWidth
              type="email"
              label="Enter your email"
              variant="outlined"
              color="primary"
              value={mail}
              onChange={(e) => handleChange(e)}
              sx={{ width: 1, maxWidth: 460, mb: { xs: 1.5, sm: 0 } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ px: 3, py: { xs: 1, sm: 0 }, ml: { sm: 1 } }}
            >
              Subscribe
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default NewsLetter;
