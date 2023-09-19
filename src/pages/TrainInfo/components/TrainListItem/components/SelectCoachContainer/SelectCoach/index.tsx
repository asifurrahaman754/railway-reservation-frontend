import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CoachSeatsContainer from "../CoachSeatsContainer";

const ticketColorBoxStyle = {
  width: "1rem",
  height: "1rem",
  border: "1px solid #000",
  borderRadius: "4px",
  marginRight: ".5rem",
};

export default function SelectCoach() {
  return (
    <>
      <Typography variant="h6">Select Coach</Typography>
      <TextField
        fullWidth
        name="seat"
        variant="outlined"
        defaultValue="ka"
        select
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      >
        <MenuItem value="ka">KA - 13 Seat</MenuItem>
        <MenuItem value="KHA">KHA - 23 Seat</MenuItem>
        <MenuItem value="GA">GA - 44 Seat</MenuItem>
        <MenuItem value="GHA">GHA - 39 Seat</MenuItem>
        <MenuItem value="DA">DA - 0 Seat</MenuItem>
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
