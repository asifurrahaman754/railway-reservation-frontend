import Grid from "@mui/material/Grid";
import TrainListItemCard from "./TrainListItemCard";
import { TrainListItemCardContainerStyle } from "./style";

export default function TrainListItemCards() {
  return (
    <Grid container spacing={2} sx={TrainListItemCardContainerStyle}>
      <Grid item>
        <TrainListItemCard isActive={true} />
      </Grid>
      <Grid item>
        <TrainListItemCard isActive={false} />
      </Grid>
      <Grid item>
        <TrainListItemCard isActive={false} />
      </Grid>
    </Grid>
  );
}
