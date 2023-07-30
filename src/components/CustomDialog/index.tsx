import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { DialogProps } from "@mui/material/Dialog";
import Loader from "components/Loader";
import CloseIcon from "icons/CloseIcon";

interface CustomDialogProps extends DialogProps {
  open: boolean;
  onClose: () => void;
  isActionable?: boolean;
  onSave?: () => void;
  onSaveTitle?: string;
  children: React.ReactNode;
  title?: string;
  isDisabled?: boolean;
}

export default function CustomDialog({
  open,
  onClose,
  onSave,
  onSaveTitle,
  isActionable = false,
  children,
  title = "About the section",
  isDisabled = false,
  ...props
}: CustomDialogProps) {
  const dialogActions = (
    <DialogActions>
      {isDisabled && <Loader size={18} />}
      <Button variant="text" onClick={onSave} disabled={isDisabled}>
        {onSaveTitle || "Save"}
      </Button>
      <Button variant="text" onClick={onClose} disabled={isDisabled}>
        Cancel
      </Button>
    </DialogActions>
  );

  return (
    <Dialog
      fullScreen={false}
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth="sm"
      {...props}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: ".7rem 1.6rem",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {isActionable && dialogActions}
    </Dialog>
  );
}
