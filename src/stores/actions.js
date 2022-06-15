export const ACTIONS = {
  TOGGLE_ALERT: "TOGGLE_ALERT",
  TOGGLE_TOAST: "TOGGLE_TOAST",
};

export const toggleAlert = (status, msg) => {
  return { type: "TOGGLE_ALERT", statusPayload: status, messagePayload: msg };
};

export const toggleToast = (status, msg, isOpen) => {
  return {
    type: "TOGGLE_TOAST",
    alertToastPayload: isOpen,
    statusPayload: status,
    messagePayload: msg,
  };
};
