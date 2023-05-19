import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system/";
import CoachDetails from "./CoachDetails";
import SelectCoach from "./SelectCoach";

export default function SelectCoachContainer() {
  const primaryColor = useTheme().palette.primary.main;

  return (
    <Box>
      <Typography variant="h6" color={primaryColor}>
        Choose your seat(s) **Maximum 4 seats can be booked at a time.
      </Typography>
      <Divider />
      <Typography variant="body1" marginTop=".5rem">
        To know seat number(s), rest the cursor on your desired seat(s). Click
        on it to select or deselect.
      </Typography>
      <Grid container spacing={2} marginTop=".8rem">
        <Grid item md={6} xs={12}>
          <SelectCoach />
        </Grid>
        <Grid item md={6} xs={12}>
          <CoachDetails />
        </Grid>
      </Grid>
    </Box>
  );
}
