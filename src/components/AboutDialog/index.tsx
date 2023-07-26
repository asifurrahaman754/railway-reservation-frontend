import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

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
        <DialogContentText>
          <Typography variant="body1" sx={{ fontWeight: "500" }}>
            {content}
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
