import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: "#ffc369",
      main: "#FFBE58",
      dark: "#FFBD59",
      contrastText: "#fff",
    },
    secondary: {
      light: "#cea15e",
      main: "#ba7a19 ",
      dark: "#7b6038",
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
    fontFamily: `"Nunito", "Source Serif Pro", sans-serif`,
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
