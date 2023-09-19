import Box from "@mui/material/Box";
import Navbar from "components/Navbar";
import { Outlet } from "react-router-dom";

export default function HomeLayout({ children }: any) {
  return (
    <Box sx={{ bgcolor: "#F7F7F7", minHeight: "100vh" }}>
      <Navbar />
      <Outlet />
    </Box>
  );
}
