import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import districts from "data/district";
import { useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-hot-toast";
import { useAddRouteMutation } from "store/features/route/routeApi";

const portal: any = document.getElementById("modal");

type CreateRouteDialogProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateRouteDialog({
  modalOpen,
  setModalOpen,
}: CreateRouteDialogProps) {
  const [addRoute] = useAddRouteMutation();
  const [route, setRoute] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleClose = () => {
    setModalOpen(false);
    setRoute("");
    setIsValid(true);
  };

  const handleAddRoute = async () => {
    if (!districts.includes(route.toLowerCase())) {
      setIsValid(false);
      return;
    }

    try {
      setIsValid(true);
      const result: any = await addRoute({
        name: route.toLowerCase(),
      });

      if (result?.data?.success) {
        toast.success("Route added successfully");
        setModalOpen(false);
        setRoute("");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  return ReactDOM.createPortal(
    <Dialog open={modalOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Add Route</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="route"
          label="enter your route"
          type="text"
          fullWidth
          variant="standard"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          error={!isValid}
          helperText={!isValid && "Please provide a valid route"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddRoute}>Add Route</Button>
      </DialogActions>
    </Dialog>,
    portal
  );
}
