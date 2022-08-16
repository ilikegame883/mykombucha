import { ACTIONS } from "../actions";

const alertReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_ALERT:
      return {
        ...state,
        alert: !state.alert,
        status: action.statusPayload,
        alertMessage: action.messagePayload,
      };
    case ACTIONS.TOGGLE_SNACKBAR:
      return {
        ...state,
        alertSnackBar: action.alertSnackBarPayload,
        status: action.statusPayload,
        alertMessage: action.messagePayload,
      };

    default:
      return state;
  }
};

export default alertReducer;
