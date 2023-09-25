import Grid from "@mui/material/Grid";
import SelectCoach from "./SelectCoach";
import { Coach } from "types/coach";
import CoachSeats from "./CoachSeats";
import { useEffect, useMemo, useState } from "react";
import SeatDetails from "./SeatDetails";

export interface SelectCoachContainerProps {
  coaches: Coach[];
  selectedCoachClass: string;
  onClose: () => void;
}

export default function SelectCoachContainer({
  selectedCoachClass,
  coaches,
  onClose,
}: SelectCoachContainerProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedCoachId, setSelectedCoachId] = useState<string>("");
  const selectedCoaches = useMemo(
    () => coaches?.filter((coach) => coach.class === selectedCoachClass),
    [selectedCoachClass]
  );

  useEffect(() => {
    setSelectedCoachId(selectedCoaches[0]?.id as unknown as string);
  }, [selectedCoachClass]);

  const handleChange = (value: string) => {
    setSelectedCoachId(value);
  };

  return (
    <>
      <Grid container spacing={2} marginTop=".8rem">
        <Grid item md={6} xs={12}>
          <SelectCoach
            coaches={selectedCoaches}
            selectedCoachId={selectedCoachId}
            onChange={handleChange}
          />
          <CoachSeats
            selectedCoachId={selectedCoaches[0]?.id as string}
            selectedCoachName={selectedCoaches[0]?.name as string}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <SeatDetails onClose={onClose} />
        </Grid>
      </Grid>
    </>
  );
}
