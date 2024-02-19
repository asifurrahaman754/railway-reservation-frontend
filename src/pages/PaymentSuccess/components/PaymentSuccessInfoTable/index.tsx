import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentTicket } from "store/features/ticket/ticketSelector";
import { Seat } from "types/seat";
import { getSeatNameFromArray } from "utils/seats";

export default function PaymentSuccessInfoTable({pnr}: {pnr: string}) {
  const currentTicket = useSelector(selectCurrentTicket);

  return (
    <Table
      aria-label="Payment info table"
      sx={{
        backgroundColor: "defaultBg.main",
      }}
    >
      <TableHead>
        <TableRow
          sx={{
            backgroundColor: "primary.main",
          }}
        >
          <TableCell colSpan={5}>
            <Typography variant="h5" color={"defaultBg.main"}>
              Journey Details
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography variant="h6" color={"grey200.main"}>
              PNR
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6" color="primary" textTransform="uppercase">
              {pnr}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Train Name:</TableCell>
          <TableCell>
            <strong>{currentTicket?.train_name}</strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Class:</TableCell>
          <TableCell>
            <strong>{currentTicket?.coach_class}</strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Seats:</TableCell>
          <TableCell>
            <strong>{getSeatNameFromArray(currentTicket?.seats as Seat[])}</strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>From and to city:</TableCell>
          <TableCell><strong>{currentTicket?.from}</strong> to <strong>{currentTicket?.to}</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Journey date and time:</TableCell>
          <TableCell>
            <strong>{currentTicket?.date} 04: 45 PM</strong>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
