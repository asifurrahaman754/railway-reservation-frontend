import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TrainDetailsCard from "components/TrainDetailsCard";
import DeleteIcon from "icons/DeleteIcon";
import { useState } from "react";
import TrainDetailsRoutesAdd from "./TrainDetailsRoutesAdd";
import dialogContent from "../utils/dialogContent";
import {
  useDeleteRouteScheduleMutation,
  useGetRouteScheduleByIdQuery,
} from "store/features/routeSchedule/routeScheduleApi";
import { useParams } from "react-router-dom";
import { RouteSchedule } from "types/routeSchedule";
import CustomDialog from "components/CustomDialog";
import { toast } from "react-hot-toast";

export default function TrainDetailsRoutes() {
  const { trainId } = useParams();
  const {
    data: routeSchedules,
    isLoading,
    error,
  } = useGetRouteScheduleByIdQuery(trainId);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteRouteSchedule, { isLoading: isDeleting }] =
    useDeleteRouteScheduleMutation();

  const handleDeleteCoach = async () => {
    const result = await deleteRouteSchedule(deleteId);

    if (result.data.success) {
      toast.success(result.data.message);
      setDeleteId(null);
    } else {
      toast.error(result.data.message);
    }
  };

  return (
    <>
      <CustomDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        isActionable
        title="Delete Route"
        onSaveTitle="Yes"
        onSave={handleDeleteCoach}
        isDisabled={isDeleting}
      >
        <Typography variant="body1" sx={{ fontWeight: "400" }}>
          Are you sure you want to delete this route?
        </Typography>
      </CustomDialog>

      {dialogOpen && (
        <TrainDetailsRoutesAdd onClose={() => setDialogOpen(false)} />
      )}

      <TrainDetailsCard
        dialogContent={dialogContent.routes}
        title="Routes"
        onAdd={() => setDialogOpen(true)}
        isLoading={isLoading}
        error={error?.data?.message}
      >
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
              {routeSchedules?.data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={100} align="center">
                    No Routes are Added
                  </TableCell>
                </TableRow>
              )}
              {routeSchedules?.data?.map(
                ({
                  arrival_time,
                  departure_time,
                  distance,
                  from_route,
                  id,
                  to_route,
                }: RouteSchedule) => (
                  <TableRow key={id}>
                    <TableCell>{from_route}</TableCell>
                    <TableCell>{to_route}</TableCell>
                    <TableCell>{distance} KM</TableCell>
                    <TableCell>{departure_time}</TableCell>
                    <TableCell>{arrival_time}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => setDeleteId(id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TrainDetailsCard>
    </>
  );
}
