import TrainIcon from "@mui/icons-material/Train";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system/";

export default function TrainListItemHeader() {
  const primaryColor = useTheme().palette.primary.main;

  return (
    <Grid container alignItems="center" paddingY="1rem">
      <Grid item xs={true}>
        <Grid container spacing={2} alignItems="center" paddingY="10px">
          <Grid item xs={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize=".9rem"
              align="right"
            >
              20 May, 07:00 am
            </Typography>
            <Typography variant="body1" align="right">
              Dhaka
            </Typography>
          </Grid>
          <Grid fontSize=".9rem" item xs={6} textAlign="center">
            <Divider light={true}>05h 15m</Divider>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize=".9rem"
              align="left"
            >
              20 May, 12:15 pm
            </Typography>
            <Typography variant="body1" align="left">
              Chattogram
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2} display="flex" justifyContent="center">
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
