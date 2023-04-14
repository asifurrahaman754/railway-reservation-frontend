import { BrowserRouter } from "react-router-dom";
import Router from "routes/router";
import ThemeProvider from "theme/ThemeProvider";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}
