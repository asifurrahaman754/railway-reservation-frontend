import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system/";
import SelectCoach from "./SelectCoach";
import { Coach } from "types/coach";

export interface SelectCoachContainerProps {
  children: React.ReactNode;
  coaches: Coach[];
  activeCoachClass: string;
}

export default function SelectCoachContainer({
  children,
  activeCoachClass,
  coaches,
}: SelectCoachContainerProps) {
  const primaryColor = useTheme().palette.primary.main;

  return (
    <>
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
          <SelectCoach coaches={coaches} activeCoachClass={activeCoachClass} />
        </Grid>
        <Grid item md={6} xs={12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
