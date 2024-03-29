import { createTheme } from "@mui/material/styles";
import { SimplePaletteColorOptions } from "@mui/material/styles/createPalette";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', 'sans-serif'",
    fontSize: 12,
    light: 400,
    medium: 500,
    bold: 700,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#006747",
      contrastText: "#fff",
    },
    secondary: {
      main: "#da924e",
    },
    AuthbodyBg: {
      main: "#cfd9d68f",
    },
    defaultBg: {
      main: "#fff",
    },
    defaultColor: {
      main: "#000",
    },
    errorColor: {
      main: "#ff0000",
    },
    grey100: {
      main: "#fafafa",
      contrastText: "#cecece",
    },
    grey200: {
      main: "#cecece",
      contrastText: "#fafafa",
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
        },
      },
    },
  },
});

//these are the custom colors
export interface CustomColors {
  AuthbodyBg: SimplePaletteColorOptions;
  defaultBg: SimplePaletteColorOptions;
  defaultColor: SimplePaletteColorOptions;
  errorColor: SimplePaletteColorOptions;
  primary: SimplePaletteColorOptions;
  grey100: SimplePaletteColorOptions;
  grey200: SimplePaletteColorOptions;
}

interface customFontWeight {
  light: number;
  medium: number;
  bold: number;
}

//for custom palette color
declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions extends CustomColors {}
}
declare module "@mui/material/styles/createPalette" {
  interface Palette extends CustomColors {}
}

//for custom typography
declare module "@mui/material/styles/createTypography" {
  interface FontStyle extends customFontWeight {}
}

export default theme;
