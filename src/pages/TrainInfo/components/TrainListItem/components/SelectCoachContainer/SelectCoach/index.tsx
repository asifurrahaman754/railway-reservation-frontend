import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CoachSeatsContainer from "../CoachSeatsContainer";
import { Coach } from "types/coach";
import { useState, useEffect } from "react";

const ticketColorBoxStyle = {
  width: "1rem",
  height: "1rem",
  border: "1px solid #000",
  borderRadius: "4px",
  marginRight: ".5rem",
};

export interface SelectCoachProps {
  coaches: Coach[];
  activeCoachClass: string;
}

export default function SelectCoach({
  coaches,
  activeCoachClass,
}: SelectCoachProps) {
  const [selectedCoach, setSelectedCoach] = useState<string>("");
  const coachWithSelectedClass = coaches?.find(
    (coach) => coach.class === activeCoachClass
  );

  useEffect(() => {
    setSelectedCoach(coachWithSelectedClass?.id as unknown as string);
  }, [activeCoachClass]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCoach(event.target.value);
  };

  return (
    <>
      <Typography variant="h6">Select Coach</Typography>
      <TextField
        fullWidth
        name="seat"
        variant="outlined"
        defaultValue={coachWithSelectedClass?.id}
        select
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        value={selectedCoach}
        onChange={handleChange}
      >
        {coaches?.map((coach) => (
          <MenuItem key={coach.id} value={coach.id}>
            {coach.name} - {coach.available_seats} Seat
          </MenuItem>
        ))}
      </TextField>

      <Grid container marginY="1.5rem">
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Box sx={ticketColorBoxStyle}></Box>
            <Typography variant="body1">Available</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Box sx={ticketColorBoxStyle} bgcolor="#E28A2B"></Box>
            <Typography variant="body1">Booked</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Box sx={ticketColorBoxStyle} bgcolor="#384C6B"></Box>
            <Typography variant="body1">Selected</Typography>
          </Box>
        </Grid>
      </Grid>

      <CoachSeatsContainer />
    </>
  );
}
