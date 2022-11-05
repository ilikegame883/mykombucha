import { toggleSnackBar } from "../stores/alert.actions";

//helper function for toggling snackbar based on alert type
//toggleSnackBar return value is used in alert reducer dispatch
const setToggleSnackBar = (alertType, res) => {
  //res = fetch res.msg or res.err || custom message
  switch (alertType) {
    case "login":
      return toggleSnackBar(
        "error",
        " Please login/register to access this feature",
        true
      );
    case "fetch-success":
      return toggleSnackBar("success", res, true);
    case "fetch-error":
      return toggleSnackBar("error", res, true);
    case "upload-error":
      return toggleSnackBar("error", res, true);
    case "close":
      return toggleSnackBar(undefined, "", false);
    default:
      break;
  }
};

export default setToggleSnackBar;
