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
  },
});

//these are the custom colors
interface CustomColors {
  AuthbodyBg: SimplePaletteColorOptions;
  defaultBg: SimplePaletteColorOptions;
  defaultColor: SimplePaletteColorOptions;
  errorColor: SimplePaletteColorOptions;
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
