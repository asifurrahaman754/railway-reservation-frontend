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
import { useGetAllCoachClassFareQuery } from "store/features/coachClassFare/coachClassFareApi";
import { CoachClassFare } from "types/coachClassFare";
import dialogContent from "../utils/dialogContent";

export default function TrainDetailsClassFare() {
  const {
    data: coachClassFare,
    isLoading,
    error,
  } = useGetAllCoachClassFareQuery();

  return (
    <TrainDetailsCard
      dialogContent={dialogContent.class}
      title="Coach Class"
      isLoading={isLoading}
      error={error?.data?.message}
    >
      {coachClassFare?.data && (
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
              {coachClassFare.data.map(
                ({ className, fare, id }: CoachClassFare) => (
                  <TableRow key={id}>
                    <TableCell>{className}</TableCell>
                    <TableCell>{fare}TK</TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </TrainDetailsCard>
  );
}
