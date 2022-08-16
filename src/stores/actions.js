export const ACTIONS = {
  TOGGLE_ALERT: "TOGGLE_ALERT",
  TOGGLE_SNACKBAR: "TOGGLE_SNACKBAR",
};

export const toggleAlert = (status, msg) => {
  return { type: "TOGGLE_ALERT", statusPayload: status, messagePayload: msg };
};

export const toggleSnackBar = (status, msg, isOpen) => {
  return {
    type: "TOGGLE_SNACKBAR",
    alertSnackBarPayload: isOpen,
    statusPayload: status,
    messagePayload: msg,
  };
};
