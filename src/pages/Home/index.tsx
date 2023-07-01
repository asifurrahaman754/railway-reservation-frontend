import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system/";
import Loader from "components/Loader";
import UserLayout from "layouts/UserLayout";
import { Suspense, lazy } from "react";

const HomeTicketSearchForm = lazy(
  () => import("./components/HomeTicketSearchForm")
);

export default function Home() {
  const primaryColor = useTheme().palette.primary.main;

  return (
    <UserLayout>
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
        <Suspense fallback={<Loader />}>
          <HomeTicketSearchForm />
        </Suspense>
      </Box>
    </UserLayout>
  );
}
