import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system/";
import HomeTicketSearchForm from "./components/HomeTicketSearchForm";

export default function Home() {
  const primaryColor = useTheme().palette.primary.main;

  return (
    <Box>
      <Typography
        sx={{
          textTransform: "uppercase",
          padding: "2rem 0",
          fontWeight: 500,
          color: primaryColor,
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
          textAlign: "center",
        }}
      >
        Search for your ticket
      </Typography>
      <HomeTicketSearchForm />
    </Box>
  );
}
