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
import { useState } from "react";
import dialogContent from "../utils/dialogContent";

export default function TrainDetailsClass() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <TrainDetailsCard dialogContent={dialogContent.class} title="Seat Class">
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Fare</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>S chair</TableCell>
              <TableCell>100tk</TableCell>
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
