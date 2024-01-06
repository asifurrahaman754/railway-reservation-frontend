import { Alert } from "@mui/material";

interface AlertCardProps {
  children: React.ReactNode;
  type?: "info" | "error" | "warning" | "success";
}

export default function AlertCard({ children, type = "info" }: AlertCardProps) {
  return (
    <Alert
      severity={type}
      sx={{
        fontSize: ".85rem",
        borderRadius: "10px",
      }}
    >
      {children}
    </Alert>
  );
}
