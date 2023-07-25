import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AboutDialog from "components/AboutDialog";
import AddIcon from "icons/AddIcon";
import DeleteIcon from "icons/DeleteIcon";
import HelpIcon from "icons/HelpIcon";
import { useState } from "react";
import dialogContent from "../utils/dialogContent";

export default function TrainDetailsClass() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Card>
      <AboutDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        content={dialogContent.class}
      />{" "}
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">Train Seat Class</Typography>
              <IconButton onClick={() => setDialogOpen(true)}>
                <HelpIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button variant="outlined" startIcon={<AddIcon />}>
              New
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <TableContainer>
        <Table aria-labelledby="tableTitle" size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Class Name</TableCell>
              <TableCell>Fare</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" padding="normal">
                S chair
              </TableCell>
              <TableCell component="th" scope="row" padding="normal">
                100tk
              </TableCell>
              <TableCell component="th" scope="row" padding="normal">
                <IconButton>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
