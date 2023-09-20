import TrainIcon from "@mui/icons-material/Train";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system/";
import { RouteSchedule } from "types/routeSchedule";
import { convertTimeTo12, timeDifference } from "utils/time";

export interface TrainListItemHeaderProps {
  schedule: RouteSchedule;
}

export default function TrainListItemHeader({
  schedule,
}: TrainListItemHeaderProps) {
  const primaryColor = useTheme().palette.primary.main;

  return (
    <Grid container alignItems="center" paddingY="1rem">
      <Grid item sm={true} xs={12}>
        <Grid
          container
          spacing={{ xs: 1, sm: 2 }}
          alignItems="center"
          paddingY="10px"
        >
          <Grid item xs={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize={{ xs: ".8rem", sm: ".9rem" }}
              textAlign={{ xs: "left", sm: "right" }}
            >
              {convertTimeTo12(schedule.departure_time)}
            </Typography>
            <Typography variant="body1" textAlign={{ xs: "left", sm: "right" }}>
              {schedule?.from_route}
            </Typography>
          </Grid>
          <Grid fontSize=".9rem" item xs={6} textAlign="center">
            <Divider>
              {timeDifference(schedule?.departure_time, schedule?.arrival_time)}
            </Divider>
          </Grid>
          <Grid item xs={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize={{ xs: ".8rem", sm: ".9rem" }}
              textAlign={{ xs: "right", sm: "left" }}
            >
              {convertTimeTo12(schedule.arrival_time)}
            </Typography>
            <Typography variant="body1" textAlign={{ xs: "right", sm: "left" }}>
              {schedule?.to_route}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={2} xs={12} display="flex" justifyContent="center">
        <Button sx={{ display: "flex", flexDirection: "column" }}>
          <TrainIcon sx={{ color: primaryColor }} />
          <Typography
            variant="body1"
            fontWeight={500}
            align="center"
            color={primaryColor}
            fontSize={".8rem"}
          >
            Train Details
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
