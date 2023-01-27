import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import theme from "theme";

type Props = {
  children: React.ReactChild | React.ReactNode;
};
export default function ThemeProvider({ children }: Props) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
