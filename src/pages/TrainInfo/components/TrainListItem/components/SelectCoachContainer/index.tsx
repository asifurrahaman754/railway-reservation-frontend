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
  baseFare: number;
  trainName: string;
  departureTime: string;
}

export default function SelectCoachContainer({
  selectedCoachClass,
  coaches,
  onClose,
  baseFare,
  trainName,
  departureTime,
}: SelectCoachContainerProps) {
  const selectedCoaches = useMemo(
    () => coaches?.filter((coach) => coach.class === selectedCoachClass),
    [selectedCoachClass, coaches]
  );

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<Coach>(selectedCoaches[0]);

  useEffect(() => {
    setSelectedSeats([]);
    setSelectedCoach(selectedCoaches[0]);
  }, [selectedCoachClass]);

  const handleChange = useCallback((value: Coach) => {
    setSelectedCoach(value);
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
            selectedCoach={selectedCoach}
            onChange={handleChange}
          />
          <CoachSeats
            onSelectSeat={handleSelectSeat}
            selectedSeats={selectedSeats}
            selectedCoach={selectedCoach}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <SeatDetails
            onClose={onClose}
            seats={selectedSeats}
            baseFare={baseFare}
            selectedCoach={selectedCoach}
            trainName={trainName}
            departureTime={departureTime}
          />
        </Grid>
      </Grid>
    </>
  );
}
