import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CustomDialog from "components/CustomDialog";
import Loader from "components/Loader";
import MessageCard from "components/MessageCard";
import AddIcon from "icons/AddIcon";
import HelpIcon from "icons/HelpIcon";
import { useState } from "react";

interface TrainDetailsCardProps {
  onAdd?: () => void;
  dialogContent: string;
  title: string;
  children: React.ReactNode;
  props?: any;
  isLoading?: boolean;
  error?: string;
}

export default function TrainDetailsCard({
  onAdd,
  dialogContent,
  title,
  children,
  isLoading = false,
  error,
  ...props
}: TrainDetailsCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Card sx={{ mb: "1.5rem", mt: "1.5rem" }} {...props}>
      <CustomDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Typography variant="body1" sx={{ fontWeight: "400" }}>
          {dialogContent}
        </Typography>
      </CustomDialog>{" "}
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">Train {title}</Typography>
              <IconButton onClick={() => setDialogOpen(true)}>
                <HelpIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button variant="outlined" startIcon={<AddIcon />} onClick={onAdd}>
              Add New {title}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      {isLoading && <Loader />}
      {error && <MessageCard isCenter>{error}</MessageCard>}
      {children}
    </Card>
  );
}
