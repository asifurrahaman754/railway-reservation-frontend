import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Loader from "components/Loader";
import { memo } from "react";
import { useFetchSeatsQuery } from "store/features/trainSearch/trainSearchApi";
import { Seat } from "types/seat";

const seatStyle = {
  width: "2.5rem",
  height: "2.5rem",
  border: "1px solid #000",
  borderRadius: "12px",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
};

function divideSeatsArray(seats: Seat[]) {
  const seatsCopy = [...seats];
  const sortedSeats = seatsCopy.sort((a, b) => Number(a.name) - Number(b.name));

  // Calculate the middle index
  const middleIndex = Math.ceil(sortedSeats.length / 2);

  // Divide the sorted array into two parts
  const firstPart = sortedSeats.slice(0, middleIndex);
  const secondPart = sortedSeats.slice(middleIndex);

  return [firstPart, secondPart];
}

export interface CoachSeatsContainerProps {
  selectedCoachId: string;
}

const CoachSeats = ({ selectedCoachId }: CoachSeatsContainerProps) => {
  const { data: seatsData, isLoading } = useFetchSeatsQuery(selectedCoachId);
  const [firstPart, secondPart] = divideSeatsArray(seatsData?.data || []);

  if (isLoading) return <Loader />;

  return (
    <Card variant="outlined" sx={{ padding: "1rem" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        maxWidth="300px"
        marginX="auto"
      >
        <Grid container spacing={1} maxWidth="100px">
          {firstPart?.map((seat) => (
            <Grid item xs={6} key={seat.id}>
              <Box
                sx={{
                  ...seatStyle,
                  ...(seat.is_booked && {
                    backgroundColor: "#E28A2B",
                    color: "white",
                    cursor: "no-drop",
                  }),
                }}
              >
                {seat.name}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1} maxWidth="100px">
          {secondPart?.map((seat) => (
            <Grid item xs={6} key={seat.id}>
              <Box
                sx={{
                  ...seatStyle,
                  ...(seat.is_booked && {
                    backgroundColor: "#E28A2B",
                    color: "white",
                    cursor: "no-drop",
                  }),
                }}
              >
                {seat.name}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
};

export default memo(CoachSeats);
