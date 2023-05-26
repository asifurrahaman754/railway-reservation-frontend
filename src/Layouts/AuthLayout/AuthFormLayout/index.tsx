import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { IMG_PATH } from "config/img_path";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactChild | React.ReactNode;
};

export default function AuthFormLayout({ children }: Props) {
  const location = useLocation();
  const currentPage = location.pathname.split("/")[2];
  const isLoginPage = currentPage === "login" ? true : false;

  return (
    <Paper
      sx={{
        //bigger width for register form
        maxWidth: isLoginPage ? "500px" : "600px",
        padding: {
          xs: "2rem 1rem",
          sm: "2rem 3rem",
        },
        margin: {
          xs: "2rem 1rem",
          sm: "0",
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: 60,
            sm: 100,
          },
          margin: "auto",
        }}
      >
        <img width="100%" src={`${IMG_PATH}/logo.png`} alt="logo" />
      </Box>

      {children}
    </Paper>
  );
}
