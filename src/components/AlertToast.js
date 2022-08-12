import React, { useContext } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertContext } from "../stores/context/alert.context";
import { toggleToast } from "../stores/actions";

const AlertToast = () => {
  const { state, dispatch } = useContext(AlertContext);
  const { status, alertMessage, alertToast } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(toggleToast("", "", false));
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alertToast}
      autoHideDuration={alertToast ? 3000 : null}
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

export default AlertToast;
