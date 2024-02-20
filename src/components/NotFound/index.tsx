import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "routes/index";

export default function NotFound() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(routes.home, {
      replace: true,
    });
  };

  return (
    <>
      <Typography variant="h1" textAlign="center" mt={3} mb={2}>
        Oops!
      </Typography>
      <Typography
        variant="h6"
        textTransform="uppercase"
        textAlign="center"
        mb={2}
      >
        404 - page not found
      </Typography>
      <Button
        sx={{
          backgroundColor: "primary.main",
          color: "defaultBg.main",
          padding: "10px 15px",
          display: "block",
          margin: "auto",
          borderRadius: "50px",

          "&:hover": {
            backgroundColor: "primary.main",
            color: "defaultBg.main",
          },
        }}
        onClick={navigateToHome}
      >
        go to home page
      </Button>
    </>
  );
}
