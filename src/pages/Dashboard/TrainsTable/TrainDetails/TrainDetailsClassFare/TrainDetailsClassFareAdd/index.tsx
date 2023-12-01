import { MenuItem, TextField, Typography } from "@mui/material";
import CustomDialog from "components/CustomDialog";
import Loader from "components/Loader";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useGetAllCoachClassQuery } from "store/features/coachClass/coachClassApi";
import { useAddCoachClassFareMutation } from "store/features/coachClassFare/coachClassFareApi";
import { CoachClass } from "types/coachClass";

interface TrainDetailsClassFareAddProps {
  onClose: () => void;
}

export default function TrainDetailsClassFareAdd({
  onClose,
}: TrainDetailsClassFareAddProps) {
  const [data, setData] = useState({
    coachClass: "",
    fare: 0,
  });
  const { data: coachClasses, isLoading, error } = useGetAllCoachClassQuery();
  const [addCoachClassFare, { error: addError, isLoading: addLoading }] =
    useAddCoachClassFareMutation();
  const { trainId } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (data.coachClass === "" || data.fare <= 0) {
      toast.error("Please fill all the fields correctly!");
      return;
    }

    const res = await addCoachClassFare({
      train_id: trainId,
      class_id: +data.coachClass,
      fare: +data.fare,
    });

    if (!res.data.success) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      setData({
        coachClass: "",
        fare: 0,
      });
      onClose();
    }
  };

  let content: any = null;
  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    content = (
      <Typography variant="body1" sx={{ fontWeight: "400" }}>
        {error?.data?.message}
      </Typography>
    );
  } else {
    content = (
      <>
        <TextField
          sx={{ marginBottom: ".5rem" }}
          id="coachClass"
          name="coachClass"
          label="Select coach class"
          select
          fullWidth
          onChange={handleChange}
          value={data.coachClass}
        >
          {coachClasses?.data?.map((coachClass: CoachClass) => (
            <MenuItem key={coachClass.id} value={coachClass.id}>
              {coachClass.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="fare"
          name="fare"
          label="Enter fare percentage%"
          type="number"
          fullWidth
          onChange={handleChange}
          value={data.fare}
        />
      </>
    );
  }

  return (
    <CustomDialog
      open={true}
      onClose={onClose}
      isActionable
      title="Add Coach Class"
      onSave={handleSave}
      maxWidth="xs"
      isDisabled={addLoading}
    >
      {content}
    </CustomDialog>
  );
}
