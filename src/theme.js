import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: "#fff5e5",
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
      main: red.A400,
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
