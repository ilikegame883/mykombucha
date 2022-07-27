import React, { useContext } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertContext } from "../stores/context/alert.context";
import { toggleToast } from "../stores/actions";
// import MuiAlert from "@mui/material/Alert";

const AlertToast = () => {
  const { state, dispatch } = useContext(AlertContext);
  const { status, alertMessage, alertToast } = state;
  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });
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
        sx={{ width: "100%" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default AlertToast;
