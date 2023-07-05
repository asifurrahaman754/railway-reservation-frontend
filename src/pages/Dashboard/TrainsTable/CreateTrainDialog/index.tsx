import TextField from "@mui/material/TextField";
import Dialog from "components/Dialog";
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
  const [addRoute, { isLoading }] = useAddRouteMutation();
  const [route, setRoute] = useState<string>("");
  const [isValidMsg, setIsValidMsg] = useState<string>("");

  const handleClose = () => {
    setModalOpen(false);
    setRoute("");
    setIsValidMsg("");
  };

  const handleAddRoute = async () => {
    if (!route) {
      setIsValidMsg("Route cannot be empty");
      return;
    }
    if (!districts.includes(route.toLowerCase())) {
      setIsValidMsg("Please enter a valid route");
      return;
    }

    try {
      setIsValidMsg("");
      const result: any = await addRoute({
        name: route.trim().toLowerCase(),
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoute(event.target.value);
    setIsValidMsg("");
  };

  return ReactDOM.createPortal(
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      title="Route"
      onAdd={handleAddRoute}
      showLoader={isLoading}
    >
      <TextField
        autoFocus
        margin="dense"
        id="route"
        label="enter your route"
        type="text"
        fullWidth
        variant="standard"
        value={route}
        onChange={handleChange}
        error={isValidMsg !== ""}
        helperText={isValidMsg}
      />
    </Dialog>,
    portal
  );
}
