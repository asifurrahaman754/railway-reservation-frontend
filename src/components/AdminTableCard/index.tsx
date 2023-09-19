import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AuthBg from "Layouts/AuthBg";
import DashboardGoBack from "components/DashboardGoBack";

export default function AdminTableCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        width: "100%",
        paddingX: "1rem",
        overflowX: "auto",
      }}
    >
      <DashboardGoBack />
      <Paper sx={{ width: "100%", mb: 2 }}>{children}</Paper>
    </Box>
  );
}
