import { Box, Card, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/system/";
import DeleteIcon from "icons/DeleteIcon";
import { useState } from "react";

export default function TrainDetailsCoachItem() {
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
          KA
        </Typography>

        {!showDelete ? (
          <Typography
            color={"#000"}
            fontWeight="bold"
            variant="h6"
            fontSize="10px"
          >
            #sdfkdkd
          </Typography>
        ) : (
          <IconButton
            sx={{
              position: "absolute",
              top: "5px",
              right: "0",
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
      <Typography
        color={"primary"}
        variant="h5"
        fontWeight="bold"
        fontSize="15px"
        marginBottom={"1rem"}
      >
        906 tk
      </Typography>

      <Typography variant="body1" fontWeight="bold" fontSize="15px">
        Capacity: 40
      </Typography>
      <Typography variant="body1" fontWeight="bold" fontSize="15px">
        Class: S
      </Typography>
    </Card>
  );
}
