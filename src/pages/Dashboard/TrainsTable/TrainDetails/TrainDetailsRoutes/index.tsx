import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TrainDetailsCard from "components/TrainDetailsCard";
import DeleteIcon from "icons/DeleteIcon";
import dialogContent from "../utils/dialogContent";

export default function TrainDetailsRoutes() {
  return (
    <TrainDetailsCard dialogContent={dialogContent.routes} title="Routes">
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Distance</TableCell>
              <TableCell>Departure</TableCell>
              <TableCell>Arrival</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Chattogram</TableCell>
              <TableCell>Dhaka</TableCell>
              <TableCell>250 km</TableCell>
              <TableCell>9: 00 AM</TableCell>
              <TableCell>5: 00 PM</TableCell>
              <TableCell>
                <IconButton>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Chattogram</TableCell>
              <TableCell>Dhaka</TableCell>
              <TableCell>250 km</TableCell>
              <TableCell>9: 00 AM</TableCell>
              <TableCell>5: 00 PM</TableCell>
              <TableCell>
                <IconButton>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </TrainDetailsCard>
  );
}
