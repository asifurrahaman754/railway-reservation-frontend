import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { memo } from "react";

const seatStyle = {
  width: "2.5rem",
  height: "2.5rem",
  border: "1px solid #000",
  borderRadius: "12px",
  display: "grid",
  placeItems: "center",
};

const CoachSeatsContainer = () => {

  const seats = 44 / 2;
  const seatsInArray = Array.from({ length: seats }, (_, i) => i + 1);

  return (
    <Card variant="outlined" sx={{ padding: "1rem" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        maxWidth="300px"
        marginX="auto"
      >
        <Box>
          {seatsInArray.map((seat, index) => (
            <Grid container spacing={1} marginBottom="1rem">
              <Grid item xs={6} key={seat}>
                <Box sx={seatStyle}>{index + 1}</Box>
              </Grid>

              <Grid item xs={6} key={seat}>
                <Box sx={seatStyle}>{index + 2}</Box>
              </Grid>
            </Grid>
          ))}
        </Box>
        <Box>
          {seatsInArray.map((seat, index) => (
            <Grid container spacing={1} marginBottom="1rem">
              <Grid item xs={6} key={seat}>
                <Box sx={seatStyle}>{index + 1}</Box>
              </Grid>

              <Grid item xs={6} key={seat}>
                <Box sx={seatStyle}>{index + 2}</Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
    </Card>
  );
};

export default memo(CoachSeatsContainer);
