import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AboutDialog from "components/AboutDialog";
import Loader from "components/Loader";
import MessageCard from "components/MessageCard";
import AddIcon from "icons/AddIcon";
import HelpIcon from "icons/HelpIcon";
import { useState } from "react";

interface TrainDetailsCardProps {
  dialogContent: string;
  title: string;
  children: React.ReactNode;
  props?: any;
  isLoading?: boolean;
  error?: string;
}

export default function TrainDetailsCard({
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
      <AboutDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        content={dialogContent}
      />{" "}
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
            <Button variant="outlined" startIcon={<AddIcon />}>
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
