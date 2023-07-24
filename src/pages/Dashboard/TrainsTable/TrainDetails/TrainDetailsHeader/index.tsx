import { Box, Card, Grid, Typography } from "@mui/material";
import DoNotDisturbIcon from "icons/DoNotDisturbIcon";
import DollarIcon from "icons/DollarIcon";

export default function TrainDetailsHeader() {
  return (
    <Card variant="outlined" sx={{ p: 3, mt: 5, mb: 3 }}>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { sm: "2rem", xs: "1.2rem" },
            }}
          >
            Sonar Bangla Express
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { sm: "1.2rem", xs: "1rem" },
            }}
          >
            Express train
          </Typography>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            textAlign="right"
            sx={{ display: "flex", justifyContent: "end", mb: 0.5 }}
          >
            <DollarIcon color="primary" />
            <Typography variant="body1" marginLeft={0.3}>
              Fare per km: <strong>1.5</strong> Tk
            </Typography>
          </Box>
          <Box
            textAlign="right"
            sx={{ display: "flex", justifyContent: "end" }}
          >
            <DoNotDisturbIcon color="primary" />
            <Typography variant="body1" marginLeft={0.3}>
              Holiday: <strong>Friday</strong>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
