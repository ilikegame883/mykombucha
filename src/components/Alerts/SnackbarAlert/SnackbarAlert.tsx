import { Alert, Snackbar, AlertColor } from "@mui/material";
import { useSnackbar } from "../../../utils/hooks/useSnackbar";

const SnackbarAlert = () => {
  const { snackbar, setSnackbar } = useSnackbar();

  const handleClose = (e: React.SyntheticEvent, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar("", "");
  };

  const { message, type } = snackbar;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!message}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      {!!message ? (
        <Alert
          severity={type as AlertColor}
          variant="filled"
          elevation={5}
          sx={{ width: "100%", color: "common.white", fontWeight: "600" }}
        >
          {message ? <span> {message}</span> : null}
        </Alert>
      ) : null}
    </Snackbar>
  );
};

export default SnackbarAlert;
