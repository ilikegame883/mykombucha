import { createContext, useReducer } from "react";
import { Alert, Snackbar } from "@mui/material";
import alertReducer from "../reducer/alert.reducer";
import setToggleSnackBar from "../../utils/setToggleSnackBar";

//Context for snackbar and toast alert
const initialState = {
  alert: false,
  alertSnackBar: false,
  status: undefined,
  alertMessage: "",
};

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);
  const { status, alertMessage, alertSnackBar } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setToggleSnackBar("close"));
  };
  return (
    <AlertContext.Provider value={{ state, dispatch }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertSnackBar}
        autoHideDuration={alertSnackBar ? 3000 : null}
        onClose={handleClose}
      >
        {status && (
          <Alert
            onClose={handleClose}
            severity={status}
            variant="filled"
            elevation={5}
            sx={{ width: "100%", color: "common.white", fontWeight: "600" }}
          >
            {alertMessage}
          </Alert>
        )}
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
};
