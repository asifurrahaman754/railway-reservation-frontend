import { Box, Typography } from "@mui/material";
import CustomDialog from "components/CustomDialog";
import TrainDetailsCard from "components/TrainDetailsCard";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useDeleteCoachMutation,
  useGetAllCoachQuery,
} from "store/features/coach/coachApi";
import { Coach } from "types/coach";
import dialogContent from "../utils/dialogContent";
import TrainDetailsCoachAdd from "./TrainDetailsCoachAdd";
import TrainDetailsCoachItem from "./TrainDetailsCoachItem";

export default function TrainDetailsCoach() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: coach, error, isLoading } = useGetAllCoachQuery();
  const [deleteCoach, { isLoading: isDeleting }] = useDeleteCoachMutation();

  const handleDeleteCoach = async () => {
    const result = await deleteCoach(deleteId);

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
        title="Delete Coach"
        onSaveTitle="Yes"
        onSave={handleDeleteCoach}
        isDisabled={isDeleting}
      >
        <Typography variant="body1" sx={{ fontWeight: "400" }}>
          Are you sure you want to delete this coach?
        </Typography>
      </CustomDialog>

      {dialogOpen && (
        <TrainDetailsCoachAdd onClose={() => setDialogOpen(false)} />
      )}
      <TrainDetailsCard
        dialogContent={dialogContent.coach}
        title="Coach"
        isLoading={isLoading}
        error={error?.data?.message}
        onAdd={() => setDialogOpen(true)}
      >
        <Box sx={{ p: 3, display: "flex", gap: "1rem", overflowX: "auto" }}>
          {coach?.data?.map((coach: Coach) => (
            <TrainDetailsCoachItem
              coach={coach}
              key={coach.id}
              onDelete={setDeleteId}
            />
          ))}
        </Box>
      </TrainDetailsCard>
    </>
  );
}
