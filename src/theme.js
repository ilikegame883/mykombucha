import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: "#FFEBCE",
      main: "#FFBD59",
      dark: "#B39565",
      contrastText: "#fff",
    },
    secondary: {
      light: "#00ECD4",
      main: "#b36c00",
      dark: "#2F4858",
    },
    text: {
      primary: "#1e2022",
      secondary: "#677788",
    },
    error: {
      main: "#E15F70",
    },
    success: {
      main: "#2BBF6D",
    },
    info: {
      main: "#2C97DE",
    },
  },
  typography: {
    fontFamily: `"Nunito", "Source Serif Pro", "Roboto", sans-serif`,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#b36c00",
            boxShadow: "none",
          },
        },

        text: {
          "&:hover": {
            backgroundColor: "transparent",
            color: "#b36c00",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "transparent",
            color: "#FFBD59",
          },
        },
      },
    },
  },
});

export default theme;
