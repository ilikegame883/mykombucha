import React, { useContext } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertContext } from "../stores/context/alert.context";
import { toggleSnackBar } from "../stores/actions";

const SnackBarAlert = () => {
  const { state, dispatch } = useContext(AlertContext);
  const { status, alertMessage, alertSnackBar } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(toggleSnackBar("", "", false));
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alertSnackBar}
      autoHideDuration={alertSnackBar ? 3000 : null}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={status}
        variant="filled"
        elevation={5}
        sx={{ width: "100%", color: "common.white", fontWeight: "600" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarAlert;
