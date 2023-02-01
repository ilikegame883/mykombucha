import { createContext, useState, memo, SetStateAction } from "react";

interface SnackbarValueContextProps {
  message: string;
  type: string;
}

interface SnackbarSetProviderProps {
  children: React.ReactNode;
  setSnackbar: React.Dispatch<SetStateAction<SnackbarValueContextProps>>;
}

export const SnackbarValueContext = createContext(
  {} as SnackbarValueContextProps
);
export const SnackbarSetContext = createContext(null);

//https://www.developerway.com/posts/react-elements-children-parents
// eslint-disable-next-line react/display-name
const SnackbarSetProviderMemo = memo(
  ({ setSnackbar, children }: SnackbarSetProviderProps) => {
    const handleSnackbarSet = (message: string, type: string = "default") => {
      setSnackbar({
        message,
        type,
      });
    };

    return (
      <SnackbarSetContext.Provider value={handleSnackbarSet}>
        {children}
      </SnackbarSetContext.Provider>
    );
  }
);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: null,
  });

  return (
    <SnackbarValueContext.Provider value={snackbar}>
      <SnackbarSetProviderMemo setSnackbar={setSnackbar}>
        {children}
      </SnackbarSetProviderMemo>
    </SnackbarValueContext.Provider>
  );
};
