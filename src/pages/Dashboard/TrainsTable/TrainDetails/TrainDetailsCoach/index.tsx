import { Box } from "@mui/material";
import TrainDetailsCard from "components/TrainDetailsCard";
import { useState } from "react";
import dialogContent from "../utils/dialogContent";
import TrainDetailsCoachItem from "./TrainDetailsCoachItem";

export default function TrainDetailsCoach() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <TrainDetailsCard dialogContent={dialogContent.coach} title="Coach">
      <Box sx={{ p: 3, display: "flex", gap: "1rem", overflowX: "auto" }}>
        <TrainDetailsCoachItem />
        <TrainDetailsCoachItem />
        <TrainDetailsCoachItem />
      </Box>
    </TrainDetailsCard>
  );
}
