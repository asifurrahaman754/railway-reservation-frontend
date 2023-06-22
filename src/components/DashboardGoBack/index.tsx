import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import routes from "routes/index";

export default function DashboardGoBack() {
  return (
    <Link to={routes.admin.dashboard}>
      <Tooltip title="Back to dashboard">
        <IconButton
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#f3f3f3",
            marginBottom: "1rem",
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Tooltip>
    </Link>
  );
}
