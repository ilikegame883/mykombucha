import React, { useContext } from "react";
import { Alert, Collapse } from "@mui/material";
import { AlertContext } from "../stores/context/alert.context";
import { toggleAlert } from "../stores/actions";

const ToastAlert = () => {
  const { state, dispatch } = useContext(AlertContext);
  const { alert, status, alertMessage } = state;

  const handleCloseAlert = () => {
    dispatch(toggleAlert("", ""));
  };

  return (
    <>
      <Collapse in={alert}>
        <Alert severity={status} onClose={handleCloseAlert} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      </Collapse>
    </>
  );
};

export default ToastAlert;
