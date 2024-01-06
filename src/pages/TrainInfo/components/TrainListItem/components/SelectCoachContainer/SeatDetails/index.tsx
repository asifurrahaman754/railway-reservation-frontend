import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import useSearchParams from "hooks/useSearchParams";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "routes/index";
import { setTicketInfo } from "store/features/ticket/ticketSlice";
import { Coach } from "types/coach";
import { Seat } from "types/seat";
import { calculateFare, getFareWithCurr } from "utils/fare";
import { convertTimeTo12 } from "utils/time";

export interface SeatDetailsProps {
  onClose: () => void;
  seats: Seat[];
  baseFare: number;
  selectedCoach: Coach;
  trainName: string;
  departureTime: string;
}

export default function SeatDetails({
  onClose,
  seats,
  baseFare,
  selectedCoach,
  trainName,
  departureTime,
}: SeatDetailsProps) {
  const dispatch = useDispatch();
  const { formattedDate, fromCity, toCity } = useSearchParams();

  const navigate = useNavigate();
  const totalSeatsFare = seats.reduce((acc, _seat) => {
    return acc + calculateFare(baseFare, selectedCoach.fare);
  }, 0);

  const handlePurchase = () => {
    if (!seats.length) {
      alert("Please select at least one seat!");
      return;
    }

    dispatch(
      setTicketInfo({
        from: fromCity,
        to: toCity,
        date: formattedDate,
        time: convertTimeTo12(departureTime),
        coach_class: selectedCoach.class,
        totalPrice: totalSeatsFare,
        seats,
        train_name: trainName,
      })
    );
    navigate(routes.purchase);
  };

  return (
    <Card
      variant="outlined"
      sx={{ backgroundColor: "#FAFAFF", padding: "1rem" }}
    >
      <Typography variant="h6">Seat Details</Typography>
      <Table aria-label="my table" sx={{ border: "none" }}>
        <TableHead>
          <TableRow>
            <TableCell>Class</TableCell>
            <TableCell>Seats</TableCell>
            <TableCell>Fare</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seats.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                No seats selected
              </TableCell>
            </TableRow>
          )}

          {seats?.map((seat) => (
            <TableRow key={seat.id}>
              <TableCell>{seat.coach_class}</TableCell>
              <TableCell>
                {seat.coach_name}-{seat.name}
              </TableCell>
              <TableCell>
                {getFareWithCurr(baseFare, selectedCoach.fare)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Paper
        variant="outlined"
        square
        sx={{ padding: ".5rem", marginY: "1rem" }}
      >
        <Typography
          variant="body1"
          fontWeight={500}
          textAlign="center"
          color="primary"
        >
          Total: {totalSeatsFare} TK
        </Typography>
      </Paper>

      <Button
        fullWidth
        variant="contained"
        sx={{ marginY: "1.5rem", paddingY: ".8rem", borderRadius: "30px" }}
        onClick={handlePurchase}
      >
        <Typography
          textTransform="uppercase"
          variant="body1"
          fontWeight={500}
          textAlign="center"
        >
          Continue Purchase
        </Typography>
      </Button>

      <Button
        variant="text"
        sx={{ display: "flex", marginLeft: "auto" }}
        onClick={onClose}
      >
        Close
      </Button>
    </Card>
  );
}
