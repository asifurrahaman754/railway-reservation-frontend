import Box from "@mui/material/Box";
import ArrowBackIcon from "icons/ArrowBackIcon";
import { useNavigate } from "react-router-dom";

interface PageBackProps {
  navigateTo?: string;
}

export default function PageBack({ navigateTo }: PageBackProps) {
  const navigate = useNavigate();
  const navigateToPath = navigateTo || -1;
  return (
    <Box
      sx={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        position: "fixed",
        top: "20px",
        left: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      }}
      onClick={() => navigate(navigateToPath as unknown as string)}
    >
      <ArrowBackIcon />
    </Box>
  );
}
