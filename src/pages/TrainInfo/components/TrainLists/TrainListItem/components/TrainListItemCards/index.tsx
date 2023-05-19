import Grid from "@mui/material/Grid";
import { expandedItemType } from "../..";
import TrainListItemCard from "./TrainListItemCard";
import { TrainListItemCardContainerStyle } from "./style";

export type TrainListItemCardsProps = {
  setExpandedItem: React.Dispatch<
    React.SetStateAction<expandedItemType | null>
  >;
  expandedItem: null | expandedItemType;
};

export default function TrainListItemCards({
  setExpandedItem,
  expandedItem,
}: TrainListItemCardsProps) {
  return (
    <Grid container spacing={2} sx={TrainListItemCardContainerStyle}>
      <Grid item>
        <TrainListItemCard
          isActive={true}
          setExpandedItem={setExpandedItem}
          expandedItem={expandedItem}
          id={1}
        />
      </Grid>
      <Grid item>
        <TrainListItemCard
          isActive={true}
          setExpandedItem={setExpandedItem}
          expandedItem={expandedItem}
          id={2}
        />
      </Grid>
      <Grid item>
        <TrainListItemCard
          isActive={false}
          setExpandedItem={setExpandedItem}
          expandedItem={expandedItem}
          id={3}
        />
      </Grid>
    </Grid>
  );
}
