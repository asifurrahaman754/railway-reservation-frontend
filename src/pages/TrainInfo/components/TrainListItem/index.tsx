import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";
import { startTransition, useState } from "react";
import SelectCoachContainer from "./components/SelectCoachContainer";
import CoachDetails from "./components/SelectCoachContainer/SeatDetails";
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
  const primaryColor = useTheme().palette.primary.main;
  const [selectedCoachClass, setSelectedCoachClass] = useState<string>("");

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
                onClick={(name) =>
                  startTransition(() => setSelectedCoachClass(name))
                }
                selectedCoachClass={selectedCoachClass}
              />
            </Grid>
          ))}
        </Grid>

        {selectedCoachClass && (
          <>
            <Typography variant="h6" color={primaryColor}>
              Choose your seat(s) **Maximum 4 seats can be booked at a time.
            </Typography>
            <Divider />
            <Typography variant="body1" marginTop=".5rem">
              To know seat number(s), rest the cursor on your desired seat(s).
              Click on it to select or deselect.
            </Typography>
            <SelectCoachContainer
              coaches={coaches?.data || []}
              selectedCoachClass={selectedCoachClass}
              onClose={() => setSelectedCoachClass("")}
            />
          </>
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
