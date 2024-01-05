import Grid from "@mui/material/Grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Coach } from "types/coach";
import { Seat } from "types/seat";
import CoachSeats from "./CoachSeats";
import SeatDetails from "./SeatDetails";
import SelectCoach from "./SelectCoach";

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
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedCoachId, setSelectedCoachId] = useState<string>("");
  const selectedCoaches = useMemo(
    () => coaches?.filter((coach) => coach.class === selectedCoachClass),
    [selectedCoachClass]
  );

  useEffect(() => {
    setSelectedCoachId(selectedCoaches[0]?.id as unknown as string);
  }, [selectedCoachClass]);

  const handleChange = useCallback((value: string) => {
    setSelectedCoachId(value);
  }, []);

  const handleSelectSeat = useCallback(
    (seat: Seat) => {
      const seatIsSelected = selectedSeats.find((s) => s.id === seat.id);
      if (seatIsSelected) {
        setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
        return;
      }

      if (selectedSeats.length === 4) {
        alert("Maximum 4 seats can be selected!");
        return;
      }

      setSelectedSeats((prev) => [...prev, seat]);
    },
    [selectedSeats]
  );

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
            selectedCoachId={selectedCoachId}
            coaches={coaches}
            onSelectSeat={handleSelectSeat}
            selectedSeats={selectedSeats}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <SeatDetails onClose={onClose} />
        </Grid>
      </Grid>
    </>
  );
}
