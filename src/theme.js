import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: "#ffd79c",
      main: "#FFBE58",
      dark: "#FFBE58",
      contrastText: "#fff",
    },
    secondary: {
      light: "#cea15e",
      main: "#ba7a19 ",
      dark: "#ba7a19",
    },
    text: {
      primary: "#0d172a",
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
    fontFamily: `"Quicksand", "Source Serif Pro", sans-serif`,
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "0.75em",
          fontWeight: "500",
          height: 22,
          borderRadius: 6,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "none",
          fontSize: "1em",
          "&:hover": {
            boxShadow: "none",
          },
        },
        outlined: {
          "&:hover": {
            backgroundColor: "transparent",
            borderColor: "black",
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
