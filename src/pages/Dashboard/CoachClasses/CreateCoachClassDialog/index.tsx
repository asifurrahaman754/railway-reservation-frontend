import TextField from "@mui/material/TextField";
import Dialog from "components/Dialog";
import { useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-hot-toast";
import { useAddCoachClassMutation } from "store/features/coachClass/coachClassApi";

const portal: any = document.getElementById("modal");

type CreateRouteDialogProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateCoachClassDialog({
  modalOpen,
  setModalOpen,
}: CreateRouteDialogProps) {
  const [addCoachClass, { isLoading }] = useAddCoachClassMutation();
  const [coachClass, setCoachClass] = useState<string>("");
  const [isValidMsg, setIsValidMsg] = useState<string>("");
  let formattedName = coachClass.trim().toUpperCase().split(" ").join("_");

  const handleClose = () => {
    setModalOpen(false);
    setCoachClass("");
    setIsValidMsg("");
  };

  const handleAdd = async () => {
    if (!coachClass) {
      setIsValidMsg("Class name cannot be empty");
      return;
    }
    if (coachClass.length > 12) {
      setIsValidMsg("Class name should be less than 12 characters");
      return;
    }

    try {
      setIsValidMsg("");

      if (!formattedName.includes("CHAIR")) {
        formattedName = formattedName + "_CHAIR";
      }
      const result: any = await addCoachClass({
        name: formattedName,
      });

      if (result?.data?.success) {
        toast.success("Coach class added successfully");
        setModalOpen(false);
        setCoachClass("");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoachClass(event.target.value);
    setIsValidMsg("");
  };

  return ReactDOM.createPortal(
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      onAdd={handleAdd}
      title="Coach Class"
      showLoader={isLoading}
    >
      <TextField
        autoFocus
        margin="dense"
        id="route"
        placeholder="Enter class name, ex: ac"
        type="text"
        fullWidth
        variant="standard"
        value={coachClass}
        onChange={handleChange}
        error={isValidMsg !== ""}
        helperText={isValidMsg}
      />
    </Dialog>,
    portal
  );
}
