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
import CustomDialog from "components/CustomDialog";
import TrainDetailsCard from "components/TrainDetailsCard";
import DeleteIcon from "icons/DeleteIcon";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  useDeleteCoachClassFareMutation,
  useGetSingleCoachClassFareQuery,
} from "store/features/coachClassFare/coachClassFareApi";
import { CoachClassFare } from "types/coachClassFare";
import dialogContent from "../utils/dialogContent";
import TrainDetailsClassFareAdd from "./TrainDetailsClassFareAdd";

export default function TrainDetailsClassFare() {
  const { trainId } = useParams();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const {
    data: coachClassFare,
    isLoading,
    error,
  } = useGetSingleCoachClassFareQuery(trainId);
  const [deleteCoachClassFare, { isLoading: isDeleting }] =
    useDeleteCoachClassFareMutation();

  const handleDeleteCoachClass = async () => {
    const result = await deleteCoachClassFare(deleteId);

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
        title="Delete Coach Class"
        onSaveTitle="Yes"
        onSave={handleDeleteCoachClass}
        isDisabled={isDeleting}
      >
        <Typography variant="body1" sx={{ fontWeight: "400" }}>
          Are you sure you want to delete the coach class?
        </Typography>
      </CustomDialog>

      {addDialogOpen && (
        <TrainDetailsClassFareAdd onClose={() => setAddDialogOpen(false)} />
      )}

      <TrainDetailsCard
        dialogContent={dialogContent.class}
        title="Coach Class"
        isLoading={isLoading}
        error={error?.data?.message}
        onAdd={() => setAddDialogOpen(true)}
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
                {coachClassFare.data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={100} align="center">
                      No Coach Class Added
                    </TableCell>
                  </TableRow>
                )}
                {coachClassFare.data.map(
                  ({ className, fare, id }: CoachClassFare) => (
                    <TableRow key={id}>
                      <TableCell>{className}</TableCell>
                      <TableCell>{fare}TK</TableCell>
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
        )}
      </TrainDetailsCard>
    </>
  );
}
