import { createContext, useReducer } from "react";
import alertReducer from "../reducer/alert.reducer";

const initialState = {
  alert: false,
  alertToast: false,
  status: "",
  alertMessage: "",
};

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);
  return (
    <AlertContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
};
