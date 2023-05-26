import Box from "@mui/material/Box";
import Navbar from "components/Navbar";

export default function UserLayout({ children }: any) {
  return (
    <Box sx={{ bgcolor: "#F7F7F7", minHeight: "100vh" }}>
      <Navbar />
      {children}
    </Box>
  );
}
