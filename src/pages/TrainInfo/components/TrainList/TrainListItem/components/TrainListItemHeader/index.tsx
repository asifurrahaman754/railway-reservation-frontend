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
              20 May, 07:00 am
            </Typography>
            <Typography variant="body1" textAlign={{ xs: "left", sm: "right" }}>
              Dhaka
            </Typography>
          </Grid>
          <Grid fontSize=".9rem" item xs={6} textAlign="center">
            <Divider>05h 15m</Divider>
          </Grid>
          <Grid item xs={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize={{ xs: ".8rem", sm: ".9rem" }}
              textAlign={{ xs: "right", sm: "left" }}
            >
              20 May, 12:15 pm
            </Typography>
            <Typography variant="body1" textAlign={{ xs: "right", sm: "left" }}>
              Chattogram
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
