import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import SelectCoachContainer from "./components/SelectCoachContainer";
import CoachDetails from "./components/SelectCoachContainer/CoachDetails";
import TrainListItemCards from "./components/TrainListItemCardItem";
import TrainListItemHeader from "./components/TrainListItemHeader";
import { RouteSchedule } from "types/routeSchedule";
import { useGetSingleTrainQuery } from "store/features/train/trainApi";
import Loader from "components/Loader";
import { useGetSingleCoachClassFareQuery } from "store/features/coachClassFare/coachClassFareApi";
import TrainListItemCardItem from "./components/TrainListItemCardItem";
import { CoachClassFare } from "types/coachClassFare";
import { TrainListItemCardContainerStyle } from "./components/TrainListItemCardItem/style";
import { useGetCoachesByIdQuery } from "store/features/coach/coachApi";

export type expandedItemType = {
  id: string | number;
};

export interface TrainListItemProps {
  schedule: RouteSchedule;
}

export default function TrainListItem({ schedule }: TrainListItemProps) {
  const [activeCoachClass, setActiveCoachClass] = useState<string>("");
  const { data: trainData, isLoading: trainLoading } = useGetSingleTrainQuery(
    schedule.train_id
  );
  const { data: coachClassFareData, isLoading: coachClassFareLoading } =
    useGetSingleCoachClassFareQuery(schedule.train_id);
  const { data: coaches, isLoading: isCoachesLoading } = useGetCoachesByIdQuery(
    schedule.train_id
  );

  const train = trainData?.data || {};
  const isInitialized =
    !trainLoading && !coachClassFareLoading && !isCoachesLoading;
  const seatFare = schedule?.distance * train?.fare_per_km;

  const handleActiveCoachClassIdchange = (name: string) => {
    setActiveCoachClass(name);
  };

  let content;
  if (!isInitialized) {
    content = <Loader />;
  } else {
    content = (
      <>
        <Divider />
        <TrainListItemHeader schedule={schedule} />
        <Divider />

        <Grid container spacing={2} sx={TrainListItemCardContainerStyle}>
          {coachClassFareData?.data?.map((coachClassFare: CoachClassFare) => (
            <Grid item key={coachClassFare.id}>
              <TrainListItemCardItem
                fare={seatFare}
                coaches={coaches?.data || []}
                coachClassFare={coachClassFare}
                onClick={handleActiveCoachClassIdchange}
                activeCoachClass={activeCoachClass}
              />
            </Grid>
          ))}
        </Grid>

        {activeCoachClass && (
          <SelectCoachContainer
            coaches={coaches?.data || []}
            activeCoachClass={activeCoachClass}
          >
            <CoachDetails>
              <Button
                variant="text"
                sx={{ display: "flex", marginLeft: "auto" }}
                onClick={() => setActiveCoachClass("")}
              >
                Close
              </Button>
            </CoachDetails>
          </SelectCoachContainer>
        )}
      </>
    );
  }

  return (
    <>
      <Accordion
        sx={{
          borderRadius: "10px",
          boxShadow: "unset",
          "&.MuiAccordion-root::before": {
            height: "0px",
          },
          marginBottom: "1rem",
        }}
        defaultExpanded={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            textTransform="uppercase"
            fontWeight="bold"
            variant="h5"
            fontSize={{ xs: "1rem", sm: "1.2rem" }}
          >
            {train.name}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>{content}</AccordionDetails>
      </Accordion>
    </>
  );
}
