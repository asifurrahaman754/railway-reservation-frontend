import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AboutDialogProps {
  open: boolean;
  onClose: () => void;
  content: string;
}

export default function AboutDialog({
  open,
  onClose,
  content,
}: AboutDialogProps) {
  return (
    <Dialog
      fullScreen={false}
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>About the section</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
