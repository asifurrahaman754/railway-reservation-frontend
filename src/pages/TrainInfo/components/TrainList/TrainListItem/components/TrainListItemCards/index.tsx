import Grid from "@mui/material/Grid";
import TrainListItemCardItem from "./TrainListItemCardItem";

export default function TrainListItemCards() {
  return (
    <Grid padding="1rem 0 2rem 0" container spacing={2}>
      <Grid item>
        <TrainListItemCardItem isActive={true} />
      </Grid>
      <Grid item>
        <TrainListItemCardItem isActive={false} />
      </Grid>
      <Grid item>
        <TrainListItemCardItem isActive={false} />
      </Grid>
    </Grid>
  );
}
