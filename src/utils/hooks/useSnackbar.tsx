import { useContext } from "react";
import {
  SnackbarSetContext,
  SnackbarValueContext,
} from "../../stores/context/Snackbar.context";

const useSetSnackbar = () => useContext(SnackbarSetContext);

const useGetSnackbar = () => useContext(SnackbarValueContext);

const useSnackbar = () => {
  const setSnackbar = useContext(SnackbarSetContext);
  const snackbar = useContext(SnackbarValueContext);

  return {
    setSnackbar,
    snackbar,
  };
};

export { useSetSnackbar, useGetSnackbar, useSnackbar };
