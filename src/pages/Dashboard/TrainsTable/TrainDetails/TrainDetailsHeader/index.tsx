import { Box, Card, Grid, Typography } from "@mui/material";
import Loader from "components/Loader";
import MessageCard from "components/MessageCard";
import weekMap from "data/week";
import DoNotDisturbIcon from "icons/DoNotDisturbIcon";
import DollarIcon from "icons/DollarIcon";
import { useParams } from "react-router-dom";
import { useGetSingleTrainQuery } from "store/features/train/trainApi";

export default function TrainDetailsHeader() {
  const { trainId } = useParams();
  const { data, isLoading, error } = useGetSingleTrainQuery(trainId);
  const { name, type, holiday, fare_per_km } = data?.data || {};

  let content = null;
  if (error?.data) {
    content = <MessageCard>{error?.data?.message}</MessageCard>;
  } else if (isLoading) {
    content = <Loader />;
  } else if (data?.data) {
    content = (
      <Grid container>
        <Grid item md={6} xs={12}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { sm: "2rem", xs: "1.2rem" },
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { sm: "1.2rem", xs: "1rem" },
            }}
          >
            {type} train
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
              Fare per km: <strong>{fare_per_km}</strong> Tk
            </Typography>
          </Box>
          <Box
            textAlign="right"
            sx={{ display: "flex", justifyContent: "end" }}
          >
            <DoNotDisturbIcon color="primary" />
            <Typography variant="body1" marginLeft={0.3}>
              Holiday: <strong>{weekMap[holiday]}</strong>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Card variant="outlined" sx={{ p: 3, mt: 5, mb: 3 }}>
      {content}
    </Card>
  );
}
