import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SelectCoach from "./SelectCoach";
import { Coach } from "types/coach";
import CoachSeats from "./CoachSeats";
import { useEffect, useMemo, useState } from "react";
import CoachDetails from "./CoachDetails";

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
  const selectedCoach = useMemo(
    () => coaches?.find((coach) => coach.class === selectedCoachClass),
    [selectedCoachClass]
  );

  useEffect(() => {
    setSelectedCoachId(selectedCoach?.id as unknown as string);
  }, [selectedCoachClass]);

  const handleChange = (value: string) => {
    setSelectedCoachId(value);
  };

  return (
    <>
      <Grid container spacing={2} marginTop=".8rem">
        <Grid item md={6} xs={12}>
          <SelectCoach
            coaches={coaches}
            selectedCoachId={selectedCoachId}
            onChange={handleChange}
          />
          <CoachSeats selectedCoachId={selectedCoachId} />
        </Grid>
        <Grid item md={6} xs={12}>
          <CoachDetails onClose={onClose} />
        </Grid>
      </Grid>
    </>
  );
}
