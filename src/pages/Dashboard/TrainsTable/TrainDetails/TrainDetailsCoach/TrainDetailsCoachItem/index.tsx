import { Box, Card, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/system/";
import DeleteIcon from "icons/DeleteIcon";
import { useState } from "react";
import { Coach } from "types/coach";

interface TrainDetailsCoachItemProps {
  coach: Coach;
  onDelete: (id: string) => void;
}

export default function TrainDetailsCoachItem({
  coach,
  onDelete,
}: TrainDetailsCoachItemProps) {
  const [showDelete, setShowDelete] = useState(false);
  const primaryColor = useTheme().palette.primary.main;

  return (
    <Card
      sx={{
        width: "125px",
        borderRadius: "8px",
        height: "150px",
        p: 1,
        border: `2px solid ${primaryColor}`,
        position: "relative",
      }}
      elevation={0}
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          color={"#000"}
          fontWeight="bold"
          variant="h6"
          fontSize="20px"
        >
          {coach.name}
        </Typography>

        {!showDelete ? (
          <Typography
            color={"#000"}
            fontWeight="bold"
            variant="h6"
            fontSize="10px"
          >
            #{coach.id}
          </Typography>
        ) : (
          <IconButton
            sx={{
              position: "absolute",
              top: "5px",
              right: "0",
            }}
            onClick={() => onDelete(coach.id)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
      <Typography variant="body1" fontWeight="bold" fontSize="15px">
        Capacity: {coach.capacity}
      </Typography>
      <Typography variant="body1" fontWeight="bold" fontSize="15px">
        Class: {coach.class}
      </Typography>
    </Card>
  );
}
