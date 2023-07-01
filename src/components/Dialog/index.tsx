import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "components/Loader";

type CustomDialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onAdd: () => void;
  title: string;
  showLoader?: boolean;
};

export default function CustomDialog({
  open,
  onClose,
  children,
  onAdd,
  title,
  showLoader = false,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add New {title} </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {showLoader && (
          <Loader sx={{ display: "inline", margin: "0" }} size={20} />
        )}
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAdd}>Add {title}</Button>
      </DialogActions>
    </Dialog>
  );
}
