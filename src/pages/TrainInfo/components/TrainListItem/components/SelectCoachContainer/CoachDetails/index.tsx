import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export interface CoachDetailsProps {
  onClose: () => void;
}

export default function CoachDetails({ onClose }: CoachDetailsProps) {
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
          <TableRow>
            <TableCell>Data 1</TableCell>
            <TableCell>Data 2</TableCell>
            <TableCell>Data 3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data 4</TableCell>
            <TableCell>Data 5</TableCell>
            <TableCell>Data 6</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Paper
        variant="outlined"
        square
        sx={{ padding: ".5rem", marginY: "1rem" }}
      >
        <Typography variant="body1" fontWeight={500} textAlign="center">
          Total:{" "}
        </Typography>
      </Paper>

      <Button
        fullWidth
        variant="contained"
        sx={{ marginY: "1.5rem", paddingY: ".8rem", borderRadius: "30px" }}
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
